
import React, { useState } from 'react';
import { Send, MapPin } from 'lucide-react';

interface Props {
  t: any;
  onGoClick?: (address: string) => void;
}

const Hero: React.FC<Props> = ({ t, onGoClick }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGoClick) {
      onGoClick(address);
    }
  };

  return (
    <section className="relative h-[700px] flex items-center overflow-hidden">
      {/* Background Image: Person eating a burger */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1600")' }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        {/* Gaming Noise Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-2xl animate-in slide-in-from-left duration-1000">
          <div className="inline-block bg-loot-red text-white px-4 py-1 rounded-lg font-black italic text-sm uppercase mb-4 shadow-[0_0_15px_rgba(211,47,47,0.5)] animate-bounce">
            Loot your food now!
          </div>
          <h1 className="text-white text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter italic uppercase">
            {t.heroTitle.split(' ').map((word: string, i: number) => (
              <span key={i} className={i % 2 !== 0 ? 'text-loot-red' : ''}>{word} </span>
            ))}
          </h1>

          <form
            className="flex bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl max-w-xl group border-4 border-white/20 transition-all hover:border-loot-red/50"
            onSubmit={handleSubmit}
            role="search"
            aria-label="Rechercher une adresse de livraison"
          >
            <label htmlFor="address-input" className="sr-only">Adresse de livraison</label>
            <div className="flex items-center px-4">
              <MapPin className="w-5 h-5 text-loot-red" aria-hidden="true" />
            </div>
            <input
              id="address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t.addressPlaceholder}
              className="flex-grow px-2 py-4 rounded-xl outline-none text-lg font-bold italic"
              autoComplete="street-address"
            />
            <button
              type="submit"
              className="bg-loot-red text-white px-8 py-4 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center font-black uppercase italic tracking-widest group-hover:shadow-[0_0_30px_rgba(211,47,47,0.6)]"
              aria-label="Commander maintenant"
            >
              <Send className="w-6 h-6 mr-2" aria-hidden="true" /> GO
            </button>
          </form>

          <div className="flex gap-4 mt-10 items-center">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 20}`}
                  className="w-12 h-12 rounded-full border-4 border-white shadow-xl"
                  alt="User"
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                />
              ))}
            </div>
            <p className="text-white/90 font-black italic text-sm uppercase tracking-wider">
              <span className="text-loot-red text-lg">+2.5k</span> gamers eating right now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
