'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Agent', href: '/dashboard/agent' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col h-full bg-gray-800 text-white w-64 p-4">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">PropAL AI</h1>
                {user && <p className="text-sm text-gray-400">Welcome, {user.username}</p>}
            </div>
            <nav className="flex-grow">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.name} className="mb-4">
                            <Link
                                href={link.href}
                                className={`flex items-center p-2 rounded-md transition-colors ${pathname === link.href
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button
                    onClick={logout}
                    className="w-full text-left p-2 rounded-md text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}
