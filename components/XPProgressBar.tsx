
import React from 'react';
import { Zap } from 'lucide-react';

interface Props {
    currentXP: number;
    maxXP: number;
    level: number;
    compact?: boolean;
}

const XPProgressBar: React.FC<Props> = ({ currentXP, maxXP, level, compact = false }) => {
    const percentage = Math.round((currentXP / maxXP) * 100);

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <div className="bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Nv.{level}
                </div>
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{percentage}%</span>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border-2 border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-xl">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Niveau</div>
                        <div className="text-xl font-black text-gray-900 dark:text-white">{level}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">XP</div>
                    <div className="font-bold text-gray-900 dark:text-white">
                        {currentXP.toLocaleString()} / {maxXP.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 relative"
                    style={{ width: `${percentage}%` }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{percentage}% complété</span>
                <span>{maxXP - currentXP} XP restants</span>
            </div>
        </div>
    );
};

export default XPProgressBar;
