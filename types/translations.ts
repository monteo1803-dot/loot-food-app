/**
 * Type-safe translation system for Loot Food
 * Generated from translations.ts to ensure type safety
 */

export interface TranslationKeys {
    // Hero
    heroTitle: string;
    addressPlaceholder: string;

    // Navigation
    navBattlePass: string;
    navJobs: string;
    navLeaderboard: string;
    btnRegister: string;

    // How It Works
    howItWorksTitle: string;
    howItWorksDesc: string;
    howItWorksFooter: string;

    // Gallery
    galleryTitle: string;
    galleryDesc: string;

    // Rewards
    rewardsTitle: string;
    rewardsDesc: string;
    rewardsBtn: string;

    // Battle Pass
    battlePassTitle: string;
    battlePassTier: string;
    battlePassDailyQuests: string;
    quest1: string;
    quest2: string;
    quest3: string;
    quest4: string;

    // Leaderboard
    leaderboardTitle: string;
    leaderboardDesc: string;
    leaderboardLevel: string;

    // Jobs
    jobsTitle: string;
    jobsDesc: string;
    jobsPartners: string;
    jobsDeliveries: string;
    jobsCities: string;
    jobsSatisfaction: string;
    jobsFeatured: string;
    jobsDeliveryPartner: string;
    jobsChefPartner: string;
    jobsCustomerSupport: string;
    jobsDeliveryDesc: string;
    jobsChefDesc: string;
    jobsSupportDesc: string;
    jobsApply: string;
    jobsNoRole: string;
    jobsNoRoleDesc: string;
    jobsSendApp: string;
    jobsPerk1: string;
    jobsPerk2: string;
    jobsPerk3: string;
    jobsPerk4: string;
    jobsPerk5: string;
    jobsPerk6: string;
    jobsPerk7: string;
    jobsPerk8: string;
    jobsPerk9: string;

    // Wheel
    chooseWheel: string;
    wheelsTitle: string;
    wheelsDesc: string;
    wheelFastFood: string;
    wheelAsian: string;
    wheelItalian: string;
    wheelFrench: string;
    wheelRandom: string;
    playBtn: string;
    spinToDiscover: string;
    possibleDishes: string;
    spinning: string;
    spinBtn: string;
    spinAgain: string;
    addToCart: string;
}

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it' | 'nl' | 'pt' | 'pl' | 'tr' | 'ja';

export type Translations = Record<Language, TranslationKeys>;
