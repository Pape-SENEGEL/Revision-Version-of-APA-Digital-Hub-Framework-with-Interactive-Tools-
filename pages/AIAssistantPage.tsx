import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse, Content, Part, Type } from "@google/genai";
import { useLanguage } from '../hooks/useLanguage';
import { ChatMessage, GroundingChunk, GroundingChunkWeb, FlightSearchQuery, FlightOption } from '../types';
import { GEMINI_API_KEY, GEMINI_MODEL_TEXT } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import { PaperAirplaneIcon, SparklesIcon, UserIcon, PaperclipIcon, XCircleIcon, DocumentTextIcon } from '../components/IconComponents';
import { usePageTitle } from '../hooks/usePageTitle';

// Mock function to simulate searching for flights
const mockSearchFlights = async (query: FlightSearchQuery): Promise<FlightOption[]> => {
  console.log("Searching for flights with query:", query);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Return some mock data based on the query
  return [
    { id: 'FL123', airline: query.airline || 'Air Africa', departureTime: '08:30', arrivalTime: '14:45', price: 450 + (query.passengers * 10), stops: 0 },
    { id: 'FL456', airline: query.airline || 'Savannah Wings', departureTime: '11:00', arrivalTime: '18:15', price: 380 + (query.passengers * 10), stops: 1 },
    { id: 'FL789', airline: 'BudgetFly', departureTime: '15:00', arrivalTime: '23:30', price: 320 + (query.passengers * 5), stops: 1 },
  ].filter(f => !query.airline || f.airline.toLowerCase().includes(query.airline.toLowerCase()));
};

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});


const AIAssistantPage: React.FC = () => {
  const { t } = useLanguage();
  usePageTitle('aiAssistantPage.title');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchingFlights, setIsSearchingFlights] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyAvailable, setApiKeyAvailable] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (GEMINI_API_KEY) {
      setApiKeyAvailable(true);
    } else {
      setApiKeyAvailable(false);
      setError(t('aiAssistantPage.apiKeyMissing'));
    }
  }, [t]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          // Basic validation for file types supported by Gemini 1.5 Flash and this implementation
          const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'text/plain'];
          if (supportedTypes.includes(file.type) && file.size < 4 * 1024 * 1024) { // 4MB limit for safety
              setSelectedFile(file);
              setError(null);
          } else {
              setError(t('aiAssistantPage.uploadError'));
              handleRemoveFile();
          }
      }
  };

  const handleRemoveFile = () => {
      setSelectedFile(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  };


  const handleSendMessage = useCallback(async (messageText: string = input) => {
    if ((!messageText.trim() && !selectedFile) || isLoading || isSearchingFlights || !apiKeyAvailable) return;

    const fileToSend = selectedFile; // Capture file before state is cleared

    const newUserMessage: ChatMessage = { 
        id: Date.now().toString(), 
        sender: 'user', 
        text: messageText,
        file: fileToSend ? { name: fileToSend.name, type: fileToSend.type } : undefined
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY as string });
      
      const tools = [{
          functionDeclarations: [
            {
              name: 'bookFlight',
              description: 'Search for available flights based on user criteria.',
              parameters: {
                type: Type.OBJECT,
                properties: {
                  destination: { type: Type.STRING, description: 'The destination city, country or airport code.' },
                  departureDate: { type: Type.STRING, description: 'The departure date in YYYY-MM-DD format.' },
                  returnDate: { type: Type.STRING, description: 'The return date in YYYY-MM-DD format.' },
                  passengers: { type: Type.NUMBER, description: 'The total number of passengers.' },
                  airline: { type: Type.STRING, description: 'The preferred airline. Optional.' },
                },
                required: ['destination', 'departureDate', 'returnDate', 'passengers'],
              },
            },
          ],
        }];

      const promptParts: Part[] = [{ text: messageText }];
      
      if (fileToSend) {
        if (fileToSend.type.startsWith('image/')) {
            const base64Data = await toBase64(fileToSend);
            promptParts.push({ inlineData: { mimeType: fileToSend.type, data: base64Data } });
        } else if (fileToSend.type === 'text/plain') {
            const textContent = await fileToSend.text();
            // Prepend the text content to the user's prompt message
            promptParts[0].text = `${messageText}\n\n--- Attached Document: ${fileToSend.name} ---\n${textContent}\n--- End Document ---`;
        }
      }

      // History remains text-only, a reasonable limitation for client-side implementation
      const conversationHistory: Content[] = messages
          .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text.split('\n\n**')[0] }] 
          }))
          .slice(-10);

      const currentRequestContents: Content[] = [...conversationHistory, { role: 'user', parts: promptParts }];
      
      const systemInstruction = t('aiAssistantPage.systemInstructionWithFile');
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_TEXT,
        contents: currentRequestContents,
        config: {
          systemInstruction,
          tools,
        }
      });
      
      const responsePart = response.candidates?.[0]?.content?.parts?.[0];

      if (responsePart?.functionCall) {
        const functionCall = responsePart.functionCall;
        if (functionCall.name === 'bookFlight') {
            setIsLoading(false);
            setIsSearchingFlights(true);

            const args = functionCall.args as unknown as FlightSearchQuery;
            const flightResults = await mockSearchFlights(args);

            const toolResponseContents: Content[] = [
                ...currentRequestContents,
                { role: 'model', parts: [{ functionCall }] },
                { 
                  role: 'tool', 
                  parts: [{ 
                    functionResponse: {
                      name: 'bookFlight', 
                      response: { flights: flightResults }
                    } 
                  }]
                }
            ];
            
            const finalResponse = await ai.models.generateContent({
              model: GEMINI_MODEL_TEXT,
              contents: toolResponseContents,
              config: { systemInstruction }
            });

            const aiSummary: ChatMessage = { id: Date.now().toString() + '_ai_flights', sender: 'ai', text: finalResponse.text };
            setMessages(prev => [...prev, aiSummary]);
        }
      } else if (response.text) {
        let aiText = response.text;
        const groundingChunks: GroundingChunk[] | undefined = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
        
        let sourcesText = "";
        if (groundingChunks && groundingChunks.length > 0) {
          const webSources = groundingChunks
            .map(chunk => chunk.web)
            .filter(web => web && web.uri && web.title) as GroundingChunkWeb[];
            
          if (webSources.length > 0) {
            sourcesText = `\n\n**${t('aiAssistantPage.searchDisclaimer')}**\n` + webSources.map((source, idx) => `${idx + 1}. [${source.title!}](${source.uri!})`).join('\n');
          } else {
             sourcesText = `\n\n*${t('aiAssistantPage.noSources')}*`;
          }
        }

        const aiResponse: ChatMessage = { id: Date.now().toString() + '_ai', sender: 'ai', text: aiText + sourcesText };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error("No valid response from AI.");
      }
    } catch (e: any) {
      console.error("Gemini API error:", e);
      setError(t('aiAssistantPage.error'));
      const errorResponse: ChatMessage = { id: Date.now().toString() + '_ai_error', sender: 'ai', text: t('aiAssistantPage.error') };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setIsSearchingFlights(false);
    }
  }, [input, isLoading, isSearchingFlights, apiKeyAvailable, t, messages, selectedFile]);

  const handleSuggestionClick = (suggestionText: string) => {
    handleSendMessage(suggestionText);
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
            return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">{linkMatch[1]}</a>;
        }
        return part.split('\n').map((line, j) => <React.Fragment key={`${i}-${j}`}>{line}{j < part.split('\n').length - 1 && <br />}</React.Fragment>);
    });
  };

  return (
    <div className="max-w-4xl mx-auto h-[75vh] flex flex-col bg-white shadow-xl rounded-lg border border-slate-200 overflow-hidden">
      <header className="bg-slate-100 border-b border-slate-200 p-4 text-center">
        <h1 className="text-xl font-semibold flex items-center justify-center text-slate-800">
          <SparklesIcon className="w-6 h-6 mr-2 text-sky-500"/> {t('aiAssistantPage.title')}
        </h1>
        <p className="text-sm text-slate-500">{t('aiAssistantPage.description')}</p>
      </header>
      
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>}
            <div className={`max-w-lg p-3 rounded-xl shadow-md ${
              msg.sender === 'user' 
                ? 'bg-sky-600 text-white rounded-br-none' 
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.file && (
                <div className="mb-2 p-2 bg-black/10 rounded-lg flex items-center gap-2 text-xs border border-white/20">
                    <DocumentTextIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate font-medium">{msg.file.name}</span>
                </div>
              )}
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{renderMessageText(msg.text)}</div>
            </div>
            {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-slate-600"/></div>}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>
             <div className="max-w-lg p-3 rounded-xl shadow-md bg-white text-slate-800 rounded-bl-none border border-slate-200">
                <LoadingSpinner size="sm" text={t('aiAssistantPage.loading')}/>
             </div>
          </div>
        )}
        {isSearchingFlights && (
          <div className="flex items-end gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-white"/></div>
             <div className="max-w-lg p-3 rounded-xl shadow-md bg-white text-slate-800 rounded-bl-none border border-slate-200">
                <LoadingSpinner size="sm" text={t('aiAssistantPage.searchingFlights')}/>
             </div>
          </div>
        )}
         {error && !isLoading && (
           <div className="p-4 bg-red-100 text-red-800 text-sm rounded-lg text-center">
              {error}
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white">
        {selectedFile && (
            <div className="p-2 px-4 flex items-center justify-between bg-slate-100 text-sm border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-600 min-w-0">
                    <DocumentTextIcon className="w-5 h-5 flex-shrink-0"/>
                    <span className="font-medium">{t('aiAssistantPage.fileAttached')}</span>
                    <span className="text-slate-500 truncate">{selectedFile.name}</span>
                </div>
                <button onClick={handleRemoveFile} title={t('aiAssistantPage.removeFile')}>
                    <XCircleIcon className="w-5 h-5 text-slate-500 hover:text-red-600 transition-colors"/>
                </button>
            </div>
        )}
        <div className="p-4 flex items-center space-x-3">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,text/plain" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || isSearchingFlights || !apiKeyAvailable}
            className="p-3 border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-100 disabled:bg-slate-200 disabled:cursor-not-allowed"
            title={t('aiAssistantPage.attachFile')}
          >
              <PaperclipIcon className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('aiAssistantPage.inputPlaceholder')}
            className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            disabled={isLoading || isSearchingFlights || !apiKeyAvailable}
            aria-label={t('aiAssistantPage.inputPlaceholder')}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || isSearchingFlights || (!input.trim() && !selectedFile) || !apiKeyAvailable}
            className="bg-sky-600 text-white p-3 rounded-lg hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-label={t('aiAssistantPage.sendMessage')}
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="pb-3 flex flex-wrap justify-center gap-2">
            <button
                onClick={() => handleSuggestionClick(t('aiAssistantPage.suggestionBookFlight'))}
                className="px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors"
            >
                {t('aiAssistantPage.suggestionBookFlight')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
