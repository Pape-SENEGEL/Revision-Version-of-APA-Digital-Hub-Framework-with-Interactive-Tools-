import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { DesignSprintFormData, PriorityLevel } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: DesignSprintFormData = {
    purpose: '',
    day1Objective: '',
    day1ExpertInterviews: '', day1ExpertInterviewsPriority: 'Medium',
    day1TrustAudit: '', day1TrustAuditPriority: 'Medium',
    day1ProblemReframing: '', day1ProblemReframingPriority: 'Medium',
    day1Outcome: '',
    day2Objective: '',
    day2HMWQuestions: '', day2HMWQuestionsPriority: 'Medium',
    day2LightningDemos: '', day2LightningDemosPriority: 'Medium',
    day2Crazy8s: '', day2Crazy8sPriority: 'Medium',
    day2Outcome: '',
    day3Objective: '',
    day3DotVoting: '', day3DotVotingPriority: 'Medium',
    day3GRM: '', day3GRMPriority: 'Medium',
    day3Storyboard: '', day3StoryboardPriority: 'Medium',
    day3Outcome: '',
    day4Objective: '',
    day4RapidPrototyping: '', day4RapidPrototypingPriority: 'Medium',
    day4Localization: '', day4LocalizationPriority: 'Medium',
    day4FeedbackLoops: '', day4FeedbackLoopsPriority: 'Medium',
    day4Outcome: '',
    day5Objective: '',
    day5UserInterviews: '', day5UserInterviewsPriority: 'Medium',
    day5MAEFramework: '', day5MAEFrameworkPriority: 'Medium',
    day5Synthesis: '', day5SynthesisPriority: 'Medium',
    day5Outcome: '',
};

const FormPrioritySelect: React.FC<{
    id: keyof DesignSprintFormData;
    label: string;
    value: PriorityLevel;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ id, label, value, onChange }) => {
    const { t } = useLanguage();
    const priorities: PriorityLevel[] = ['Low', 'Medium', 'High'];
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
            >
                {priorities.map(p => (
                    <option key={p} value={p}>{t(`interactiveToolsPage.form.priorityLevels.${p}`)}</option>
                ))}
            </select>
        </div>
    );
};

const FormTask: React.FC<{
    taskId: keyof DesignSprintFormData;
    priorityId: keyof DesignSprintFormData;
    label: string;
    taskValue: string;
    priorityValue: PriorityLevel;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => void;
}> = ({ taskId, priorityId, label, taskValue, priorityValue, onChange }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
            <label htmlFor={taskId} className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3">
                     <textarea
                        id={taskId}
                        name={taskId}
                        value={taskValue}
                        onChange={onChange}
                        rows={3}
                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
                    />
                </div>
                <div>
                    <FormPrioritySelect
                        id={priorityId}
                        label={t('interactiveToolsPage.form.priority')}
                        value={priorityValue}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};


const FormTextarea: React.FC<{
  id: keyof DesignSprintFormData;
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
      <div className="p-4 space-y-4 border-t border-slate-200 bg-white">
        {children}
      </div>
    )}
  </div>
);

const DesignSprintForm: React.FC<{
    onGenerateReport: (data: DesignSprintFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<DesignSprintFormData>(initialFormData);
  const [openSection, setOpenSection] = useState<string | null>('purpose');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as string }));
  };
  
  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const daySections = [
    { day: 1, fields: [{task: 'ExpertInterviews', labelKey: 'expertInterviews'}, {task: 'TrustAudit', labelKey: 'trustAuditInsights'}, {task: 'ProblemReframing', labelKey: 'problemReframing'}] },
    { day: 2, fields: [{task: 'HMWQuestions', labelKey: 'hmwQuestions'}, {task: 'LightningDemos', labelKey: 'lightningDemos'}, {task: 'Crazy8s', labelKey: 'crazy8s'}] },
    { day: 3, fields: [{task: 'DotVoting', labelKey: 'dotVoting'}, {task: 'GRM', labelKey: 'grmBlueprinting'}, {task: 'Storyboard', labelKey: 'storyboard'}] },
    { day: 4, fields: [{task: 'RapidPrototyping', labelKey: 'rapidPrototyping'}, {task: 'Localization', labelKey: 'localization'}, {task: 'FeedbackLoops', labelKey: 'feedbackLoops'}] },
    { day: 5, fields: [{task: 'UserInterviews', labelKey: 'userInterviews'}, {task: 'MAEFramework', labelKey: 'maeFramework'}, {task: 'Synthesis', labelKey: 'synthesisNextSteps'}] }
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerateReport(formData); }} className="space-y-4">
        
        <AccordionSection title={t('interactiveToolsPage.form.purpose')} isOpen={openSection === 'purpose'} onToggle={() => handleToggle('purpose')}>
            <FormTextarea id="purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.purpose} onChange={handleChange} />
        </AccordionSection>

        {daySections.map(({day, fields}) => (
            <AccordionSection key={day} title={t(`interactiveToolsPage.form.day${day}`)} isOpen={openSection === `day${day}`} onToggle={() => handleToggle(`day${day}`)}>
                <FormTextarea id={`day${day}Objective` as keyof DesignSprintFormData} label={t('interactiveToolsPage.form.objective')} value={formData[`day${day}Objective` as keyof DesignSprintFormData]} onChange={handleChange} />
                <h4 className="text-md font-semibold text-slate-700 pt-4 border-t mt-4 mb-3">{t('interactiveToolsPage.form.coreActivities')}</h4>
                 <div className="space-y-3">
                    {fields.map(field => {
                        const taskId = `day${day}${field.task}` as keyof DesignSprintFormData;
                        const priorityId = `day${day}${field.task}Priority` as keyof DesignSprintFormData;
                        return (
                             <FormTask
                                key={field.task}
                                taskId={taskId}
                                priorityId={priorityId}
                                label={t(`interactiveToolsPage.form.${field.labelKey}`)}
                                taskValue={formData[taskId] as string}
                                priorityValue={formData[priorityId] as PriorityLevel}
                                onChange={handleChange}
                            />
                        )
                    })}
                 </div>
                 <h4 className="text-md font-semibold text-slate-700 pt-4 border-t mt-4 mb-3">{t('interactiveToolsPage.form.outcome')}</h4>
                 <FormTextarea id={`day${day}Outcome` as keyof DesignSprintFormData} label={t('interactiveToolsPage.form.outcome')} value={formData[`day${day}Outcome` as keyof DesignSprintFormData]} onChange={handleChange} />
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

export default DesignSprintForm;