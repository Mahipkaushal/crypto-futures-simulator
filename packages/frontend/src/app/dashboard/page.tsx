"use client";

import { useAuthStore } from '@/store/use-auth-store';
import { useAuth } from '@/hooks/use-auth';
import { useWallet } from '@/hooks/use-wallet';
import { usePositions } from '@/hooks/use-positions';
import { useTrades } from '@/hooks/use-trades';
import { useMarketData } from '@/hooks/use-market-data';
import { useOrders } from '@/hooks/use-orders';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TradingViewChart from '@/components/trading-view-chart';

export default function DashboardPage() {
    const { user, isLoading: isAuthLoading } = useAuthStore();
    const { logout } = useAuth();
    const router = useRouter();

    // Dynamic Data Hooks
    const { data: wallet, isLoading: isWalletLoading } = useWallet();
    const { positions, closePosition, isClosing } = usePositions();
    const { data: trades } = useTrades();
    const { orders, placeOrder, cancelOrder, isPlacing, isCancelling } = useOrders();
    const prices = useMarketData();

    const [activeTab, setActiveTab] = useState('positions');
    const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
    const [orderSize, setOrderSize] = useState('');
    const [limitPrice, setLimitPrice] = useState('');
    const [leverage, setLeverage] = useState(10);
    const [symbol, setSymbol] = useState('BTCUSDT');
    const [interval, setInterval] = useState('60'); // Minutes

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    const handlePlaceOrder = async (side: 'BUY' | 'SELL') => {
        if (!orderSize || isPlacing) return;
        try {
            const currentPrice = prices[symbol] || 0;
            await placeOrder({
                symbol,
                side,
                type: orderType,
                size: parseFloat(orderSize),
                price: orderType === 'LIMIT' ? parseFloat(limitPrice) : currentPrice,
                leverage,
                marginType: 'CROSS'
            });
            setOrderSize('');
            if (orderType === 'LIMIT') setLimitPrice('');
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to place order');
        }
    };

    if (isAuthLoading || !user) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const currentPrice = prices[symbol] || 0;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display overflow-hidden h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined text-primary">view_in_ar</span>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">FutureTrade24</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link className="text-primary text-sm font-medium leading-normal" href="/dashboard">Dashboard</Link>
                        <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium leading-normal transition-colors" href="/markets">Markets</Link>
                        <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium leading-normal transition-colors" href="/insights">Insights</Link>
                        <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium leading-normal transition-colors" href="/portfolio">Portfolio</Link>
                    </nav>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <div className="hidden sm:flex items-center h-10 w-64 bg-slate-100 dark:bg-slate-800 rounded-lg px-3">
                        <span className="material-symbols-outlined text-slate-500 text-xl">search</span>
                        <input className="w-full bg-transparent border-none text-slate-900 dark:text-white text-sm focus:ring-0 placeholder-slate-500 ml-2" placeholder="Search markets..." type="text" />
                    </div>
                    <button className="h-10 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors hidden sm:block">
                        Deposit Demo
                    </button>
                    <div className="flex items-center gap-3 ml-2">
                        <div
                            className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center cursor-pointer relative group"
                            style={{ backgroundImage: `url(${user.photoURL || 'https://lh3.googleusercontent.com/a/default-user'})` }}
                        >
                            <div className="absolute right-0 top-12 hidden group-hover:block bg-slate-900 border border-slate-800 rounded-lg p-2 shadow-xl z-50 min-w-[150px]">
                                <div className="px-4 py-2 border-b border-slate-800 mb-2">
                                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                                <button onClick={() => logout()} className="text-sm text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-md w-full text-left flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">logout</span> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Ticker Bar */}
            <div className="flex overflow-x-auto whitespace-nowrap border-b border-slate-200 dark:border-slate-800 py-2 px-6 gap-6 shrink-0 hide-scrollbar bg-white dark:bg-slate-900/20">
                {[
                    { label: 'BTC/USDT', value: 'BTCUSDT', change: '+2.4%' },
                    { label: 'ETH/USDT', value: 'ETHUSDT', change: '-1.2%' },
                    { label: 'SOL/USDT', value: 'SOLUSDT', change: '+5.1%' },
                    { label: 'BNB/USDT', value: 'BNBUSDT', change: '+0.8%' }
                ].map((m, idx) => (
                    <div
                        key={m.value}
                        onClick={() => setSymbol(m.value)}
                        className={`flex items-center gap-2 cursor-pointer transition-all hover:opacity-80 ${idx > 0 ? 'border-l border-slate-200 dark:border-slate-800 pl-6' : ''} ${symbol === m.value ? 'opacity-100' : 'opacity-60'}`}
                    >
                        <span className={`text-sm font-semibold ${symbol === m.value ? 'text-primary' : ''}`}>{m.label}</span>
                        <span className={`text-sm font-medium ${prices[m.value] > (m.value === 'BTCUSDT' ? 45000 : m.value === 'ETHUSDT' ? 2400 : 0) ? 'text-green-500' : 'text-red-500'}`}>
                            {(prices[m.value] || 0).toFixed(2)}
                        </span>
                        <span className={`text-xs ${m.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{m.change}</span>
                        {symbol === m.value && <div className="w-1 h-1 bg-primary rounded-full ml-1"></div>}
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Order Book */}
                <aside className="hidden xl:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 bg-white dark:bg-slate-900/10">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-background-light dark:bg-background-dark z-10">
                        <h3 className="font-semibold text-xs tracking-wider uppercase text-slate-500">Order Book</h3>
                        <div className="flex gap-2">
                            <span className="material-symbols-outlined text-slate-400 text-sm">settings_input_component</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 px-4 py-2 text-[10px] tracking-widest uppercase text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <span>Price</span>
                        <span className="text-right">Size</span>
                        <span className="text-right">Total</span>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-1 text-xs font-mono flex flex-col-reverse scrollbar-hide">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="grid grid-cols-3 py-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 relative group">
                                <div className="absolute right-0 top-0 bottom-0 bg-red-500/5 dark:bg-red-500/10 w-[40%] z-0"></div>
                                <span className="text-red-500 relative z-10">{(currentPrice + (i + 1) * 2.5).toFixed(2)}</span>
                                <span className="text-right relative z-10 text-slate-600 dark:text-slate-300">0.500</span>
                                <span className="text-right relative z-10 text-slate-600 dark:text-slate-300">22.6K</span>
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-500">{currentPrice.toLocaleString()}</span>
                            <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                        </div>
                        <span className="text-xs text-slate-500">Last: {currentPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-1 text-xs font-mono flex flex-col scrollbar-hide">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="grid grid-cols-3 py-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 relative group">
                                <div className="absolute right-0 top-0 bottom-0 bg-green-500/5 dark:bg-green-500/10 w-[60%] z-0"></div>
                                <span className="text-green-500 relative z-10">{(currentPrice - (i + 1) * 2.5).toFixed(2)}</span>
                                <span className="text-right relative z-10 text-slate-600 dark:text-slate-300">0.800</span>
                                <span className="text-right relative z-10 text-slate-600 dark:text-slate-300">36.1K</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Center Panel: Chart & Data */}
                <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900/5 overflow-hidden">
                    <div className="h-[55%] border-b border-slate-200 dark:border-slate-800 relative flex flex-col p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-black text-2xl tracking-tight">{symbol.replace('USDT', '/USDT')}</h3>
                                    <span className="text-blue-500 text-xs font-black uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">Perpetual</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-500 text-xl font-bold">{currentPrice.toLocaleString()}</span>
                                    <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                                        <span className="material-symbols-outlined text-sm">arrow_drop_up</span>
                                        +2.45%
                                    </div>
                                    <span className="text-slate-400 text-sm font-medium border-l border-slate-800 pl-4 ml-2">24h Vol: 1.2B USDT</span>
                                </div>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
                                {[
                                    { label: '1M', value: '1' },
                                    { label: '5M', value: '5' },
                                    { label: '15M', value: '15' },
                                    { label: '1H', value: '60' },
                                    { label: '4H', value: '240' },
                                    { label: '1D', value: 'D' }
                                ].map((t) => (
                                    <button
                                        key={t.label}
                                        onClick={() => setInterval(t.value)}
                                        className={`px-3 py-1.5 text-[10px] font-black tracking-widest rounded-lg transition-all ${interval === t.value ? 'bg-white dark:bg-slate-700 text-primary shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                            <TradingViewChart symbol={symbol} interval={interval} />
                        </div>
                    </div>

                    {/* Bottom Tabs */}
                    {/* Bottom Tabs Area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900/20">
                            {['positions', 'orders', 'history', 'assets'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveTab(t)}
                                    className={`px-4 py-4 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === t ? 'text-primary' : 'text-slate-500'}`}
                                >
                                    {t} ({t === 'positions' ? positions.length : t === 'orders' ? orders.length : 0})
                                    {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                            {activeTab === 'positions' && (
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="text-[10px] uppercase font-black tracking-widest text-slate-500 py-4">
                                        <tr>
                                            <th className="py-4 font-black">Contracts</th>
                                            <th className="py-4 font-black text-right">Size</th>
                                            <th className="py-4 font-black text-right">Entry Price</th>
                                            <th className="py-4 font-black text-right">Mark Price</th>
                                            <th className="py-4 font-black text-right">PnL (ROE%)</th>
                                            <th className="py-4 font-black text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {positions.map((pos: any) => {
                                            const posCurrentPrice = prices[pos.symbol] || parseFloat(pos.entryPrice);
                                            const pnl = (posCurrentPrice - parseFloat(pos.entryPrice)) * pos.size * (pos.side === 'LONG' ? 1 : -1);
                                            const roe = (pnl / (parseFloat(pos.entryPrice) * pos.size / pos.leverage)) * 100;
                                            return (
                                                <tr key={pos.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-sm">{pos.symbol}</span>
                                                            <div className="flex gap-1.5 mt-1">
                                                                <span className={`text-[10px] font-black px-1.5 rounded uppercase ${pos.side === 'LONG' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{pos.side}</span>
                                                                <span className="text-[10px] font-black text-primary bg-primary/10 px-1.5 rounded uppercase">{pos.leverage}x</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-right font-mono font-bold">{pos.size} BTC</td>
                                                    <td className="py-4 text-right font-mono text-slate-400">{parseFloat(pos.entryPrice).toLocaleString()}</td>
                                                    <td className="py-4 text-right font-mono text-slate-400">{posCurrentPrice.toLocaleString()}</td>
                                                    <td className="py-4 text-right">
                                                        <div className="flex flex-col items-end">
                                                            <span className={`font-black text-lg ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}</span>
                                                            <span className={`text-[10px] font-black tracking-widest ${roe >= 0 ? 'text-green-500' : 'text-red-500'}`}>{roe >= 0 ? '+' : ''}{roe.toFixed(2)}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <button
                                                            disabled={isClosing}
                                                            onClick={() => closePosition({ id: pos.id, currentPrice: posCurrentPrice })}
                                                            className="text-[10px] font-black uppercase text-red-500 bg-red-500/10 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                        >
                                                            Market Close
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {positions.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-slate-500 uppercase tracking-widest text-xs font-black">No Active Positions</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === 'orders' && (
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="text-[10px] uppercase font-black tracking-widest text-slate-500 py-4">
                                        <tr>
                                            <th className="py-4 font-black">Symbol</th>
                                            <th className="py-4 font-black text-right">Side</th>
                                            <th className="py-4 font-black text-right">Type</th>
                                            <th className="py-4 font-black text-right">Price</th>
                                            <th className="py-4 font-black text-right">Size</th>
                                            <th className="py-4 font-black text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {orders.map((order: any) => (
                                            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="py-4 font-black">{order.symbol}</td>
                                                <td className="py-4 text-right">
                                                    <span className={`text-[10px] font-black px-1.5 rounded uppercase ${order.side === 'BUY' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{order.side}</span>
                                                </td>
                                                <td className="py-4 text-right text-xs font-bold uppercase text-slate-400">{order.type}</td>
                                                <td className="py-4 text-right font-mono font-bold text-primary">{parseFloat(order.price).toLocaleString()}</td>
                                                <td className="py-4 text-right font-mono">{order.size}</td>
                                                <td className="py-4 text-right">
                                                    <button
                                                        disabled={isCancelling}
                                                        onClick={() => cancelOrder(order.id)}
                                                        className="text-[10px] font-black uppercase text-slate-500 hover:text-red-500 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-slate-500 uppercase tracking-widest text-xs font-black">No Open Orders</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                            {activeTab === 'history' && (
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="text-[10px] uppercase font-black tracking-widest text-slate-500 py-4">
                                        <tr>
                                            <th className="py-4 font-black">Time</th>
                                            <th className="py-4 font-black">Symbol</th>
                                            <th className="py-4 font-black text-right">Type</th>
                                            <th className="py-4 font-black text-right">Size</th>
                                            <th className="py-4 font-black text-right">Price</th>
                                            <th className="py-4 font-black text-right">Realized PnL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {trades?.map((trade: any) => (
                                            <tr key={trade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="py-4 text-xs text-slate-500">{new Date(trade.createdAt).toLocaleString()}</td>
                                                <td className="py-4 font-black">{trade.symbol}</td>
                                                <td className="py-4 text-right">
                                                    <span className={`text-[10px] font-black px-1.5 rounded uppercase ${trade.type === 'OPEN' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 bg-slate-500/10'}`}>{trade.type}</span>
                                                </td>
                                                <td className="py-4 text-right font-mono">{trade.size}</td>
                                                <td className="py-4 text-right font-mono">{parseFloat(trade.price).toLocaleString()}</td>
                                                <td className={`py-4 text-right font-mono font-bold ${parseFloat(trade.pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {trade.pnl ? `${parseFloat(trade.pnl) >= 0 ? '+' : ''}${parseFloat(trade.pnl).toFixed(2)}` : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </section>

                {/* Right Panel: Trade Execution */}
                <aside className="w-full lg:w-80 flex flex-col border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/10 overflow-y-auto scrollbar-hide">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                        <div className="flex gap-2">
                            <button className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary">Cross</button>
                            <button className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-primary">10x</button>
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">tune</span></button>
                    </div>

                    <div className="flex border-b border-slate-200 dark:border-slate-800 p-1 bg-slate-100 dark:bg-slate-800/50 m-4 rounded-xl">
                        <button
                            onClick={() => setOrderType('LIMIT')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${orderType === 'LIMIT' ? 'bg-white dark:bg-slate-700 text-primary shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Limit
                        </button>
                        <button
                            onClick={() => setOrderType('MARKET')}
                            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${orderType === 'MARKET' ? 'bg-white dark:bg-slate-700 text-primary shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Market
                        </button>
                    </div>

                    <div className="px-5 flex-1 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available</span>
                            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                                {isWalletLoading ? '...' : parseFloat(wallet?.balance || 0).toLocaleString()} USDT
                            </span>
                        </div>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Price (USDT)</label>
                                <div className="flex items-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-all">
                                    <input
                                        className="flex-1 bg-transparent border-none text-right font-mono text-lg font-black focus:ring-0 p-0"
                                        type="number"
                                        readOnly={orderType === 'MARKET'}
                                        value={orderType === 'MARKET' ? currentPrice.toFixed(2) : limitPrice}
                                        onChange={(e) => setLimitPrice(e.target.value)}
                                        placeholder={orderType === 'MARKET' ? currentPrice.toFixed(2) : '0.00'}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Size (BTC)</label>
                                <div className="flex items-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-3 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-all">
                                    <input
                                        className="flex-1 bg-transparent border-none text-right font-mono text-lg font-black focus:ring-0 p-0"
                                        placeholder="0.00"
                                        type="number"
                                        value={orderSize}
                                        onChange={(e) => setOrderSize(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Slider simulation */}
                            <div className="flex flex-col gap-4 py-4">
                                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full relative">
                                    <div className="absolute inset-y-0 left-0 bg-primary w-0 rounded-full"></div>
                                    <div className="absolute size-4 bg-white border-2 border-primary rounded-full -top-1.5 shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
                                </div>
                                <div className="flex justify-between px-1">
                                    {[0, 25, 50, 75, 100].map((v) => (
                                        <span key={v} className="text-[9px] font-black text-slate-500">{v}%</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-10 pb-6">
                            <button
                                disabled={isPlacing || !orderSize || (orderType === 'LIMIT' && !limitPrice)}
                                onClick={() => handlePlaceOrder('BUY')}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-[0.3em] py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] disabled:opacity-50"
                            >
                                {isPlacing ? 'Executing...' : orderType === 'LIMIT' ? 'Buy / Long Limit' : 'Buy / Long'}
                            </button>
                            <button
                                disabled={isPlacing || !orderSize || (orderType === 'LIMIT' && !limitPrice)}
                                onClick={() => handlePlaceOrder('SELL')}
                                className="w-full border-2 border-red-500/30 hover:bg-red-500 hover:text-white text-red-500 font-black uppercase tracking-[0.3em] py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {isPlacing ? 'Executing...' : orderType === 'LIMIT' ? 'Sell / Short Limit' : 'Sell / Short'}
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
