'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
    const { user, isLoading } = useAuthStore();
    const router = useRouter();

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

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
            <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-20">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/dashboard" className="size-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight">Account Settings</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Sidebar Tabs Simulation */}
                    <aside className="flex flex-col gap-2">
                        {[
                            { id: 'profile', icon: 'person', label: 'Profile' },
                            { id: 'security', icon: 'palette', label: 'Appearance' },
                            { id: 'billing', icon: 'verified_user', label: 'Security' },
                            { id: 'notifications', icon: 'notifications', label: 'Notifications' },
                            { id: 'advanced', icon: 'code', label: 'Developer API' },
                        ].map((item) => (
                            <button key={item.id} className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${item.id === 'profile' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </aside>

                    {/* Content */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-primary/5">
                            <h3 className="text-xl font-black mb-8">Personal Information</h3>
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col sm:flex-row gap-8 items-center">
                                    <div className="size-24 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center border-4 border-white dark:border-slate-900 shadow-xl" style={{ backgroundImage: `url(${user.photoURL || 'https://lh3.googleusercontent.com/a/default-user'})` }}></div>
                                    <div className="flex flex-col gap-3 text-center sm:text-left">
                                        <div className="flex gap-2">
                                            <button className="px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors">Update Photo</button>
                                            <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Remove</button>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Display Name</label>
                                        <input type="text" defaultValue={user.displayName || ''} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:ring-2 font-display ring-primary/20 outline-none" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                                        <input type="email" readOnly defaultValue={user.email || ''} className="bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold text-slate-400 outline-none cursor-not-allowed" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Bio</label>
                                    <textarea rows={4} placeholder="Tell the community about your trading style..." className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-medium focus:ring-2 font-display ring-primary/20 outline-none resize-none"></textarea>
                                </div>

                                <button className="w-fit px-10 py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Save Profile</button>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 border-red-500/20">
                            <h3 className="text-xl font-black mb-4 text-red-500">Danger Zone</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">Once you delete your account, there is no going back. All your trade history, demo funds and leaderboards progress will be permanently erased.</p>
                            <button className="px-8 py-3 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/30">Delete Trading Account</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
