import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import { RocketLaunchIcon, SparklesIcon, ShieldCheckIcon, CubeTransparentIcon, UserIcon, GlobeAltIcon, SearchIcon, UserGroupIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';
import RobustImage from '../components/RobustImage';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('nav.home');
  type TabId = 'mission' | 'vision' | 'valueProposition';
  const [activeTab, setActiveTab] = useState<TabId>('mission');

  const TABS = [
    { 
      id: 'mission' as TabId, 
      titleKey: 'homePage.strategicIdentity.mission.title',
      summaryKey: 'homePage.strategicIdentity.mission.summary',
      textKey: 'homePage.strategicIdentity.mission.text', 
      Icon: RocketLaunchIcon,
      bgImage: "url('https://source.unsplash.com/8LtrMQfeDkQ')"
    },
    { 
      id: 'vision' as TabId, 
      titleKey: 'homePage.strategicIdentity.vision.title',
      summaryKey: 'homePage.strategicIdentity.vision.summary',
      textKey: 'homePage.strategicIdentity.vision.text', 
      Icon: SparklesIcon,
      bgImage: "url('https://source.unsplash.com/r9k91QzGf64')"
    },
    { 
      id: 'valueProposition' as TabId, 
      titleKey: 'homePage.strategicIdentity.valueProposition.title',
      summaryKey: 'homePage.strategicIdentity.valueProposition.summary',
      Icon: ShieldCheckIcon,
      bgImage: "url('https://source.unsplash.com/3_s2z2-c3z0')"
    }
  ];

  const whyAPAItems = [
      { icon: CubeTransparentIcon, titleKey: "homePage.whyApa.cards.platform.title", descriptionKey: "homePage.whyApa.cards.platform.description" },
      { icon: UserIcon, titleKey: "homePage.whyApa.cards.experience.title", descriptionKey: "homePage.whyApa.cards.experience.description" },
      { icon: GlobeAltIcon, titleKey: "homePage.whyApa.cards.access.title", descriptionKey: "homePage.whyApa.cards.access.description" },
      { icon: SparklesIcon, titleKey: "homePage.whyApa.cards.concierge.title", descriptionKey: "homePage.whyApa.cards.concierge.description" }
  ];

  const resilienceItems = [
      { 
          icon: SearchIcon, 
          titleKey: "homePage.resilience.cards.insight.title", 
          descriptionKey: "homePage.resilience.cards.insight.description" 
      },
      { 
          icon: UserGroupIcon, 
          titleKey: "homePage.resilience.cards.solutions.title", 
          descriptionKey: "homePage.resilience.cards.solutions.description" 
      },
      { 
          icon: ShieldCheckIcon, 
          titleKey: "homePage.resilience.cards.partnerships.title", 
          descriptionKey: "homePage.resilience.cards.partnerships.description" 
      }
  ];

  const partnerLogos = [
    'google.com',
    'microsoft.com',
    'worldbank.org',
    'un.org',
    'afdb.org',
    'gatesfoundation.org',
    'fordfoundation.org',
    'mastercardfoundation.org',
    'rockefellerfoundation.org',
    'usaid.gov',
    'au.int',
    'uneca.org',
    'eximbankindia.in',
    'eximbank.gov.cn',
    'exim.gov',
    'edc.ca',
    'kfw-ipex-bank.de',
    'sace.it',
    'bpifrance.fr',
    'serv.ch'
  ];

  const activeTabData = TABS.find(tab => tab.id === activeTab)!;

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 md:-mt-12">
        <div className="h-[70vh] md:h-[80vh] bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://source.unsplash.com/Nq3-_6-sFSQ')"}}>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 text-white">
                <div className="max-w-3xl">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
                        {t('homePage.title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl drop-shadow-sm">
                        {t('homePage.description')}
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Link
                        to={ROUTES.TOURS}
                        className="inline-block bg-white hover:bg-opacity-90 text-primary-dark font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
                        style={{ color: 'var(--color-primary-dark)' }}
                      >
                        {t('homePage.ctaTours')}
                      </Link>
                      <Link
                        to={ROUTES.RESOURCES}
                        className="inline-block bg-transparent border border-white/50 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300"
                      >
                        {t('homePage.ctaResources')}
                      </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW: Resilience Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">{t('homePage.resilience.title')}</h2>
            <p className="text-slate-600 text-lg">{t('homePage.resilience.subtitle')}</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
            {resilienceItems.map((item, index) => (
                <div key={index} className="resilience-card">
                    <div className="icon-wrapper">
                        <item.icon className="w-8 h-8"/>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{t(item.titleKey)}</h3>
                    <p className="text-slate-600 text-sm">{t(item.descriptionKey)}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Strategic Identity Section */}
      <section className="py-20 bg-background-cream">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif text-4xl font-bold text-slate-800 mb-4">{t('homePage.strategicIdentity.title')}</h2>
                <p className="text-slate-600 text-lg">
                    {t('homePage.strategicIdentity.description')}
                </p>
            </div>
            <div className="mt-12 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
                {/* Left Column: Selectors */}
                <div className="md:col-span-1 space-y-4">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`identity-selector-card ${isActive ? 'active' : ''}`}
                                aria-selected={isActive}
                                role="tab"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="identity-selector-icon-wrapper">
                                        <tab.Icon className="w-6 h-6 identity-selector-icon" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 text-left">{t(tab.titleKey)}</h3>
                                        <p className="text-sm text-slate-500 text-left">{t(tab.summaryKey)}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Right Column: Content Display */}
                <div className="md:col-span-2 relative">
                    <div key={activeTabData.id} className="identity-content-pane-new" style={{ backgroundImage: activeTabData.bgImage }}>
                        <div className="max-w-xl">
                             <div className="identity-content-text-wrapper">
                                <h3 className="font-serif text-4xl font-bold mb-4">
                                    {t(activeTabData.titleKey)}
                                </h3>
                                {activeTab === 'valueProposition' ? (
                                    <div className="space-y-4">
                                        <p className="text-slate-200 leading-relaxed text-lg">{t('homePage.strategicIdentity.valueProposition.intro')}</p>
                                        <ul className="space-y-3 pt-2">
                                            {['businesses', 'funders', 'governments', 'communities'].map(key => (
                                                <li key={key} className="flex items-start">
                                                    <ShieldCheckIcon className="w-5 h-5 mr-3 text-accent-gold flex-shrink-0 mt-1" style={{color: 'var(--color-accent-gold)'}}/>
                                                    <div>
                                                        <h4 className="font-semibold text-white">{t(`homePage.strategicIdentity.valueProposition.points.${key}.title`)}</h4>
                                                        <p className="text-slate-300 text-base">{t(`homePage.strategicIdentity.valueProposition.points.${key}.text`)}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-slate-200 leading-relaxed text-lg">{activeTabData.textKey && t(activeTabData.textKey)}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Why APA Section - Horizontal Scroll */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold text-slate-800 mb-4">{t('homePage.whyApa.title')}</h2>
            <p className="text-slate-600 text-lg">
                {t('homePage.whyApa.subtitle')}
            </p>
        </div>
        <div className="mt-12">
            <div className="why-apa-scroller">
                <div className="flex space-x-6 px-4">
                    {whyAPAItems.map((item, index) => (
                        <div key={index} className="why-apa-card">
                            <div className="bg-sky-100 text-sky-600 inline-block p-3 rounded-lg mb-5">
                                <item.icon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">{t(item.titleKey)}</h3>
                            <p className="text-slate-600 text-sm">{t(item.descriptionKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-slate-800 mb-4">{t('homePage.trustedBy.title')}</h2>
          <p className="text-slate-600 text-lg">
            {t('homePage.trustedBy.description')}
          </p>
        </div>
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 items-center justify-items-center">
            {partnerLogos.map(domain => (
              <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" key={domain} className="flex justify-center" title={domain}>
                <RobustImage 
                  src={`https://logo.clearbit.com/${domain}?size=120`} 
                  alt={`${domain} logo`}
                  className="h-10 w-auto object-contain filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out"
                  width="120"
                  height="40"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;