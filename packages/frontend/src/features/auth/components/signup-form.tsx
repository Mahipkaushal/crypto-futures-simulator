'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, loginWithGoogle, error } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            router.push('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[480px] mx-auto p-6">
            <div className="w-full flex flex-col gap-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/10">
                <div className="flex flex-col gap-2 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="size-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform hover:scale-110 duration-300">
                            <span className="material-symbols-outlined text-2xl">person_add</span>
                        </div>
                    </div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Create Account</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Join 50,000+ traders mastering the markets risk-free.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl h-14 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-750 transition-all active:scale-[0.98]"
                    >
                        <svg className="size-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Or email</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-4 py-3.5 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-all">
                                <span className="material-symbols-outlined text-slate-400 text-xl mr-3">badge</span>
                                <input
                                    className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="Enter your name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-4 py-3.5 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-all">
                                <span className="material-symbols-outlined text-slate-400 text-xl mr-3">mail</span>
                                <input
                                    className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="your@email.com"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-4 py-3.5 border border-slate-200 dark:border-slate-800 focus-within:border-primary transition-all">
                                <span className="material-symbols-outlined text-slate-400 text-xl mr-3">lock</span>
                                <input
                                    className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 p-0 text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-xs font-bold text-red-500 text-center animate-bounce">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] h-14 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-2"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                <div className="text-center pt-2">
                    <p className="text-sm text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-8 text-center max-w-[320px] leading-relaxed font-medium uppercase tracking-widest">
                By signing up, you agree to our <Link href="/terms" className="hover:text-primary underline">Terms of Service</Link> and <Link href="/privacy" className="hover:text-primary underline">Privacy Policy</Link>.
            </p>
        </div>
    );
}
