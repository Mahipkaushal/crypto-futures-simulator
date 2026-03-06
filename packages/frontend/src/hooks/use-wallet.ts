'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';
import { auth } from '@/lib/firebase';

export function useWallet() {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['wallet', user?.uid],
        queryFn: async () => {
            if (!user) return null;

            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wallet/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch wallet balance');
            }

            return response.json();
        },
        enabled: !!user,
    });
}
