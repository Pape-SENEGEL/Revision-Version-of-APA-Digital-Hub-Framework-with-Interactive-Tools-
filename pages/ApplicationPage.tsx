import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ApplicationFormData, Tour } from '../types';
import { MOCK_TOURS, ROUTES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import AIAgent from '../components/AIAgent';
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';

const initialFormData: ApplicationFormData = {
  fullName: '',
  gender: '',
  dateOfBirth: '',
  nationality: '',
  contactNumber: '',
  emailAddress: '',
  currentAddress: '',
  passportNumber: '',
  countryOfResidence: '',
  educationalInstitution: '',
  degreeProgram: '',
  yearOfGraduation: '',
  academicAchievements: '',
  currentEmploymentStatus: '',
  organizationCompany: '',
  jobTitleRole: '',
  currentResponsibilities: '',
  whyParticipate: '',
  howContributeGoals: '',
  excitedAspects: '',
  relevantSkills: '',
  previousPrograms: 'No',
  previousProgramsDetails: '',
  availableFullDuration: '',
  canCoverCost: '',
  dietaryMedical: '',
  reference1Name: '',
  reference1Email: '',
  reference1Phone: '',
  reference2Name: '',
  reference2Email: '',
  reference2Phone: '',
  declarationConfirm: false,
};

const ApplicationAssistant: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const systemInstruction = `You are an expert admissions advisor for the APA program. Your goal is to help applicants strengthen their responses without writing it for them. Provide constructive feedback, suggest points to elaborate on, and help them brainstorm. Be encouraging and supportive. The user will provide their current draft for a specific question. The question is: "${question}"`;

  const initialMessage = `I can help you with your response to the question: "${question}".\n\nPaste your current draft below, and I can give you some feedback or ideas to make it even better!`;
  
  return (
    <div className="mt-2 bg-sky-50 border border-sky-200 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-sky-700 hover:bg-sky-100"
      >
        <div className="flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2" />
          <span>{t('applicationPage.aiHelper.toggle')}</span>
        </div>
        {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-sky-200">
           <p className="text-xs text-slate-600 mb-4">{t('applicationPage.aiHelper.description')}</p>
           <AIAgent 
              title={t('applicationPage.aiHelper.title')}
              systemInstruction={systemInstruction}
              initialMessage={initialMessage}
              embedded={true}
           />
        </div>
      )}
    </div>
  );
};

const ApplicationPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { t, translateField } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const pageTitle = tour ? t('applicationPage.title', { tourName: translateField(tour.title) }) : t('tourDetailPage.loadingTour');
  usePageTitle(pageTitle, false);

  useEffect(() => {
    // Simulate fetching tour details
    const currentTour = MOCK_TOURS.find(t => t.id === tourId);
    if (currentTour) {
      setTour(currentTour);
    }
    setIsLoading(false);
  }, [tourId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const key = name as keyof ApplicationFormData;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [key]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [key]: value }));
    }
  };
  
  const handlePreviousProgramsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      previousPrograms: value,
      previousProgramsDetails: value === 'No' ? '' : prev.previousProgramsDetails,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.declarationConfirm) {
      alert(t('applicationPage.declarationText')); // Or a more sophisticated error display
      return;
    }
    setIsSubmitting(true);
    console.log('Application Data Submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Application submitted successfully! (Mock)');
      navigate(ROUTES.DASHBOARD); // Redirect to dashboard or a thank you page
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Loading tour details..." /></div>;
  }

  if (!tour) {
    return <div className="text-center py-10 text-red-500 font-semibold">Tour not found.</div>;
  }
  
  const wordLimitHint = (count: number) => t('applicationPage.wordLimitHint', { count: String(count) });

  const renderTextarea = (name: keyof ApplicationFormData, labelKey: string, wordLimit?: number, required = true, withAssistant = false) => {
      const labelText = t(labelKey);
      return (
        <div>
          <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 mb-1">{labelText}</label>
          <textarea
            id={name as string}
            name={name as string}
            value={formData[name] as string}
            onChange={handleChange}
            rows={withAssistant ? 6 : 4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required={required}
            maxLength={wordLimit ? wordLimit * 7 : undefined} // Rough character estimate
          />
          {wordLimit && <small className="text-xs text-gray-500">{wordLimitHint(wordLimit)}</small>}
          {withAssistant && <ApplicationAssistant question={labelText} answer={formData[name] as string} />}
        </div>
      );
  };

  const renderInput = (name: keyof ApplicationFormData, labelKey: string, type = "text", required = true) => (
     <div>
      <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 mb-1">{t(labelKey)}</label>
      <input
        type={type}
        id={name as string}
        name={name as string}
        value={formData[name] as string}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        required={required}
      />
    </div>   
  );


  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">{t('applicationPage.title', { tourName: translateField(tour.title) })}</h1>
        <p className="mt-2 text-md text-gray-600">{t('applicationPage.intro')}</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-8">
        
        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.personalInfo')}</legend>
            {renderInput('fullName', 'applicationPage.fullName')}
            {renderInput('gender', 'applicationPage.gender')}
            {renderInput('dateOfBirth', 'applicationPage.dateOfBirth', 'date')}
            {renderInput('nationality', 'applicationPage.nationality')}
            {renderInput('contactNumber', 'applicationPage.contactNumber', 'tel')}
            {renderInput('emailAddress', 'applicationPage.emailAddress', 'email')}
            {renderTextarea('currentAddress', 'applicationPage.currentAddress')}
            {renderInput('passportNumber', 'applicationPage.passportNumber')}
            {renderInput('countryOfResidence', 'applicationPage.countryOfResidence')}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.educationalBackground')}</legend>
            {renderInput('educationalInstitution', 'applicationPage.educationalInstitution')}
            {renderInput('degreeProgram', 'applicationPage.degreeProgram')}
            {renderInput('yearOfGraduation', 'applicationPage.yearOfGraduation')}
            {renderTextarea('academicAchievements', 'applicationPage.academicAchievements', undefined, false)}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.professionalExperience')}</legend>
            {renderInput('currentEmploymentStatus', 'applicationPage.currentEmploymentStatus')}
            {renderInput('organizationCompany', 'applicationPage.organizationCompany')}
            {renderInput('jobTitleRole', 'applicationPage.jobTitleRole')}
            {renderTextarea('currentResponsibilities', 'applicationPage.currentResponsibilities')}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.motivationInterests')}</legend>
            {renderTextarea('whyParticipate', 'applicationPage.whyParticipate', 200, true, true)}
            {renderTextarea('howContributeGoals', 'applicationPage.howContributeGoals', 200, true, true)}
            {renderTextarea('excitedAspects', 'applicationPage.excitedAspects', 100, true, true)}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.skillsQualifications')}</legend>
            {renderTextarea('relevantSkills', 'applicationPage.relevantSkills', 200)}
            <div>
                <label htmlFor="previousPrograms" className="block text-sm font-medium text-gray-700 mb-1">{t('applicationPage.previousPrograms')}</label>
                <select
                    id="previousPrograms"
                    name="previousPrograms"
                    value={formData.previousPrograms}
                    onChange={handlePreviousProgramsChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="No">{t('applicationPage.selectNo')}</option>
                    <option value="Yes">{t('applicationPage.selectYes')}</option>
                </select>
            </div>
            {formData.previousPrograms === 'Yes' && renderTextarea('previousProgramsDetails', 'applicationPage.previousProgramsDetails')}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.availabilityCommitment')}</legend>
            {renderTextarea('availableFullDuration', 'applicationPage.availableFullDuration')}
            {renderTextarea('canCoverCost', 'applicationPage.canCoverCost')}
            {renderTextarea('dietaryMedical', 'applicationPage.dietaryMedical', undefined, false)}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('applicationPage.references')}</legend>
            <p className="text-sm text-gray-600">{t('applicationPage.referenceInfo')}</p>
            {renderInput('reference1Name', 'applicationPage.reference1Name')}
            {renderInput('reference1Email', 'applicationPage.reference1Email', 'email')}
            {renderInput('reference1Phone', 'applicationPage.reference1Phone', 'tel')}
            {renderInput('reference2Name', 'applicationPage.reference2Name')}
            {renderInput('reference2Email', 'applicationPage.reference2Email', 'email')}
            {renderInput('reference2Phone', 'applicationPage.reference2Phone', 'tel')}
        </fieldset>

        <fieldset className="space-y-4 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-2">{t('applicationPage.declaration')}</legend>
            <p className="text-sm text-gray-600">{t('applicationPage.declarationText')}</p>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="declarationConfirm"
                        name="declarationConfirm"
                        type="checkbox"
                        checked={formData.declarationConfirm}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="declarationConfirm" className="font-medium text-gray-700">{t('applicationPage.declarationConfirm')}</label>
                </div>
            </div>
        </fieldset>
        
        <div className="pt-6 text-center">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
          >
            {isSubmitting ? <LoadingSpinner size="sm" /> : t('applicationPage.submitApplication')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationPage;