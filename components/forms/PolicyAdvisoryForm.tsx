import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { PolicyFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: PolicyFormData = {
  purpose: '',
  phase1Objective: '',
  phase1PolicyReview: '',
  phase1StakeholderMapping: '',
  phase1InternalReadiness: '',
  phase1Outcome: '',
  phase2Objective: '',
  phase2CoDesignWorkshop: '',
  phase2SharedValueFramework: '',
  phase2LocalOwnership: '',
  phase2Outcome: '',
  phase3Objective: '',
  phase3GrievanceMechanism: '',
  phase3Evaluation: '',
  phase3Certification: '',
  phase3Outcome: '',
};

const FormTextarea: React.FC<{
  id: keyof PolicyFormData;
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

const PolicyAdvisoryForm: React.FC<{
    onGenerateReport: (data: PolicyFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<PolicyFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.form.policyPhase1')} isOpen={openSection === 'phase1'} onToggle={() => handleToggle('phase1')}>
            <FormTextarea id="phase1Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase1Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase1PolicyReview" label={t('interactiveToolsPage.form.policyReview')} value={formData.phase1PolicyReview} onChange={handleChange} />
            <FormTextarea id="phase1StakeholderMapping" label={t('interactiveToolsPage.form.stakeholderMapping')} value={formData.phase1StakeholderMapping} onChange={handleChange} />
            <FormTextarea id="phase1InternalReadiness" label={t('interactiveToolsPage.form.internalReadiness')} value={formData.phase1InternalReadiness} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="phase1Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.phase1Outcome} onChange={handleChange} />
        </AccordionSection>
        
        <AccordionSection title={t('interactiveToolsPage.form.policyPhase2')} isOpen={openSection === 'phase2'} onToggle={() => handleToggle('phase2')}>
            <FormTextarea id="phase2Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase2Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase2CoDesignWorkshop" label={t('interactiveToolsPage.form.coDesignWorkshop')} value={formData.phase2CoDesignWorkshop} onChange={handleChange} />
            <FormTextarea id="phase2SharedValueFramework" label={t('interactiveToolsPage.form.sharedValueFramework')} value={formData.phase2SharedValueFramework} onChange={handleChange} />
            <FormTextarea id="phase2LocalOwnership" label={t('interactiveToolsPage.form.localOwnership')} value={formData.phase2LocalOwnership} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="phase2Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.phase2Outcome} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.policyPhase3')} isOpen={openSection === 'phase3'} onToggle={() => handleToggle('phase3')}>
            <FormTextarea id="phase3Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase3Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase3GrievanceMechanism" label={t('interactiveToolsPage.form.grievanceMechanism')} value={formData.phase3GrievanceMechanism} onChange={handleChange} />
            <FormTextarea id="phase3Evaluation" label={t('interactiveToolsPage.form.evaluation')} value={formData.phase3Evaluation} onChange={handleChange} />
            <FormTextarea id="phase3Certification" label={t('interactiveToolsPage.form.certification')} value={formData.phase3Certification} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.outcome')}</h4>
            <FormTextarea id="phase3Outcome" label={t('interactiveToolsPage.form.outcome')} value={formData.phase3Outcome} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default PolicyAdvisoryForm;
