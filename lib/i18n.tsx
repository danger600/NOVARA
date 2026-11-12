import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getLocales } from "expo-localization";

export type Locale = "en" | "rw" | "fr";
const dictionaries = {
  en: { home:"Home", discover:"Discover", tasks:"Tasks", workspace:"Workspace", profile:"Profile", settings:"Language & settings", search:"Search this page…", add:"Add item", items:"Your items", tools:"Available tools", preview:"PREVIEW MODE", saved:"Saved on this device", choose:"Choose your language", english:"English", kinyarwanda:"Kinyarwanda", french:"Français" },
  rw: { home:"Ahabanza", discover:"Shakisha", tasks:"Imirimo", workspace:"Aho ukorera", profile:"Umwirondoro", settings:"Ururimi n'igenamiterere", search:"Shakisha hano…", add:"Ongeraho", items:"Ibintu byawe", tools:"Ibikoresho bihari", preview:"IGERAGEZA", saved:"Byabitswe kuri iki gikoresho", choose:"Hitamo ururimi", english:"Icyongereza", kinyarwanda:"Ikinyarwanda", french:"Igifaransa" },
  fr: { home:"Accueil", discover:"Découvrir", tasks:"Tâches", workspace:"Espace de travail", profile:"Profil", settings:"Langue et paramètres", search:"Rechercher ici…", add:"Ajouter", items:"Vos éléments", tools:"Outils disponibles", preview:"APERÇU", saved:"Enregistré sur cet appareil", choose:"Choisissez votre langue", english:"Anglais", kinyarwanda:"Kinyarwanda", french:"Français" }
} as const;

type I18nContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: keyof typeof dictionaries.en) => string };
const I18nContext = createContext<I18nContextValue | null>(null);
function deviceLocale(): Locale {
  const code = getLocales()[0]?.languageCode?.toLowerCase();
  return code === "rw" ? "rw" : code === "fr" ? "fr" : "en";
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(deviceLocale);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem("novara:v1:locale").then((saved) => {
      if (active && (saved === "en" || saved === "rw" || saved === "fr")) setLocaleState(saved);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    AsyncStorage.setItem("novara:v1:locale", next).catch(() => undefined);
  }, []);
  const t = useCallback((key: keyof typeof dictionaries.en) => dictionaries[locale][key], [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside LocalizationProvider");
  return context;
}
