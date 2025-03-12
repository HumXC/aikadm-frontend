import { createRouter, createWebHistory } from "vue-router";
import LoginScreen from "./views/LoginScreen.vue";
import SettingsScreen from "./views/SettingsScreen.vue";
import WelcomeScreen from "./views/WelcomeScreen.vue";
import base from "../base";

const routes = [
    { path: "/", name: "welcome", component: WelcomeScreen },
    { path: "/login", name: "login", component: LoginScreen },
    { path: "/settings", name: "settings", component: SettingsScreen },
];

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;
