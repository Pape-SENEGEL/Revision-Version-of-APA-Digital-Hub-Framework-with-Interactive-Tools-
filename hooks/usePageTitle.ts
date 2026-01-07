import { useEffect } from 'react';
import { useLanguage } from './useLanguage';

/**
 * A hook to dynamically set the document title for a page.
 * @param title - The page title string or a translation key.
 * @param isTranslationKey - Whether the title is a translation key (default: true).
 */
export const usePageTitle = (title: string, isTranslationKey: boolean = true) => {
  const { t } = useLanguage();

  useEffect(() => {
    const baseTitle = t('appName');
    let pageTitle = isTranslationKey ? t(title) : title;
    
    // If translation key wasn't found, t() returns the key itself.
    // We avoid showing "myPage.title | APA Digital Hub".
    // Also handles the case where the title is an empty string initially.
    if (pageTitle && pageTitle !== title && isTranslationKey) {
        document.title = `${pageTitle} | ${baseTitle}`;
    } else if (pageTitle && !isTranslationKey) {
        document.title = `${pageTitle} | ${baseTitle}`;
    } else {
        document.title = baseTitle;
    }

  }, [t, title, isTranslationKey]);
};
