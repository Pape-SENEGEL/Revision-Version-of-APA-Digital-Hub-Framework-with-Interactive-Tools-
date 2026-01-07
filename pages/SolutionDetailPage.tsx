import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_SOLUTIONS, ROUTES } from '../constants';
import { Solution, HierarchicalSection } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import * as Icons from '../components/IconComponents';
import { usePdfGenerator } from '../hooks/usePdfGenerator';
import PdfCustomizeModal from '../components/PdfCustomizeModal';
import DownloadPdfButton from '../components/DownloadPdfButton';
import { usePageTitle } from '../hooks/usePageTitle';
import SocialShareButtons from '../components/SocialShareButtons';

const pageSections: HierarchicalSection[] = [
    { id: 'solution-painpoint-section', sectionTitleKey: 'solutionDetailPage.painPoint' },
    { id: 'solution-advantage-section', sectionTitleKey: 'solutionDetailPage.competitiveAdvantage' },
    { id: 'solution-revenue-section', sectionTitleKey: 'solutionDetailPage.revenueModel' },
    { id: 'solution-ai-section', sectionTitleKey: 'solutionDetailPage.aiLeverage' },
];

const DetailSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string;
  id: string;
}> = ({ icon, title, content, id }) => (
    <section id={id} className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
            <div className="text-blue-600 mr-4 p-3 bg-blue-100 rounded-lg">
                {icon}
            </div>
            <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">{content}</p>
    </section>
);

const SolutionDetailPage: React.FC = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const { t, translateField } = useLanguage();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { isGeneratingPdf, pdfProgress, generatePdf } = usePdfGenerator(pageSections);
  
  const pageTitle = solution ? translateField(solution.title) : t('solutionDetailPage.loadingSolution');
  usePageTitle(pageTitle, false);

  useEffect(() => {
    const foundSolution = MOCK_SOLUTIONS.find(s => s.id === solutionId);
    setSolution(foundSolution || null);
    setIsLoading(false);
  }, [solutionId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner text={t('solutionDetailPage.loadingSolution')} size="lg" /></div>;
  }

  if (!solution) {
    return <div className="text-center py-20 text-2xl font-semibold text-red-600">{t('solutionDetailPage.solutionNotFound')}</div>;
  }
  
  const IconComponent = (Icons as any)[solution.icon] || Icons.CubeTransparentIcon;

  const sectionsData = [
      { id: 'solution-painpoint-section', icon: <Icons.ExclamationCircleIcon className="w-7 h-7" />, titleKey: 'solutionDetailPage.painPoint', contentKey: 'painPoint' },
      { id: 'solution-advantage-section', icon: <Icons.TrophyIcon className="w-7 h-7" />, titleKey: 'solutionDetailPage.competitiveAdvantage', contentKey: 'competitiveAdvantage' },
      { id: 'solution-revenue-section', icon: <Icons.BanknotesIcon className="w-7 h-7" />, titleKey: 'solutionDetailPage.revenueModel', contentKey: 'revenueGeneration' },
      { id: 'solution-ai-section', icon: <Icons.CpuChipIcon className="w-7 h-7" />, titleKey: 'solutionDetailPage.aiLeverage', contentKey: 'aiLeverage' }
  ];

  const shareUrl = window.location.href;
  const shareTitle = translateField(solution.title);

  return (
    <>
    <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
            <Link to={ROUTES.SOLUTIONS} className="text-sky-600 hover:text-sky-800 font-semibold transition-colors text-sm">
            &larr; {t('solutionDetailPage.backToSolutions')}
            </Link>
        </div>

      <header className="mb-10 text-center">
        <div className="inline-block bg-sky-100 text-sky-600 p-5 rounded-xl mb-5">
            <IconComponent className="w-12 h-12" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3">{translateField(solution.title)}</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">{translateField(solution.summary)}</p>
      </header>

      <div className="space-y-8">
        {sectionsData.map(sec => (
            <DetailSection
                key={sec.id}
                id={sec.id}
                icon={sec.icon}
                title={t(sec.titleKey)}
                content={translateField(solution.details[sec.contentKey as keyof typeof solution.details])}
            />
        ))}
      </div>

      <section className="mt-12 text-center py-10 bg-slate-50 rounded-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800">{t('solutionDetailPage.interestedTitle')}</h2>
        <p className="text-slate-600 mt-2 mb-6 max-w-xl mx-auto">{t('solutionDetailPage.interestedDescription')}</p>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105 shadow-md hover:shadow-lg inline-flex items-center"
        >
          <Icons.ChatBubbleLeftRightIcon className="w-6 h-6 mr-2"/> {t('solutionDetailPage.requestDemo')}
        </button>
      </section>
      
      <div className="mt-8 max-w-sm mx-auto">
        <SocialShareButtons url={shareUrl} title={shareTitle} titleKey="solutionDetailPage.shareSolution" />
      </div>
    </div>
    
    <DownloadPdfButton onClick={() => setIsPdfModalOpen(true)} isGenerating={isGeneratingPdf} />
    <PdfCustomizeModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onGenerate={generatePdf}
        sections={pageSections}
    />
    {isGeneratingPdf && (
      <div className="pdf-loader-overlay">
        <div className="spinner"></div>
        <p className="text-xl font-semibold mb-2">{t('pdf.generating')}</p>
        <p>{pdfProgress}</p>
      </div>
    )}
    {isContactModalOpen && (
      <div 
          className="report-modal-overlay"
          onClick={() => setIsContactModalOpen(false)}
      >
          <div 
              className="report-modal-content max-w-lg"
              onClick={e => e.stopPropagation()}
          >
              <header className="p-5 border-b flex justify-between items-center bg-slate-50">
                  <h2 className="text-xl font-semibold flex items-center text-slate-800">
                      <Icons.EnvelopeIcon className="w-6 h-6 mr-3 text-sky-500" />
                      {t('solutionDetailPage.contactModal.title')}
                  </h2>
                  <button onClick={() => setIsContactModalOpen(false)} className="text-slate-500 hover:text-slate-800 text-2xl font-bold">&times;</button>
              </header>
              <div className="p-6 space-y-4">
                  <p className="text-slate-600">{t('solutionDetailPage.contactModal.intro')}</p>
                  <div className="space-y-3 pt-2">
                      <div className="flex items-start space-x-3">
                          <Icons.EnvelopeIcon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                          <div>
                              <h3 className="font-semibold text-slate-700">{t('solutionDetailPage.contactModal.email')}</h3>
                              <a href="mailto:solutions@apa.com" className="text-sky-600 hover:underline">solutions@apa.com</a>
                          </div>
                      </div>
                       <div className="flex items-start space-x-3">
                          <Icons.PhoneIcon className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                          <div>
                              <h3 className="font-semibold text-slate-700">{t('solutionDetailPage.contactModal.phone')}</h3>
                              <a href="tel:+1-202-555-0152" className="text-sky-600 hover:underline">+1 (202) 555-0152</a>
                          </div>
                      </div>
                  </div>
              </div>
               <footer className="report-modal-footer">
                   <button onClick={() => setIsContactModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">
                      {t('solutionDetailPage.contactModal.close')}
                  </button>
              </footer>
          </div>
      </div>
    )}
    </>
  );
};

export default SolutionDetailPage;