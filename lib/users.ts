"use client";

import { useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Added password field via Setup/Auth
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
    lastLogin: string;
    storageLimitGB: number;
    fileCountLimit: number;
    usedStorageGB: number;
    usedFileCount: number;
}

const DEFAULT_USERS: User[] = [];

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('sercloud_users');
        if (saved) {
            setUsers(JSON.parse(saved));
        } else {
            setUsers(DEFAULT_USERS);
            localStorage.setItem('sercloud_users', JSON.stringify(DEFAULT_USERS));
        }
    }, []);

    const saveUsers = (newUsers: User[]) => {
        setUsers(newUsers);
        localStorage.setItem('sercloud_users', JSON.stringify(newUsers));
    };

    const addUser = (user: Omit<User, 'id' | 'lastLogin' | 'usedStorageGB' | 'usedFileCount'>) => {
        const newUser: User = {
            ...user,
            id: Math.random().toString(36).substr(2, 9),
            lastLogin: 'Never',
            usedStorageGB: 0,
            usedFileCount: 0
        };
        saveUsers([...users, newUser]);
    };

    const deleteUser = (id: string) => {
        saveUsers(users.filter(u => u.id !== id));
    };

    const updateUser = (id: string, updates: Partial<User>) => {
        saveUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    return { users, addUser, deleteUser, updateUser };
};
