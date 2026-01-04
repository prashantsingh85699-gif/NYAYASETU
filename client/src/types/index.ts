export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    language: string;
    createdAt: string;
}

export interface Petition {
    id: string;
    userId: string;
    type: string;
    status: string;
    title: string;
    questionnaireData: any;
    generatedContent?: string;
    language: string;
    referenceNumber?: string;
    pdfUrl?: string;
    submittedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface QuestionnaireSchema {
    title: string;
    description: string;
    sections: Section[];
}

export interface Section {
    title: string;
    questions: Question[];
}

export interface Question {
    id: string;
    type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'file';
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
    rows?: number;
}

export interface PetitionType {
    id: string;
    name: string;
    description: string;
    icon: string;
}
