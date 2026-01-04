import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Filter } from 'lucide-react';
import { usePetitions, useDeletePetition } from '@/hooks/usePetitions';
import { PetitionCard } from '@/components/PetitionCard';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import toast from 'react-hot-toast';

export function Dashboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ status: '', type: '' });
    const { data: petitions, isLoading } = usePetitions(filters);
    const deleteMutation = useDeletePetition();

    const handleDelete = async (id: string) => {
        if (!window.confirm(t('dashboard.confirmDelete'))) return;

        try {
            await deleteMutation.mutateAsync(id);
            toast.success(t('dashboard.deleteSuccess'));
        } catch (error) {
            toast.error(t('dashboard.deleteError'));
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
                        <p className="text-gray-600 mt-1">{t('dashboard.subtitle')}</p>
                    </div>
                    <Button onClick={() => navigate('/')}>
                        <Plus className="w-5 h-5 mr-2" />
                        {t('dashboard.newPetition')}
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center gap-4">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <Select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-48"
                    >
                        <option value="">{t('dashboard.allStatus')}</option>
                        <option value="draft">{t('status.draft')}</option>
                        <option value="completed">{t('status.completed')}</option>
                        <option value="submitted">{t('status.submitted')}</option>
                    </Select>
                    <Select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-48"
                    >
                        <option value="">{t('dashboard.allTypes')}</option>
                        <option value="rti">{t('petitionTypes.items.rti.name')}</option>
                        <option value="consumer">{t('petitionTypes.items.consumer.name')}</option>
                        <option value="grievance">{t('petitionTypes.items.grievance.name')}</option>
                        <option value="pil">{t('petitionTypes.items.pil.name')}</option>
                        <option value="writ">{t('petitionTypes.items.writ.name')}</option>
                        <option value="municipal">{t('petitionTypes.items.municipal.name')}</option>
                    </Select>
                </div>

                {/* Petitions Grid */}
                {petitions && petitions.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {petitions.map((petition) => (
                            <PetitionCard
                                key={petition.id}
                                petition={petition}
                                onView={() => navigate(`/petition/${petition.id}/preview`)}
                                onDelete={() => handleDelete(petition.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Plus className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('dashboard.noPetitions')}
                        </h3>
                        <p className="text-gray-600 mb-6">{t('dashboard.noPetitionsDesc')}</p>
                        <Button onClick={() => navigate('/')}>
                            {t('dashboard.createFirst')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
