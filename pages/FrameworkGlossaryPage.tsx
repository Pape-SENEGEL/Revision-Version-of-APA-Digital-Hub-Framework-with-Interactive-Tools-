import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { FRAMEWORK_TOOLS } from '../constants';
import { ToolCategory, ToolDefinition } from '../types';
import * as Icons from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';

const Icon = ({ name, className }: {name: string, className?: string}) => {
    const IconComponent = (Icons as any)[name] || Icons.BookOpenIcon;
    return <IconComponent className={className || "w-6 h-6"}/>
};

const ToolDefinitionItem: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
    const { t } = useLanguage();
    return (
        <div className="py-5">
            <dt className="font-bold text-slate-800 text-md">{t(tool.termKey)}</dt>
            <dd className="mt-2 text-slate-600 text-sm leading-relaxed">{t(tool.definitionKey)}</dd>
        </div>
    );
};


const FrameworkGlossaryPage: React.FC = () => {
    const { t } = useLanguage();
    usePageTitle('nav.frameworkGlossary');
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategories, setOpenCategories] = useState<Set<string>>(() => {
        const firstCategoryKey = FRAMEWORK_TOOLS[0]?.titleKey;
        return firstCategoryKey ? new Set([firstCategoryKey]) : new Set();
    });

    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) {
            return FRAMEWORK_TOOLS;
        }

        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered: ToolCategory[] = [];

        FRAMEWORK_TOOLS.forEach(category => {
            const matchingTools = category.tools.filter(tool => 
                t(tool.termKey).toLowerCase().includes(lowercasedFilter) ||
                t(tool.definitionKey).toLowerCase().includes(lowercasedFilter)
            );

            if (matchingTools.length > 0) {
                filtered.push({ ...category, tools: matchingTools });
            }
        });
        
        // If searching, auto-expand all categories with results
        if(searchTerm.trim()) {
            setOpenCategories(new Set(filtered.map(c => c.titleKey)));
        }

        return filtered;
    }, [searchTerm, t]);

    const handleCategoryToggle = (titleKey: string) => {
        setOpenCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(titleKey)) {
                newSet.delete(titleKey);
            } else {
                newSet.add(titleKey);
            }
            return newSet;
        });
    };
    
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center">
                 <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl tracking-tight">{t('glossaryPage.title')}</h1>
                 <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600">{t('glossaryPage.description')}</p>
            </header>

            <div className="sticky top-20 bg-slate-50/80 backdrop-blur-lg z-10 py-4 -mt-4">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                         <Icon name="SearchIcon" className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={t('glossaryPage.searchPlaceholder')}
                        className="block w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                </div>
            </div>

            <main className="space-y-4">
                {filteredCategories.length > 0 ? filteredCategories.map(category => {
                    const isOpen = openCategories.has(category.titleKey);
                    return (
                        <div key={category.titleKey} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => handleCategoryToggle(category.titleKey)}
                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isOpen ? 'bg-sky-50 hover:bg-sky-100' : 'hover:bg-slate-50'}`}
                                aria-expanded={isOpen}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon name={category.icon} className="w-6 h-6 text-sky-600"/>
                                    <h2 className="text-lg font-semibold text-slate-800">{t(category.titleKey)}</h2>
                                </div>
                                <Icons.ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isOpen && (
                                <div className="bg-slate-50/50 border-t border-slate-200">
                                    <dl className="divide-y divide-slate-200 px-6">
                                        {category.tools.map(tool => (
                                            <ToolDefinitionItem key={tool.termKey} tool={tool} />
                                        ))}
                                    </dl>
                                </div>
                            )}
                        </div>
                    )
                }) : (
                    <div className="text-center py-10 text-slate-500">
                        <p>{t('glossaryPage.noResults')}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FrameworkGlossaryPage;