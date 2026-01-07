import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_RESOURCES } from '../constants';
import ResourceItem from '../components/ResourceItem';
import { SearchIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';
import { LanguageCode } from '../types';

const ResourcesPage: React.FC = () => {
  const { t, translateField, getTranslatedValue } = useLanguage();
  usePageTitle('resourcesPage.title');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const resourceTypes = useMemo(() => {
    const types = new Set<string>();
    MOCK_RESOURCES.forEach(resource => types.add(getTranslatedValue(resource.type, LanguageCode.EN)));
    return ['all', ...Array.from(types)];
  }, [getTranslatedValue]);

  const industries = useMemo(() => {
    const inds = new Set<string>();
    MOCK_RESOURCES.forEach(resource => inds.add(getTranslatedValue(resource.industry, LanguageCode.EN)));
    return ['all', ...Array.from(inds)];
  }, [getTranslatedValue]);

  const filteredAndSortedResources = useMemo(() => {
    let filtered = MOCK_RESOURCES.filter(resource => {
      const typeMatch = selectedType === 'all' || getTranslatedValue(resource.type, LanguageCode.EN) === selectedType;
      const industryMatch = selectedIndustry === 'all' || getTranslatedValue(resource.industry, LanguageCode.EN) === selectedIndustry;
      
      if (!typeMatch || !industryMatch) {
        return false;
      }
      
      if (searchTerm.trim()) {
        const lowercasedSearch = searchTerm.toLowerCase();
        const searchableText = [
            translateField(resource.title),
            translateField(resource.summary),
            (resource.isInternal && resource.content) ? translateField(resource.content) : '',
        ].join(' ').toLowerCase();
        if (!searchableText.includes(lowercasedSearch)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedType, selectedIndustry, sortBy, translateField, getTranslatedValue]);
  
  const getTranslatedName = (englishKey: string, collection: 'type' | 'industry'): string => {
    if (englishKey === 'all') {
      return t(collection === 'type' ? 'resourcesPage.allTypes' : 'resourcesPage.allIndustries');
    }
    const item = MOCK_RESOURCES.find(r => getTranslatedValue(r[collection], LanguageCode.EN) === englishKey);
    return item ? translateField(item[collection]) : englishKey;
  };

  const selectClass = "block w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm";

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="page-header-immersive" style={{backgroundImage: "url('https://source.unsplash.com/sifxQqd_d4s')"}}>
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight drop-shadow-md">{t('resourcesPage.title')}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto drop-shadow-sm">{t('resourcesPage.description')}</p>
        </div>
      </header>
      
      <section className="max-w-6xl mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg -mt-16 relative z-10 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="lg:col-span-2">
                 <label htmlFor="search-resources" className="block text-sm font-medium text-slate-700 mb-1">{t('resourcesPage.searchPlaceholder')}</label>
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                         <SearchIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        id="search-resources"
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={t('resourcesPage.searchPlaceholder')}
                        className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                    />
                </div>
            </div>
            <div>
                 <label htmlFor="filter-by-type" className="block text-sm font-medium text-slate-700 mb-1">{t('resourcesPage.filterByType')}</label>
                 <select id="filter-by-type" value={selectedType} onChange={e => setSelectedType(e.target.value)} className={selectClass}>
                    {resourceTypes.map(type => <option key={type} value={type}>{getTranslatedName(type, 'type')}</option>)}
                 </select>
            </div>
             <div>
                 <label htmlFor="filter-by-industry" className="block text-sm font-medium text-slate-700 mb-1">{t('resourcesPage.filterByIndustry')}</label>
                 <select id="filter-by-industry" value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)} className={selectClass}>
                    {industries.map(ind => <option key={ind} value={ind}>{getTranslatedName(ind, 'industry')}</option>)}
                 </select>
            </div>
            <div className="lg:col-start-4">
                 <label htmlFor="sort-by" className="block text-sm font-medium text-slate-700 mb-1">{t('resourcesPage.sortBy')}</label>
                 <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClass}>
                    <option value="default">{t('resourcesPage.sortOptions.default')}</option>
                    <option value="newest">{t('resourcesPage.sortOptions.newest')}</option>
                    <option value="oldest">{t('resourcesPage.sortOptions.oldest')}</option>
                 </select>
            </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        {filteredAndSortedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAndSortedResources.map(resource => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-lg">
            <p className="text-xl text-slate-500">{t('resourcesPage.noResultsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;