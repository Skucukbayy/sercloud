"use client";

import { Plus, FolderOpen, Users, Lock, MoreHorizontal, Database, HardDrive } from "lucide-react";

export default function WorkspaceManagement() {
    const workspaces = [
        { name: "Engineering", members: 24, storage: "1.2 TB / 5 TB", type: "Internal", privacy: "Private" },
        { name: "Design Team", members: 8, storage: "450 GB / 1 TB", type: "Internal", privacy: "Public" },
        { name: "External Clients", members: 12, storage: "120 GB / 500 GB", type: "External", privacy: "Shared" },
        { name: "Legal & Finance", members: 5, storage: "80 GB / 250 GB", type: "Internal", privacy: "Locked" },
    ];

    return (
        <div className="p-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Workspaces</h1>
                    <p className="text-slate-500 text-sm">Configure shared areas and resource allocation.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    <Plus size={20} />
                    Create Workspace
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {workspaces.map((ws, i) => (
                    <div key={i} className="glass p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-500 border border-blue-500/10">
                                    <FolderOpen size={28} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{ws.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mt-1">
                                        <span className="text-blue-400">{ws.type}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                                        <div className="flex items-center gap-1">
                                            <Lock size={12} />
                                            {ws.privacy}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <Users size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Members</span>
                                </div>
                                <p className="text-lg font-bold text-slate-200">{ws.members}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 text-slate-500 mb-1">
                                    <HardDrive size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Quota</span>
                                </div>
                                <p className="text-lg font-bold text-slate-200">{ws.storage.split(' / ')[1]}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-slate-500 italic">Usage</span>
                                <span className="text-slate-300">{ws.storage.split(' / ')[0]} used</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
