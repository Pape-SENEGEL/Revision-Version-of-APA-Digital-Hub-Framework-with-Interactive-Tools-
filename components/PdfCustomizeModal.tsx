import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PdfGenerationOptions, HierarchicalSection } from '../types';

interface PdfCustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (options: PdfGenerationOptions) => void;
  sections: HierarchicalSection[];
}

const SectionCheckbox: React.FC<{
    section: HierarchicalSection;
    selectedSections: { [key: string]: boolean };
    onToggle: (id: string, checked: boolean) => void;
    level?: number;
}> = ({ section, selectedSections, onToggle, level = 0 }) => {
    const { t } = useLanguage();
    const isChecked = !!selectedSections[section.id];
    
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(section.id, e.target.checked);
    };

    return (
        <div style={{ marginLeft: `${level * 20}px` }}>
            <label className="flex items-center space-x-2 py-1 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-gray-700">{t(section.sectionTitleKey)}</span>
            </label>
            {section.children && isChecked && section.children.map(child => (
                <SectionCheckbox
                    key={child.id}
                    section={child}
                    selectedSections={selectedSections}
                    onToggle={onToggle}
                    level={level + 1}
                />
            ))}
        </div>
    );
};

const PdfCustomizeModal: React.FC<PdfCustomizeModalProps> = ({ isOpen, onClose, onGenerate, sections }) => {
  const { t } = useLanguage();
  const [selectedSections, setSelectedSections] = useState<{ [key: string]: boolean }>({});
  const [orientation, setOrientation] = useState<'p' | 'l'>('p');
  const [quality, setQuality] = useState<number>(2);

  useEffect(() => {
    // Pre-select all sections by default when modal opens or sections change
    const allSectionIds = (secs: HierarchicalSection[]): string[] => 
        secs.flatMap(s => [s.id, ...(s.children ? allSectionIds(s.children) : [])]);
    
    const initialSelection = allSectionIds(sections).reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: string]: boolean });

    setSelectedSections(initialSelection);
  }, [sections, isOpen]);

  const handleToggleSection = (id: string, checked: boolean) => {
    const newSelection = { ...selectedSections, [id]: checked };
    const section = sections.find(s => s.id === id);
    if (section && section.children) {
        section.children.forEach(child => {
            newSelection[child.id] = checked;
        });
    }
    setSelectedSections(newSelection);
  };
  
  const handleSelectAll = (select: boolean) => {
      const allSectionIds = (secs: HierarchicalSection[]): string[] => 
        secs.flatMap(s => [s.id, ...(s.children ? allSectionIds(s.children) : [])]);
      
      const newSelection = allSectionIds(sections).reduce((acc, id) => {
        acc[id] = select;
        return acc;
      }, {} as { [key: string]: boolean });
      setSelectedSections(newSelection);
  }

  const handleGenerateClick = () => {
    onGenerate({ selectedSections, orientation, quality });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{t('pdf.customizeTitle')}</h2>
        </header>
        <main className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">{t('pdf.selectSections')}</h3>
            <div className="flex space-x-4 mb-2">
                <button onClick={() => handleSelectAll(true)} className="text-xs text-sky-600 hover:underline">{t('pdf.selectAll')}</button>
                <button onClick={() => handleSelectAll(false)} className="text-xs text-sky-600 hover:underline">{t('pdf.deselectAll')}</button>
            </div>
            <div className="border rounded-md p-3 max-h-60 overflow-y-auto bg-gray-50">
                {sections.map(section => (
                    <SectionCheckbox
                        key={section.id}
                        section={section}
                        selectedSections={selectedSections}
                        onToggle={handleToggleSection}
                    />
                ))}
            </div>
             <p className="text-xs text-gray-500 mt-2">{t('pdf.interactiveNote')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">{t('pdf.pageOrientation')}</h3>
              <div className="flex space-x-4">
                <label className="flex items-center"><input type="radio" name="orientation" value="p" checked={orientation === 'p'} onChange={() => setOrientation('p')} className="text-sky-600 focus:ring-sky-500" /> <span className="ml-2 text-sm">{t('pdf.portrait')}</span></label>
                <label className="flex items-center"><input type="radio" name="orientation" value="l" checked={orientation === 'l'} onChange={() => setOrientation('l')} className="text-sky-600 focus:ring-sky-500" /> <span className="ml-2 text-sm">{t('pdf.landscape')}</span></label>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">{t('pdf.quality')}</h3>
              <select value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 text-sm">
                <option value={1}>{t('pdf.low')}</option>
                <option value={2}>{t('pdf.medium')}</option>
                <option value={3}>{t('pdf.high')}</option>
              </select>
            </div>
          </div>
        </main>
        <footer className="p-4 border-t flex justify-end space-x-3 bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100">{t('buttons.cancel')}</button>
          <button onClick={handleGenerateClick} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">{t('pdf.generate')}</button>
        </footer>
      </div>
    </div>
  );
};

export default PdfCustomizeModal;