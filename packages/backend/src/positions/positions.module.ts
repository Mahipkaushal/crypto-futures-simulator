import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { TradingEngineModule } from '../trading-engine/trading-engine.module';

@Module({
    imports: [PrismaModule, AuthModule, TradingEngineModule],
    controllers: [PositionsController],
    providers: [PositionsService],
    exports: [PositionsService],
})
export class PositionsModule { }
