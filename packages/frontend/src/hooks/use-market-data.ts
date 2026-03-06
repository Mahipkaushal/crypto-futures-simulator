'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useMarketData() {
    const [prices, setPrices] = useState<Record<string, number>>({
        'BTCUSDT': 45230.50,
        'ETHUSDT': 2450.20,
        'SOLUSDT': 102.45,
        'BNBUSDT': 310.00,
    });

    useEffect(() => {
        const socket: Socket = io(`${process.env.NEXT_PUBLIC_API_URL}/market`, {
            transports: ['websocket'],
        });

        socket.on('ticker', (data) => {
            setPrices((prev) => ({
                ...prev,
                [data.symbol]: data.price,
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return prices;
}
