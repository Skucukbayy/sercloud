"use client";

import { Users, Database, Globe, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

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
            <div className={`flex items-center gap-1 text-xs font-bold ${trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {trendType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
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
    return (
        <div className="p-10 space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-1">System Overview</h1>
                <p className="text-slate-500 text-sm">Real-time health and statistics of Orbis Cloud.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Total Users" value="1,284" trend="12%" trendType="up" />
                <StatCard icon={Database} label="Storage Used" value="4.2 TB" trend="5%" trendType="up" />
                <StatCard icon={Globe} label="Active Domains" value="42" trend="0%" trendType="neutral" />
                <StatCard icon={Activity} label="Weekly Traffic" value="540 GB" trend="8%" trendType="down" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-[2rem] space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Admin Activity</h2>
                        <button className="text-xs font-bold text-blue-500 hover:text-blue-400">View logs</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">JA</div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">John Admin <span className="text-slate-500 font-normal">created workspace</span> Engineering</p>
                                        <p className="text-[10px] text-slate-500 mt-1">2 mins ago</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-white/5">Workspaces</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-[2rem] space-y-6">
                    <h2 className="text-xl font-bold text-white">Storage Distribution</h2>
                    <div className="space-y-6">
                        {[
                            { name: "Public Links", value: "35%", color: "bg-blue-500" },
                            { name: "User Folders", value: "50%", color: "bg-indigo-500" },
                            { name: "Workspaces", value: "15%", color: "bg-purple-500" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">{item.name}</span>
                                    <span className="text-slate-200 font-bold">{item.value}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: item.value }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
