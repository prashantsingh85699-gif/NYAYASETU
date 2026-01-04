import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Scale, MessageSquare, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const petitionTypes = [
    { id: 'rti', name: 'RTI Application', icon: FileText, desc: 'Right to Information request' },
    { id: 'consumer', name: 'Consumer Complaint', icon: Users, desc: 'Consumer forum complaint' },
    { id: 'grievance', name: 'Grievance Petition', icon: MessageSquare, desc: 'Complaint to authorities' },
    { id: 'pil', name: 'Public Interest Litigation', icon: Scale, desc: 'Legal petition for public cause' },
    { id: 'writ', name: 'Write Petition', icon: BookOpen, desc: 'Constitutional remedy' },
    { id: 'municipal', name: 'Municipal Complaint', icon: FileText, desc: 'Local body complaint' }
];

export function PetitionTypes() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('petitionTypes.title')}</h1>
                <div className="grid md:grid-cols-3 gap-6">
                    {petitionTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                            <Card
                                key={type.id}
                                className="hover:shadow-lg transition-all cursor-pointer group hover:border-blue-500"
                                onClick={() => navigate(`/petition/${type.id}`)}
                            >
                                <CardContent className="p-6">
                                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        <Icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{type.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{type.desc}</p>
                                    <div className="flex items-center text-blue-600 font-medium">
                                        {t('common.getStarted')} <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
