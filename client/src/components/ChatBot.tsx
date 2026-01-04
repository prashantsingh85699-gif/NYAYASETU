import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, Volume2, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '@/lib/api';

export function ChatBot() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Stop speech when closing chatbot
        if (!isOpen) {
            window.speechSynthesis.cancel();
            setSpeakingIndex(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
                if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                    alert('Microphone access denied. Please check your browser permissions settings for this site.');
                } else if (event.error === 'no-speech') {
                    // Ignore no-speech errors, just stop listening
                } else {
                    toast.error(`Voice error: ${event.error}`);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, [i18n.language]);

    const handleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            // Stop any TTS playback before listening
            window.speechSynthesis.cancel();
            setSpeakingIndex(null);
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleSpeak = (text: string, index: number) => {
        // If already speaking this message, stop it
        if (speakingIndex === index) {
            window.speechSynthesis.cancel();
            setSpeakingIndex(null);
            return;
        }

        // Cancel any current speech
        window.speechSynthesis.cancel();

        // Clean markdown characters for speech
        const cleanText = text
            .replace(/\*\*/g, '')      // Remove bold **
            .replace(/\*/g, '')        // Remove italic *
            .replace(/#{1,6}\s?/g, '') // Remove headers #
            .replace(/`/g, '')         // Remove code blocks
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
            .replace(/[-]\s/g, '');    // Remove list dashes

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US';

        utterance.onend = () => {
            setSpeakingIndex(null);
        };

        utterance.onerror = () => {
            setSpeakingIndex(null);
        };

        setSpeakingIndex(index);
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const { data } = await api.post('/ai/chat', {
                message: userMessage,
                language: i18n.language
            });
            const assistantMessage = data.response;
            setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: t('chatbot.error') }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
                    <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            <span className="font-semibold">{t('chatbot.title')}</span>
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-8">
                                <p>{t('chatbot.welcome')}</p>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg flex flex-col gap-1 ${msg.role === 'user'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                        }`}
                                >
                                    <div className={`prose ${msg.role === 'user' ? 'prose-invert' : ''} max-w-none text-sm leading-relaxed break-words`}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                    {msg.role === 'assistant' && (
                                        <button
                                            onClick={() => handleSpeak(msg.content, idx)}
                                            className="self-end p-1 hover:bg-gray-200 rounded-full transition-colors"
                                            title={speakingIndex === idx ? 'Stop' : 'Listen'}
                                        >
                                            {speakingIndex === idx ? (
                                                <Square className="w-3 h-3 text-red-500 fill-current" />
                                            ) : (
                                                <Volume2 className="w-3 h-3 text-gray-500" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleVoiceInput}
                                className={isListening ? 'text-red-500 border-red-500 animate-pulse' : ''}
                                title="Voice Input"
                            >
                                <Mic className="w-4 h-4" />
                            </Button>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={isListening ? "Listening..." : t('chatbot.placeholder')}
                                disabled={loading}
                            />
                            <Button onClick={handleSend} disabled={loading || !input.trim()}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
