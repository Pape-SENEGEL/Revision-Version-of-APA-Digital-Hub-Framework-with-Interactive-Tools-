import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserCredentials } from '../types';
import { usePageTitle } from '../hooks/usePageTitle';

const SignInPage: React.FC = () => {
  const { t } = useLanguage();
  const { signIn, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  usePageTitle('nav.signIn');

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(credentials);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || t('signInPage.signInError'));
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left side with image */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://source.unsplash.com/82fSry9-i8s')"}}>
        </div>
        
        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="w-full max-w-md mx-auto">
            <h2 className="mt-6 text-left text-3xl font-extrabold text-slate-900">
              {t('signInPage.title')}
            </h2>
            <p className="mt-2 text-left text-sm text-slate-600">
              {t('signInPage.dontHaveAccount')}{' '}
              <Link to={ROUTES.SIGN_UP} className="font-medium text-sky-600 hover:text-sky-500">
                {t('signInPage.signUpLink')}
              </Link>
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md">{error}</p>}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email-address" className="sr-only">{t('profilePage.email')}</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder={t('profilePage.email')}
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">{t('labels.password')}</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder={t('labels.password')}
                    value={credentials.password || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to={ROUTES.FORGOT_PASSWORD} className="font-medium text-sky-600 hover:text-sky-500">
                    {t('signInPage.forgotPassword')}
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400"
                >
                  {authLoading ? <LoadingSpinner size="sm" color="text-white"/> : t('nav.signIn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
