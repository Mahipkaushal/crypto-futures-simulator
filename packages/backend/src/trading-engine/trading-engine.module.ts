import { Module } from '@nestjs/common';
import { TradingEngineService } from './trading-engine.service';
import { TradingEngineController } from './trading-engine.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [TradingEngineService],
    controllers: [TradingEngineController],
    exports: [TradingEngineService],
})
export class TradingEngineModule { }
