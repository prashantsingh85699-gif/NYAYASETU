import api from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    language: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const authService = {
    async register(data: {
        email: string;
        password: string;
        name: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        language?: string;
    }): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async socialLogin(provider: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/social-login-mock', { provider });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};
