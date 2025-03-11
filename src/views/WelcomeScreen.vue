<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-4"
        tabindex="0"
        @click="router.push('/login')"
        @keydown="handleKeydown"
        ref="welcomeScreenRef"
    >
        <div class="text-center transform transition-all duration-500 hover:scale-105">
            <div class="text-7xl font-light mb-4">{{ currentTime }}</div>
            <div class="text-2xl font-light mb-8">{{ currentDate }}</div>

            <div class="mt-16 opacity-70 text-sm flex items-center space-x-2 justify-center">
                <MousePointerClickIcon size="16" />
                <span>or press</span>
                <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>
                <span>/</span>
                <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Enter</kbd>
                <span>to continue</span>
            </div>
        </div>
        <!-- Settings Button -->
        <div class="fixed bottom-4 right-4">
            <button
                @click="openSettings"
                class="!bg-transparent text-gray-300 hover:text-white focus:outline-none transition-colors"
            >
                <SettingsIcon size="24" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { MousePointerClickIcon, SettingsIcon } from "lucide-vue-next";
import { Config, getConfig } from "../config";
import router from "../router";
const welcomeScreenRef = ref<HTMLElement | null>(null);
const currentTime = ref("");
const currentDate = ref("");
const config = ref(new Config());
let timeInterval: any = null;

const updateDateTime = () => {
    const now = new Date();

    // Format time: HH:MM
    currentTime.value = now.toLocaleTimeString(config.value.lang, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    // Format date: Weekday, Month Day, Year
    currentDate.value = now.toLocaleDateString(config.value.lang, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
const openSettings = (event: MouseEvent) => {
    event.stopPropagation();
    router.push("/settings");
};
const handleKeydown = (event) => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Current position:", position);
    });
    if (event.key === " " || event.key === "Enter") {
        router.push("/login");
    }
};

onMounted(async () => {
    config.value = await getConfig();
    document.documentElement.lang = config.value.lang;
    updateDateTime();
    // timeInterval = setInterval(updateDateTime, 1000);
    if (welcomeScreenRef.value) {
        welcomeScreenRef.value.focus();
    }
});

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});
</script>
