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
  t: any; // Mantemos como any para suportar os dois usos
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

  // Criamos uma função que também tem as propriedades do objeto de tradução
  const t = useMemo(() => {
    const currentDict = translations[locale];
    
    // Esta é a função que resolve caminhos como "project.item.desc"
    const translateFn = (path: string) => {
      if (typeof path !== 'string') return path;
      return path.split('.').reduce((obj, key) => obj?.[key], currentDict) || path;
    };

    // Copiamos as propriedades do JSON para a função para t.nav.home continuar a funcionar
    return Object.assign(translateFn, currentDict);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
