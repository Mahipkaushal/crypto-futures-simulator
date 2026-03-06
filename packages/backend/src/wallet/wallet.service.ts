import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) { }

    async getOrCreateUser(uid: string, email: string, name?: string) {
        return (this.prisma as any).$transaction(async (tx: any) => {
            let user = await tx.user.findUnique({
                where: { uid },
                include: { wallet: true },
            });

            if (!user) {
                user = await tx.user.create({
                    data: {
                        uid,
                        email,
                        name,
                        wallet: {
                            create: {
                                balance: 100000,
                                currency: 'USDT',
                            },
                        },
                    },
                    include: { wallet: true },
                });
            }

            return user;
        });
    }

    async getBalance(userId: string) {
        const wallet = await (this.prisma as any).wallet.findUnique({
            where: { userId },
        });
        return wallet?.balance || 0;
    }
}
