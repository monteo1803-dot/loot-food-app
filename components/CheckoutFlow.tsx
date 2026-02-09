
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, MapPin, Calendar, Truck, Edit2, Gift, MessageSquare, CreditCard, ChevronDown, CheckCircle2, Play, Navigation, Timer } from 'lucide-react';

interface Props {
  cart: any[];
  onBack: () => void;
}

type Step = 'cart' | 'delivery' | 'order' | 'confirm' | 'tracking';
type DeliveryStatus = 1 | 2 | 3 | 4;

const CheckoutFlow: React.FC<Props> = ({ cart, onBack }) => {
  const [step, setStep] = useState<Step>('cart');
  const [showRecap, setShowRecap] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>(1);

  const steps = [
    { id: 'cart', label: 'Panier' },
    { id: 'delivery', label: 'Livraison' },
    { id: 'order', label: 'Commande' },
    { id: 'confirm', label: 'Confirmer' }
  ];

  const subTotal = cart.reduce((acc, item) => acc + (item.price || 12.95), 0);
  const deliveryFee = 6.50;
  const total = subTotal + deliveryFee;

  const renderStepHeader = () => (
    <div className="bg-loot-red w-full sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <button onClick={step === 'tracking' ? onBack : () => setStep('cart')} className="text-white hover:opacity-80 p-2">
          {step === 'cart' || step === 'tracking' ? <X className="w-8 h-8" /> : <ChevronLeft className="w-8 h-8" />}
        </button>

        <div className="flex-grow flex items-center justify-center">
          {step !== 'tracking' ? (
            steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className={`
                  px-4 py-1.5 flex items-center justify-center font-black text-[10px] md:text-xs uppercase italic transition-all
                  ${step === s.id ? 'bg-white text-loot-red rounded-lg scale-110 shadow-lg' : 'text-white/40'}
                `}>
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-4 md:w-10 h-[2px] bg-white/20 mx-2"></div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="text-white font-black italic uppercase tracking-[0.2em] flex items-center gap-3 text-lg animate-pulse">
              <Timer className="w-6 h-6" /> Suivi de commande
            </div>
          )}
        </div>
        <div className="w-8"></div>
      </div>
    </div>
  );

  const nextStatus = () => setDeliveryStatus(prev => (prev < 4 ? prev + 1 : 4) as DeliveryStatus);
  const prevStatus = () => setDeliveryStatus(prev => (prev > 1 ? prev - 1 : 1) as DeliveryStatus);

  const TrackingStep = () => {
    const isDelivered = deliveryStatus === 4;

    return (
      <div className="flex flex-col items-center py-12 px-4 bg-gray-50 min-h-screen">

        {/* Sim Controls */}
        <div className="fixed bottom-10 right-10 flex gap-3 z-[100]">
          <button onClick={prevStatus} className="bg-white p-4 rounded-full shadow-2xl border-4 border-loot-red/10 hover:bg-loot-red hover:text-white transition-all transform hover:scale-110"><ChevronLeft /></button>
          <button onClick={nextStatus} className="bg-white p-4 rounded-full shadow-2xl border-4 border-loot-red/10 hover:bg-loot-red hover:text-white transition-all transform hover:scale-110"><Navigation className="rotate-90" /></button>
        </div>

        {!isDelivered ? (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* LEFT COLUMN: Summary (Panels 1 & 2 Style) */}
            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 animate-in slide-in-from-left duration-700">
              <h3 className="font-black text-3xl italic uppercase mb-12 tracking-tighter border-b-4 border-loot-red inline-block">Votre commande</h3>

              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-56 h-56 bg-gray-50 rounded-[50px] p-8 border-4 border-loot-red shadow-inner flex items-center justify-center transform hover:rotate-3 transition-transform">
                  <img
                    src={cart[0]?.img || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400"}
                    className="w-full h-full object-contain"
                    alt="Ordered Item"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-4 flex-grow text-center md:text-left">
                  <h4 className="font-black text-2xl italic">{cart[0]?.name || "Burger King - Maxi Menu"}</h4>
                  <p className="text-sm font-bold text-gray-400 italic leading-relaxed">1 Steakhouse, 1 grande frite, Un Coca...</p>
                  <p className="text-loot-red font-black text-xs uppercase tracking-widest bg-loot-red/5 p-2 rounded-lg inline-block">Sauce : Mayo et Ketchup</p>
                  <div className="text-gray-900 font-black text-4xl pt-4 tracking-tighter">{(cart[0]?.price || 12.95).toFixed(2).replace('.', ',')}€</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Real-time status (Panels 1, 2, 3 Style) */}
            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-gray-100 min-h-[600px] flex flex-col animate-in slide-in-from-right duration-700">
              <h3 className="font-black text-3xl italic uppercase mb-12 text-loot-red tracking-tighter">En temps réel</h3>

              {deliveryStatus === 3 ? (
                <div className="flex-grow flex flex-col">
                  <div className="bg-loot-red/10 text-loot-red rounded-3xl p-6 mb-8 font-black italic flex items-center gap-4 border-2 border-loot-red/20 animate-pulse">
                    <div className="w-10 h-10 bg-loot-red text-white rounded-full flex items-center justify-center text-sm shadow-lg">3</div>
                    Le livreur est en chemin !
                  </div>
                  {/* Map Simulation */}
                  <div className="flex-grow bg-[#0f1115] rounded-[50px] relative overflow-hidden shadow-2xl border-8 border-white group">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Map Path Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <path d="M 100 400 Q 250 200 400 350 T 600 100" fill="none" stroke="white" strokeWidth="6" strokeDasharray="12,12" />
                    </svg>

                    {/* Animated Courier */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce z-10">
                      <div className="bg-loot-red p-4 rounded-full shadow-[0_0_30px_rgba(211,47,47,1)] border-4 border-white transform hover:scale-125 transition-transform">
                        <Truck className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-4 h-4 bg-loot-red rounded-full mt-2 ring-8 ring-loot-red/20"></div>
                    </div>

                    {/* Destination */}
                    <div className="absolute top-1/4 right-1/4">
                      <MapPin className="w-12 h-12 text-white fill-loot-red drop-shadow-2xl" />
                    </div>

                    {/* Floating Stats */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-xl p-6 rounded-[30px] border border-white/10 shadow-2xl group-hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Estimation</p>
                          <p className="font-black italic text-2xl">4 - 8 min</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">Coursier</p>
                          <p className="font-black italic text-lg">Momo le Boss</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 flex-grow">
                  {[
                    { id: 1, label: 'Commande en préparation' },
                    { id: 2, label: 'Le livreur est devant le restaurant' },
                    { id: 3, label: 'Le livreur est en chemin' },
                    { id: 4, label: 'Commande livrée !' }
                  ].map((s) => (
                    <div key={s.id} className="flex items-center gap-8 group">
                      <div className={`
                          w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl transition-all duration-500
                          ${deliveryStatus >= s.id ? 'bg-loot-red text-white scale-110 shadow-xl shadow-loot-red/30 ring-8 ring-loot-red/5' : 'bg-gray-100 text-gray-300'}
                         `}>
                        {s.id}
                      </div>
                      <div className={`
                          flex-grow p-8 rounded-[35px] transition-all duration-500 border-2 text-xl
                          ${deliveryStatus === s.id ? 'bg-gray-50 border-gray-100 font-black text-gray-900 scale-[1.03] shadow-lg' : 'text-gray-300 border-transparent font-bold'}
                         `}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DELIVERED STATE (Panel 4 Style) */
          <div className="w-full max-w-3xl animate-in zoom-in-95 duration-1000">
            <div className="bg-white rounded-[70px] p-16 shadow-2xl border-8 border-gray-50 flex flex-col items-center text-center relative">
              <div className="absolute -top-10 bg-loot-red text-white px-12 py-6 rounded-full font-black text-3xl italic uppercase shadow-[0_15px_30px_rgba(211,47,47,0.3)] flex items-center gap-5 border-4 border-white">
                <div className="w-12 h-12 bg-white text-loot-red rounded-full flex items-center justify-center text-xl">4</div>
                Commande livrée !
              </div>

              <div className="mt-10 mb-12">
                <CheckCircle2 className="w-24 h-24 text-green-500 animate-bounce" />
              </div>

              <h3 className="font-black text-4xl uppercase italic mb-12 tracking-tighter border-b-8 border-gray-50 pb-6 w-full">Récapitulatif</h3>

              <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-center mb-12 text-left bg-gray-50 p-10 rounded-[50px] border-2 border-gray-100 shadow-inner">
                <div className="w-48 h-48 bg-white rounded-[40px] p-8 border-4 border-loot-red shadow-xl transform -rotate-3">
                  <img
                    src={cart[0]?.img || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400"}
                    className="w-full h-full object-contain"
                    alt="Ordered Item"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="font-black text-3xl italic">{cart[0]?.name || "Burger King - Maxi Menu"}</h4>
                  <p className="text-sm font-bold text-gray-400 uppercase italic tracking-widest">1 Menu Steakhouse XL</p>
                  <p className="text-loot-red font-black text-sm italic pt-4">Sauce : Double Mayo & Ketchup</p>
                  <div className="font-black text-4xl pt-6 text-gray-900">{(cart[0]?.price || 12.95).toFixed(2).replace('.', ',')}€</div>
                </div>
              </div>

              <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-sm animate-pulse">Bon appétit avec Loot Food !</p>
            </div>
          </div>
        )}

        {/* MARIO MINI GAME SECTION */}
        <div className="w-full bg-loot-red rounded-[100px] p-20 text-center text-white shadow-[0_30px_60px_rgba(211,47,47,0.3)] mb-20 mt-16 overflow-hidden relative border-8 border-white/20">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

          <h2 className="text-6xl font-black italic uppercase mb-8 tracking-tighter relative z-10 leading-[0.85]">Détendez-vous,<br />on s'occupe de tout !</h2>
          <p className="text-white/80 font-bold mb-16 text-2xl relative z-10 italic">Collectez un maximum d'XP pour le pass de combat !</p>

          {/* Retro Screen */}
          <div className="bg-[#5c94fc] w-full max-w-4xl mx-auto h-[500px] rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden border-[16px] border-white/10 group cursor-pointer transition-transform hover:scale-[1.02]">
            <div className="absolute top-12 left-12 text-left font-mono font-black text-2xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] z-20 space-y-2">
              <div className="flex items-center gap-3">PRESS <span className="text-yellow-400 bg-black px-4 py-1 rounded-lg">S</span> TO START</div>
              <div className="flex items-center gap-3">PRESS <span className="text-yellow-400 bg-black px-4 py-1 rounded-lg">SPACE</span> TO JUMP</div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono font-black text-5xl italic tracking-tighter opacity-80 z-10 animate-pulse">
              YOU'RE IMMORTAL HERE, L O L :'D
            </div>

            {/* Elements */}
            <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-loot-red border-8 border-black animate-bounce rounded-2xl z-10 shadow-2xl"></div>
            <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-yellow-400 border-8 border-black rounded-2xl flex items-center justify-center font-black text-6xl z-10 shadow-2xl animate-pulse">?</div>

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-32 bg-[#b87000] border-t-8 border-[#704000] z-20">
              <div className="flex h-full">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="flex-grow border-r-2 border-black/20"></div>
                ))}
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute top-24 right-40 w-48 h-20 bg-white rounded-full opacity-60 blur-[3px] animate-pulse"></div>

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-30">
              <div className="bg-white text-loot-red p-10 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-20 h-20 fill-current" />
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="mt-24 max-w-2xl mx-auto space-y-6">
            {[
              { rank: 1, name: 'FanDeThekairi78', pts: '17807pts', icon: '🏆' },
              { rank: 2, name: 'ConstantPoisson', pts: '15688pts', icon: '🥈' },
              { rank: 3, name: 'thekairi78', pts: '14894pts', icon: '🥉' }
            ].map((user) => (
              <div key={user.rank} className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-8 flex items-center justify-between border-2 border-white/10 hover:bg-white/20 transition-all cursor-pointer group hover:-translate-y-2 shadow-xl">
                <div className="flex items-center gap-8">
                  <span className="text-4xl filter drop-shadow-lg group-hover:scale-125 transition-transform">{user.icon}</span>
                  <span className="font-black italic uppercase text-xl tracking-tighter">{user.name}</span>
                </div>
                <span className="font-black text-3xl text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">{user.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CartStep = () => (
    <div className="flex flex-col items-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-xl bg-white rounded-[50px] p-10 shadow-3xl border border-gray-50">
        {cart.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row gap-8 mb-10 border-b border-gray-100 pb-10">
              <div className="w-40 h-40 bg-gray-50 rounded-[40px] p-6 flex items-center justify-center border-2 border-gray-100 shadow-inner flex-shrink-0">
                <img
                  src={cart[0].img}
                  className="w-full h-full object-contain"
                  alt="Product"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-black text-2xl mb-3 italic uppercase tracking-tighter">{cart[0].name}</h3>
                <ul className="text-sm text-gray-400 font-bold space-y-2 uppercase italic tracking-wide">
                  <li>1 Steakhouse Original</li>
                  <li>1 grande frites croustillantes</li>
                  <li>Un Coca Cola Frais</li>
                  <li className="text-loot-red font-black">Sauce : Mayo et Ketchup</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <button className="w-full flex items-center justify-center gap-4 border-4 border-gray-50 py-5 rounded-[25px] font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all hover:scale-[1.02]">
                <MessageSquare className="w-6 h-6 text-loot-red" /> Ajouter une remarque
              </button>
              <button className="w-full flex items-center justify-center gap-4 border-4 border-gray-50 py-5 rounded-[25px] font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all hover:scale-[1.02]">
                <Gift className="w-6 h-6 text-loot-red" /> Envoyer un cadeau
              </button>
            </div>

            <button
              onClick={() => setStep('delivery')}
              className="w-full bg-black text-white py-6 rounded-[25px] font-black text-2xl hover:bg-loot-red transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              Suivant
            </button>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-gray-100">
              <X className="w-10 h-10 text-gray-300" />
            </div>
            <p className="font-black text-gray-400 uppercase tracking-[0.3em] italic text-lg">Votre panier est vide</p>
          </div>
        )}
      </div>
    </div>
  );

  const DeliveryStep = () => (
    <div className="flex flex-col items-center py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-full max-w-xl space-y-6">
        <div className="bg-white p-6 rounded-[35px] shadow-2xl border border-gray-100 flex items-center gap-6 transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="bg-loot-red/10 p-4 rounded-3xl"><MapPin className="w-8 h-8 text-loot-red" /></div>
          <div className="flex-grow">
            <p className="font-black text-xl italic uppercase tracking-tighter leading-none mb-1">Rue Houbrecht 4, Liège</p>
            <p className="text-xs font-bold text-gray-400 italic">1er étage, 3e boîte aux lettres</p>
          </div>
          <Edit2 className="w-6 h-6 text-gray-300 hover:text-loot-red transition-colors" />
        </div>

        <div className="bg-white p-6 rounded-[35px] shadow-2xl border border-gray-100 flex items-center gap-6 transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="bg-loot-red/10 p-4 rounded-3xl"><Truck className="w-8 h-8 text-loot-red" /></div>
          <div className="flex-grow">
            <p className="font-black text-xl italic uppercase tracking-tighter leading-none mb-1">Devant ma porte</p>
            <p className="text-xs font-bold text-loot-red italic">Appuyer sur la sonnette "Empire"</p>
          </div>
          <Edit2 className="w-6 h-6 text-gray-300 hover:text-loot-red transition-colors" />
        </div>

        <div className="pt-8 px-6">
          <div className="flex justify-between items-center mb-10">
            <span className="font-black text-gray-400 uppercase tracking-widest italic text-sm">Temps estimé</span>
            <div className="bg-loot-red text-white px-5 py-2 rounded-full font-black text-lg italic shadow-lg">10 - 20 min</div>
          </div>

          <div className="space-y-4">
            <div className="w-full border-4 border-black p-6 rounded-[30px] flex items-center gap-5 bg-white font-black text-xl italic shadow-2xl cursor-pointer transform hover:scale-[1.02] transition-all">
              <Truck className="w-10 h-10" /> Standard
            </div>
            <div className="w-full border-4 border-gray-50 p-6 rounded-[30px] flex items-center justify-between bg-white font-black text-xl italic text-gray-300 cursor-pointer hover:border-gray-200 transition-all opacity-50">
              <div className="flex items-center gap-5">
                <Calendar className="w-10 h-10 opacity-40" /> Planifier
              </div>
              <ChevronDown className="w-8 h-8 -rotate-90" />
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('order')}
          className="w-full bg-black text-white py-6 rounded-[30px] font-black text-2xl mt-10 shadow-3xl hover:bg-loot-red transition-all transform active:scale-95"
        >
          Valider la livraison
        </button>
      </div>
    </div>
  );

  const OrderStep = () => (
    <div className="flex flex-col items-center py-12 px-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-[50px] shadow-2xl border border-gray-100 mb-10 overflow-hidden">
          <button
            onClick={() => setShowRecap(!showRecap)}
            className="w-full p-8 flex items-center justify-between border-b-2 border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-6 font-black text-2xl italic uppercase tracking-tighter">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm shadow-lg">1</div>
              Récapitulatif
            </div>
            <ChevronDown className={`w-8 h-8 transition-transform duration-500 ${showRecap ? 'rotate-180' : ''}`} />
          </button>

          {showRecap && (
            <div className="p-8 bg-gray-50/50 animate-in slide-in-from-top-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-500 italic uppercase text-sm tracking-widest">Burger King - Maxi Menu</span>
                <span className="font-black text-xl text-loot-red">{subTotal.toFixed(2).replace('.', ',')}€</span>
              </div>
            </div>
          )}

          <div className="p-10 space-y-6">
            <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase italic tracking-widest">
              <span>Sous-total</span>
              <span>{subTotal.toFixed(2).replace('.', ',')}€</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase italic tracking-widest">
              <span className="flex items-center gap-2">Frais de livraison <div className="w-5 h-5 rounded-full border-2 border-gray-200 text-[10px] flex items-center justify-center">?</div></span>
              <span>{deliveryFee.toFixed(2).replace('.', ',')}€</span>
            </div>
            <div className="flex justify-between items-center text-4xl font-black pt-8 border-t-4 border-gray-50 tracking-tighter">
              <span className="italic uppercase">Total</span>
              <span className="text-loot-red">{total.toFixed(2).replace('.', ',')}€</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 mb-10 flex items-center gap-6 transform hover:scale-[1.02] transition-all cursor-pointer">
          <div className="bg-blue-50 p-5 rounded-2xl"><CreditCard className="w-8 h-8 text-blue-600" /></div>
          <div className="flex-grow font-black italic text-2xl tracking-tighter uppercase">Visa •••• 9999</div>
          <div className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Pay</div>
        </div>

        <button
          onClick={() => setStep('confirm')}
          className="w-full bg-black text-white py-6 rounded-[30px] font-black text-2xl shadow-3xl hover:bg-loot-red transition-all"
        >
          Confirmer le paiement
        </button>
      </div>
    </div>
  );

  const ConfirmStep = () => (
    <div className="flex flex-col items-center py-12 px-4 animate-in fade-in zoom-in duration-700">
      <div className="w-full max-w-xl text-center">
        <div className="relative mb-14 px-10">
          <img
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800"
            className="w-full h-80 object-cover rounded-[70px] shadow-3xl border-8 border-white transform rotate-2"
            alt="Success Food"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-6 rounded-full shadow-[0_20px_50px_rgba(34,197,94,0.3)] border-4 border-white transform hover:scale-125 transition-transform">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6 leading-none">C'est parti,<br />on prépare ça !</h2>
        <p className="text-gray-400 font-bold mb-12 italic uppercase tracking-widest text-sm">Votre reçu est prêt</p>

        <div className="bg-white rounded-[50px] p-12 shadow-2xl border-4 border-gray-50 mb-12 transform -rotate-1">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black text-3xl italic uppercase tracking-tighter">Total payé</span>
            <span className="font-black text-3xl text-loot-red">{total.toFixed(2).replace('.', ',')}€</span>
          </div>
          <div className="flex items-center justify-between py-6 border-t-2 border-gray-50 text-sm font-black text-gray-400 uppercase tracking-widest">
            <span>Mode de paiement</span>
            <span className="flex items-center gap-3 italic text-gray-900"><CreditCard className="w-5 h-5 text-blue-600" /> Visa Card</span>
          </div>
        </div>

        <button
          onClick={() => setStep('tracking')}
          className="w-full bg-black text-white py-7 rounded-[35px] font-black text-3xl shadow-3xl hover:bg-loot-red transition-all transform active:scale-95"
        >
          Suivre mon livreur
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {renderStepHeader()}
      <div className="flex-grow">
        {step === 'cart' && <CartStep />}
        {step === 'delivery' && <DeliveryStep />}
        {step === 'order' && <OrderStep />}
        {step === 'confirm' && <ConfirmStep />}
        {step === 'tracking' && <TrackingStep />}
      </div>
    </div>
  );
};

export default CheckoutFlow;
