import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { TrustAuditFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: TrustAuditFormData = {
  purpose: '',
  section1Project: '',
  section1Community: '',
  section1Team: '',
  section1Timeline: '',
  section2StakeholderAnalysis: '',
  section2Reflection: '',
  section3PastExperiences: '',
  section3Reasons: '',
  section3Beliefs: '',
  section3Communication: '',
  section3PowerImbalance: '',
  section3Reflection: '',
  section4ReadinessPartner: '',
  section4ReadinessPowerSharing: '',
  section4ReadinessGrievance: '',
  section4ReadinessSuccess: '',
  section4ReadinessCompetence: '',
  finalRecommendation: '',
};

const FormTextarea: React.FC<{
  id: keyof TrustAuditFormData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}> = ({ id, label, value, onChange, rows = 3 }) => (
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

const TrustAuditForm: React.FC<{
    onGenerateReport: (data: TrustAuditFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<TrustAuditFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.trustAudit.section1.title')} isOpen={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
            <FormTextarea id="section1Project" label={t('interactiveToolsPage.trustAudit.section1.project')} value={formData.section1Project} onChange={handleChange} />
            <FormTextarea id="section1Community" label={t('interactiveToolsPage.trustAudit.section1.community')} value={formData.section1Community} onChange={handleChange} />
            <FormTextarea id="section1Team" label={t('interactiveToolsPage.trustAudit.section1.team')} value={formData.section1Team} onChange={handleChange} />
            <FormTextarea id="section1Timeline" label={t('interactiveToolsPage.trustAudit.section1.timeline')} value={formData.section1Timeline} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.trustAudit.section2.title')} isOpen={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
            <FormTextarea id="section2StakeholderAnalysis" label={t('interactiveToolsPage.trustAudit.section2.stakeholderAnalysis')} value={formData.section2StakeholderAnalysis} onChange={handleChange} rows={6} />
            <FormTextarea id="section2Reflection" label={t('interactiveToolsPage.trustAudit.section2.reflection')} value={formData.section2Reflection} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.trustAudit.section3.title')} isOpen={openSection === 'section3'} onToggle={() => handleToggle('section3')}>
            <FormTextarea id="section3PastExperiences" label={t('interactiveToolsPage.trustAudit.section3.pastExperiences')} value={formData.section3PastExperiences} onChange={handleChange} />
            <FormTextarea id="section3Reasons" label={t('interactiveToolsPage.trustAudit.section3.reasons')} value={formData.section3Reasons} onChange={handleChange} />
            <FormTextarea id="section3Beliefs" label={t('interactiveToolsPage.trustAudit.section3.beliefs')} value={formData.section3Beliefs} onChange={handleChange} />
            <FormTextarea id="section3Communication" label={t('interactiveToolsPage.trustAudit.section3.communication')} value={formData.section3Communication} onChange={handleChange} />
            <FormTextarea id="section3PowerImbalance" label={t('interactiveToolsPage.trustAudit.section3.powerImbalance')} value={formData.section3PowerImbalance} onChange={handleChange} />
            <FormTextarea id="section3Reflection" label={t('interactiveToolsPage.trustAudit.section3.reflection')} value={formData.section3Reflection} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.trustAudit.section4.title')} isOpen={openSection === 'section4'} onToggle={() => handleToggle('section4')}>
            <FormTextarea id="section4ReadinessPartner" label={t('interactiveToolsPage.trustAudit.section4.readinessPartner')} value={formData.section4ReadinessPartner} onChange={handleChange} />
            <FormTextarea id="section4ReadinessPowerSharing" label={t('interactiveToolsPage.trustAudit.section4.readinessPowerSharing')} value={formData.section4ReadinessPowerSharing} onChange={handleChange} />
            <FormTextarea id="section4ReadinessGrievance" label={t('interactiveToolsPage.trustAudit.section4.readinessGrievance')} value={formData.section4ReadinessGrievance} onChange={handleChange} />
            <FormTextarea id="section4ReadinessSuccess" label={t('interactiveToolsPage.trustAudit.section4.readinessSuccess')} value={formData.section4ReadinessSuccess} onChange={handleChange} />
            <FormTextarea id="section4ReadinessCompetence" label={t('interactiveToolsPage.trustAudit.section4.readinessCompetence')} value={formData.section4ReadinessCompetence} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.trustAudit.finalRecommendation')} isOpen={openSection === 'recommendation'} onToggle={() => handleToggle('recommendation')}>
            <FormTextarea id="finalRecommendation" label={t('interactiveToolsPage.trustAudit.finalRecommendation')} value={formData.finalRecommendation} onChange={handleChange} rows={5} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default TrustAuditForm;
