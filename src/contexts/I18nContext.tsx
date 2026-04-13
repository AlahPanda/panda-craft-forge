import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import en from '@/data/i18n/en.json';
import ptBr from '@/data/i18n/pt-br.json';
import ptPt from '@/data/i18n/pt-pt.json';
import es from '@/data/i18n/es.json';

export type Locale = 'en' | 'pt-br' | 'pt-pt' | 'es';

const translations: Record<Locale, any> = {
  en,
  'pt-br': ptBr,
  'pt-pt': ptPt,
  es,
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
  // t agora é uma função que aceita o caminho (ex: "nav.home")
  t: (path: string) => any;
  // dict mantém o acesso direto ao objeto se precisares (t.nav.home)
  dict: typeof en;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (path: string) => path,
  dict: en,
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

  // Esta é a função mágica que resolve "project.mac-native.description"
  const t = useCallback((path: string) => {
    const keys = path.split('.');
    let result = translations[locale];
    
    for (const key of keys) {
      if (result[key] === undefined) return path; // Se não achar, mostra a chave
      result = result[key];
    }
    
    return result;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
    dict: translations[locale]
  }), [locale, setLocale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
