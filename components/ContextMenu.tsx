"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Share2,
    ArrowRight,
    Trash,
    Edit3,
    Info,
    Download,
    Copy
} from "lucide-react";

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    fileName: string;
}

export default function ContextMenu({ x, y, onClose, fileName }: ContextMenuProps) {
    const menuItems = [
        { icon: Share2, label: "Share", color: "text-blue-400" },
        { icon: Copy, label: "Copy link", color: "text-slate-400" },
        { icon: Download, label: "Download", color: "text-slate-400" },
        { icon: Edit3, label: "Rename", color: "text-slate-400" },
        { icon: Info, label: "Details", color: "text-slate-400" },
        { icon: Trash, label: "Delete", color: "text-red-400" },
    ];

    return (
        <>
            <div className="fixed inset-0 z-[60]" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed z-[70] w-56 glass rounded-2xl shadow-2xl overflow-hidden py-1.5 border border-white/10"
                style={{ left: x, top: y }}
            >
                <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{fileName}</p>
                </div>
                {menuItems.map((item, i) => (
                    <button
                        key={i}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-sm text-slate-300 hover:text-white group"
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                    >
                        <item.icon size={16} className={`${item.color} group-hover:scale-110 transition-transform`} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </motion.div>
        </>
    );
}
