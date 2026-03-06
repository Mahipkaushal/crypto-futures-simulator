'use client';

import { useWallet } from '@/hooks/use-wallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WalletIcon, TrendingUpIcon } from 'lucide-react';

export function BalanceDisplay() {
    const { data, isLoading, error } = useWallet();

    if (isLoading) {
        return (
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-48 bg-zinc-800" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-zinc-900 border-zinc-800 border-red-900/50">
                <CardContent className="pt-6">
                    <p className="text-red-500 text-sm">Failed to load balance</p>
                </CardContent>
            </Card>
        );
    }

    const balance = data?.balance || 0;
    const currency = data?.currency || 'USDT';

    return (
        <Card className="relative overflow-hidden bg-zinc-950 border-zinc-800 shadow-2xl group hover:border-[#0df26c]/50 transition-all duration-500">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0df26c]/5 blur-[60px] rounded-full group-hover:bg-[#0df26c]/10 transition-colors" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-400">Total Balance</CardTitle>
                <div className="p-2 bg-[#0df26c]/10 rounded-lg group-hover:bg-[#0df26c]/20 transition-colors">
                    <WalletIcon className="w-4 h-4 text-[#0df26c]" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold tracking-tight text-white">
                            {new Intl.NumberFormat('en-US', {
                                style: 'decimal',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(balance)}
                            <span className="ml-2 text-xl font-medium text-zinc-400">{currency}</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.6 mt-2 text-xs text-emerald-500 font-medium">
                        <TrendingUpIcon className="w-3 h-3" />
                        <span>+0.00% (24h)</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
