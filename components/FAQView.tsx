
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: any;
    isDarkMode?: boolean;
}

const faqData = [
    {
        categoryKey: "faqGeneral",
        category: "Général",
        questions: [
            {
                qKey: "faqQ1",
                q: "Comment fonctionne Loot Food ?",
                aKey: "faqA1",
                a: "Loot Food est une application de livraison de repas gamifiée. Au lieu de choisir votre plat, vous faites tourner une roue et découvrez un plat surprise basé sur vos préférences ! Plus vous jouez, plus vous gagnez d'XP et débloquez des récompenses."
            },
            {
                qKey: "faqQ2",
                q: "Qu'est-ce qu'une Loot Box ?",
                aKey: "faqA2",
                a: "Les Loot Boxes sont des coffres virtuels contenant des plats de différentes raretés : Commun, Rare, Épique et Légendaire. Plus la box est rare, plus le plat sera exceptionnel et de grande valeur !"
            },
            {
                qKey: "faqQ3",
                q: "Comment gagner de l'XP ?",
                aKey: "faqA3",
                a: "Gagnez de l'XP en passant des commandes, en complétant des quêtes quotidiennes, en maintenant votre streak de commandes, et en débloquant des succès. Plus vous avez d'XP, plus votre niveau augmente !"
            }
        ]
    },
    {
        categoryKey: "faqOrders",
        category: "Commandes",
        questions: [
            {
                qKey: "faqQ4",
                q: "Comment passer une commande ?",
                aKey: "faqA4",
                a: "Entrez votre adresse de livraison, choisissez votre type de box (Classique, Délice, Premium ou Gold), faites tourner la roue et découvrez votre plat ! Validez et attendez votre livraison."
            },
            {
                qKey: "faqQ5",
                q: "Puis-je refuser un plat qui ne me plaît pas ?",
                aKey: "faqA5",
                a: "Lors de la création de votre compte, vous indiquez vos préférences alimentaires et allergies. La roue ne vous proposera jamais un plat qui ne correspond pas à ces critères."
            },
            {
                qKey: "faqQ6",
                q: "Quels sont les délais de livraison ?",
                aKey: "faqA6",
                a: "Les délais varient selon votre localisation et le restaurant partenaire. En moyenne, comptez 25 à 40 minutes. Vous pouvez suivre votre commande en temps réel."
            }
        ]
    },
    {
        categoryKey: "faqRewards",
        category: "Récompenses",
        questions: [
            {
                qKey: "faqQ7",
                q: "Comment fonctionne le Battle Pass ?",
                aKey: "faqA7",
                a: "Le Battle Pass est un système de progression mensuel. Complétez des quêtes et gagnez de l'XP pour débloquer des récompenses exclusives : réductions, box gratuites, plats légendaires et plus !"
            },
            {
                qKey: "faqQ8",
                q: "Que se passe-t-il quand je monte de niveau ?",
                aKey: "faqA8",
                a: "Chaque niveau débloque de nouvelles récompenses et améliore vos chances d'obtenir des plats rares. Les paliers importants offrent des bonus spéciaux comme des box Gold gratuites !"
            }
        ]
    }
];

const FAQView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newOpen = new Set(openItems);
        if (newOpen.has(id)) {
            newOpen.delete(id);
        } else {
            newOpen.add(id);
        }
        setOpenItems(newOpen);
    };

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full mb-6">
                        <HelpCircle className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.faqNav || "FAQ"}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.faqTitle || "Questions Fréquentes"}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.faqDesc || "Tout ce que vous devez savoir sur Loot Food et comment ça marche !"}
                    </p>
                </div>

                {/* FAQ Sections */}
                <div className="max-w-3xl mx-auto space-y-8">
                    {faqData.map((section, sIndex) => (
                        <div key={sIndex}>
                            <h2 className={`text-2xl font-black mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                <span className="w-3 h-3 bg-loot-red rounded-full"></span>
                                {t[section.categoryKey] || section.category}
                            </h2>
                            <div className="space-y-3">
                                {section.questions.map((item, qIndex) => {
                                    const itemId = `${sIndex}-${qIndex}`;
                                    const isOpen = openItems.has(itemId);
                                    return (
                                        <div
                                            key={qIndex}
                                            className={`rounded-2xl border-2 overflow-hidden transition-all ${isDarkMode
                                                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                                    : 'bg-white border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleItem(itemId)}
                                                className="w-full p-5 text-left flex items-center justify-between gap-4"
                                            >
                                                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {t[item.qKey] || item.q}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-loot-red flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className={`px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                    {t[item.aKey] || item.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="max-w-3xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-loot-red to-red-600 rounded-3xl p-8 text-white text-center">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-2xl font-black italic uppercase mb-2">
                            {t.stillHaveQuestions || "Encore des questions ?"}
                        </h3>
                        <p className="text-white/80 mb-6">
                            {t.contactUs || "Notre équipe est là pour vous aider !"}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:support@lootfood.fr"
                                className="inline-flex items-center justify-center gap-2 bg-white text-loot-red px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                            >
                                <Mail className="w-5 h-5" />
                                support@lootfood.fr
                            </a>
                            <a
                                href="tel:+33123456789"
                                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                01 23 45 67 89
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQView;
