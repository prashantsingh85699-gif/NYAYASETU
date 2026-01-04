import { useState, useEffect } from 'react';
import { authService, User } from '@/lib/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authService.isAuthenticated()) {
            authService.getMe()
                .then(setUser)
                .catch(() => authService.logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return { user, loading, isAuthenticated: !!user };
}
