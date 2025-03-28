<template>
    <div class="fixed top-4 right-4 flex gap-3 z-50">
        <button
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-200 hover:text-gray-100 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
            @click="handleShutdown"
            title="Shutdown"
            aria-label="Shutdown system"
        >
            <PowerIcon :size="config.zoom * 28" />
        </button>
        <button
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-200 hover:text-gray-100 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
            @click="handleRestart"
            title="Restart"
            aria-label="Restart system"
        >
            <RefreshCwIcon :size="config.zoom * 28" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { PowerIcon, RefreshCwIcon } from "lucide-vue-next";
import { Aikadm } from "@aikadm/aikadm";
import { GetConfig } from "../config";
import { ref } from "vue";
const config = ref(GetConfig());
const handleShutdown = async () => {
    try {
        await Aikadm.Shutdown();
    } catch (error) {
        console.error("Failed to shutdown:", error);
    }
};

const handleRestart = async () => {
    try {
        await Aikadm.Reboot();
    } catch (error) {
        console.error("Failed to restart:", error);
    }
};
</script>
