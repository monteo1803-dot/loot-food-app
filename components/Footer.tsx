
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Smartphone } from 'lucide-react';

interface Props {
  onBattlePassClick?: () => void;
  onJobsClick?: () => void;
  onFAQClick?: () => void;
  onMenuClick?: () => void;
  onMobileAppClick?: () => void;
  onMyLootBoxesClick?: () => void;
  onAchievementsClick?: () => void;
  isDarkMode?: boolean;
}

const Footer: React.FC<Props> = ({
  onBattlePassClick,
  onJobsClick,
  onFAQClick,
  onMenuClick,
  onMobileAppClick,
  onMyLootBoxesClick,
  onAchievementsClick,
  isDarkMode = false
}) => {
  return (
    <footer className={`pt-20 pb-10 px-4 md:px-8 border-t transition-colors ${isDarkMode
        ? 'bg-gray-900 border-gray-800'
        : 'bg-white border-gray-100'
      }`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        <div className="lg:col-span-1">
          <div className="text-4xl font-black text-loot-red tracking-tighter mb-6">
            LOOT<br /><span className="leading-3">FOOD</span>
          </div>
          <div className="flex gap-4 mb-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className={`w-6 h-6 hover:text-loot-red cursor-pointer transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className={`w-6 h-6 hover:text-loot-red cursor-pointer transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className={`w-6 h-6 hover:text-loot-red cursor-pointer transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
            </a>
          </div>
          {/* Mobile App CTA */}
          <button
            onClick={onMobileAppClick}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            <Smartphone className="w-4 h-4" />
            Télécharger l'app
          </button>
        </div>

        <div className="space-y-4">
          <h4 className={`font-bold uppercase tracking-widest text-xs mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>Explorer</h4>
          <ul className={`space-y-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
            }`}>
            <li><button onClick={onMenuClick} className="hover:text-loot-red text-left">Le Menu</button></li>
            <li><button onClick={onBattlePassClick} className="hover:text-loot-red text-left">Pass de Combat</button></li>
            <li><button onClick={onMyLootBoxesClick} className="hover:text-loot-red text-left">Mes Loot Boxes</button></li>
            <li><button onClick={onAchievementsClick} className="hover:text-loot-red text-left">Mes Succès</button></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className={`font-bold uppercase tracking-widest text-xs mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>Support</h4>
          <ul className={`space-y-3 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
            }`}>
            <li><button onClick={onFAQClick} className="hover:text-loot-red text-left">FAQ</button></li>
            <li><a href="mailto:empirecorp.lootfood@gmail.com" className="hover:text-loot-red">Obtenir de l'aide</a></li>
            <li><button onClick={onJobsClick} className="hover:text-loot-red text-left">Nous rejoindre</button></li>
            <li><a href="#terms" className="hover:text-loot-red">Conditions</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className={`font-bold uppercase tracking-widest text-xs mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>Contactez-nous</h4>
          <div className={`space-y-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
            }`}>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-loot-red" />
              <a href="mailto:empirecorp.lootfood@gmail.com" className="hover:text-loot-red">empirecorp.lootfood@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-loot-red" />
              <a href="tel:+3204338.90.89" className="hover:text-loot-red">04338.90.89</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-loot-red" />
              <span>Rue Ernest Poisson 42 - Dubaï</span>
            </div>
          </div>
        </div>

      </div>

      <div className={`text-center pt-10 border-t font-bold text-sm ${isDarkMode
          ? 'border-gray-800 text-gray-500'
          : 'border-gray-100 text-gray-400'
        }`}>
        EMPIRE.C &copy; {new Date().getFullYear()} - TOUS DROITS RÉSERVÉS
      </div>
    </footer>
  );
};

export default Footer;
