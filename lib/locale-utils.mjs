const SUPPORTED_LOCALES = new Set(["en", "rw", "fr"]);
export function resolveLocale(languageCode) {
  if (typeof languageCode !== "string") return "en";
  const normalized = languageCode.trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.has(normalized) ? normalized : "en";
}
