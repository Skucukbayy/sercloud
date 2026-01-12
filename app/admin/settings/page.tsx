"use client";

import { Globe, Palette, ShieldCheck, Cpu, Check, Save, Link2, Monitor, Server } from "lucide-react";
import { useState } from "react";
import { useBranding } from "@/lib/branding";
import { logAction } from "@/lib/logger";

const SettingsSection = ({ title, description, children, icon: Icon }: any) => (
    <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/10">
                <Icon size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
                <p className="text-slate-500 text-sm max-w-xl">{description}</p>
            </div>
        </div>
        <div className="pt-4 space-y-6">
            {children}
        </div>
    </div>
);

const InputField = ({ label, placeholder, value, onChange, type = "text", helper }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-400 block ml-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 px-5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
        />
        {helper && <p className="text-[10px] text-slate-600 ml-1 italic">{helper}</p>}
    </div>
);

export default function AdministrativeSettings() {
    const [activeTab, setActiveTab] = useState("branding");
    const { branding, updateBranding } = useBranding();
    const [tempBranding, setTempBranding] = useState(branding);

    const handleSave = () => {
        updateBranding(tempBranding);
        logAction({
            userId: "admin-1",
            userName: "Serhan Admin",
            action: "Branding Update",
            category: "Admin",
            details: `Updated company name to: ${tempBranding.companyName}`,
            ip: "192.168.1.50"
        });
        alert("Enterprise branding updated successfully!");
    };

    return (
        <div className="p-10 pb-32 space-y-10 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Administrative Settings</h1>
                    <p className="text-slate-500 text-sm">Configure system-wide parameters and instance branding.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                    <Save size={20} />
                    Save Changes
                </button>
            </div>

            <div className="flex gap-2">
                {['domain', 'branding', 'security', 'system'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                {activeTab === 'branding' && (
                    <SettingsSection
                        icon={Palette}
                        title="Custom Enterprise Branding"
                        description="Personalize the SerCloud interface with your company logo and name."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Company Name"
                                value={tempBranding.companyName}
                                onChange={(v: string) => setTempBranding({ ...tempBranding, companyName: v })}
                                placeholder="e.g. Acme Corp"
                            />
                            <InputField
                                label="Company Logo URL (Optional)"
                                value={tempBranding.logoUrl || ''}
                                onChange={(v: string) => setTempBranding({ ...tempBranding, logoUrl: v })}
                                placeholder="https://example.com/logo.png"
                                helper="Link to your company logo"
                            />
                        </div>
                        <div className="p-6 glass rounded-2xl border border-white/5 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                {tempBranding.logoUrl ? <img src={tempBranding.logoUrl} className="w-full h-full object-contain" /> : <Monitor className="text-slate-600" />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground mb-1">Branding Preview</p>
                                <p className="text-xs text-slate-500">How your logo will appear in the sidebar.</p>
                            </div>
                        </div>
                    </SettingsSection>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-8">
                        <SettingsSection
                            icon={ShieldCheck}
                            title="Multi-Factor Authentication (MFA)"
                            description="Configure how users prove their identity. Use the firm's preferred identity provider."
                        >
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Preferred MFA Provider</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {['TOTP (Google/Authy)', 'SAML 2.0 (Azure AD/Okta)', 'OpenID Connect'].map((p) => (
                                            <div key={p} className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-xl border border-blue-500/30 text-sm text-white cursor-pointer hover:bg-blue-500/10 transition-all">
                                                <div className="w-4 h-4 rounded-full border-4 border-blue-500"></div>
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-blue-400 text-sm">
                                        <ShieldCheck size={20} />
                                        <span>Enforce MFA for all domain-joined accounts</span>
                                    </div>
                                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                                    </div>
                                </div>
                            </div>
                        </SettingsSection>

                        <SettingsSection
                            icon={Server}
                            title="SIEM & Audit Export"
                            description="Stream SerCloud audit logs to your company's SIEM tool."
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Link2 size={16} /></div>
                                        <span className="text-sm text-slate-300 font-medium">Stream logs to external Syslog (UDP/TCP)</span>
                                    </div>
                                    <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer" onClick={() => {
                                        const enabled = localStorage.getItem('sercloud_siem_enabled') === 'true';
                                        localStorage.setItem('sercloud_siem_enabled', String(!enabled));
                                        window.dispatchEvent(new Event('branding-update'));
                                    }}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${typeof window !== 'undefined' && localStorage.getItem('sercloud_siem_enabled') === 'true' ? 'right-1 bg-emerald-500' : 'left-1 bg-slate-500'}`}></div>
                                    </div>
                                </div>
                                <InputField
                                    label="Collector Endpoint"
                                    placeholder="e.g. syslog.acme.corp:514"
                                    helper="Protocol, address and port of your SIEM collector."
                                />
                            </div>
                        </SettingsSection>
                    </div>
                )}
            </div>
        </div>
    );
}
