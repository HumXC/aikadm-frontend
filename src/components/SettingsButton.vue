<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import router from "../router";
function handleClick(event: MouseEvent) {
    event.stopPropagation();
    router.push("/settings");
}
</script>

<template>
    <div class="fixed bottom-4 right-4">
        <button
            @click="handleClick"
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-400 hover:bg-gray-800/50 hover:text-gray-100 focus:bg-gray-800/50 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
        >
            <SettingsIcon size="24" />
        </button>
    </div>
</template>
