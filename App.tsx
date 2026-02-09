
import React, { useState, Suspense, lazy, useCallback, useEffect, memo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedBoxes from './components/FeaturedBoxes';
import FoodGallery from './components/FoodGallery';

// Lazy load secondary homepage components
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Rewards = lazy(() => import('./components/Rewards'));
const Footer = lazy(() => import('./components/Footer'));
import ScrollReveal from './components/ScrollReveal';
import { translations } from './translations';

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

type ViewState = 'home' | 'wheel' | 'checkout' | 'battlepass' | 'auth' | 'profile' | 'leaderboard' | 'jobs' | 'mylootboxes' | 'achievements' | 'menu' | 'faq' | 'mobileapp';

interface User {
  name: string;
  email: string;
}

// Loading fallback component
const LoadingSpinner: React.FC = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-loot-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="font-black text-gray-400 uppercase tracking-widest text-sm">Chargement...</p>
    </div>
  </div>
));

// Loading fallback for smaller components
const MiniLoader: React.FC = memo(() => (
  <div className="flex items-center justify-center py-8">
    <div className="w-8 h-8 border-3 border-loot-red border-t-transparent rounded-full animate-spin"></div>
  </div>
));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [language, setLanguage] = useState<string>('fr');
  const [selectedBox, setSelectedBox] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const t = translations[language] || translations['fr'];

  // Memoized callbacks to prevent unnecessary re-renders
  const handleOpenBox = useCallback((box: any) => {
    setSelectedBox(box);
    setCurrentView('wheel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = useCallback((item: any) => {
    setCart(prev => [...prev, item]);
    setCurrentView('checkout');
  }, []);

  const handleViewChange = useCallback((view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLangChange = useCallback((lang: string) => {
    setLanguage(lang);
  }, []);

  const handleLogin = useCallback((userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentView('home');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setCurrentView('home');
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'wheel':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <WheelView
              box={selectedBox}
              onBack={() => handleViewChange('home')}
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
              onBack={() => handleViewChange('home')}
            />
          </Suspense>
        );
      case 'battlepass':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <BattlePassView onBack={() => handleViewChange('home')} t={t} />
          </Suspense>
        );
      case 'leaderboard':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <LeaderboardView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'jobs':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <JobsView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'mylootboxes':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MyLootBoxesView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'achievements':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AchievementsView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'menu':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MenuCatalogView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'faq':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FAQView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'mobileapp':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <MobileAppView onBack={() => handleViewChange('home')} t={t} isDarkMode={isDarkMode} />
          </Suspense>
        );
      case 'auth':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AuthView
              onBack={() => handleViewChange('home')}
              onLogin={handleLogin}
              t={t}
            />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfileView
              user={user!}
              onBack={() => handleViewChange('home')}
              onLogout={handleLogout}
              onBattlePassClick={() => handleViewChange('battlepass')}
            />
          </Suspense>
        );
      default:
        return (
          <>
            <Hero t={t} onGoClick={() => handleViewChange('menu')} />
            <ScrollReveal direction="up">
              <FeaturedBoxes onSelect={handleOpenBox} isDarkMode={isDarkMode} t={t} />
            </ScrollReveal>
            <ScrollReveal direction="left">
              <HowItWorks t={t} />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <FoodGallery t={t} isDarkMode={isDarkMode} />
            </ScrollReveal>
            <ScrollReveal direction="up">
              <Rewards onBattlePassClick={() => handleViewChange('battlepass')} t={t} />
            </ScrollReveal>
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header
          onCartClick={() => handleViewChange('checkout')}
          onBattlePassClick={() => handleViewChange('battlepass')}
          onHomeClick={() => handleViewChange('home')}
          onAuthClick={() => handleViewChange('auth')}
          onProfileClick={() => handleViewChange('profile')}
          onJobsClick={() => handleViewChange('jobs')}
          onLeaderboardClick={() => handleViewChange('leaderboard')}
          currentLang={language}
          onLangChange={handleLangChange}
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
              onBattlePassClick={() => handleViewChange('battlepass')}
              onJobsClick={() => handleViewChange('jobs')}
              onFAQClick={() => handleViewChange('faq')}
              onMenuClick={() => handleViewChange('menu')}
              onMobileAppClick={() => handleViewChange('mobileapp')}
              onMyLootBoxesClick={() => handleViewChange('mylootboxes')}
              onAchievementsClick={() => handleViewChange('achievements')}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
