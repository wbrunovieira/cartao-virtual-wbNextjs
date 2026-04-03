'use client';
import { useState, useEffect } from 'react';
import { translations, type Locale, type TranslationDict } from '@/lib/translations';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const param = new URLSearchParams(window.location.search).get('lang') as Locale;
  if (param && param in translations) return param;
  const browser = navigator.language.slice(0, 2) as Locale;
  if (browser in translations) return browser;
  return 'pt';
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = <K extends keyof TranslationDict>(key: K): TranslationDict[K] =>
    translations[locale][key];

  return { t, locale, setLocale };
}
