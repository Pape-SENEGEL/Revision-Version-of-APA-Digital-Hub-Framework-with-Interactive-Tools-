import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ImpactFunderFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: ImpactFunderFormData = {
  purpose: '',
  pillar1Objective: '',
  pillar1LongTermFunding: '',
  pillar1GeneralSupport: '',
  pillar1SharedValue: '',
  pillar2Objective: '',
  pillar2SuccessMetrics: '',
  pillar2TrustBasedReporting: '',
  pillar2PeerLearning: '',
  pillar3Objective: '',
  pillar3PowerSharing: '',
  pillar3Grm: '',
  pillar3CapacityBuilding: '',
};

const FormTextarea: React.FC<{
  id: keyof ImpactFunderFormData;
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

const ImpactFunderForm: React.FC<{
    onGenerateReport: (data: ImpactFunderFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ImpactFunderFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.impactFunder.pillar1.title')} isOpen={openSection === 'pillar1'} onToggle={() => handleToggle('pillar1')}>
            <FormTextarea id="pillar1Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar1Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyActions')}</h4>
            <FormTextarea id="pillar1LongTermFunding" label={t('interactiveToolsPage.impactFunder.pillar1.longTermFunding')} value={formData.pillar1LongTermFunding} onChange={handleChange} />
            <FormTextarea id="pillar1GeneralSupport" label={t('interactiveToolsPage.impactFunder.pillar1.generalSupport')} value={formData.pillar1GeneralSupport} onChange={handleChange} />
            <FormTextarea id="pillar1SharedValue" label={t('interactiveToolsPage.impactFunder.pillar1.sharedValue')} value={formData.pillar1SharedValue} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.impactFunder.pillar2.title')} isOpen={openSection === 'pillar2'} onToggle={() => handleToggle('pillar2')}>
            <FormTextarea id="pillar2Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar2Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyActions')}</h4>
            <FormTextarea id="pillar2SuccessMetrics" label={t('interactiveToolsPage.impactFunder.pillar2.successMetrics')} value={formData.pillar2SuccessMetrics} onChange={handleChange} />
            <FormTextarea id="pillar2TrustBasedReporting" label={t('interactiveToolsPage.impactFunder.pillar2.trustBasedReporting')} value={formData.pillar2TrustBasedReporting} onChange={handleChange} />
            <FormTextarea id="pillar2PeerLearning" label={t('interactiveToolsPage.impactFunder.pillar2.peerLearning')} value={formData.pillar2PeerLearning} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.impactFunder.pillar3.title')} isOpen={openSection === 'pillar3'} onToggle={() => handleToggle('pillar3')}>
            <FormTextarea id="pillar3Objective" label={t('interactiveToolsPage.form.objective')} value={formData.pillar3Objective} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyActions')}</h4>
            <FormTextarea id="pillar3PowerSharing" label={t('interactiveToolsPage.impactFunder.pillar3.powerSharing')} value={formData.pillar3PowerSharing} onChange={handleChange} />
            <FormTextarea id="pillar3Grm" label={t('interactiveToolsPage.impactFunder.pillar3.grm')} value={formData.pillar3Grm} onChange={handleChange} />
            <FormTextarea id="pillar3CapacityBuilding" label={t('interactiveToolsPage.impactFunder.pillar3.capacityBuilding')} value={formData.pillar3CapacityBuilding} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default ImpactFunderForm;
