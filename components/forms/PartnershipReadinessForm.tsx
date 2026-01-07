import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { PartnershipReadinessFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: PartnershipReadinessFormData = {
  purpose: '',
  understandingOfEquity: '',
  approachToFailure: '',
  longTermCommitment: '',
  dedicatedPersonnel: '',
  culturalCompetencyTraining: '',
  decisionMakingProcess: '',
  flexibleFunding: '',
  reportingExpectations: '',
  grmIntegrationPlan: '',
  sharedValueGoals: '',
  riskAppetite: '',
  successMetrics: '',
};

const FormTextarea: React.FC<{
  id: keyof PartnershipReadinessFormData;
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

const PartnershipReadinessForm: React.FC<{
    onGenerateReport: (data: PartnershipReadinessFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<PartnershipReadinessFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.partnershipReadiness.section1.title')} isOpen={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
            <FormTextarea id="understandingOfEquity" label={t('interactiveToolsPage.partnershipReadiness.section1.understandingOfEquity')} value={formData.understandingOfEquity} onChange={handleChange} />
            <FormTextarea id="approachToFailure" label={t('interactiveToolsPage.partnershipReadiness.section1.approachToFailure')} value={formData.approachToFailure} onChange={handleChange} />
            <FormTextarea id="longTermCommitment" label={t('interactiveToolsPage.partnershipReadiness.section1.longTermCommitment')} value={formData.longTermCommitment} onChange={handleChange} />
        </AccordionSection>
        
        <AccordionSection title={t('interactiveToolsPage.partnershipReadiness.section2.title')} isOpen={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
            <FormTextarea id="dedicatedPersonnel" label={t('interactiveToolsPage.partnershipReadiness.section2.dedicatedPersonnel')} value={formData.dedicatedPersonnel} onChange={handleChange} />
            <FormTextarea id="culturalCompetencyTraining" label={t('interactiveToolsPage.partnershipReadiness.section2.culturalCompetencyTraining')} value={formData.culturalCompetencyTraining} onChange={handleChange} />
            <FormTextarea id="decisionMakingProcess" label={t('interactiveToolsPage.partnershipReadiness.section2.decisionMakingProcess')} value={formData.decisionMakingProcess} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipReadiness.section3.title')} isOpen={openSection === 'section3'} onToggle={() => handleToggle('section3')}>
            <FormTextarea id="flexibleFunding" label={t('interactiveToolsPage.partnershipReadiness.section3.flexibleFunding')} value={formData.flexibleFunding} onChange={handleChange} />
            <FormTextarea id="reportingExpectations" label={t('interactiveToolsPage.partnershipReadiness.section3.reportingExpectations')} value={formData.reportingExpectations} onChange={handleChange} />
            <FormTextarea id="grmIntegrationPlan" label={t('interactiveToolsPage.partnershipReadiness.section3.grmIntegrationPlan')} value={formData.grmIntegrationPlan} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipReadiness.section4.title')} isOpen={openSection === 'section4'} onToggle={() => handleToggle('section4')}>
            <FormTextarea id="sharedValueGoals" label={t('interactiveToolsPage.partnershipReadiness.section4.sharedValueGoals')} value={formData.sharedValueGoals} onChange={handleChange} />
            <FormTextarea id="riskAppetite" label={t('interactiveToolsPage.partnershipReadiness.section4.riskAppetite')} value={formData.riskAppetite} onChange={handleChange} />
            <FormTextarea id="successMetrics" label={t('interactiveToolsPage.partnershipReadiness.section4.successMetrics')} value={formData.successMetrics} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default PartnershipReadinessForm;
