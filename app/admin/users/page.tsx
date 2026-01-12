"use client";

import { Plus, Search, MoreVertical, Shield, Mail, Check, X, Edit2, Trash2, HardDrive, File, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUsers, User } from "@/lib/users";
import { logAction } from "@/lib/logger";

const AddUserModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (u: any) => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        storageLimitGB: 10,
        fileCountLimit: 1000
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-lg glass rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden bg-[#0a0f1e]"
            >
                <h2 className="text-xl font-bold text-white mb-6">Create New User</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Full Name</label>
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                            placeholder="e.g. Alice Johnson"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Email Address</label>
                        <input
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                            placeholder="alice@company.com"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Role</label>
                            <select
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Storage Quota (GB)</label>
                            <input
                                type="number"
                                value={formData.storageLimitGB}
                                onChange={e => setFormData({ ...formData, storageLimitGB: parseInt(e.target.value) })}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">File Count Limit</label>
                        <input
                            type="number"
                            value={formData.fileCountLimit}
                            onChange={e => setFormData({ ...formData, fileCountLimit: parseInt(e.target.value) })}
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
                    <button
                        onClick={() => onAdd({ ...formData, status: 'Active' })}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
                    >
                        Create User
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default function UserManagement() {
    const { users, addUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("");

    const handleAddUser = (userData: any) => {
        addUser(userData);
        logAction({
            userId: "admin-1",
            userName: "Serhan Admin",
            action: "Create User",
            category: "Admin",
            details: `Created user ${userData.name} with ${userData.storageLimitGB}GB quota`,
            ip: "192.168.1.50"
        });
        setIsModalOpen(false);
    };

    const handleDeleteUser = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            deleteUser(id);
            logAction({
                userId: "admin-1",
                userName: "Serhan Admin",
                action: "Delete User",
                category: "Admin",
                details: `Deleted user ${name}`,
                ip: "192.168.1.50"
            });
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(filter.toLowerCase()) ||
        u.email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8 pb-32">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Users & Roles</h1>
                    <p className="text-slate-500 text-sm">Manage user access levels and system permissions.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    <Plus size={20} />
                    Add New User
                </button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search users by name or email..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-600 outline-none text-slate-200"
                    />
                </div>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 text-left bg-white/5">
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Storage Usage</th>
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">File Limit</th>
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center font-bold text-xs text-blue-400">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <Shield size={14} className={user.role === 'Admin' ? 'text-blue-400' : 'text-slate-500'} />
                                        <span className="text-sm text-slate-300 font-medium">{user.role}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="space-y-1.5 w-32">
                                        <div className="flex justify-between text-[10px]">
                                            <span className="text-slate-400 font-mono">{user.usedStorageGB} GB</span>
                                            <span className="text-slate-500">/ {user.storageLimitGB} GB</span>
                                        </div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${(user.usedStorageGB / user.storageLimitGB) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <File size={14} />
                                        <span>{user.usedFileCount} / {user.fileCountLimit}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.name)}
                                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddUser}
            />
        </div>
    );
}
