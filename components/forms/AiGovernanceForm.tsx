import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { AiGovernanceFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: AiGovernanceFormData = {
  purpose: '',
  pillar1Objective: '',
  pillar1CommunityImpact: '',
  pillar1CollectiveBenefit: '',
  pillar1LocalContext: '',
  pillar2Objective: '',
  pillar2ConsentOwnership: '',
  pillar2DataReciprocity: '',
  pillar2DataGovernance: '',
  pillar3Objective: '',
  pillar3BiasAudit: '',
  pillar3Explainability: '',
  pillar3HumanInLoop: '',
  toolsetDataSovereignty: '',
  toolsetAiBiasAudit: '',
  toolsetGrmForAi: '',
  toolsetCommunityLedImpact: '',
};

const FormTextarea: React.FC<{
  id: keyof AiGovernanceFormData;
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

const AiGovernanceForm: React.FC<{
    onGenerateReport: (data: AiGovernanceFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<AiGovernanceFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.aiGovernance.pillar1.title')} isOpen={openSection === 'pillar1'} onToggle={() => handleToggle('pillar1')}>
            <FormTextarea id="pillar1Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar1Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.aiGovernance.auditQuestions')}</h4>
            <FormTextarea id="pillar1CommunityImpact" label={t('interactiveToolsPage.aiGovernance.pillar1.communityImpact')} value={formData.pillar1CommunityImpact} onChange={handleChange} />
            <FormTextarea id="pillar1CollectiveBenefit" label={t('interactiveToolsPage.aiGovernance.pillar1.collectiveBenefit')} value={formData.pillar1CollectiveBenefit} onChange={handleChange} />
            <FormTextarea id="pillar1LocalContext" label={t('interactiveToolsPage.aiGovernance.pillar1.localContext')} value={formData.pillar1LocalContext} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.aiGovernance.pillar2.title')} isOpen={openSection === 'pillar2'} onToggle={() => handleToggle('pillar2')}>
            <FormTextarea id="pillar2Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar2Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.aiGovernance.auditQuestions')}</h4>
            <FormTextarea id="pillar2ConsentOwnership" label={t('interactiveToolsPage.aiGovernance.pillar2.consentOwnership')} value={formData.pillar2ConsentOwnership} onChange={handleChange} />
            <FormTextarea id="pillar2DataReciprocity" label={t('interactiveToolsPage.aiGovernance.pillar2.dataReciprocity')} value={formData.pillar2DataReciprocity} onChange={handleChange} />
            <FormTextarea id="pillar2DataGovernance" label={t('interactiveToolsPage.aiGovernance.pillar2.dataGovernance')} value={formData.pillar2DataGovernance} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.aiGovernance.pillar3.title')} isOpen={openSection === 'pillar3'} onToggle={() => handleToggle('pillar3')}>
            <FormTextarea id="pillar3Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar3Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.aiGovernance.auditQuestions')}</h4>
            <FormTextarea id="pillar3BiasAudit" label={t('interactiveToolsPage.aiGovernance.pillar3.biasAudit')} value={formData.pillar3BiasAudit} onChange={handleChange} />
            <FormTextarea id="pillar3Explainability" label={t('interactiveToolsPage.aiGovernance.pillar3.explainability')} value={formData.pillar3Explainability} onChange={handleChange} />
            <FormTextarea id="pillar3HumanInLoop" label={t('interactiveToolsPage.aiGovernance.pillar3.humanInLoop')} value={formData.pillar3HumanInLoop} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.aiGovernance.toolsetTitle')} isOpen={openSection === 'toolset'} onToggle={() => handleToggle('toolset')}>
            <FormTextarea id="toolsetDataSovereignty" label={t('interactiveToolsPage.aiGovernance.toolsetDataSovereignty')} value={formData.toolsetDataSovereignty} onChange={handleChange} />
            <FormTextarea id="toolsetAiBiasAudit" label={t('interactiveToolsPage.aiGovernance.toolsetAiBiasAudit')} value={formData.toolsetAiBiasAudit} onChange={handleChange} />
            <FormTextarea id="toolsetGrmForAi" label={t('interactiveToolsPage.aiGovernance.toolsetGrmForAi')} value={formData.toolsetGrmForAi} onChange={handleChange} />
            <FormTextarea id="toolsetCommunityLedImpact" label={t('interactiveToolsPage.aiGovernance.toolsetCommunityLedImpact')} value={formData.toolsetCommunityLedImpact} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default AiGovernanceForm;
