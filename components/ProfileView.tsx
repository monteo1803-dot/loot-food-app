
import React from 'react';
import { ArrowLeft, Trophy, Coins, Star, ShoppingBag, Settings, LogOut, Crown, Zap, ChevronRight } from 'lucide-react';

interface User {
    name: string;
    email: string;
    avatar?: string;
    level?: number;
    xp?: number;
    coins?: number;
    orders?: number;
}

interface Props {
    user: User;
    onBack: () => void;
    onLogout: () => void;
    onBattlePassClick: () => void;
}

const ProfileView: React.FC<Props> = ({ user, onBack, onLogout, onBattlePassClick }) => {
    const userStats = {
        level: user.level || 12,
        xp: user.xp || 2450,
        xpMax: 3000,
        coins: user.coins || 156,
        orders: user.orders || 23,
    };

    const recentOrders = [
        { id: 1, name: 'Burger King - Maxi Menu', date: 'Aujourd\'hui', price: 12.95, status: 'delivered' },
        { id: 2, name: 'McDonald\'s - Big Mac', date: 'Hier', price: 9.50, status: 'delivered' },
        { id: 3, name: 'KFC - Bucket Original', date: '28 Jan', price: 15.99, status: 'delivered' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-loot-red via-red-600 to-red-800 text-white relative overflow-hidden">
                {/* Pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
                />

                {/* Back button */}
                <div className="relative z-10 p-6">
                    <button
                        onClick={onBack}
                        className="text-white/80 hover:text-white flex items-center gap-2 font-bold"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Retour
                    </button>
                </div>

                {/* Profile Info */}
                <div className="relative z-10 px-6 pb-12 text-center">
                    <div className="relative inline-block mb-4">
                        <img
                            src={user.avatar || `https://i.pravatar.cc/200?u=${user.email}`}
                            alt="Avatar"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-2xl"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                            {userStats.level}
                        </div>
                    </div>

                    <h1 className="text-3xl font-black italic uppercase tracking-tight mb-1">
                        {user.name}
                    </h1>
                    <p className="text-white/70 font-bold text-sm">{user.email}</p>

                    {/* XP Bar */}
                    <div className="max-w-xs mx-auto mt-6">
                        <div className="flex justify-between text-xs font-bold text-white/70 mb-2">
                            <span>Niveau {userStats.level}</span>
                            <span>{userStats.xp} / {userStats.xpMax} XP</span>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                style={{ width: `${(userStats.xp / userStats.xpMax) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="px-4 -mt-6 relative z-20">
                <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                    <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                        <Coins className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="font-black text-2xl text-gray-900">{userStats.coins}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase">Coins</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                        <ShoppingBag className="w-8 h-8 text-loot-red mx-auto mb-2" />
                        <div className="font-black text-2xl text-gray-900">{userStats.orders}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase">Commandes</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100">
                        <Crown className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <div className="font-black text-2xl text-gray-900">#42</div>
                        <div className="text-xs font-bold text-gray-400 uppercase">Rang</div>
                    </div>
                </div>
            </div>

            {/* Battle Pass CTA */}
            <div className="px-4 mt-6">
                <button
                    onClick={onBattlePassClick}
                    className="w-full max-w-lg mx-auto block bg-gradient-to-r from-loot-red to-orange-500 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-black text-lg uppercase tracking-tight">Pass de Combat</div>
                                <div className="text-sm text-white/80 font-bold">Palier 3 • 38/55 XP</div>
                            </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-white/60" />
                    </div>
                </button>
            </div>

            {/* Recent Orders */}
            <div className="px-4 mt-8">
                <div className="max-w-lg mx-auto">
                    <h2 className="font-black text-xl uppercase tracking-tight mb-4 text-gray-900">
                        Commandes récentes
                    </h2>
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="flex-grow">
                                    <div className="font-bold text-gray-900">{order.name}</div>
                                    <div className="text-sm text-gray-400 font-medium">{order.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-loot-red">{order.price.toFixed(2).replace('.', ',')}€</div>
                                    <div className="text-xs text-green-500 font-bold uppercase">Livré</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Settings Menu */}
            <div className="px-4 mt-8">
                <div className="max-w-lg mx-auto">
                    <h2 className="font-black text-xl uppercase tracking-tight mb-4 text-gray-900">
                        Paramètres
                    </h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <button className="w-full p-4 flex items-center gap-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                            <span className="font-bold text-gray-700">Paramètres du compte</span>
                            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto" />
                        </button>
                        <button className="w-full p-4 flex items-center gap-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <Star className="w-5 h-5 text-gray-400" />
                            <span className="font-bold text-gray-700">Préférences alimentaires</span>
                            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto" />
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full p-4 flex items-center gap-4 hover:bg-red-50 transition-colors text-loot-red"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Se déconnecter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
