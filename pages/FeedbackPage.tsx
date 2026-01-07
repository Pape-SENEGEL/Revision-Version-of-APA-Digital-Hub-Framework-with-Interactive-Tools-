import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { FeedbackFormData, Tour } from '../types';
import { MOCK_TOURS, ROUTES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePageTitle } from '../hooks/usePageTitle';

const initialFormData: Omit<FeedbackFormData, 'participantFullName' | 'tourStartDate' | 'tourEndDate' | 'participantEmail' | 'participantContact'> = {
  clarityPreTourInfo: 0,
  responsivenessOrganizers: 0,
  qualityAccommodations: 0,
  cleanlinessAccommodations: 0,
  efficiencyTransportation: 0,
  comfortSafetyTravel: 0,
  diversityItinerary: 0,
  engagementLocalCommunities: 0,
  alignmentSocialInnovationThemes: 0,
  knowledgeGuides: 0,
  supportivenessFacilitators: 0,
  qualityEducationalSessions: 0,
  opportunitiesPersonalGrowth: 0,
  depthCulturalImmersion: 0,
  opportunitiesInteractLocal: 0,
  effectivenessSocialInnovation: 0,
  tangibleOutcomesLocal: 0,
  overallSatisfaction: 0,
  likelihoodRecommend: 0,
  mostValuableAspects: '',
  aspectsToImprove: '',
  expectationsMet: '',
  applyKnowledgeSkills: '',
  additionalFeedback: '',
};

const FeedbackPage: React.FC = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { t, translateField } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData as FeedbackFormData);
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const pageTitle = tour ? t('feedbackPage.title', { tourName: translateField(tour.title) }) : t('tourDetailPage.loadingTour');
  usePageTitle(pageTitle, false);

  useEffect(() => {
    const currentTour = MOCK_TOURS.find(t => t.id === tourId);
    if (currentTour) {
      setTour(currentTour);
    }
    setIsLoading(false);
  }, [tourId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FeedbackFormData;

    if (e.target.type === 'radio') {
      setFormData(prev => ({ ...prev, [key]: parseInt(value, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Feedback Data Submitted:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Feedback submitted successfully! (Mock)');
      navigate(ROUTES.DASHBOARD);
    }, 1500);
  };

  const renderRatingScale = (name: keyof FeedbackFormData, labelKey: string) => (
    <div className="mb-4">
      <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 mb-1">{t(labelKey)}</label>
      <div className="flex space-x-2 items-center">
        <span className="text-xs text-gray-500">{t('feedbackPage.ratingScalePoor')}</span>
        {[1, 2, 3, 4, 5].map(val => (
          <label key={val} className="flex items-center space-x-1 cursor-pointer">
            <input
              type="radio"
              id={`${name as string}-${val}`}
              name={name as string}
              value={val}
              checked={(formData[name] as number) === val}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-600"
              required
            />
            <span className="text-sm">{val}</span>
          </label>
        ))}
        <span className="text-xs text-gray-500">{t('feedbackPage.ratingScaleExcellent')}</span>
      </div>
    </div>
  );

  const renderTextarea = (name: keyof FeedbackFormData, labelKey: string, wordLimit?: number) => (
    <div>
      <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 mb-1">{t(labelKey)}</label>
      <textarea
        id={name as string}
        name={name as string}
        value={formData[name] as string}
        onChange={handleChange}
        rows={4}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {wordLimit && <small className="text-xs text-gray-500">{t('applicationPage.wordLimitHint', { count: String(wordLimit) })}</small>}
    </div>
  );
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Loading..." /></div>;
  }

  if (!tour) {
    return <div className="text-center py-10 text-red-500 font-semibold">Tour not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">{t('feedbackPage.title', { tourName: translateField(tour.title) })}</h1>
        <p className="mt-2 text-md text-gray-600">{t('feedbackPage.intro')}</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl space-y-8">
        <fieldset className="space-y-4 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('feedbackPage.tourExperienceEval')}</legend>
            {renderRatingScale('clarityPreTourInfo', 'feedbackPage.clarityPreTourInfo')}
            {renderRatingScale('responsivenessOrganizers', 'feedbackPage.responsivenessOrganizers')}
            {renderRatingScale('qualityAccommodations', 'feedbackPage.qualityAccommodations')}
            {renderRatingScale('cleanlinessAccommodations', 'feedbackPage.cleanlinessAccommodations')}
            {renderRatingScale('efficiencyTransportation', 'feedbackPage.efficiencyTransportation')}
            {renderRatingScale('comfortSafetyTravel', 'feedbackPage.comfortSafetyTravel')}
            {renderRatingScale('diversityItinerary', 'feedbackPage.diversityItinerary')}
            {renderRatingScale('engagementLocalCommunities', 'feedbackPage.engagementLocalCommunities')}
            {renderRatingScale('alignmentSocialInnovationThemes', 'feedbackPage.alignmentSocialInnovationThemes')}
            {renderRatingScale('knowledgeGuides', 'feedbackPage.knowledgeGuides')}
            {renderRatingScale('supportivenessFacilitators', 'feedbackPage.supportivenessFacilitators')}
            {renderRatingScale('qualityEducationalSessions', 'feedbackPage.qualityEducationalSessions')}
            {renderRatingScale('opportunitiesPersonalGrowth', 'feedbackPage.opportunitiesPersonalGrowth')}
            {renderRatingScale('depthCulturalImmersion', 'feedbackPage.depthCulturalImmersion')}
            {renderRatingScale('opportunitiesInteractLocal', 'feedbackPage.opportunitiesInteractLocal')}
            {renderRatingScale('effectivenessSocialInnovation', 'feedbackPage.effectivenessSocialInnovation')}
            {renderRatingScale('tangibleOutcomesLocal', 'feedbackPage.tangibleOutcomesLocal')}
            {renderRatingScale('overallSatisfaction', 'feedbackPage.overallSatisfaction')}
            {renderRatingScale('likelihoodRecommend', 'feedbackPage.likelihoodRecommend')}
        </fieldset>

        <fieldset className="space-y-6 border p-6 rounded-md">
            <legend className="text-xl font-semibold text-gray-800 mb-4">{t('feedbackPage.openEndedQuestions')}</legend>
            {renderTextarea('mostValuableAspects', 'feedbackPage.mostValuableAspects', 250)}
            {renderTextarea('aspectsToImprove', 'feedbackPage.aspectsToImprove', 250)}
            {renderTextarea('expectationsMet', 'feedbackPage.expectationsMet', 250)}
            {renderTextarea('applyKnowledgeSkills', 'feedbackPage.applyKnowledgeSkills', 250)}
            {renderTextarea('additionalFeedback', 'feedbackPage.additionalFeedback', 250)}
        </fieldset>

        <div className="pt-6 text-center">
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
            >
                {isSubmitting ? <LoadingSpinner size="sm" /> : t('feedbackPage.submitFeedback')}
            </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;