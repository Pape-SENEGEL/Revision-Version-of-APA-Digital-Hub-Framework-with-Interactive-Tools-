
import React from 'react';
import { Link } from 'react-router-dom';
import { Tour, TourDifficulty } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { UserIcon, CurrencyDollarIcon, CalendarDaysIcon, TrophyIcon } from './IconComponents'; 
import { ROUTES } from '../constants';
import RobustImage from './RobustImage';


const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => {
  const { t, translateField } = useLanguage();
  const applicationPath = ROUTES.APPLY_TOUR.replace(':tourId', tour.id);
  const detailPath = ROUTES.TOUR_DETAIL.replace(':tourId', tour.id);

  const getDifficultyStyles = (level: TourDifficulty) => {
    switch (level) {
      case TourDifficulty.EXPLORER:
        return { badge: 'bg-sky-100 text-sky-800', icon: 'text-sky-500' };
      case TourDifficulty.ADVENTURER:
        return { badge: 'bg-amber-100 text-amber-800', icon: 'text-amber-500' };
      case TourDifficulty.PIONEER:
        return { badge: 'bg-red-100 text-red-800', icon: 'text-red-500' };
      default:
        return { badge: 'bg-slate-100 text-slate-800', icon: 'text-slate-500' };
    }
  };

  const difficultyStyles = getDifficultyStyles(tour.difficulty);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col group">
      {/* Using aspect-ratio container to prevent image distortion and ensure consistent card height */}
      <div className="relative aspect-[4/3] w-full">
        <RobustImage 
            src={tour.image} 
            alt={translateField(tour.title)} 
            className="w-full h-full object-cover" 
            loading="lazy" 
            width="400" 
            height="300" 
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
             <h3 className="text-xl font-semibold text-white ">{translateField(tour.title)}</h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-600 text-sm mb-4 flex-grow">{translateField(tour.description)}</p>
        
        <div className="space-y-3 mb-5 border-t border-slate-100 pt-4">
          <div className="flex items-center text-sm text-slate-700">
            <TrophyIcon className={`w-5 h-5 mr-3 ${difficultyStyles.icon} flex-shrink-0`} />
            <div>
              <span className="font-semibold">{t('tourCard.difficulty')}:</span> 
              <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded-full ${difficultyStyles.badge}`}>
                {t(`tourDifficulty.${tour.difficulty}`)}
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm text-slate-700">
            <UserIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />
            <div>
              <span className="font-semibold">{t('tourCard.targetAudience')}:</span> {translateField(tour.targetAudience)}
            </div>
          </div>
          <div className="flex items-center text-sm text-slate-700">
            <CalendarDaysIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />
             <div>
              <span className="font-semibold">{t('tourCard.duration')}:</span> {translateField(tour.duration)}
            </div>
          </div>
           <div className="flex items-center text-sm text-slate-700">
            <CurrencyDollarIcon className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" />
            <div>
              <span className="font-semibold">{t('tourCard.price')}:</span> {translateField(tour.price)}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center space-x-3">
            <Link 
              to={detailPath}
              className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            >
              {t('tourCard.learnMore')}
            </Link>
             <Link 
              to={applicationPath}
              className="flex-1 text-center bg-white border border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            >
              {t('tourCard.applyNow')}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;