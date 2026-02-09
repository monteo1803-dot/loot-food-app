
import React from 'react';
import { Trophy, Coins, Zap } from 'lucide-react';

interface Props {
  onBattlePassClick?: () => void;
  t: any;
}

const Rewards: React.FC<Props> = ({ onBattlePassClick, t }) => {
  return (
    <section className="bg-loot-red text-white py-24 px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
          <div className="bg-white/10 aspect-square rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors">
            <Coins className="w-16 h-16 mb-4 text-yellow-400" />
            <span className="font-black text-2xl tracking-tighter">x2 COINS</span>
          </div>
          <div className="bg-white/10 aspect-square rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors">
            <Trophy className="w-16 h-16 mb-4 text-orange-400" />
            <span className="font-black text-2xl tracking-tighter">ELITE RANK</span>
          </div>
          <div className="bg-white/10 aspect-square rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors">
            <div className="w-16 h-16 bg-white/20 rounded-xl mb-4" />
            <span className="font-black text-2xl tracking-tighter opacity-20">???</span>
          </div>
          <div className="bg-white/10 aspect-square rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white/20 hover:bg-white/20 transition-colors relative overflow-hidden">
            <Zap className="w-16 h-16 mb-4 text-white" />
            <span className="font-black text-2xl tracking-tighter uppercase italic">XP x2</span>
            <div className="absolute top-0 right-0 bg-yellow-400 text-loot-red font-black px-4 py-1 rotate-45 translate-x-3 -translate-y-1 text-xs uppercase">Rare</div>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="text-5xl font-black mb-8 leading-tight">
            {t.rewardsTitle}
          </h2>
          <p className="text-white/90 text-xl leading-relaxed mb-8">
            {t.rewardsDesc}
          </p>

          <button
            onClick={onBattlePassClick}
            className="inline-block bg-white text-loot-red px-10 py-4 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-transform cursor-pointer"
          >
            {t.rewardsBtn}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Rewards;
