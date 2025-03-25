<template>
    <div class="bg-gray-900/98 text-gray-100 fixed inset-0 overflow-auto">
        <Background class="fixed -z-10" />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script setup lang="ts">
import { applyZoom } from "./common";
import Background from "./components/Background.vue";
import { GetConfig } from "./config";
applyZoom(GetConfig().zoom);
</script>
<style>
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
