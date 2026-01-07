import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { GrmCoDesignFormData } from '../../types';
import { ChevronDownIcon } from '../IconComponents';

const initialFormData: GrmCoDesignFormData = {
  purpose: '',
  step1Goal: '',
  step1IdentifyActors: '',
  step1FormTeam: '',
  step2Goal: '',
  step2MapChannels: '',
  step2IdentifyBarriers: '',
  step2DefineGrievance: '',
  step3Goal: '',
  step3PrincipleFair: '',
  step3PrincipleSimple: '',
  step3PrincipleInclusive: '',
  step3PrinciplePredictable: '',
  step3ProcedureReceiveAction: '',
  step3ProcedureReceiveResponsibility: '',
  step3ProcedureReceiveTimeline: '',
  step3ProcedureAcknowledgeAction: '',
  step3ProcedureAcknowledgeResponsibility: '',
  step3ProcedureAcknowledgeTimeline: '',
  step3ProcedureEvaluateAction: '',
  step3ProcedureEvaluateResponsibility: '',
  step3ProcedureEvaluateTimeline: '',
  step3ProcedureResolveAction: '',
  step3ProcedureResolveResponsibility: '',
  step3ProcedureResolveTimeline: '',
  step3ProcedureClosingAction: '',
  step3ProcedureClosingResponsibility: '',
  step3ProcedureClosingTimeline: '',
  step4Goal: '',
  step4CommunicationPlan: '',
  step4DisseminateInfo: '',
  step5Goal: '',
  step5RegularReviews: '',
  step5IntegrateFeedback: '',
};

const FormTextarea: React.FC<{
  id: keyof GrmCoDesignFormData;
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

const GrmCoDesignForm: React.FC<{
    onGenerateReport: (data: GrmCoDesignFormData) => void;
}> = ({ onGenerateReport }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<GrmCoDesignFormData>(initialFormData);
  const [openSection, setOpenSection] = useState<string | null>('purpose');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const flowchartSteps = [
      { key: 'Receive', labelKey: 'grmCoDesign.flowchart.receive' },
      { key: 'Acknowledge', labelKey: 'grmCoDesign.flowchart.acknowledge' },
      { key: 'Evaluate', labelKey: 'grmCoDesign.flowchart.evaluate' },
      { key: 'Resolve', labelKey: 'grmCoDesign.flowchart.resolve' },
      { key: 'Closing', labelKey: 'grmCoDesign.flowchart.closing' },
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerateReport(formData); }} className="space-y-4">
        <AccordionSection title={t('interactiveToolsPage.form.purpose')} isOpen={openSection === 'purpose'} onToggle={() => handleToggle('purpose')}>
            <FormTextarea id="purpose" label={t('interactiveToolsPage.form.purpose')} value={formData.purpose} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.grmCoDesign.step1.title')} isOpen={openSection === 'step1'} onToggle={() => handleToggle('step1')}>
            <FormTextarea id="step1Goal" label={t('interactiveToolsPage.form.goal')} value={formData.step1Goal} onChange={handleChange} />
            <FormTextarea id="step1IdentifyActors" label={t('interactiveToolsPage.grmCoDesign.step1.identifyActors')} value={formData.step1IdentifyActors} onChange={handleChange} />
            <FormTextarea id="step1FormTeam" label={t('interactiveToolsPage.grmCoDesign.step1.formTeam')} value={formData.step1FormTeam} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.grmCoDesign.step2.title')} isOpen={openSection === 'step2'} onToggle={() => handleToggle('step2')}>
            <FormTextarea id="step2Goal" label={t('interactiveToolsPage.form.goal')} value={formData.step2Goal} onChange={handleChange} />
            <FormTextarea id="step2MapChannels" label={t('interactiveToolsPage.grmCoDesign.step2.mapChannels')} value={formData.step2MapChannels} onChange={handleChange} />
            <FormTextarea id="step2IdentifyBarriers" label={t('interactiveToolsPage.grmCoDesign.step2.identifyBarriers')} value={formData.step2IdentifyBarriers} onChange={handleChange} />
            <FormTextarea id="step2DefineGrievance" label={t('interactiveToolsPage.grmCoDesign.step2.defineGrievance')} value={formData.step2DefineGrievance} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.grmCoDesign.step3.title')} isOpen={openSection === 'step3'} onToggle={() => handleToggle('step3')}>
            <FormTextarea id="step3Goal" label={t('interactiveToolsPage.form.goal')} value={formData.step3Goal} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.grmCoDesign.step3.agreeOnPrinciples')}</h4>
            <FormTextarea id="step3PrincipleFair" label={t('interactiveToolsPage.grmCoDesign.step3.principleFair')} value={formData.step3PrincipleFair} onChange={handleChange} />
            <FormTextarea id="step3PrincipleSimple" label={t('interactiveToolsPage.grmCoDesign.step3.principleSimple')} value={formData.step3PrincipleSimple} onChange={handleChange} />
            <FormTextarea id="step3PrincipleInclusive" label={t('interactiveToolsPage.grmCoDesign.step3.principleInclusive')} value={formData.step3PrincipleInclusive} onChange={handleChange} />
            <FormTextarea id="step3PrinciplePredictable" label={t('interactiveToolsPage.grmCoDesign.step3.principlePredictable')} value={formData.step3PrinciplePredictable} onChange={handleChange} />
            <h4 className="text-md font-semibold text-slate-700 pt-2 border-t mt-4">{t('interactiveToolsPage.grmCoDesign.step3.defineProcedure')}</h4>
            <div className="space-y-4">
                {flowchartSteps.map(step => (
                     <div key={step.key} className="p-3 border rounded-md bg-slate-50">
                        <h5 className="font-bold text-slate-700 mb-2">{t(step.labelKey)}</h5>
                        <div className="grid md:grid-cols-3 gap-2">
                             <FormTextarea id={`step3Procedure${step.key}Action` as keyof GrmCoDesignFormData} label={t('interactiveToolsPage.form.action')} value={formData[`step3Procedure${step.key}Action` as keyof GrmCoDesignFormData]} onChange={handleChange} rows={5} />
                             <FormTextarea id={`step3Procedure${step.key}Responsibility` as keyof GrmCoDesignFormData} label={t('interactiveToolsPage.grmCoDesign.flowchart.responsibility')} value={formData[`step3Procedure${step.key}Responsibility` as keyof GrmCoDesignFormData]} onChange={handleChange} rows={5} />
                             <FormTextarea id={`step3Procedure${step.key}Timeline` as keyof GrmCoDesignFormData} label={t('interactiveToolsPage.grmCoDesign.flowchart.timeline')} value={formData[`step3Procedure${step.key}Timeline` as keyof GrmCoDesignFormData]} onChange={handleChange} rows={5} />
                        </div>
                     </div>
                ))}
            </div>
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.grmCoDesign.step4.title')} isOpen={openSection === 'step4'} onToggle={() => handleToggle('step4')}>
            <FormTextarea id="step4Goal" label={t('interactiveToolsPage.form.goal')} value={formData.step4Goal} onChange={handleChange} />
            <FormTextarea id="step4CommunicationPlan" label={t('interactiveToolsPage.grmCoDesign.step4.communicationPlan')} value={formData.step4CommunicationPlan} onChange={handleChange} />
            <FormTextarea id="step4DisseminateInfo" label={t('interactiveToolsPage.grmCoDesign.step4.disseminateInfo')} value={formData.step4DisseminateInfo} onChange={handleChange} />
        </AccordionSection>

        <AccordionSection title={t('interactiveToolsPage.grmCoDesign.step5.title')} isOpen={openSection === 'step5'} onToggle={() => handleToggle('step5')}>
            <FormTextarea id="step5Goal" label={t('interactiveToolsPage.form.goal')} value={formData.step5Goal} onChange={handleChange} />
            <FormTextarea id="step5RegularReviews" label={t('interactiveToolsPage.grmCoDesign.step5.regularReviews')} value={formData.step5RegularReviews} onChange={handleChange} />
            <FormTextarea id="step5IntegrateFeedback" label={t('interactiveToolsPage.grmCoDesign.step5.integrateFeedback')} value={formData.step5IntegrateFeedback} onChange={handleChange} />
        </AccordionSection>

      <div className="pt-4 text-center">
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          {t('interactiveToolsPage.form.generateReport')}
        </button>
      </div>
    </form>
  );
};

export default GrmCoDesignForm;
