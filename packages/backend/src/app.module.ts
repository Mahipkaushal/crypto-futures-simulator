import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { WalletModule } from './wallet/wallet.module';
import { MarketDataModule } from './market-data/market-data.module';
import { PositionsModule } from './positions/positions.module';
import { AICoachModule } from './ai-coach/ai-coach.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { TradingEngineModule } from './trading-engine/trading-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    WalletModule,
    MarketDataModule,
    PositionsModule,
    AICoachModule,
    LeaderboardModule,
    TradingEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
