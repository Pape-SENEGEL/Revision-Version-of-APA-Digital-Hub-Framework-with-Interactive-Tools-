import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { LeadershipProgramFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: LeadershipProgramFormData = {
  purpose: '',
  module1Objective: '',
  module1Maxim: '',
  module1SharedPurpose: '',
  module1RelationalLeadership: '',
  module1Activity: '',
  module2Objective: '',
  module2Dialogue: '',
  module2Harmony: '',
  module2EmbodiedEmpathy: '',
  module2Activity: '',
  module3Objective: '',
  module3InternalizedBias: '',
  module3Narrative: '',
  module3SelfAwareness: '',
  module3Activity: '',
  module4Objective: '',
  module4Implementation: '',
  module4Mentorship: '',
  module4CommunityOfPractice: '',
  module4Activity: '',
};

const FormTextarea: React.FC<{
  id: keyof LeadershipProgramFormData;
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

const LeadershipProgramForm: React.FC<{
    onGenerateReport: (data: LeadershipProgramFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<LeadershipProgramFormData>(initialFormData);
  const [openSection, setOpenSection] = useState<string | null>('purpose');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as string }));
  };
  
  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const modules = [
    { num: 1, topics: ['Maxim', 'SharedPurpose', 'RelationalLeadership'] },
    { num: 2, topics: ['Dialogue', 'Harmony', 'EmbodiedEmpathy'] },
    { num: 3, topics: ['InternalizedBias', 'Narrative', 'SelfAwareness'] },
    { num: 4, topics: ['Implementation', 'Mentorship', 'CommunityOfPractice'] },
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerateReport(formData); }} className="space-y-4">
        
        <AccordionSection title={t('interactiveToolsPage.form.purpose')} isOpen={openSection === 'purpose'} onToggle={() => handleToggle('purpose')}>
            <FormTextarea id="purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.purpose} onChange={handleChange} />
        </AccordionSection>

        {modules.map(({num, topics}) => (
             <AccordionSection key={num} title={t(`interactiveToolsPage.form.leadershipModule${num}`)} isOpen={openSection === `module${num}`} onToggle={() => handleToggle(`module${num}`)}>
                <FormTextarea id={`module${num}Objective` as keyof LeadershipProgramFormData} label={t('interactiveToolsPage.form.objective')} value={formData[`module${num}Objective` as keyof LeadershipProgramFormData]} onChange={handleChange} />
                <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.keyTopics')}</h4>
                {topics.map(topic => (
                    <FormTextarea
                        key={topic}
                        id={`module${num}${topic}` as keyof LeadershipProgramFormData}
                        label={t(`interactiveToolsPage.form.${topic.charAt(0).toLowerCase() + topic.slice(1)}`)}
                        value={formData[`module${num}${topic}` as keyof LeadershipProgramFormData]}
                        onChange={handleChange}
                    />
                ))}
                <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.form.activity')}</h4>
                <FormTextarea id={`module${num}Activity` as keyof LeadershipProgramFormData} label={t('interactiveToolsPage.form.activity')} value={formData[`module${num}Activity` as keyof LeadershipProgramFormData]} onChange={handleChange} />
             </AccordionSection>
        ))}

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default LeadershipProgramForm;
