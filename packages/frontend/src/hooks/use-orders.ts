'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/use-auth-store';
import { auth } from '@/lib/firebase';

export function useOrders() {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();

    const ordersQuery = useQuery({
        queryKey: ['orders', user?.uid],
        queryFn: async () => {
            if (!user) return [];
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trading/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch orders');
            return response.json();
        },
        enabled: !!user,
    });

    const placeOrderMutation = useMutation({
        mutationFn: async (data: {
            symbol: string,
            side: 'BUY' | 'SELL',
            type: 'MARKET' | 'LIMIT' | 'STOP_MARKET',
            size: number,
            price?: number,
            stopPrice?: number,
            leverage: number,
            marginType?: string
        }) => {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trading/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place order');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['positions', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['wallet', user?.uid] });
        },
    });

    const cancelOrderMutation = useMutation({
        mutationFn: async (orderId: string) => {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trading/order/${orderId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to cancel order');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', user?.uid] });
        },
    });

    return {
        orders: ordersQuery.data || [],
        isLoading: ordersQuery.isLoading,
        placeOrder: placeOrderMutation.mutateAsync,
        isPlacing: placeOrderMutation.isPending,
        cancelOrder: cancelOrderMutation.mutateAsync,
        isCancelling: cancelOrderMutation.isPending,
    };
}
