import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useCreatePetition, useGeneratePetition } from '@/hooks/usePetitions';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export function Questionnaire() {
    const { type } = useParams<{ type: string }>();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [schema, setSchema] = useState<any>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const createMutation = useCreatePetition();
    const generateMutation = useGeneratePetition();

    useEffect(() => {
        const fetchSchema = async () => {
            try {
                const { data } = await api.get(`/ai/schema/${type}?lang=${i18n.language}`);
                setSchema(data);
            } catch (error) {
                toast.error(t('questionnaire.schemaError'));
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (type) fetchSchema();
    }, [type, navigate, t]);

    const handleInputChange = (questionId: string, value: any) => {
        setFormData({ ...formData, [questionId]: value });
    };

    const handleNext = () => {
        if (currentSection < schema.sections.length - 1) {
            setCurrentSection(currentSection + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // 1. Create petition draft
            const petition = await createMutation.mutateAsync({
                type,
                title: `${schema.title} - ${new Date().toLocaleDateString()}`,
                questionnaireData: formData,
                language: i18n.language,
                status: 'draft'
            });

            // 2. Generate content with AI
            toast.loading(t('common.generating'));
            await generateMutation.mutateAsync(petition.id!);

            toast.dismiss();
            toast.success('Petition generated successfully!');
            navigate(`/petition/${petition.id}/preview`);
        } catch (error) {
            toast.error('Failed to generate petition');
            console.error(error);
        }
    };

    if (loading || !schema) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const section = schema.sections[currentSection];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('common.backAcross')}
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{schema.title}</h1>
                        <span className="text-sm text-gray-600">
                            {t('questionnaire.steps', { current: currentSection + 1, total: schema.sections.length })}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                        <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentSection + 1) / schema.sections.length) * 100}%` }}
                        />
                    </div>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-xl font-semibold mb-6">{section.title}</h2>

                        <div className="space-y-6">
                            {section.questions.map((question: any) => (
                                <div key={question.id}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {question.label} {question.required && <span className="text-red-500">*</span>}
                                    </label>

                                    {question.type === 'textarea' ? (
                                        <Textarea
                                            required={question.required}
                                            placeholder={question.placeholder}
                                            rows={question.rows || 4}
                                            value={formData[question.id] || ''}
                                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                                        />
                                    ) : question.type === 'select' ? (
                                        <Select
                                            required={question.required}
                                            value={formData[question.id] || ''}
                                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                                        >
                                            <option value="">{t('common.selectOption')}</option>
                                            {question.options?.map((opt: string) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input
                                            type={question.type}
                                            required={question.required}
                                            placeholder={question.placeholder}
                                            value={formData[question.id] || ''}
                                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentSection === 0}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t('common.previous')}
                            </Button>

                            <Button onClick={handleNext}>
                                {currentSection === schema.sections.length - 1 ? (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        {t('questionnaire.generate')}
                                    </>
                                ) : (
                                    <>
                                        {t('common.next')}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
