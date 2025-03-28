<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import router from "../router";
import { GetConfig } from "../config";
import { ref } from "vue";
const config = ref(GetConfig());

function handleClick(event: MouseEvent) {
    event.stopPropagation();
    router.push("/settings");
}
</script>

<template>
    <div class="fixed bottom-4 right-4">
        <button
            @click="handleClick"
            class="flex items-center justify-center w-10 h-10 rounded-full !bg-transparent text-gray-200 hover:text-gray-100 focus:text-gray-100 focus:outline-none transition-all duration-200 hover:scale-105 active:scale-95"
        >
            <SettingsIcon :size="config.zoom * 28" />
        </button>
    </div>
</template>
