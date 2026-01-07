import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ROUTES } from '../constants';
import { TwitterIcon, FacebookIcon, LinkedInIcon } from './IconComponents';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const QuickLinks = () => (
    <div className="text-center md:text-left">
      <h3 className="font-semibold text-slate-200 tracking-wider uppercase mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link to={ROUTES.TOURS} className="hover:text-white transition-colors">{t('nav.tours')}</Link></li>
        <li><Link to={ROUTES.RESOURCES} className="hover:text-white transition-colors">{t('nav.resources')}</Link></li>
        <li><Link to={ROUTES.SOLUTIONS} className="hover:text-white transition-colors">{t('nav.solutions')}</Link></li>
        <li><Link to={ROUTES.FRAMEWORK} className="hover:text-white transition-colors">{t('nav.framework')}</Link></li>
      </ul>
    </div>
  );

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-8 w-8 text-sky-500">
                  <path fill="currentColor" d="M50,5A45,45,0,1,1,5,50,45.05,45.05,0,0,1,50,5M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"/>
                  <text x="50" y="65" fontSize="30" fontWeight="bold" textAnchor="middle" fill="currentColor">APA</text>
              </svg>
              <span className="text-xl font-semibold text-white tracking-tight">{t('appName')}</span>
            </div>
            <p className="text-sm max-w-md mx-auto md:mx-0">
              {t('homePage.description')}
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <QuickLinks />
          
          {/* Column 3: Social */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-200 tracking-wider uppercase mb-4">Connect</h3>
             <div className="flex justify-center md:justify-start space-x-5">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t('appName')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;