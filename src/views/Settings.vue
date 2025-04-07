<template>
    <div
        class="min-h-screen bg-gray-900 text-gray-100 p-8"
        tabindex="0"
        ref="box"
        @keydown="handleKeydown"
    >
        <div class="max-w-2xl mx-auto w-full">
            <header class="mb-10">
                <h1 class="text-3xl font-light mb-2">Settings</h1>
                <p class="text-gray-400">Customize your experience</p>
            </header>

            <div class="space-y-8">
                <!-- Background -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Background</h2>
                            <p class="text-sm text-gray-400 mt-1">Enter background URL or color</p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            v-model="background"
                            @blur="saveSettings"
                            placeholder="URL or color value (e.g. #123456)"
                            class="w-full px-3 py-2 bg-gray-700 rounded"
                        />
                    </div>
                </div>
                <!-- Zoom Setting -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Zoom</h2>
                            <p class="text-sm text-gray-400 mt-1">Adjust display size (10-400%)</p>
                        </div>
                        <div class="text-xl font-light">{{ zoom }}%</div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button
                            @click="decrementZoom"
                            class="w-10 h-10 flex items-center justify-center hover:!bg-gray-600 !bg-gray-700 rounded-full transition-colors"
                            :disabled="zoom <= 10"
                        >
                            <MinusIcon style="size: 18" :class="{ 'opacity-50': zoom <= 10 }" />
                        </button>

                        <div class="flex-1 relative">
                            <input
                                type="range"
                                min="10"
                                max="400"
                                step="10"
                                v-model.number="zoom"
                                @change="saveSettings"
                                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <button
                            @click="incrementZoom"
                            class="w-10 h-10 flex items-center justify-center hover:!bg-gray-600 !bg-gray-700 rounded-full transition-colors"
                            :disabled="zoom >= 400"
                        >
                            <PlusIcon style="size: 18" :class="{ 'opacity-50': zoom >= 400 }" />
                        </button>

                        <div class="relative w-20">
                            <input
                                type="number"
                                min="10"
                                max="400"
                                step="10"
                                v-model.number="zoom"
                                @change="validateAndSaveZoom"
                                class="w-full px-3 py-2 bg-gray-700 rounded text-center"
                            />
                        </div>
                    </div>
                </div>
                <!-- Back Button -->
                <button
                    @click="router.back()"
                    class="mt-8 px-6 py-3 !bg-gray-800 hover:!bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                    <ArrowLeftIcon style="size: 18" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef, onUnmounted } from "vue";
import { MinusIcon, PlusIcon, ArrowLeftIcon } from "lucide-vue-next";
import { Config, GetConfig } from "../config";
import router from "../router";
const zoom = ref(100);
const background = ref("");
const config = ref(new Config());
const showLanguageDropdown = ref(false);
const showStyleDropdown = ref(false);
const box = useTemplateRef("box");
GetConfig().then((c) => (config.value = c));
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        router.back();
    }
};
const closeAllDropdowns = () => {
    showLanguageDropdown.value = false;
    showStyleDropdown.value = false;
};
onMounted(async () => {
    box.value?.focus();
    zoom.value = config.value.zoom * 100;
    background.value = config.value.background || "";

    document.addEventListener("click", closeAllDropdowns);
});
onUnmounted(() => {
    document.removeEventListener("click", closeAllDropdowns);
});
const incrementZoom = () => {
    if (zoom.value < 400) {
        zoom.value += 10;
        saveSettings();
    }
};

const decrementZoom = () => {
    if (zoom.value > 10) {
        zoom.value -= 10;
        saveSettings();
    }
};

const validateAndSaveZoom = () => {
    if (zoom.value < 10) zoom.value = 10;
    if (zoom.value > 400) zoom.value = 400;
    saveSettings();
};

const saveSettings = async () => {
    config.value.zoom = zoom.value / 100;
    config.value.background = background.value;
};
</script>

<style scoped>
input[type="range"] {
    appearance: none;
    height: 8px;
    background: #4a5568;
    border-radius: 5px;
    background-image: linear-gradient(#3182ce, #3182ce);
    background-repeat: no-repeat;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}
</style>
