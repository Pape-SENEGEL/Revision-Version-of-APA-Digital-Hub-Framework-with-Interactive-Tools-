
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { LanguageCode, Translations } from '../types'; // Import Translations type

const getTranslatedValue = (value: string | Translations | undefined, lang: LanguageCode, fallbackLang: LanguageCode = LanguageCode.EN): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && value !== null) {
    return value[lang] as string || value[fallbackLang] as string || '';
  }
  return '';
};


export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  // Helper to translate fields that can be string or {en: string, fr: string}
  const translateField = <T,>(field: string | Translations | undefined): string => {
    return getTranslatedValue(field, context.language);
  };

  return { ...context, translateField, getTranslatedValue };
};
