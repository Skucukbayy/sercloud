"use client";

import {
    Folder,
    File,
    LayoutDashboard,
    Share2,
    Clock,
    Star,
    Trash2,
    Settings,
    Search,
    Plus,
    Bell,
    Monitor,
    MoreVertical,
    Download,
    Link2,
    Trash,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useBranding } from "@/lib/branding";
import { useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import UploadModal from "@/components/UploadModal";
import ContextMenu from "@/components/ContextMenu";

const NavItem = ({ icon: Icon, label, active = false }: any) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
        }`}>
        <Icon size={20} />
        <span className="font-medium text-sm">{label}</span>
    </div>
);

const FileCard = ({ name, type, size, modified }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 rounded-2xl group cursor-pointer glass-hover transition-all relative overflow-hidden"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${type === 'folder' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-700/50 text-slate-400'}`}>
                {type === 'folder' ? <Folder size={24} fill="currentColor" fillOpacity={0.2} /> : <File size={24} />}
            </div>
            <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
            </button>
        </div>
        <div className="space-y-1">
            <h3 className="font-semibold text-slate-200 truncate">{name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{size}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                <span>{modified}</span>
            </div>
        </div>
    </motion.div>
);

export default function Home() {
    const [activeTab, setActiveTab] = useState("My Files");
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, fileName: string } | null>(null);
    const { branding } = useBranding();

    const handleContextMenu = (e: React.MouseEvent, fileName: string) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, fileName });
    };

    // Files will be loaded from actual storage when file system is connected
    const allFiles: { name: string; type: string; size: string; modified: string }[] = [];

    const files = allFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex h-screen overflow-hidden">
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    fileName={contextMenu.fileName}
                    onClose={() => setContextMenu(null)}
                />
            )}

            {/* Sidebar */}
            <aside className="w-72 glass border-r border-slate-800 flex flex-col p-6 gap-8">
                <div className="flex items-center gap-3 px-2">
                    {branding.logoUrl ? (
                        <img src={branding.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-white/5" />
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Monitor className="text-white" size={24} />
                        </div>
                    )}
                    <span className="text-xl font-bold tracking-tight gradient-text truncate max-w-[160px]">
                        {branding.companyName || "SerCloud"}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <NavItem icon={LayoutDashboard} label="Dashboard" />
                    <NavItem icon={Folder} label="My Files" active={activeTab === "My Files"} />
                    <NavItem icon={Share2} label="Shared with me" />
                    <NavItem icon={Clock} label="Recent" />
                    <NavItem icon={Star} label="Starred" />
                    <NavItem icon={Trash2} label="Trash" />
                </div>

                <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                    <Link href="/admin">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-400 hover:bg-blue-600/10 transition-all cursor-pointer border border-blue-500/10">
                            <ShieldCheck size={20} />
                            <span className="font-bold text-sm text-blue-400">Admin Portal</span>
                        </div>
                    </Link>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="glass p-4 rounded-2xl space-y-3">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-400">Storage</span>
                            <span className="text-slate-200">75% used</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        </div>
                        <button className="w-full py-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                            Upgrade Storage
                        </button>
                    </div>
                    <NavItem icon={Settings} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 glass">
                    <div className="relative w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search documents, folders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-600 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                        <div className="p-2 glass rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 p-[1px]">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-blue-400">
                                SK
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-50 mb-1">{activeTab}</h1>
                            <p className="text-slate-500 text-sm">Manage your documents and collaborate effortlessly.</p>
                        </div>
                        <button
                            onClick={() => setIsUploadOpen(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            <Plus size={20} />
                            Upload Files
                        </button>
                    </div>

                    {/* Quick Stats / Folders */}
                    {files.length === 0 ? (
                        <div className="glass p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                            <Folder size={64} className="text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-300 mb-2">No files yet</h3>
                            <p className="text-slate-500 mb-6">Upload your first file to get started</p>
                            <button
                                onClick={() => setIsUploadOpen(true)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all"
                            >
                                <Plus size={20} />
                                Upload Files
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {files.map((file, i) => (
                                <div key={i} onContextMenu={(e) => handleContextMenu(e, file.name)}>
                                    <FileCard {...file} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Table Version for List View - Only show if there are files */}
                    {files.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-lg font-bold text-slate-400 mb-4 px-2">Recent Activity</h2>
                            <div className="glass rounded-3xl overflow-hidden">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-800 text-left">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Size</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Modified</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {files.slice(0, 3).map((file, i) => (
                                            <tr
                                                key={i}
                                                className="hover:bg-slate-800/20 transition-colors group cursor-pointer"
                                                onContextMenu={(e) => handleContextMenu(e, file.name)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${file.type === 'folder' ? 'text-blue-500' : 'text-slate-400'}`}>
                                                            {file.type === 'folder' ? <Folder size={18} fill="currentColor" fillOpacity={0.2} /> : <File size={18} />}
                                                        </div>
                                                        <span className="font-medium text-slate-200">{file.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-400">{file.size}</td>
                                                <td className="px-6 py-4 text-sm text-slate-400">{file.modified}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-500 hover:text-blue-400 transition-colors">
                                                            <Download size={16} />
                                                        </button>
                                                        <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors">
                                                            <Link2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                                            <Trash size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
