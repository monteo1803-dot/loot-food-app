
import React, { useState, Suspense, lazy, useCallback, useEffect, memo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBoxes from './components/FeaturedBoxes';
import FoodGallery from './components/FoodGallery';
import { AppProvider, useTheme, useLanguage, useCart, useUser, useNavigation } from './context/AppContext';
import type { WheelTheme, ViewState } from './types';

// Lazy load secondary homepage components
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Rewards = lazy(() => import('./components/Rewards'));
const Footer = lazy(() => import('./components/Footer'));
import ScrollReveal from './components/ScrollReveal';

// Lazy load non-critical views for better initial load
const WheelView = lazy(() => import('./components/WheelView'));
const CheckoutFlow = lazy(() => import('./components/CheckoutFlow'));
const BattlePassView = lazy(() => import('./components/BattlePassView'));
const AuthView = lazy(() => import('./components/AuthView'));
const ProfileView = lazy(() => import('./components/ProfileView'));
const LeaderboardView = lazy(() => import('./components/LeaderboardView'));
const JobsView = lazy(() => import('./components/JobsView'));
const MyLootBoxesView = lazy(() => import('./components/MyLootBoxesView'));
const AchievementsView = lazy(() => import('./components/AchievementsView'));
const MenuCatalogView = lazy(() => import('./components/MenuCatalogView'));
const FAQView = lazy(() => import('./components/FAQView'));
const MobileAppView = lazy(() => import('./components/MobileAppView'));

// Titres SEO par vue
const VIEW_TITLES: Record<ViewState, string> = {
  home: 'Loot Food - Manger en s\'amusant !',
  wheel: 'Tourner la roue | Loot Food',
  checkout: 'Panier | Loot Food',
  battlepass: 'Pass de Combat | Loot Food',
  auth: 'Connexion | Loot Food',
  profile: 'Mon Profil | Loot Food',
  leaderboard: 'Classement | Loot Food',
  jobs: 'Emplois | Loot Food',
  mylootboxes: 'Mes Loot Boxes | Loot Food',
  achievements: 'Succès | Loot Food',
  menu: 'Menu | Loot Food',
  faq: 'FAQ | Loot Food',
  mobileapp: 'Application Mobile | Loot Food'
};

// Catégories de filtres
const FILTER_CATEGORIES = [
  { id: 'all', label: 'Toutes', icon: '🎰' },
  { id: 'fastfood', label: 'Fast Food', icon: '🍔' },
  { id: 'asian', label: 'Asiatique', icon: '🍜' },
  { id: 'italian', label: 'Italien', icon: '🍕' },
  { id: 'french', label: 'Français', icon: '🥐' },
  { id: 'random', label: 'Surprise', icon: '🎲' },
];

// Loading fallback component - optimisé pour éviter Layout Shift
const LoadingSpinner: React.FC = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center animate-fade-in">
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-loot-red/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-loot-red border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-loot-red/40 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="font-black text-gray-400 uppercase tracking-widest text-sm animate-pulse">Chargement...</p>
    </div>
  </div>
));

// Loading fallback for smaller components - hauteur fixe pour éviter Layout Shift
const MiniLoader: React.FC = memo(() => (
  <div className="flex items-center justify-center py-8 min-h-[200px]">
    <div className="w-10 h-10 border-3 border-loot-red border-t-transparent rounded-full animate-spin"></div>
  </div>
));

// Barre de filtres catégories
interface CategoryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  isDarkMode: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = memo(({ activeFilter, onFilterChange, isDarkMode }) => (
  <div className={`py-4 px-4 md:px-8 overflow-x-auto no-scrollbar ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
    <div className="container mx-auto">
      <div className="flex gap-3">
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeFilter === cat.id
              ? 'bg-loot-red text-white shadow-lg scale-105'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            aria-pressed={activeFilter === cat.id}
            aria-label={`Filtrer par ${cat.label}`}
          >
            <span aria-hidden="true">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
));

// Composant principal interne utilisant les contexts
const AppContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { cart, addToCart } = useCart();
  const { user, isLoggedIn, login, logout } = useUser();
  const { currentView, selectedBox, navigate, openWheel } = useNavigation();

  const [categoryFilter, setCategoryFilter] = useState('all');

  // SEO dynamique - mise à jour du titre
  useEffect(() => {
    document.title = VIEW_TITLES[currentView] || VIEW_TITLES.home;
  }, [currentView]);

  // Handler pour ajouter au panier depuis WheelView
  const handleAddToCart = useCallback((item: any) => {
    addToCart({
      ...item,
      wheelTheme: selectedBox?.id || 'unknown',
      wheelPrice: selectedBox?.priceValue || 0
    });
    navigate('checkout');
  }, [addToCart, selectedBox, navigate]);

  const renderContent = () => {
    switch (currentView) {
      case 'wheel':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <WheelView
              box={selectedBox}
              onBack={() => navigate('home')}
              onConfirm={handleAddToCart}
              t={t}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        );
      case 'checkout':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <CheckoutFlow
              cart={cart}
              onBack={() => navigate('home')}
            />
          </Suspense>
        );
      case 'battlepass':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <BattlePassView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'leaderboard':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LeaderboardView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'jobs':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <JobsView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'mylootboxes':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MyLootBoxesView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'achievements':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AchievementsView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'menu':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MenuCatalogView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'faq':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'mobileapp':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MobileAppView onBack={() => navigate('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'auth':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthView
              onBack={() => navigate('home')}
              onLogin={(userData) => {
                login(userData);
                navigate('home');
              }}
              t={t}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfileView
              user={user!}
              onBack={() => navigate('home')}
              onLogout={() => {
                logout();
                navigate('home');
              }}
              onBattlePassClick={() => navigate('battlepass')}
            />
          </Suspense>
        );
      default:
        return (
          <>
            <Hero t={t} onGoClick={() => navigate('menu')} />
            <CategoryFilter
              activeFilter={categoryFilter}
              onFilterChange={setCategoryFilter}
              isDarkMode={isDarkMode}
            />
            <ScrollReveal direction="up">
              <FeaturedBoxes
                onSelect={openWheel}
                isDarkMode={isDarkMode}
                t={t}
                filter={categoryFilter}
              />
            </ScrollReveal>
            <Suspense fallback={<MiniLoader />}>
              <ScrollReveal direction="left">
                <HowItWorks t={t} />
              </ScrollReveal>
            </Suspense>
            <ScrollReveal direction="right">
              <FoodGallery t={t} isDarkMode={isDarkMode} />
            </ScrollReveal>
            <Suspense fallback={<MiniLoader />}>
              <ScrollReveal direction="up">
                <Rewards onBattlePassClick={() => navigate('battlepass')} t={t} />
              </ScrollReveal>
            </Suspense>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header
        onCartClick={() => navigate('checkout')}
        onBattlePassClick={() => navigate('battlepass')}
        onHomeClick={() => navigate('home')}
        onAuthClick={() => navigate('auth')}
        onProfileClick={() => navigate('profile')}
        onJobsClick={() => navigate('jobs')}
        onLeaderboardClick={() => navigate('leaderboard')}
        currentLang={language}
        onLangChange={setLanguage}
        isLoggedIn={isLoggedIn}
        user={user}
        t={t}
        isDarkMode={isDarkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      {currentView !== 'auth' && currentView !== 'profile' && currentView !== 'mobileapp' && (
        <Suspense fallback={<MiniLoader />}>
          <Footer
            onBattlePassClick={() => navigate('battlepass')}
            onJobsClick={() => navigate('jobs')}
            onFAQClick={() => navigate('faq')}
            onMenuClick={() => navigate('menu')}
            onMobileAppClick={() => navigate('mobileapp')}
            onMyLootBoxesClick={() => navigate('mylootboxes')}
            onAchievementsClick={() => navigate('achievements')}
            isDarkMode={isDarkMode}
          />
        </Suspense>
      )}
    </div>
  );
};

// App avec providers
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
