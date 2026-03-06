"use client";

import { useAuthStore } from '@/store/use-auth-store';
import { useWallet } from '@/hooks/use-wallet';
import { usePositions } from '@/hooks/use-positions';
import { useTrades } from '@/hooks/use-trades';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
    const { user, isLoading: isAuthLoading } = useAuthStore();
    const { data: wallet } = useWallet();
    const { positions = [] } = usePositions();
    const { data: trades = [] } = useTrades();
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

    const balance = wallet?.balance || 0;
    const equity = balance + positions.reduce((acc: number, p: any) => acc + (p.pnl || 0), 0);
    const winRate = trades.length > 0
        ? ((trades.filter((t: any) => t.pnl > 0).length / trades.length) * 100).toFixed(1)
        : '0.0';

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <div className="layout-container flex h-full grow flex-col">
                <div className="md:px-20 lg:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
                        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-10 py-4 mb-8">
                            <div className="flex items-center gap-8">
                                <Link href="/" className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                                    <div className="size-6 text-primary">
                                        <span className="material-symbols-outlined text-2xl">candlestick_chart</span>
                                    </div>
                                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">FutureTrade24</h2>
                                </Link>
                                <nav className="hidden md:flex items-center gap-9">
                                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/dashboard">Dashboard</Link>
                                    <Link className="text-slate-900 dark:text-slate-100 text-sm font-bold leading-normal border-b-2 border-primary pb-1" href="/portfolio">Portfolio</Link>
                                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/markets">Markets</Link>
                                    <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/insights">Insights</Link>
                                </nav>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard">
                                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-white text-sm font-medium leading-normal transition-colors">
                                        Trade Now
                                    </button>
                                </Link>
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700"
                                    style={{ backgroundImage: `url(${user.photoURL || 'https://lh3.googleusercontent.com/a/default-user'})` }}
                                />
                            </div>
                        </header>

                        <div className="flex flex-col gap-8 px-6 md:px-10 pb-12">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight">Portfolio Performance</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Track your trading journey, analyze performance, and refine your strategy with demo funds.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span> Total Equity
                                    </p>
                                    <p className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight mt-1">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(equity)}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="material-symbols-outlined text-green-500 text-[16px]">trending_up</span>
                                        <p className="text-green-500 text-sm font-medium leading-normal">Live Update</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">payments</span> Demo Balance
                                    </p>
                                    <p className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight mt-1">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance)}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2 italic font-medium tracking-wide leading-normal">Available for trading</p>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">monitoring</span> Win Rate
                                    </p>
                                    <p className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight mt-1">{winRate}%</p>
                                    <p className="text-slate-400 text-xs mt-2 italic font-medium tracking-wide leading-normal">Last {trades.length} trades</p>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">military_tech</span> Trade Count
                                    </p>
                                    <p className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight mt-1">{trades.length}</p>
                                    <p className="text-primary text-xs mt-2 font-bold tracking-wide uppercase leading-normal">Active Trader</p>
                                </div>
                            </div>

                            {/* Performance Chart Simulation */}
                            <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">show_chart</span>
                                        Equity Growth
                                    </h3>
                                    <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                        <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-slate-700 shadow-sm">LIVE</button>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-950/50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
                                    <div className="text-center">
                                        <span className="material-symbols-outlined text-4xl mb-2">analytics</span>
                                        <p>Performance Analytics Chart Integration</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
