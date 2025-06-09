'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const { isDarkMode } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        company: user?.company || ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    username: formData.username,
                    company: formData.company
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update the user context with new data
            updateUser(data.user);
            setSuccess('Profile updated successfully');
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Profile Settings
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your account information and preferences
                </p>
            </div>

            {error && (
                <div className={`
                    p-4 rounded-lg text-red-600 bg-red-50 border border-red-200
                    ${isDarkMode ? 'bg-red-900/10 border-red-900/20 text-red-400' : ''}
                `}>
                    {error}
                </div>
            )}

            {success && (
                <div className={`
                    p-4 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-200
                    ${isDarkMode ? 'bg-emerald-900/10 border-emerald-900/20 text-emerald-400' : ''}
                `}>
                    {success}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Information Card */}
                <div className={`
                    rounded-xl p-6 transition-all duration-200
                    ${isDarkMode
                        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-lg shadow-purple-500/5'
                        : 'bg-white border border-gray-100 shadow-xl shadow-purple-100/50 backdrop-blur-xl'
                    }
                `}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                        ${isDarkMode
                                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                                            : 'bg-purple-600 text-white hover:bg-purple-700'
                                        }
                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            username: user?.username || '',
                                            company: user?.company || ''
                                        });
                                        setError('');
                                    }}
                                    disabled={isLoading}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                        ${isDarkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }
                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                    }
                                `}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={isEditing ? formData.username : user?.username || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`
                                    w-full rounded-lg border px-4 py-2.5 transition-all duration-200
                                    ${isDarkMode
                                        ? isEditing
                                            ? 'bg-gray-900 border-gray-600 text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                                            : 'bg-gray-800/50 border-gray-700 text-gray-300'
                                        : isEditing
                                            ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                                            : 'bg-gray-50/50 border-gray-200 text-gray-700'
                                    }
                                    ${!isEditing && 'cursor-not-allowed opacity-75'}
                                `}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user?.email || ''}
                                disabled={true}
                                className={`
                                    w-full rounded-lg border px-4 py-2.5 transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-gray-800/50 border-gray-700 text-gray-300'
                                        : 'bg-gray-50/50 border-gray-200 text-gray-700'
                                    }
                                    cursor-not-allowed opacity-75
                                `}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={isEditing ? formData.company : user?.company || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`
                                    w-full rounded-lg border px-4 py-2.5 transition-all duration-200
                                    ${isDarkMode
                                        ? isEditing
                                            ? 'bg-gray-900 border-gray-600 text-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                                            : 'bg-gray-800/50 border-gray-700 text-gray-300'
                                        : isEditing
                                            ? 'bg-white border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                                            : 'bg-gray-50/50 border-gray-200 text-gray-700'
                                    }
                                    ${!isEditing && 'cursor-not-allowed opacity-75'}
                                `}
                                placeholder="Enter your company name"
                            />
                        </div>
                    </div>
                </div>

                {/* Account Status Card */}
                <div className={`
                    rounded-xl p-6 transition-all duration-200
                    ${isDarkMode
                        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-lg shadow-purple-500/5'
                        : 'bg-white border border-gray-100 shadow-xl shadow-purple-100/50 backdrop-blur-xl'
                    }
                `}>
                    <div className="flex items-start space-x-4">
                        <div className="relative">
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white
                                ${isDarkMode
                                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                                    : 'bg-gradient-to-br from-purple-600 to-pink-600'
                                }
                            `}>
                                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className={`
                                absolute bottom-0 right-0 w-4 h-4 rounded-full border-2
                                ${isDarkMode ? 'border-gray-800' : 'border-white'}
                                bg-emerald-500
                            `} />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">Account Status</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                        Email
                                    </label>
                                    <p className={`
                                        text-sm font-medium
                                        ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
                                    `}>
                                        {user?.email}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                        Account Status
                                    </label>
                                    <span className={`
                                        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                        ${isDarkMode
                                            ? 'bg-emerald-500/10 text-emerald-400'
                                            : 'bg-emerald-50 text-emerald-700'
                                        }
                                    `}>
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 