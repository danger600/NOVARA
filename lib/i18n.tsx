import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getLocales } from "expo-localization";
import { loadPreference, savePreference } from "@/lib/storage";
import { resolveLocale, type Locale } from "@/lib/locale-utils.mjs";
import { dictionaries, type Messages } from "@/lib/translations";

export type { Locale };
type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  messages: Messages;
  isReady: boolean;
  storageError: boolean;
};
const I18nContext = createContext<I18nContextValue | null>(null);

function deviceLocale(): Locale {
  try {
    return resolveLocale(getLocales()[0]?.languageCode);
  } catch {
    return "en";
  }
}
function isLocale(value: string): value is Locale {
  return value === "en" || value === "rw" || value === "fr";
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const detectedLocale = useMemo(deviceLocale, []);
  const [locale, setLocaleState] = useState<Locale>(detectedLocale);
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    let active = true;
    loadPreference("locale", detectedLocale, isLocale)
      .then((savedLocale) => {
        if (active) setLocaleState(savedLocale);
      })
      .catch(() => {
        if (active) setStorageError(true);
      })
      .finally(() => {
        if (active) setIsReady(true);
      });
    return () => { active = false; };
  }, [detectedLocale]);

  const setLocale = useCallback(async (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    setStorageError(false);
    try {
      await savePreference("locale", nextLocale);
    } catch {
      setStorageError(true);
    }
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, messages: dictionaries[locale], isReady, storageError }),
    [locale, setLocale, isReady, storageError],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside LocalizationProvider");
  return context;
}
