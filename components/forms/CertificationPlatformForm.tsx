import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { CertificationPlatformFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: CertificationPlatformFormData = {
  purpose: '',
  module1Purpose: '',
  module1Quizzes: '',
  module1RealTimeFeedback: '',
  module1ResourceLibrary: '',
  module1Outcome: '',
  module2Purpose: '',
  module2DocCoCreation: '',
  module2TransparentDashboard: '',
  module2GrmIntegration: '',
  module2Outcome: '',
  module3Purpose: '',
  module3IndependentAudit: '',
  module3CommunityLedVerification: '',
  module3PublicCredibilityScore: '',
  module3Outcome: '',
};

const FormTextarea: React.FC<{
  id: keyof CertificationPlatformFormData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}> = ({ id, label, value, onChange, rows = 4 }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
    />
  </div>
);

const AccordionSection: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="border border-slate-200 rounded-lg">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
      aria-expanded={isOpen}
    >
      {title}
      <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="p-4 space-y-4 border-t border-slate-200">
        {children}
      </div>
    )}
  </div>
);

const CertificationPlatformForm: React.FC<{
    onGenerateReport: (data: CertificationPlatformFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CertificationPlatformFormData>(initialFormData);
  const [openSection, setOpenSection] = useState<string | null>('purpose');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerateReport(formData); }} className="space-y-4">
        
        <AccordionSection title={t('interactiveToolsPage.form.purpose')} isOpen={openSection === 'purpose'} onToggle={() => handleToggle('purpose')}>
            <FormTextarea id="purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.purpose} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.certificationPlatform.module1.title')} isOpen={openSection === 'module1'} onToggle={() => handleToggle('module1')}>
            <FormTextarea id="module1Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.module1Purpose} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyFeatures')}</h4>
            <FormTextarea id="module1Quizzes" label={t('interactiveToolsPage.certificationPlatform.module1.quizzes')} value={formData.module1Quizzes} onChange={handleChange} />
            <FormTextarea id="module1RealTimeFeedback" label={t('interactiveToolsPage.certificationPlatform.module1.realTimeFeedback')} value={formData.module1RealTimeFeedback} onChange={handleChange} />
            <FormTextarea id="module1ResourceLibrary" label={t('interactiveToolsPage.certificationPlatform.module1.resourceLibrary')} value={formData.module1ResourceLibrary} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="module1Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.module1Outcome} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.certificationPlatform.module2.title')} isOpen={openSection === 'module2'} onToggle={() => handleToggle('module2')}>
            <FormTextarea id="module2Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.module2Purpose} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyFeatures')}</h4>
            <FormTextarea id="module2DocCoCreation" label={t('interactiveToolsPage.certificationPlatform.module2.docCoCreation')} value={formData.module2DocCoCreation} onChange={handleChange} />
            <FormTextarea id="module2TransparentDashboard" label={t('interactiveToolsPage.certificationPlatform.module2.transparentDashboard')} value={formData.module2TransparentDashboard} onChange={handleChange} />
            <FormTextarea id="module2GrmIntegration" label={t('interactiveToolsPage.certificationPlatform.module2.grmIntegration')} value={formData.module2GrmIntegration} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="module2Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.module2Outcome} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.certificationPlatform.module3.title')} isOpen={openSection === 'module3'} onToggle={() => handleToggle('module3')}>
            <FormTextarea id="module3Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.module3Purpose} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyFeatures')}</h4>
            <FormTextarea id="module3IndependentAudit" label={t('interactiveToolsPage.certificationPlatform.module3.independentAudit')} value={formData.module3IndependentAudit} onChange={handleChange} />
            <FormTextarea id="module3CommunityLedVerification" label={t('interactiveToolsPage.certificationPlatform.module3.communityLedVerification')} value={formData.module3CommunityLedVerification} onChange={handleChange} />
            <FormTextarea id="module3PublicCredibilityScore" label={t('interactiveToolsPage.certificationPlatform.module3.publicCredibilityScore')} value={formData.module3PublicCredibilityScore} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="module3Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.module3Outcome} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default CertificationPlatformForm;
