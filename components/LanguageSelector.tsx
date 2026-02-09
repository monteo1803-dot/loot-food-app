
import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

interface Props {
    currentLang: string;
    onLangChange: (lang: string) => void;
}

const languages = [
    { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'nl', label: 'NL', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'pt', label: 'PT', name: 'Português', flag: '🇵🇹' },
    { code: 'pl', label: 'PL', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', label: 'TR', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ja', label: 'JA', name: '日本語', flag: '🇯🇵' },
];

const LanguageSelector: React.FC<Props> = ({ currentLang, onLangChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get current language data
    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Use capture phase for more reliable detection
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleSelect = (langCode: string) => {
        onLangChange(langCode);
        setIsOpen(false);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-loot-red/20"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="font-bold text-sm text-gray-700">{currentLanguage.label}</span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu - Fixed positioning relative to button */}
            {isOpen && (
                <>
                    {/* Backdrop - invisible but catches clicks */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div
                        className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-48"
                        role="listbox"
                    >
                        <div className="py-2 max-h-[320px] overflow-y-auto">
                            {languages.map((lang) => {
                                const isSelected = currentLang === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleSelect(lang.code)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${isSelected
                                                ? 'bg-loot-red text-white'
                                                : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        <span className="flex-grow text-left font-semibold text-sm">{lang.name}</span>
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;
