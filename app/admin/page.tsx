"use client";

import { Users, Database, Globe, Activity, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useUsers } from "@/lib/users";
import { useBranding } from "@/lib/branding";
import { useState, useEffect } from "react";

const StatCard = ({ icon: Icon, label, value, trend, trendType }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-3xl"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-white/5 text-slate-400">
                <Icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${trendType === 'up' ? 'text-emerald-500' : trendType === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
                {trendType === 'up' ? <ArrowUpRight size={14} /> : trendType === 'down' ? <ArrowDownRight size={14} /> : <Minus size={14} />}
                {trend}
            </div>
        </div>
        <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const { users } = useUsers();
    const { branding } = useBranding();
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalStorageGB: 0,
        usedStorageGB: 0,
        totalFiles: 0
    });

    useEffect(() => {
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.status === 'Active').length;
        const totalStorageGB = users.reduce((acc, u) => acc + (u.storageLimitGB || 0), 0);
        const usedStorageGB = users.reduce((acc, u) => acc + (u.usedStorageGB || 0), 0);
        const totalFiles = users.reduce((acc, u) => acc + (u.usedFileCount || 0), 0);

        setStats({ totalUsers, activeUsers, totalStorageGB, usedStorageGB, totalFiles });
    }, [users]);

    const formatStorage = (gb: number) => {
        if (gb >= 1000) return `${(gb / 1000).toFixed(1)} TB`;
        return `${gb.toFixed(1)} GB`;
    };

    return (
        <div className="p-10 space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-1">System Overview</h1>
                <p className="text-slate-500 text-sm">Real-time health and statistics of {branding.companyName || 'SerCloud'}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Total Users" value={stats.totalUsers.toString()} trend={stats.activeUsers > 0 ? `${stats.activeUsers} active` : '0 active'} trendType={stats.activeUsers > 0 ? 'up' : 'neutral'} />
                <StatCard icon={Database} label="Storage Used" value={formatStorage(stats.usedStorageGB)} trend={`of ${formatStorage(stats.totalStorageGB)}`} trendType={stats.usedStorageGB > 0 ? 'up' : 'neutral'} />
                <StatCard icon={Globe} label="Total Storage Limit" value={formatStorage(stats.totalStorageGB)} trend="allocated" trendType="neutral" />
                <StatCard icon={Activity} label="Total Files" value={stats.totalFiles.toString()} trend="files uploaded" trendType={stats.totalFiles > 0 ? 'up' : 'neutral'} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-[2rem] space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Registered Users</h2>
                        <button className="text-xs font-bold text-blue-500 hover:text-blue-400">View all</button>
                    </div>
                    <div className="space-y-4">
                        {users.length === 0 ? (
                            <div className="flex items-center justify-center p-8 text-slate-500">
                                <p>No users registered yet.</p>
                            </div>
                        ) : (
                            users.slice(0, 5).map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-200">{user.name} <span className="text-slate-500 font-normal">({user.email})</span></p>
                                            <p className="text-[10px] text-slate-500 mt-1">Last login: {user.lastLogin}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        {user.role}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="glass p-8 rounded-[2rem] space-y-6">
                    <h2 className="text-xl font-bold text-white">User Storage Usage</h2>
                    <div className="space-y-6">
                        {users.length === 0 ? (
                            <div className="flex items-center justify-center p-4 text-slate-500">
                                <p>No data available.</p>
                            </div>
                        ) : (
                            users.slice(0, 3).map((user) => {
                                const usagePercent = user.storageLimitGB > 0
                                    ? Math.round((user.usedStorageGB / user.storageLimitGB) * 100)
                                    : 0;
                                return (
                                    <div key={user.id} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">{user.name}</span>
                                            <span className="text-slate-200 font-bold">{formatStorage(user.usedStorageGB)} / {formatStorage(user.storageLimitGB)}</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${usagePercent > 80 ? 'bg-rose-500' : usagePercent > 50 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${usagePercent}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
