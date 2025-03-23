import { createRouter, createWebHistory } from "vue-router";
import SettingsScreen from "./views/Settings.vue";
import Home from "./views/Home.vue";
import base from "../base";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/settings", name: "settings", component: SettingsScreen },
];

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;
