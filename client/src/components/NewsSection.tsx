import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Calendar, ChevronRight, ChevronUp, X, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface NewsSectionProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewsSection({ isOpen, onClose }: NewsSectionProps) {
    const { t, i18n } = useTranslation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [dynamicNews, setDynamicNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Initial load from Translation file
    const staticNews = t('news.items', { returnObjects: true });
    const initialNews = Array.isArray(staticNews) ? staticNews : [];

    const fetchLatestNews = async () => {
        setLoading(true);
        try {
            // Updated to point to the correct backend port
            const response = await axios.get(`http://localhost:5000/api/news/latest?lang=${i18n.language}`);
            if (response.data && Array.isArray(response.data)) {
                setDynamicNews(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto-fetch fresh news when opened
            fetchLatestNews();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, i18n.language]);

    if (!isOpen) return null;

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleNewsClick = (link: string | undefined, index: number) => {
        if (link && link.startsWith('http')) {
            // Use window.open with explicit true for new tab to avoid blockers
            const win = window.open(link, '_blank');
            if (win) {
                win.focus();
            } else {
                console.error("Popup blocked");
                // Fallback: simple location change (less ideal but works)
                window.location.href = link;
            }
        } else {
            toggleExpand(index);
        }
    };

    // Merge static and dynamic, preferring dynamic if available
    const displayNews = dynamicNews.length > 0 ? dynamicNews : initialNews;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {t('news.title')}
                                {loading && <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />}
                            </h2>
                            <p className="text-xs text-gray-500">Live Updates & Legal News</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto bg-gray-50/30 flex-1">
                    {loading && displayNews.length === 0 ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        </div>
                    ) : displayNews.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No updates available for {i18n.language.toUpperCase()}.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayNews.map((item: any, index: number) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 flex flex-col bg-white group cursor-pointer"
                                    onClick={() => handleNewsClick(item.link, index)}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-blue-100">
                                                <Calendar className="w-3 h-3" />
                                                {item.date}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg font-bold mt-2 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        <p className={`text-gray-600 text-sm mb-4 leading-relaxed ${expandedIndex === index ? '' : 'line-clamp-3'}`}>
                                            {item.summary}
                                        </p>
                                        <button
                                            className="text-blue-600 text-sm font-semibold flex items-center hover:bg-blue-50 px-3 py-1.5 -ml-3 rounded-lg transition-colors mt-auto self-start"
                                        >
                                            {item.link ? (
                                                <>
                                                    {t('common.readMore') || 'Read More'} <ExternalLink className="w-4 h-4 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    {expandedIndex === index ? (
                                                        <>
                                                            {t('common.showLess') || 'Show Less'} <ChevronUp className="w-4 h-4 ml-1" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            {t('common.readMore') || 'Read More'} <ChevronRight className="w-4 h-4 ml-1" />
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
