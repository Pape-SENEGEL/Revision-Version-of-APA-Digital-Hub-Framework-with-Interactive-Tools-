import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import { MOCK_TOURS, ROUTES } from '../../constants';
import { ApplicationStatus, UserApplication } from '../../types';
import { ClipboardListIcon, CompassIcon } from '../../components/IconComponents';
import { usePageTitle } from '../../hooks/usePageTitle';

const MyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { t, translateField } = useLanguage();
  usePageTitle('myApplicationsPage.title');

  const applications = user?.applications || [];

  const getStatusClass = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED:
        return 'bg-green-100 text-green-800';
      case ApplicationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case ApplicationStatus.UNDER_REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case ApplicationStatus.SUBMITTED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTourTitle = (tourId: string) => {
    const tour = MOCK_TOURS.find(t => t.id === tourId);
    return tour ? translateField(tour.title) : 'Unknown Journey';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="pb-6 border-b border-gray-200 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
          <ClipboardListIcon className="w-9 h-9 mr-3 text-purple-600" />
          {t('myApplicationsPage.title')}
        </h1>
      </header>

      {applications.length > 0 ? (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('myApplicationsPage.tour')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('myApplicationsPage.dateSubmitted')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('myApplicationsPage.status')}
                  </th>
                   <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app: UserApplication) => (
                  <tr key={app.applicationId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{getTourTitle(app.tourId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{app.dateSubmitted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={ROUTES.TOUR_DETAIL.replace(':tourId', app.tourId)} className="text-indigo-600 hover:text-indigo-900">
                        {t('myApplicationsPage.viewJourney')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <CompassIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-medium text-gray-900">{t('myApplicationsPage.noApplications')}</h3>
          <div className="mt-6">
            <Link
              to={ROUTES.TOURS}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
            >
              {t('homePage.ctaTours')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;