import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import { usePageTitle } from '../hooks/usePageTitle';
import RobustImage from '../components/RobustImage';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('notFoundPage.title');

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
       <RobustImage 
            src="https://source.unsplash.com/9Xy3fE6rV0o" 
            alt="Lost path in a savanna" 
            className="rounded-lg shadow-xl mb-8 w-full max-w-md object-cover h-64" 
            width="448" 
            height="256" 
            sizes="(max-width: 448px) 100vw, 448px"
            loading="lazy"
        />
      <h1 className="text-6xl font-bold text-blue-600 mb-4">{t('notFoundPage.title')}</h1>
      <p className="text-xl text-gray-700 mb-8">{t('notFoundPage.message')}</p>
      <Link
        to={ROUTES.HOME}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md hover:shadow-lg"
      >
        {t('notFoundPage.goHome')}
      </Link>
    </div>
  );
};

export default NotFoundPage;