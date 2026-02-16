
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Sparkles, Trophy, Gift, Zap, Crown, Star, CheckCircle2 } from 'lucide-react';

interface Props {
    onBack: () => void;
    onLogin: (user: { name: string; email: string }) => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

const AuthView: React.FC<Props> = ({ onBack, onLogin, t, isDarkMode = true }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!formData.email || !formData.password) {
            setError(t.fillAllFields || 'Veuillez remplir tous les champs');
            setIsLoading(false);
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError(t.passwordMismatch || 'Les mots de passe ne correspondent pas');
            setIsLoading(false);
            return;
        }

        if (!isLogin && !formData.name) {
            setError(t.enterName || 'Veuillez entrer votre nom');
            setIsLoading(false);
            return;
        }

        // Simulate successful auth
        onLogin({
            name: formData.name || 'Gamer',
            email: formData.email,
        });
    };

    // Avantages d'inscription
    const benefits = [
        { icon: <Gift className="w-5 h-5" />, text: t.benefitFreeBox || "1 Box gratuite offerte" },
        { icon: <Trophy className="w-5 h-5" />, text: t.benefitLeaderboard || "Accès au classement" },
        { icon: <Zap className="w-5 h-5" />, text: t.benefitXP || "Gagnez de l'XP à chaque commande" },
        { icon: <Crown className="w-5 h-5" />, text: t.benefitExclusive || "Récompenses exclusives" },
    ];

    return (
        <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

            {/* Left Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-loot-red via-red-600 to-orange-500">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wide">Nouveau</span>
                        </div>
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
                            {t.joinCommunity || "Rejoins la communauté"}
                        </h1>
                        <p className="text-xl text-white/80">
                            {t.thousandsPlayers || "Des milliers de joueurs gagnent déjà des plats délicieux !"}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    {benefit.icon}
                                </div>
                                <span className="font-bold">{benefit.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-12 flex gap-8">
                        <div>
                            <div className="text-4xl font-black">50K+</div>
                            <div className="text-white/60 text-sm font-bold">{t.players || "Joueurs"}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black">1M+</div>
                            <div className="text-white/60 text-sm font-bold">{t.spins || "Spins"}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black">4.9</div>
                            <div className="text-white/60 text-sm font-bold flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {t.rating || "Note"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Header */}
                <div className="p-6 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 font-bold transition-colors ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t.back || "Retour"}
                    </button>
                    <div className="text-3xl font-black tracking-tighter">
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>LOOT</span>
                        <span className="text-loot-red">FOOD</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex items-center justify-center px-8 pb-20">
                    <div className="w-full max-w-md">
                        {/* Welcome Text */}
                        <div className="text-center mb-10">
                            <h2 className={`text-4xl font-black italic uppercase tracking-tighter mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                {isLogin
                                    ? (t.welcomeBack || "Content de te revoir !")
                                    : (t.createAccount || "Crée ton compte")
                                }
                            </h2>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {isLogin
                                    ? (t.loginToContinue || "Connecte-toi pour continuer ta partie")
                                    : (t.joinToStart || "Inscris-toi et reçois 1 Box gratuite !")
                                }
                            </p>
                        </div>

                        {/* Toggle Tabs */}
                        <div className={`flex rounded-2xl p-1.5 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                            }`}>
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all ${isLogin
                                        ? 'bg-gradient-to-r from-loot-red to-orange-500 text-white shadow-lg'
                                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {t.login || "Connexion"}
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all ${!isLogin
                                        ? 'bg-gradient-to-r from-loot-red to-orange-500 text-white shadow-lg'
                                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {t.register || "Inscription"}
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="relative group">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-500 group-focus-within:text-loot-red' : 'text-gray-400 group-focus-within:text-loot-red'
                                        }`} />
                                    <input
                                        type="text"
                                        placeholder={t.username || "Nom d'utilisateur"}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full border-2 rounded-2xl py-4 pl-12 pr-4 font-bold transition-all focus:outline-none focus:border-loot-red focus:ring-4 focus:ring-loot-red/20 ${isDarkMode
                                                ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                                                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                                            }`}
                                    />
                                </div>
                            )}

                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-500 group-focus-within:text-loot-red' : 'text-gray-400 group-focus-within:text-loot-red'
                                    }`} />
                                <input
                                    type="email"
                                    placeholder={t.email || "Email"}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full border-2 rounded-2xl py-4 pl-12 pr-4 font-bold transition-all focus:outline-none focus:border-loot-red focus:ring-4 focus:ring-loot-red/20 ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                                            : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                                        }`}
                                />
                            </div>

                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-500 group-focus-within:text-loot-red' : 'text-gray-400 group-focus-within:text-loot-red'
                                    }`} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t.password || "Mot de passe"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full border-2 rounded-2xl py-4 pl-12 pr-12 font-bold transition-all focus:outline-none focus:border-loot-red focus:ring-4 focus:ring-loot-red/20 ${isDarkMode
                                            ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                                            : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                                        }`}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {!isLogin && (
                                <div className="relative group">
                                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDarkMode ? 'text-gray-500 group-focus-within:text-loot-red' : 'text-gray-400 group-focus-within:text-loot-red'
                                        }`} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder={t.confirmPassword || "Confirmer le mot de passe"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={`w-full border-2 rounded-2xl py-4 pl-12 pr-4 font-bold transition-all focus:outline-none focus:border-loot-red focus:ring-4 focus:ring-loot-red/20 ${isDarkMode
                                                ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                                                : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                                            }`}
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-4 text-red-500 text-sm font-bold text-center flex items-center justify-center gap-2">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r from-loot-red to-orange-500 text-white py-4 rounded-2xl font-black text-lg uppercase tracking-wide transition-all shadow-[0_10px_30px_rgba(211,47,47,0.3)] hover:shadow-[0_15px_40px_rgba(211,47,47,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        {t.loading || "Chargement..."}
                                    </>
                                ) : (
                                    <>
                                        {isLogin ? (t.loginBtn || 'Se connecter') : (t.registerBtn || "S'inscrire")}
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {isLogin && (
                            <p className={`text-center mt-6 font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <a href="#" className="hover:text-loot-red transition-colors">
                                    {t.forgotPassword || "Mot de passe oublié ?"}
                                </a>
                            </p>
                        )}

                        {/* Social Login */}
                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className={`w-full border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className={`px-4 font-bold ${isDarkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        {t.orContinueWith || "Ou continuer avec"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button className={`flex-1 border-2 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                    }`}>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className={`flex-1 border-2 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] ${isDarkMode
                                        ? 'bg-[#5865F2] border-[#5865F2] text-white hover:bg-[#4752C4]'
                                        : 'bg-[#5865F2] border-[#5865F2] text-white hover:bg-[#4752C4]'
                                    }`}>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                                    </svg>
                                    Discord
                                </button>
                            </div>
                        </div>

                        {/* Bonus inscription */}
                        {!isLogin && (
                            <div className={`mt-8 p-4 rounded-2xl border-2 border-dashed flex items-center gap-4 ${isDarkMode
                                    ? 'border-yellow-600/50 bg-yellow-900/10'
                                    : 'border-yellow-400 bg-yellow-50'
                                }`}>
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                                    <Gift className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className={`font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {t.welcomeGift || "Cadeau de bienvenue !"}
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {t.freeBoxOnSignup || "Reçois 1 Box gratuite à l'inscription"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthView;
