
import React from 'react';
import { Package, Star, Clock, ChefHat, Sparkles, Crown, Gem, Zap } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

// Mock loot box history data
const lootBoxHistory = [
    {
        id: 1,
        date: "2025-02-05",
        boxType: "legendary",
        boxName: "BOX GOLD",
        dish: "Wagyu A5 Burger",
        restaurant: "Le Gourmet Premium",
        value: 45,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200"
    },
    {
        id: 2,
        date: "2025-02-04",
        boxType: "epic",
        boxName: "BOX PREMIUM",
        dish: "Sushi Omakase",
        restaurant: "Tokyo Fusion",
        value: 32,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200"
    },
    {
        id: 3,
        date: "2025-02-03",
        boxType: "rare",
        boxName: "BOX DÉLICE",
        dish: "Pasta Truffe Noire",
        restaurant: "Casa Italia",
        value: 24,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200"
    },
    {
        id: 4,
        date: "2025-02-02",
        boxType: "common",
        boxName: "BOX CLASSIQUE",
        dish: "Burger Classic",
        restaurant: "Street Food Corner",
        value: 12,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200"
    },
    {
        id: 5,
        date: "2025-02-01",
        boxType: "epic",
        boxName: "BOX PREMIUM",
        dish: "Pad Thai Royal",
        restaurant: "Bangkok Street",
        value: 28,
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=200"
    },
];

const getRarityConfig = (rarity: string, isDark: boolean) => {
    switch (rarity) {
        case 'legendary':
            return {
                gradient: 'from-yellow-400 via-amber-500 to-orange-500',
                border: isDark ? 'border-yellow-500/50' : 'border-yellow-400',
                bg: isDark ? 'bg-gradient-to-r from-yellow-900/30 to-amber-900/30' : 'bg-gradient-to-r from-yellow-50 to-amber-50',
                icon: <Crown className="w-5 h-5" />,
                label: '⭐ LÉGENDAIRE',
                glow: 'shadow-[0_0_30px_rgba(251,191,36,0.4)]'
            };
        case 'epic':
            return {
                gradient: 'from-purple-500 via-violet-500 to-indigo-500',
                border: isDark ? 'border-purple-500/50' : 'border-purple-400',
                bg: isDark ? 'bg-gradient-to-r from-purple-900/30 to-violet-900/30' : 'bg-gradient-to-r from-purple-50 to-violet-50',
                icon: <Gem className="w-5 h-5" />,
                label: '💎 ÉPIQUE',
                glow: 'shadow-[0_0_25px_rgba(139,92,246,0.3)]'
            };
        case 'rare':
            return {
                gradient: 'from-blue-500 via-cyan-500 to-teal-500',
                border: isDark ? 'border-blue-500/50' : 'border-blue-400',
                bg: isDark ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30' : 'bg-gradient-to-r from-blue-50 to-cyan-50',
                icon: <Zap className="w-5 h-5" />,
                label: '💙 RARE',
                glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]'
            };
        default:
            return {
                gradient: 'from-gray-400 via-slate-400 to-zinc-400',
                border: isDark ? 'border-gray-600' : 'border-gray-300',
                bg: isDark ? 'bg-gray-800/50' : 'bg-gradient-to-r from-gray-50 to-slate-50',
                icon: <Package className="w-5 h-5" />,
                label: '📦 COMMUN',
                glow: ''
            };
    }
};

const MyLootBoxesView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    // Stats
    const totalBoxes = lootBoxHistory.length;
    const legendaryCount = lootBoxHistory.filter(b => b.boxType === 'legendary').length;
    const totalValue = lootBoxHistory.reduce((sum, b) => sum + b.value, 0);

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-6">
                        <Package className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.myLootBoxes || "Mes Loot Boxes"}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.lootBoxesTitle || "Historique des Box"}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.lootBoxesDesc || "Retrouvez tous les plats que vous avez gagnés grâce aux loot boxes !"}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
                    <div className={`rounded-2xl p-6 text-center shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        <div className="text-4xl font-black text-loot-red mb-1">{totalBoxes}</div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.boxesOpened || "Box ouvertes"}</div>
                    </div>
                    <div className={`rounded-2xl p-6 text-center shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        <div className="text-4xl font-black text-yellow-500 mb-1">{legendaryCount}</div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.legendaryWins || "Légendaires"}</div>
                    </div>
                    <div className={`rounded-2xl p-6 text-center shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        <div className="text-4xl font-black text-green-500 mb-1">{totalValue}€</div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.totalValue || "Valeur totale"}</div>
                    </div>
                </div>

                {/* Loot Box History */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {lootBoxHistory.map((box) => {
                        const config = getRarityConfig(box.boxType, isDarkMode);
                        return (
                            <div
                                key={box.id}
                                className={`${config.bg} rounded-3xl p-4 border-2 ${config.border} ${config.glow} transition-all hover:scale-[1.02]`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Dish Image */}
                                    <div className="relative">
                                        <img
                                            src={box.image}
                                            alt={box.dish}
                                            className="w-24 h-24 rounded-2xl object-cover"
                                        />
                                        <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${config.gradient} text-white p-1.5 rounded-full`}>
                                            {config.icon}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow">
                                        <div className={`inline-block bg-gradient-to-r ${config.gradient} text-white text-xs font-black uppercase px-3 py-1 rounded-full mb-2`}>
                                            {config.label}
                                        </div>
                                        <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{box.dish}</h3>
                                        <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <ChefHat className="w-4 h-4" />
                                            {box.restaurant}
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <Clock className="w-3 h-3" />
                                            {new Date(box.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <div className="text-right">
                                        <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{box.value}€</div>
                                        <div className={`text-xs uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.dishValue || "Valeur"}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State Message */}
                {lootBoxHistory.length === 0 && (
                    <div className="text-center py-20">
                        <Sparkles className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.noBoxesYet || "Aucune box ouverte"}</h3>
                        <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>{t.startSpinning || "Faites tourner la roue pour gagner des plats !"}</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyLootBoxesView;
