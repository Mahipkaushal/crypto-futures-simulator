import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
    onModuleInit() {
        if (admin.apps.length === 0) {
            admin.initializeApp({
                projectId: process.env.FIREBASE_PROJECT_ID,
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        }
    }

    get admin() {
        return admin;
    }

    async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
        try {
            return await admin.auth().verifyIdToken(idToken);
        } catch (error) {
            throw error;
        }
    }
}
