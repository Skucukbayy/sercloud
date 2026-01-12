"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useUsers } from '@/lib/users';
import { motion } from 'framer-motion';
import { Server, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBranding } from '@/lib/branding';

export default function SetupPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const { install, login } = useAuth();
    const { addUser } = useUsers();
    const { branding, updateBranding } = useBranding();

    const [formData, setFormData] = useState({
        domain: 'localhost',
        port: 3000,
        adminName: 'Admin',
        adminEmail: 'admin@example.com',
        adminPassword: '',
        companyName: 'My Company',
    });

    const validateStep = (currentStep: number) => {
        if (currentStep === 1) {
            if (!formData.domain || !formData.port) {
                alert("Please enter Domain and Port.");
                return false;
            }
        }
        if (currentStep === 2) {
            if (!formData.adminName || !formData.adminEmail || !formData.adminPassword) {
                alert("Please fill in all Admin details, including Password.");
                return false;
            }
        }
        return true;
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault(); // Stop any default behavior
        if (validateStep(step)) {
            console.log("Validation passed. Moving to step:", step + 1);
            setStep(s => s + 1);
        }
    };

    const handleFinish = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("Finishing setup...");
        try {
            updateBranding({ ...branding, companyName: formData.companyName });
            addUser({
                name: formData.adminName,
                email: formData.adminEmail,
                password: formData.adminPassword,
                role: 'Admin',
                status: 'Active',
                storageLimitGB: 1000,
                fileCountLimit: 1000000,
            });
            install(formData.domain, formData.port);
            // Auto login after setup
            const user = login(formData.adminEmail, formData.adminPassword);
            console.log("Redirecting to admin...", user);
            router.push('/admin');
        } catch (error) {
            console.error("Setup failed:", error);
            alert("Setup failed. Check console for details.");
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_transparent_50%)] opacity-30" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative"
            >
                <div className="bg-slate-900/50 p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Server className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-lg">System Installation</h1>
                            <p className="text-slate-500 text-xs">SerCloud Setup Wizard</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-blue-500' : 'bg-slate-700'}`} />
                        ))}
                    </div>
                </div>

                <div className="p-10">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Step 1: Server Configuration</h2>
                            <p className="text-slate-400">Configure where this SerCloud instance will be hosted.</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Domain / IP</label>
                                    <input
                                        value={formData.domain}
                                        onChange={e => setFormData({ ...formData, domain: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Port</label>
                                    <input
                                        type="number"
                                        value={formData.port}
                                        onChange={e => setFormData({ ...formData, port: parseInt(e.target.value) })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Organization Name</label>
                                <input
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Step 2: Create Administrator</h2>
                            <p className="text-slate-400">Setup the root Super Admin account for system management.</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Admin Name</label>
                                    <input
                                        value={formData.adminName}
                                        onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                    <input
                                        value={formData.adminEmail}
                                        onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                                    <input
                                        type="password"
                                        value={formData.adminPassword}
                                        onChange={e => setFormData({ ...formData, adminPassword: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6 py-8">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-500/20">
                                <ShieldCheck size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Ready to Install!</h2>
                                <p className="text-slate-400 max-w-sm mx-auto">Your configuration is complete. Click below to finalize the setup and access SerCloud.</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl max-w-sm mx-auto text-left space-y-2 border border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Domain:</span>
                                    <span className="text-slate-200 font-mono">{formData.domain}:{formData.port}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Organization:</span>
                                    <span className="text-slate-200">{formData.companyName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Admin:</span>
                                    <span className="text-slate-200">{formData.adminEmail}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-slate-900/50 border-t border-white/5 flex justify-end gap-3">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(s => s - 1)}
                            className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-all"
                        >
                            Back
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            Next Step <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleFinish}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20"
                        >
                            Finalize Installation <ShieldCheck size={18} />
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
