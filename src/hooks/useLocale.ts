'use client';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { translations, type Locale, type TranslationDict } from '@/lib/translations';

const STORAGE_KEY = 'preferred_locale';

// BCP 47 tags for <html lang>.
const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es', it: 'it' };

function detectLocale(): Locale {
  const param = new URLSearchParams(window.location.search).get('lang') as Locale;
  if (param && param in translations) return param;

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale;
    if (stored && stored in translations) return stored;
  } catch {
    // Storage blocked (private mode) — fall through to the browser language.
  }

  const browser = navigator.language.slice(0, 2) as Locale;
  if (browser in translations) return browser;

  return 'pt';
}

// Tiny external store so the locale is read synchronously on the client
// (no extra render pass) while the static HTML is still rendered in `pt`.
let current: Locale | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Locale {
  if (current === null) current = detectLocale();
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, () => 'pt' as Locale);

  // Keep <html lang> in sync and reveal the page once the right language is
  // rendered (the inline script in layout.tsx hides it for non-pt visitors).
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
    document.documentElement.classList.remove('locale-pending');
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked — the choice still applies for this visit.
    }
    current = next;
    listeners.forEach((l) => l());
  }, []);

  const t = <K extends keyof TranslationDict>(key: K): TranslationDict[K] =>
    translations[locale][key];

  return { t, locale, setLocale };
}
