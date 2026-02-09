
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Coins, Zap, Percent, Lock, Sparkles, Gift, Crown, Star, Flame, Trophy, Box, Ticket, Pizza, UtensilsCrossed } from 'lucide-react';

interface Props {
  onBack: () => void;
  t: Record<string, string>;
  isDarkMode?: boolean;
}

const BattlePassView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentLevel = 7; // Niveau actuel du joueur
  const currentXP = 38;
  const xpForNextLevel = 55;

  const [quests, setQuests] = useState([
    { id: 1, textKey: 'quest1', xp: 5, done: false },
    { id: 2, textKey: 'quest2', xp: 2, done: true },
    { id: 3, textKey: 'quest3', xp: 2, done: true },
    { id: 4, textKey: 'quest4', xp: 1, done: true },
  ]);

  const toggleQuest = (id: number) => {
    setQuests(quests.map(q => q.id === id ? { ...q, done: !q.done } : q));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Battle Pass complet avec 20 paliers
  const rewards = [
    { level: 1, premium: { icon: <Coins className="w-8 h-8" />, label: "x1", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x1" }, xp: 0 },
    { level: 2, premium: { icon: <Zap className="w-8 h-8" />, label: "+10%", color: "text-blue-400" }, free: { icon: <Star className="w-5 h-5" />, label: "+5 XP" }, xp: 25 },
    { level: 3, premium: { icon: <Coins className="w-8 h-8" />, label: "x2", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x1" }, xp: 55 },
    { level: 4, premium: { icon: <Pizza className="w-8 h-8" />, label: "-5%", color: "text-orange-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x1" }, xp: 90 },
    { level: 5, premium: { icon: <Box className="w-8 h-8" />, label: "Box", color: "text-purple-400" }, free: { icon: <Zap className="w-5 h-5" />, label: "+10 XP" }, xp: 130 },
    { level: 6, premium: { icon: <Coins className="w-8 h-8" />, label: "x3", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x2" }, xp: 175 },
    { level: 7, premium: { icon: <Percent className="w-8 h-8" />, label: "-10%", color: "text-green-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x1" }, xp: 225 },
    { level: 8, premium: { icon: <UtensilsCrossed className="w-8 h-8" />, label: "Plat", color: "text-red-400" }, free: { icon: <Star className="w-5 h-5" />, label: "+15 XP" }, xp: 280 },
    { level: 9, premium: { icon: <Coins className="w-8 h-8" />, label: "x4", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x2" }, xp: 340 },
    { level: 10, premium: { icon: <Gift className="w-8 h-8" />, label: "Box Rare", color: "text-blue-500" }, free: { icon: <Zap className="w-5 h-5" />, label: "XP x2" }, xp: 405 },
    { level: 11, premium: { icon: <Flame className="w-8 h-8" />, label: "Streak x2", color: "text-orange-500" }, free: { icon: <Coins className="w-5 h-5" />, label: "x2" }, xp: 475 },
    { level: 12, premium: { icon: <Coins className="w-8 h-8" />, label: "x5", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x3" }, xp: 550 },
    { level: 13, premium: { icon: <Percent className="w-8 h-8" />, label: "-15%", color: "text-green-500" }, free: { icon: <Star className="w-5 h-5" />, label: "+20 XP" }, xp: 630 },
    { level: 14, premium: { icon: <Ticket className="w-8 h-8" />, label: "Ticket", color: "text-pink-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x2" }, xp: 715 },
    { level: 15, premium: { icon: <Gift className="w-8 h-8" />, label: "Box Épique", color: "text-purple-500" }, free: { icon: <Zap className="w-5 h-5" />, label: "XP x2" }, xp: 805 },
    { level: 16, premium: { icon: <Coins className="w-8 h-8" />, label: "x7", color: "text-yellow-500" }, free: { icon: <Coins className="w-5 h-5" />, label: "x4" }, xp: 900 },
    { level: 17, premium: { icon: <Percent className="w-8 h-8" />, label: "-20%", color: "text-green-400" }, free: { icon: <Star className="w-5 h-5" />, label: "+30 XP" }, xp: 1000 },
    { level: 18, premium: { icon: <Trophy className="w-8 h-8" />, label: "Badge", color: "text-amber-400" }, free: { icon: <Zap className="w-5 h-5" />, label: "XP x3" }, xp: 1105 },
    { level: 19, premium: { icon: <Coins className="w-8 h-8" />, label: "x10", color: "text-yellow-400" }, free: { icon: <Coins className="w-5 h-5" />, label: "x5" }, xp: 1215 },
    { level: 20, premium: { icon: <Crown className="w-10 h-10" />, label: "GOLD BOX", color: "text-yellow-400" }, free: { icon: <Sparkles className="w-6 h-6" />, label: "Box" }, xp: 1330 },
  ];

  // Classes dark mode
  const bgClass = isDarkMode
    ? 'bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900'
    : 'bg-gradient-to-b from-gray-50 via-white to-gray-50';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const textDimClass = isDarkMode ? 'text-gray-500' : 'text-gray-400';
  const cardBgClass = isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white border-gray-200';
  const progressBgClass = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const lockedBgClass = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200';
  const freeBgClass = isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50 border-gray-200';

  return (
    <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${bgClass}`}>
      <div className="container mx-auto px-4 md:px-8 pt-10">

        {/* Battle Pass Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-loot-red to-orange-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-black uppercase text-sm tracking-wide">{t.season || "Saison"} 1</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter ${textClass}`}>
                {t.battlePassTitle || "Pass de Combat"}
              </h1>
              <p className={`mt-2 ${textMutedClass}`}>
                {t.battlePassDesc || "Débloquez des récompenses exclusives en jouant !"}
              </p>
            </div>

            {/* Level Card */}
            <div className={`px-6 py-5 rounded-2xl shadow-xl border-2 ${cardBgClass}`}>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-loot-red to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-black text-white">{currentLevel}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-black px-2 py-1 rounded-full">
                    +{Math.round((currentXP / xpForNextLevel) * 100)}%
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-bold uppercase tracking-wide ${textMutedClass}`}>
                    {t.battlePassTier || "Palier"}
                  </div>
                  <div className={`text-3xl font-black ${textClass}`}>
                    {currentXP}<span className={`text-lg ${textDimClass}`}>/{xpForNextLevel}</span>
                    <span className="text-loot-red text-lg ml-1">XP</span>
                  </div>
                  <div className={`text-xs ${textDimClass}`}>
                    {xpForNextLevel - currentXP} XP {t.toNextLevel || "pour le prochain niveau"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Global */}
          <div className="relative">
            <div className={`w-full h-5 ${progressBgClass} rounded-full overflow-hidden shadow-inner`}>
              <div
                className="h-full bg-gradient-to-r from-loot-red via-red-500 to-orange-500 shadow-[0_0_20px_rgba(211,47,47,0.6)] relative transition-all duration-1000"
                style={{ width: `${(currentLevel / 20) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>
                <div className="absolute inset-0 animate-pulse bg-white/10"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-xs font-bold ${textDimClass}`}>Lv.1</span>
              <span className={`text-xs font-bold ${textMutedClass}`}>{currentLevel}/20 {t.levels || "niveaux"}</span>
              <span className={`text-xs font-bold ${textDimClass}`}>Lv.20</span>
            </div>
          </div>
        </div>

        {/* Rewards Track */}
        <div className="relative mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl md:text-3xl font-black italic uppercase tracking-tighter ${textClass}`}>
              {t.rewards || "Récompenses"}
            </h2>
            <div className={`flex items-center gap-4 text-sm ${textMutedClass}`}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-loot-red to-orange-500"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <span>Free</span>
              </div>
            </div>
          </div>

          {/* Navigation gauche */}
          <button
            onClick={() => scroll('left')}
            className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-xl transition-all hover:scale-110 ${isDarkMode
                ? 'bg-gray-800 text-white border border-gray-700 hover:bg-loot-red hover:border-loot-red'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-loot-red hover:text-white hover:border-loot-red'
              }`}
            aria-label={t.previousRewards || "Récompenses précédentes"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth px-1"
          >
            {rewards.map((reward, i) => {
              const isUnlocked = reward.level <= currentLevel;
              const isCurrent = reward.level === currentLevel;

              return (
                <div
                  key={i}
                  className={`min-w-[160px] md:min-w-[180px] flex flex-col gap-2 snap-start transition-transform ${isCurrent ? 'scale-105' : ''
                    }`}
                >
                  {/* Premium Track */}
                  <div className={`relative h-36 md:h-40 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 overflow-hidden transition-all ${isUnlocked
                      ? 'bg-gradient-to-br from-loot-red via-red-600 to-orange-500 border-orange-400/50'
                      : lockedBgClass
                    } ${isCurrent ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}>

                    {/* Overlay brillant */}
                    {isUnlocked && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20"></div>
                    )}

                    {/* Badge niveau */}
                    <div className={`absolute top-2 right-2 text-xs font-black px-2 py-1 rounded-lg ${isUnlocked
                        ? 'bg-white/20 text-white'
                        : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                      }`}>
                      Lv.{reward.level}
                    </div>

                    {/* Status icon */}
                    <div className="absolute top-2 left-2">
                      {isUnlocked ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 drop-shadow-lg" />
                      ) : (
                        <Lock className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`relative z-10 ${isUnlocked ? 'text-white' : reward.premium.color} ${!isUnlocked ? 'opacity-40' : ''}`}>
                      {reward.premium.icon}
                    </div>

                    {/* Label */}
                    <span className={`font-black text-lg mt-2 italic relative z-10 ${isUnlocked ? 'text-white' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                      {reward.premium.label}
                    </span>

                    {/* Premium badge */}
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-t-lg uppercase tracking-wide">
                      Premium
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="h-6 flex items-center justify-center relative">
                    <div className={`w-full h-[3px] ${isUnlocked ? 'bg-loot-red' : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`absolute w-5 h-5 rounded-full border-3 flex items-center justify-center shadow ${isUnlocked
                        ? 'border-loot-red bg-loot-red'
                        : isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'
                      }`}>
                      {isUnlocked && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </div>

                  {/* Free Track */}
                  <div className={`h-24 md:h-28 rounded-2xl flex flex-col items-center justify-center border-2 shadow-inner ${isUnlocked
                      ? isDarkMode ? 'bg-green-900/30 border-green-700/50' : 'bg-green-50 border-green-200'
                      : freeBgClass
                    }`}>
                    <div className={`${isUnlocked ? 'text-green-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${!isUnlocked ? 'opacity-50' : ''}`}>
                      {reward.free.icon}
                    </div>
                    <span className={`font-bold text-sm mt-1 ${isUnlocked
                        ? isDarkMode ? 'text-green-400' : 'text-green-600'
                        : textDimClass
                      }`}>
                      {reward.free.label}
                    </span>
                    <span className={`text-[10px] mt-0.5 uppercase font-bold ${textDimClass}`}>Free</span>
                  </div>

                  {/* XP required */}
                  <div className="text-center">
                    <span className={`text-[10px] font-bold uppercase ${textDimClass}`}>
                      {reward.xp} <span className="text-loot-red">XP</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation droite */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 bg-loot-red text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform"
            aria-label={t.nextRewards || "Récompenses suivantes"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Daily Quests Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl md:text-3xl font-black italic uppercase tracking-tighter ${textClass}`}>
              {t.battlePassDailyQuests || "Quêtes quotidiennes"}
            </h2>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${isDarkMode ? 'bg-green-900/50 text-green-400 border border-green-700/50' : 'bg-green-100 text-green-700'
              }`}>
              {quests.filter(q => q.done).length}/{quests.length} {t.completed || "terminées"}
            </div>
          </div>

          <div className="space-y-3">
            {quests.map((quest) => (
              <div
                key={quest.id}
                onClick={() => toggleQuest(quest.id)}
                className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${quest.done
                    ? isDarkMode
                      ? 'bg-green-900/20 border-green-700/50 hover:border-green-600'
                      : 'bg-green-50 border-green-200 hover:border-green-300'
                    : isDarkMode
                      ? 'bg-gray-800/80 border-gray-700 hover:border-loot-red/50 hover:bg-gray-800'
                      : 'bg-white border-gray-200 hover:border-loot-red/40'
                  }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${quest.done
                      ? 'bg-green-500 border-green-500'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700 group-hover:border-loot-red group-hover:bg-gray-700'
                        : 'border-gray-300 bg-white group-hover:border-loot-red'
                    }`}>
                    {quest.done && <CheckCircle2 className="text-white w-6 h-6" />}
                  </div>
                  <span className={`font-bold text-base md:text-lg ${quest.done
                      ? isDarkMode ? 'text-green-400 line-through' : 'text-green-700 line-through'
                      : textClass
                    }`}>
                    {t[quest.textKey] || quest.textKey}
                  </span>
                </div>

                <div className={`font-black text-lg md:text-xl flex items-center gap-2 ${quest.done ? 'text-green-500' : 'text-loot-red'
                  }`}>
                  +{quest.xp} <span className="text-xs uppercase font-bold">XP</span>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Bonus */}
          <div className={`mt-6 p-5 rounded-2xl border-2 border-dashed ${isDarkMode
              ? 'border-yellow-600/50 bg-yellow-900/10'
              : 'border-yellow-400 bg-yellow-50'
            }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className={`font-black text-lg ${textClass}`}>{t.dailyBonus || "Bonus du jour"}</div>
                  <div className={`text-sm ${textMutedClass}`}>{t.completeAll || "Terminez toutes les quêtes"}</div>
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-black text-yellow-500">+50 XP</div>
            </div>
          </div>

          {/* Premium Upgrade CTA */}
          <div className={`mt-8 p-6 rounded-2xl bg-gradient-to-r from-loot-red to-orange-500 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Crown className="w-12 h-12 text-yellow-400" />
                <div>
                  <div className="font-black text-xl uppercase">{t.upgradePremium || "Passez Premium"}</div>
                  <div className="text-white/80 text-sm">{t.unlockAll || "Débloquez toutes les récompenses exclusives !"}</div>
                </div>
              </div>
              <button className="bg-white text-loot-red font-black px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                {t.upgrade || "UPGRADE"} - 9.99€
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BattlePassView;
