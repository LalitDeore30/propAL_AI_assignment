'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
    id: string;
    username: string;
    email: string;
    company?: string;
    phoneNumber?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, phoneNumber?: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: User) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for user cookie on mount
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                setUser(JSON.parse(userCookie));
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                Cookies.remove('user');
            }
        }
        setLoading(false);
    }, []);

    const updateUser = (userData: User) => {
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData));
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to log in');
            }

            setUser(data.user);
            router.push('/dashboard/profile');
        } catch (error: any) {
            throw new Error(error.message || 'Failed to log in');
        }
    };

    const signup = async (username: string, email: string, password: string, phoneNumber?: string) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, phoneNumber }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create account');
            }

            // Instead of automatically logging in, redirect to login page with success message
            router.push('/login?message=Account created successfully! Please log in.');
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create account');
        }
    };

    const logout = async () => {
        try {
            // Call logout API
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Failed to logout');
            }

            // Clear client-side cookie and state
            Cookies.remove('user');
            setUser(null);

            // Redirect to login page
            router.push('/login');
        } catch (error: any) {
            console.error('Logout error:', error);
            // Still remove user data even if API call fails
            Cookies.remove('user');
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            updateUser,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 