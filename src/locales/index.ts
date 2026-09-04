import pt from "./pt-BR.json";
import en from "./en.json";
import es from "./es.json";
export const locales = { "pt-BR": pt, en, es };
export type Language = keyof typeof locales;
export type Copy = typeof pt;
export function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem("nordion-language");
    if (saved && saved in locales) return saved as Language;
  } catch {
    /* Storage can be unavailable in private contexts. */
  }
  return "pt-BR";
}
