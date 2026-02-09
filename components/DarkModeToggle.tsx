
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface Props {
    isDark: boolean;
    onToggle: () => void;
}

const DarkModeToggle: React.FC<Props> = ({ isDark, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`
        relative w-14 h-7 rounded-full p-1 transition-all duration-300
        ${isDark
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400'
                }
      `}
            title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        >
            <div
                className={`
          w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center
          transition-transform duration-300
          ${isDark ? 'translate-x-7' : 'translate-x-0'}
        `}
            >
                {isDark ? (
                    <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                    <Sun className="w-3 h-3 text-orange-500" />
                )}
            </div>

            {/* Stars animation for dark mode */}
            {isDark && (
                <>
                    <span className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse opacity-70" />
                    <span className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.3s' }} />
                </>
            )}
        </button>
    );
};

export default DarkModeToggle;
