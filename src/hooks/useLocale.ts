'use client';
import { useState, useEffect, useCallback } from 'react';
import { translations, type Locale, type TranslationDict } from '@/lib/translations';

const STORAGE_KEY = 'preferred_locale';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';

  const param = new URLSearchParams(window.location.search).get('lang') as Locale;
  if (param && param in translations) return param;

  const stored = localStorage.getItem(STORAGE_KEY) as Locale;
  if (stored && stored in translations) return stored;

  const browser = navigator.language.slice(0, 2) as Locale;
  if (browser in translations) return browser;

  return 'pt';
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }, []);

  const t = <K extends keyof TranslationDict>(key: K): TranslationDict[K] =>
    translations[locale][key];

  return { t, locale, setLocale };
}
