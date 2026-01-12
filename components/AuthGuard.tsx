"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isInstalled, currentUser, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        const isSetupPage = pathname === '/setup';
        const isLoginPage = pathname === '/login';

        // 1. If not installed, FORCE redirect to /setup (unless already there)
        if (!isInstalled) {
            if (!isSetupPage) {
                console.log("AuthGuard: System not installed. Redirecting to /setup");
                router.replace('/setup');
            }
            return;
        }

        // 2. If installed but on /setup, redirect to /login (install is done)
        if (isInstalled && isSetupPage) {
            console.log("AuthGuard: Already installed. Redirecting to /login");
            router.replace('/login');
            return;
        }

        // 3. If installed and not logged in, redirect to /login (unless already there)
        if (!currentUser) {
            if (!isLoginPage) {
                console.log("AuthGuard: Not logged in. Redirecting to /login");
                router.replace('/login');
            }
            return;
        }

        // 4. If logged in and on /login, redirect to / (dashboard)
        if (currentUser && isLoginPage) {
            console.log("AuthGuard: Already logged in. Redirecting to /");
            router.replace('/');
            return;
        }

    }, [isInstalled, currentUser, isLoading, pathname, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="text-blue-500 animate-pulse font-mono">System Loading...</div>
            </div>
        );
    }

    // Prevent rendering protected content if we are about to redirect
    const isSetupPage = pathname === '/setup';
    const isLoginPage = pathname === '/login';

    if (!isInstalled && !isSetupPage) return null;
    if (isInstalled && !currentUser && !isLoginPage) return null;

    return <>{children}</>;
}
