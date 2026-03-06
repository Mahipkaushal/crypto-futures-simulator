import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('leaderboard')
@UseGuards(AuthGuard)
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get()
    async getLeaderboard() {
        return this.leaderboardService.getTopTraders();
    }
}
