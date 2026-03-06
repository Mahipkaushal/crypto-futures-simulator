import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('positions')
@UseGuards(AuthGuard)
export class PositionsController {
    constructor(private readonly positionsService: PositionsService) { }

    @Post('open')
    async openPosition(@Request() req: any, @Body() data: { symbol: string, side: string, size: number, price: number, leverage: number }) {
        return this.positionsService.openPosition(req.user.uid, data);
    }

    @Get()
    async getPositions(@Request() req: any) {
        return this.positionsService.getUserPositions(req.user.uid);
    }

    @Get('trades')
    async getTrades(@Request() req: any) {
        return this.positionsService.getUserTrades(req.user.uid);
    }

    @Post('close/:id')
    async closePosition(@Request() req: any, @Param('id') id: string, @Body() data: { currentPrice: number }) {
        return this.positionsService.closePosition(req.user.uid, id, data.currentPrice);
    }
}
