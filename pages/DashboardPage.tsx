import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_TOURS, MOCK_RESOURCES, ROUTES, MOCK_USERS_DB } from '../constants';
import { UserType, UserApplication, ApplicationStatus, Resource, UserProfile } from '../types';
import * as Icons from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';
import RobustImage from '../components/RobustImage';


// --- Dashboard UI Components ---
// These are shared components for the dashboard views.

const DashboardHeader: React.FC<{ title: string; subtitle: string; }> = ({ title, subtitle }) => (
    <header className="pb-6 border-b border-slate-200">
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
        <p className="text-lg text-slate-600 mt-1">{subtitle}</p>
    </header>
);

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 border-l-4" style={{ borderLeftColor: color }}>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const ActionCard: React.FC<{ to: string; title: string; icon: React.ReactNode; color: string; }> = ({ to, title, icon, color }) => (
    <Link to={to} className="group block bg-white p-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
             <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
                {icon}
            </div>
            <h3 className="text-md font-semibold text-slate-700 group-hover:text-slate-900">{title}</h3>
        </div>
    </Link>
);

const ListCard: React.FC<{ title: string; items: React.ReactNode[]; viewAllLink?: string; viewAllText?: string; icon: React.ReactNode; emptyText: string; }> = ({ title, items, viewAllLink, viewAllText, icon, emptyText }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
        <div className="flex items-center border-b border-slate-200 pb-3 mb-4">
            {icon}
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        {items.length > 0 ? (
            <ul className="space-y-3 flex-grow">
                {items}
            </ul>
        ) : (
            <div className="text-center text-slate-500 py-8 flex-grow flex items-center justify-center">{emptyText}</div>
        )}
        {viewAllLink && viewAllText && items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <Link to={viewAllLink} className="text-sm font-semibold text-sky-600 hover:underline">{viewAllText} &rarr;</Link>
            </div>
        )}
    </div>
);

// --- Role-Specific Dashboard Views ---
// Each view is a separate component for a specific user role.

const GuestDashboard: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="text-center py-10 bg-slate-100 rounded-lg">
            <h2 className="text-2xl font-bold text-slate-800">{t('dashboardPage.guest.title')}</h2>
            <p className="mt-2 text-slate-600">{t('dashboardPage.guest.description')}</p>
            <div className="mt-6 flex justify-center gap-4">
                <Link to={ROUTES.SIGN_IN} className="px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors">{t('dashboardPage.guest.signIn')}</Link>
                <Link to={ROUTES.SIGN_UP} className="px-6 py-2.5 bg-white text-sky-600 font-semibold rounded-lg shadow-md border border-sky-600 hover:bg-sky-50 transition-colors">{t('dashboardPage.guest.signUp')}</Link>
            </div>
        </div>
    );
};

const ProspectiveDashboard: React.FC = () => {
    const { t, translateField } = useLanguage();
    const { user } = useAuth();
    const applications = user?.applications || [];
    const bookmarks = MOCK_RESOURCES.filter(r => user?.bookmarkedResourceIds?.includes(r.id));

    const getStatusClass = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.ACCEPTED: return 'bg-green-100 text-green-800';
            case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800';
            case ApplicationStatus.UNDER_REVIEW: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };
    
    const getTourTitle = (tourId: string) => MOCK_TOURS.find(t => t.id === tourId)?.title || {};

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ListCard 
                    title={t('nav.myApplications')}
                    icon={<Icons.ClipboardListIcon className="w-6 h-6 mr-3 text-purple-600"/>}
                    items={applications.slice(0, 3).map(app => (
                        <li key={app.applicationId} className="flex justify-between items-center text-sm">
                            <div>
                                <Link to={ROUTES.TOUR_DETAIL.replace(':tourId', app.tourId)} className="font-semibold text-slate-800 hover:text-sky-600">{translateField(getTourTitle(app.tourId))}</Link>
                                <p className="text-xs text-slate-500">{t('myApplicationsPage.dateSubmitted')}: {app.dateSubmitted}</p>
                            </div>
                            <span className={`px-2 py-1 font-semibold rounded-full text-xs ${getStatusClass(app.status)}`}>{app.status}</span>
                        </li>
                    ))}
                    viewAllLink={ROUTES.MY_APPLICATIONS}
                    viewAllText={t('myApplicationsPage.title')}
                    emptyText={t('myApplicationsPage.noApplications')}
                />
                 <ListCard 
                    title={t('nav.myBookmarks')}
                    icon={<Icons.BookmarkIcon className="w-6 h-6 mr-3 text-pink-600"/>}
                    items={bookmarks.slice(0, 3).map(res => (
                         <li key={res.id}>
                             <Link to={ROUTES.RESOURCE_DETAIL.replace(':resourceId', res.id)} className="font-semibold text-slate-800 hover:text-sky-600 text-sm">{translateField(res.title)}</Link>
                         </li>
                    ))}
                    viewAllLink={ROUTES.MY_BOOKMARKS}
                    viewAllText={t('myBookmarksPage.title')}
                    emptyText={t('myBookmarksPage.noBookmarks')}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard to={ROUTES.TOURS} title={t('homePage.ctaTours')} icon={<Icons.CompassIcon className="w-6 h-6"/>} color="#0ea5e9" />
                <ActionCard to={ROUTES.RESOURCES} title={t('homePage.ctaResources')} icon={<Icons.BookOpenIcon className="w-6 h-6"/>} color="#f97316" />
                <ActionCard to={ROUTES.PROFILE} title={t('nav.profile')} icon={<Icons.UserIcon className="w-6 h-6"/>} color="#10b981" />
            </div>
        </div>
    );
};

const AlumniDashboard: React.FC = () => {
    const { t, translateField } = useLanguage();
    const { user } = useAuth();
    const pastJourneys = MOCK_TOURS.filter(tour => user?.history?.some(h => h.activity.includes(translateField(tour.title))));

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Past Journeys</h3>
                    <ul className="space-y-2">
                        {pastJourneys.map(tour => (
                            <li key={tour.id}><Link to={ROUTES.FEEDBACK_TOUR.replace(':tourId', tour.id)} className="font-semibold text-sky-600 hover:underline">{translateField(tour.title)}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Share Your Experience</h3>
                    <p className="text-sm text-green-700 mb-4">Your feedback and testimonials help shape the future of APA.</p>
                    <Link to="#" className="font-semibold text-green-600 hover:underline">Submit a Testimonial</Link>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard to={ROUTES.HOME} title="Alumni Network" icon={<Icons.UserGroupIcon className="w-6 h-6"/>} color="#8b5cf6" />
                <ActionCard to={ROUTES.RESOURCES} title="Exclusive Content" icon={<Icons.SparklesIcon className="w-6 h-6"/>} color="#db2777" />
                <ActionCard to={ROUTES.SOLUTIONS} title="Mentor Program" icon={<Icons.AcademicCapIcon className="w-6 h-6"/>} color="#0891b2" />
            </div>
        </div>
    );
};

const PartnerDashboard: React.FC = () => {
    const { t } = useLanguage();
    return (
         <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Joint Initiatives" value="3" icon={<Icons.UserGroupIcon className="w-6 h-6"/>} color="#16a34a" />
                <StatCard title="Impact Metrics" value="1,200+" icon={<Icons.ChartBarIcon className="w-6 h-6"/>} color="#ea580c" />
                <StatCard title="Shared Resources" value="12" icon={<Icons.BookOpenIcon className="w-6 h-6"/>} color="#4f46e5" />
                <StatCard title="Active Collaborations" value="5" icon={<Icons.UsersIcon className="w-6 h-6"/>} color="#0e7490" />
            </div>
            <div>
                 <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Access</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActionCard to={ROUTES.FRAMEWORK_INTERACTIVE_TOOLS} title="Partnership Tools" icon={<Icons.CogIcon className="w-6 h-6"/>} color="#ca8a04" />
                    <ActionCard to={ROUTES.SOLUTIONS} title="Explore Solutions" icon={<Icons.CubeTransparentIcon className="w-6 h-6"/>} color="#be185d" />
                    <ActionCard to={ROUTES.RESOURCES} title="Resource Library" icon={<Icons.BookOpenIcon className="w-6 h-6"/>} color="#059669" />
                </div>
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();
     const allApplications = MOCK_USERS_DB.flatMap(u => u.applications || []);
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title={t('dashboardPage.stats.totalUsers')} value={MOCK_USERS_DB.length} icon={<Icons.UsersIcon className="w-6 h-6"/>} color="#0284c7" />
                <StatCard title={t('dashboardPage.stats.activeTours')} value={MOCK_TOURS.length} icon={<Icons.CompassIcon className="w-6 h-6"/>} color="#ca8a04" />
                <StatCard title="Total Applications" value={allApplications.length} icon={<Icons.ClipboardListIcon className="w-6 h-6"/>} color="#65a30d" />
                <StatCard title={t('dashboardPage.stats.totalResources')} value={MOCK_RESOURCES.length} icon={<Icons.BookOpenIcon className="w-6 h-6"/>} color="#c2410c" />
            </div>
             <div>
                 <h3 className="text-xl font-semibold text-slate-800 mb-4">Management Actions</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ActionCard to="#" title="Manage Users" icon={<Icons.UserGroupIcon className="w-6 h-6"/>} color="#5b21b6" />
                    <ActionCard to={ROUTES.TOURS} title="Manage Journeys" icon={<Icons.CompassIcon className="w-6 h-6"/>} color="#0e7490" />
                    <ActionCard to={ROUTES.RESOURCES} title="Manage Resources" icon={<Icons.BookOpenIcon className="w-6 h-6"/>} color="#b45309" />
                    <ActionCard to="#" title="Site Settings" icon={<Icons.CogIcon className="w-6 h-6"/>} color="#64748b" />
                </div>
            </div>
        </div>
    );
};

// A simple router for different APA employee roles
const ApaerDashboardRouter: React.FC = () => {
    const { user } = useAuth();
    // Default dashboard for APA team members
    const genericApaerDashboard = <ProspectiveDashboard />; 
    
    switch (user?.userType) {
        case UserType.APAER_ADMINISTRATOR: return <AdminDashboard />;
        // Add cases for other APAer roles here as they are developed
        // case UserType.APAER_PROJECT_MANAGER: return <ProjectManagerDashboard />;
        default: return genericApaerDashboard;
    }
};


// --- Main Dashboard Page Component ---
// This component determines the user's role and renders the correct view.
const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  usePageTitle('dashboardPage.title');
  
  const userType = isAuthenticated && user ? user.userType : UserType.GUEST;
  const userName = isAuthenticated && user ? user.name : t('userTypes.guest');

  const getDashboardComponent = () => {
    if (!isAuthenticated || !user) {
        return <GuestDashboard />;
    }
    
    switch(true) {
        case user.userType === UserType.PROSPECTIVE: return <ProspectiveDashboard />;
        case user.userType === UserType.ALUMNI: return <AlumniDashboard />;
        case user.userType.startsWith('partner_'): return <PartnerDashboard />;
        case user.userType.startsWith('apaer_'): return <ApaerDashboardRouter />;
        default: return <ProspectiveDashboard />; // Fallback for any other authenticated user type
    }
  }
  
  const welcomeMessage = isAuthenticated && user 
    ? t('dashboardPage.welcome', { userName: userName, userType: t(`userTypes.${userType}`) })
    : t('dashboardPage.guest.title');

  return (
    <div className="space-y-8">
      <DashboardHeader title={t('dashboardPage.title')} subtitle={welcomeMessage} />
      <div className="border-t border-slate-200 pt-8">
        {getDashboardComponent()}
      </div>
    </div>
  );
};

export default DashboardPage;
