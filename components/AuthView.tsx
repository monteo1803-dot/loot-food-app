
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Gamepad2 } from 'lucide-react';

interface Props {
    onBack: () => void;
    onLogin: (user: { name: string; email: string }) => void;
    t: any;
}

const AuthView: React.FC<Props> = ({ onBack, onLogin, t }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (!isLogin && !formData.name) {
            setError('Veuillez entrer votre nom');
            return;
        }

        // Simulate successful auth
        onLogin({
            name: formData.name || 'Gamer',
            email: formData.email,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
            {/* Header */}
            <div className="p-6">
                <button
                    onClick={onBack}
                    className="text-white/60 hover:text-white flex items-center gap-2 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex items-center justify-center px-4 pb-20">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-4 mb-6">
                            <Gamepad2 className="w-12 h-12 text-loot-red" />
                            <div className="text-5xl font-black text-white tracking-tighter">
                                LOOT<span className="text-loot-red">FOOD</span>
                            </div>
                        </div>
                        <p className="text-white/60 font-bold">
                            {isLogin ? 'Content de te revoir, gamer !' : 'Rejoins la communauté !'}
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-xl font-black text-sm uppercase transition-all ${isLogin
                                    ? 'bg-loot-red text-white shadow-lg'
                                    : 'text-white/50 hover:text-white'
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-xl font-black text-sm uppercase transition-all ${!isLogin
                                    ? 'bg-loot-red text-white shadow-lg'
                                    : 'text-white/50 hover:text-white'
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-white/30 focus:border-loot-red focus:outline-none transition-colors"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-white/30 focus:border-loot-red focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white font-bold placeholder:text-white/30 focus:border-loot-red focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirmer le mot de passe"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-white/30 focus:border-loot-red focus:outline-none transition-colors"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-loot-red text-white py-4 rounded-2xl font-black text-lg uppercase hover:bg-red-700 transition-colors shadow-[0_10px_30px_rgba(211,47,47,0.3)]"
                        >
                            {isLogin ? 'Se connecter' : "S'inscrire"}
                        </button>
                    </form>

                    {isLogin && (
                        <p className="text-center mt-6 text-white/40 font-bold">
                            <a href="#" className="hover:text-loot-red transition-colors">
                                Mot de passe oublié ?
                            </a>
                        </p>
                    )}

                    {/* Social Login */}
                    <div className="mt-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-900 px-4 text-white/30 font-bold">Ou continuer avec</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button className="flex-1 bg-white/5 border-2 border-white/10 py-3 rounded-xl font-black text-white hover:bg-white/10 transition-colors">
                                Google
                            </button>
                            <button className="flex-1 bg-white/5 border-2 border-white/10 py-3 rounded-xl font-black text-white hover:bg-white/10 transition-colors">
                                Discord
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthView;
