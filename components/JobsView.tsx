
import React from 'react';
import { MapPin, Clock, Euro, ChefHat, Bike, Headphones, Star, ArrowRight } from 'lucide-react';

interface Props {
    onBack: () => void;
    t: Record<string, string>;
    isDarkMode?: boolean;
}

const JobsView: React.FC<Props> = ({ onBack, t, isDarkMode = false }) => {
    const jobsData = [
        {
            id: 1,
            titleKey: "jobsDeliveryPartner",
            icon: <Bike className="w-8 h-8" />,
            type: "Freelance",
            location: "Paris, Lyon, Marseille",
            salary: "12-18€/h",
            descKey: "jobsDeliveryDesc",
            perks: ["jobsPerk1", "jobsPerk2", "jobsPerk3"],
            featured: true,
        },
        {
            id: 2,
            titleKey: "jobsChefPartner",
            icon: <ChefHat className="w-8 h-8" />,
            type: "Partenariat",
            location: "France entière",
            salary: "Variable",
            descKey: "jobsChefDesc",
            perks: ["jobsPerk4", "jobsPerk5", "jobsPerk6"],
            featured: true,
        },
        {
            id: 3,
            titleKey: "jobsCustomerSupport",
            icon: <Headphones className="w-8 h-8" />,
            type: "CDI / Remote",
            location: "Remote",
            salary: "2200-2800€/mois",
            descKey: "jobsSupportDesc",
            perks: ["jobsPerk7", "jobsPerk8", "jobsPerk9"],
            featured: false,
        },
    ];

    return (
        <div className={`min-h-screen pb-20 animate-in fade-in duration-500 ${isDarkMode
                ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
            <div className="container mx-auto px-4 md:px-8 pt-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-loot-red text-white px-6 py-2 rounded-full mb-6">
                        <Star className="w-5 h-5" />
                        <span className="font-black uppercase text-sm tracking-wide">{t.navJobs}</span>
                    </div>
                    <h1 className={`text-5xl font-black italic uppercase tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        {t.jobsTitle}
                    </h1>
                    <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t.jobsDesc}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { value: "500+", labelKey: "jobsPartners" },
                        { value: "50K+", labelKey: "jobsDeliveries" },
                        { value: "15", labelKey: "jobsCities" },
                        { value: "98%", labelKey: "jobsSatisfaction" },
                    ].map((stat, i) => (
                        <div key={i} className={`rounded-2xl p-6 text-center shadow-lg border ${isDarkMode
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-100'
                            }`}>
                            <div className="text-3xl font-black text-loot-red mb-1">{stat.value}</div>
                            <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t[stat.labelKey]}</div>
                        </div>
                    ))}
                </div>

                {/* Job Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {jobsData.map((job) => (
                        <div
                            key={job.id}
                            className={`rounded-3xl p-6 shadow-xl border-2 transition-all hover:scale-[1.02] hover:shadow-2xl ${isDarkMode
                                    ? job.featured ? 'bg-gray-800 border-loot-red' : 'bg-gray-800 border-gray-700'
                                    : job.featured ? 'bg-white border-loot-red' : 'bg-white border-gray-100'
                                }`}
                        >
                            {job.featured && (
                                <div className="inline-block bg-loot-red text-white text-xs font-bold uppercase px-3 py-1 rounded-full mb-4">
                                    {t.jobsFeatured}
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-red-900/30 text-loot-red' : 'bg-red-50 text-loot-red'
                                    }`}>
                                    {job.icon}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {t[job.titleKey]}
                                    </h3>
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.type}</span>
                                </div>
                            </div>

                            <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {t[job.descKey]}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Euro className="w-4 h-4" />
                                    {job.salary}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.perks.map((perkKey, i) => (
                                    <span key={i} className={`text-xs font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {t[perkKey]}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full bg-loot-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                                {t.jobsApply}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-loot-red rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-4">
                        {t.jobsNoRole}
                    </h2>
                    <p className="text-white/80 mb-6 max-w-lg mx-auto">
                        {t.jobsNoRoleDesc}
                    </p>
                    <button className="bg-white text-loot-red px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform">
                        {t.jobsSendApp}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default JobsView;
