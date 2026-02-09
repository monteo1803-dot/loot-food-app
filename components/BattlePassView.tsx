
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Coins, Zap, Percent, Lock } from 'lucide-react';

interface Props {
  onBack: () => void;
  t: any;
}

const BattlePassView: React.FC<Props> = ({ onBack, t }) => {
  const [quests, setQuests] = useState([
    { id: 1, textKey: 'quest1', xp: 5, done: false },
    { id: 2, textKey: 'quest2', xp: 2, done: true },
    { id: 3, textKey: 'quest3', xp: 2, done: true },
    { id: 4, textKey: 'quest4', xp: 1, done: true },
  ]);

  const toggleQuest = (id: number) => {
    setQuests(quests.map(q => q.id === id ? { ...q, done: !q.done } : q));
  };

  const rewards = [
    { level: 4, premium: { icon: <Coins className="text-yellow-400 w-8 h-8" />, label: "x2" }, free: { icon: <Coins className="text-yellow-600 w-5 h-5" />, label: "x1" }, xp: 75 },
    { level: 8, premium: { icon: <Percent className="text-white w-8 h-8" />, label: "-10%" }, free: { icon: <Coins className="text-yellow-600 w-5 h-5" />, label: "x1" }, xp: 210 },
    { level: 12, premium: { icon: <Zap className="text-white w-8 h-8" />, label: "XP x2" }, free: { icon: <Coins className="text-yellow-600 w-5 h-5" />, label: "x1" }, xp: 390 },
    { level: 16, premium: { icon: <Coins className="text-yellow-400 w-8 h-8" />, label: "x2" }, free: { icon: <Zap className="text-white w-5 h-5" />, label: "XP x2" }, xp: 615 },
    { level: 20, premium: { icon: <div className="w-10 h-10 rounded-full border-4 border-white/20" />, label: "" }, free: { icon: <Lock className="text-gray-400 w-5 h-5" />, label: "" }, xp: 900 },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 md:px-8 pt-10">

        {/* Battle Pass Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">{t.battlePassTitle}</h1>
            <div className="bg-loot-red text-white px-6 py-2 rounded-xl font-black italic text-sm shadow-lg flex items-center gap-3">
              {t.battlePassTier} 3 : 38/55 <span className="text-[10px] bg-white text-loot-red px-1 rounded">XP</span>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-loot-red shadow-[0_0_10px_rgba(211,47,47,0.5)]"></div>
          </div>
        </div>

        {/* Rewards Slider */}
        <div className="relative group mb-20">
          <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar snap-x">
            {rewards.map((reward, i) => (
              <div key={i} className="min-w-[200px] flex flex-col gap-2 snap-start">
                {/* Premium Track */}
                <div className="bg-loot-red h-40 rounded-2xl flex flex-col items-center justify-center relative shadow-xl border-4 border-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                  {reward.premium.icon}
                  <span className="text-white font-black text-xl mt-2 italic">{reward.premium.label}</span>
                  <div className="absolute top-2 right-2 text-[10px] font-black text-white/40">{reward.level}</div>
                </div>

                {/* Divider with circle */}
                <div className="h-6 flex items-center justify-center relative">
                  <div className="w-full h-[2px] bg-gray-200"></div>
                  <div className="absolute w-4 h-4 rounded-full border-2 border-gray-200 bg-white"></div>
                </div>

                {/* Free Track */}
                <div className="bg-gray-50 h-28 rounded-2xl flex flex-col items-center justify-center border-2 border-gray-100 shadow-inner">
                  {reward.free.icon}
                  <span className="text-gray-400 font-black text-sm mt-1 italic">{reward.free.label}</span>
                </div>

                <div className="text-center mt-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase italic">{t.battlePassTier} {reward.level} : {reward.xp} <span className="text-loot-red">XP</span></span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 bg-loot-red text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-loot-red text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight />
          </button>
        </div>

        {/* Daily Quests Section */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">{t.battlePassDailyQuests}</h2>

          <div className="space-y-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                onClick={() => toggleQuest(quest.id)}
                className={`
                    group flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer
                    ${quest.done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-loot-red/30'}
                  `}
              >
                <div className="flex items-center gap-6">
                  <div className={`
                      w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors
                      ${quest.done ? 'bg-green-500 border-green-500' : 'border-gray-200 bg-white group-hover:border-loot-red'}
                    `}>
                    {quest.done && <CheckCircle2 className="text-white w-6 h-6" />}
                  </div>
                  <span className={`font-bold italic ${quest.done ? 'text-green-700' : 'text-gray-800'}`}>
                    {t[quest.textKey]}
                  </span>
                </div>

                <div className={`font-black italic flex items-center gap-1 ${quest.done ? 'text-green-500' : 'text-loot-red'}`}>
                  {quest.xp} <span className="text-[10px] uppercase font-bold">XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BattlePassView;
