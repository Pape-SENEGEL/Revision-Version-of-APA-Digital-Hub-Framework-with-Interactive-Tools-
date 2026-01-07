import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_RESOURCES, ROUTES } from '../constants';
import { Resource, HierarchicalSection } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookOpenIcon, ExternalLinkIcon } from '../components/IconComponents';
import { usePdfGenerator } from '../hooks/usePdfGenerator';
import PdfCustomizeModal from '../components/PdfCustomizeModal';
import DownloadPdfButton from '../components/DownloadPdfButton';
import { usePageTitle } from '../hooks/usePageTitle';
import RobustImage from '../components/RobustImage';

const pageSections: HierarchicalSection[] = [
    { id: 'resource-content-section', sectionTitleKey: 'resourceDetailPage.content' }
];

const renderMarkdown = (markdownText: string) => {
  if (!markdownText) return null;

  const html = markdownText
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-800 my-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 my-5">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc mb-2">$1</li>')
    .replace(/(\n\s*){2,}/g, '</p><p class="text-slate-700 leading-relaxed mb-4">') // Handle paragraphs
    .replace(/`([^`]+)`/g, '<code class="bg-slate-200 text-slate-800 rounded px-1 py-0.5 text-sm">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:underline">$1</a>');

  const wrappedHtml = `<p class="text-slate-700 leading-relaxed mb-4">${html}</p>`
    .replace(/<p class="text-slate-700 leading-relaxed mb-4">(\s*<li.*<\/li>\s*)<\/p>/g, '<ul>$1</ul>')
    .replace(/<\/li>\s*<li/g, '</li><li');

  return <div dangerouslySetInnerHTML={{ __html: wrappedHtml }} />;
};


const ResourceDetailPage: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const { t, translateField } = useLanguage();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const { isGeneratingPdf, pdfProgress, generatePdf } = usePdfGenerator(pageSections);
  
  const pageTitle = resource ? translateField(resource.title) : t('resourceDetailPage.loadingResource');
  usePageTitle(pageTitle, false);

  useEffect(() => {
    // Simulate fetching resource data
    const foundResource = MOCK_RESOURCES.find(r => r.id === resourceId);
    setResource(foundResource || null);
    setIsLoading(false);
  }, [resourceId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner text={t('resourceDetailPage.loadingResource')} size="lg" /></div>;
  }

  if (!resource) {
    return <div className="text-center py-20 text-2xl font-semibold text-red-600">{t('resourceDetailPage.resourceNotFound')}</div>;
  }

  return (
    <>
    <div id="resource-content-section" className="bg-white p-6 md:p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <span className="text-sm font-semibold uppercase text-sky-600 mb-1 block">{translateField(resource.type)}</span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">{translateField(resource.title)}</h1>
        <p className="text-lg text-slate-600">{translateField(resource.summary)}</p>
        {resource.imageUrl && (
            <div className="aspect-video my-6 bg-slate-200 rounded-lg shadow-md overflow-hidden">
                <RobustImage 
                    src={resource.imageUrl} 
                    alt={translateField(resource.title)} 
                    className="w-full h-full object-cover"
                    width="1024"
                    height="576"
                    sizes="(max-width: 1024px) 100vw, 896px"
                    loading="lazy"
                />
            </div>
        )}
      </header>

      {resource.isInternal && resource.content ? (
        <article className="prose lg:prose-xl max-w-none">
            {renderMarkdown(translateField(resource.content) || '')}
        </article>
      ) : resource.link ? (
        <div className="text-center py-10">
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
          >
            {t('resourceDetailPage.viewExternalResource')}
            <ExternalLinkIcon className="w-5 h-5 ml-2" />
          </a>
        </div>
      ) : (
        <p className="text-center text-slate-500">{t('resourceDetailPage.noContent')}</p>
      )}

      <div className="mt-10 pt-6 border-t border-slate-200">
        <Link to={ROUTES.RESOURCES} className="text-sky-600 hover:text-sky-800 transition-colors">
          &larr; {t('resourceDetailPage.backToResources')}
        </Link>
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
    </>
  );
};

export default ResourceDetailPage;