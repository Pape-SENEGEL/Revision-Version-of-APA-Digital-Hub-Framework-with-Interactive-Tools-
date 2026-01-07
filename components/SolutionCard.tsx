import React from 'react';
import { Link } from 'react-router-dom';
import { Solution } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import * as Icons from './IconComponents';

const SolutionCard: React.FC<{ solution: Solution }> = ({ solution }) => {
  const { t, translateField } = useLanguage();
  const path = solution.path ? solution.path : ROUTES.SOLUTION_DETAIL.replace(':solutionId', solution.id);

  const IconComponent = (Icons as any)[solution.icon] || Icons.CubeTransparentIcon;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col group border border-slate-200/80">
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="inline-block p-3 bg-sky-100 text-sky-600 rounded-lg">
            <IconComponent className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{translateField(solution.title)}</h3>
        <p className="text-slate-600 text-sm mb-6 flex-grow">{translateField(solution.summary)}</p>

        <div className="mt-auto">
            <Link 
              to={path}
              className="font-semibold text-sky-600 hover:text-sky-700 group-hover:underline transition-colors duration-200"
            >
              {t('solutionsPage.learnMore')} &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;