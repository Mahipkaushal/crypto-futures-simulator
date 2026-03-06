'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReplayPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [selectedAsset, setSelectedAsset] = useState('BTC/USDT');

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display">
            {/* Sidebar - Replay Specific */}
            <div className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 flex flex-col pt-20">
                <div className="p-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Simulation Settings</span>
                        <h2 className="text-xl font-black">Market Replay</h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Select Asset</label>
                            <div className="relative group">
                                <button className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-800 hover:border-primary transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined text-lg font-black italic">currency_bitcoin</span>
                                        </div>
                                        <span className="font-bold">{selectedAsset}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Range</label>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center bg-slate-50 dark:bg-slate-850 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-slate-400 text-sm mr-3">calendar_today</span>
                                    <span className="text-sm font-bold">Oct 12, 2023</span>
                                </div>
                                <div className="flex items-center bg-slate-50 dark:bg-slate-850 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-slate-400 text-sm mr-3">event</span>
                                    <span className="text-sm font-bold">Oct 19, 2023</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timeframe</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['1m', '5m', '15m', '1h'].map((t) => (
                                    <button key={t} className={`py-2 rounded-xl text-[10px] font-black border ${t === '15m' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] h-14 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                            Load Session
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="pl-80 pt-16 h-screen flex flex-col">
                {/* Replay Controls Header */}
                <div className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8">
                    <div className="flex items-center gap-6">
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`size-12 rounded-xl flex items-center justify-center transition-all ${isPlaying ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                <span className="material-symbols-outlined text-2xl font-black">
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                </span>
                            </button>
                            <button className="size-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
                                <span className="material-symbols-outlined text-2xl font-black">skip_next</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Speed</span>
                            <div className="flex gap-2">
                                {[1, 5, 10, 50].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSpeed(s)}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${speed === s ? 'bg-primary text-white' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
                                    >
                                        {s}x
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 font-mono font-bold">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase text-slate-400 font-display font-black tracking-widest leading-none">Simulated Time</span>
                            <span className="text-sm">2023-10-15 14:32:11</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200 dark:border-slate-800"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase text-green-500 font-display font-black tracking-widest leading-none">P/L (UNREALIZED)</span>
                            <span className="text-sm text-green-500">+$234.20 (2.1%)</span>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 p-8 grid grid-cols-12 gap-6 overflow-hidden">
                    <div className="col-span-9 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h3 className="font-black text-lg">BTC / USDT</h3>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">Historical</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <span className="material-symbols-outlined text-slate-400">draw</span>
                                </button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <span className="material-symbols-outlined text-slate-400">settings</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-950/20 m-6 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col items-center gap-4 text-center p-12">
                                <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-4xl">candlestick_chart</span>
                                </div>
                                <h4 className="text-xl font-bold">TradingView Replay Active</h4>
                                <p className="max-w-[300px] text-sm text-slate-500 font-medium">Visualization of historical market moves. Drag the timeline above to scrub through history.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Stats/Tools */}
                    <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Position Details</h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-500">Entry Price</span>
                                    <span className="text-sm font-bold">$27,432.10</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-500">Current Price</span>
                                    <span className="text-sm font-bold">$28,102.50</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-500">Quantity</span>
                                    <span className="text-sm font-bold">0.45 BTC</span>
                                </div>
                            </div>
                            <button className="w-full h-12 rounded-2xl bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500/20 transition-all">
                                Close simulated position
                            </button>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 flex flex-col gap-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Backtest Order Book</h4>
                            <div className="flex flex-col gap-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="text-red-500">{(28102.50 + i * 2).toFixed(2)}</span>
                                        <span className="text-slate-500">{(Math.random() * 2).toFixed(3)}</span>
                                    </div>
                                ))}
                                <div className="py-2 flex justify-center border-y border-slate-100 dark:border-slate-800 font-bold text-sm">
                                    28,102.50
                                </div>
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="text-green-500">{(28102.50 - (i + 1) * 2).toFixed(2)}</span>
                                        <span className="text-slate-500">{(Math.random() * 2).toFixed(3)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Timeline */}
                <div className="h-24 px-8 pb-8">
                    <div className="h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center px-4 relative">
                        <div className="absolute left-4 right-4 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        <div className="absolute left-4 right-1/2 h-1 bg-primary rounded-full shadow-lg shadow-primary/30"></div>
                        <div className="absolute left-1/2 -top-2 -bottom-2 w-0.5 bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                            <div className="size-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                        </div>
                        <div className="w-full flex justify-between mt-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>12 Oct</span>
                            <span>14 Oct</span>
                            <span>16 Oct</span>
                            <span>18 Oct</span>
                            <span>20 Oct</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
