<template>
    <div class="flex flex-col items-center justify-center text-gray-100 p-4 border-0">
        <div class="text-center transform transition-all duration-500 hover:scale-105">
            <div class="text-9xl mb-4">{{ currentTime }}</div>
            <div class="text-3xl mb-8">{{ currentDate }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const currentTime = ref("");
const currentDate = ref("");
let timeInterval: any = null;

const updateDateTime = () => {
    const now = new Date();

    // Format time: HH:MM
    currentTime.value = now.toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    // Format date: Weekday, Month Day, Year
    currentDate.value = now.toLocaleDateString("en", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

onMounted(async () => {
    updateDateTime();
    timeInterval = setInterval(updateDateTime, 5000);
});

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});
</script>
