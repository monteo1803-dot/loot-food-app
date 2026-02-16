
import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Types stricts pour les thèmes de roues
export interface WheelTheme {
  id: string;
  name: string;
  nameKey: string;
  price: string;
  priceValue: number;
  maxValue: number;
  colors: string[];
  category: 'fastfood' | 'asian' | 'italian' | 'french' | 'random';
}

// Thèmes de roulettes avec couleurs uniques par thème
export const wheelThemes: WheelTheme[] = [
  {
    id: 'fastfood',
    name: 'Fast Food',
    nameKey: 'wheelFastFood',
    price: '12,95€',
    priceValue: 12.95,
    maxValue: 18,
    colors: ['#D32F2F', '#5D4037', '#E64A19', '#FBC02D', '#FF5722', '#8D6E63', '#FF9800', '#795548'],
    category: 'fastfood'
  },
  {
    id: 'asian',
    name: 'Asiatique',
    nameKey: 'wheelAsian',
    price: '15,95€',
    priceValue: 15.95,
    maxValue: 22,
    colors: ['#C62828', '#212121', '#FFD700', '#B71C1C', '#424242', '#FFC107', '#D32F2F', '#616161'],
    category: 'asian'
  },
  {
    id: 'italian',
    name: 'Italien',
    nameKey: 'wheelItalian',
    price: '14,95€',
    priceValue: 14.95,
    maxValue: 20,
    colors: ['#2E7D32', '#A5D6A7', '#1B5E20', '#C8E6C9', '#388E3C', '#81C784', '#43A047', '#66BB6A'],
    category: 'italian'
  },
  {
    id: 'french',
    name: 'Français',
    nameKey: 'wheelFrench',
    price: '17,95€',
    priceValue: 17.95,
    maxValue: 25,
    colors: ['#1565C0', '#E3F2FD', '#C62828', '#1976D2', '#FFCDD2', '#B71C1C', '#2196F3', '#EF5350'],
    category: 'french'
  },
  {
    id: 'random',
    name: 'Surprise',
    nameKey: 'wheelRandom',
    price: '13,95€',
    priceValue: 13.95,
    maxValue: 20,
    colors: ['#9C27B0', '#E91E63', '#00BCD4', '#4CAF50', '#FF9800', '#3F51B5', '#FFEB3B', '#795548'],
    category: 'random'
  },
];

interface Props {
  onSelect: (theme: WheelTheme) => void;
  isDarkMode?: boolean;
  t?: Record<string, string>;
  filter?: string;
}

// Roue graphique avec animation hover
const WheelGraphic: React.FC<{ colors: string[] }> = ({ colors }) => {
  const numSegments = colors.length;
  const segmentAngle = 360 / numSegments;

  return (
    <div className="relative w-36 h-36 group-hover:animate-spin-slow transition-transform">
      {/* Anneau extérieur */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-200 group-hover:border-loot-red transition-colors" />

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" aria-hidden="true">
        {colors.map((color, i) => {
          const startAngle = i * segmentAngle - 90;
          const endAngle = startAngle + segmentAngle;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 50 + 45 * Math.cos(startRad);
          const y1 = 50 + 45 * Math.sin(startRad);
          const x2 = 50 + 45 * Math.cos(endRad);
          const y2 = 50 + 45 * Math.sin(endRad);

          const largeArc = segmentAngle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={color}
            />
          );
        })}

        {/* Centre */}
        <circle cx="50" cy="50" r="10" fill="#fff" />
        <circle cx="50" cy="50" r="5" fill="#D32F2F" />
      </svg>
    </div>
  );
};

const FeaturedBoxes: React.FC<Props> = ({ onSelect, isDarkMode = false, t, filter = 'all' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Classes simplifiées pour dark mode
  const containerClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-transparent';
  const titleClass = isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900';
  const priceClass = isDarkMode ? 'text-white' : 'text-gray-800';

  // Filtrer les roues par catégorie
  const filteredThemes = filter === 'all'
    ? wheelThemes
    : wheelThemes.filter(theme => theme.category === filter);

  // Scroll horizontal
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`py-12 px-4 md:px-8 overflow-hidden ${containerClass}`}>
      <div className="container mx-auto relative">
        {/* Bouton gauche */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-full shadow-xl hover:scale-110 hover:bg-loot-red hover:text-white transition-all z-10"
          aria-label="Voir les roues précédentes"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar scroll-smooth"
        >
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => onSelect(theme)}
              className={`group min-w-[280px] rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 snap-center transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-2 hover:border-loot-red ${cardClass}`}
              role="button"
              tabIndex={0}
              aria-label={`Ouvrir la roue ${theme.name} - ${theme.price}`}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(theme)}
            >
              {/* Nom de la roulette */}
              <h3 className={`text-lg font-black uppercase tracking-wide transition-colors ${titleClass}`}>
                {t?.[theme.nameKey] || theme.name}
              </h3>

              {/* Roue avec animation hover */}
              <WheelGraphic colors={theme.colors} />

              {/* Prix */}
              <div className={`text-2xl font-black ${priceClass}`}>
                {theme.price}
              </div>

              {/* Valeur max */}
              <div className="text-xs font-bold text-loot-red uppercase tracking-wide">
                Valeur jusqu'à {theme.maxValue}€
              </div>
            </div>
          ))}
        </div>

        {/* Bouton droite */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-loot-red text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform z-10"
          aria-label="Voir plus de roues"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedBoxes;

