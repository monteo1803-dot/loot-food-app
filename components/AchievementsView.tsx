
import React from 'react';
import { Trophy, Medal, Lock, CheckCircle2, Star, Flame, Target, Zap, Crown, Gift, Sparkles } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

// Mock achievements data
const achievements = [
    {
        id: 1,
        nameKey: "achFirstSpin",
        name: "Premier Spin",
        descKey: "achFirstSpinDesc",
        desc: "Faites tourner la roue pour la première fois",
        icon: <Star className="w-8 h-8" />,
        progress: 100,
        unlocked: true,
        xp: 50,
        rarity: 'common'
    },
    {
        id: 2,
        nameKey: "achFoodLover",
        name: "Food Lover",
        descKey: "achFoodLoverDesc",
        desc: "Commandez 10 plats",
        icon: <Target className="w-8 h-8" />,
        progress: 70,
        current: 7,
        target: 10,
        unlocked: false,
        xp: 100,
        rarity: 'common'
    },
    {
        id: 3,
        nameKey: "achStreak7",
        name: "Semaine en Feu",
        descKey: "achStreak7Desc",
        desc: "Commandez 7 jours de suite",
        icon: <Flame className="w-8 h-8" />,
        progress: 100,
        unlocked: true,
        xp: 200,
        rarity: 'rare'
    },
    {
        id: 4,
        nameKey: "achLegendaryHunter",
        name: "Chasseur de Légendes",
        descKey: "achLegendaryHunterDesc",
        desc: "Obtenez une box légendaire",
        icon: <Crown className="w-8 h-8" />,
        progress: 100,
        unlocked: true,
        xp: 500,
        rarity: 'legendary'
    },
    {
        id: 5,
        nameKey: "achSpinMaster",
        name: "Maître de la Roue",
        descKey: "achSpinMasterDesc",
        desc: "Faites tourner la roue 100 fois",
        icon: <Zap className="w-8 h-8" />,
        progress: 45,
        current: 45,
        target: 100,
        unlocked: false,
        xp: 300,
        rarity: 'epic'
    },
    {
        id: 6,
        nameKey: "achBigSpender",
        name: "Grand Dépensier",
        descKey: "achBigSpenderDesc",
        desc: "Dépensez 500€ en commandes",
        icon: <Gift className="w-8 h-8" />,
        progress: 60,
        current: 300,
        target: 500,
        unlocked: false,
        xp: 400,
        rarity: 'epic'
    },
    {
        id: 7,
        nameKey: "achWorldTraveler",
        name: "Globe-Trotter",
        descKey: "achWorldTravelerDesc",
        desc: "Goûtez des plats de 10 pays différents",
        icon: <Sparkles className="w-8 h-8" />,
        progress: 30,
        current: 3,
        target: 10,
        unlocked: false,
        xp: 350,
        rarity: 'rare'
    },
    {
        id: 8,
        nameKey: "achUltimateChampion",
        name: "Champion Ultime",
        descKey: "achUltimateChampionDesc",
        desc: "Atteignez le niveau 50",
        icon: <Medal className="w-8 h-8" />,
        progress: 20,
        current: 10,
        target: 50,
        unlocked: false,
        xp: 1000,
        rarity: 'legendary'
    },
];

const getRarityConfig = (rarity: string, isDark: boolean) => {
    switch (rarity) {
        case 'legendary':
            return {
                gradient: 'from-yellow-400 via-amber-500 to-orange-500',
                bg: isDark ? 'bg-gradient-to-br from-yellow-900/30 via-amber-900/30 to-orange-900/30' : 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
                border: isDark ? 'border-yellow-500/50' : 'border-yellow-400',
                text: isDark ? 'text-yellow-400' : 'text-yellow-600',
                glow: 'shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            };
        case 'epic':
            return {
                gradient: 'from-purple-500 via-violet-500 to-indigo-500',
                bg: isDark ? 'bg-gradient-to-br from-purple-900/30 via-violet-900/30 to-indigo-900/30' : 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
                border: isDark ? 'border-purple-500/50' : 'border-purple-400',
                text: isDark ? 'text-purple-400' : 'text-purple-600',
                glow: 'shadow-[0_0_25px_rgba(139,92,246,0.3)]'
            };
        case 'rare':
            return {
                gradient: 'from-blue-500 via-cyan-500 to-teal-500',
                bg: isDark ? 'bg-gradient-to-br from-blue-900/30 via-cyan-900/30 to-teal-900/30' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50',
                border: isDark ? 'border-blue-500/50' : 'border-blue-400',
                text: isDark ? 'text-blue-400' : 'text-blue-600',
                glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
            };
        default:
            return {
                gradient: 'from-gray-400 via-slate-400 to-zinc-400',
                bg: isDark ? 'bg-gray-800/50' : 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50',
                border: isDark ? 'border-gray-600' : 'border-gray-300',
                text: isDark ? 'text-gray-400' : 'text-gray-600',
                glow: ''
            };
    }
};

const AchievementsView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full mb-6">
                        <Trophy className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.achievements || "Succès"}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.achievementsTitle || "Vos Trophées"}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        {t.achievementsDesc || "Débloquez des succès pour gagner de l'XP bonus et montrer votre progression !"}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-12">
                    <div className="text-center">
                        <div className="text-4xl font-black text-loot-red">{unlockedCount}/{achievements.length}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.unlockedAchievements || "Débloqués"}</div>
                    </div>
                    <div className={`w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-yellow-500">{totalXP}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.xpEarned || "XP gagnés"}</div>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {achievements.map((ach) => {
                        const config = getRarityConfig(ach.rarity, isDarkMode);
                        return (
                            <div
                                key={ach.id}
                                className={`
                  relative rounded-3xl p-6 border-2 transition-all
                  ${ach.unlocked
                                        ? `${config.bg} ${config.border} ${config.glow} hover:scale-[1.02]`
                                        : isDarkMode
                                            ? 'bg-gray-800/50 border-gray-700 opacity-70'
                                            : 'bg-gray-100 border-gray-200 opacity-70'
                                    }
                `}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`
                    p-4 rounded-2xl
                    ${ach.unlocked
                                            ? `bg-gradient-to-br ${config.gradient} text-white`
                                            : isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500'
                                        }
                  `}>
                                        {ach.unlocked ? ach.icon : <Lock className="w-8 h-8" />}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className={`text-lg font-black ${ach.unlocked
                                                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                                                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {t[ach.nameKey] || ach.name}
                                            </h3>
                                            {ach.unlocked && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                        </div>
                                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {t[ach.descKey] || ach.desc}
                                        </p>

                                        {/* Progress Bar */}
                                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                            }`}>
                                            <div
                                                className={`h-full rounded-full transition-all ${ach.unlocked
                                                    ? `bg-gradient-to-r ${config.gradient}`
                                                    : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
                                                    }`}
                                                style={{ width: `${ach.progress}%` }}
                                            />
                                        </div>
                                        {!ach.unlocked && ach.current !== undefined && (
                                            <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {ach.current} / {ach.target}
                                            </div>
                                        )}
                                    </div>

                                    {/* XP Badge */}
                                    <div className={`
                    px-3 py-1 rounded-full font-black text-sm
                    ${ach.unlocked
                                            ? `bg-gradient-to-r ${config.gradient} text-white`
                                            : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500'
                                        }
                  `}>
                                        +{ach.xp} XP
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AchievementsView;
