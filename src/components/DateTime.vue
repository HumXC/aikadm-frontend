<template>
    <div class="flex flex-col items-center justify-center text-gray-100 p-4 border-0">
        <div class="text-center transform transition-all duration-500 hover:scale-105">
            <div class="text-7xl font-light mb-4">{{ currentTime }}</div>
            <div class="text-2xl font-light mb-8">{{ currentDate }}</div>
        </div>
    </div>
</template>
<style lang="css"></style>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Config, getConfig } from "../config";
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

onMounted(async () => {
    config.value = await getConfig();
    document.documentElement.lang = config.value.lang;
    updateDateTime();
    timeInterval = setInterval(updateDateTime, 5000);
});

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});
</script>
