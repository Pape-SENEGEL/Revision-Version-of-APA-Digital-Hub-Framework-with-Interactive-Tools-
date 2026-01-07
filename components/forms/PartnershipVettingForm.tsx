import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { PartnershipVettingFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: PartnershipVettingFormData = {
  purpose: '',
  orgName: '',
  orgType: '',
  yearFounded: '',
  countryOfOperation: '',
  missionStatement: '',
  keyContactPerson: '',
  legalStatus: '',
  financialStatements: '',
  fundingSources: '',
  complianceIssues: '',
  apaPrincipleAlignment: '',
  communityEngagementHistory: '',
  deiPolicy: '',
  grmExistence: '',
  reference1: '',
  reference2: '',
  summaryOfStrengths: '',
  areasOfConcern: '',
  recommendation: '',
};

const FormTextarea: React.FC<{
  id: keyof PartnershipVettingFormData;
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

const PartnershipVettingForm: React.FC<{
    onGenerateReport: (data: PartnershipVettingFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<PartnershipVettingFormData>(initialFormData);
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

        <AccordionSection title={t('interactiveToolsPage.partnershipVetting.section1.title')} isOpen={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
            <FormTextarea id="orgName" label={t('interactiveToolsPage.partnershipVetting.section1.orgName')} value={formData.orgName} onChange={handleChange} />
            <FormTextarea id="orgType" label={t('interactiveToolsPage.partnershipVetting.section1.orgType')} value={formData.orgType} onChange={handleChange} />
            <FormTextarea id="yearFounded" label={t('interactiveToolsPage.partnershipVetting.section1.yearFounded')} value={formData.yearFounded} onChange={handleChange} />
            <FormTextarea id="countryOfOperation" label={t('interactiveToolsPage.partnershipVetting.section1.countryOfOperation')} value={formData.countryOfOperation} onChange={handleChange} />
            <FormTextarea id="missionStatement" label={t('interactiveToolsPage.partnershipVetting.section1.missionStatement')} value={formData.missionStatement} onChange={handleChange} />
            <FormTextarea id="keyContactPerson" label={t('interactiveToolsPage.partnershipVetting.section1.keyContactPerson')} value={formData.keyContactPerson} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipVetting.section2.title')} isOpen={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
            <FormTextarea id="legalStatus" label={t('interactiveToolsPage.partnershipVetting.section2.legalStatus')} value={formData.legalStatus} onChange={handleChange} />
            <FormTextarea id="financialStatements" label={t('interactiveToolsPage.partnershipVetting.section2.financialStatements')} value={formData.financialStatements} onChange={handleChange} />
            <FormTextarea id="fundingSources" label={t('interactiveToolsPage.partnershipVetting.section2.fundingSources')} value={formData.fundingSources} onChange={handleChange} />
            <FormTextarea id="complianceIssues" label={t('interactiveToolsPage.partnershipVetting.section2.complianceIssues')} value={formData.complianceIssues} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipVetting.section3.title')} isOpen={openSection === 'section3'} onToggle={() => handleToggle('section3')}>
            <FormTextarea id="apaPrincipleAlignment" label={t('interactiveToolsPage.partnershipVetting.section3.apaPrincipleAlignment')} value={formData.apaPrincipleAlignment} onChange={handleChange} />
            <FormTextarea id="communityEngagementHistory" label={t('interactiveToolsPage.partnershipVetting.section3.communityEngagementHistory')} value={formData.communityEngagementHistory} onChange={handleChange} />
            <FormTextarea id="deiPolicy" label={t('interactiveToolsPage.partnershipVetting.section3.deiPolicy')} value={formData.deiPolicy} onChange={handleChange} />
            <FormTextarea id="grmExistence" label={t('interactiveToolsPage.partnershipVetting.section3.grmExistence')} value={formData.grmExistence} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipVetting.section4.title')} isOpen={openSection === 'section4'} onToggle={() => handleToggle('section4')}>
            <FormTextarea id="reference1" label={t('interactiveToolsPage.partnershipVetting.section4.reference1')} value={formData.reference1} onChange={handleChange} />
            <FormTextarea id="reference2" label={t('interactiveToolsPage.partnershipVetting.section4.reference2')} value={formData.reference2} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.partnershipVetting.section5.title')} isOpen={openSection === 'section5'} onToggle={() => handleToggle('section5')}>
            <FormTextarea id="summaryOfStrengths" label={t('interactiveToolsPage.partnershipVetting.section5.summaryOfStrengths')} value={formData.summaryOfStrengths} onChange={handleChange} />
            <FormTextarea id="areasOfConcern" label={t('interactiveToolsPage.partnershipVetting.section5.areasOfConcern')} value={formData.areasOfConcern} onChange={handleChange} />
            <FormTextarea id="recommendation" label={t('interactiveToolsPage.partnershipVetting.section5.recommendation')} value={formData.recommendation} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default PartnershipVettingForm;
