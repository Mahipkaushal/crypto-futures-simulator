import { Injectable } from '@nestjs/common';

@Injectable()
export class AICoachService {
    async getMarketInsights() {
        return {
            sentiment: {
                score: 72,
                label: 'Greed',
                socialBuzz: 12.4,
                newsSentiment: 'Neutral / Consolidation'
            },
            signals: [
                {
                    id: 1,
                    symbol: 'SOLUSDT',
                    type: 'BULLISH',
                    title: 'Bullish Pattern',
                    description: 'AI detected a triple bottom on the 4H chart with increasing rsi momentum. Target: $118.50',
                    confidence: 92
                },
                {
                    id: 2,
                    symbol: 'BTCUSDT',
                    type: 'WARNING',
                    title: 'Market Warning',
                    description: 'Significant liquidation clusters detected near $44,200. Tighten stop-losses on long positions.',
                    confidence: 88
                }
            ],
            chatContext: {
                agentName: 'AlphaBot 1.0',
                status: 'Autonomous Assistant',
                welcomeMessage: "Hello! I've been monitoring the BTC order flow. Would you like a summary of the current institutional liquidity pools?"
            }
        };
    }
}
