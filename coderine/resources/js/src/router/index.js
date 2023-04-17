import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PlayGroundView from "../views/PlayGroundView.vue";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardView,
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
    },
    {
        path: "/playground",
        name: "Playground",
        component: PlayGroundView,
    },
    {
        path: "/playground/:htmlTemplate",
        name: "PlaygroundTemplate",
        component: PlayGroundView,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
