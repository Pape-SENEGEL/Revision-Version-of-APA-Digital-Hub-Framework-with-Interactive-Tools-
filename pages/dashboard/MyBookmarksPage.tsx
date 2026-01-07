import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import { MOCK_RESOURCES, ROUTES } from '../../constants';
import { Resource } from '../../types';
import ResourceItem from '../../components/ResourceItem';
import { BookmarkIcon, BookOpenIcon } from '../../components/IconComponents';
import { usePageTitle } from '../../hooks/usePageTitle';

const MyBookmarksPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  usePageTitle('myBookmarksPage.title');

  const bookmarkedResourceIds = user?.bookmarkedResourceIds || [];
  const bookmarkedResources: Resource[] = MOCK_RESOURCES.filter(resource =>
    bookmarkedResourceIds.includes(resource.id)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <header className="pb-6 border-b border-gray-200 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
          <BookmarkIcon className="w-9 h-9 mr-3 text-pink-600" />
          {t('myBookmarksPage.title')}
        </h1>
      </header>

      {bookmarkedResources.length > 0 ? (
        <div className="space-y-6">
          {bookmarkedResources.map(resource => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-medium text-gray-900">{t('myBookmarksPage.noBookmarks')}</h3>
          <div className="mt-6">
            <Link
              to={ROUTES.RESOURCES}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              {t('myBookmarksPage.exploreResources')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookmarksPage;