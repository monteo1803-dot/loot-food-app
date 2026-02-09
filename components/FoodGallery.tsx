
import React from 'react';

interface Props {
  t: any;
  isDarkMode?: boolean;
}

const FoodGallery: React.FC<Props> = ({ t, isDarkMode = false }) => {
  return (
    <section className={`py-24 px-4 md:px-8 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="order-2 lg:order-1 animate-in slide-in-from-left-8 duration-700">
          <h2 className={`text-6xl font-black mb-8 leading-[0.9] italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            {t.galleryTitle.split(' ').map((word: string, i: number) => (
              <span key={i} className={i > 1 ? 'text-loot-red block' : ''}>{word} </span>
            ))}
          </h2>
          <p className={`text-xl leading-relaxed font-bold italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            {t.galleryDesc}
          </p>

          <div className="mt-10 flex gap-4">
            <div className="h-1 w-20 bg-loot-red rounded-full"></div>
            <div className={`h-1 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
            <div className={`h-1 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 order-1 lg:order-2">
          <div className={`row-span-2 overflow-hidden rounded-[40px] shadow-2xl border-8 ${isDarkMode ? 'border-gray-800' : 'border-gray-50'
            }`}>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
              alt="Steak Frites"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className={`overflow-hidden rounded-[40px] shadow-2xl border-8 h-64 ${isDarkMode ? 'border-gray-800' : 'border-gray-50'
            }`}>
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800"
              alt="Pizza"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className={`overflow-hidden rounded-[40px] shadow-2xl border-8 h-64 ${isDarkMode ? 'border-gray-800' : 'border-gray-50'
            }`}>
            <img
              src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
              alt="Taco"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FoodGallery;
