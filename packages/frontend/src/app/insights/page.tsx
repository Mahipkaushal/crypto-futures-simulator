"use client";

import { useAuthStore } from '@/store/use-auth-store';
import { useInsights } from '@/hooks/use-insights';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function InsightsPage() {
    const { user, isLoading: isAuthLoading } = useAuthStore();
    const { data: insights, isLoading: isInsightsLoading } = useInsights();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    if (isAuthLoading || !user) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const sentiment = insights?.sentiment || { score: 0, label: 'Loading...', socialBuzz: 0, newsSentiment: 'Checking...' };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen pb-20">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 mb-8 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-4 text-slate-900 dark:text-slate-100 transition-opacity hover:opacity-80">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-2xl">science</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">AI Insights</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-9">
                        <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/dashboard">Trade</Link>
                        <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/portfolio">Portfolio</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700"
                        style={{ backgroundImage: `url(${user.photoURL || 'https://lh3.googleusercontent.com/a/default-user'})` }}
                    />
                </div>
            </header>

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col gap-2 mb-10">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">BETA</span>
                        <h1 className="text-4xl font-black tracking-tight">AI Trading Assistant</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Harness the power of machine learning to analyze market sentiment and identify potential breakouts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sentiment Analysis */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-primary/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    Market Sentiment Analysis
                                </h3>
                                <span className="text-xs text-slate-500">Updated recently</span>
                            </div>

                            <div className="flex flex-col gap-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-4xl font-black ${sentiment.score > 50 ? 'text-green-500' : 'text-red-500'}`}>{sentiment.score} / 100</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-slate-500">{sentiment.label} Index</span>
                                    </div>
                                    <div className="w-1/2 h-4 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20"></div>
                                        <div
                                            className={`absolute inset-y-0 left-0 transition-all duration-1000 ${sentiment.score > 50 ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
                                            style={{ width: `${sentiment.score}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Social Buzz</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`material-symbols-outlined text-sm ${sentiment.socialBuzz > 0 ? 'text-green-500' : 'text-red-500'}`}>{sentiment.socialBuzz > 0 ? 'trending_up' : 'trending_down'}</span>
                                            <span className="font-bold">{sentiment.socialBuzz > 0 ? 'Highly Positive' : 'Declining'} ({sentiment.socialBuzz >= 0 ? '+' : ''}{sentiment.socialBuzz}%)</span>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">News Sentiment</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-blue-500 text-sm">info</span>
                                            <span className="font-bold">{sentiment.newsSentiment}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {insights?.signals.map((signal: any) => (
                                <div key={signal.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">{signal.type === 'BULLISH' ? 'Top AI Signal' : 'Risk Protection'}</h4>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center font-black text-xl ${signal.type === 'BULLISH' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                                            {signal.symbol.substring(0, 3)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-lg leading-tight tracking-tight">{signal.symbol}</span>
                                            <span className={`text-xs font-bold uppercase tracking-widest ${signal.type === 'BULLISH' ? 'text-green-500' : 'text-red-500'}`}>{signal.title}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6 italic font-medium">"{signal.description}"</p>
                                    {signal.type === 'BULLISH' ? (
                                        <Link href="/dashboard" className="block w-full text-center py-3 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary/90 transition-colors">Trade Signal</Link>
                                    ) : (
                                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Confidence Level</span>
                                            <span className="text-xs font-black text-slate-900 dark:text-white">{signal.confidence}%</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Advisor Chat Simulation */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary invisible group-hover:visible animate-pulse"></div>
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                            <div className="relative">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black tracking-tight">{insights?.chatContext?.agentName || 'AlphaBot 1.0'}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{insights?.chatContext?.status || 'Autonomous Assistant'}</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2 max-w-[85%] self-start">
                                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed border border-slate-200/50 dark:border-slate-700/50">
                                    {insights?.chatContext?.welcomeMessage || "Hello! I've been monitoring the markets. How can I help you today?"}
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">AlphaBot • Recently</span>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 focus-within:ring-2 ring-primary/20 transition-all shadow-inner">
                                <input type="text" placeholder="Ask AlphaBot anything..." className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-0 text-slate-900 dark:text-white" />
                                <button className="text-primary hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
