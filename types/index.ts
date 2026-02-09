// Types principaux pour Loot Food

// Rareté des plats
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

// Catégories de roues
export type WheelCategory = 'fastfood' | 'asian' | 'italian' | 'french' | 'random';

// Thème de roue
export interface WheelTheme {
    id: string;
    name: string;
    nameKey: string;
    price: string;
    priceValue: number;
    maxValue: number;
    colors: string[];
    category: WheelCategory;
}

// Plat/Item
export interface Dish {
    id?: string;
    name: string;
    restaurant: string;
    price: number;
    image: string;
    rarity: Rarity;
}

// Article du panier
export interface CartItem extends Dish {
    id: string;
    wheelTheme: string;
    wheelPrice: number;
    quantity: number;
    addedAt: Date;
}

// Utilisateur
export interface User {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    xp?: number;
    level?: number;
}

// État de vue
export type ViewState =
    | 'home'
    | 'wheel'
    | 'checkout'
    | 'battlepass'
    | 'auth'
    | 'profile'
    | 'leaderboard'
    | 'jobs'
    | 'mylootboxes'
    | 'achievements'
    | 'menu'
    | 'faq'
    | 'mobileapp';

// Props communes
export interface CommonProps {
    isDarkMode?: boolean;
    t?: Record<string, string>;
}

// Props avec callback de retour
export interface ViewProps extends CommonProps {
    onBack: () => void;
}
