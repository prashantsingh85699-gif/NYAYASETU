
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    Scale,
    MessageSquare,
    Users,
    BookOpen,
    ArrowRight,
    Sparkles,
    Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const petitionTypes = [
        { id: 'rti', icon: FileText },
        { id: 'consumer', icon: Users },
        { id: 'grievance', icon: MessageSquare },
        { id: 'pil', icon: Scale },
        { id: 'writ', icon: BookOpen },
        { id: 'municipal', icon: FileText }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('hero.powered')}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    {t('hero.title')}
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    {t('hero.subtitle')}
                </p>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
                            <div className="text-gray-600">{t('stats.languages')}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                            <div className="text-gray-600">{t('stats.types')}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-3xl font-bold text-purple-600 mb-2">5 {t('stats.minutes')}</div>
                            <div className="text-gray-600">{t('stats.time')}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                            <div className="text-gray-600">{t('stats.accuracy')}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Petition Types */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('petitionTypes.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {petitionTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <Card
                                    key={type.id}
                                    className="hover:shadow-lg transition-all cursor-pointer group border-2 border-transparent hover:border-blue-500"
                                    onClick={() => navigate(`/petition/${type.id}`)}
                                >
                                    <CardContent className="p-6">
                                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{t(`petitionTypes.items.${type.id}.name`)}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{t(`petitionTypes.items.${type.id}.desc`)}</p>
                                        <div className="flex items-center text-blue-600 font-medium">
                                            {t('common.getStarted')} <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Features */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-8">{t('features.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div>
                            <MessageSquare className="w-10 h-10 mb-4" />
                            <h3 className="font-bold text-xl mb-2">{t('features.questionnaire.title')}</h3>
                            <p className="opacity-90">{t('features.questionnaire.desc')}</p>
                        </div>
                        <div>
                            <Sparkles className="w-10 h-10 mb-4" />
                            <h3 className="font-bold text-xl mb-2">{t('features.ai.title')}</h3>
                            <p className="opacity-90">{t('features.ai.desc')}</p>
                        </div>
                        <div>
                            <Globe className="w-10 h-10 mb-4" />
                            <h3 className="font-bold text-xl mb-2">{t('features.multilingual.title')}</h3>
                            <p className="opacity-90">{t('features.multilingual.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
