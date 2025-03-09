<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-4"
        tabindex="0"
        @click="emitEnterLogin"
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
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { MousePointerClickIcon } from "lucide-vue-next";

const emit = defineEmits(["enter-login"]);
const welcomeScreenRef = ref(null);
const currentTime = ref("");
const currentDate = ref("");
let timeInterval = null;

const updateDateTime = () => {
    const now = new Date();

    // Format time: HH:MM
    currentTime.value = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    // Format date: Weekday, Month Day, Year
    currentDate.value = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const emitEnterLogin = () => {
    emit("enter-login");
};

const handleKeydown = (event) => {
    if (event.key === " " || event.key === "Enter") {
        emitEnterLogin();
    }
};

onMounted(() => {
    // Update time immediately
    updateDateTime();

    // Update time every second
    timeInterval = setInterval(updateDateTime, 1000);

    // Focus the welcome screen to capture keyboard events
    if (welcomeScreenRef.value) {
        welcomeScreenRef.value.focus();
    }
});

onUnmounted(() => {
    // Clear interval when component is destroyed
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});
</script>

<style scoped>
/* Add a subtle pulse animation to the time display */
@keyframes pulse {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
}

.text-7xl {
    animation: pulse 2s infinite ease-in-out;
}
</style>
