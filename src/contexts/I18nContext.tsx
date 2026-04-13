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

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => any; // Função para caminhos com pontos
  dict: typeof en;          // Objeto para acesso direto
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('alahpanda-locale') as Locale | null;
    return saved && translations[saved] ? saved : 'en';
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('alahpanda-locale', l);
  }, []);

  const t = useCallback((path: string) => {
    if (!path || typeof path !== 'string') return path;
    const keys = path.split('.');
    let result = translations[locale];
    
    for (const key of keys) {
      if (!result || result[key] === undefined) return path;
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
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
