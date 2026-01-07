
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BookOpenIcon } from './IconComponents'; 

const DownloadPdfButton: React.FC<{ onClick: () => void; isGenerating: boolean }> = ({ onClick, isGenerating }) => {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            disabled={isGenerating}
            className="fixed bottom-8 right-8 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait z-30"
            title={t('pdf.downloadPdf')}
        >
            {isGenerating ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            )}
        </button>
    );
};
export default DownloadPdfButton;
