"use client";

import { useEffect, useState } from "react";
import { getLogs, AuditLog } from "@/lib/logger";
import { Server, User, Shield, Search, FileText, Download } from "lucide-react";

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setLogs(getLogs());
        const handleUpdate = () => setLogs(getLogs());
        window.addEventListener('audit-log-updated', handleUpdate);
        return () => window.removeEventListener('audit-log-updated', handleUpdate);
    }, []);

    const filteredLogs = logs.filter(l =>
        l.action.toLowerCase().includes(filter.toLowerCase()) ||
        l.userName.toLowerCase().includes(filter.toLowerCase())
    );

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className="p-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">Audit Logs</h1>
                <p className="text-slate-500 text-sm">Track every action within SerCloud for security and compliance.</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search logs by user or action..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white"
                    />
                </div>
                <button className="bg-white/5 border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-slate-300">
                    <Download size={14} />
                    Export to CSV
                </button>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Timestamp</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">IP Address</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">No logs found yet. Perform some actions to see them here.</td>
                            </tr>
                        ) : filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 text-sm font-mono text-slate-500">
                                    {formatDate(log.timestamp)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-400">
                                            {log.userName[0]}
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{log.userName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground">
                                    <span className="font-semibold">{log.action}</span>
                                    <p className="text-[10px] text-slate-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{log.details}</p>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono text-slate-500">{log.ip}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.category === 'Admin' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/10' :
                                            log.category === 'User' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/10' : 'bg-slate-500/10 text-slate-500 border border-slate-500/10'
                                        }`}>
                                        {log.category}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
