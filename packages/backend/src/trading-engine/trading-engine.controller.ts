import { Controller, Post, Get, Body, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { TradingEngineService } from './trading-engine.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('trading')
@UseGuards(AuthGuard)
export class TradingEngineController {
    constructor(private readonly tradingEngine: TradingEngineService) { }

    @Post('order')
    placeOrder(@Req() req: any, @Body() data: any) {
        return this.tradingEngine.placeOrder(req.user.uid, data);
    }

    @Get('orders')
    getOrders(@Req() req: any) {
        return this.tradingEngine.getOrders(req.user.uid);
    }

    @Delete('order/:id')
    cancelOrder(@Req() req: any, @Param('id') id: string) {
        return this.tradingEngine.cancelOrder(req.user.uid, id);
    }
}
