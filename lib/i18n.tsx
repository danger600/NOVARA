import { getLocales } from "expo-localization";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readLegacyPreference, readPreference, removeLegacyPreference, writePreference } from "@/lib/storage";

export type Locale = "en" | "rw" | "fr";

const english = {
  navHome: "Home", navDiscover: "Discover", navTasks: "Tasks", navWorkspace: "Workspace", navProfile: "Profile", navSettings: "Settings",
  previewMode: "PREVIEW MODE", searchPlaceholder: "Search this page…", yourItems: "Your items", availableTools: "Available tools",
  addItem: "Add item", savedOnDevice: "Saved on this device", loading: "Loading saved data…", saving: "Saving…", saved: "Saved on this device",
  ready: "Ready", retry: "Retry", storageLoadError: "Saved data could not be loaded. Your existing data has not been overwritten.",
  storageSaveError: "Your latest changes could not be saved. Check device storage and retry.", noResults: "No matching items. Try another search.",
  shownCount: "{count} shown", completedCount: "{count} completed", preferences: "PREFERENCES", chooseLanguage: "Choose your language",
  languageSaved: "Your language choice is saved on this device. It will be used the next time you open NOVARA.",
  languageSaveFailed: "Your language changed for this session, but the preference could not be saved on this device.",
  languageEnglish: "English", languageKinyarwanda: "Kinyarwanda", languageFrench: "French",
  homeEyebrow: "YOUR PERSONAL SPACE", homeHeroTitle: "Make room for what's next.", homeHeroCopy: "A clearer way to learn, create, and move your ideas forward.",
  homeExplore: "Explore NOVARA", homeOverview: "Your overview", homeOverviewSub: "A fresh start begins here", today: "TODAY",
  homeActiveProjects: "ACTIVE PROJECTS", homeLearningTime: "LEARNING TIME", homeMomentum: "YOUR MOMENTUM",
  homeReady: "Ready when you are", homeJourney: "Your journey starts now", homeHabit: "Build your first habit",
  homePossibilities: "A world of possibilities", homeChooseStart: "Choose where you want to begin",
  actionAI: "AI Assistant", actionAIDetail: "Think, create and explore", actionLearning: "Learning", actionLearningDetail: "Grow your knowledge",
  actionProjects: "Projects", actionProjectsDetail: "Bring ideas to life", actionInsights: "Insights", actionInsightsDetail: "See your progress",
  footerTagline: "One platform. Infinite possibilities.", notifications: "Notifications",
  workspaceEyebrow: "YOUR DIGITAL HQ", workspaceTitle: "Workspace", workspaceDescription: "Your tools for planning, learning, creating, and working — organized in one place.",
  workspaceBannerTitle: "One connected workspace", workspaceBannerBody: "Open a module to explore its current capabilities.",
  workspaceNotice: "Some modules are interactive previews. Cloud sync, authentication, messaging, and AI services are not connected yet.",
  moduleTasks: "Tasks & focus", moduleTasksDetail: "Priorities and action lists", moduleNotes: "Notes & ideas", moduleNotesDetail: "Capture and organize knowledge",
  moduleGoals: "Goals & habits", moduleGoalsDetail: "Build momentum over time", moduleCalendar: "Calendar", moduleCalendarDetail: "Events and planning",
  moduleLearning: "Learning studio", moduleLearningDetail: "Skills and study paths", moduleBusiness: "Business hub", moduleBusinessDetail: "Teams and operations",
  moduleAI: "NOVARA AI", moduleAIDetail: "Intelligent workflows (planned)", moduleAnalytics: "Analytics", moduleAnalyticsDetail: "Progress and reports",
  moduleMessages: "Messages", moduleMessagesDetail: "Collaboration (planned)", moduleNotifications: "Notifications", moduleNotificationsDetail: "Updates and reminders",
  moduleSettings: "Settings", moduleSettingsDetail: "Preferences and controls", moduleHelp: "Help center", moduleHelpDetail: "Guides and support",
  discoverEyebrow: "EXPLORE", discoverTitle: "Find your next possibility.", discoverSub: "Explore the spaces that make NOVARA yours.",
  discoverIdeas: "Ideas & inspiration", discoverIdeasDetail: "A space for fresh thinking and creative exploration.",
  discoverLearning: "Learning journeys", discoverLearningDetail: "Build skills through focused learning experiences.",
  discoverCommunity: "Community", discoverCommunityDetail: "Connect, collaborate, and share what you create.",
  discoverAI: "AI experiences", discoverAIDetail: "Discover helpful intelligent tools as they arrive.",
  discoverMore: "More experiences will be added as the product requirements are finalized.",
  profileEyebrow: "ACCOUNT", profileTitle: "Your profile", profileWelcome: "Welcome to NOVARA",
  profilePlaceholder: "Your personal profile will appear here", guestPreview: "GUEST PREVIEW", profilePreferences: "PREFERENCES",
  profilePersonal: "Personal details", profilePrivacy: "Privacy & security", profileNotifications: "Notifications", profileHelp: "Help & support",
  profileDisclaimer: "Account management and secure sign-in will be implemented after the authentication requirements are approved.",
  settingsEyebrow: "PREFERENCES", settingsTitle: "Language & settings", settingsSub: "Choose the language used across NOVARA.",
  settingsSaved: "This preview stores changes only on this device. It does not provide cloud backup or account sync.",
} as const;

export type MessageKey = keyof typeof english;
const translations: Record<Locale, Record<MessageKey, string>> = {
  en: english,
  rw: {
    navHome: "Ahabanza", navDiscover: "Shakisha", navTasks: "Imirimo", navWorkspace: "Aho ukorera", navProfile: "Umwirondoro", navSettings: "Igenamiterere",
    previewMode: "IGERAGEZA", searchPlaceholder: "Shakisha hano…", yourItems: "Ibintu byawe", availableTools: "Ibikoresho bihari",
    addItem: "Ongeraho", savedOnDevice: "Byabitswe kuri iki gikoresho", loading: "Gufungura amakuru wabikitse…", saving: "Kubika…", saved: "Byabitswe kuri iki gikoresho",
    ready: "Byiteguye", retry: "Ongera ugerageze", storageLoadError: "Amakuru wabikitse ntiyafungutse. Amakuru asanzwe ntiyahinduwe.",
    storageSaveError: "Impinduka zawe ntizabashije kubikwa. Reba ububiko bw'iki gikoresho wongere ugerageze.", noResults: "Nta bintu bihuye n'ibyo washakishije. Gerageza andi magambo.",
    shownCount: "{count} bigaragara", completedCount: "{count} byarangiye", preferences: "IBYO UKUNDA", chooseLanguage: "Hitamo ururimi",
    languageSaved: "Ururimi wahisemo rubikwa kuri iki gikoresho kandi ruzakoreshwa ubutaha ufunguye NOVARA.",
    languageSaveFailed: "Ururimi rwahindutse muri iyi nshuro, ariko ntirwabashije kubikwa kuri iki gikoresho.",
    languageEnglish: "Icyongereza", languageKinyarwanda: "Ikinyarwanda", languageFrench: "Igifaransa",
    homeEyebrow: "AHO UKORERA", homeHeroTitle: "Tegura ibizakurikiraho.", homeHeroCopy: "Uburyo bworoshye bwo kwiga, guhanga no guteza imbere ibitekerezo byawe.",
    homeExplore: "Shakisha NOVARA", homeOverview: "Incamake yawe", homeOverviewSub: "Intangiriro nshya itangirira hano", today: "UYU MUNSI",
    homeActiveProjects: "IMISHINGA IKORA", homeLearningTime: "IGIHE CYO KWIGA", homeMomentum: "ITERAMBERE RYAWE",
    homeReady: "Igihe witeguye", homeJourney: "Urugendo rwawe rutangiye", homeHabit: "Tangira ingeso yawe ya mbere",
    homePossibilities: "Amahirwe menshi", homeChooseStart: "Hitamo aho ushaka gutangirira",
    actionAI: "Umufasha wa AI", actionAIDetail: "Tekereza, hanga kandi ushakishe", actionLearning: "Kwiga", actionLearningDetail: "Ongera ubumenyi bwawe",
    actionProjects: "Imishinga", actionProjectsDetail: "Hindura ibitekerezo ibikorwa", actionInsights: "Isesengura", actionInsightsDetail: "Reba aho ugeze",
    footerTagline: "Urubuga rumwe. Amahirwe atagira iherezo.", notifications: "Imenyesha",
    workspaceEyebrow: "ICYICARO CYAWE KORANABUHANGA", workspaceTitle: "Aho ukorera", workspaceDescription: "Ibikoresho byo gutegura, kwiga, guhanga no gukora, byose ahantu hamwe.",
    workspaceBannerTitle: "Aho ukorera hahujwe", workspaceBannerBody: "Fungura igice kugira ngo urebe ibyo gishobora gukora ubu.",
    workspaceNotice: "Ibice bimwe ni iby'igerageza. Guhuza amakuru kuri interineti, kwinjira muri konti, ubutumwa na serivisi za AI ntibirahuzwa.",
    moduleTasks: "Imirimo no kwibanda", moduleTasksDetail: "Iby'ingenzi n'urutonde rw'imirimo", moduleNotes: "Inyandiko n'ibitekerezo", moduleNotesDetail: "Bika kandi utegure ubumenyi",
    moduleGoals: "Intego n'ingeso", moduleGoalsDetail: "Komeza gutera imbere", moduleCalendar: "Kalendari", moduleCalendarDetail: "Ibirori n'igenamigambi",
    moduleLearning: "Ahigishirizwa", moduleLearningDetail: "Ubumenyi n'inzira zo kwiga", moduleBusiness: "Ihuriro ry'ubucuruzi", moduleBusinessDetail: "Amakipe n'ibikorwa",
    moduleAI: "NOVARA AI", moduleAIDetail: "Ibikorwa by'ubwenge (biteganyijwe)", moduleAnalytics: "Isesengura", moduleAnalyticsDetail: "Iterambere na raporo",
    moduleMessages: "Ubutumwa", moduleMessagesDetail: "Ubufatanye (burateganywa)", moduleNotifications: "Imenyesha", moduleNotificationsDetail: "Amakuru n'ibyibutsa",
    moduleSettings: "Igenamiterere", moduleSettingsDetail: "Ibyo ukunda n'igenzura", moduleHelp: "Ubufasha", moduleHelpDetail: "Amabwiriza n'ubufasha",
    discoverEyebrow: "SHAKISHA", discoverTitle: "Shaka amahirwe mashya.", discoverSub: "Menya ibice bituma NOVARA iba urubuga rwawe.",
    discoverIdeas: "Ibitekerezo n'ubuhanga", discoverIdeasDetail: "Ahantu ho gutekereza no guhanga udushya.",
    discoverLearning: "Inzira zo kwiga", discoverLearningDetail: "Ongera ubumenyi ukoresheje amasomo ateguye.",
    discoverCommunity: "Umuryango", discoverCommunityDetail: "Huza abantu, mukorane kandi musangize ibyo muhanga.",
    discoverAI: "Ibikoresho bya AI", discoverAIDetail: "Menya ibikoresho by'ubwenge buhangano uko bizagenda byongerwamo.",
    discoverMore: "Ibindi bikorwa bizongerwamo ibisabwa by'igicuruzwa bimaze gusobanuka.",
    profileEyebrow: "KONTI", profileTitle: "Umwirondoro wawe", profileWelcome: "Murakaza neza muri NOVARA",
    profilePlaceholder: "Umwirondoro wawe uzagaragara hano", guestPreview: "IGERAGEZA RY'UMUSHYITSI", profilePreferences: "IBYO UKUNDA",
    profilePersonal: "Amakuru bwite", profilePrivacy: "Ibanga n'umutekano", profileNotifications: "Imenyesha", profileHelp: "Ubufasha",
    profileDisclaimer: "Gucunga konti no kwinjira mu buryo bwizewe bizakorwa ibisabwa by'umutekano bimaze kwemezwa.",
    settingsEyebrow: "IBYO UKUNDA", settingsTitle: "Ururimi n'igenamiterere", settingsSub: "Hitamo ururimi ruzakoreshwa muri NOVARA.",
    settingsSaved: "Impinduka zo muri iyi verisiyo zibikwa kuri iki gikoresho gusa. Nta bubiko bwo kuri interineti cyangwa guhuza konti bihari.",
  },
  fr: {
    navHome: "Accueil", navDiscover: "Découvrir", navTasks: "Tâches", navWorkspace: "Espace", navProfile: "Profil", navSettings: "Paramètres",
    previewMode: "MODE APERÇU", searchPlaceholder: "Rechercher sur cette page…", yourItems: "Vos éléments", availableTools: "Outils disponibles",
    addItem: "Ajouter", savedOnDevice: "Enregistré sur cet appareil", loading: "Chargement des données…", saving: "Enregistrement…", saved: "Enregistré sur cet appareil",
    ready: "Prêt", retry: "Réessayer", storageLoadError: "Les données enregistrées n'ont pas pu être chargées. Vos données existantes n'ont pas été remplacées.",
    storageSaveError: "Vos dernières modifications n'ont pas pu être enregistrées. Vérifiez le stockage de l'appareil et réessayez.", noResults: "Aucun élément correspondant. Essayez une autre recherche.",
    shownCount: "{count} affichés", completedCount: "{count} terminés", preferences: "PRÉFÉRENCES", chooseLanguage: "Choisissez votre langue",
    languageSaved: "Votre choix de langue est enregistré sur cet appareil et sera utilisé à la prochaine ouverture de NOVARA.",
    languageSaveFailed: "La langue a changé pour cette session, mais la préférence n'a pas pu être enregistrée sur cet appareil.",
    languageEnglish: "Anglais", languageKinyarwanda: "Kinyarwanda", languageFrench: "Français",
    homeEyebrow: "VOTRE ESPACE PERSONNEL", homeHeroTitle: "Faites place à la suite.", homeHeroCopy: "Une façon plus claire d'apprendre, de créer et de faire avancer vos idées.",
    homeExplore: "Explorer NOVARA", homeOverview: "Votre aperçu", homeOverviewSub: "Un nouveau départ commence ici", today: "AUJOURD'HUI",
    homeActiveProjects: "PROJETS ACTIFS", homeLearningTime: "TEMPS D'APPRENTISSAGE", homeMomentum: "VOTRE ÉLAN",
    homeReady: "Prêt quand vous l'êtes", homeJourney: "Votre parcours commence", homeHabit: "Créez votre première habitude",
    homePossibilities: "Un monde de possibilités", homeChooseStart: "Choisissez par où commencer",
    actionAI: "Assistant IA", actionAIDetail: "Réfléchir, créer et explorer", actionLearning: "Apprentissage", actionLearningDetail: "Développez vos connaissances",
    actionProjects: "Projets", actionProjectsDetail: "Donnez vie à vos idées", actionInsights: "Analyses", actionInsightsDetail: "Suivez vos progrès",
    footerTagline: "Une plateforme. Des possibilités infinies.", notifications: "Notifications",
    workspaceEyebrow: "VOTRE ESPACE NUMÉRIQUE", workspaceTitle: "Espace de travail", workspaceDescription: "Vos outils de planification, d'apprentissage, de création et de travail, réunis au même endroit.",
    workspaceBannerTitle: "Un espace de travail connecté", workspaceBannerBody: "Ouvrez un module pour découvrir ses fonctions actuelles.",
    workspaceNotice: "Certains modules sont des aperçus interactifs. La synchronisation cloud, l'authentification, la messagerie et les services IA ne sont pas connectés.",
    moduleTasks: "Tâches et concentration", moduleTasksDetail: "Priorités et listes d'actions", moduleNotes: "Notes et idées", moduleNotesDetail: "Capturer et organiser les connaissances",
    moduleGoals: "Objectifs et habitudes", moduleGoalsDetail: "Progresser dans la durée", moduleCalendar: "Calendrier", moduleCalendarDetail: "Événements et planification",
    moduleLearning: "Espace d'apprentissage", moduleLearningDetail: "Compétences et parcours d'étude", moduleBusiness: "Espace entreprise", moduleBusinessDetail: "Équipes et opérations",
    moduleAI: "NOVARA AI", moduleAIDetail: "Flux intelligents (prévus)", moduleAnalytics: "Analyses", moduleAnalyticsDetail: "Progrès et rapports",
    moduleMessages: "Messages", moduleMessagesDetail: "Collaboration (prévue)", moduleNotifications: "Notifications", moduleNotificationsDetail: "Actualités et rappels",
    moduleSettings: "Paramètres", moduleSettingsDetail: "Préférences et contrôles", moduleHelp: "Centre d'aide", moduleHelpDetail: "Guides et assistance",
    discoverEyebrow: "EXPLORER", discoverTitle: "Trouvez votre prochaine possibilité.", discoverSub: "Explorez les espaces qui font de NOVARA votre plateforme.",
    discoverIdeas: "Idées et inspiration", discoverIdeasDetail: "Un espace pour réfléchir et explorer de nouvelles idées.",
    discoverLearning: "Parcours d'apprentissage", discoverLearningDetail: "Développez vos compétences grâce à des expériences ciblées.",
    discoverCommunity: "Communauté", discoverCommunityDetail: "Échangez, collaborez et partagez vos créations.",
    discoverAI: "Expériences IA", discoverAIDetail: "Découvrez les outils intelligents au fur et à mesure de leur arrivée.",
    discoverMore: "D'autres expériences seront ajoutées lorsque les besoins du produit seront finalisés.",
    profileEyebrow: "COMPTE", profileTitle: "Votre profil", profileWelcome: "Bienvenue sur NOVARA",
    profilePlaceholder: "Votre profil personnel apparaîtra ici", guestPreview: "APERÇU INVITÉ", profilePreferences: "PRÉFÉRENCES",
    profilePersonal: "Informations personnelles", profilePrivacy: "Confidentialité et sécurité", profileNotifications: "Notifications", profileHelp: "Aide et assistance",
    profileDisclaimer: "La gestion du compte et la connexion sécurisée seront développées après validation des exigences d'authentification.",
    settingsEyebrow: "PRÉFÉRENCES", settingsTitle: "Langue et paramètres", settingsSub: "Choisissez la langue utilisée dans NOVARA.",
    settingsSaved: "Les modifications de cet aperçu sont stockées uniquement sur cet appareil. Il n'y a ni sauvegarde cloud ni synchronisation de compte.",
  },
};

export type MessageKey = keyof typeof english;
type I18nValue = {
  locale: Locale;
  isLocaleReady: boolean;
  preferenceError: boolean;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function detectDeviceLocale(): Locale {
  try {
    const first = getLocales()[0];
    const code = (first?.languageCode ?? first?.languageTag?.split("-")[0] ?? "en").toLowerCase();
    return code === "rw" ? "rw" : code === "fr" ? "fr" : "en";
  } catch {
    return "en";
  }
}

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "rw" || value === "fr";
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectDeviceLocale);
  const [isLocaleReady, setIsLocaleReady] = useState(false);
  const [preferenceError, setPreferenceError] = useState(false);

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      try {
        const saved = await readPreference("locale");
        if (isLocale(saved)) {
          if (active) setLocaleState(saved);
          return;
        }
        const legacy = await readLegacyPreference("locale");
        if (isLocale(legacy)) {
          if (active) setLocaleState(legacy);
          await writePreference("locale", legacy);
          await removeLegacyPreference("locale");
        }
      } catch {
        if (active) setPreferenceError(true);
      } finally {
        if (active) setIsLocaleReady(true);
      }
    };
    void hydrate();
    return () => { active = false; };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setPreferenceError(false);
    void writePreference("locale", next).catch(() => setPreferenceError(true));
  }, []);

  const t = useCallback((key: MessageKey) => translations[locale][key] ?? translations.en[key], [locale]);
  const value = useMemo(() => ({ locale, isLocaleReady, preferenceError, setLocale, t }), [locale, isLocaleReady, preferenceError, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside LocalizationProvider");
  return context;
}
