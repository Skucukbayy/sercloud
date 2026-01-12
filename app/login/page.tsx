"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { useBranding } from '@/lib/branding';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [setupSuccess, setSetupSuccess] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const { branding } = useBranding();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('setup') === 'success') {
            setSetupSuccess(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = login(email, password);
        if (user) {
            if (user.role === 'Admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_transparent_50%)] opacity-30" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass rounded-3xl border border-white/10 shadow-2xl p-8 relative"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20 text-blue-500">
                        {branding.logoUrl ? <img src={branding.logoUrl} className="w-10 h-10 object-contain" /> : <Shield size={32} />}
                    </div>
                    <h1 className="text-2xl font-bold text-white">{branding.companyName || 'SerCloud'}</h1>
                    <p className="text-slate-500 text-sm">Secure Access Portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none pr-10"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        </div>
                    </div>

                    {setupSuccess && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs text-center font-bold flex items-center justify-center gap-2">
                            <ShieldCheck size={16} /> System Installed Successfully. Please Login.
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
                    >
                        Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </button>
                </form>

                <p className="text-center text-slate-600 text-xs mt-8">
                    Protected by SerCloud Security™
                </p>
            </motion.div>
        </div>
    );
}
