'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OnboardingPage() {
    const { user, isLoading } = useAuthStore();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [balance, setBalance] = useState(100000);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleComplete = () => {
        router.push('/dashboard');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-[640px] bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Left Side: Illustration/Stats */}
                <div className="w-full md:w-5/12 bg-primary/5 p-10 flex flex-col justify-between border-r border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary font-black">rocket_launch</span>
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Get Started</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20">
                            <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
                        </div>
                        <h3 className="text-2xl font-black leading-tight">Welcome to the future of trading.</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">We've credited your account with demo USDT to help you master the markets without risk.</p>
                    </div>

                    <div className="flex gap-1.5">
                        {[1, 2].map((i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-primary' : 'w-2 bg-slate-200 dark:bg-slate-800'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 p-10 flex flex-col justify-center gap-8">
                    {step === 1 ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl font-black tracking-tight">Initialize Demo Wallet</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Choose your starting balance for the simulator.</p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-3">
                                    {[10000, 50000, 100000, 250000].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => setBalance(val)}
                                            className={`py-4 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${balance === val ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
                                        >
                                            {val.toLocaleString()} USDT
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Custom Amount</label>
                                    <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-800">
                                        <input
                                            type="number"
                                            value={balance}
                                            onChange={(e) => setBalance(Number(e.target.value))}
                                            className="flex-1 bg-transparent border-none font-mono font-bold focus:ring-0 p-0"
                                        />
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">USDT</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] h-14 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                            >
                                Next Step
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-3 text-center items-center">
                                <div className="size-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                                    <span className="material-symbols-outlined text-3xl">verified</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">You're All Set!</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-[300px]">Your demo wallet is active and loaded with <strong>{balance.toLocaleString()} USDT</strong>.</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Account ID</span>
                                    <span className="text-xs font-mono font-bold truncate max-w-[150px]">{user.uid}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
                                    <span className="text-xs font-bold text-slate-400">Account Status</span>
                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded">Ready</span>
                                </div>
                            </div>

                            <button
                                onClick={handleComplete}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] h-14 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-4"
                            >
                                Go To Terminal
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Back To Settings
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
