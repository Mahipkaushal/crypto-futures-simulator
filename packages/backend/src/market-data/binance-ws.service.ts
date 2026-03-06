import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import WebSocket from 'ws';
import { MarketDataGateway } from './market-data.gateway';
import { TradingEngineService } from '../trading-engine/trading-engine.service';

@Injectable()
export class BinanceWsService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(BinanceWsService.name);
    private ws?: WebSocket;
    private readonly baseUrl = 'wss://fstream.binance.com/ws';
    private readonly symbols = ['btcusdt', 'ethusdt', 'solusdt'];

    constructor(
        private readonly gateway: MarketDataGateway,
        private readonly tradingEngine: TradingEngineService
    ) { }

    onModuleInit() {
        this.connect();
    }

    onModuleDestroy() {
        this.disconnect();
    }

    private connect() {
        const streams = this.symbols.map(s => `${s}@ticker`).join('/');
        this.ws = new WebSocket(`${this.baseUrl}/${streams}`);

        this.ws.on('open', () => {
            this.logger.log('Connected to Binance Futures WebSocket');
        });

        this.ws.on('message', (data: string) => {
            try {
                const message = JSON.parse(data);
                this.handleMessage(message);
            } catch (e) {
                this.logger.error('Failed to parse message from Binance', e);
            }
        });

        this.ws.on('error', (err) => {
            this.logger.error('Binance WebSocket error', err);
        });

        this.ws.on('close', () => {
            this.logger.warn('Binance WebSocket closed. Reconnecting in 5s...');
            setTimeout(() => this.connect(), 5000);
        });
    }

    private disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }

    private handleMessage(data: any) {
        // Normalization logic
        if (data.e === '24hrTicker') {
            const ticker = {
                symbol: data.s,
                price: parseFloat(data.c),
                high: parseFloat(data.h),
                low: parseFloat(data.l),
                volume: parseFloat(data.v),
                change: parseFloat(data.p),
                changePercent: parseFloat(data.P),
                timestamp: data.E,
            };

            this.gateway.broadcastTicker(ticker);

            // Trigger trading engine process
            this.tradingEngine.processPriceUpdate(ticker.symbol, ticker.price).catch(err => {
                this.logger.error(`Error processing price update for ${ticker.symbol}`, err);
            });
        }
    }
}
