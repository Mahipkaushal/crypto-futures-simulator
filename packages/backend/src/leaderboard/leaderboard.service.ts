import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
    constructor(private prisma: PrismaService) { }

    async getTopTraders() {
        const users = await this.prisma.user.findMany({
            take: 10,
            include: { wallet: true },
        });

        return users.map((user, index) => ({
            rank: index + 1,
            name: user.name || 'Anonymous Trader',
            pnl: (Math.random() * 50000).toFixed(2),
            winRate: (60 + Math.random() * 30).toFixed(1),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        }));
    }
}
