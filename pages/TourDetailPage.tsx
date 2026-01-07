import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_TOURS, ROUTES } from '../constants';
import { Tour, ItineraryItem, Facilitator, Testimonial, FAQItem, HierarchicalSection, TourDifficulty } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
    BookOpenIcon, CalendarDaysIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, 
    CurrencyDollarIcon, InformationCircleIcon, MapPinIcon, PhotoIcon, SparklesIcon, 
    UserGroupIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon, TrophyIcon, PlayIcon
} from '../components/IconComponents';
import { usePdfGenerator } from '../hooks/usePdfGenerator';
import PdfCustomizeModal from '../components/PdfCustomizeModal';
import DownloadPdfButton from '../components/DownloadPdfButton';
import { usePageTitle } from '../hooks/usePageTitle';
import SocialShareButtons from '../components/SocialShareButtons';
import RobustImage from '../components/RobustImage';

const pageSections: HierarchicalSection[] = [
    { id: 'tour-description-section', sectionTitleKey: 'tourDetailPage.detailedDescription' },
    { id: 'tour-objectives-section', sectionTitleKey: 'tourCard.objectives' },
    { id: 'tour-itinerary-section', sectionTitleKey: 'tourDetailPage.itinerary' },
    { id: 'tour-gallery-section', sectionTitleKey: 'tourDetailPage.gallery' },
    { id: 'tour-facilitators-section', sectionTitleKey: 'tourDetailPage.facilitators' },
    { id: 'tour-testimonials-section', sectionTitleKey: 'tourDetailPage.testimonials' },
    { id: 'tour-faq-section', sectionTitleKey: 'tourDetailPage.faq' },
];

const getDifficultyStyles = (level: TourDifficulty, t: (key: string) => string) => {
    switch (level) {
      case TourDifficulty.EXPLORER:
        return { badge: 'bg-sky-100 text-sky-800', icon: 'text-sky-500', label: t(`tourDifficulty.${level}`) };
      case TourDifficulty.ADVENTURER:
        return { badge: 'bg-amber-100 text-amber-800', icon: 'text-amber-500', label: t(`tourDifficulty.${level}`) };
      case TourDifficulty.PIONEER:
        return { badge: 'bg-red-100 text-red-800', icon: 'text-red-500', label: t(`tourDifficulty.${level}`) };
      default:
        return { badge: 'bg-slate-100 text-slate-800', icon: 'text-slate-500', label: t(`tourDifficulty.${level}`) };
    }
};

const getYouTubeThumbnail = (url: string) => {
    const videoIdMatch = url.match(/embed\/([^?]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
        return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    }
    // Fallback image if pattern doesn't match
    return 'https://source.unsplash.com/random/80x80?video';
};


const TourDetailPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { t, translateField } = useLanguage();
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openItinerary, setOpenItinerary] = useState<number | null>(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const { isGeneratingPdf, pdfProgress, generatePdf } = usePdfGenerator(pageSections);
  
  const pageTitle = tour ? translateField(tour.title) : t('tourDetailPage.loadingTour');
  usePageTitle(pageTitle, false);

  useEffect(() => {
    // Simulate fetching tour data
    const foundTour = MOCK_TOURS.find(t => t.id === tourId);
    setTour(foundTour || null);
    setIsLoading(false);
  }, [tourId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner text={t('tourDetailPage.loadingTour')} size="lg" /></div>;
  }

  if (!tour) {
    return <div className="text-center py-20 text-2xl font-semibold text-red-600">{t('tourDetailPage.tourNotFound')}</div>;
  }
  
  const applicationPath = ROUTES.APPLY_TOUR.replace(':tourId', tour.id);
  const feedbackPath = ROUTES.FEEDBACK_TOUR.replace(':tourId', tour.id);
  const galleryItems = tour.gallery || [];
  const difficultyInfo = getDifficultyStyles(tour.difficulty, t);

  const sidebarLinks = [
      ...(tour.gallery && tour.gallery.length > 0 ? [{ id: 'tour-gallery-section', titleKey: 'tourDetailPage.gallery', icon: <PhotoIcon className="w-5 h-5" /> }] : []),
      ...(tour.facilitators && tour.facilitators.length > 0 ? [{ id: 'tour-facilitators-section', titleKey: 'tourDetailPage.facilitators', icon: <UsersIcon className="w-5 h-5" /> }] : []),
      ...(tour.testimonials && tour.testimonials.length > 0 ? [{ id: 'tour-testimonials-section', titleKey: 'tourDetailPage.testimonials', icon: <SparklesIcon className="w-5 h-5" /> }] : []),
      ...(tour.faq && tour.faq.length > 0 ? [{ id: 'tour-faq-section', titleKey: 'tourDetailPage.faq', icon: <BookOpenIcon className="w-5 h-5" /> }] : []),
  ];

  const handlePrevItem = () => {
    setCurrentGalleryIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length);
  };
  const handleNextItem = () => {
    setCurrentGalleryIndex(prev => (prev + 1) % galleryItems.length);
  };

  const shareUrl = window.location.href;
  const shareTitle = translateField(tour.title);
  const currentGalleryItem = galleryItems[currentGalleryIndex];

  return (
    <>
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3">{translateField(tour.title)}</h1>
        <p className="text-lg text-slate-600 max-w-3xl">{translateField(tour.description)}</p>
      </header>

      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        <main className="lg:col-span-2 space-y-12">
            <div className="aspect-video w-full rounded-xl shadow-lg overflow-hidden">
                <RobustImage 
                    src={tour.image} 
                    alt={translateField(tour.title)} 
                    className="w-full h-full object-cover" 
                    width="1280" 
                    height="720" 
                    sizes="(max-width: 1024px) 100vw, 66vw"
                />
            </div>

            {tour.detailedDescription && (
              <section id="tour-description-section">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center"><InformationCircleIcon className="w-7 h-7 mr-2 text-blue-600"/>{t('tourDetailPage.detailedDescription')}</h2>
                <div className="prose prose-slate max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{translateField(tour.detailedDescription)}</p>
                </div>
              </section>
            )}

            {tour.objectives && tour.objectives.length > 0 && (
              <section id="tour-objectives-section">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center"><CheckCircleIcon className="w-7 h-7 mr-2 text-green-600"/>{t('tourCard.objectives')}</h2>
                <ul className="space-y-2">
                  {tour.objectives.map((obj, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{translateField(obj)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tour.itinerary && tour.itinerary.length > 0 && (
              <section id="tour-itinerary-section">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><MapPinIcon className="w-7 h-7 mr-2 text-purple-600"/>{t('tourDetailPage.itinerary')}</h2>
                <div className="space-y-3">
                  {tour.itinerary.map((item: ItineraryItem, index: number) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                      <button 
                        onClick={() => setOpenItinerary(openItinerary === index ? null : index)}
                        className="w-full flex justify-between items-center text-left p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                        aria-expanded={openItinerary === index}
                        aria-controls={`itinerary-content-${index}`}
                      >
                        <span className="font-medium text-blue-700">{translateField(item.day)}: {translateField(item.title)}</span>
                        <ChevronDownIcon className={`w-5 h-5 text-blue-700 transform transition-transform duration-300 ${openItinerary === index ? 'rotate-180' : ''}`}/>
                      </button>
                      <div id={`itinerary-content-${index}`} className={`transition-all duration-500 ease-in-out grid ${openItinerary === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <div className="overflow-hidden">
                              <div className="p-4 border-t border-gray-200">
                                  <p className="text-gray-600">{translateField(item.description)}</p>
                              </div>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </main>
        
        <aside className="hidden lg:block lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4">{t('tourDetailPage.quickInfo')}</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center text-slate-700"><TrophyIcon className={`w-5 h-5 mr-3 ${difficultyInfo.icon} flex-shrink-0`} /> <strong>{t('tourCard.difficulty')}:</strong><span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded-full ${difficultyInfo.badge}`}>{difficultyInfo.label}</span></div>
                        <div className="flex items-center text-slate-700"><UserGroupIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" /> <strong>{t('tourCard.targetAudience')}:</strong>&nbsp;<span className="flex-1">{translateField(tour.targetAudience)}</span></div>
                        <div className="flex items-center text-slate-700"><CalendarDaysIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" /> <strong>{t('tourCard.duration')}:</strong>&nbsp;{translateField(tour.duration)}</div>
                        <div className="flex items-center text-slate-700"><CurrencyDollarIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" /> <strong>{t('tourCard.price')}:</strong>&nbsp;{translateField(tour.price)}</div>
                    </div>
                     <div className="mt-6 pt-4 border-t space-y-3">
                         <Link to={applicationPath} className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 mr-2"/> {t('tourDetailPage.applyForThisTour')}
                         </Link>
                         <Link to={feedbackPath} className="w-full text-center bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 mr-2"/> {t('tourDetailPage.giveFeedbackForThisTour')}
                         </Link>
                    </div>
                </div>

                <SocialShareButtons url={shareUrl} title={shareTitle} titleKey="tourDetailPage.shareJourney" />

                {sidebarLinks.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4">{t('tourDetailPage.onThisPage')}</h3>
                        <ul className="space-y-1">
                            {sidebarLinks.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`} className="flex items-center text-sm text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-md p-2 transition-colors">
                                        <span className="mr-3 text-slate-400">{link.icon}</span>
                                        {t(link.titleKey)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
      </div>

      <div className="mt-12 space-y-12">
        {galleryItems.length > 0 && (
            <section id="tour-gallery-section" className="pt-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center"><PhotoIcon className="w-8 h-8 mr-3 text-teal-600"/>{t('tourDetailPage.gallery')}</h2>
              <div className="relative w-full max-w-4xl mx-auto">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-gray-200">
                      {currentGalleryItem.type === 'image' ? (
                          <RobustImage 
                              src={currentGalleryItem.url} 
                              alt={`Gallery item ${currentGalleryIndex + 1}`} 
                              className="absolute inset-0 w-full h-full object-cover"
                              width="1024"
                              height="576"
                              sizes="(max-width: 1024px) 100vw, 896px"
                              loading="lazy"
                          />
                      ) : (
                          <iframe
                              src={currentGalleryItem.url}
                              title="Tour Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                          ></iframe>
                      )}
                  </div>

                  {galleryItems.length > 1 && (
                      <>
                          <button onClick={handlePrevItem} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Previous image">
                              <ChevronLeftIcon className="w-6 h-6" />
                          </button>
                          <button onClick={handleNextItem} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Next image">
                              <ChevronRightIcon className="w-6 h-6" />
                          </button>
                      </>
                  )}

                  <div className="mt-4 flex justify-center space-x-2 overflow-x-auto p-2">
                      {galleryItems.map((item, index) => (
                          <button key={index} onClick={() => setCurrentGalleryIndex(index)} className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${currentGalleryIndex === index ? 'ring-2 ring-sky-500 ring-offset-2' : 'opacity-60 hover:opacity-100'}`}>
                              <RobustImage src={item.type === 'image' ? item.url : getYouTubeThumbnail(item.url)} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" width="80" height="80" sizes="80px" loading="lazy" />
                               {item.type === 'video' && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <PlayIcon className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                              )}
                          </button>
                      ))}
                  </div>
              </div>
            </section>
          )}

          {tour.facilitators && tour.facilitators.length > 0 && (
             <section id="tour-facilitators-section" className="pt-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center"><UsersIcon className="w-8 h-8 mr-3 text-indigo-600"/>{t('tourDetailPage.facilitators')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tour.facilitators.map((facilitator: Facilitator, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                        <RobustImage src={facilitator.image} alt={translateField(facilitator.name)} className="w-20 h-20 rounded-full object-cover flex-shrink-0" width="80" height="80" sizes="80px" loading="lazy"/>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{translateField(facilitator.name)}</h3>
                            <p className="text-sm text-gray-500">{translateField(facilitator.bio)}</p>
                        </div>
                    </div>
                ))}
              </div>
            </section>
          )}

          {tour.testimonials && tour.testimonials.length > 0 && (
            <section id="tour-testimonials-section" className="pt-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center"><SparklesIcon className="w-8 h-8 mr-3 text-yellow-500"/>{t('tourDetailPage.testimonials')}</h2>
                <div className="space-y-4">
                    {tour.testimonials.map((testimonial: Testimonial, index: number) => (
                        <blockquote key={index} className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500">
                            <p className="text-gray-700 italic">"{translateField(testimonial.quote)}"</p>
                            <cite className="block text-right text-sm font-medium text-gray-600 mt-2">- {translateField(testimonial.author)}</cite>
                        </blockquote>
                    ))}
                </div>
            </section>
          )}

          {tour.faq && tour.faq.length > 0 && (
            <section id="tour-faq-section" className="pt-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center"><BookOpenIcon className="w-8 h-8 mr-3 text-orange-600"/>{t('tourDetailPage.faq')}</h2>
              <div className="space-y-3">
                {tour.faq.map((item: FAQItem, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                    <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex justify-between items-center text-left p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                        aria-expanded={openFaq === index}
                        aria-controls={`faq-content-${index}`}
                    >
                      <span className="font-medium text-gray-700">{translateField(item.question)}</span>
                      <ChevronDownIcon className={`w-5 h-5 text-gray-700 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}/>
                    </button>
                    <div id={`faq-content-${index}`} className={`transition-all duration-500 ease-in-out grid ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                            <div className="p-4 border-t border-gray-200">
                               <p className="text-gray-600">{translateField(item.answer)}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
      </div>
      
      {/* Mobile-only CTA section */}
      <section className="mt-12 text-center space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:space-x-4 lg:hidden">
        <Link to={applicationPath} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center justify-center">
          <CheckCircleIcon className="w-6 h-6 mr-2"/> {t('tourDetailPage.applyForThisTour')}
        </Link>
         <Link to={feedbackPath} className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg inline-flex items-center justify-center">
          <SparklesIcon className="w-6 h-6 mr-2"/> {t('tourDetailPage.giveFeedbackForThisTour')}
         </Link>
      </section>

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
    </>
  );
};

export default TourDetailPage;