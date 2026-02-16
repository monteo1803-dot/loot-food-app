
import React from 'react';
import { ArrowRight, Truck } from 'lucide-react';
import WheelGraphic from './WheelGraphic';

interface Props {
  t: Record<string, string>;
}

const HowItWorks: React.FC<Props> = ({ t }) => {
  return (
    <section className="bg-loot-red text-white py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10">
        
        <div className="flex items-center gap-12 scale-110 md:scale-125">
          <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm border-2 border-white/10">
            <WheelGraphic colors={['#D32F2F', '#880E4F', '#B71C1C', '#C2185B']} />
          </div>
          <ArrowRight className="w-12 h-12 md:w-16 md:h-16 text-white/40 animate-pulse" strokeWidth={3} />
          <div className="bg-white/90 p-8 md:p-10 rounded-[40px] shadow-2xl transform hover:rotate-3 transition-transform">
            <Truck className="w-20 h-20 md:w-24 md:h-24 text-loot-red" strokeWidth={1.5} />
          </div>
        </div>

        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight italic uppercase tracking-tighter">
            {t.howItWorksTitle}
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-6 font-medium italic">
            {t.howItWorksDesc}
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <p className="text-white font-black uppercase tracking-wider text-xs italic">
              {t.howItWorksFooter}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
