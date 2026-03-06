import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TradingEngineService {
    private readonly logger = new Logger(TradingEngineService.name);

    constructor(private prisma: PrismaService) { }

    calculateLiquidationPrice(side: string, entryPrice: number, leverage: number): number {
        if (side === 'LONG') {
            return entryPrice * (1 - 1 / leverage + 0.005); // 0.5% safety buffer
        } else {
            return entryPrice * (1 + 1 / leverage - 0.005);
        }
    }

    async processPriceUpdate(symbol: string, currentPrice: number) {
        // 1. Check for liquidations
        await this.checkLiquidations(symbol, currentPrice);

        // 2. Process limit orders
        await this.processLimitOrders(symbol, currentPrice);
    }

    private async checkLiquidations(symbol: string, currentPrice: number) {
        const positions = await this.prisma.position.findMany({
            where: {
                symbol,
            },
        });

        for (const position of positions) {
            const liqPrice = Number(position.liquidationPrice);
            const side = position.side;

            let isLiquidated = false;
            if (side === 'LONG' && currentPrice <= liqPrice) {
                isLiquidated = true;
            } else if (side === 'SHORT' && currentPrice >= liqPrice) {
                isLiquidated = true;
            }

            if (isLiquidated) {
                this.logger.warn(`Liquidating position ${position.id} for user ${position.userId} at ${currentPrice}`);
                await this.liquidatePosition(position, currentPrice);
            }
        }
    }

    private async liquidatePosition(position: any, price: number) {
        await this.prisma.$transaction(async (tx) => {
            // Log the trade as a liquidation
            await tx.trade.create({
                data: {
                    userId: position.userId,
                    symbol: position.symbol,
                    side: position.side === 'LONG' ? 'SELL' : 'BUY',
                    size: position.size,
                    price: price,
                    type: 'LIQUIDATION',
                    pnl: new Prisma.Decimal(-1 * Number(position.size) * Number(position.entryPrice) / position.leverage), // Loss of margin
                },
            });

            // Delete the position
            await tx.position.delete({
                where: { id: position.id },
            });

            // Note: Wallet balance update might be handled differently depending on if it's CROSS or ISOLATED.
            // For MVP CROSS, the margin is already "spoken for" but we might need to deduct remaining if we track margin specifically.
            // Currently, we just increment/decrement balance on trade close.
            // On liquidation, we deduct the loss from balance.
            const pnl = position.side === 'LONG'
                ? (price - Number(position.entryPrice)) * Number(position.size)
                : (Number(position.entryPrice) - price) * Number(position.size);

            await tx.wallet.update({
                where: { userId: position.userId },
                data: {
                    balance: { increment: pnl },
                },
            });
        });
    }

    private async processLimitOrders(symbol: string, currentPrice: number) {
        const openOrders = await this.prisma.order.findMany({
            where: {
                symbol,
                status: 'OPEN',
                type: 'LIMIT',
            },
        });

        for (const order of openOrders) {
            const limitPrice = Number(order.price);
            let shouldFill = false;

            if (order.side === 'BUY' && currentPrice <= limitPrice) {
                shouldFill = true;
            } else if (order.side === 'SELL' && currentPrice >= limitPrice) {
                shouldFill = true;
            }

            if (shouldFill) {
                this.logger.log(`Filling limit order ${order.id} at ${currentPrice}`);
                await this.executeOrder(order, currentPrice);
            }
        }
    }

    private async executeOrder(order: any, price: number) {
        // Implementation for filling an order and creating a position
        // This logic is similar to what's currently in PositionsService.openPosition
        // We should eventually centralize it.
        await this.prisma.$transaction(async (tx) => {
            // Update order status if it's an existing order (limit orders)
            if (order.id) {
                await tx.order.update({
                    where: { id: order.id },
                    data: { status: 'FILLED', updatedAt: new Date() },
                });
            }

            const side = order.side === 'BUY' ? 'LONG' : 'SHORT';
            const liqPrice = this.calculateLiquidationPrice(side, price, order.leverage);

            // Create position
            await tx.position.create({
                data: {
                    userId: order.userId,
                    symbol: order.symbol,
                    side: side,
                    size: order.size,
                    entryPrice: price,
                    leverage: order.leverage,
                    marginType: order.marginType,
                    liquidationPrice: liqPrice,
                },
            });

            // Create trade log
            await tx.trade.create({
                data: {
                    userId: order.userId,
                    symbol: order.symbol,
                    side: order.side,
                    size: order.size,
                    price: price,
                    type: 'OPEN',
                },
            });
        });
    }

    async placeOrder(uid: string, data: any) {
        const user = await this.prisma.user.findUnique({ where: { uid } });
        if (!user) throw new Error('User not found');

        if (data.type === 'MARKET') {
            await this.executeOrder({ ...data, userId: user.id }, data.price);
            return { status: 'FILLED' };
        }

        return this.prisma.order.create({
            data: {
                userId: user.id,
                symbol: data.symbol,
                side: data.side,
                type: data.type,
                size: data.size,
                price: data.price,
                stopPrice: data.stopPrice,
                leverage: data.leverage,
                marginType: data.marginType || 'CROSS',
            },
        });
    }

    async getOrders(uid: string) {
        const user = await this.prisma.user.findUnique({ where: { uid } });
        if (!user) return [];

        return this.prisma.order.findMany({
            where: { userId: user.id, status: 'OPEN' },
            orderBy: { createdAt: 'desc' },
        });
    }

    async cancelOrder(uid: string, orderId: string) {
        const user = await this.prisma.user.findUnique({ where: { uid } });
        if (!user) throw new Error('User not found');

        return this.prisma.order.update({
            where: { id: orderId, userId: user.id },
            data: { status: 'CANCELLED', updatedAt: new Date() },
        });
    }
}
