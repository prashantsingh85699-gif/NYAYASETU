import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getPetitionTypeName(type: string): string {
    const names: Record<string, string> = {
        rti: 'RTI Application',
        consumer: 'Consumer Complaint',
        grievance: 'Grievance Petition',
        pil: 'Public Interest Litigation',
        writ: 'Writ Petition',
        municipal: 'Municipal Complaint'
    };
    return names[type] || type;
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        draft: 'bg-gray-100 text-gray-800',
        completed: 'bg-blue-100 text-blue-800',
        submitted: 'bg-green-100 text-green-800',
        archived: 'bg-gray-100 text-gray-600'
    };
    return colors[status] || colors.draft;
}
