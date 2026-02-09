/**
 * Type-safe translation system for Loot Food
 * Core keys are required, extended keys are optional with fallback
 */

// Core translation keys that are required in all languages
export interface CoreTranslationKeys {
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

    // Battle Pass Core
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

// Extended translation keys (optional, with fallback in components)
export interface ExtendedTranslationKeys {
    // Battle Pass Extended
    season?: string;
    rewards?: string;
    previousRewards?: string;
    nextRewards?: string;
    freeBox?: string;
    goldBox?: string;
    completed?: string;
    dailyBonus?: string;
    completeAll?: string;

    // Menu Catalog
    menuCatalog?: string;
    menuTitle?: string;
    menuDesc?: string;
    searchDish?: string;
    noResults?: string;
    filterAll?: string;
    filterLegendary?: string;
    filterEpic?: string;
    filterRare?: string;
    filterCommon?: string;

    // My Loot Boxes
    myLootBoxes?: string;
    lootBoxesTitle?: string;
    lootBoxesDesc?: string;
    boxesOpened?: string;
    legendaryWins?: string;
    totalValue?: string;
    dishValue?: string;
    noBoxesYet?: string;
    startSpinning?: string;

    // Achievements
    achievements?: string;
    achievementsTitle?: string;
    achievementsDesc?: string;
    unlockedAchievements?: string;
    xpEarned?: string;
    achFirstSpin?: string;
    achFirstSpinDesc?: string;
    achFoodLover?: string;
    achFoodLoverDesc?: string;
    achStreak7?: string;
    achStreak7Desc?: string;
    achLegendaryHunter?: string;
    achLegendaryHunterDesc?: string;
    achSpinMaster?: string;
    achSpinMasterDesc?: string;
    achBigSpender?: string;
    achBigSpenderDesc?: string;
    achWorldTraveler?: string;
    achWorldTravelerDesc?: string;
    achUltimateChampion?: string;
    achUltimateChampionDesc?: string;
}

// Combined translation keys
export type TranslationKeys = CoreTranslationKeys & ExtendedTranslationKeys;

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it' | 'nl' | 'pt' | 'pl' | 'tr' | 'ja';

export type Translations = Record<Language, TranslationKeys>;
