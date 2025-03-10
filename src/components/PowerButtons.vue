<template>
    <div class="power-buttons-container">
        <button
            class="power-button"
            @click="handleShutdown"
            title="Shutdown"
            aria-label="Shutdown system"
        >
            <PowerIcon class="icon" />
        </button>
        <button
            class="power-button"
            @click="handleReboot"
            title="Reboot"
            aria-label="Reboot system"
        >
            <RefreshCwIcon class="icon" />
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

const handleReboot = async () => {
    try {
        await Reboot();
    } catch (error) {
        console.error("Failed to reboot:", error);
    }
};
</script>

<style scoped>
.power-buttons-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.75rem;
    z-index: 10;
}

.power-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background-color: transparent;
    color: rgba(156, 163, 175, 0.8);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.power-button:hover,
.power-button:focus {
    background-color: rgba(55, 65, 81, 0.5);
    color: rgba(243, 244, 246, 1);
    transform: scale(1.05);
    outline: none;
}

.power-button:active {
    transform: scale(0.95);
}

.icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
