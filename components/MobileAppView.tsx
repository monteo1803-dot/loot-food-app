
import React from 'react';
import { Smartphone, Download, Star, Zap, Gift, Bell, QrCode, Apple, Play } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

const MobileAppView: React.FC<Props> = ({ onBack, t }) => {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            titleKey: "appFeature1Title",
            title: "Commandes ultra-rapides",
            descKey: "appFeature1Desc",
            desc: "Faites tourner la roue et commandez en moins de 30 secondes"
        },
        {
            icon: <Bell className="w-6 h-6" />,
            titleKey: "appFeature2Title",
            title: "Notifications en temps réel",
            descKey: "appFeature2Desc",
            desc: "Suivez votre commande et vos gains XP en direct"
        },
        {
            icon: <Gift className="w-6 h-6" />,
            titleKey: "appFeature3Title",
            title: "Récompenses exclusives",
            descKey: "appFeature3Desc",
            desc: "Débloquez des bonus uniquement disponibles sur l'app"
        },
        {
            icon: <Star className="w-6 h-6" />,
            titleKey: "appFeature4Title",
            title: "Mode hors-ligne",
            descKey: "appFeature4Desc",
            desc: "Consultez votre historique même sans connexion"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white pb-20 animate-in fade-in duration-500">
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full mb-6">
                        <Smartphone className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.mobileApp || "App Mobile"}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            {t.appTitle || "Loot Food"}
                        </span>
                        <br />
                        <span className="text-white">{t.appSubtitle || "dans votre poche"}</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        {t.appDesc || "Téléchargez l'app et profitez d'une expérience gaming encore plus immersive !"}
                    </p>
                </div>

                {/* Phone Mockup + QR Code */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">

                    {/* Phone Mockup */}
                    <div className="relative">
                        <div className="w-72 h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                            <div className="w-full h-full bg-gradient-to-b from-loot-red via-red-600 to-red-800 rounded-[2.5rem] overflow-hidden relative">
                                {/* Status bar */}
                                <div className="h-8 flex items-center justify-center">
                                    <div className="w-20 h-5 bg-black rounded-full"></div>
                                </div>
                                {/* App content mockup */}
                                <div className="p-6 text-center">
                                    <div className="text-4xl font-black italic mb-2">LOOT</div>
                                    <div className="text-4xl font-black italic">FOOD</div>
                                    <div className="mt-8 mx-auto w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white/30 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="mt-6 text-sm uppercase tracking-wider opacity-80">
                                        {t.tapToSpin || "Appuyez pour tourner"}
                                    </div>
                                    <div className="mt-8 bg-white/20 backdrop-blur rounded-2xl p-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>XP</span>
                                            <span className="font-bold">2,450 / 3,000</span>
                                        </div>
                                        <div className="h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full w-[80%] bg-yellow-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-black text-sm rotate-12 shadow-xl">
                            +500 XP BONUS
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm -rotate-6 shadow-xl">
                            🎁 Box gratuite
                        </div>
                    </div>

                    {/* QR Code & Download */}
                    <div className="text-center lg:text-left">
                        <div className="bg-white rounded-3xl p-8 inline-block mb-8">
                            <QrCode className="w-48 h-48 text-gray-900" />
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-400 mb-4">{t.scanQR || "Scannez pour télécharger"}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                                    <Apple className="w-8 h-8" />
                                    <div className="text-left">
                                        <div className="text-xs opacity-60">Télécharger sur</div>
                                        <div className="text-lg font-black">App Store</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                                    <Play className="w-8 h-8" />
                                    <div className="text-left">
                                        <div className="text-xs opacity-60">Disponible sur</div>
                                        <div className="text-lg font-black">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 text-center hover:bg-gray-700/50 transition-colors hover:scale-105 cursor-default"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-white mb-2">
                                {t[feature.titleKey] || feature.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {t[feature.descKey] || feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 text-center">
                    <div className="flex flex-wrap justify-center gap-8">
                        <div>
                            <div className="text-4xl font-black text-green-400">100K+</div>
                            <div className="text-gray-400 text-sm">{t.downloads || "Téléchargements"}</div>
                        </div>
                        <div className="w-px bg-gray-700"></div>
                        <div>
                            <div className="text-4xl font-black text-green-400">4.8 ⭐</div>
                            <div className="text-gray-400 text-sm">{t.rating || "Note moyenne"}</div>
                        </div>
                        <div className="w-px bg-gray-700"></div>
                        <div>
                            <div className="text-4xl font-black text-green-400">#1</div>
                            <div className="text-gray-400 text-sm">{t.ranking || "Food & Gaming"}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobileAppView;
