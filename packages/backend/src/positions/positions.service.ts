import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TradingEngineService } from '../trading-engine/trading-engine.service';

@Injectable()
export class PositionsService {
    constructor(
        private prisma: PrismaService,
        private tradingEngine: TradingEngineService,
    ) { }

    async openPosition(uid: string, data: { symbol: string, side: string, size: number, price: number, leverage: number }) {
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { uid },
                include: { wallet: true }
            });

            if (!user || !user.wallet) throw new BadRequestException('User or Wallet not found');

            const marginRequired = (data.size * data.price) / data.leverage;

            if (Number(user.wallet.balance) < marginRequired) {
                throw new BadRequestException('Insufficient balance');
            }

            const liqPrice = this.tradingEngine.calculateLiquidationPrice(data.side, data.price, data.leverage);

            const position = await tx.position.create({
                data: {
                    userId: user.id,
                    symbol: data.symbol,
                    side: data.side,
                    size: data.size,
                    entryPrice: data.price,
                    leverage: data.leverage,
                    liquidationPrice: liqPrice,
                }
            });

            await tx.trade.create({
                data: {
                    userId: user.id,
                    symbol: data.symbol,
                    side: data.side === 'LONG' ? 'BUY' : 'SELL',
                    size: data.size,
                    price: data.price,
                    type: 'OPEN',
                }
            });

            return position;
        });
    }

    async getUserPositions(uid: string) {
        const user = await this.prisma.user.findUnique({
            where: { uid }
        });
        if (!user) return [];

        return this.prisma.position.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getUserTrades(uid: string) {
        const user = await this.prisma.user.findUnique({
            where: { uid }
        });
        if (!user) return [];

        return this.prisma.trade.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    async closePosition(uid: string, positionId: string, currentPrice: number) {
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({ where: { uid } });
            if (!user) throw new BadRequestException('User not found');

            const position = await tx.position.findUnique({ where: { id: positionId } });
            if (!position || position.userId !== user.id) throw new BadRequestException('Position not found');

            const size = Number(position.size);
            const entryPrice = Number(position.entryPrice);
            let pnl = 0;

            if (position.side === 'LONG') {
                pnl = (currentPrice - entryPrice) * size;
            } else {
                pnl = (entryPrice - currentPrice) * size;
            }

            await tx.wallet.update({
                where: { userId: user.id },
                data: {
                    balance: { increment: pnl }
                }
            });

            await tx.trade.create({
                data: {
                    userId: user.id,
                    symbol: position.symbol,
                    side: position.side === 'LONG' ? 'SELL' : 'BUY',
                    size: position.size,
                    price: currentPrice,
                    pnl,
                    type: 'CLOSE',
                }
            });

            await tx.position.delete({ where: { id: positionId } });

            return { pnl };
        });
    }
}
