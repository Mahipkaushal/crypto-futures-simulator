'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 md:px-10 py-3">
                <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                  <div className="size-6 text-primary">
                    <span className="material-symbols-outlined text-2xl">candlestick_chart</span>
                  </div>
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">FutureTrade24</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                  <div className="hidden md:flex items-center gap-9">
                    <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="/markets">Markets</Link>
                    <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="/dashboard">Trade</Link>
                    <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="/portfolio">Portfolio</Link>
                    <Link className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="/leaderboard">Leaderboard</Link>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/signup">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                        <span className="truncate">Sign Up</span>
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <span className="truncate">Log In</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </header>

              <div className="px-4 py-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-center px-4 py-10 md:px-10 relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(16, 25, 34, 0.9) 0%, rgba(16, 25, 34, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB21nKrm-jpGO-FwTe8pklqo1-Xhxy2uZUrLB_X5VeQ1HM3lArnYpCQSdvZfo3aGO4qSpWqRVdrKrsPztHq6GpM8l9jUYyUct1yl7l6bbBOtOrnpOHSlNBEXlisjdgGaprrjcJCyYq7rzfgBCw_7-yaP-4zaTi6bEZGy2FkMwwjOcpoCm58Eb5QZ_G86tdqPuw4zQWKNq5KpWCUHWsmFAeI-K5L_z6_OkTsevbD3_IpZVqoouOkjwocg_HxUMzKTDEbFv0Wqn4MjtSx")`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                  <div className="relative z-10 flex flex-col gap-6 text-left max-w-2xl">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                      Master Crypto Futures Risk-Free
                    </h1>
                    <h2 className="text-slate-300 text-base font-normal leading-normal md:text-lg">
                      Practice trading strategies with demo tokens and real-time market data on FutureTrade24. The ultimate educational platform for aspiring traders.
                    </h2>
                    <Link href="/signup">
                      <button className="flex w-fit min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        <span className="truncate">Start Trading Now</span>
                        <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-10 px-4 py-16">
                <div className="flex flex-col gap-4 text-center items-center">
                  <h2 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight md:text-4xl max-w-[720px]">
                    Why Choose FutureTrade24
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal max-w-[720px]">
                    Experience a premium fintech platform designed to elevate your trading skills without the financial risk.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:border-primary/50 transition-colors">
                    <div className="text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">shield</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Simulated Risk-Free Trading</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">Trade with demo tokens and test your strategies in a completely safe, risk-free environment.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:border-primary/50 transition-colors">
                    <div className="text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">monitoring</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Real-time Market Data</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">Access live market data, charts, and indicators to make informed and realistic trading decisions.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:border-primary/50 transition-colors">
                    <div className="text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">smart_toy</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">AI Trading Insights</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed">Leverage cutting-edge AI-driven insights to analyze complex market trends and patterns.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-8">
                <div className="flex flex-col gap-6 text-center mb-8">
                  <h2 className="text-slate-900 dark:text-white text-3xl font-bold">Pro-Level Trading Interface</h2>
                  <p className="text-slate-600 dark:text-slate-400">Everything you need to master futures trading in one powerful dashboard.</p>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-xl min-h-[500px] border border-slate-200 dark:border-slate-800 shadow-2xl relative"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtnbTQ5Wrt3geHFzx-9DILObfSIHte02r69TJS8A-aOYQIeqf6yvxNkft7qJtmdXsanUw0rXgYh-GoK2XTVjrIJOlCW_sN7h3dBcpz8owieMwBy1vSy_v3sKmATQ32AgEw2Nucb75hDO3dfnqe5bO5Y7gbzExqqFuMnRkuwo3ZBPjVLpNgETm0EjcxOonn3oLU9p2GWGu3q7VJ2FuU8LKndYJLRAghDxzT649V9alUpUE609yyR2CrymDGJfaPrfVWa6-YxFvPe3rc")`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent"></div>
                </div>
              </div>

              <footer className="flex flex-col gap-6 px-5 py-12 text-center border-t border-slate-200 dark:border-slate-800 mt-10">
                <div className="flex flex-wrap items-center justify-center gap-6 md:flex-row md:justify-center">
                  <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-normal leading-normal transition-colors" href="/terms">Terms of Service</Link>
                  <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-normal leading-normal transition-colors" href="/privacy">Privacy Policy</Link>
                  <Link className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-normal leading-normal transition-colors" href="/contact">Contact Us</Link>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-sm font-normal leading-normal">© 2024 FutureTrade24. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
