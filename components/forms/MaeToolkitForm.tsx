import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { MaeToolkitFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: MaeToolkitFormData = {
  purpose: '',
  section1Decolonization: '',
  section1Indigenization: '',
  section1Participation: '',
  section1Ubuntu: '',
  section2Purpose: '',
  section2TorObjectiveAnswer: '',
  section2TorKpiAnswer: '',
  section2TorDataCollectionAnswer: '',
  section2TorTimelineAnswer: '',
  section3Purpose: '',
  section3IndicatorTrainedAnswer: '',
  section3IndicatorClinicsAnswer: '',
  section3IndicatorLoansAnswer: '',
  section3IndicatorProduceAnswer: '',
  section4Purpose: '',
  section4RoleSeparation: '',
  section4RoleObjectivity: '',
  section4RoleMeasurement: '',
  section4RoleExtraction: '',
};

const FormTextarea: React.FC<{
  id: keyof MaeToolkitFormData;
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

const MaeToolkitForm: React.FC<{
    onGenerateReport: (data: MaeToolkitFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<MaeToolkitFormData>(initialFormData);
  const [openSection, setOpenSection] = useState<string | null>('purpose');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as string }));
  };
  
  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerateReport(formData); }} className="space-y-4">
        
        <AccordionSection title={t('interactiveToolsPage.form.purpose')} isOpen={openSection === 'purpose'} onToggle={() => handleToggle('purpose')}>
            <FormTextarea id="purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.purpose} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.maeSection1')} isOpen={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
            <FormTextarea id="section1Decolonization" label={t('interactiveToolsPage.form.decolonization')} value={formData.section1Decolonization} onChange={handleChange} />
            <FormTextarea id="section1Indigenization" label={t('interactiveToolsPage.form.indigenization')} value={formData.section1Indigenization} onChange={handleChange} />
            <FormTextarea id="section1Participation" label={t('interactiveToolsPage.form.participation')} value={formData.section1Participation} onChange={handleChange} />
            <FormTextarea id="section1Ubuntu" label={t('interactiveToolsPage.form.ubuntu')} value={formData.section1Ubuntu} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.maeSection2')} isOpen={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
            <FormTextarea id="section2Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.section2Purpose} onChange={handleChange} />
            <FormTextarea id="section2TorObjectiveAnswer" label={t('interactiveToolsPage.form.torObjectiveAnswer')} value={formData.section2TorObjectiveAnswer} onChange={handleChange} />
            <FormTextarea id="section2TorKpiAnswer" label={t('interactiveToolsPage.form.torKpiAnswer')} value={formData.section2TorKpiAnswer} onChange={handleChange} />
            <FormTextarea id="section2TorDataCollectionAnswer" label={t('interactiveToolsPage.form.torDataCollectionAnswer')} value={formData.section2TorDataCollectionAnswer} onChange={handleChange} />
            <FormTextarea id="section2TorTimelineAnswer" label={t('interactiveToolsPage.form.torTimelineAnswer')} value={formData.section2TorTimelineAnswer} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.maeSection3')} isOpen={openSection === 'section3'} onToggle={() => handleToggle('section3')}>
            <FormTextarea id="section3Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.section3Purpose} onChange={handleChange} />
            <FormTextarea id="section3IndicatorTrainedAnswer" label={t('interactiveToolsPage.form.indicatorTrainedAnswer')} value={formData.section3IndicatorTrainedAnswer} onChange={handleChange} />
            <FormTextarea id="section3IndicatorClinicsAnswer" label={t('interactiveToolsPage.form.indicatorClinicsAnswer')} value={formData.section3IndicatorClinicsAnswer} onChange={handleChange} />
            <FormTextarea id="section3IndicatorLoansAnswer" label={t('interactiveToolsPage.form.indicatorLoansAnswer')} value={formData.section3IndicatorLoansAnswer} onChange={handleChange} />
            <FormTextarea id="section3IndicatorProduceAnswer" label={t('interactiveToolsPage.form.indicatorProduceAnswer')} value={formData.section3IndicatorProduceAnswer} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.form.maeSection4')} isOpen={openSection === 'section4'} onToggle={() => handleToggle('section4')}>
            <FormTextarea id="section4Purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.section4Purpose} onChange={handleChange} />
            <FormTextarea id="section4RoleSeparation" label={t('interactiveToolsPage.form.roleSeparation')} value={formData.section4RoleSeparation} onChange={handleChange} />
            <FormTextarea id="section4RoleObjectivity" label={t('interactiveToolsPage.form.roleObjectivity')} value={formData.section4RoleObjectivity} onChange={handleChange} />
            <FormTextarea id="section4RoleMeasurement" label={t('interactiveToolsPage.form.roleMeasurement')} value={formData.section4RoleMeasurement} onChange={handleChange} />
            <FormTextarea id="section4RoleExtraction" label={t('interactiveToolsPage.form.roleExtraction')} value={formData.section4RoleExtraction} onChange={handleChange} />
        </AccordionSection>
        
      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default MaeToolkitForm;
