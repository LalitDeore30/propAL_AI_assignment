'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
    {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    },
    {
        name: 'Agent',
        href: '/dashboard/agent',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
            <div className="flex">
                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`
                        lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg transition-colors duration-200
                        ${isDarkMode
                            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }
                    `}
                >
                    <span className="sr-only">Open sidebar</span>
                    {isMobileMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 z-40 flex w-72 flex-col transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    {/* Sidebar background with blur effect */}
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-2xl transition-colors duration-200`} />

                    {/* Sidebar content */}
                    <div className={`relative flex grow flex-col gap-y-5 overflow-y-auto border-r ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200'} px-6 pb-4 transition-colors duration-200`}>
                        <div className="flex h-16 shrink-0 items-center justify-between">
                            <Link href="/dashboard" className="flex items-center space-x-3">
                                <span className="text-2xl font-bold">
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                        PropAl
                                    </span>
                                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                        {' '}AI
                                    </span>
                                </span>
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-yellow-500 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200`}
                                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDarkMode ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="space-y-2">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={`
                                                            group flex items-center gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 
                                                            transition-all duration-200 ease-out relative overflow-hidden
                                                            ${isActive
                                                                ? isDarkMode
                                                                    ? 'bg-purple-500/10 text-purple-400'
                                                                    : 'bg-purple-50 text-purple-600'
                                                                : isDarkMode
                                                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                                            }
                                                        `}
                                                    >
                                                        {item.icon}
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>

                                <li className="mt-auto">
                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className={`
                                            w-full group flex items-center gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6
                                            transition-all duration-200 ease-out relative overflow-hidden
                                            ${isDarkMode
                                                ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                                            }
                                            ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        {isLoggingOut ? 'Logging out...' : 'Log out'}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:pl-72 w-full">
                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>

                {/* Overlay for mobile */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </div>
    );
} 