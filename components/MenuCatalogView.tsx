
import React, { useState } from 'react';
import { ChefHat, Star, Flame, Filter, Search, Crown, Gem, Zap, Package } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: any;
    isDarkMode?: boolean;
}

// Mock menu data
const menuItems = [
    // Legendary
    { id: 1, name: "Wagyu A5 Burger", restaurant: "Le Gourmet Premium", price: 45, rarity: "legendary", cuisine: "🇯🇵 Japonais", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", rating: 4.9 },
    { id: 2, name: "Homard Thermidor", restaurant: "Océan Gourmet", price: 52, rarity: "legendary", cuisine: "🇫🇷 Français", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300", rating: 5.0 },
    // Epic
    { id: 3, name: "Sushi Omakase", restaurant: "Tokyo Fusion", price: 32, rarity: "epic", cuisine: "🇯🇵 Japonais", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300", rating: 4.8 },
    { id: 4, name: "Côte de Boeuf Angus", restaurant: "Steakhouse Paris", price: 38, rarity: "epic", cuisine: "🇺🇸 Américain", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", rating: 4.7 },
    { id: 5, name: "Risotto Truffe", restaurant: "Casa Milano", price: 28, rarity: "epic", cuisine: "🇮🇹 Italien", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300", rating: 4.8 },
    // Rare
    { id: 6, name: "Pad Thai Royal", restaurant: "Bangkok Street", price: 22, rarity: "rare", cuisine: "🇹🇭 Thaïlandais", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300", rating: 4.6 },
    { id: 7, name: "Tacos Al Pastor", restaurant: "Mexico Lindo", price: 18, rarity: "rare", cuisine: "🇲🇽 Mexicain", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300", rating: 4.5 },
    { id: 8, name: "Poke Bowl Saumon", restaurant: "Aloha Kitchen", price: 16, rarity: "rare", cuisine: "🇺🇸 Hawaïen", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300", rating: 4.6 },
    // Common
    { id: 9, name: "Burger Classic", restaurant: "Street Food", price: 12, rarity: "common", cuisine: "🇺🇸 Américain", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300", rating: 4.2 },
    { id: 10, name: "Pizza Margherita", restaurant: "Napoli Express", price: 11, rarity: "common", cuisine: "🇮🇹 Italien", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300", rating: 4.3 },
    { id: 11, name: "Kebab Maison", restaurant: "Istanbul Grill", price: 9, rarity: "common", cuisine: "🇹🇷 Turc", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300", rating: 4.1 },
    { id: 12, name: "Salade César", restaurant: "Fresh & Co", price: 10, rarity: "common", cuisine: "🇺🇸 Américain", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", rating: 4.0 },
];

const getRarityConfig = (rarity: string) => {
    switch (rarity) {
        case 'legendary':
            return {
                gradient: 'from-yellow-400 via-amber-500 to-orange-500',
                bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
                border: 'border-yellow-400',
                label: '⭐ LÉGENDAIRE',
                icon: <Crown className="w-4 h-4" />,
                glow: 'shadow-[0_0_30px_rgba(251,191,36,0.5)]'
            };
        case 'epic':
            return {
                gradient: 'from-purple-500 via-violet-500 to-indigo-500',
                bg: 'bg-gradient-to-br from-purple-500 to-indigo-500',
                border: 'border-purple-400',
                label: '💎 ÉPIQUE',
                icon: <Gem className="w-4 h-4" />,
                glow: 'shadow-[0_0_25px_rgba(139,92,246,0.4)]'
            };
        case 'rare':
            return {
                gradient: 'from-blue-500 via-cyan-500 to-teal-500',
                bg: 'bg-gradient-to-br from-blue-500 to-teal-500',
                border: 'border-blue-400',
                label: '💙 RARE',
                icon: <Zap className="w-4 h-4" />,
                glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]'
            };
        default:
            return {
                gradient: 'from-gray-400 to-slate-500',
                bg: 'bg-gradient-to-br from-gray-400 to-slate-500',
                border: 'border-gray-300',
                label: '📦 COMMUN',
                icon: <Package className="w-4 h-4" />,
                glow: ''
            };
    }
};

const MenuCatalogView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = menuItems.filter(item => {
        const matchesFilter = filter === 'all' || item.rarity === filter;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
    const sortedItems = [...filteredItems].sort((a, b) =>
        rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
    );

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-6">
                        <ChefHat className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.menuCatalog || "Catalogue"}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.menuTitle || "Le Menu"}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.menuDesc || "Découvrez tous les plats disponibles, classés par rareté. Plus c'est rare, plus c'est délicieux !"}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder={t.searchDish || "Rechercher un plat..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-full border-2 outline-none transition-colors ${isDarkMode
                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-loot-red'
                                    : 'bg-white border-gray-200 text-gray-900 focus:border-loot-red'
                                }`}
                        />
                    </div>

                    {/* Rarity Filter */}
                    <div className="flex gap-2 flex-wrap justify-center">
                        {[
                            { key: 'all', label: 'Tous' },
                            { key: 'legendary', label: '⭐ Légendaire' },
                            { key: 'epic', label: '💎 Épique' },
                            { key: 'rare', label: '💙 Rare' },
                            { key: 'common', label: '📦 Commun' },
                        ].map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${filter === f.key
                                    ? 'bg-loot-red text-white'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-loot-red'
                                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-loot-red'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedItems.map((item) => {
                        const config = getRarityConfig(item.rarity);
                        return (
                            <div
                                key={item.id}
                                className={`rounded-3xl overflow-hidden border-2 ${config.border} ${config.glow} transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute top-3 left-3 ${config.bg} text-white text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1`}>
                                        {config.icon}
                                        {item.rarity === 'legendary' ? 'Légendaire' : item.rarity === 'epic' ? 'Épique' : item.rarity === 'rare' ? 'Rare' : 'Commun'}
                                    </div>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-sm font-black px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        {item.rating}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.cuisine}</div>
                                    <h3 className={`font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                                    <div className={`flex items-center gap-1 text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <ChefHat className="w-4 h-4" />
                                        {item.restaurant}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-loot-red">{item.price}€</span>
                                        <Flame className="w-5 h-5 text-orange-400" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {sortedItems.length === 0 && (
                    <div className="text-center py-20">
                        <Search className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.noResults || "Aucun résultat"}</h3>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MenuCatalogView;
