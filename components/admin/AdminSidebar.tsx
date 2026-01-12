"use client";

import {
    Users,
    Layers,
    Settings,
    ShieldCheck,
    BarChart3,
    Globe,
    LogOut,
    LayoutDashboard,
    Home,
    FileText
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBranding } from "@/lib/branding";

const AdminNavItem = ({ icon: Icon, label, href, active }: any) => (
    <Link href={href}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-blue-600/20 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.1)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}>
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
        </div>
    </Link>
);

export default function AdminSidebar() {
    const pathname = usePathname();
    const { branding } = useBranding();

    return (
        <aside className="w-72 glass border-r border-slate-800 flex flex-col p-6 gap-8">
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <ShieldCheck className="text-white" size={24} />
                </div>
                <div>
                    <span className="text-xl font-bold tracking-tight text-foreground block truncate max-w-[160px]">
                        {branding.companyName === 'SerCloud' ? 'Admin Portal' : branding.companyName}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">SerCloud Admin</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <AdminNavItem icon={LayoutDashboard} label="Overview" href="/admin" active={pathname === "/admin"} />
                <AdminNavItem icon={Users} label="Users & Roles" href="/admin/users" active={pathname === "/admin/users"} />
                <AdminNavItem icon={Layers} label="Workspaces" href="/admin/workspaces" active={pathname === "/admin/workspaces"} />
                <AdminNavItem icon={FileText} label="Audit Logs" href="/admin/logs" active={pathname === "/admin/logs"} />
                <AdminNavItem icon={Globe} label="Domain & Branding" href="/admin/settings" active={pathname === "/admin/settings"} />
            </div>

            <div className="mt-auto space-y-4">
                <div className="glass p-4 rounded-2xl space-y-3 bg-blue-500/5 border-blue-500/10">
                    <div className="flex items-center gap-2 text-blue-400">
                        <BarChart3 size={18} />
                        <span className="text-sm font-bold">System Health</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>S3 STORAGE</span>
                            <span className="text-slate-300">OPTIMAL</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-blue-500"></div>
                        </div>
                    </div>
                </div>
                <Link href="/">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all">
                        <Home size={20} />
                        <span className="font-medium text-sm">User Files</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
