"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, useUsers } from './users';

export interface ServerConfig {
    domain: string;
    port: number;
    isInstalled: boolean;
}

const DEFAULT_CONFIG: ServerConfig = {
    domain: 'localhost',
    port: 3000,
    isInstalled: false
};

interface AuthContextType {
    config: ServerConfig;
    currentUser: User | null;
    install: (domain: string, port: number) => void;
    login: (email: string, password: string) => User | null;
    logout: () => void;
    isInstalled: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<ServerConfig>(DEFAULT_CONFIG);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { users } = useUsers();

    useEffect(() => {
        // Load state from localStorage on mount
        const loadState = () => {
            try {
                const savedConfig = localStorage.getItem('sercloud_config');
                if (savedConfig) {
                    setConfig(JSON.parse(savedConfig));
                }

                const savedSession = localStorage.getItem('sercloud_session');
                if (savedSession) {
                    setCurrentUser(JSON.parse(savedSession));
                }
            } catch (e) {
                console.error("Failed to load auth state", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadState();
    }, []);

    const install = (domain: string, port: number) => {
        const newConfig = { domain, port, isInstalled: true };
        setConfig(newConfig);
        localStorage.setItem('sercloud_config', JSON.stringify(newConfig));
    };

    const login = (email: string, password: string): User | null => {
        // Reload users from storage to ensure we have the latest (including the newly created admin)
        const storedUsersStr = localStorage.getItem('sercloud_users');
        const currentUsers: User[] = storedUsersStr ? JSON.parse(storedUsersStr) : users;

        const user = currentUsers.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            localStorage.setItem('sercloud_session', JSON.stringify(user));
            return user;
        }
        return null;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('sercloud_session');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{
            config,
            currentUser,
            install,
            login,
            logout,
            isInstalled: config.isInstalled,
            isLoading
        }
        }>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
