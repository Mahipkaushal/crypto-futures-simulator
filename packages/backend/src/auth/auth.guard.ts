import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private firebaseAdmin: FirebaseAdminService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = await this.firebaseAdmin.verifyToken(token);
            request.user = decodedToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
