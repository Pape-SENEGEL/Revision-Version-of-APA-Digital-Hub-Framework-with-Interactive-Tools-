
import { useState } from 'react';
import { useLanguage } from './useLanguage';
import { PdfGenerationOptions, HierarchicalSection } from '../types';

// Inform TypeScript about the global objects from the CDN
declare const jspdf: any;
declare const html2canvas: any;

export const usePdfGenerator = (pageSections: HierarchicalSection[]) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');
  const { t } = useLanguage();

  const generatePdf = async (options: PdfGenerationOptions) => {
    const { selectedSections, orientation, quality } = options;
    
    setIsGeneratingPdf(true);
    setPdfProgress(t('pdf.initializing'));
    await new Promise(resolve => setTimeout(resolve, 100));

    const printContainer = document.createElement('div');
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.top = '0';
    document.body.appendChild(printContainer);

    try {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 40;

        const sectionsToProcess = pageSections.filter(section => selectedSections[section.id]);

        for (let i = 0; i < sectionsToProcess.length; i++) {
            const section = sectionsToProcess[i];
            const sectionTitle = t(section.sectionTitleKey);
            setPdfProgress(t('pdf.processing', { current: String(i + 1), total: String(sectionsToProcess.length), title: sectionTitle }));

            const originalElement = document.getElementById(section.id);
            if (!originalElement) continue;

            const clonedElement = originalElement.cloneNode(true) as HTMLElement;
            
            if (section.children) {
                section.children.forEach(child => {
                    if (!selectedSections[child.id]) {
                        const childEl = clonedElement.querySelector(`#${child.id}`);
                        childEl?.remove();
                    }
                });
            }

            const captureWidth = orientation === 'p' ? 1056 : 1480;
            clonedElement.style.width = `${captureWidth}px`;
            clonedElement.style.padding = '1px';
            clonedElement.style.backgroundColor = 'white';
            printContainer.innerHTML = ''; 
            printContainer.appendChild(clonedElement);

            await new Promise(resolve => setTimeout(resolve, 50));

            const canvas = await html2canvas(clonedElement, {
                scale: quality,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: captureWidth,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const imgWidth = pdfWidth - (margin * 2);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (i > 0) {
                pdf.addPage();
            }

            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                position -= pdfHeight;
                pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
        }
        
        const pageCount = pdf.internal.pages.length;
        if(pageCount > 0) {
            for(let j = 1; j <= pageCount; j++) {
                pdf.setPage(j);
                pdf.setFontSize(10);
                pdf.setTextColor(150);
                pdf.text(`Page ${j} of ${pageCount}`, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 20, { align: 'center' });
            }
        }

        pdf.save('APA_Report.pdf');

    } catch (error) {
        console.error("Error during PDF generation:", error);
        alert(t('pdf.error'));
    } finally {
        setIsGeneratingPdf(false);
        setPdfProgress('');
        document.body.removeChild(printContainer);
    }
  };

  return { isGeneratingPdf, pdfProgress, generatePdf };
};
