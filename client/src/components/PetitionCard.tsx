import { useTranslation } from 'react-i18next';
import { FileText, Calendar, Download, Eye, Trash2 } from 'lucide-react';
import { Petition } from '@/types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getPetitionTypeName, formatDate, getStatusColor } from '@/lib/utils';

interface PetitionCardProps {
    petition: Petition;
    onView: () => void;
    onDelete: () => void;
}

export function PetitionCard({ petition, onView, onDelete }: PetitionCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">{petition.title}</h3>
                            <p className="text-sm text-gray-600">{getPetitionTypeName(petition.type)}</p>
                        </div>
                    </div>
                    <Badge className={getStatusColor(petition.status)}>
                        {t(`status.${petition.status}`)}
                    </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(petition.createdAt)}</span>
                    </div>
                    {petition.referenceNumber && (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {petition.referenceNumber}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button onClick={onView} variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        {t('common.view')}
                    </Button>
                    {petition.status === 'completed' && (
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t('common.download')}
                        </Button>
                    )}
                    <Button onClick={onDelete} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
