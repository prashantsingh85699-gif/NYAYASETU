import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Petition } from '@/types';

export function usePetitions(filters?: { status?: string; type?: string }) {
    return useQuery({
        queryKey: ['petitions', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters as any);
            const { data } = await api.get<Petition[]>(`/petitions?${params}`);
            return data;
        }
    });
}

export function usePetition(id: string) {
    return useQuery({
        queryKey: ['petition', id],
        queryFn: async () => {
            const { data } = await api.get<Petition>(`/petitions/${id}`);
            return data;
        },
        enabled: !!id
    });
}

export function useCreatePetition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (petition: Partial<Petition>) => {
            const { data } = await api.post<Petition>('/petitions', petition);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['petitions'] });
        }
    });
}

export function useGeneratePetition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.post<Petition>(`/petitions/${id}/generate`);
            return data;
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['petition', id] });
            queryClient.invalidateQueries({ queryKey: ['petitions'] });
        }
    });
}

export function useUpdatePetition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Petition> }) => {
            const { data } = await api.patch<Petition>(`/petitions/${id}`, updates);
            return data;
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['petition', id] });
            queryClient.invalidateQueries({ queryKey: ['petitions'] });
        }
    });
}

export function useDeletePetition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/petitions/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['petitions'] });
        }
    });
}
