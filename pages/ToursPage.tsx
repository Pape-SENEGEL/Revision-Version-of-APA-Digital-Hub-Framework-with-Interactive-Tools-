import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_TOURS } from '../constants';
import TourCard from '../components/TourCard';
import AIAgent from '../components/AIAgent';
import { TourDifficulty, LanguageCode } from '../types';
import { SearchIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';

const ToursPage: React.FC = () => {
  const { t, translateField, getTranslatedValue } = useLanguage();
  usePageTitle('toursPage.title');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TourDifficulty | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const { tourInfoForAI, systemInstruction } = useMemo(() => {
    const tourInfo = MOCK_TOURS.map(tour => 
      `- Title: ${translateField(tour.title)}\n  Description: ${translateField(tour.description)}\n  Target Audience: ${translateField(tour.targetAudience)}\n  Duration: ${translateField(tour.duration)}\n  Price: ${translateField(tour.price)}\n  Difficulty: ${tour.difficulty}`
    ).join('\n');
    
    const instruction = `You are a friendly APA travel advisor. Your goal is to help users find the perfect journey from the list of available tours below. Be conversational and helpful. Ask them about their interests (e.g., tech, agriculture, leadership), professional background, desired trip duration, and budget to recommend the most suitable tour. Use the provided details like duration, price, and difficulty to inform your recommendation.\n\nAvailable Tours:\n${tourInfo}`;
    
    return { tourInfoForAI: tourInfo, systemInstruction: instruction };
  }, [translateField]);


  const destinations = useMemo(() => ['all', ...Array.from(new Set(MOCK_TOURS.map(tour => getTranslatedValue(tour.destination, LanguageCode.EN))))], [getTranslatedValue]);
  const industries = useMemo(() => ['all', ...Array.from(new Set(MOCK_TOURS.map(tour => getTranslatedValue(tour.industry, LanguageCode.EN))))], [getTranslatedValue]);
  const difficultyLevels = useMemo(() => ['all', ...Object.values(TourDifficulty)], []);

  const getTranslatedName = (englishKey: string, type: 'destination' | 'industry' | 'difficulty') => {
      if (englishKey === 'all') {
          if (type === 'destination') return t('toursPage.allDestinations');
          if (type === 'industry') return t('toursPage.allIndustries');
          return t('toursPage.allDifficulties');
      }
      if (type === 'difficulty') return t(`tourDifficulty.${englishKey}`);
      
      const tour = MOCK_TOURS.find(t => getTranslatedValue(t[type], LanguageCode.EN) === englishKey);
      return tour ? translateField(tour[type]) : englishKey;
  };

  const parsePrice = (priceStr: string) => Number(priceStr.replace(/[^0-9]/g, ''));
  const parseDuration = (durationStr: string) => parseInt(durationStr, 10) || 0;

  const filteredAndSortedTours = useMemo(() => {
    let filtered = MOCK_TOURS.filter(tour => {
      if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) return false;
      if (selectedDestination !== 'all' && getTranslatedValue(tour.destination, LanguageCode.EN) !== selectedDestination) return false;
      if (selectedIndustry !== 'all' && getTranslatedValue(tour.industry, LanguageCode.EN) !== selectedIndustry) return false;
      if (searchTerm.trim()) {
        const lowercasedSearch = searchTerm.toLowerCase();
        const searchableText = [
            translateField(tour.title),
            translateField(tour.description),
            translateField(tour.detailedDescription || ''),
        ].join(' ').toLowerCase();
        if (!searchableText.includes(lowercasedSearch)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'priceAsc':
                return parsePrice(translateField(a.price)) - parsePrice(translateField(b.price));
            case 'priceDesc':
                return parsePrice(translateField(b.price)) - parsePrice(translateField(a.price));
            case 'durationAsc':
                return parseDuration(translateField(a.duration)) - parseDuration(translateField(b.duration));
            case 'durationDesc':
                return parseDuration(translateField(b.duration)) - parseDuration(translateField(a.duration));
            default:
                return 0;
        }
    });
  }, [selectedDifficulty, searchTerm, selectedDestination, selectedIndustry, sortBy, getTranslatedValue, translateField]);

  const selectClass = "block w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm";

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="page-header-immersive" style={{backgroundImage: "url('https://source.unsplash.com/0K720_aPq4U')"}}>
        <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight drop-shadow-md">{t('toursPage.title')}</h1>
            <p className="mt-4 text-lg max-w-3xl mx-auto drop-shadow-sm">{t('toursPage.description')}</p>
        </div>
      </header>
      
      <section className="max-w-6xl mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-grow min-w-[250px] sm:min-w-[300px]">
            <label htmlFor="search-tours" className="block text-sm font-medium text-slate-700 mb-1">{t('toursPage.searchPlaceholder')}</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="search-tours"
                type="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('toursPage.searchPlaceholder')}
                className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="filter-destination" className="block text-sm font-medium text-slate-700 mb-1">{t('toursPage.filterByDestination')}</label>
            <select id="filter-destination" value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)} className={selectClass}>
              {destinations.map(dest => <option key={dest} value={dest}>{getTranslatedName(dest, 'destination')}</option>)}
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="filter-industry" className="block text-sm font-medium text-slate-700 mb-1">{t('toursPage.filterByIndustry')}</label>
            <select id="filter-industry" value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)} className={selectClass}>
              {industries.map(ind => <option key={ind} value={ind}>{getTranslatedName(ind, 'industry')}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="filter-difficulty" className="block text-sm font-medium text-slate-700 mb-1">{t('toursPage.filterByDifficulty')}</label>
            <select id="filter-difficulty" value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value as TourDifficulty | 'all')} className={selectClass}>
              {difficultyLevels.map(level => <option key={level} value={level}>{getTranslatedName(level, 'difficulty')}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label htmlFor="sort-by" className="block text-sm font-medium text-slate-700 mb-1">{t('toursPage.sortBy')}</label>
            <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClass}>
              <option value="default">{t('toursPage.sortOptions.default')}</option>
              <option value="priceAsc">{t('toursPage.sortOptions.priceAsc')}</option>
              <option value="priceDesc">{t('toursPage.sortOptions.priceDesc')}</option>
              <option value="durationAsc">{t('toursPage.sortOptions.durationAsc')}</option>
              <option value="durationDesc">{t('toursPage.sortOptions.durationDesc')}</option>
            </select>
          </div>
        </div>
      </section>

      <AIAgent
        title={t('toursPage.aiAgent.title')}
        systemInstruction={systemInstruction}
        initialMessage={t('toursPage.aiAgent.initialMessage')}
      />

      {filteredAndSortedTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedTours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-slate-500">{t('toursPage.noToursFound')}</p>
        </div>
      )}
    </div>
  );
};

export default ToursPage;