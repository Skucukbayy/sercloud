"use client";

export interface AuditLog {
    id: string;
    timestamp: string;
    userId: string;
    userName: string;
    action: string;
    category: 'User' | 'Admin' | 'System';
    details: string;
    ip: string;
}

const SIEM_ENDPOINT = "https://siem-collector.acme.internal/logs"; // Mock SIEM

export const logAction = async (actionData: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
        ...actionData,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
    };

    // 1. Save to local storage for demo
    const logs = JSON.parse(localStorage.getItem('sercloud_audit_logs') || '[]');
    logs.unshift(newLog);
    localStorage.setItem('sercloud_audit_logs', JSON.stringify(logs.slice(0, 100)));

    // 2. Export to SIEM if configured
    const siemEnabled = localStorage.getItem('sercloud_siem_enabled') === 'true';
    if (siemEnabled) {
        console.log(`[SIEM] Streaming log to ${SIEM_ENDPOINT}:`, newLog);
        // In a real app: fetch(SIEM_ENDPOINT, { method: 'POST', body: JSON.stringify(newLog) });
    }

    // Dispatch event for UI updates
    window.dispatchEvent(new Event('audit-log-updated'));
};

export const getLogs = (): AuditLog[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('sercloud_audit_logs') || '[]');
};
