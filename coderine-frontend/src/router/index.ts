import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PlayGroundView from '../views/PlayGroundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/playground',
            name: 'Playground',
            component: PlayGroundView
        },
        {
            path: '/playground/:htmlTemplate',
            name: 'PlaygroundTemplate',
            component: PlayGroundView,
            props: true
        }
    ]
})

export default router
