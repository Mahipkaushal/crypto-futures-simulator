'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';
import { auth } from '@/lib/firebase';

export function usePositions() {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    const positionsQuery = useQuery({
        queryKey: ['positions', user?.uid],
        queryFn: async () => {
            if (!user) return [];
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/positions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch positions');
            return response.json();
        },
        enabled: !!user,
    });

    const openPositionMutation = useMutation({
        mutationFn: async (data: { symbol: string, side: string, size: number, price: number, leverage: number }) => {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/positions/open`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to open position');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['wallet', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['trades', user?.uid] });
        },
    });

    const closePositionMutation = useMutation({
        mutationFn: async ({ id, currentPrice }: { id: string, currentPrice: number }) => {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/positions/close/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPrice }),
            });
            if (!response.ok) throw new Error('Failed to close position');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['wallet', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['trades', user?.uid] });
        },
    });

    return {
        positions: positionsQuery.data || [],
        isLoading: positionsQuery.isLoading,
        openPosition: openPositionMutation.mutateAsync,
        isOpening: openPositionMutation.isPending,
        closePosition: closePositionMutation.mutateAsync,
        isClosing: closePositionMutation.isPending,
    };
}
