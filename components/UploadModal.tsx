"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, File, CheckCircle2, AlertCircle } from "lucide-react";
import { logAction } from "@/lib/logger";
import { useState, useRef } from "react";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [step, setStep] = useState<'upload' | 'progress' | 'success'>('upload');
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleStartUpload = () => {
        setStep('progress');
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStep('success');
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg glass rounded-[2.5rem] border border-white/10 shadow-2xl p-10 overflow-hidden"
                >
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>

                    {step === 'upload' && (
                        <div className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Upload className="text-blue-500" size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Upload Files</h2>
                                <p className="text-slate-400 text-sm">Drag and drop your files here or browse your computer.</p>
                            </div>

                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-800 rounded-3xl p-12 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group"
                            >
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleStartUpload} />
                                <File className="mx-auto mb-4 text-slate-600 group-hover:text-blue-400 transition-colors" size={40} />
                                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-300">Select files to upload</span>
                            </div>
                        </div>
                    )}

                    {step === 'progress' && (
                        <div className="space-y-8 py-10">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">Uploading...</h2>
                                <p className="text-slate-400 text-sm">Please wait while we secure your files.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-bold font-mono">
                                    <span className="text-blue-400">{progress}%</span>
                                    <span className="text-slate-500">12.4 MB / 15.0 MB</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="space-y-8 text-center py-6">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="text-emerald-500" size={40} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Upload Complete!</h2>
                                <p className="text-slate-400 text-sm">Your files have been successfully uploaded and encrypted.</p>
                            </div>
                            <button
                                onClick={() => {
                                    logAction({
                                        userId: "user-1",
                                        userName: "Serhan K.",
                                        action: "File Upload",
                                        category: "User",
                                        details: "Successfully uploaded 1 file to My Files.",
                                        ip: "192.168.1.102"
                                    });
                                    onClose();
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                            >
                                Go to My Files
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
