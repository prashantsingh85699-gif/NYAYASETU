import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Download, ArrowLeft, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePetition } from '@/hooks/usePetitions';
import toast from 'react-hot-toast';

export function Preview() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data: petition, isLoading } = usePetition(id!);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!petition) {
        return <div>Petition not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('common.backToDashboard')}
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" />
                            {t('common.print')}
                        </Button>
                        <Button onClick={() => toast.success(t('common.downloadStarted'))}>
                            <Download className="w-4 h-4 mr-2" />
                            {t('common.downloadPdf')}
                        </Button>
                    </div>
                </div>

                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="prose max-w-none whitespace-pre-wrap font-serif">
                            {petition.generatedContent || "Petition content generation in progress or failed."}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
