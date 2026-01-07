import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { useLanguage } from '../hooks/useLanguage';
import { ChatMessage } from '../types';
import { GEMINI_API_KEY, GEMINI_MODEL_TEXT } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { PaperAirplaneIcon, SparklesIcon, UserIcon } from './IconComponents';

interface AIAgentProps {
  title: string;
  systemInstruction: string;
  initialMessage: string;
  embedded?: boolean; // For a more compact style
}

const AIAgent: React.FC<AIAgentProps> = ({ title, systemInstruction, initialMessage, embedded = false }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    setMessages([{ id: 'init', sender: 'ai', text: initialMessage }]);
  }, [initialMessage]);

  useEffect(scrollToBottom, [messages]);
  
  const apiKeyAvailable = !!GEMINI_API_KEY;

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading || !apiKeyAvailable) return;

    const newUserMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMessage]); 
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY as string });
      
      // We send only the last few messages to keep the context relevant and concise
      const conversationHistory = [...messages, newUserMessage].slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: conversationHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      const aiResponse: ChatMessage = { id: Date.now().toString() + '_ai', sender: 'ai', text: response.text };
      setMessages(prev => [...prev, aiResponse]);

    } catch (e: any) {
      console.error("Gemini API error:", e);
      const errorMessage = t('aiAssistantPage.error');
      setError(errorMessage);
      const errorResponse: ChatMessage = { id: Date.now().toString() + '_ai_error', sender: 'ai', text: errorMessage };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, apiKeyAvailable, t, messages, systemInstruction]);

  const mainClass = embedded 
    ? "w-full flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden" 
    : "max-w-4xl mx-auto flex flex-col bg-white shadow-xl rounded-lg border border-slate-200 overflow-hidden";

  return (
    <div className={mainClass} style={{height: embedded ? '400px' : '500px'}}>
      {!embedded && (
        <header className="bg-slate-100 border-b border-slate-200 p-4 text-center">
          <h2 className="text-lg font-semibold flex items-center justify-center text-slate-800">
            <SparklesIcon className="w-6 h-6 mr-2 text-sky-500"/> {title}
          </h2>
        </header>
      )}
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>}
            <div className={`max-w-md p-3 rounded-lg ${
              msg.sender === 'user' 
                ? 'bg-sky-600 text-white rounded-br-none' 
                : `bg-white text-slate-800 rounded-bl-none border border-slate-200 ${msg.id === 'init' ? 'bg-sky-50 border-sky-200': ''}`
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2.5 justify-start">
             <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>
             <div className="p-3 rounded-lg bg-white border border-slate-200">
                <LoadingSpinner size="sm" text={t('aiAssistantPage.loading')}/>
             </div>
          </div>
        )}
        {error && !isLoading && apiKeyAvailable && (
           <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {error}
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-slate-200 p-3 bg-white">
        {apiKeyAvailable ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('aiAgent.inputPlaceholder')}
              className="flex-grow p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label={t('aiAgent.sendMessage')}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <p className="text-amber-600 text-xs text-center p-2 bg-amber-50 rounded-md">{t('aiAssistantPage.apiKeyMissing')}</p>
        )}
      </div>
    </div>
  );
};

export default AIAgent;