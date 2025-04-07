import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import base from "./base";
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: base,
});
