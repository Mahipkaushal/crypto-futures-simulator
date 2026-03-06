import { Controller, Get, UseGuards } from '@nestjs/common';
import { AICoachService } from './ai-coach.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('ai-coach')
@UseGuards(AuthGuard)
export class AICoachController {
    constructor(private readonly aiCoachService: AICoachService) { }

    @Get('insights')
    async getInsights() {
        return this.aiCoachService.getMarketInsights();
    }
}
