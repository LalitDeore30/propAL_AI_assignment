'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Language {
    id: string;
    displayName: string;
}

interface Model {
    id: string;
    displayName: string;
    languages: Language[];
}

interface Provider {
    id: string;
    displayName: string;
    models: Model[];
}

interface Config {
    providers: Provider[];
}

export default function AgentPage() {
    const [config, setConfig] = useState<Config | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useTheme();

    // Load config and saved preferences
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('/stt.json');
                const data = await res.json();
                setConfig(data);

                // Load saved preferences from localStorage
                const saved = localStorage.getItem('sttPreferences');
                if (saved) {
                    const { provider, model, language } = JSON.parse(saved);
                    setSelectedProvider(provider);
                    setSelectedModel(model);
                    setSelectedLanguage(language);
                }
            } catch (error) {
                console.error('Failed to load configuration:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Save preferences to localStorage whenever they change
    useEffect(() => {
        if (selectedProvider && selectedModel && selectedLanguage) {
            localStorage.setItem(
                'sttPreferences',
                JSON.stringify({
                    provider: selectedProvider,
                    model: selectedModel,
                    language: selectedLanguage,
                })
            );
        }
    }, [selectedProvider, selectedModel, selectedLanguage]);

    const handleProviderChange = (providerId: string) => {
        setSelectedProvider(providerId);
        setSelectedModel('');
        setSelectedLanguage('');
    };

    const handleModelChange = (modelId: string) => {
        setSelectedModel(modelId);
        setSelectedLanguage('');
    };

    const getSelectedProviderDisplay = () => {
        return config?.providers.find(p => p.id === selectedProvider)?.displayName;
    };

    const getSelectedModelDisplay = () => {
        const provider = config?.providers.find(p => p.id === selectedProvider);
        return provider?.models.find(m => m.id === selectedModel)?.displayName;
    };

    const getSelectedLanguageDisplay = () => {
        const provider = config?.providers.find(p => p.id === selectedProvider);
        const model = provider?.models.find(m => m.id === selectedModel);
        return model?.languages.find(l => l.id === selectedLanguage)?.displayName;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-pulse-slow">
                    <div className="h-8 w-32 bg-purple-500/20 rounded mb-4"></div>
                    <div className="h-4 w-48 bg-purple-500/20 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Agent Configuration
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Configure your AI agent's speech recognition settings
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Configuration Card */}
                <div className={`
                    rounded-xl p-6 transition-all duration-200
                    ${isDarkMode
                        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-lg shadow-purple-500/5'
                        : 'bg-white border border-gray-100 shadow-xl shadow-purple-100/50 backdrop-blur-xl'
                    }
                `}>
                    <div className="space-y-4">
                        <div className="relative group">
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Provider
                            </label>
                            <div className="relative">
                                <select
                                    id="provider"
                                    value={selectedProvider}
                                    onChange={(e) => handleProviderChange(e.target.value)}
                                    className={`
                                        w-full rounded-lg border px-4 py-2.5 transition-all duration-200 appearance-none
                                        ${isDarkMode
                                            ? 'bg-gray-900/50 border-gray-700 text-gray-100'
                                            : 'bg-gray-50/50 border-gray-200 text-gray-900'
                                        }
                                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    `}
                                >
                                    <option value="">Select a provider</option>
                                    {config?.providers.map((provider) => (
                                        <option key={provider.id} value={provider.id}>
                                            {provider.displayName}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Model
                            </label>
                            <div className="relative">
                                <select
                                    id="model"
                                    value={selectedModel}
                                    onChange={(e) => handleModelChange(e.target.value)}
                                    disabled={!selectedProvider}
                                    className={`
                                        w-full rounded-lg border px-4 py-2.5 transition-all duration-200 appearance-none
                                        ${isDarkMode
                                            ? 'bg-gray-900/50 border-gray-700 text-gray-100'
                                            : 'bg-gray-50/50 border-gray-200 text-gray-900'
                                        }
                                        ${!selectedProvider && 'opacity-50 cursor-not-allowed'}
                                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    `}
                                >
                                    <option value="">Select a model</option>
                                    {config?.providers
                                        .find((p) => p.id === selectedProvider)
                                        ?.models.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.displayName}
                                            </option>
                                        ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Language
                            </label>
                            <div className="relative">
                                <select
                                    id="language"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    disabled={!selectedModel}
                                    className={`
                                        w-full rounded-lg border px-4 py-2.5 transition-all duration-200 appearance-none
                                        ${isDarkMode
                                            ? 'bg-gray-900/50 border-gray-700 text-gray-100'
                                            : 'bg-gray-50/50 border-gray-200 text-gray-900'
                                        }
                                        ${!selectedModel && 'opacity-50 cursor-not-allowed'}
                                        focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                    `}
                                >
                                    <option value="">Select a language</option>
                                    {config?.providers
                                        .find((p) => p.id === selectedProvider)
                                        ?.models.find((m) => m.id === selectedModel)
                                        ?.languages.map((language) => (
                                            <option key={language.id} value={language.id}>
                                                {language.displayName}
                                            </option>
                                        ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Configuration Card */}
                {selectedProvider && selectedModel && selectedLanguage && (
                    <div className={`
                        relative overflow-hidden rounded-xl p-8 transition-all duration-200
                        ${isDarkMode
                            ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-lg shadow-purple-500/5'
                            : 'bg-white border border-gray-100 shadow-xl shadow-purple-100/50 backdrop-blur-xl'
                        }
                    `}>
                        {/* Decorative gradient background */}
                        <div className="absolute inset-0 opacity-5">
                            <div className={`
                                absolute inset-0 bg-gradient-to-br 
                                ${isDarkMode
                                    ? 'from-purple-600 via-pink-600 to-orange-600'
                                    : 'from-purple-200 via-pink-200 to-orange-200'
                                }
                            `} />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Selected Configuration
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className={`
                                    p-4 rounded-lg transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-gray-900/50 border border-gray-700/50'
                                        : 'bg-gray-50/80 border border-gray-100'
                                    }
                                `}>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                                        Provider
                                    </label>
                                    <p className={`
                                        text-base font-medium
                                        ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
                                    `}>
                                        {getSelectedProviderDisplay()}
                                    </p>
                                </div>

                                <div className={`
                                    p-4 rounded-lg transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-gray-900/50 border border-gray-700/50'
                                        : 'bg-gray-50/80 border border-gray-100'
                                    }
                                `}>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                                        Model
                                    </label>
                                    <p className={`
                                        text-base font-medium
                                        ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
                                    `}>
                                        {getSelectedModelDisplay()}
                                    </p>
                                </div>

                                <div className={`
                                    p-4 rounded-lg transition-all duration-200
                                    ${isDarkMode
                                        ? 'bg-gray-900/50 border border-gray-700/50'
                                        : 'bg-gray-50/80 border border-gray-100'
                                    }
                                `}>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                                        Language
                                    </label>
                                    <p className={`
                                        text-base font-medium
                                        ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
                                    `}>
                                        {getSelectedLanguageDisplay()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 