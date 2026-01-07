import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePageTitle } from '../hooks/usePageTitle';

const ProfilePage: React.FC = () => {
  const { t, translateField } = useLanguage();
  const { user, updateUserProfile, isLoading: authLoading } = useAuth();
  usePageTitle('profilePage.title');
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        newsletter: user.newsletter || false,
        eventUpdates: user.eventUpdates || false,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await updateUserProfile(formData);
      setSaveStatus({ type: 'success', message: t('profilePage.updateSuccess') });
    } catch (error: any) {
      setSaveStatus({ type: 'error', message: error.message || t('profilePage.updateError') });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Loading profile..." /></div>;
  }
  
  const userHistory = user.history || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800">{t('profilePage.title')}</h1>
        <p className="text-lg text-gray-600 mt-1">{t('profilePage.description')}</p>
      </header>

      {saveStatus && (
        <div className={`p-4 rounded-md text-sm ${saveStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {saveStatus.message}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('profilePage.personalInfo')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('profilePage.name')}</label>
            <input 
              type="text" name="name" id="name" 
              value={formData.name || ''} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('profilePage.email')}</label>
            <input 
              type="email" name="email" id="email" 
              value={formData.email || ''} onChange={handleChange} 
              disabled // Email usually not editable directly or requires verification
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100" 
            />
             <small className="text-xs text-gray-500">Email cannot be changed here.</small>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('profilePage.phone')}</label>
            <input 
              type="tel" name="phone" id="phone" 
              value={formData.phone || ''} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">{t('profilePage.userType')}</label>
            <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">{translateField(t(`userTypes.${user.userType}`))}</p>
          </div>


          <div className="pt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">{t('profilePage.commPreferences')}</h3>
            <fieldset className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="newsletter" name="newsletter" type="checkbox" 
                         checked={formData.newsletter || false} onChange={handleChange}
                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-medium text-gray-700">{t('profilePage.newsletter')}</label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="eventUpdates" name="eventUpdates" type="checkbox" 
                         checked={formData.eventUpdates || false} onChange={handleChange}
                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="eventUpdates" className="font-medium text-gray-700">{t('profilePage.eventUpdates')}</label>
                </div>
              </div>
            </fieldset>
          </div>
          
          <div className="pt-6 text-right">
            <button type="submit" 
                    disabled={isSaving || authLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400">
              {isSaving ? <LoadingSpinner size="sm"/> : t('profilePage.saveChanges')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('profilePage.history')}</h2>
        {userHistory.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {userHistory.map(item => (
              <li key={item.id} className="py-4">
                <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{t('profilePage.noHistory')}</p>
        )}
      </div>
      {/* <p className="text-center text-sm text-gray-500 italic">{t('profilePage.featureComingSoon')}</p> */}
    </div>
  );
};

export default ProfilePage;