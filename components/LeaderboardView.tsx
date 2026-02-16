
import React from 'react';
import { Trophy, Medal, Crown, Star, Flame, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, name: "GamerChef_42", avatar: "https://i.pravatar.cc/150?u=1", xp: 15420, level: 32, streak: 45, change: 'up' },
    { rank: 2, name: "FoodHunter", avatar: "https://i.pravatar.cc/150?u=2", xp: 14850, level: 30, streak: 38, change: 'up' },
    { rank: 3, name: "LootMaster", avatar: "https://i.pravatar.cc/150?u=3", xp: 13200, level: 28, streak: 22, change: 'down' },
    { rank: 4, name: "SpinToWin", avatar: "https://i.pravatar.cc/150?u=4", xp: 11980, level: 26, streak: 15, change: 'same' },
    { rank: 5, name: "BoxOpener", avatar: "https://i.pravatar.cc/150?u=5", xp: 10540, level: 24, streak: 12, change: 'up' },
    { rank: 6, name: "WheelWarrior", avatar: "https://i.pravatar.cc/150?u=6", xp: 9870, level: 22, streak: 8, change: 'down' },
    { rank: 7, name: "FoodieKing", avatar: "https://i.pravatar.cc/150?u=7", xp: 8920, level: 20, streak: 5, change: 'same' },
    { rank: 8, name: "LuckyEater", avatar: "https://i.pravatar.cc/150?u=8", xp: 7650, level: 18, streak: 3, change: 'up' },
    { rank: 9, name: "ChefMode", avatar: "https://i.pravatar.cc/150?u=9", xp: 6890, level: 16, streak: 2, change: 'down' },
    { rank: 10, name: "HungryGamer", avatar: "https://i.pravatar.cc/150?u=10", xp: 5420, level: 14, streak: 1, change: 'same' },
];

const LeaderboardView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-8 h-8 text-yellow-400" />;
            case 2:
                return <Medal className="w-7 h-7 text-gray-400" />;
            case 3:
                return <Medal className="w-6 h-6 text-amber-600" />;
            default:
                return <span className={`text-2xl font-black ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>#{rank}</span>;
        }
    };

    const getChangeIcon = (change: string) => {
        switch (change) {
            case 'up':
                return <ChevronUp className="w-5 h-5 text-green-500" />;
            case 'down':
                return <ChevronDown className="w-5 h-5 text-red-500" />;
            default:
                return <div className={`w-5 h-5 flex items-center justify-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</div>;
        }
    };

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-loot-red text-white px-6 py-2 rounded-full mb-6">
                        <Trophy className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.navLeaderboard}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.leaderboardTitle}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.leaderboardDesc}
                    </p>
                </div>

                {/* Top 3 Podium */}
                <div className="flex justify-center items-end gap-4 mb-16">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center">
                        <img
                            src={leaderboardData[1].avatar}
                            alt={leaderboardData[1].name}
                            className="w-20 h-20 rounded-full border-4 border-gray-300 mb-3"
                        />
                        <div className={`w-28 h-32 rounded-t-2xl flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                            <Medal className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`font-black text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>2</span>
                        </div>
                        <span className={`mt-2 font-bold text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{leaderboardData[1].name}</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{leaderboardData[1].xp.toLocaleString()} XP</span>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center -mt-8">
                        <div className="relative">
                            <img
                                src={leaderboardData[0].avatar}
                                alt={leaderboardData[0].name}
                                className="w-28 h-28 rounded-full border-4 border-yellow-400 mb-3"
                            />
                            <Crown className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-400" />
                        </div>
                        <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 w-32 h-44 rounded-t-2xl flex flex-col items-center justify-center shadow-xl">
                            <Star className="w-10 h-10 text-white mb-2" />
                            <span className="font-black text-3xl text-white">1</span>
                        </div>
                        <span className={`mt-2 font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{leaderboardData[0].name}</span>
                        <span className="text-sm text-loot-red font-bold">{leaderboardData[0].xp.toLocaleString()} XP</span>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center">
                        <img
                            src={leaderboardData[2].avatar}
                            alt={leaderboardData[2].name}
                            className="w-20 h-20 rounded-full border-4 border-amber-500 mb-3"
                        />
                        <div className={`w-28 h-24 rounded-t-2xl flex flex-col items-center justify-center ${isDarkMode ? 'bg-amber-900/40' : 'bg-amber-100'
                            }`}>
                            <Medal className="w-7 h-7 text-amber-600 mb-2" />
                            <span className={`font-black text-2xl ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>3</span>
                        </div>
                        <span className={`mt-2 font-bold text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{leaderboardData[2].name}</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{leaderboardData[2].xp.toLocaleString()} XP</span>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="max-w-3xl mx-auto">
                    <div className={`rounded-3xl shadow-xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        {leaderboardData.slice(3).map((player, index) => (
                            <div
                                key={player.rank}
                                className={`flex items-center gap-4 p-4 transition-colors ${index !== leaderboardData.length - 4
                                        ? isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-100'
                                        : ''
                                    } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                            >
                                {/* Rank */}
                                <div className="w-12 flex justify-center">
                                    {getRankIcon(player.rank)}
                                </div>

                                {/* Avatar */}
                                <img
                                    src={player.avatar}
                                    alt={player.name}
                                    className={`w-12 h-12 rounded-full border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                        }`}
                                />

                                {/* Name & Level */}
                                <div className="flex-grow">
                                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{player.name}</div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.leaderboardLevel} {player.level}</div>
                                </div>

                                {/* Streak */}
                                <div className="flex items-center gap-1 text-orange-500">
                                    <Flame className="w-4 h-4" />
                                    <span className="font-bold text-sm">{player.streak}</span>
                                </div>

                                {/* XP */}
                                <div className="text-right">
                                    <div className="font-black text-loot-red">{player.xp.toLocaleString()}</div>
                                    <div className={`text-xs uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>XP</div>
                                </div>

                                {/* Change */}
                                <div className="w-8">
                                    {getChangeIcon(player.change)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeaderboardView;
