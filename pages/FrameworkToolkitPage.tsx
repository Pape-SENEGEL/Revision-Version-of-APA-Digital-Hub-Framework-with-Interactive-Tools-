import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BookOpenIcon, CompassIcon, BeakerIcon, SparklesIcon } from '../components/IconComponents';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { usePageTitle } from '../hooks/usePageTitle';

interface ToolkitCardProps { 
    to: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    isExternal?: boolean;
}

const ToolkitCard: React.FC<ToolkitCardProps> = ({ to, icon, title, description, isExternal = false }) => (
    <Link 
        to={to}
        target={isExternal ? '_blank' : ''}
        rel={isExternal ? 'noopener noreferrer' : ''}
        className="group block w-full text-left bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80"
    >
        <div className="flex items-start space-x-4">
            <div className="bg-sky-100 text-sky-600 p-3 rounded-lg transition-colors group-hover:bg-sky-200">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
        </div>
    </Link>
);

const FrameworkToolkitPage: React.FC = () => {
    const { t } = useLanguage();
    usePageTitle('nav.frameworkToolkit');

    const toolkitItems = [
        {
            to: ROUTES.FRAMEWORK,
            icon: <CompassIcon className="w-7 h-7" />,
            title: t('toolkitPage.guide.title'),
            description: t('toolkitPage.guide.description'),
        },
        {
            to: ROUTES.FRAMEWORK_GLOSSARY,
            icon: <BookOpenIcon className="w-7 h-7" />,
            title: t('toolkitPage.glossary.title'),
            description: t('toolkitPage.glossary.description'),
        },
        {
            to: ROUTES.FRAMEWORK_INTERACTIVE_TOOLS,
            icon: <SparklesIcon className="w-7 h-7" />,
            title: t('toolkitPage.interactiveTools.title'),
            description: t('toolkitPage.interactiveTools.description'),
        },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl tracking-tight">{t('toolkitPage.title')}</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600">{t('toolkitPage.description')}</p>
            </header>

            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toolkitItems.map(item => (
                        <ToolkitCard key={item.title} {...item} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FrameworkToolkitPage;