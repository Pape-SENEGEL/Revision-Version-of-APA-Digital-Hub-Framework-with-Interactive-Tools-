import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { IncubatorFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: IncubatorFormData = {
  purpose: '',
  phase1Objective: '',
  phase1CommunityImmersion: '',
  phase1ProblemIdentification: '',
  phase1AssetMapping: '',
  phase1KeyDeliverable: '',
  phase2Objective: '',
  phase2SharedValueCanvas: '',
  phase2Prototyping: '',
  phase2EthicalTech: '',
  phase2KeyDeliverable: '',
  phase3Objective: '',
  phase3EvaluationPlan: '',
  phase3GrievanceMechanism: '',
  phase3GoToMarket: '',
  phase3KeyDeliverable: '',
};

const FormTextarea: React.FC<{
  id: keyof IncubatorFormData;
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

const IncubatorBlueprintForm: React.FC<{
    onGenerateReport: (data: IncubatorFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<IncubatorFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.form.phase1')} isOpen={openSection === 'phase1'} onToggle={() => handleToggle('phase1')}>
            <FormTextarea id="phase1Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase1Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase1CommunityImmersion" label={t('interactiveToolsPage.form.communityImmersion')} value={formData.phase1CommunityImmersion} onChange={handleChange} />
            <FormTextarea id="phase1ProblemIdentification" label={t('interactiveToolsPage.form.problemIdentification')} value={formData.phase1ProblemIdentification} onChange={handleChange} />
            <FormTextarea id="phase1AssetMapping" label={t('interactiveToolsPage.form.assetMapping')} value={formData.phase1AssetMapping} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyDeliverable')}</h4>
            <FormTextarea id="phase1KeyDeliverable" label={t('interactiveToolsPage.form.keyDeliverable')} value={formData.phase1KeyDeliverable} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.phase2')} isOpen={openSection === 'phase2'} onToggle={() => handleToggle('phase2')}>
            <FormTextarea id="phase2Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase2Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase2SharedValueCanvas" label={t('interactiveToolsPage.form.sharedValueCanvas')} value={formData.phase2SharedValueCanvas} onChange={handleChange} />
            <FormTextarea id="phase2Prototyping" label={t('interactiveToolsPage.form.prototyping')} value={formData.phase2Prototyping} onChange={handleChange} />
            <FormTextarea id="phase2EthicalTech" label={t('interactiveToolsPage.form.ethicalTech')} value={formData.phase2EthicalTech} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyDeliverable')}</h4>
            <FormTextarea id="phase2KeyDeliverable" label={t('interactiveToolsPage.form.keyDeliverable')} value={formData.phase2KeyDeliverable} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.phase3')} isOpen={openSection === 'phase3'} onToggle={() => handleToggle('phase3')}>
            <FormTextarea id="phase3Objective" label={t('interactiveToolsPage.form.objective')} value={formData.phase3Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.coreActivities')}</h4>
            <FormTextarea id="phase3EvaluationPlan" label={t('interactiveToolsPage.form.evaluationPlan')} value={formData.phase3EvaluationPlan} onChange={handleChange} />
            <FormTextarea id="phase3GrievanceMechanism" label={t('interactiveToolsPage.form.grievanceMechanism')} value={formData.phase3GrievanceMechanism} onChange={handleChange} />
            <FormTextarea id="phase3GoToMarket" label={t('interactiveToolsPage.form.goToMarket')} value={formData.phase3GoToMarket} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyDeliverable')}</h4>
            <FormTextarea id="phase3KeyDeliverable" label={t('interactiveToolsPage.form.keyDeliverable')} value={formData.phase3KeyDeliverable} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default IncubatorBlueprintForm;
