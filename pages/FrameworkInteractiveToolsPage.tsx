
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, GEMINI_MODEL_PRO } from '../constants';
import * as FormDataTypes from '../types';
import * as Icons from '../components/IconComponents';
import { usePdfGenerator } from '../hooks/usePdfGenerator';

// Import all form components
import IncubatorBlueprintForm from '../components/forms/IncubatorBlueprintForm';
import PolicyAdvisoryForm from '../components/forms/PolicyAdvisoryForm';
import DesignSprintForm from '../components/forms/DesignSprintForm';
import MaeToolkitForm from '../components/forms/MaeToolkitForm';
import LeadershipProgramForm from '../components/forms/LeadershipProgramForm';
import AiGovernanceForm from '../components/forms/AiGovernanceForm';
import CertificationPlatformForm from '../components/forms/CertificationPlatformForm';
import GrmCoDesignForm from '../components/forms/GrmCoDesignForm';
import ImpactFunderForm from '../components/forms/ImpactFunderForm';
import TrustAuditForm from '../components/forms/TrustAuditForm';
import PartnershipVettingForm from '../components/forms/PartnershipVettingForm';
import PartnershipReadinessForm from '../components/forms/PartnershipReadinessForm';
import LoadingSpinner from '../components/LoadingSpinner';

type ToolType = 'incubatorBlueprint' | 'policyAdvisory' | 'designSprint' | 'maeToolkit' | 'leadershipProgram' | 'aiGovernance' | 'certificationPlatform' | 'grmCoDesign' | 'impactFunder' | 'trustAudit' | 'partnershipVetting' | 'partnershipReadiness';
type GenericFormData = FormDataTypes.IncubatorFormData | FormDataTypes.PolicyFormData | FormDataTypes.DesignSprintFormData | FormDataTypes.MaeToolkitFormData | FormDataTypes.LeadershipProgramFormData | FormDataTypes.AiGovernanceFormData | FormDataTypes.CertificationPlatformFormData | FormDataTypes.GrmCoDesignFormData | FormDataTypes.ImpactFunderFormData | FormDataTypes.TrustAuditFormData | FormDataTypes.PartnershipVettingFormData | FormDataTypes.PartnershipReadinessFormData;

const renderMarkdown = (markdownText: string) => {
  if (!markdownText) return null;
  
  const html = markdownText
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-800 mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-800 mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-5 list-disc mb-2 text-slate-700">$1</li>')
    .replace(/^\s*([0-9]+\.) (.*$)/gim, '<li class="ml-5 list-decimal mb-2 text-slate-700">$2</li>')
    .replace(/(\n\s*){2,}/g, '</p><p class="text-slate-700 leading-relaxed mb-4">')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-sky-700 rounded px-1.5 py-0.5 text-sm font-mono">$1</code>');

  const wrappedHtml = `<div class="prose prose-slate max-w-none text-slate-800">${html.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}</div>`
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><ol>/g, '<ol>')
    .replace(/<\/ol><\/p>/g, '</ol>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>');

  return <div dangerouslySetInnerHTML={{ __html: wrappedHtml }} />;
};

interface ToolDefinition {
    id: ToolType;
    icon: keyof typeof Icons;
    isTemplate?: boolean;
}

const toolsList: ToolDefinition[] = [
    { id: 'incubatorBlueprint', icon: 'RocketLaunchIcon' },
    { id: 'policyAdvisory', icon: 'BuildingStorefrontIcon' },
    { id: 'designSprint', icon: 'BeakerIcon', isTemplate: true },
    { id: 'maeToolkit', icon: 'ClipboardDocumentCheckIcon' },
    { id: 'leadershipProgram', icon: 'AcademicCapIcon', isTemplate: true },
    { id: 'aiGovernance', icon: 'CpuChipIcon' },
    { id: 'certificationPlatform', icon: 'CheckBadgeIcon' },
    { id: 'grmCoDesign', icon: 'ChatBubbleLeftRightIcon', isTemplate: true },
    { id: 'impactFunder', icon: 'BanknotesIcon', isTemplate: true },
    { id: 'trustAudit', icon: 'ShieldCheckIcon', isTemplate: true },
    { id: 'partnershipVetting', icon: 'UserGroupIcon', isTemplate: true },
    { id: 'partnershipReadiness', icon: 'UsersIcon' },
];

const formMap: Record<ToolType, React.FC<{ onGenerateReport: (data: any) => void }>> = {
    incubatorBlueprint: IncubatorBlueprintForm,
    policyAdvisory: PolicyAdvisoryForm,
    designSprint: DesignSprintForm,
    maeToolkit: MaeToolkitForm,
    leadershipProgram: LeadershipProgramForm,
    aiGovernance: AiGovernanceForm,
    certificationPlatform: CertificationPlatformForm,
    grmCoDesign: GrmCoDesignForm,
    impactFunder: ImpactFunderForm,
    trustAudit: TrustAuditForm,
    partnershipVetting: PartnershipVettingForm,
    partnershipReadiness: PartnershipReadinessForm,
};

const FrameworkInteractiveToolsPage: React.FC = () => {
    const { t } = useLanguage();
    usePageTitle('nav.frameworkInteractiveTools');
    const [activeTool, setActiveTool] = useState<ToolType>('incubatorBlueprint');
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const contentPaneRef = useRef<HTMLElement>(null);
    
    const reportSections: FormDataTypes.HierarchicalSection[] = [{ id: 'generated-report-container', sectionTitleKey: 'interactiveToolsPage.reportModal.title' }];
    const { isGeneratingPdf, pdfProgress, generatePdf } = usePdfGenerator(reportSections);

    const ActiveFormComponent = formMap[activeTool] || (() => <div>Tool not found</div>);

    const handleSelectTool = (toolId: ToolType) => {
        setActiveTool(toolId);
        setGeneratedReport(null);
        setError(null);
        if (window.innerWidth < 768) {
            contentPaneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleGenerateReport = useCallback(async (data: GenericFormData) => {
        setIsLoading(true);
        setError(null);
        setGeneratedReport(null);
        setIsReportModalOpen(true);
        setCopySuccess('');

        if (!GEMINI_API_KEY) {
            setError(t('aiAssistantPage.apiKeyMissing'));
            setIsLoading(false);
            return;
        }

        const currentToolTitle = t(`interactiveToolsPage.${activeTool}.title`);
        const systemInstruction = `You are a world-class strategic advisor specializing in development in Africa and the APA Framework. 
        Your task is to analyze the user's provided inputs for the "${currentToolTitle}" and generate a comprehensive, highly professional strategic report. 
        
        The report must:
        1. Have a professional title exactly based on "${currentToolTitle}" and an executive summary.
        2. Analyze each provided field, offering expert insights and connecting them back to APA core principles (DEI, Trust, Accountability, Business as Engine).
        3. Identify potential risks or hurdles based on the inputs and suggest mitigation strategies.
        4. Provide clear, prioritized next steps.
        5. Use sophisticated business language and perfect markdown formatting.
        6. Be tailored to the specific context of Africa's socio-economic landscape.`;

        const userPrompt = `Tool: ${currentToolTitle}\n\n` + 
            Object.entries(data)
            .map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                return `### ${label}\n${value || '(User did not provide input for this section)'}`;
            })
            .join('\n\n');

        try {
            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: GEMINI_MODEL_PRO,
                contents: userPrompt,
                config: { systemInstruction, temperature: 0.7 }
            });
            setGeneratedReport(response.text);
        } catch (e) {
            console.error("Error generating report:", e);
            setError(t('interactiveToolsPage.form.generationError'));
        } finally {
            setIsLoading(false);
        }
    }, [t, activeTool]);

    const handleCloseModal = () => {
        setIsReportModalOpen(false);
        setTimeout(() => {
            setGeneratedReport(null);
            setError(null);
        }, 300);
    };
    
    const handleCopyToClipboard = () => {
        if (!generatedReport) return;
        navigator.clipboard.writeText(generatedReport).then(() => {
            setCopySuccess(t('interactiveToolsPage.reportModal.copySuccess'));
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const handleDownloadPdf = () => {
        generatePdf({
            selectedSections: { 'generated-report-container': true },
            orientation: 'p',
            quality: 2
        });
    };

    const ToolSelectorIcon: React.FC<{ name: keyof typeof Icons, className?: string }> = ({ name, className }) => {
        const IconComponent = Icons[name] || Icons.CubeTransparentIcon;
        return <IconComponent className={className} />;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">{t('interactiveToolsPage.title')}</h1>
                <p className="text-lg max-w-3xl mx-auto text-slate-600 leading-relaxed">{t('interactiveToolsPage.description')}</p>
            </header>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
                {/* Sidebar: Independently scrollable on larger screens */}
                <aside className="md:w-1/3 lg:w-[400px] md:sticky md:top-24 max-h-[calc(100vh-120px)] flex flex-col">
                    <h2 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-[0.2em] pl-1">{t('interactiveToolsPage.selectTool')}</h2>
                    <div className="space-y-4 overflow-y-auto pr-4 custom-scrollbar pb-8">
                        {toolsList.map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => handleSelectTool(tool.id)}
                                className={`tool-selector-card group relative flex items-start transition-all duration-300 p-5 rounded-2xl border border-transparent shadow-sm hover:shadow-md ${
                                    activeTool === tool.id 
                                    ? 'bg-white border-slate-200 ring-2 ring-sky-500 ring-offset-4' 
                                    : 'bg-slate-100/50 hover:bg-slate-200/50'
                                }`}
                            >
                                <div className={`tool-selector-icon flex-shrink-0 transition-all duration-300 ${
                                    activeTool === tool.id ? 'bg-sky-500 text-white scale-110 shadow-lg' : 'bg-sky-100 text-sky-600'
                                }`}>
                                    <ToolSelectorIcon name={tool.icon} className="w-5 h-5" />
                                </div>
                                <div className="ml-4 flex-1 text-left">
                                    <div className="flex items-center justify-between mb-1 gap-2">
                                        <h3 className={`font-bold text-base tracking-tight leading-tight transition-colors ${
                                            activeTool === tool.id ? 'text-sky-700' : 'text-slate-800'
                                        }`}>
                                            {t(`interactiveToolsPage.${tool.id}.title`)}
                                        </h3>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter shrink-0 ${
                                            tool.isTemplate ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-sky-100 text-sky-700 border border-sky-200'
                                        }`}>
                                            {tool.isTemplate ? 'Template' : 'Tool'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">{t(`interactiveToolsPage.${tool.id}.description`)}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content Pane */}
                <main ref={contentPaneRef} className="flex-1 min-w-0">
                    <div key={activeTool} className="fade-in bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 min-h-[700px]">
                        {/* Breadcrumb-style Header */}
                        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 pb-10">
                            <div className="flex-1">
                                <nav className="flex items-center gap-2 text-sky-600 font-bold text-[10px] uppercase tracking-widest mb-6">
                                    <Icons.SparklesIcon className="w-4 h-4" />
                                    <span>Framework</span>
                                    <span className="text-slate-300">/</span>
                                    <span className="text-slate-400">Interactive Hub</span>
                                </nav>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                                    {t(`interactiveToolsPage.${activeTool}.title`)}
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl font-medium italic">
                                    {t(`interactiveToolsPage.${activeTool}.description`)}
                                </p>
                            </div>
                            <div className="hidden lg:flex items-center justify-center p-8 bg-slate-50 rounded-[1.5rem] border border-slate-100 shadow-inner">
                                <ToolSelectorIcon 
                                    name={toolsList.find(t => t.id === activeTool)?.icon || 'CubeTransparentIcon'} 
                                    className="w-16 h-16 text-sky-500/30" 
                                />
                            </div>
                        </div>

                        {/* Interactive Form Component */}
                        <div className="bg-white rounded-2xl">
                             <ActiveFormComponent onGenerateReport={handleGenerateReport} />
                        </div>
                    </div>
                </main>
            </div>
            
            {isReportModalOpen && (
                <div className="report-modal-overlay" onClick={handleCloseModal}>
                    <div className="report-modal-content max-w-5xl" onClick={e => e.stopPropagation()}>
                        <header className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-black flex items-center text-slate-900 tracking-tight">
                                <Icons.SparklesIcon className="w-6 h-6 mr-3 text-sky-500" />
                                {t('interactiveToolsPage.reportModal.title')}
                            </h2>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-800 text-3xl font-light p-1 transition-colors">&times;</button>
                        </header>
                        <div className="report-modal-body bg-white custom-scrollbar p-8 md:p-12" id="generated-report-container">
                            {isLoading && (
                                <div className="flex flex-col justify-center items-center h-[400px]">
                                    <LoadingSpinner text={t('interactiveToolsPage.form.generating')} size="lg" />
                                </div>
                            )}
                            {error && (
                                <div className="p-10 bg-red-50 text-red-700 rounded-[1.5rem] text-center border border-red-100 mx-auto max-w-md my-12 font-semibold">
                                    {error}
                                </div>
                            )}
                            {generatedReport && !isLoading && (
                                <div className="animate-fadeIn py-4">
                                    {renderMarkdown(generatedReport)}
                                </div>
                            )}
                        </div>
                        <footer className="report-modal-footer p-6 border-t bg-slate-50">
                             {copySuccess && <span className="text-sm text-green-600 font-bold mr-auto animate-pulse flex items-center gap-2"><Icons.CheckCircleIcon className="w-4 h-4"/> {copySuccess}</span>}
                             {isGeneratingPdf && <span className="text-sm text-sky-600 font-bold mr-auto flex items-center gap-2"><div className="w-3 h-3 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"/> {pdfProgress}</span>}
                             <div className="flex gap-4">
                                <button onClick={handleCloseModal} className="px-6 py-3 text-sm font-black text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">{t('interactiveToolsPage.reportModal.closeButton')}</button>
                                <button onClick={handleDownloadPdf} disabled={!generatedReport || isLoading || isGeneratingPdf} className="px-6 py-3 text-sm font-black text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50">
                                    <Icons.ArrowDownOnSquareIcon className="w-4 h-4" />
                                    PDF
                                </button>
                                <button onClick={handleCopyToClipboard} disabled={!generatedReport || isLoading} className="px-6 py-3 text-sm font-black text-white bg-sky-600 rounded-xl hover:bg-sky-700 disabled:bg-slate-300 shadow-xl hover:shadow-sky-500/20 transition-all">{t('interactiveToolsPage.reportModal.copyButton')}</button>
                             </div>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrameworkInteractiveToolsPage;
