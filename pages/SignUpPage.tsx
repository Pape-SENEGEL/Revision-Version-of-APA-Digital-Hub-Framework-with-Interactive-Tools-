import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { SignUpData, UserType } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const SignUpPage: React.FC = () => {
  const { t } = useLanguage();
  const { signUp, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  usePageTitle('signUpPage.title');
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: UserType.PROSPECTIVE,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email: string) => {
    // Basic regex for email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(formData.email)) {
      setError(t('signUpPage.invalidEmail'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('signUpPage.passwordMismatch'));
      return;
    }
    try {
      await signUp(formData);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || t('signUpPage.signUpError'));
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://source.unsplash.com/nF8ss_3z_cI')"}}>
        </div>
        
        <div className="w-full md:w-1/2 p-8 sm:p-12">
            <div className="w-full max-w-md mx-auto">
                <h2 className="mt-6 text-left text-3xl font-extrabold text-slate-900">
                    {t('signUpPage.title')}
                </h2>
                 <p className="mt-2 text-left text-sm text-slate-600">
                    {t('signUpPage.alreadyHaveAccount')}{' '}
                    <Link to={ROUTES.SIGN_IN} className="font-medium text-sky-600 hover:text-sky-500">
                        {t('signUpPage.signInLink')}
                    </Link>
                </p>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md">{error}</p>}
                    
                    <div>
                        <label htmlFor="name" className="sr-only">{t('profilePage.name')}</label>
                        <input
                            id="name" name="name" type="text" autoComplete="name" required
                            className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder={t('profilePage.name')}
                            value={formData.name} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">{t('profilePage.email')}</label>
                        <input
                            id="email-address" name="email" type="email" autoComplete="email" required
                            className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder={t('profilePage.email')}
                            value={formData.email} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">{t('labels.password')}</label>
                        <input
                            id="password" name="password" type="password" autoComplete="new-password" required
                            className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder={t('labels.password')}
                            value={formData.password || ''} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">{t('labels.confirmPassword')}</label>
                        <input
                            id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                            className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            placeholder={t('labels.confirmPassword')}
                            value={formData.confirmPassword || ''} onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="userType" className="block text-sm font-medium text-slate-700 mb-1">{t('signUpPage.selectUserType')}</label>
                        <select
                            id="userType" name="userType" required
                            className="block w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            value={formData.userType} onChange={handleChange}
                        >
                            <option value={UserType.PROSPECTIVE}>{t('userTypes.prospective')}</option>
                            <optgroup label={t('userTypes.partner')}>
                                <option value={UserType.PARTNER_BUSINESS}>{t('userTypes.partner_business')}</option>
                                <option value={UserType.PARTNER_INVESTOR_FUNDER}>{t('userTypes.partner_investor_funder')}</option>
                                <option value={UserType.PARTNER_GOVERNMENT_NGO}>{t('userTypes.partner_government_ngo')}</option>
                                <option value={UserType.PARTNER_COMMUNITY}>{t('userTypes.partner_community')}</option>
                            </optgroup>
                            <optgroup label={t('userTypes.apaer')}>
                                <option value={UserType.APAER_ADMINISTRATOR}>{t('userTypes.apaer_administrator')}</option>
                                <option value={UserType.APAER_BUSINESS_DEVELOPMENT_MANAGER}>{t('userTypes.apaer_business_development_manager')}</option>
                                <option value={UserType.APAER_DATA_ANALYST}>{t('userTypes.apaer_data_analyst')}</option>
                                <option value={UserType.APAER_PROJECT_MANAGER}>{t('userTypes.apaer_project_manager')}</option>
                                <option value={UserType.APAER_EXPERT_CONSULTANT}>{t('userTypes.apaer_expert_consultant')}</option>
                                <option value={UserType.APAER_TRAINER}>{t('userTypes.apaer_trainer')}</option>
                                <option value={UserType.APAER_LOCAL_PARTNER_LEAD}>{t('userTypes.apaer_local_partner_lead')}</option>
                                <option value={UserType.APAER_AUDITOR}>{t('userTypes.apaer_auditor')}</option>
                            </optgroup>
                            <option value={UserType.ALUMNI}>{t('userTypes.alumni')}</option>
                        </select>
                    </div>
                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400"
                        >
                            {authLoading ? <LoadingSpinner size="sm" color="text-white"/> : t('nav.signUp')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;