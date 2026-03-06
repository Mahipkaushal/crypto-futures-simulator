'use client';

import { useMarketData, Ticker } from '@/hooks/use-market-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, ActivityIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketTicker() {
    const { tickers, isConnected } = useMarketData();
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {symbols.map((symbol) => {
                const data = tickers[symbol];
                return (
                    <TickerCard
                        key={symbol}
                        symbol={symbol}
                        data={data}
                        isConnected={isConnected}
                    />
                );
            })}
        </div>
    );
}

function TickerCard({
    symbol,
    data,
    isConnected
}: {
    symbol: string;
    data?: Ticker;
    isConnected: boolean;
}) {
    const isPositive = data ? data.changePercent >= 0 : true;

    return (
        <Card className="bg-zinc-950 border-zinc-800 shadow-xl overflow-hidden min-w-[200px] flex-1">
            <CardContent className="p-4 relative">
                {!isConnected && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <ActivityIcon className="w-4 h-4 text-zinc-500 animate-pulse" />
                    </div>
                )}

                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-zinc-500 tracking-wider">
                        {symbol}
                    </span>
                    {data && (
                        <span className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded",
                            isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        )}>
                            {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xl font-mono font-bold text-white">
                        {data ? data.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '---.--'}
                    </span>
                    {data && (
                        isPositive ?
                            <ArrowUpIcon className="w-3 h-3 text-emerald-500" /> :
                            <ArrowDownIcon className="w-3 h-3 text-red-500" />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
