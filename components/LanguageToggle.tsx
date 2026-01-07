import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LANGUAGES } from '../constants';
import { LanguageCode } from '../types';
import { GlobeIcon, ChevronDownIcon } from './IconComponents';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (langCode: LanguageCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguageShortName = LANGUAGES.find(lang => lang.code === language)?.short || 'EN';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <GlobeIcon className="w-5 h-5" />
        <span>{currentLanguageShortName}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                language === lang.code
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t(lang.nameKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;