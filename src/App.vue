<template>
    <div class="bg-gray-900/98 text-gray-100 fixed inset-0 overflow-auto">
        <Background class="fixed -z-10" />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Background from "./components/Background.vue";
import { Config, GetConfig, SaveConfig } from "./config";
TestDemoMode;
// @ts-ignore
import cursorContent from "./assets/cursor.svg?raw";
// @ts-ignore
import handCursorContent from "./assets/hand-cursor.svg?raw";
import { TestDemoMode } from "@aikadm/aikadm/bindings/github.com/HumXC/aikadm/aikadm";
const config = ref(new Config());
GetConfig().then((c) => (config.value = c));
const applyZoom = (zoom: number) => {
    document.documentElement.style.fontSize = `${zoom * 16}px`;
};
watch(config.value, () => {
    applyZoom(config.value.zoom);
    SaveConfig();
});
applyZoom(config.value.zoom);

const updateCursor = (content: string) => {
    const size = 30 * config.value.zoom;
    const modifiedSVG = content
        .replace(/width="30px"/, `width="${size}px"`)
        .replace(/height="30px"/, `height="${size}px"`);

    const encodedSVG = encodeURIComponent(modifiedSVG);
    return `url("data:image/svg+xml;utf8,${encodedSVG}") 6 2, auto`;
};
const cursorURL = computed(() => updateCursor(cursorContent));
const handCursorURL = computed(() => updateCursor(handCursorContent));
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
<style>
* {
    cursor: v-bind("cursorURL");
}
.hand-cursor {
    cursor: v-bind("handCursorURL");
}
</style>
