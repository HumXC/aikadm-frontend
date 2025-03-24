import { createRouter, createWebHistory } from "vue-router";
import base from "../base";
import Settings from "./views/Settings.vue";
import Welcome from "./views/Welcome.vue";
import Login from "./views/Login.vue";

const routes = [
    { path: "/", name: "welcome", component: Welcome },
    { path: "/login", name: "login", component: Login },
    { path: "/settings", name: "settings", component: Settings },
];

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;
