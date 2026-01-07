import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { usePageTitle } from '../hooks/usePageTitle';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('forgotPasswordPage.title');
  // We don't need the auth context here as we don't want to expose if an email exists or not.
  // In a real app, we'd have a separate API endpoint for this.
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // MOCK: Simulate API call to send reset email.
      // We always succeed to prevent email enumeration.
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Password reset link requested for ${email}`);
      setStatus('submitted');
    } catch (err: any) {
      // In a real scenario, we might log this error but still show the user a success message.
      console.error(err);
      setStatus('submitted'); // Still show success to user
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        {status === 'submitted' ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">{t('forgotPasswordPage.successTitle')}</h2>
            <p className="mt-4 text-slate-600">{t('forgotPasswordPage.successMessage')}</p>
            <Link to={ROUTES.SIGN_IN} className="inline-block mt-6 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors">
              {t('forgotPasswordPage.backToSignIn')}
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-slate-900">{t('forgotPasswordPage.title')}</h2>
            <p className="text-sm text-center text-slate-600">{t('forgotPasswordPage.intro')}</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">{t('profilePage.email')}</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400"
                >
                  {status === 'submitting' ? <LoadingSpinner size="sm" color="text-white"/> : t('forgotPasswordPage.button')}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;