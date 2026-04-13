import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '@/data/i18n/en.json';
import ptBr from '@/data/i18n/pt-br.json';
import ptPt from '@/data/i18n/pt-pt.json';
import es from '@/data/i18n/es.json';

export type Locale = 'en' | 'pt-br' | 'pt-pt' | 'es';

const translations: Record<Locale, typeof en> = {
  en,
  'pt-br': ptBr as typeof en,
  'pt-pt': ptPt as typeof en,
  es: es as typeof en,
};

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  'pt-br': 'PT-BR',
  'pt-pt': 'PT-PT',
  es: 'ES',
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof en;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('alahpanda-locale') as Locale | null;
    return saved && translations[saved] ? saved : 'en';
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('alahpanda-locale', l);
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
