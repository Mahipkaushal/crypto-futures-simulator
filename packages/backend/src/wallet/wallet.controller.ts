import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Get('balance')
    async getBalance(@Request() req: any) {
        // Decoded token is in req.user
        const { uid, email, name } = req.user;

        // Ensure user and wallet exist
        const user = await this.walletService.getOrCreateUser(uid, email, name);

        return {
            balance: user.wallet?.balance,
            currency: user.wallet?.currency,
        };
    }
}
