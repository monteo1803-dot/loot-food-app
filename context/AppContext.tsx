import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import type { User, CartItem, ViewState, WheelTheme } from '../types/index';
import type { Language } from '../types/translations';
import { translations } from '../translations';

// ============== THEME CONTEXT ==============
interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('lootfood_darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('lootfood_darkMode', JSON.stringify(isDarkMode));
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = useCallback(() => setIsDarkMode((prev: boolean) => !prev), []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// ============== LANGUAGE CONTEXT ==============
interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        const saved = localStorage.getItem('lootfood_language');
        return saved || 'fr';
    });

    const setLanguage = useCallback((lang: string) => {
        setLanguageState(lang);
        localStorage.setItem('lootfood_language', lang);
    }, []);

    const t = useMemo(() => {
        const lang = language as Language;
        return (translations[lang] || translations['fr']) as unknown as Record<string, string>;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// ============== CART CONTEXT ==============
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'id' | 'addedAt' | 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('lootfood_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('lootfood_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((item: Omit<CartItem, 'id' | 'addedAt' | 'quantity'>) => {
        const newItem: CartItem = {
            ...item,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            addedAt: new Date(),
            quantity: 1
        };
        setCart(prev => [...prev, newItem]);
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + item.wheelPrice * item.quantity, 0),
        [cart]
    );

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// ============== USER CONTEXT ==============
interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('lootfood_user');
        return saved ? JSON.parse(saved) : null;
    });

    const isLoggedIn = !!user;

    useEffect(() => {
        if (user) {
            localStorage.setItem('lootfood_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('lootfood_user');
        }
    }, [user]);

    const login = useCallback((userData: User) => setUser(userData), []);
    const logout = useCallback(() => setUser(null), []);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// ============== NAVIGATION CONTEXT ==============
interface NavigationContextType {
    currentView: ViewState;
    selectedBox: WheelTheme | null;
    navigate: (view: ViewState) => void;
    openWheel: (box: WheelTheme) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) throw new Error('useNavigation must be used within NavigationProvider');
    return context;
};

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentView, setCurrentView] = useState<ViewState>('home');
    const [selectedBox, setSelectedBox] = useState<WheelTheme | null>(null);

    const navigate = useCallback((view: ViewState) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const openWheel = useCallback((box: WheelTheme) => {
        setSelectedBox(box);
        setCurrentView('wheel');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <NavigationContext.Provider value={{ currentView, selectedBox, navigate, openWheel }}>
            {children}
        </NavigationContext.Provider>
    );
};

// ============== COMBINED PROVIDER ==============
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <CartProvider>
                    <UserProvider>
                        <NavigationProvider>
                            {children}
                        </NavigationProvider>
                    </UserProvider>
                </CartProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
};
