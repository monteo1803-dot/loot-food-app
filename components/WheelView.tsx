
import React, { useState } from 'react';
import { ArrowLeft, Gift, Sparkles, Crown, Gem, Zap, Package, ShoppingCart, RotateCcw, Star } from 'lucide-react';
import ConfettiEffect from './ConfettiEffect';

interface Props {
  box: any;
  onBack: () => void;
  onConfirm: (item: any) => void;
  t?: any;
  isDarkMode?: boolean;
}

// Données des plats par thème avec raretés - Prix ajustés pour marges garanties
// Règle: Plats communs/rares < prix roue, 1 plat légendaire "jackpot" légèrement supérieur
const themesDishesData: Record<string, any[]> = {
  fastfood: [
    // Roue à 12,95€ - Plats communs 6-10€, Jackpot 18€
    { name: "Burger XXL", restaurant: "Big Burger", price: 10, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", rarity: "common" },
    { name: "Hot-Dog New York", restaurant: "NYC Corner", price: 7, image: "https://images.unsplash.com/photo-1612392062631-94f7d3f38165?w=300", rarity: "common" },
    { name: "Frites Maison", restaurant: "Fry Factory", price: 6, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300", rarity: "common" },
    { name: "Nuggets Poulet", restaurant: "Chicken House", price: 8, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300", rarity: "common" },
    { name: "Milkshake Oreo", restaurant: "Shake & Co", price: 9, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300", rarity: "rare" },
    { name: "Wagyu Smash Burger", restaurant: "Premium Grill", price: 18, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300", rarity: "legendary" },
  ],
  asian: [
    // Roue à 15,95€ - Plats communs 10-14€, Jackpot 22€
    { name: "Sushi Mix", restaurant: "Tokyo Express", price: 13, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300", rarity: "rare" },
    { name: "Ramen Tonkotsu", restaurant: "Ramen Ya", price: 12, image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300", rarity: "common" },
    { name: "Pad Thai", restaurant: "Bangkok Street", price: 11, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300", rarity: "common" },
    { name: "Dim Sum", restaurant: "Canton Palace", price: 14, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300", rarity: "rare" },
    { name: "Bibimbap", restaurant: "Seoul Kitchen", price: 10, image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300", rarity: "common" },
    { name: "Omakase Premium", restaurant: "Sushi Elite", price: 22, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300", rarity: "legendary" },
  ],
  italian: [
    // Roue à 14,95€ - Plats communs 8-13€, Jackpot 20€
    { name: "Pizza Margherita", restaurant: "Napoli Express", price: 10, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300", rarity: "common" },
    { name: "Pasta Carbonara", restaurant: "Roma Trattoria", price: 11, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300", rarity: "common" },
    { name: "Risotto Funghi", restaurant: "Milano Gusto", price: 13, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300", rarity: "rare" },
    { name: "Tiramisu", restaurant: "Dolce Vita", price: 8, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300", rarity: "common" },
    { name: "Lasagne Bolognese", restaurant: "Nonna's", price: 12, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300", rarity: "rare" },
    { name: "Truffle Risotto", restaurant: "Gourmet Italia", price: 20, image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c1?w=300", rarity: "legendary" },
  ],
  french: [
    // Roue à 17,95€ - Plats communs 8-15€, Jackpot 25€
    { name: "Croissant Beurre", restaurant: "Boulangerie Parisienne", price: 8, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300", rarity: "common" },
    { name: "Boeuf Bourguignon", restaurant: "Bistrot Lyon", price: 15, image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=300", rarity: "epic" },
    { name: "Quiche Lorraine", restaurant: "Café de Flore", price: 10, image: "https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=300", rarity: "common" },
    { name: "Crêpe Nutella", restaurant: "Crêperie Bretonne", price: 9, image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=300", rarity: "common" },
    { name: "Confit de Canard", restaurant: "Le Gascon", price: 14, image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300", rarity: "epic" },
    { name: "Homard Thermidor", restaurant: "L'Écailler Royal", price: 25, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300", rarity: "legendary" },
  ],
  random: [
    // Roue à 13,95€ - Plats communs 8-12€, Jackpot 20€
    { name: "Burger Gourmet", restaurant: "Mix & Match", price: 11, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", rarity: "rare" },
    { name: "Sushi Surprise", restaurant: "Fusion Lab", price: 12, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300", rarity: "rare" },
    { name: "Pizza Mystery", restaurant: "Random Kitchen", price: 10, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300", rarity: "common" },
    { name: "Tacos Supreme", restaurant: "Mexico Lindo", price: 9, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300", rarity: "common" },
    { name: "Curry Massaman", restaurant: "Thai Fusion", price: 8, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300", rarity: "common" },
    { name: "Chef's Special", restaurant: "Exclusive Dining", price: 20, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300", rarity: "legendary" },
  ],
};

const getRarityConfig = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return {
        gradient: 'from-yellow-400 via-amber-500 to-orange-500',
        bgGradient: 'from-yellow-500/20 to-amber-500/20',
        color: '#FFB800',
        label: '⭐ LÉGENDAIRE',
        xp: 500,
        icon: <Crown className="w-5 h-5" />,
        glow: 'shadow-[0_0_40px_rgba(255,184,0,0.5)]'
      };
    case 'epic':
      return {
        gradient: 'from-purple-500 via-violet-500 to-indigo-500',
        bgGradient: 'from-purple-500/20 to-indigo-500/20',
        color: '#9B59B6',
        label: '💎 ÉPIQUE',
        xp: 200,
        icon: <Gem className="w-5 h-5" />,
        glow: 'shadow-[0_0_40px_rgba(155,89,182,0.5)]'
      };
    case 'rare':
      return {
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        bgGradient: 'from-blue-500/20 to-cyan-500/20',
        color: '#3498DB',
        label: '💙 RARE',
        xp: 100,
        icon: <Zap className="w-5 h-5" />,
        glow: 'shadow-[0_0_40px_rgba(52,152,219,0.5)]'
      };
    default:
      return {
        gradient: 'from-gray-400 via-slate-400 to-zinc-400',
        bgGradient: 'from-gray-400/20 to-slate-400/20',
        color: '#7F8C8D',
        label: '📦 COMMUN',
        xp: 50,
        icon: <Package className="w-5 h-5" />,
        glow: ''
      };
  }
};

const WheelView: React.FC<Props> = ({ box, onBack, onConfirm, t, isDarkMode = false }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wonDish, setWonDish] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const themeId = box?.id || 'random';
  const dishes = themesDishesData[themeId] || themesDishesData.random;
  const numSegments = dishes.length;
  const segmentAngle = 360 / numSegments;
  const themeColors = box?.colors || ['#D32F2F', '#FF5722', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0'];

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowResult(false);

    const randomValue = Math.random();
    let winningIndex: number;

    const legendaryDishes = dishes.filter((d) => d.rarity === 'legendary').map((d) => dishes.indexOf(d));
    const epicDishes = dishes.filter((d) => d.rarity === 'epic').map((d) => dishes.indexOf(d));
    const rareDishes = dishes.filter((d) => d.rarity === 'rare').map((d) => dishes.indexOf(d));
    const commonDishes = dishes.filter((d) => d.rarity === 'common').map((d) => dishes.indexOf(d));

    if (randomValue < 0.05 && legendaryDishes.length > 0) {
      winningIndex = legendaryDishes[Math.floor(Math.random() * legendaryDishes.length)];
    } else if (randomValue < 0.15 && epicDishes.length > 0) {
      winningIndex = epicDishes[Math.floor(Math.random() * epicDishes.length)];
    } else if (randomValue < 0.40 && rareDishes.length > 0) {
      winningIndex = rareDishes[Math.floor(Math.random() * rareDishes.length)];
    } else if (commonDishes.length > 0) {
      winningIndex = commonDishes[Math.floor(Math.random() * commonDishes.length)];
    } else {
      winningIndex = Math.floor(Math.random() * dishes.length);
    }

    const dish = dishes[winningIndex];
    const targetSegmentCenter = winningIndex * segmentAngle + segmentAngle / 2;
    const angleToStop = 360 - targetSegmentCenter;
    const fullSpins = 5 + Math.floor(Math.random() * 4);
    const finalRotation = rotation + fullSpins * 360 + angleToStop - (rotation % 360);

    setRotation(finalRotation);
    setWonDish(dish);

    setTimeout(() => {
      setIsSpinning(false);
      setShowResult(true);
      if (dish.rarity !== 'common') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 4000);
  };

  const handleAddToCart = () => {
    onConfirm(wonDish);
    setShowResult(false);
  };

  const handleSpinAgain = () => {
    setShowResult(false);
    setWonDish(null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center relative overflow-hidden ${isDarkMode
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'
      : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
      }`}>
      <ConfettiEffect isActive={showConfetti} />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-loot-red/20' : 'bg-loot-red/10'
          }`} />
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-500/10'
          }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/5'
          }`} />
      </div>

      {/* Premium Header */}
      <div className={`w-full backdrop-blur-xl border-b sticky top-0 z-30 ${isDarkMode
        ? 'bg-gray-900/70 border-white/10'
        : 'bg-white/70 border-gray-200'
        }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className={`p-3 rounded-2xl transition-all hover:scale-105 ${isDarkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              {t?.[box?.nameKey] || box?.name || 'ROULETTE'}
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t?.spinToDiscover || "Tournez pour découvrir votre plat"}
            </p>
          </div>

          <div className={`px-4 py-2 rounded-2xl font-black text-lg ${isDarkMode ? 'bg-loot-red/20 text-loot-red' : 'bg-loot-red/10 text-loot-red'
            }`}>
            {box?.price || '9,95€'}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 mt-8 mb-6">
        <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200 shadow-lg'
          }`}>
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {dishes.length} plats
          </span>
        </div>
        <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200 shadow-lg'
          }`}>
          <Star className="w-5 h-5 text-yellow-400" />
          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            +50 à +500 XP
          </span>
        </div>
      </div>

      {/* Main Wheel Section */}
      <div className="relative flex-1 flex items-center justify-center py-8">
        {/* Wheel Container with Glass Effect */}
        <div className={`relative p-8 rounded-[3rem] ${isDarkMode
          ? 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20'
          : 'bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-200'
          }`}>
          {/* Pointer */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: 0,
              height: 0,
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderTop: '32px solid #D32F2F',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'
            }}
          />

          {/* Wheel */}
          <div
            className="w-72 h-72 md:w-80 md:h-80 rounded-full relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '4000ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)',
              boxShadow: isSpinning
                ? '0 0 100px rgba(211, 47, 47, 0.6), inset 0 0 60px rgba(255,255,255,0.1)'
                : '0 0 50px rgba(211, 47, 47, 0.3), inset 0 0 30px rgba(255,255,255,0.05)'
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {/* Outer decorative ring */}
              <circle cx="50" cy="50" r="49" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} strokeWidth="0.5" />

              {dishes.map((dish, i) => {
                const startAngle = i * segmentAngle - 90;
                const endAngle = startAngle + segmentAngle;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 50 + 48 * Math.cos(startRad);
                const y1 = 50 + 48 * Math.sin(startRad);
                const x2 = 50 + 48 * Math.cos(endRad);
                const y2 = 50 + 48 * Math.sin(endRad);

                const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                const segmentColor = themeColors[i % themeColors.length];

                const textAngle = startAngle + segmentAngle / 2;
                const textRad = (textAngle * Math.PI) / 180;
                const textX = 50 + 32 * Math.cos(textRad);
                const textY = 50 + 32 * Math.sin(textRad);

                return (
                  <g key={i}>
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={segmentColor} />
                        <stop offset="100%" stopColor={segmentColor} stopOpacity="0.7" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={`url(#grad-${i})`}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="#fff"
                      fontSize="3.2"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                    >
                      {dish.name.length > 10 ? dish.name.slice(0, 10) + '..' : dish.name}
                    </text>
                  </g>
                );
              })}

              {/* Center hub */}
              <circle cx="50" cy="50" r="12" fill={isDarkMode ? '#1f2937' : '#fff'} stroke="#D32F2F" strokeWidth="3" />
              <circle cx="50" cy="50" r="6" fill="#D32F2F" />
              <circle cx="50" cy="50" r="2" fill="#fff" />
            </svg>
          </div>

          {/* Spinning glow effect */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-[3rem] animate-pulse pointer-events-none"
              style={{ boxShadow: '0 0 80px 20px rgba(211, 47, 47, 0.3)' }}
            />
          )}
        </div>
      </div>

      {/* Spin Button */}
      {!showResult && (
        <div className="pb-12">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`group relative px-16 py-5 rounded-2xl font-black uppercase tracking-wide text-xl transition-all transform ${isSpinning
              ? 'bg-gray-400 cursor-not-allowed scale-95 text-gray-600'
              : 'bg-gradient-to-r from-loot-red via-red-600 to-loot-red text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(211,47,47,0.5)] active:scale-100'
              }`}
          >
            <span className="relative z-10">
              {isSpinning ? (t?.spinning || '🎰 En cours...') : (t?.spinBtn || '🎰 Tourner !')}
            </span>
            {!isSpinning && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      )}

      {/* Result Modal */}
      {showResult && wonDish && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className={`max-w-md w-full rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'
            } ${getRarityConfig(wonDish.rarity).glow}`}>

            {/* Rarity Header */}
            <div className={`bg-gradient-to-r ${getRarityConfig(wonDish.rarity).gradient} px-6 py-4`}>
              <div className="flex items-center justify-center gap-3 text-white font-black text-lg">
                {getRarityConfig(wonDish.rarity).icon}
                {getRarityConfig(wonDish.rarity).label}
              </div>
            </div>

            <div className="p-8">
              {/* Dish Image */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${getRarityConfig(wonDish.rarity).bgGradient} rounded-2xl blur-xl`} />
                <img
                  src={wonDish.image}
                  alt={wonDish.name}
                  className="relative w-52 h-52 object-cover rounded-2xl mx-auto shadow-2xl"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-5 py-1.5 rounded-full font-black text-sm shadow-lg">
                  +{getRarityConfig(wonDish.rarity).xp} XP
                </div>
              </div>

              {/* Dish Info */}
              <h3 className={`text-2xl font-black mb-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {wonDish.name}
              </h3>
              <p className={`text-center mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {wonDish.restaurant}
              </p>
              <p className="text-3xl font-black text-loot-red text-center mb-8">
                {wonDish.price}€
              </p>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleSpinAgain}
                  className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                  <RotateCcw className="w-5 h-5" />
                  {t?.spinAgain || "Rejouer"}
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-loot-red to-red-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t?.addToCart || "Commander"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelView;
