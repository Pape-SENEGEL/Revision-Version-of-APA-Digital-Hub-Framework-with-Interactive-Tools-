import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import { ROUTES } from '../constants';
import { NavItem } from '../types';
import { HomeIcon, DashboardIcon, CompassIcon, BookOpenIcon, UserIcon, SparklesIcon, ChevronDownIcon, ClipboardListIcon, BookmarkIcon, CubeTransparentIcon, PhotoIcon, BeakerIcon } from './IconComponents';

const FrameworkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0cA3.375 3.375 0 005.625 4.5c0 1.002.502 1.905 1.288 2.5H5.625a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25h.375m10.125-1.5H15a2.25 2.25 0 01-2.25-2.25V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.123-.08m-5.801 0cA3.375 3.375 0 0112.375 4.5c0 1.002-.502 1.905-1.288 2.5H12.375a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25h-.375m0-13.5h.008v.015h-.008V4.5z" />
    </svg>
);

const AppLogo: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Link to={ROUTES.HOME} className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 text-sky-600">
                <path fill="currentColor" d="M50,5A45,45,0,1,1,5,50,45.05,45.05,0,0,1,50,5M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z"/>
                <text x="50" y="65" fontSize="30" fontWeight="bold" textAnchor="middle" fill="currentColor">APA</text>
            </svg>
            <span className="text-2xl font-semibold text-slate-800 tracking-tight">{t('appName')}</span>
        </Link>
    );
};

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isFrameworkMenuOpen, setIsFrameworkMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const frameworkMenuRef = useRef<HTMLDivElement>(null);

  const isFrameworkSectionActive = location.pathname.startsWith('/framework');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (frameworkMenuRef.current && !frameworkMenuRef.current.contains(event.target as Node)) {
        setIsFrameworkMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate(ROUTES.HOME); 
  };

  const allNavItems: NavItem[] = [
    { labelKey: 'nav.home', path: ROUTES.HOME, icon: <HomeIcon className="w-5 h-5" /> },
    { labelKey: 'nav.tours', path: ROUTES.TOURS, icon: <CompassIcon className="w-5 h-5" /> },
    { labelKey: 'nav.resources', path: ROUTES.RESOURCES, icon: <BookOpenIcon className="w-5 h-5" /> },
    { labelKey: 'nav.solutions', path: ROUTES.SOLUTIONS, icon: <CubeTransparentIcon className="w-5 h-5" /> },
    { 
      labelKey: 'nav.framework', 
      icon: <FrameworkIcon className="w-5 h-5" />,
      children: [
          { labelKey: 'nav.frameworkGuide', path: ROUTES.FRAMEWORK, icon: <CompassIcon className="w-5 h-5"/>},
          { labelKey: 'nav.frameworkToolkit', path: ROUTES.FRAMEWORK_TOOLKIT, icon: <BeakerIcon className="w-5 h-5"/>},
          { labelKey: 'nav.frameworkInteractiveTools', path: ROUTES.FRAMEWORK_INTERACTIVE_TOOLS, icon: <SparklesIcon className="w-5 h-5"/>},
          { labelKey: 'nav.frameworkGlossary', path: ROUTES.FRAMEWORK_GLOSSARY, icon: <BookOpenIcon className="w-5 h-5"/>},
      ]
    },
    { labelKey: 'nav.aiAssistant', path: ROUTES.AI_ASSISTANT, icon: <SparklesIcon className="w-5 h-5" />, requiresAuth: true },
  ];

  const profileMenuItems: NavItem[] = [
    { labelKey: 'nav.dashboard', path: ROUTES.DASHBOARD, icon: <DashboardIcon className="w-5 h-5" /> },
    { labelKey: 'nav.myApplications', path: ROUTES.MY_APPLICATIONS, icon: <ClipboardListIcon className="w-5 h-5" /> },
    { labelKey: 'nav.myBookmarks', path: ROUTES.MY_BOOKMARKS, icon: <BookmarkIcon className="w-5 h-5" /> },
    { labelKey: 'nav.profile', path: ROUTES.PROFILE, icon: <UserIcon className="w-5 h-5" /> },
    { labelKey: 'nav.generateImage', path: ROUTES.GENERATE_IMAGE, icon: <PhotoIcon className="w-5 h-5" /> },
  ];

  const filteredNavItems = allNavItems.filter(item => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.hideWhenAuth && isAuthenticated) return false;
    return true;
  });

  const NavItemLink: React.FC<{ item: NavItem, onClick?: () => void, isMobile?: boolean }> = ({ item, onClick, isMobile = false }) => {
    const baseClasses = "flex items-center text-sm font-medium transition-colors duration-150 ease-in-out";
    const mobileClasses = `px-3 py-3 ${isMobile ? 'w-full' : ''}`;
    const desktopClasses = "px-3 py-2";

    if (!item.path) return null; // Should not happen for non-dropdown items

    return (
        <NavLink
          to={item.path}
          onClick={onClick}
          className={({ isActive }) =>
            `${baseClasses} ${isMobile ? mobileClasses : desktopClasses} ${
              isActive 
                ? 'bg-sky-100 text-sky-600 rounded-md' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-md'
            }`
          }
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          {t(item.labelKey)}
        </NavLink>
    );
  }

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <AppLogo />
          
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {filteredNavItems.map((item) => (
              item.children ? (
                <div key={item.labelKey} className="relative" ref={frameworkMenuRef}>
                    <button 
                      id="framework-menu-button"
                      onClick={() => setIsFrameworkMenuOpen(prev => !prev)}
                      className={`flex items-center text-sm font-medium transition-colors duration-150 ease-in-out px-3 py-2 rounded-md ${
                        isFrameworkSectionActive 
                          ? 'bg-sky-100 text-sky-600' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isFrameworkMenuOpen}
                    >
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      {t(item.labelKey)}
                      <ChevronDownIcon className={`w-4 h-4 ml-1 text-slate-500 transition-transform ${isFrameworkMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFrameworkMenuOpen && (
                        <div
                          className="menu-dropdown-animation origin-top-left absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="framework-menu-button"
                        >
                            {item.children.map(child => (
                                <NavLink
                                    key={child.path}
                                    to={child.path!}
                                    role="menuitem"
                                    onClick={() => setIsFrameworkMenuOpen(false)}
                                    className={({isActive}) => `flex items-center w-full text-left px-4 py-2 text-sm transition-colors ${isActive ? 'bg-slate-100 text-sky-600' : 'text-slate-700 hover:bg-slate-100'}`}
                                >
                                    {child.icon && <span className="mr-3 text-slate-500">{child.icon}</span>}
                                    {t(child.labelKey)}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
              ) : (
                <NavItemLink key={item.path} item={item} />
              )
            ))}

            <div className="flex items-center space-x-4 pl-4">
                <LanguageToggle />
                {!isAuthenticated ? (
                    <>
                        <Link to={ROUTES.SIGN_IN} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                            {t('nav.signIn')}
                        </Link>
                        <Link to={ROUTES.SIGN_UP} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors shadow-sm">
                            {t('nav.signUp')}
                        </Link>
                    </>
                ) : (
                    <div className="relative" ref={profileMenuRef}>
                        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                             <UserIcon className="w-6 h-6 text-slate-700"/>
                             <ChevronDownIcon className={`w-4 h-4 ml-1 text-slate-600 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isProfileMenuOpen && (
                            <div className="menu-dropdown-animation origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-50">
                                <div className="px-4 py-3 border-b border-slate-200">
                                    <p className="text-sm text-slate-800 font-semibold truncate">{user?.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                </div>
                                <div className="py-1">
                                    {profileMenuItems.map(item => (
                                         <NavLink
                                            key={item.path}
                                            to={item.path!}
                                            onClick={() => setIsProfileMenuOpen(false)}
                                            className={({isActive}) => `flex items-center w-full text-left px-4 py-2 text-sm transition-colors ${isActive ? 'bg-slate-100 text-sky-600' : 'text-slate-700 hover:bg-slate-100'}`}
                                        >
                                           {item.icon && <span className="mr-3 text-slate-500">{item.icon}</span>}
                                           {t(item.labelKey)}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="py-1 border-t border-slate-200">
                                    <button onClick={handleSignOut} className="flex items-center w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 text-slate-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                       </svg>
                                        {t('nav.signOut')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-20 inset-x-0 bg-white shadow-lg z-40 p-4">
          <div className="space-y-2">
            {filteredNavItems.map((item) => (
                item.children ? (
                    <div key={item.labelKey}>
                        <button 
                          onClick={() => setIsFrameworkMenuOpen(prev => !prev)}
                          className={`flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                            isFrameworkSectionActive
                              ? 'bg-sky-100 text-sky-600'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                          aria-expanded={isFrameworkMenuOpen}
                          aria-controls="framework-mobile-submenu"
                        >
                            <div className="flex items-center">
                                {item.icon && <span className="mr-3">{item.icon}</span>}
                                {t(item.labelKey)}
                            </div>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isFrameworkMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isFrameworkMenuOpen && (
                            <div className="pl-8 space-y-1 mt-1" id="framework-mobile-submenu">
                                {item.children.map(child => (
                                    <NavItemLink key={child.path} item={child} onClick={() => setIsMobileMenuOpen(false)} isMobile/>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <NavItemLink key={item.path} item={item} onClick={() => setIsMobileMenuOpen(false)} isMobile />
                )
            ))}
            {isAuthenticated && (
              <>
                <div className="pt-2 border-t border-slate-200" />
                {profileMenuItems.map((item) => (
                    <NavItemLink key={item.path} item={item} onClick={() => setIsMobileMenuOpen(false)} isMobile />
                ))}
                 <div className="pt-2 border-t border-slate-200" />
                 <button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-3 py-3 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                 >
                    <span className="mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                    </span>
                    {t('nav.signOut')}
                </button>
              </>
            )}
             {!isAuthenticated && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                 <NavItemLink item={{labelKey: 'nav.signIn', path: ROUTES.SIGN_IN}} onClick={() => setIsMobileMenuOpen(false)} isMobile />
                 <NavItemLink item={{labelKey: 'nav.signUp', path: ROUTES.SIGN_UP}} onClick={() => setIsMobileMenuOpen(false)} isMobile />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
