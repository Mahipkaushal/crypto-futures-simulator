import { Module } from '@nestjs/common';
import { AICoachService } from './ai-coach.service';
import { AICoachController } from './ai-coach.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [AICoachController],
    providers: [AICoachService],
    exports: [AICoachService],
})
export class AICoachModule { }
