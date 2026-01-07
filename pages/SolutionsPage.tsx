import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_SOLUTIONS } from '../constants';
import SolutionCard from '../components/SolutionCard';
import { CubeTransparentIcon, SearchIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';
import AIAgent from '../components/AIAgent';

const SolutionsPage: React.FC = () => {
  const { t, translateField } = useLanguage();
  usePageTitle('solutionsPage.title');
  const [searchTerm, setSearchTerm] = useState('');

  const solutionInfoForAI = MOCK_SOLUTIONS.map(solution =>
    `- Title: ${translateField(solution.title)}\n  Summary: ${translateField(solution.summary)}`
  ).join('\n');

  const systemInstruction = `You are a strategic advisor for organizations working in Africa. Your purpose is to guide users to the most relevant APA solution based on their specific challenges. Use the list of available solutions below to make your recommendations. Ask clarifying questions to understand their needs regarding M&E, community trust, leadership development, AI governance, business model design, etc.\n\nAvailable Solutions:\n${solutionInfoForAI}`;

  const filteredSolutions = useMemo(() => {
    if (!searchTerm.trim()) {
      return MOCK_SOLUTIONS;
    }
    const lowercasedSearch = searchTerm.toLowerCase();
    return MOCK_SOLUTIONS.filter(solution => {
      const title = translateField(solution.title).toLowerCase();
      const summary = translateField(solution.summary).toLowerCase();
      return title.includes(lowercasedSearch) || summary.includes(lowercasedSearch);
    });
  }, [searchTerm, translateField]);


  return (
    <div className="space-y-8 md:space-y-12">
       <header className="page-header-immersive" style={{backgroundImage: "url('https://source.unsplash.com/L0xOtAn_l4c')"}}>
        <div>
          <div className="inline-block bg-white/10 backdrop-blur-sm text-white p-4 rounded-full mb-4">
              <CubeTransparentIcon className="w-12 h-12"/>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight drop-shadow-md">{t('solutionsPage.title')}</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto drop-shadow-sm">{t('solutionsPage.description')}</p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg -mt-16 relative z-10 border border-slate-200">
        <label htmlFor="search-solutions" className="sr-only">{t('solutionsPage.searchPlaceholder')}</label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
                id="search-solutions"
                type="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('solutionsPage.searchPlaceholder')}
                className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
        </div>
      </section>
      
      <AIAgent
        title={t('solutionsPage.aiAgent.title')}
        systemInstruction={systemInstruction}
        initialMessage={t('solutionsPage.aiAgent.initialMessage')}
      />

      {filteredSolutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map(solution => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-slate-500">{searchTerm ? t('solutionsPage.noResultsFound') : t('solutionsPage.noSolutions')}</p>
        </div>
      )}
    </div>
  );
};

export default SolutionsPage;