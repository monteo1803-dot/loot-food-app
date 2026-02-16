
import React from 'react';
import { ShoppingCart, Trophy, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import AnimatedLogo from './AnimatedLogo';
import DarkModeToggle from './DarkModeToggle';
import XPProgressBar from './XPProgressBar';

interface UserData {
  name: string;
  email: string;
}

interface Props {
  onCartClick?: () => void;
  onBattlePassClick?: () => void;
  onHomeClick?: () => void;
  onAuthClick?: () => void;
  onProfileClick?: () => void;
  onJobsClick?: () => void;
  onLeaderboardClick?: () => void;
  currentLang: string;
  onLangChange: (lang: string) => void;
  isLoggedIn?: boolean;
  user?: UserData | null;
  t: Record<string, string>;
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
  userXP?: number;
  userMaxXP?: number;
  userLevel?: number;
}

const Header: React.FC<Props> = ({
  onCartClick,
  onBattlePassClick,
  onHomeClick,
  onAuthClick,
  onProfileClick,
  onJobsClick,
  onLeaderboardClick,
  currentLang,
  onLangChange,
  isLoggedIn = false,
  user,
  t,
  isDarkMode = false,
  onDarkModeToggle,
  userXP = 2450,
  userMaxXP = 3000,
  userLevel = 12
}) => {
  return (
    <header className={`sticky top-0 z-50 shadow-sm h-20 px-4 md:px-8 flex items-center justify-between transition-colors ${isDarkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white'}`}>
      <div className="flex items-center gap-4 md:gap-8">
        {/* Animated Logo with spinning roulettes */}
        <AnimatedLogo onClick={onHomeClick} />

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-6 font-semibold text-sm uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : ''}`} aria-label="Navigation principale">
          <button
            onClick={onBattlePassClick}
            className="hover:text-loot-red transition-colors font-bold whitespace-nowrap flex items-center gap-2"
            aria-label="Accéder au Pass de combat"
          >
            <Trophy className="w-4 h-4" aria-hidden="true" />
            {t.navBattlePass}
          </button>
          <button onClick={onJobsClick} className="hover:text-loot-red transition-colors whitespace-nowrap" aria-label="Voir les offres d'emploi">{t.navJobs}</button>
          <button onClick={onLeaderboardClick} className="hover:text-loot-red transition-colors font-bold whitespace-nowrap" aria-label="Voir le classement">{t.navLeaderboard}</button>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* XP Progress - Desktop only */}
        {isLoggedIn && (
          <div className="hidden lg:block">
            <XPProgressBar
              currentXP={userXP}
              maxXP={userMaxXP}
              level={userLevel}
              compact
            />
          </div>
        )}

        {/* Dark Mode Toggle */}
        {onDarkModeToggle && (
          <DarkModeToggle isDark={isDarkMode} onToggle={onDarkModeToggle} />
        )}

        {/* Mobile Battle Pass Button */}
        <button
          onClick={onBattlePassClick}
          className="lg:hidden p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-loot-red transition-colors"
          aria-label="Pass de combat"
        >
          <Trophy className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Language Selector - New Component */}
        <LanguageSelector
          currentLang={currentLang}
          onLangChange={onLangChange}
        />

        {/* User Profile / Auth */}
        {isLoggedIn && user ? (
          <button
            onClick={onProfileClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
          >
            <img
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              className="w-8 h-8 rounded-full border-2 border-loot-red"
              alt="Profile"
              loading="lazy"
              decoding="async"
              width="32"
              height="32"
            />
            <span className={`text-sm font-bold hidden sm:inline uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user.name}</span>
          </button>
        ) : (
          <button
            onClick={onAuthClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
          >
            <User className={`w-6 h-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-sm font-bold hidden sm:inline uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Guest</span>
          </button>
        )}

        {/* Register / Login Button */}
        {!isLoggedIn && (
          <button
            onClick={onAuthClick}
            className="hidden md:block bg-loot-red text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase transition-all hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-200"
          >
            {t.btnRegister}
          </button>
        )}

        {/* Cart */}
        <button
          onClick={onCartClick}
          className={`p-2 rounded-xl relative transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          aria-label="Voir le panier"
        >
          <ShoppingCart className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;
