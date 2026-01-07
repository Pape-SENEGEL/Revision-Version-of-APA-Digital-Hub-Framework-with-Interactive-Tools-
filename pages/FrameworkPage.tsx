import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
    TrendingUpIcon, UserGroupIcon, ShieldCheckIcon, SparklesIcon, ChevronDownIcon, 
    InformationCircleIcon, CubeTransparentIcon, TrophyIcon, RocketLaunchIcon, 
    ExclamationCircleIcon, LightBulbIcon, ChatBubbleLeftRightIcon, ClipboardDocumentCheckIcon,
    HeartIcon, ChartBarIcon, BuildingStorefrontIcon,
    BanknotesIcon, AcademicCapIcon, UsersIcon
} from '../components/IconComponents';
import AIAgent from '../components/AIAgent';
import { HierarchicalSection, ImplementationAssessmentData } from '../types';
import { usePdfGenerator } from '../hooks/usePdfGenerator';
import PdfCustomizeModal from '../components/PdfCustomizeModal';
import { usePageTitle } from '../hooks/usePageTitle';

const pageSections: HierarchicalSection[] = [
    { id: 'framework-overview-section', sectionTitleKey: 'frameworkPage.sidebar.overview' },
    { id: 'framework-comparison-section', sectionTitleKey: 'frameworkPage.sidebar.comparison' },
    { id: 'framework-premium-section', sectionTitleKey: 'frameworkPage.sidebar.premium' },
    { id: 'framework-roadmap-section', sectionTitleKey: 'frameworkPage.sidebar.roadmap' },
    { id: 'framework-hurdles-section', sectionTitleKey: 'frameworkPage.sidebar.hurdles' },
    { id: 'framework-insights-section', sectionTitleKey: 'frameworkPage.sidebar.insights' },
    { id: 'framework-synthesis-section', sectionTitleKey: 'frameworkPage.sidebar.synthesis' },
    { id: 'framework-implementation-section', sectionTitleKey: 'frameworkPage.sidebar.implementation' }
];

type AIContextType = {
  title: string;
  systemInstruction: string;
  initialMessage: string;
}

// Main Page Component
const FrameworkPage: React.FC = () => {
    const { t } = useLanguage();
    usePageTitle('nav.frameworkGuide');
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const { isGeneratingPdf, pdfProgress, generatePdf } = usePdfGenerator(pageSections);
  
    return (
        <>
            <div className="max-w-7xl mx-auto py-8">
                 <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl tracking-tight">{t('nav.frameworkGuide')}</h1>
                 </header>

                <InteractiveGuideContent setIsPdfModalOpen={setIsPdfModalOpen} />
            </div>

            {isGeneratingPdf && (
              <div className="pdf-loader-overlay">
                <div className="spinner"></div>
                <p className="text-xl font-semibold mb-2">{t('pdf.generating')}</p>
                <p>{pdfProgress}</p>
              </div>
            )}
             <PdfCustomizeModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} onGenerate={generatePdf} sections={pageSections} />
        </>
    );
};

const InteractiveGuideContent: React.FC<{setIsPdfModalOpen: (isOpen: boolean) => void}> = ({setIsPdfModalOpen}) => {
    const { t } = useLanguage();
    const { isGeneratingPdf } = usePdfGenerator(pageSections);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiContext, setAiContext] = useState<AIContextType | null>(null);
    const [activeSection, setActiveSection] = useState(pageSections[0].id);
    const [openSections, setOpenSections] = useState<Set<string>>(new Set([pageSections[0].id]));
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
    };

    const openAiModal = (context: AIContextType) => {
        setAiContext(context);
        setIsAiModalOpen(true);
    };

    const handleScroll = useCallback(() => {
        const pageYOffset = window.scrollY;
        let newActiveSection = activeSection;

        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                const sectionTop = ref.offsetTop - 120; // Adjust offset for sticky nav
                const sectionHeight = ref.offsetHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    newActiveSection = pageSections[index].id;
                }
            }
        });

        if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
        }
    }, [activeSection]);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const sectionConfig = {
        'framework-overview-section': { 
            component: OverviewSection, 
            icon: <InformationCircleIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.overview', systemInstructionKey: 'frameworkPage.overview.ai.systemInstruction', initialMessageKey: 'frameworkPage.overview.ai.initialMessage', topicKey: 'frameworkPage.overview.ai.topic' }
        },
        'framework-comparison-section': { 
            component: ComparisonSection, 
            icon: <CubeTransparentIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.comparison', systemInstructionKey: 'frameworkPage.comparison.ai.systemInstruction', initialMessageKey: 'frameworkPage.comparison.ai.initialMessage', topicKey: 'frameworkPage.comparison.ai.topic' }
        },
        'framework-premium-section': { 
            component: PremiumSection, 
            icon: <TrophyIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.premium', systemInstructionKey: 'frameworkPage.authenticityPremium.ai.systemInstruction', initialMessageKey: 'frameworkPage.authenticityPremium.ai.initialMessage', topicKey: 'frameworkPage.authenticityPremium.ai.topic' }
        },
        'framework-roadmap-section': { 
            component: RoadmapSection, 
            icon: <RocketLaunchIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.roadmap', systemInstructionKey: 'frameworkPage.roadmap.ai.systemInstruction', initialMessageKey: 'frameworkPage.roadmap.ai.initialMessage', topicKey: 'frameworkPage.roadmap.ai.topic' }
        },
        'framework-hurdles-section': { 
            component: HurdlesSection, 
            icon: <ExclamationCircleIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.hurdles', systemInstructionKey: 'frameworkPage.hurdles.ai.systemInstruction', initialMessageKey: 'frameworkPage.hurdles.ai.initialMessage', topicKey: 'frameworkPage.hurdles.ai.topic' }
        },
        'framework-insights-section': { 
            component: InsightsSection, 
            icon: <LightBulbIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.insights', systemInstructionKey: 'frameworkPage.insights.ai.systemInstruction', initialMessageKey: 'frameworkPage.insights.ai.initialMessage', topicKey: 'frameworkPage.insights.ai.topic' }
        },
        'framework-synthesis-section': { 
            component: SynthesisSection, 
            icon: <ChatBubbleLeftRightIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.synthesis', systemInstructionKey: 'frameworkPage.synthesis.ai.systemInstruction', initialMessageKey: 'frameworkPage.synthesis.ai.initialMessage', topicKey: 'frameworkPage.synthesis.ai.topic' }
        },
        'framework-implementation-section': { 
            component: ImplementationSection, 
            icon: <ClipboardDocumentCheckIcon className="w-6 h-6"/>,
            aiContext: { titleKey: 'frameworkPage.sidebar.implementation', systemInstructionKey: 'frameworkPage.implementation.ai.systemInstruction', initialMessageKey: 'frameworkPage.implementation.ai.initialMessage', topicKey: 'frameworkPage.implementation.ai.topic' }
        },
    };

    return (
        <div className="space-y-4">
            <p className="text-center text-slate-600 max-w-3xl mx-auto">{t('frameworkPage.intro')}</p>
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-64 hidden lg:block">
                    <div className="sticky top-24">
                        <h3 className="text-sm font-semibold uppercase text-slate-500 tracking-wider mb-3">{t('frameworkPage.sidebar.title')}</h3>
                        <nav>
                            <ul className="space-y-2">
                                {pageSections.map(section => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                setOpenSections(prev => new Set(prev).add(section.id));
                                            }}
                                            className={`sidebar-link block text-sm py-2 px-3 rounded-l-md ${activeSection === section.id ? 'active' : 'text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            {t(section.sectionTitleKey)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                         <button
                            onClick={() => setIsPdfModalOpen(true)}
                            disabled={isGeneratingPdf}
                            className="w-full mt-6 bg-slate-700 text-white p-2 rounded-md shadow-sm hover:bg-slate-800 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait text-sm flex items-center justify-center"
                        >
                           {isGeneratingPdf ? (
                               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           ) : (
                               <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                {t('pdf.downloadPdf')}
                                </>
                           )}
                        </button>
                    </div>
                </aside>

                <main className="flex-1 min-w-0 space-y-4">
                   {pageSections.map((section, index) => {
                       const config = sectionConfig[section.id as keyof typeof sectionConfig];
                       if (!config) return null;
                       const SectionContent = config.component;
                       const aiContextData = {
                           title: t(config.aiContext.titleKey),
                           systemInstruction: t(config.aiContext.systemInstructionKey),
                           initialMessage: t(config.aiContext.initialMessageKey),
                       };
                       return (
                           <div key={section.id} ref={el => { sectionRefs.current[index] = el; }}>
                               <CollapsibleSectionCard
                                   id={section.id}
                                   title={t(section.sectionTitleKey)}
                                   isOpen={openSections.has(section.id)}
                                   onToggle={() => toggleSection(section.id)}
                                   onOpenAi={() => openAiModal(aiContextData)}
                                   aiTopic={t(config.aiContext.topicKey)}
                                   icon={config.icon}
                               >
                                   <SectionContent />
                               </CollapsibleSectionCard>
                           </div>
                       );
                   })}
                </main>
            </div>
            {isAiModalOpen && aiContext && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]" onClick={() => setIsAiModalOpen(false)}>
                    <div className="w-full max-w-2xl bg-slate-50 rounded-xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                        <header className="p-4 border-b border-slate-200 flex justify-between items-center">
                           <h2 className="text-lg font-semibold flex items-center text-slate-800">
                                <SparklesIcon className="w-6 h-6 mr-2 text-blue-500"/> {t('frameworkPage.ai.modalTitle', { topic: aiContext.title })}
                           </h2>
                           <button onClick={() => setIsAiModalOpen(false)} className="text-slate-500 hover:text-slate-800 text-2xl font-bold">&times;</button>
                        </header>
                         <AIAgent title={aiContext.title} systemInstruction={aiContext.systemInstruction} initialMessage={aiContext.initialMessage} embedded={true} />
                    </div>
                </div>
            )}
        </div>
    );
};


// --- Section Components ---

interface CollapsibleSectionCardProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onOpenAi: () => void;
  aiTopic: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const CollapsibleSectionCard: React.FC<CollapsibleSectionCardProps> = ({ id, title, isOpen, onToggle, onOpenAi, aiTopic, children, icon }) => {
  const { t } = useLanguage();
  return (
    <section id={id} className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden transition-all duration-300">
      <h2 className="sr-only">{title}</h2>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center space-x-4">
            <div className="text-sky-600 bg-sky-100 p-2 rounded-lg">{icon}</div>
            <span className="text-xl font-bold text-gray-800">{title}</span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div id={`${id}-content`} className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-slate-200/80">
                <div className="pt-6">
                  {children}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 text-center">
                    <button onClick={onOpenAi} className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                        <SparklesIcon className="w-5 h-5 mr-2"/>
                        {t('frameworkPage.ai.askButton', {topic: aiTopic})}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const OverviewSectionPillars: React.FC = () => {
    const { t } = useLanguage();
    const pillars = [
        { key: 'dei', icon: <SparklesIcon className="w-10 h-10 pillar-icon text-pink-500" /> },
        { key: 'business', icon: <RocketLaunchIcon className="w-10 h-10 pillar-icon text-indigo-500" /> },
        { key: 'trust', icon: <UserGroupIcon className="w-10 h-10 pillar-icon text-green-500" /> },
        { key: 'accountability', icon: <ShieldCheckIcon className="w-10 h-10 pillar-icon text-yellow-500" /> },
    ];

    return (
        <div className="my-12">
            <h4 className="text-2xl font-bold text-slate-800 text-center mb-8">{t('frameworkPage.pillars.title')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {pillars.map(pillar => (
                    <div key={pillar.key} className="pillar-group">
                        <div className="flex justify-center items-center mb-4">
                            {pillar.icon}
                        </div>
                        <h5 className="font-bold text-lg text-slate-700 pillar-text">{t(`frameworkPage.pillars.${pillar.key}.title`)}</h5>
                        <p className="text-sm text-slate-500 mt-1">{t(`frameworkPage.pillars.${pillar.key}.description`)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OverviewSection: React.FC = () => {
    const { t } = useLanguage();
    
    const InfoCard: React.FC<{ paradigm: 'oldParadigm' | 'newVision' }> = ({ paradigm }) => (
        <div className={`flex flex-col h-full rounded-xl p-6 ${paradigm === 'oldParadigm' ? 'bg-slate-100' : 'bg-sky-50'}`}>
            <p className={`text-5xl font-bold mb-3 ${paradigm === 'oldParadigm' ? 'text-slate-600' : 'text-sky-600'}`}>
                {t(`frameworkPage.overview.${paradigm}.stat`)}
            </p>
            <h3 className="text-xl font-semibold text-slate-800">{t(`frameworkPage.overview.${paradigm}.title`)}</h3>
            <p className="text-slate-600 mt-1 mb-4">{t(`frameworkPage.overview.${paradigm}.description`)}</p>
            <div className="text-xs text-slate-500 border-t border-slate-300 pt-3 mt-auto space-y-2">
                <p>{t(`frameworkPage.overview.${paradigm}.details`)}</p>
                <p className="font-semibold">{t(`frameworkPage.overview.${paradigm}.source`)}</p>
            </div>
            <a href="#" className="text-sm font-semibold text-sky-600 mt-4 hover:underline">{t(`frameworkPage.overview.${paradigm}.learnMore`)}</a>
        </div>
    );

    return (
        <div className="text-center">
            <h4 className="text-lg text-sky-700 font-semibold mb-4">{t('frameworkPage.overview.subtitle')}</h4>
            <p className="max-w-3xl mx-auto text-slate-600 mb-8">{t('frameworkPage.overview.introParagraph')}</p>
            
            <OverviewSectionPillars />

            <div className="grid md:grid-cols-2 gap-6 text-left">
                <InfoCard paradigm="oldParadigm" />
                <InfoCard paradigm="newVision" />
            </div>
        </div>
    );
};


const ComparisonSection: React.FC = () => {
    const { t } = useLanguage();
    type Criterion = 'businessIntegration' | 'communityPower' | 'accountability';
    const [selected, setSelected] = useState<Criterion>('businessIntegration');

    // FIX: Changed icon type from JSX.Element to React.ReactElement to resolve namespace error.
    const criteria: { key: Criterion; icon: React.ReactElement; labelKey: string }[] = [
        { key: 'businessIntegration', icon: <TrendingUpIcon className="w-5 h-5 mr-2"/>, labelKey: 'frameworkPage.comparison.businessIntegration'},
        { key: 'communityPower', icon: <UserGroupIcon className="w-5 h-5 mr-2"/>, labelKey: 'frameworkPage.comparison.communityPower'},
        { key: 'accountability', icon: <ShieldCheckIcon className="w-5 h-5 mr-2"/>, labelKey: 'frameworkPage.comparison.accountability'},
    ];
    
    return (
        <>
             <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">{t('frameworkPage.comparison.subtitle')}</p>
             <div className="border-b border-slate-200 mb-4">
                <nav className="-mb-px flex justify-center space-x-6" aria-label="Tabs">
                    {criteria.map(c => (
                        <button key={c.key} onClick={() => setSelected(c.key)} className={`comparison-button flex items-center whitespace-nowrap py-3 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 ${selected === c.key ? 'active' : ''}`}>
                           {c.icon} {t(c.labelKey)}
                        </button>
                    ))}
                </nav>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {['csr', 'esg', 'apa'].map(model => (
                    <div key={model} className={`rounded-lg p-4 h-full bg-${model === 'csr' ? 'slate' : model === 'esg' ? 'sky' : 'green'}-50`}>
                        <h3 className={`text-lg font-bold mb-2 text-center text-${model === 'csr' ? 'slate' : model === 'esg' ? 'sky' : 'green'}-800`}>{t(`frameworkPage.comparison.${model}.title`)}</h3>
                        <p className={`text-sm text-${model === 'csr' ? 'slate' : model === 'esg' ? 'sky' : 'green'}-700`}>{t(`frameworkPage.comparison.${model}.${selected}`)}</p>
                    </div>
                ))}
             </div>
        </>
    );
};

const PremiumSection: React.FC = () => {
    const { t } = useLanguage();
    const [activePremium, setActivePremium] = useState('risk');
    
    const premiumData = {
        risk: { Icon: ShieldCheckIcon, titleKey: 'frameworkPage.authenticityPremium.risk.title', descriptionKey: 'frameworkPage.authenticityPremium.risk.description' },
        loyalty: { Icon: HeartIcon, titleKey: 'frameworkPage.authenticityPremium.loyalty.title', descriptionKey: 'frameworkPage.authenticityPremium.loyalty.description' },
        capital: { Icon: ChartBarIcon, titleKey: 'frameworkPage.authenticityPremium.capital.title', descriptionKey: 'frameworkPage.authenticityPremium.capital.description' },
        innovation: { Icon: LightBulbIcon, titleKey: 'frameworkPage.authenticityPremium.innovation.title', descriptionKey: 'frameworkPage.authenticityPremium.innovation.description' },
    };
    
    const activeData = premiumData[activePremium as keyof typeof premiumData];

    return (
        <div className="text-center">
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('frameworkPage.authenticityPremium.subtitle')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
                {Object.entries(premiumData).map(([key, {Icon, titleKey}]) => (
                    <div 
                        key={key}
                        onClick={() => setActivePremium(key)}
                        className={`premium-item text-center cursor-pointer p-2 rounded-lg ${activePremium === key ? 'active' : ''}`}
                    >
                        <div className="premium-icon-wrapper mx-auto">
                           <Icon className={`w-8 h-8 premium-icon ${activePremium === key ? 'text-sky-500' : 'text-slate-500'}`} />
                        </div>
                        <h3 className={`mt-3 font-semibold text-sm transition-colors ${activePremium === key ? 'text-sky-700' : 'text-slate-600'}`}>{t(titleKey)}</h3>
                    </div>
                ))}
            </div>
            <div className="bg-sky-50 p-6 rounded-xl border border-sky-200 min-h-[120px] transition-all duration-300">
                <h3 className="text-lg font-bold text-sky-800 mb-2">{t(activeData.titleKey)}</h3>
                <p className="text-sky-900 leading-relaxed">{t(activeData.descriptionKey)}</p>
            </div>
        </div>
    );
};

const RoadmapSection: React.FC = () => {
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(1);
    const steps = [1, 2, 3, 4, 5];
    const progressPercentage = ((activeStep - 1) / (steps.length - 1)) * 100;
    
    return (
        <div className="w-full">
            <div className="relative mb-8">
                <div className="roadmap-progress-bar">
                    <div className="roadmap-progress-bar-inner" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between items-start">
                    {steps.map(step => (
                        <button key={step} onClick={() => setActiveStep(step)} className={`roadmap-step-button flex flex-col items-center space-y-2 ${activeStep === step ? 'active' : ''}`}>
                            <div className="roadmap-step-circle flex items-center justify-center font-bold text-lg">{step}</div>
                            <span className="roadmap-step-title text-xs font-semibold text-center text-slate-500 w-24">{t(`frameworkPage.roadmap.step${step}.title`)}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="roadmap-content-pane">
                 <h3 className="font-bold text-lg text-slate-800 mb-2">{t(`frameworkPage.roadmap.step${activeStep}.title`)}</h3>
                 <p className="text-slate-600">{t(`frameworkPage.roadmap.step${activeStep}.description`)}</p>
            </div>
        </div>
    );
};

const HurdlesSection: React.FC = () => {
    const {t} = useLanguage();
    const [openHurdle, setOpenHurdle] = useState<number | null>(1);
    const hurdles = [1, 2, 3];
    return <div className="space-y-3">
            {hurdles.map(pairNum => (
                <div key={pairNum} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                    <button onClick={() => setOpenHurdle(openHurdle === pairNum ? null : pairNum)} className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-100 transition-colors">
                        <h3 className="font-semibold text-md text-slate-800">{t(`frameworkPage.hurdles.pair${pairNum}.title`)}</h3>
                        <span className={`transform transition-transform duration-300 ${openHurdle === pairNum ? 'rotate-180' : ''}`}><ChevronDownIcon className="w-5 h-5 text-slate-500" /></span>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out grid ${openHurdle === pairNum ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                            <div className="p-4 border-t border-slate-200 space-y-3">
                                <div className="border-l-4 border-red-400 pl-3"><h4 className="font-bold text-red-600 text-sm mb-1">{t('frameworkPage.hurdles.challenge')}</h4><p className="text-sm text-slate-600">{t(`frameworkPage.hurdles.pair${pairNum}.challenge`)}</p></div>
                                <div className="border-l-4 border-green-400 pl-3"><h4 className="font-bold text-green-600 text-sm mb-1">{t('frameworkPage.hurdles.solution')}</h4><p className="text-sm text-slate-600 font-medium">{t(`frameworkPage.hurdles.pair${pairNum}.solution`)}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>;
};

const InsightsSection: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'governments' | 'foundations'>('governments');

    // Data structure for tabs and their content
    const TABS = {
        governments: {
            titleKey: 'frameworkPage.insights.forGovernments.title',
            icon: BuildingStorefrontIcon,
            insights: [
                { key: 'policy', icon: ClipboardDocumentCheckIcon, title: 'frameworkPage.insights.forGovernments.policy.title', desc: 'frameworkPage.insights.forGovernments.policy.description' },
                { key: 'incentivize', icon: SparklesIcon, title: 'frameworkPage.insights.forGovernments.incentivize.title', desc: 'frameworkPage.insights.forGovernments.incentivize.description' },
                { key: 'capacity', icon: AcademicCapIcon, title: 'frameworkPage.insights.forGovernments.capacity.title', desc: 'frameworkPage.insights.forGovernments.capacity.description' },
            ],
        },
        foundations: {
            titleKey: 'frameworkPage.insights.forFoundations.title',
            icon: BanknotesIcon,
            insights: [
                { key: 'funding', icon: CubeTransparentIcon, title: 'frameworkPage.insights.forFoundations.funding.title', desc: 'frameworkPage.insights.forFoundations.funding.description' },
                { key: 'architecture', icon: ShieldCheckIcon, title: 'frameworkPage.insights.forFoundations.architecture.title', desc: 'frameworkPage.insights.forFoundations.architecture.description' },
                { key: 'convene', icon: UsersIcon, title: 'frameworkPage.insights.forFoundations.convene.title', desc: 'frameworkPage.insights.forFoundations.convene.description' },
            ],
        },
    };
    
    const activeTabData = TABS[activeTab];

    return (
        <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
            {/* Left Column: Selectors */}
            <div className="md:col-span-4 space-y-3 mb-8 md:mb-0">
                {Object.entries(TABS).map(([key, tab]) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as 'governments' | 'foundations')}
                            className={`insights-selector-card ${isActive ? 'active' : ''}`}
                            role="tab"
                            aria-selected={isActive}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="insights-selector-icon-wrapper">
                                    <tab.icon className="w-6 h-6 insights-selector-icon" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 text-left">{t(tab.titleKey)}</h3>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Right Column: Content Display */}
            <div className="md:col-span-8">
                 <div key={activeTab} className="insights-content-wrapper space-y-4">
                    {activeTabData.insights.map((item) => (
                        <div key={item.key} className="insight-content-card">
                            <div className="flex items-start space-x-4">
                                <div className="insight-content-icon-wrapper">
                                    <item.icon className="w-6 h-6 insight-content-icon" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-md mb-1">{t(item.title)}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{t(item.desc)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};


const SynthesisSection: React.FC = () => {
    const { t } = useLanguage();
    const synthesisData = [
        { icon: ExclamationCircleIcon, iconBg: 'bg-red-100', iconColor: 'text-red-600', title: 'frameworkPage.synthesis.problem.title', subtitle: 'frameworkPage.synthesis.problem.subtitle', description: 'frameworkPage.synthesis.problem.description' },
        { icon: SparklesIcon, iconBg: 'bg-sky-100', iconColor: 'text-sky-600', title: 'frameworkPage.synthesis.power.title', subtitle: 'frameworkPage.synthesis.power.subtitle', description: 'frameworkPage.synthesis.power.description' },
        { icon: RocketLaunchIcon, iconBg: 'bg-green-100', iconColor: 'text-green-600', title: 'frameworkPage.synthesis.future.title', subtitle: 'frameworkPage.synthesis.future.subtitle', description: 'frameworkPage.synthesis.future.description' },
    ];
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {synthesisData.map((item, index) => (
                <div key={item.title} className="synthesis-card flex flex-col p-6 rounded-xl">
                    <div className={`synthesis-icon-wrapper ${item.iconBg}`}>
                        <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 text-center">{t(item.title)}</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-1 mb-4 text-center">{t(item.subtitle)}</p>
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow">{t(item.description)}</p>
                </div>
            ))}
        </div>
    );
};

const ImplementationSection: React.FC = () => {
    const {t} = useLanguage();
    const [assessmentData, setAssessmentData] = useState<ImplementationAssessmentData>({});

    const handleDataChange = (key: keyof ImplementationAssessmentData, value: string) => {
        setAssessmentData(prev => ({...prev, [key]: value}));
    };

    const generateBrief = () => {
        let brief = `${t('frameworkPage.implementation.briefTitle')}\n${t('frameworkPage.implementation.briefIntro')}\n\n`;
        stages.forEach(stage => {
            brief += `--- ${t(stage.titleKey)} ---\n\n`;
            stage.questions.forEach(q => {
                brief += `Q: ${t(q.labelKey)}\n`;
                brief += `A: ${assessmentData[q.key] || 'Not answered'}\n\n`;
            });
        });
        alert(brief); // In a real app, this would format it nicely in a modal or download it.
        console.log(brief);
    };
    
    interface Question {
        key: keyof ImplementationAssessmentData;
        labelKey: string;
    }
    interface Stage {
        titleKey: string;
        questions: Question[];
    }
    const stages: Stage[] = [
        { titleKey: 'frameworkPage.implementation.stage1', questions: [{key: 's1q1', labelKey: 'frameworkPage.implementation.q1.awareness'}, {key: 's1q2', labelKey: 'frameworkPage.implementation.q2.awareness'}, {key: 's1q3', labelKey: 'frameworkPage.implementation.q3.awareness'}] },
        { titleKey: 'frameworkPage.implementation.stage2', questions: [{key: 's2q1', labelKey: 'frameworkPage.implementation.q1.planning'}, {key: 's2q2', labelKey: 'frameworkPage.implementation.q2.planning'}, {key: 's2q3', labelKey: 'frameworkPage.implementation.q3.planning'}] },
        { titleKey: 'frameworkPage.implementation.stage3', questions: [{key: 's3q1', labelKey: 'frameworkPage.implementation.q1.implementation'}, {key: 's3q2', labelKey: 'frameworkPage.implementation.q2.implementation'}, {key: 's3q3', labelKey: 'frameworkPage.implementation.q3.implementation'}] },
        { titleKey: 'frameworkPage.implementation.stage4', questions: [{key: 's4q1', labelKey: 'frameworkPage.implementation.q1.integration'}, {key: 's4q2', labelKey: 'frameworkPage.implementation.q2.integration'}, {key: 's4q3', labelKey: 'frameworkPage.implementation.q3.integration'}] },
        { titleKey: 'frameworkPage.implementation.stage5', questions: [{key: 's5q1', labelKey: 'frameworkPage.implementation.q1.review'}, {key: 's5q2', labelKey: 'frameworkPage.implementation.q2.review'}, {key: 's5q3', labelKey: 'frameworkPage.implementation.q3.review'}] },
    ];

    return <>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">{t('frameworkPage.implementation.description')}</p>
        <div className="space-y-6">
            {stages.map(stage => (
                <div key={stage.titleKey} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">{t(stage.titleKey)}</h3>
                    <div className="space-y-4">
                        {stage.questions.map(q => (
                            <div key={q.key}>
                                <label htmlFor={q.key} className="block text-sm font-medium text-slate-600 mb-1">{t(q.labelKey)}</label>
                                <textarea id={q.key} rows={3} value={assessmentData[q.key] || ''} onChange={e => handleDataChange(q.key, e.target.value)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-6 text-center">
            <button onClick={generateBrief} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('frameworkPage.implementation.generateBrief')}</button>
        </div>
    </>;
};


export default FrameworkPage;