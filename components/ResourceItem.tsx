import React from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { ExternalLinkIcon, BookmarkIcon } from './IconComponents';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants';
import RobustImage from './RobustImage';

const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
  const { t, translateField } = useLanguage();
  const { isAuthenticated, user, toggleBookmark } = useAuth();
  const detailPath = resource.isInternal ? ROUTES.RESOURCE_DETAIL.replace(':resourceId', resource.id) : undefined;
  
  const isBookmarked = isAuthenticated && user?.bookmarkedResourceIds?.includes(resource.id) || false;

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(resource.id);
  };

  const ActionButton = () => {
    const commonClasses = "mt-auto self-start inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200";
    if (detailPath) {
      return (
        <Link 
          to={detailPath}
          className={commonClasses}
        >
          {t('resourceItem.readMore')}
        </Link>
      );
    }
    if (resource.link) {
      return (
         <a 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={commonClasses}
          >
            {t('resourceItem.viewResource')}
            <ExternalLinkIcon className="w-4 h-4 ml-2" />
          </a>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col relative h-full">
       {isAuthenticated && (
        <button 
          onClick={handleBookmarkClick}
          title={isBookmarked ? t('resourceItem.removeBookmark') : t('resourceItem.bookmark')}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${isBookmarked ? 'bg-sky-100 text-sky-600' : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'}`}
          aria-pressed={isBookmarked}
        >
          <BookmarkIcon className="w-5 h-5" isFilled={isBookmarked} />
        </button>
      )}
      {resource.imageUrl && (
        <div className="aspect-[16/9]">
            <RobustImage 
              src={resource.imageUrl} 
              alt={translateField(resource.title)} 
              className="w-full h-full object-cover" 
              loading="lazy"
              width="480"
              height="270"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase text-sky-500 mb-1">{translateField(resource.type)}</span>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 pr-10">{translateField(resource.title)}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{translateField(resource.summary)}</p>
        
        <ActionButton />

      </div>
    </div>
  );
};

export default ResourceItem;