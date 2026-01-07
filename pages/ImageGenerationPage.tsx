import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';
import { GEMINI_API_KEY } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { PhotoIcon, SparklesIcon } from '../components/IconComponents';
import RobustImage from '../components/RobustImage';

const ImageGenerationPage: React.FC = () => {
    const { t } = useLanguage();
    usePageTitle('imageGenerationPage.title');

    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    
    const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];
    const promptExamples = [
        'imageGenerationPage.promptExample1',
        'imageGenerationPage.promptExample2',
        'imageGenerationPage.promptExample3',
    ];

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim() || !GEMINI_API_KEY) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt,
                config: {
                    numberOfImages: 1,
                    aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:4",
                    outputMimeType: 'image/jpeg',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                setGeneratedImageUrl(imageUrl);
            } else {
                throw new Error("No image was generated.");
            }
        } catch (e) {
            console.error("Image generation error:", e);
            setError(t('imageGenerationPage.error'));
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio, t]);
    
    const handleDownload = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement('a');
        link.href = generatedImageUrl;
        link.download = `apa-generated-${Date.now()}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl tracking-tight">{t('imageGenerationPage.title')}</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600">{t('imageGenerationPage.description')}</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-lg border border-slate-200 h-fit">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-semibold text-slate-700 mb-2">
                                {t('imageGenerationPage.promptLabel')}
                            </label>
                            <textarea
                                id="prompt"
                                rows={5}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={t('imageGenerationPage.promptPlaceholder')}
                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="aspectRatio" className="block text-sm font-semibold text-slate-700 mb-2">
                                {t('imageGenerationPage.aspectRatioLabel')}
                            </label>
                            <select
                                id="aspectRatio"
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition bg-white"
                            >
                                {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                            </select>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            className="w-full flex justify-center items-center gap-2 bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size="sm" color="text-white" />
                                    {t('imageGenerationPage.generatingButton')}
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-5 h-5" />
                                    {t('imageGenerationPage.generateButton')}
                                </>
                            )}
                        </button>

                        <div className="pt-4 border-t border-slate-200">
                             <h3 className="text-sm font-semibold text-slate-700 mb-2">{t('imageGenerationPage.promptExamplesTitle')}</h3>
                             <div className="space-y-2">
                                {promptExamples.map(exampleKey => (
                                    <button 
                                        key={exampleKey}
                                        onClick={() => setPrompt(t(exampleKey))}
                                        className="text-left text-xs text-slate-500 hover:text-sky-600 transition-colors p-2 bg-slate-100 rounded-md w-full"
                                    >
                                        {t(exampleKey)}
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="relative aspect-[16/9] bg-slate-100 rounded-xl shadow-inner border border-slate-200 flex items-center justify-center p-4">
                        {isLoading && <LoadingSpinner text={t('imageGenerationPage.generatingButton')} size="lg" />}
                        {error && <p className="text-red-600 text-center">{error}</p>}
                        {!isLoading && !error && generatedImageUrl && (
                            <RobustImage 
                                src={generatedImageUrl} 
                                alt={t('imageGenerationPage.generatedImageAlt', { prompt })} 
                                className="max-w-full max-h-full object-contain rounded-lg" 
                                width="1024"
                                height="576"
                            />
                        )}
                        {!isLoading && !error && !generatedImageUrl && (
                             <div className="text-center text-slate-500">
                                <PhotoIcon className="w-16 h-16 mx-auto mb-2 text-slate-400" />
                                <p>{t('imageGenerationPage.noImage')}</p>
                            </div>
                        )}
                    </div>
                    {generatedImageUrl && !isLoading && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleDownload}
                                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                {t('imageGenerationPage.downloadButton')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageGenerationPage;