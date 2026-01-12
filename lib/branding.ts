"use client";

import { useState, useEffect } from 'react';

export interface BrandingConfig {
    companyName: string;
    logoUrl?: string;
    primaryColor: string;
}

const DEFAULT_BRANDING: BrandingConfig = {
    companyName: "SerCloud",
    primaryColor: "#3b82f6",
};

export const useBranding = () => {
    const [branding, setBranding] = useState<BrandingConfig>(DEFAULT_BRANDING);

    useEffect(() => {
        const saved = localStorage.getItem('sercloud_branding');
        if (saved) {
            try {
                setBranding(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse branding", e);
            }
        }
    }, []);

    const updateBranding = (newBranding: Partial<BrandingConfig>) => {
        const updated = { ...branding, ...newBranding };
        setBranding(updated);
        localStorage.setItem('sercloud_branding', JSON.stringify(updated));
        // Dispatch custom event for real-time updates across components
        window.dispatchEvent(new Event('branding-update'));
    };

    useEffect(() => {
        const handleUpdate = () => {
            const saved = localStorage.getItem('sercloud_branding');
            if (saved) setBranding(JSON.parse(saved));
        };
        window.addEventListener('branding-update', handleUpdate);
        return () => window.removeEventListener('branding-update', handleUpdate);
    }, []);

    return { branding, updateBranding };
};
