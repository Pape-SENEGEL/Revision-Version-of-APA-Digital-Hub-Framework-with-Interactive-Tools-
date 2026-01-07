import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { LanguageCode, Translations } from '../types';
import { LANGUAGES } from '../constants';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translations: Translations; // Represents translations for the current language
  t: (key: string, replacements?: { [key: string]: string }) => string;
  translationsLoading: boolean;
  translationError: string | null;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(LanguageCode.EN);
  const [allLoadedTranslations, setAllLoadedTranslations] = useState<{ [key in LanguageCode]?: Translations }>({});
  const [translationsLoading, setTranslationsLoading] = useState<boolean>(true);
  const [translationError, setTranslationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setTranslationsLoading(true);
        setTranslationError(null);

        const translationPromises = LANGUAGES.map(async (lang) => {
          try {
            const response = await fetch(`./translations/${lang.code}.json`);
            if (!response.ok) {
              console.warn(`Could not fetch ${lang.code}.json, will use fallback.`);
              return { code: lang.code, data: null };
            }
            const data = await response.json();
            return { code: lang.code, data };
          } catch (e) {
            console.warn(`Error fetching ${lang.code}.json:`, e);
            return { code: lang.code, data: null };
          }
        });

        const loadedTranslationsArray = await Promise.all(translationPromises);
        const englishTranslations = loadedTranslationsArray.find(t => t.code === LanguageCode.EN)?.data || {};

        const translationsObject = loadedTranslationsArray.reduce((acc, { code, data }) => {
          acc[code as LanguageCode] = data || englishTranslations; // Use English as fallback
          return acc;
        }, {} as { [key in LanguageCode]?: Translations });
        
        setAllLoadedTranslations(translationsObject);

      } catch (error: any) {
        console.error("Failed to fetch critical translations (English):", error);
        setTranslationError(error.message || "Failed to load critical translations");
        
        const emptyTranslations = LANGUAGES.reduce((acc, lang) => {
          acc[lang.code] = {};
          return acc;
        }, {} as { [key in LanguageCode]: Translations });
        setAllLoadedTranslations(emptyTranslations);
      } finally {
        setTranslationsLoading(false);
      }
    };

    fetchTranslations();
    // Logic to load language preference from localStorage could be added here
  }, []);

  const setLanguage = useCallback((langCode: LanguageCode) => {
    if (LANGUAGES.some(lang => lang.code === langCode)) {
      setLanguageState(langCode);
    } else {
      console.warn(`Attempted to set unsupported language: '${langCode}'. Defaulting to '${LanguageCode.EN}'.`);
      setLanguageState(LanguageCode.EN);
    }
  }, []);

  const t = (key: string, replacements?: { [key: string]: string }): string => {
    const currentLangTranslations = allLoadedTranslations[language];
    const fallbackLangTranslations = allLoadedTranslations[LanguageCode.EN];

    if (translationsLoading || !currentLangTranslations) {
      return key; // Return key if translations are loading or current language's translations aren't available
    }

    const keys = key.split('.');
    let translated: string | Translations | undefined = currentLangTranslations;

    for (const k of keys) {
      if (typeof translated === 'object' && translated !== null && k in translated) {
        translated = translated[k];
      } else {
        translated = undefined; // Not found in current language
        break;
      }
    }

    // If not found in current language, try fallback (English)
    if (typeof translated !== 'string' && fallbackLangTranslations) {
      translated = fallbackLangTranslations;
      for (const k of keys) {
        if (typeof translated === 'object' && translated !== null && k in translated) {
          translated = translated[k];
        } else {
          return key; // Not found in fallback either, return key
        }
      }
    }
    
    let translatedString = typeof translated === 'string' ? translated : key;

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translatedString = translatedString.replace(`{${placeholder}}`, replacements[placeholder]);
      });
    }
    
    return translatedString;
  };

  // Provide current language's translations, or empty object if loading/error or not yet loaded
  const currentDisplayedTranslations = allLoadedTranslations[language] || {};

  return (
    <LanguageContext.Provider value={{ 
        language, 
        setLanguage, 
        translations: currentDisplayedTranslations, 
        t,
        translationsLoading,
        translationError
    }}>
      {children}
    </LanguageContext.Provider>
  );
};