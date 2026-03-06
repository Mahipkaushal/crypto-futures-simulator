'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';
import { auth } from '@/lib/firebase';

export function useTrades() {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ['trades', user?.uid],
        queryFn: async () => {
            if (!user) return [];
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/positions/trades`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch trades');
            return response.json();
        },
        enabled: !!user,
    });
}
