import { Module } from '@nestjs/common';
import { BinanceWsService } from './binance-ws.service';
import { MarketDataGateway } from './market-data.gateway';
import { TradingEngineModule } from '../trading-engine/trading-engine.module';

@Module({
    imports: [TradingEngineModule],
    providers: [BinanceWsService, MarketDataGateway],
    exports: [BinanceWsService, MarketDataGateway],
})
export class MarketDataModule { }
