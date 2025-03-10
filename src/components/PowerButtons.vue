<template>
    <div class="fixed top-4 right-4 flex gap-3 z-50">
        <button
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-400 hover:bg-gray-800/50 hover:text-gray-100 focus:bg-gray-800/50 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
            @click="handleShutdown"
            title="Shutdown"
            aria-label="Shutdown system"
        >
            <PowerIcon class="w-5 h-5" />
        </button>
        <button
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-400 hover:bg-gray-800/50 hover:text-gray-100 focus:bg-gray-800/50 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
            @click="handleRestart"
            title="Restart"
            aria-label="Restart system"
        >
            <RefreshCwIcon class="w-5 h-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PowerIcon, RefreshCwIcon } from "lucide-vue-next";
import { Shutdown, Reboot } from "../wailsjs/go/main/App";

const handleShutdown = async () => {
    try {
        await Shutdown();
    } catch (error) {
        console.error("Failed to shutdown:", error);
    }
};

const handleRestart = async () => {
    try {
        await Reboot();
    } catch (error) {
        console.error("Failed to restart:", error);
    }
};
</script>
