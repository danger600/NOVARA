import type { CollectionName } from "./storage-repository";

export type FeatureId = "tasks" | "notes" | "goals" | "calendar" | "learning" | "business" | "ai" | "analytics" | "messages" | "notifications" | "help";
export type FeatureItem = { id: string; title: string; detail: string };
export type FeatureCopy = {
  eyebrow: string;
  title: string;
  description: string;
  collection: CollectionName | null;
  inputHint: string;
  previewNote: string;
  items: FeatureItem[];
};
type ModuleCopy = { title: string; detail: string };
export type Messages = {
  nav: { home: string; discover: string; tasks: string; workspace: string; profile: string; settings: string };
  common: {
    preview: string; search: string; items: string; tools: string; add: string;
    noResults: string; retry: string; loading: string; loadError: string; saveError: string;
    saving: string; localOnly: string; userAdded: string; shown: string; completed: string;
    capabilities: string; searchAccessibility: string; addAccessibility: string;
  };
  home: {
    eyebrow: string; title: string; description: string; explore: string; overview: string;
    freshStart: string; today: string; activeProjects: string; learningTime: string;
    momentum: string; readyWhen: string; journeyStarts: string; newLabel: string;
    buildHabit: string; possibilities: string; chooseBegin: string;
    ai: string; aiDetail: string; learning: string; learningDetail: string;
    projects: string; projectsDetail: string; insights: string; insightsDetail: string;
    tagline: string; notifications: string;
  };
  discover: {
    kicker: string; title: string; subtitle: string; ideas: string; ideasText: string;
    learning: string; learningText: string; community: string; communityText: string;
    ai: string; aiText: string; note: string;
  };
  workspace: {
    kicker: string; title: string; subtitle: string; bannerTitle: string; bannerText: string; tip: string;
    modules: Record<FeatureId, ModuleCopy> & { settings: ModuleCopy; help: ModuleCopy };
  };
  profile: {
    kicker: string; title: string; welcome: string; placeholder: string; guest: string;
    preferences: string; personal: string; privacy: string; notifications: string; help: string; disclaimer: string;
  };
  settings: {
    kicker: string; title: string; subtitle: string; english: string; kinyarwanda: string; french: string;
    saved: string; savingFailed: string;
  };
  features: Record<FeatureId, FeatureCopy>;
};

const feature = (
  eyebrow: string, title: string, description: string, collection: CollectionName | null,
  inputHint: string, previewNote: string, items: [string, string, string][]
): FeatureCopy => ({
  eyebrow, title, description, collection, inputHint, previewNote,
  items: items.map(([id, itemTitle, detail]) => ({ id, title: itemTitle, detail })),
});

const en: Messages = {
  nav: { home: "Home", discover: "Discover", tasks: "Tasks", workspace: "Workspace", profile: "Profile", settings: "Settings" },
  common: {
    preview: "PREVIEW MODE", search: "Search this page…", items: "Your items", tools: "Available tools",
    add: "Add item", noResults: "No matching items. Try another search.", retry: "Try again",
    loading: "Loading your saved data…", loadError: "Saved data could not be loaded safely. Your original data has not been changed.",
    saveError: "Your changes could not be saved on this device. Check available storage and try again.",
    saving: "Saving…", localOnly: "Saved only on this device. Cloud sync and account-based backup are not connected.",
    userAdded: "Added by you", shown: "{count} shown", completed: "{completed} of {total} completed",
    capabilities: "{count} capabilities to explore", searchAccessibility: "Search this page", addAccessibility: "Add item", footer: "NOVARA · ONE PLATFORM. INFINITE POSSIBILITIES.",
  },
  home: {
    eyebrow: "YOUR PERSONAL SPACE", title: "Make room for\nwhat's next.",
    description: "A clearer way to learn, create, and move your ideas forward.", explore: "Explore NOVARA",
    overview: "Your overview", freshStart: "A fresh start begins here", today: "TODAY",
    activeProjects: "ACTIVE PROJECTS", learningTime: "LEARNING TIME", momentum: "YOUR MOMENTUM",
    readyWhen: "Ready when you are", journeyStarts: "Your journey starts now", newLabel: "New",
    buildHabit: "Build your first habit", possibilities: "A world of possibilities",
    chooseBegin: "Choose where you want to begin", ai: "AI Assistant", aiDetail: "Think, create and explore",
    learning: "Learning", learningDetail: "Grow your knowledge", projects: "Projects",
    projectsDetail: "Bring ideas to life", insights: "Insights", insightsDetail: "See your progress",
    tagline: "One platform. Infinite possibilities.", notifications: "Notifications",
  },
  discover: {
    kicker: "EXPLORE", title: "Find your next\npossibility.", subtitle: "Explore the spaces that make NOVARA yours.",
    ideas: "Ideas & inspiration", ideasText: "A space for fresh thinking and creative exploration.",
    learning: "Learning journeys", learningText: "Build skills through focused learning experiences.",
    community: "Community", communityText: "Connect, collaborate, and share what you create.",
    ai: "AI experiences", aiText: "Discover helpful intelligent tools as they arrive.",
    note: "More experiences will be added as product requirements are finalized.",
  },
  workspace: {
    kicker: "YOUR DIGITAL HQ", title: "Workspace",
    subtitle: "Your tools for planning, learning, creating, and working — organized in one place.",
    bannerTitle: "One connected workspace", bannerText: "Open a module to explore its current capabilities.",
    tip: "Some modules are interactive previews. Cloud sync, authentication, messaging, and AI services are not connected yet.",
    modules: {
      tasks: { title: "Tasks & focus", detail: "Priorities and action lists" },
      notes: { title: "Notes & ideas", detail: "Capture and organize knowledge" },
      goals: { title: "Goals & habits", detail: "Build momentum over time" },
      calendar: { title: "Calendar", detail: "Events and planning" },
      learning: { title: "Learning studio", detail: "Skills and study paths" },
      business: { title: "Business hub", detail: "Teams and operations" },
      ai: { title: "NOVARA AI", detail: "Intelligent workflows (planned)" },
      analytics: { title: "Analytics", detail: "Progress and reports" },
      messages: { title: "Messages", detail: "Collaboration (planned)" },
      notifications: { title: "Notifications", detail: "Updates and reminders" },
      help: { title: "Help center", detail: "Guides and support" },
      settings: { title: "Settings", detail: "Preferences and controls" },
    },
  },
  profile: {
    kicker: "ACCOUNT", title: "Your profile", welcome: "Welcome to NOVARA",
    placeholder: "Your personal profile will appear here", guest: "GUEST PREVIEW",
    preferences: "PREFERENCES", personal: "Personal details", privacy: "Privacy & security",
    notifications: "Notifications", help: "Help & support",
    disclaimer: "Account management and secure sign-in will be implemented after authentication requirements are approved.",
  },
  settings: {
    kicker: "PREFERENCES", title: "Language & settings", subtitle: "Choose the language used across NOVARA.",
    english: "English", kinyarwanda: "Kinyarwanda", french: "French",
    saved: "Your language choice is saved on this device.", savingFailed: "The saved language preference could not be read or updated. NOVARA is using a safe fallback for this session.",
  },
  features: {
    tasks: feature("PRODUCTIVITY", "Tasks & focus", "Capture priorities, make progress, and keep your next action visible.", "tasks", "What needs to get done?", "Your tasks are stored locally on this device.", [
      ["sample-plan", "Plan your week", "Break your goals into manageable steps"],
      ["sample-priority", "Choose today's priority", "Focus on the task with the highest impact"],
      ["sample-review", "Review completed work", "Reflect on what moved forward"],
    ]),
    notes: feature("KNOWLEDGE", "Notes & ideas", "Collect thoughts, meeting notes, research, and ideas in one place.", "notes", "Write a note title…", "Your notes are stored locally on this device.", [
      ["sample-quick", "Quick notes", "Capture an idea before it disappears"],
      ["sample-meeting", "Meeting notes", "Record decisions and action items"],
      ["sample-research", "Research library", "Keep useful references together"],
    ]),
    goals: feature("PERSONAL GROWTH", "Goals & habits", "Turn long-term ambitions into small, repeatable actions.", "goals", "Add a goal or habit…", "Your goals are stored locally on this device.", [
      ["sample-goal", "Set a meaningful goal", "Define an outcome and a target date"],
      ["sample-habit", "Build a daily habit", "Choose a small action you can repeat"],
      ["sample-progress", "Review your progress", "Adjust your plan as you learn"],
    ]),
    calendar: feature("PLANNING", "Calendar & schedule", "Bring events, deadlines, and focused work sessions into one view.", null, "Add a new item…", "Calendar connections and event reminders are not connected in this preview.", [
      ["day", "Day planning", "Organize today's time blocks"],
      ["events", "Upcoming events", "Keep important dates visible"],
      ["deadlines", "Deadline tracking", "Plan backward from key milestones"],
      ["focus", "Focus sessions", "Reserve uninterrupted time for deep work"],
    ]),
    learning: feature("LEARNING", "Learning studio", "Create a personal learning path and build skills at your own pace.", null, "Add a new item…", "Learning paths are preview content and are not synced to an account.", [
      ["paths", "Learning paths", "Organize skills into clear milestones"],
      ["cards", "Flashcards", "Practice recall with short review sessions"],
      ["planner", "Study planner", "Schedule lessons and revision time"],
      ["reading", "Reading list", "Save topics and resources to explore"],
      ["skills", "Skill tracker", "Record progress as you improve"],
    ]),
    business: feature("BUSINESS", "Business hub", "A foundation for teams, customers, operations, and business growth.", null, "Add a new item…", "Business workflows are a product preview; no business backend is connected.", [
      ["operations", "Project operations", "Coordinate work, owners, and milestones"],
      ["customers", "Customer relationships", "Organize customer information and follow-ups"],
      ["finance", "Finance overview", "Plan budgets and monitor business indicators"],
      ["team", "Team directory", "Keep roles and responsibilities clear"],
      ["documents", "Documents & proposals", "Prepare and organize business documents"],
    ]),
    ai: feature("INTELLIGENCE", "NOVARA AI studio", "A future home for focused AI tools, assistants, and creative workflows.", null, "Add a new item…", "These are planned AI experiences. No AI provider or model is connected in this preview.", [
      ["writing", "Writing assistant", "Draft, rewrite, and improve content"],
      ["research", "Research assistant", "Organize questions and source notes"],
      ["study", "Study companion", "Explain topics and generate practice"],
      ["ideas", "Idea generator", "Explore concepts and creative directions"],
      ["workflow", "Workflow assistant", "Break complex work into clear steps"],
    ]),
    analytics: feature("INSIGHTS", "Analytics & reports", "Understand activity, progress, and outcomes with useful reports.", null, "Add a new item…", "Analytics are illustrative. Live activity data is not connected.", [
      ["productivity", "Personal productivity", "Review tasks and focus patterns"],
      ["progress", "Learning progress", "Track completed lessons and skills"],
      ["health", "Project health", "Monitor milestones and delivery status"],
      ["exports", "Exportable reports", "Prepare summaries for sharing"],
    ]),
    messages: feature("COLLABORATION", "Messages & community", "A planned space for conversations, groups, and shared work.", null, "Add a new item…", "Messaging is planned. Real-time delivery, moderation, and secure storage are not connected.", [
      ["direct", "Direct messages", "One-to-one conversations"],
      ["channels", "Team channels", "Discuss work by topic or project"],
      ["groups", "Community groups", "Connect around shared interests"],
      ["files", "File sharing", "Share documents with collaborators"],
    ]),
    notifications: feature("UPDATES", "Notifications", "A central place for reminders, updates, and important activity.", null, "Add a new item…", "Notifications are sample content; push delivery is not connected.", [
      ["reminders", "Task reminders", "Stay aware of upcoming priorities"],
      ["updates", "Project updates", "Follow important changes"],
      ["learning", "Learning reminders", "Keep your study rhythm"],
      ["alerts", "Account alerts", "Review important security notices"],
    ]),
    help: feature("SUPPORT", "Help center", "Find guidance, product information, and ways to get support.", null, "Add a new item…", "Help topics are preview content. Support ticket submission is not connected.", [
      ["start", "Getting started", "Learn the main areas of NOVARA"],
      ["faq", "Frequently asked questions", "Find answers to common product questions"],
      ["report", "Report a problem", "Prepare a clear issue report"],
      ["accessibility", "Accessibility support", "Get help using the platform"],
      ["about", "About NOVARA", "Product information and release notes"],
    ]),
  },
};

const rw: Messages = {
  nav: { home: "Ahabanza", discover: "Shakisha", tasks: "Imirimo", workspace: "Aho ukorera", profile: "Umwirondoro", settings: "Igenamiterere" },
  common: {
    preview: "IGERAGEZA", search: "Shakisha kuri uru rupapuro…", items: "Ibintu byawe", tools: "Ibikoresho bihari",
    add: "Ongeraho", noResults: "Nta kintu gihuye n'ibyo ushakisha. Gerageza ubundi bushakashatsi.",
    retry: "Ongera ugerageze", loading: "Turimo gufungura amakuru wabikitse…",
    loadError: "Amakuru wabikitse ntiyashoboye gusomwa neza. Umwimerere wayo ntiwahinduwe.",
    saveError: "Impinduka zawe ntizabitswe kuri iki gikoresho. Reba umwanya uhari wongere ugerageze.",
    saving: "Turabika…", localOnly: "Bibikwa kuri iki gikoresho gusa. Nta kubika kuri murandasi cyangwa kuri konti bihari.",
    userAdded: "Wowe ni wowe wabyongereyeho", shown: "Hagaragajwe {count}", completed: "{completed} kuri {total} byarangiye",
    capabilities: "Ibikorwa {count} ushobora kureba", searchAccessibility: "Shakisha kuri uru rupapuro", addAccessibility: "Ongeraho ikintu", footer: "NOVARA · URUBUGA RUMWE. AMAHIRWE ATAGIRA IHEREZO.",
  },
  home: {
    eyebrow: "AHO WIKORERA", title: "Tegura umwanya w'ibizaza.",
    description: "Uburyo bworoshye bwo kwiga, guhanga no guteza imbere ibitekerezo byawe.",
    explore: "Shakisha NOVARA", overview: "Incamake yawe", freshStart: "Intangiriro nshya itangirira hano",
    today: "UYU MUNSI", activeProjects: "IMishinga IKORA", learningTime: "IGIHE CYO KWIGA",
    momentum: "ITERAMBERE RYAWE", readyWhen: "Witeguye igihe cyose", journeyStarts: "Urugendo rwawe rutangiye ubu",
    newLabel: "Bishya", buildHabit: "Tangira umuco wawe wa mbere", possibilities: "Amahirwe menshi",
    chooseBegin: "Hitamo aho ushaka guhera", ai: "Umufasha wa AI", aiDetail: "Tekereza, hanga kandi ushakishe",
    learning: "Kwiga", learningDetail: "Ongera ubumenyi bwawe", projects: "Imishinga",
    projectsDetail: "Hindura ibitekerezo ibikorwa", insights: "Isesengura", insightsDetail: "Reba aho ugeze",
    tagline: "Urubuga rumwe. Amahirwe atagira iherezo.", notifications: "Ubutumwa bushya",
  },
  discover: {
    kicker: "SHAKISHA", title: "Menya amahirwe\nakurikiraho.", subtitle: "Shakisha ahantu hatuma NOVARA iba urubuga rwawe.",
    ideas: "Ibitekerezo n'ubuhanzi", ideasText: "Ahantu ho gutekereza bishya no guhanga.",
    learning: "Ingendo zo kwiga", learningText: "Wunguke ubumenyi binyuze mu masomo ateguye neza.",
    community: "Umuryango", communityText: "Huza n'abandi, mukorane kandi musangize ibyo mwaremye.",
    ai: "Serivisi za AI", aiText: "Menya ibikoresho by'ubwenge bizagenda byongerwamo.",
    note: "Ibindi bikorwa bizongerwaho ibisabwa bimaze kunozwa.",
  },
  workspace: {
    kicker: "AHO UKORERA", title: "Aho ukorera",
    subtitle: "Ibikoresho byo gutegura, kwiga, guhanga no gukora, byose hamwe.",
    bannerTitle: "Aho ukorera hamwe", bannerText: "Fungura igice kugira ngo urebe ibyo gishobora gukora ubu.",
    tip: "Hari ibice bikiri mu igerageza. Guhuza amakuru kuri murandasi, kwinjira muri konti, ubutumwa na AI ntibirashyirwaho.",
    modules: {
      tasks: { title: "Imirimo no kwibanda", detail: "Iby'ingenzi n'urutonde rw'imirimo" },
      notes: { title: "Inyandiko n'ibitekerezo", detail: "Bika kandi utegure ubumenyi" },
      goals: { title: "Intego n'umuco", detail: "Komeza gutera imbere" },
      calendar: { title: "Kalendari", detail: "Ibirori no gutegura gahunda" },
      learning: { title: "Ahigishirizwa", detail: "Ubumenyi n'inzira zo kwiga" },
      business: { title: "Ibikorwa by'ubucuruzi", detail: "Amakipe n'imikorere" },
      ai: { title: "NOVARA AI", detail: "Imirimo ifashwa n'ubwenge (iteganyijwe)" },
      analytics: { title: "Isesengura", detail: "Iterambere na raporo" },
      messages: { title: "Ubutumwa", detail: "Gukorana n'abandi (birateganywa)" },
      notifications: { title: "Ubutumwa bushya", detail: "Amakuru n'ibibutsa" },
      help: { title: "Ubufasha", detail: "Amabwiriza n'ubufasha" },
      settings: { title: "Igenamiterere", detail: "Ibyifuzo n'igenzura" },
    },
  },
  profile: {
    kicker: "KONTI", title: "Umwirondoro wawe", welcome: "Murakaza neza muri NOVARA",
    placeholder: "Umwirondoro wawe uzagaragara hano", guest: "IGERAGEZA RY'UMUSHYITSI",
    preferences: "IBYO UKUNDA", personal: "Amakuru bwite", privacy: "Ibanga n'umutekano",
    notifications: "Ubutumwa bushya", help: "Ubufasha",
    disclaimer: "Gucunga konti no kwinjira mu buryo burinzwe bizakorwa ibisabwa byemejwe.",
  },
  settings: {
    kicker: "IBYO UKUNDA", title: "Ururimi n'igenamiterere", subtitle: "Hitamo ururimi ukoresha muri NOVARA.",
    english: "Icyongereza", kinyarwanda: "Ikinyarwanda", french: "Igifaransa",
    saved: "Ururimi wahisemo rubikwa kuri iki gikoresho.", savingFailed: "Ibyerekeye ururimi ntibyashoboye gusomwa cyangwa kubikwa. NOVARA iri gukoresha ururimi rw'ibanze muri iyi nshuro.",
  },
  features: {
    tasks: feature("GUKORA NEZA", "Imirimo no kwibanda", "Andika iby'ingenzi, ukore intambwe ku yindi kandi umenye igikurikiraho.", "tasks", "Ni iki ugomba gukora?", "Imirimo yawe ibikwa kuri iki gikoresho.", [
      ["sample-plan", "Tegura icyumweru", "Gabanya intego zawe mo intambwe zoroshye"],
      ["sample-priority", "Hitamo umurimo w'uyu munsi", "Ibande ku murimo ufite akamaro kurusha indi"],
      ["sample-review", "Subiramo imirimo yarangiye", "Reba ibyo wagezeho"],
    ]),
    notes: feature("UBUMENYI", "Inyandiko n'ibitekerezo", "Bika ibitekerezo, inama, ubushakashatsi n'inyandiko ahantu hamwe.", "notes", "Andika umutwe w'inyandiko…", "Inyandiko zawe zibikwa kuri iki gikoresho.", [
      ["sample-quick", "Inyandiko ngufi", "Bika igitekerezo kitaribagirana"],
      ["sample-meeting", "Inyandiko z'inama", "Andika ibyemezo n'imirimo ikurikiraho"],
      ["sample-research", "Ububiko bw'ubushakashatsi", "Bika amasoko y'amakuru y'ingirakamaro"],
    ]),
    goals: feature("GUKURA", "Intego n'umuco", "Hindura inzozi z'igihe kirekire ibikorwa bito ushobora gusubiramo.", "goals", "Ongeraho intego cyangwa umuco…", "Intego zawe zibikwa kuri iki gikoresho.", [
      ["sample-goal", "Shyiraho intego ifite akamaro", "Sobanura icyo ushaka kugeraho n'igihe"],
      ["sample-habit", "Shyiraho umuco wa buri munsi", "Hitamo igikorwa gito ushobora gusubiramo"],
      ["sample-progress", "Reba iterambere ryawe", "Hindura gahunda uko ugenda wiga"],
    ]),
    calendar: feature("GUTEGURA", "Kalendari na gahunda", "Rebera hamwe ibirori, igihe ntarengwa n'amasaha yo gukora.", null, "Ongeraho ikintu…", "Guhuza kalendari no kwibutswa ibirori ntibirashyirwaho.", [
      ["day", "Gahunda y'umunsi", "Tegura amasaha y'uyu munsi"],
      ["events", "Ibirori biri imbere", "Jya ubona amatariki y'ingenzi"],
      ["deadlines", "Gukurikirana igihe ntarengwa", "Tegura uhereye ku matariki y'ingenzi"],
      ["focus", "Igihe cyo kwibanda", "Teganya igihe cyo gukora utarangazwa"],
    ]),
    learning: feature("KWIGA", "Ahigishirizwa", "Tegura inzira yo kwiga no kongera ubumenyi ku muvuduko wawe.", null, "Ongeraho ikintu…", "Inzira zo kwiga ni urugero; ntizihuzwa na konti.", [
      ["paths", "Inzira zo kwiga", "Tegura ubumenyi mu byiciro bisobanutse"],
      ["cards", "Amakarita yo kwibuka", "Itoze kwibuka ukoresheje amasomo magufi"],
      ["planner", "Gahunda yo kwiga", "Teganya amasomo n'igihe cyo kwisubiramo"],
      ["reading", "Urutonde rwo gusoma", "Bika ingingo n'amasoko yo gusoma"],
      ["skills", "Gukurikirana ubumenyi", "Andika iterambere ryawe"],
    ]),
    business: feature("UBUCURUZI", "Ibikorwa by'ubucuruzi", "Urufatiro rw'amakipe, abakiriya, imikorere no guteza imbere ubucuruzi.", null, "Ongeraho ikintu…", "Ibikorwa by'ubucuruzi ni urugero; nta bubiko bw'amakuru bwabyo buhari.", [
      ["operations", "Imicungire y'imishinga", "Huza imirimo, abayishinzwe n'intambwe"],
      ["customers", "Imibanire n'abakiriya", "Tegura amakuru y'abakiriya n'ibikurikiraho"],
      ["finance", "Incamake y'imari", "Tegura ingengo y'imari n'ibipimo by'ubucuruzi"],
      ["team", "Urutonde rw'ikipe", "Sobanura inshingano n'ububasha"],
      ["documents", "Inyandiko n'ibyifuzo", "Tegura inyandiko z'ubucuruzi"],
    ]),
    ai: feature("UBWENGE", "NOVARA AI", "Ahazaza hazaba ibikoresho bya AI, abafasha n'imikorere yo guhanga.", null, "Ongeraho ikintu…", "Ibi ni ibikorwa biteganyijwe. Nta serivisi cyangwa model ya AI ihujwe na NOVARA.", [
      ["writing", "Umufasha mu kwandika", "Andika, hindura kandi unoze inyandiko"],
      ["research", "Umufasha mu bushakashatsi", "Tegura ibibazo n'amasoko y'amakuru"],
      ["study", "Umufasha mu kwiga", "Sobanura ingingo kandi utegure imyitozo"],
      ["ideas", "Gutanga ibitekerezo", "Shakisha uburyo bushya bwo guhanga"],
      ["workflow", "Umufasha mu mirimo", "Gabanya imirimo ikomeye mo intambwe"],
    ]),
    analytics: feature("ISESENGURA", "Isesengura na raporo", "Sobanukirwa ibikorwa, iterambere n'ibyagezweho ukoresheje raporo.", null, "Ongeraho ikintu…", "Ibi bipimo ni urugero; amakuru y'ibikorwa nyayo ntarahuzwa.", [
      ["productivity", "Umusaruro wawe", "Subiramo imirimo n'igihe cyo kwibanda"],
      ["progress", "Iterambere mu kwiga", "Kurikirana amasomo n'ubumenyi warangije"],
      ["health", "Imimerere y'umushinga", "Kurikirana intambwe n'uko imirimo igeze"],
      ["exports", "Raporo zishobora koherezwa", "Tegura incamake yo gusangiza abandi"],
    ]),
    messages: feature("GUKORANA", "Ubutumwa n'umuryango", "Ahazaza hazaba ahantu ho kuganira, mu matsinda no gukorera hamwe.", null, "Ongeraho ikintu…", "Ubutumwa burateganywa. Kohereza ako kanya, kugenzura no kubika neza ntibirashyirwaho.", [
      ["direct", "Ubutumwa bw'umuntu ku giti cye", "Ibiganiro hagati y'abantu babiri"],
      ["channels", "Imiyoboro y'ikipe", "Muganire ku nsanganyamatsiko cyangwa umushinga"],
      ["groups", "Amatsinda y'umuryango", "Huza abantu bahuje inyungu"],
      ["files", "Gusangiza amadosiye", "Sangiza inyandiko abo mukorana"],
    ]),
    notifications: feature("AMAKURU", "Ubutumwa bushya", "Ahantu hamwe ho kubona ibyibutsa, amakuru n'ibikorwa by'ingenzi.", null, "Ongeraho ikintu…", "Ubutumwa bugaragara ni ingero; kohereza push ntibirashyirwaho.", [
      ["reminders", "Ibyibutsa imirimo", "Menya imirimo yegereje"],
      ["updates", "Amakuru y'imishinga", "Kurikirana impinduka z'ingenzi"],
      ["learning", "Ibyibutsa amasomo", "Komeza gahunda yo kwiga"],
      ["alerts", "Imenyesha rya konti", "Reba amakuru y'umutekano"],
    ]),
    help: feature("UBUFASHA", "Ahafasha", "Shaka amabwiriza, amakuru y'urubuga n'uburyo bwo kubona ubufasha.", null, "Ongeraho ikintu…", "Ingingo z'ubufasha ni urugero; kohereza ikibazo ntibirashyirwaho.", [
      ["start", "Tangira hano", "Menya ibice by'ingenzi bya NOVARA"],
      ["faq", "Ibibazo bikunze kubazwa", "Shaka ibisubizo by'ibibazo bisanzwe"],
      ["report", "Menyesha ikibazo", "Tegura ibisobanuro by'ikibazo"],
      ["accessibility", "Ubufasha bw'ikoreshwa", "Bona ubufasha bwo gukoresha urubuga"],
      ["about", "Ibyerekeye NOVARA", "Amakuru y'urubuga n'ibyavuguruwe"],
    ]),
  },
};

const fr: Messages = {
  nav: { home: "Accueil", discover: "Découvrir", tasks: "Tâches", workspace: "Espace de travail", profile: "Profil", settings: "Paramètres" },
  common: {
    preview: "MODE APERÇU", search: "Rechercher sur cette page…", items: "Vos éléments", tools: "Outils disponibles",
    add: "Ajouter", noResults: "Aucun résultat correspondant. Essayez une autre recherche.",
    retry: "Réessayer", loading: "Chargement de vos données enregistrées…",
    loadError: "Les données enregistrées n'ont pas pu être lues en toute sécurité. Les données d'origine sont intactes.",
    saveError: "Vos modifications n'ont pas pu être enregistrées sur cet appareil. Vérifiez l'espace disponible puis réessayez.",
    saving: "Enregistrement…", localOnly: "Enregistré sur cet appareil uniquement. La synchronisation cloud et la sauvegarde de compte ne sont pas disponibles.",
    userAdded: "Ajouté par vous", shown: "{count} affiché(s)", completed: "{completed} sur {total} terminé(s)",
    capabilities: "{count} fonctionnalités à découvrir", searchAccessibility: "Rechercher sur cette page", addAccessibility: "Ajouter un élément", footer: "NOVARA · UNE PLATEFORME. DES POSSIBILITÉS INFINIES.",
  },
  home: {
    eyebrow: "VOTRE ESPACE PERSONNEL", title: "Faites place\nà la suite.",
    description: "Une façon plus claire d'apprendre, de créer et de faire avancer vos idées.",
    explore: "Explorer NOVARA", overview: "Votre aperçu", freshStart: "Un nouveau départ commence ici",
    today: "AUJOURD'HUI", activeProjects: "PROJETS ACTIFS", learningTime: "TEMPS D'APPRENTISSAGE",
    momentum: "VOTRE ÉLAN", readyWhen: "Prêt quand vous l'êtes", journeyStarts: "Votre parcours commence maintenant",
    newLabel: "Nouveau", buildHabit: "Créez votre première habitude", possibilities: "Un monde de possibilités",
    chooseBegin: "Choisissez par où commencer", ai: "Assistant IA", aiDetail: "Réfléchir, créer et explorer",
    learning: "Apprentissage", learningDetail: "Développez vos connaissances", projects: "Projets",
    projectsDetail: "Donnez vie à vos idées", insights: "Analyses", insightsDetail: "Suivez vos progrès",
    tagline: "Une plateforme. Des possibilités infinies.", notifications: "Notifications",
  },
  discover: {
    kicker: "EXPLORER", title: "Trouvez votre\nprochaine possibilité.", subtitle: "Explorez les espaces qui font de NOVARA votre plateforme.",
    ideas: "Idées et inspiration", ideasText: "Un espace pour réfléchir autrement et créer.",
    learning: "Parcours d'apprentissage", learningText: "Développez vos compétences grâce à des expériences ciblées.",
    community: "Communauté", communityText: "Connectez-vous, collaborez et partagez vos créations.",
    ai: "Expériences IA", aiText: "Découvrez les outils intelligents au fur et à mesure de leur arrivée.",
    note: "D'autres expériences seront ajoutées lorsque les besoins du produit seront finalisés.",
  },
  workspace: {
    kicker: "VOTRE ESPACE NUMÉRIQUE", title: "Espace de travail",
    subtitle: "Vos outils pour planifier, apprendre, créer et travailler, réunis au même endroit.",
    bannerTitle: "Un espace de travail connecté", bannerText: "Ouvrez un module pour découvrir ses capacités actuelles.",
    tip: "Certains modules sont des aperçus interactifs. La synchronisation cloud, l'authentification, la messagerie et les services IA ne sont pas connectés.",
    modules: {
      tasks: { title: "Tâches et concentration", detail: "Priorités et listes d'actions" },
      notes: { title: "Notes et idées", detail: "Capturer et organiser les connaissances" },
      goals: { title: "Objectifs et habitudes", detail: "Progresser au fil du temps" },
      calendar: { title: "Calendrier", detail: "Événements et planification" },
      learning: { title: "Studio d'apprentissage", detail: "Compétences et parcours d'étude" },
      business: { title: "Espace entreprise", detail: "Équipes et opérations" },
      ai: { title: "NOVARA IA", detail: "Flux de travail intelligents (prévus)" },
      analytics: { title: "Analyses", detail: "Progrès et rapports" },
      messages: { title: "Messages", detail: "Collaboration (prévue)" },
      notifications: { title: "Notifications", detail: "Actualités et rappels" },
      help: { title: "Centre d'aide", detail: "Guides et assistance" },
      settings: { title: "Paramètres", detail: "Préférences et contrôles" },
    },
  },
  profile: {
    kicker: "COMPTE", title: "Votre profil", welcome: "Bienvenue sur NOVARA",
    placeholder: "Votre profil personnel apparaîtra ici", guest: "APERÇU INVITÉ",
    preferences: "PRÉFÉRENCES", personal: "Informations personnelles", privacy: "Confidentialité et sécurité",
    notifications: "Notifications", help: "Aide et assistance",
    disclaimer: "La gestion du compte et la connexion sécurisée seront mises en place après validation des exigences d'authentification.",
  },
  settings: {
    kicker: "PRÉFÉRENCES", title: "Langue et paramètres", subtitle: "Choisissez la langue utilisée dans NOVARA.",
    english: "Anglais", kinyarwanda: "Kinyarwanda", french: "Français",
    saved: "Votre choix de langue est enregistré sur cet appareil.", savingFailed: "La préférence linguistique n'a pas pu être lue ou mise à jour. NOVARA utilise une langue de secours pour cette session.",
  },
  features: {
    tasks: feature("PRODUCTIVITÉ", "Tâches et concentration", "Notez vos priorités, avancez et gardez votre prochaine action à portée de vue.", "tasks", "Que faut-il faire ?", "Vos tâches sont enregistrées sur cet appareil.", [
      ["sample-plan", "Planifier la semaine", "Divisez vos objectifs en étapes réalisables"],
      ["sample-priority", "Choisir la priorité du jour", "Concentrez-vous sur la tâche la plus importante"],
      ["sample-review", "Revoir le travail terminé", "Faites le point sur vos avancées"],
    ]),
    notes: feature("CONNAISSANCES", "Notes et idées", "Rassemblez vos pensées, notes de réunion, recherches et idées au même endroit.", "notes", "Saisissez le titre d'une note…", "Vos notes sont enregistrées sur cet appareil.", [
      ["sample-quick", "Notes rapides", "Capturez une idée avant de l'oublier"],
      ["sample-meeting", "Notes de réunion", "Consignez les décisions et les actions"],
      ["sample-research", "Bibliothèque de recherche", "Conservez les références utiles"],
    ]),
    goals: feature("DÉVELOPPEMENT", "Objectifs et habitudes", "Transformez vos ambitions à long terme en petites actions régulières.", "goals", "Ajouter un objectif ou une habitude…", "Vos objectifs sont enregistrés sur cet appareil.", [
      ["sample-goal", "Définir un objectif utile", "Précisez le résultat et la date cible"],
      ["sample-habit", "Créer une habitude quotidienne", "Choisissez une petite action répétable"],
      ["sample-progress", "Examiner vos progrès", "Ajustez votre plan au fil de l'apprentissage"],
    ]),
    calendar: feature("PLANIFICATION", "Calendrier et agenda", "Réunissez événements, échéances et séances de travail concentré.", null, "Ajouter un élément…", "Les connexions au calendrier et les rappels d'événements ne sont pas disponibles dans cet aperçu.", [
      ["day", "Planification quotidienne", "Organisez les créneaux de la journée"],
      ["events", "Événements à venir", "Gardez les dates importantes en vue"],
      ["deadlines", "Suivi des échéances", "Planifiez à rebours depuis les étapes clés"],
      ["focus", "Séances de concentration", "Réservez du temps sans interruption"],
    ]),
    learning: feature("APPRENTISSAGE", "Studio d'apprentissage", "Créez votre parcours et développez vos compétences à votre rythme.", null, "Ajouter un élément…", "Les parcours sont des exemples et ne sont pas synchronisés avec un compte.", [
      ["paths", "Parcours d'apprentissage", "Organisez les compétences en étapes claires"],
      ["cards", "Cartes mémoire", "Entraînez votre mémoire avec de courtes révisions"],
      ["planner", "Planificateur d'étude", "Planifiez les leçons et les révisions"],
      ["reading", "Liste de lecture", "Enregistrez des sujets et ressources à explorer"],
      ["skills", "Suivi des compétences", "Notez vos progrès"],
    ]),
    business: feature("ENTREPRISE", "Espace entreprise", "Une base pour les équipes, les clients, les opérations et la croissance.", null, "Ajouter un élément…", "Les flux métier sont une démonstration ; aucun serveur métier n'est connecté.", [
      ["operations", "Opérations de projet", "Coordonnez tâches, responsables et étapes"],
      ["customers", "Relations clients", "Organisez les informations et suivis clients"],
      ["finance", "Aperçu financier", "Planifiez les budgets et indicateurs"],
      ["team", "Annuaire de l'équipe", "Clarifiez les rôles et responsabilités"],
      ["documents", "Documents et propositions", "Préparez et organisez les documents métier"],
    ]),
    ai: feature("INTELLIGENCE", "Studio NOVARA IA", "Un futur espace pour les outils IA, assistants et flux créatifs.", null, "Ajouter un élément…", "Ces expériences IA sont prévues. Aucun fournisseur ni modèle IA n'est connecté.", [
      ["writing", "Assistant de rédaction", "Rédigez, reformulez et améliorez vos contenus"],
      ["research", "Assistant de recherche", "Organisez les questions et les sources"],
      ["study", "Compagnon d'étude", "Expliquez des sujets et créez des exercices"],
      ["ideas", "Générateur d'idées", "Explorez des concepts et pistes créatives"],
      ["workflow", "Assistant de flux de travail", "Divisez les tâches complexes en étapes"],
    ]),
    analytics: feature("ANALYSES", "Analyses et rapports", "Comprenez l'activité, les progrès et les résultats grâce aux rapports.", null, "Ajouter un élément…", "Les analyses sont illustratives ; les données d'activité réelles ne sont pas connectées.", [
      ["productivity", "Productivité personnelle", "Examinez les tâches et périodes de concentration"],
      ["progress", "Progrès d'apprentissage", "Suivez les leçons et compétences terminées"],
      ["health", "État du projet", "Suivez les étapes et l'avancement"],
      ["exports", "Rapports exportables", "Préparez des résumés à partager"],
    ]),
    messages: feature("COLLABORATION", "Messages et communauté", "Un espace prévu pour les conversations, groupes et travaux partagés.", null, "Ajouter un élément…", "La messagerie est prévue. L'envoi en temps réel, la modération et le stockage sécurisé ne sont pas connectés.", [
      ["direct", "Messages directs", "Conversations individuelles"],
      ["channels", "Canaux d'équipe", "Discutez par sujet ou projet"],
      ["groups", "Groupes communautaires", "Échangez autour d'intérêts communs"],
      ["files", "Partage de fichiers", "Partagez des documents avec vos collaborateurs"],
    ]),
    notifications: feature("ACTUALITÉS", "Notifications", "Un espace central pour les rappels, actualités et activités importantes.", null, "Ajouter un élément…", "Les notifications sont des exemples ; les notifications push ne sont pas connectées.", [
      ["reminders", "Rappels de tâches", "Gardez en vue les priorités à venir"],
      ["updates", "Actualités des projets", "Suivez les changements importants"],
      ["learning", "Rappels d'apprentissage", "Gardez votre rythme d'étude"],
      ["alerts", "Alertes du compte", "Consultez les avis de sécurité importants"],
    ]),
    help: feature("ASSISTANCE", "Centre d'aide", "Trouvez des guides, des informations produit et des moyens d'obtenir de l'aide.", null, "Ajouter un élément…", "Les sujets d'aide sont des exemples ; l'envoi de tickets n'est pas connecté.", [
      ["start", "Bien démarrer", "Découvrez les principaux espaces de NOVARA"],
      ["faq", "Questions fréquentes", "Trouvez les réponses aux questions courantes"],
      ["report", "Signaler un problème", "Préparez un rapport clair"],
      ["accessibility", "Aide à l'accessibilité", "Obtenez de l'aide pour utiliser la plateforme"],
      ["about", "À propos de NOVARA", "Informations produit et notes de version"],
    ]),
  },
};

export const dictionaries: Record<"en" | "rw" | "fr", Messages> = { en, rw, fr };
