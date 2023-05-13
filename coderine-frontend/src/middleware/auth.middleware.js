import { useAuthStore } from '@/stores/auth';

export default function authMiddleware(to, from, next) {
    const isAuthenticated = useAuthStore().isAutheticated;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    }

    if (isAuthenticated && to.name === 'login') {
        next({ name: 'Playground' });
    }

    if (isAuthenticated && to.name === 'register') {
        next({ name: 'Playground' });
    }

    next();
}
