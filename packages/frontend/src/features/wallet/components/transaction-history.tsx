'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoryIcon, InboxIcon } from 'lucide-react';

export function TransactionHistory() {
    return (
        <Card className="bg-zinc-950 border-zinc-800 shadow-xl h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <HistoryIcon className="w-5 h-5 text-[#0df26c]" />
                    Transaction History
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <InboxIcon className="w-8 h-8 text-zinc-700" />
                </div>
                <h3 className="text-zinc-300 font-medium">No transactions yet</h3>
                <p className="text-zinc-500 text-sm max-w-[200px] mt-2">
                    Your trading history and balance adjustments will appear here.
                </p>
            </CardContent>
        </Card>
    );
}
