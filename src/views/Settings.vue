<template>
    <div
        class="min-h-screen flex flex-col bg-gray-900 text-gray-100 p-8"
        tabindex="0"
        @keydown="handleKeydown"
    >
        <div class="max-w-2xl mx-auto w-full">
            <header class="mb-10">
                <h1 class="text-3xl font-light mb-2">Settings</h1>
                <p class="text-gray-400">Customize your experience</p>
            </header>

            <div class="space-y-8">
                <!-- Night Light Mode -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Night Light Mode</h2>
                            <p class="text-sm text-gray-400 mt-1">Reduce blue light emission</p>
                        </div>
                        <div
                            class="relative inline-block w-12 h-6 transition duration-200 ease-in-out"
                        >
                            <input
                                type="checkbox"
                                id="night-light-toggle"
                                class="opacity-0 w-0 h-0"
                                v-model="nightLightMode"
                                @change="saveSettings"
                            />
                            <label
                                for="night-light-toggle"
                                class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-600 rounded-full transition-all duration-300"
                                :class="{ '!bg-blue-500': nightLightMode }"
                            >
                                <span
                                    class="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300"
                                    :class="{ 'transform translate-x-6': nightLightMode }"
                                ></span>
                            </label>
                        </div>
                    </div>

                    <div class="mt-4 space-y-4" v-if="nightLightMode">
                        <div>
                            <p class="text-sm text-gray-400 mb-2">Color Temperature Settings</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="highTemp" class="text-sm text-gray-400 block mb-1"
                                        >High Temperature (K)</label
                                    >
                                    <div class="flex items-center">
                                        <input
                                            type="number"
                                            id="highTemp"
                                            v-model.number="highColorTemp"
                                            @change="validateAndSaveColorTemp"
                                            min="5000"
                                            max="10000"
                                            step="100"
                                            class="w-full px-3 py-2 bg-gray-700 rounded"
                                        />
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1">Daytime (5000-10000K)</p>
                                </div>
                                <div>
                                    <label for="lowTemp" class="text-sm text-gray-400 block mb-1"
                                        >Low Temperature (K)</label
                                    >
                                    <div class="flex items-center">
                                        <input
                                            type="number"
                                            id="lowTemp"
                                            v-model.number="lowColorTemp"
                                            @change="validateAndSaveColorTemp"
                                            min="1000"
                                            max="5000"
                                            step="100"
                                            class="w-full px-3 py-2 bg-gray-700 rounded"
                                        />
                                    </div>
                                    <p class="text-xs text-gray-500 mt-1">Nighttime (1000-5000K)</p>
                                </div>
                            </div>
                            <div class="flex items-center mt-3">
                                <div
                                    class="h-6 flex-1 rounded-lg overflow-hidden"
                                    style="
                                        background: linear-gradient(
                                            to right,
                                            #ff9b66,
                                            #ffb38b,
                                            #ffd2b0,
                                            #fff4e8,
                                            #f5f3ff,
                                            #d4e5ff,
                                            #a1cdff
                                        );
                                    "
                                ></div>
                            </div>
                        </div>

                        <div>
                            <label for="gamma" class="text-sm text-gray-400 block mb-1"
                                >Gamma</label
                            >
                            <div class="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="0.5"
                                    max="3.0"
                                    step="0.1"
                                    v-model.number="gamma"
                                    @change="saveSettings"
                                    class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <div class="w-16">
                                    <input
                                        type="number"
                                        min="0.5"
                                        max="3.0"
                                        step="0.1"
                                        v-model.number="gamma"
                                        @change="validateAndSaveGamma"
                                        class="w-full px-3 py-2 bg-gray-700 rounded text-center"
                                    />
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">Adjust screen gamma (0.5-3.0)</p>
                        </div>
                    </div>
                </div>

                <!-- Location (Latitude & Longitude) -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Location</h2>
                            <p class="text-sm text-gray-400 mt-1">Your geographic coordinates</p>
                        </div>
                        <button
                            @click="detectLocation"
                            class="px-4 py-2 !bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center space-x-2"
                        >
                            <MapPinIcon size="14" />
                            <span>Detect Location</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="latitude" class="text-sm text-gray-400 block mb-1"
                                >Latitude</label
                            >
                            <input
                                type="number"
                                id="latitude"
                                v-model.number="latitude"
                                @change="saveSettings"
                                placeholder="e.g. 37.7749"
                                step="0.0001"
                                class="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                        <div>
                            <label for="longitude" class="text-sm text-gray-400 block mb-1"
                                >Longitude</label
                            >
                            <input
                                type="number"
                                id="longitude"
                                v-model.number="longitude"
                                @change="saveSettings"
                                placeholder="e.g. -122.4194"
                                step="0.0001"
                                class="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">
                        Used for automatic night mode activation at sunset based on your location
                    </p>
                </div>

                <!-- Language -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Language</h2>
                            <p class="text-sm text-gray-400 mt-1">
                                Select or enter your preferred language
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <div class="relative">
                            <input
                                type="text"
                                v-model="language"
                                @change="saveSettings"
                                @blur="saveSettings"
                                @click="(e) => e.stopPropagation()"
                                @focus="showLanguageDropdown = true"
                                placeholder="Enter or select language"
                                class="w-full px-3 py-2 bg-gray-700 rounded"
                            />
                            <div
                                v-if="showLanguageDropdown"
                                class="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                                @blur="showLanguageDropdown = false"
                            >
                                <div
                                    v-for="lang in languages"
                                    :key="lang.code"
                                    @click="selectLanguage(lang)"
                                    class="px-3 py-2 hover:bg-gray-600 cursor-pointer flex justify-between"
                                >
                                    <span>{{ lang.name }}</span>
                                    <span class="text-gray-400">{{ lang.code }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

                <!-- Weather -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Weather</h2>
                            <p class="text-sm text-gray-400 mt-1">Show weather information</p>
                        </div>
                        <div
                            class="relative inline-block w-12 h-6 transition duration-200 ease-in-out"
                        >
                            <input
                                type="checkbox"
                                id="weather-toggle"
                                class="opacity-0 w-0 h-0"
                                v-model="showWeather"
                                @change="saveSettings"
                            />
                            <label
                                for="weather-toggle"
                                class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-600 rounded-full transition-all duration-300"
                                :class="{ '!bg-blue-500': showWeather }"
                            >
                                <span
                                    class="absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-all duration-300"
                                    :class="{ 'transform translate-x-6': showWeather }"
                                ></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Style -->
                <div class="p-4 bg-gray-800 rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-xl text-left font-light">Style</h2>
                            <p class="text-sm text-gray-400 mt-1">Choose your preferred UI style</p>
                        </div>
                    </div>
                    <div class="relative">
                        <div
                            class="w-full px-3 py-2 bg-gray-700 rounded flex justify-between items-center cursor-pointer"
                            @click="
                                (e) => {
                                    e.stopPropagation();
                                    showStyleDropdown = !showStyleDropdown;
                                }
                            "
                        >
                            <span>{{ style }}</span>
                            <span class="text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-chevron-down"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </div>
                        <div
                            v-show="showStyleDropdown"
                            class="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                        >
                            <div
                                v-for="style in Styles"
                                :key="style"
                                @click="selectStyle(style)"
                                class="px-3 py-2 hover:bg-gray-600 cursor-pointer flex justify-between"
                            >
                                <span>{{ style }}</span>
                            </div>
                        </div>
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
                            <MinusIcon size="18" :class="{ 'opacity-50': zoom <= 10 }" />
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
                            <PlusIcon size="18" :class="{ 'opacity-50': zoom >= 400 }" />
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
                    @click="goBack"
                    class="mt-8 px-6 py-3 !bg-gray-800 hover:!bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                    <ArrowLeftIcon size="18" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MinusIcon, PlusIcon, ArrowLeftIcon, MapPinIcon } from "lucide-vue-next";
import { Config, getConfig, saveConfig } from "../config";
import router from "../router";
import { applyZoom, getLocationFromIP, Styles } from "../common";
const zoom = ref(100);
const nightLightMode = ref(false);
const latitude = ref("");
const longitude = ref("");
const highColorTemp = ref(6500);
const lowColorTemp = ref(4000);
const gamma = ref(1.0);
const language = ref("English");
const background = ref("");
const showWeather = ref(false);
const style = ref("");
const config = ref(new Config());
const showLanguageDropdown = ref(false);
const showStyleDropdown = ref(false);
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
        router.back();
    }
};
// Language options with name and code
const languages = [
    { name: "English", code: "en" },
    { name: "简体中文", code: "zh-CN" },
];
onMounted(async () => {
    config.value = await getConfig();
    zoom.value = config.value.zoom * 100;
    nightLightMode.value = config.value.nightLightMode;
    latitude.value = config.value.latitude;
    longitude.value = config.value.longitude;
    highColorTemp.value = config.value.highColorTemp || 6500;
    lowColorTemp.value = config.value.lowColorTemp || 4000;
    gamma.value = config.value.gamma || 1.0;
    language.value = config.value.language || "en";
    background.value = config.value.background || "";
    showWeather.value = config.value.showWeather || false;
    style.value = config.value.style || "modern";

    document.addEventListener("click", (e) => {
        showLanguageDropdown.value = false;
        showStyleDropdown.value = false;
    });
});

const selectLanguage = (lang: { name: string; code: string }) => {
    language.value = lang.code;
    showLanguageDropdown.value = false;
    saveSettings();
};
const selectStyle = (name: string) => {
    style.value = name;
    showStyleDropdown.value = false;
    saveSettings();
};
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

const validateAndSaveColorTemp = () => {
    // Validate high color temperature (5000K-10000K)
    if (highColorTemp.value < 5000) highColorTemp.value = 5000;
    if (highColorTemp.value > 10000) highColorTemp.value = 10000;

    // Validate low color temperature (1000K-5000K)
    if (lowColorTemp.value < 1000) lowColorTemp.value = 1000;
    if (lowColorTemp.value > 5000) lowColorTemp.value = 5000;

    // Ensure high is always greater than low
    if (highColorTemp.value <= lowColorTemp.value) {
        highColorTemp.value = lowColorTemp.value + 1000;
    }

    saveSettings();
};
const validateAndSaveGamma = () => {
    if (gamma.value < 0.5) gamma.value = 0.5;
    if (gamma.value > 3.0) gamma.value = 3.0;
    saveSettings();
};
const detectLocation = async () => {
    const location = await getLocationFromIP();
    if (location) {
        latitude.value = location.latitude.toFixed(4).toString();
        longitude.value = location.longitude.toFixed(4).toString();
        saveSettings();
    }
};

const saveSettings = async () => {
    config.value.zoom = zoom.value / 100;
    config.value.nightLightMode = nightLightMode.value;
    config.value.latitude = latitude.value;
    config.value.longitude = longitude.value;
    config.value.highColorTemp = highColorTemp.value;
    config.value.lowColorTemp = lowColorTemp.value;
    config.value.gamma = gamma.value;
    config.value.language = language.value;
    config.value.background = background.value;
    config.value.showWeather = showWeather.value;
    config.value.style = style.value;
    await saveConfig(config.value);
    applyZoom(config.value.zoom);
};

const goBack = () => {
    router.back();
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

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 0 2px 0 #555;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}

select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
}
</style>
