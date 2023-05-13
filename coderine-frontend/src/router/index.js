import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import PlayGroundView from '../views/PlayGroundView.vue';
import HomeView from '../views/HomeView.vue';
import DasboardView from '../views/DashboardView.vue';
import RegisterView from '../views/RegisterView.vue';
import authMiddleware from '../middleware/auth.middleware.js';
import checkStorage from '../middleware/check-storage.middleware';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/playground',
            name: 'Playground',
            component: PlayGroundView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/playground/:user/:componentId',
            name: 'PlaygroundComponent',
            component: PlayGroundView,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/playground/:user/:componentId/:htmlTemplate',
            name: 'PlaygroundTemplate',
            component: PlayGroundView,
            props: true,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/components',
            name: 'Components',
            component: DasboardView,
            meta: {
                requiresAuth: true,
            },
        },
    ],
});
router.beforeEach(checkStorage);
router.beforeEach(authMiddleware);

export default router;
