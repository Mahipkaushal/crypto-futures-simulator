"use client";

import { useAuthStore } from '@/store/use-auth-store';
import { useLeaderboard } from '@/hooks/use-leaderboard';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeaderboardPage() {
    const { user, isLoading: isAuthLoading } = useAuthStore();
    const { data: leaders = [], isLoading: isLeaderboardLoading } = useLeaderboard();
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

    const topThree = leaders.slice(0, 3);
    const rest = leaders.length > 3 ? leaders.slice(3) : [];

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen pb-20">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 mb-8 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-2xl">emoji_events</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Global Leaderboard</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-9">
                        <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/dashboard">Trade</Link>
                        <Link className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 text-sm font-medium leading-normal transition-colors" href="/insights">Insights</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-[1000px] mx-auto px-6">
                <div className="flex flex-col gap-4 text-center items-center mb-12">
                    <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">Hall of Fame</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">Meet the world's most profitable simulated futures traders. Can you beat their strategy?</p>
                </div>

                {/* Top 3 Podium Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
                    {/* #2 */}
                    {topThree[1] && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center order-2 md:order-1 h-fit transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative size-20 mx-auto mb-4">
                                <div className="absolute -top-2 -right-2 bg-slate-200 dark:bg-slate-700 size-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900">2</div>
                                <img src={topThree[1].avatar} className="rounded-full size-20 border-4 border-slate-200 dark:border-slate-700" alt="avatar" />
                            </div>
                            <h3 className="font-black text-lg mb-1">{topThree[1].name}</h3>
                            <p className="text-green-500 font-black text-xl mb-4">+${topThree[1].pnl}</p>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full">{topThree[1].winRate}% Win Rate</span>
                        </div>
                    )}

                    {/* #1 */}
                    {topThree[0] && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border-2 border-primary text-center order-1 md:order-2 shadow-2xl shadow-primary/20 transform hover:-translate-y-4 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-primary"></div>
                            <div className="relative size-28 mx-auto mb-6">
                                <div className="absolute -top-4 -right-2 bg-primary size-12 rounded-full flex items-center justify-center font-black text-lg text-white border-4 border-white dark:border-slate-900 shadow-xl shadow-primary/40 animate-bounce">1</div>
                                <img src={topThree[0].avatar} className="rounded-full size-28 border-4 border-primary shadow-lg shadow-primary/20" alt="avatar" />
                            </div>
                            <h3 className="font-black text-2xl mb-1">{topThree[0].name}</h3>
                            <p className="text-green-500 font-black text-3xl mb-6">+${topThree[0].pnl}</p>
                            <span className="px-4 py-2 bg-primary/10 text-[12px] font-black uppercase tracking-[0.2em] text-primary rounded-full">{topThree[0].winRate}% Win Rate</span>
                        </div>
                    )}

                    {/* #3 */}
                    {topThree[2] && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center order-3 md:order-3 h-fit transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative size-20 mx-auto mb-4">
                                <div className="absolute -top-2 -right-2 bg-amber-700/80 size-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-slate-900 text-white">3</div>
                                <img src={topThree[2].avatar} className="rounded-full size-20 border-4 border-amber-800/30" alt="avatar" />
                            </div>
                            <h3 className="font-black text-lg mb-1">{topThree[2].name}</h3>
                            <p className="text-green-500 font-black text-xl mb-4">+${topThree[2].pnl}</p>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-full">{topThree[2].winRate}% Win Rate</span>
                        </div>
                    )}
                </div>

                {/* Full Ranking Table */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500">Global Rankings Overview</h3>
                    </div>
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-6">
                                <th className="px-8 py-6">Rank</th>
                                <th className="px-8 py-6">Trader</th>
                                <th className="px-8 py-6 text-right">PnL</th>
                                <th className="px-8 py-6 text-right">Win Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {leaders.map((leader: any) => (
                                <tr key={leader.rank} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <span className={`font-black text-lg ${leader.rank <= 3 ? (leader.rank === 1 ? 'text-primary' : 'text-slate-400') : 'text-slate-300 dark:text-slate-700'}`}>
                                            {leader.rank.toString().padStart(2, '0')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={leader.avatar} className="size-10 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary transition-colors" alt="avatar" />
                                            <div className="flex flex-col">
                                                <span className="font-black tracking-tight">{leader.name}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Trader</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-green-500">+${leader.pnl}</td>
                                    <td className="px-8 py-6 text-right font-bold text-slate-500">{leader.winRate}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/20 text-center">
                        <p className="text-xs text-slate-500 italic">Rankings updated every 24 hours</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
