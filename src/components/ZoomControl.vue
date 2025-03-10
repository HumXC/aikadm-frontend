<template>
    <div class="fixed bottom-4 right-4 z-50">
        <div
            class="flex items-center bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg transition-all duration-200"
        >
            <button
                class="flex items-center justify-center w-8 h-8 rounded-full !bg-transparent text-gray-300 hover:bg-gray-700/70 hover:text-gray-100 focus:bg-gray-700/70 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
                @click="decreaseZoom"
                title="Zoom Out"
                aria-label="Decrease zoom level"
            >
                <MinusIcon class="w-4 h-4" />
            </button>

            <div class="relative mx-1">
                <input
                    type="number"
                    v-model="zoomValue"
                    @change="applyZoom"
                    @blur="validateZoom"
                    class="w-12 h-7 bg-gray-700/50 text-gray-100 border border-gray-600/50 rounded text-right pr-5 text-sm focus:outline-none focus:border-indigo-500/80 focus:bg-gray-700/70 transition-all duration-200"
                    min="25"
                    max="400"
                    step="5"
                    aria-label="Zoom level percentage"
                />
                <span
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none"
                    >%</span
                >
            </div>

            <button
                class="flex items-center justify-center w-8 h-8 rounded-full !bg-transparent text-gray-300 hover:bg-gray-700/70 hover:text-gray-100 focus:bg-gray-700/70 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
                @click="increaseZoom"
                title="Zoom In"
                aria-label="Increase zoom level"
            >
                <PlusIcon class="w-4 h-4" />
            </button>

            <button
                class="flex items-center justify-center w-8 h-8 rounded-full !bg-transparent text-indigo-300/80 hover:bg-gray-700/70 hover:text-indigo-200 focus:bg-gray-700/70 focus:text-indigo-200 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95 ml-0.5"
                @click="resetZoom"
                title="Reset Zoom"
                aria-label="Reset zoom to 100%"
            >
                <RotateCcwIcon class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-vue-next";
import { Config, getConfig, saveConfig } from "../config";

// Default zoom settings
const DEFAULT_ZOOM = 100;
const MIN_ZOOM = 25;
const MAX_ZOOM = 400;
const ZOOM_STEP = 10;
const zoomValue = ref(DEFAULT_ZOOM);
const config = ref(new Config());
const applyZoom = () => {
    const zoom = zoomValue.value / 100;
    config.value.zoom = zoom;
    document.documentElement.style.fontSize = `${zoom * 16}px`;
    saveConfig(config.value);
};

// Validate zoom is within acceptable range
const validateZoom = () => {
    if (zoomValue.value < MIN_ZOOM) zoomValue.value = MIN_ZOOM;
    if (zoomValue.value > MAX_ZOOM) zoomValue.value = MAX_ZOOM;
    applyZoom();
};

// Increase zoom level
const increaseZoom = () => {
    zoomValue.value = Math.min(zoomValue.value + ZOOM_STEP, MAX_ZOOM);
    applyZoom();
};

// Decrease zoom level
const decreaseZoom = () => {
    zoomValue.value = Math.max(zoomValue.value - ZOOM_STEP, MIN_ZOOM);
    applyZoom();
};

// Reset zoom to default
const resetZoom = () => {
    zoomValue.value = DEFAULT_ZOOM;
    applyZoom();
};

// Watch for changes to zoomValue
watch(zoomValue, (newValue) => {
    // Ensure zoom value is a number
    if (isNaN(Number(newValue))) {
        zoomValue.value = DEFAULT_ZOOM;
    }
});

// Initialize zoom from saved value
onMounted(async () => {
    config.value = await getConfig();
    const savedZoom = config.value.zoom;
    if (savedZoom) {
        zoomValue.value = savedZoom * 100;
        applyZoom();
    }
});
</script>
<style scoped>
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}
</style>
