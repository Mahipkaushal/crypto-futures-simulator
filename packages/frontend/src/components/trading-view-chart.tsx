'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol, interval = '60' }: { symbol: string, interval?: string }) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        // Clean up existing widget if any
        const currentContainer = container.current;
        while (currentContainer.firstChild) {
            currentContainer.removeChild(currentContainer.firstChild);
        }

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": `BINANCE:${symbol}.P`,
            "interval": interval,
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_side_toolbar": true,
            "allow_symbol_change": false,
            "save_image": false,
            "backgroundColor": "#101922", // Match dashboard bg
            "gridColor": "rgba(19, 127, 236, 0.05)",
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });

        currentContainer.appendChild(script);

        return () => {
            if (currentContainer) {
                currentContainer.innerHTML = '';
            }
        };
    }, [symbol, interval]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
        </div>
    );
}

export default memo(TradingViewWidget);
