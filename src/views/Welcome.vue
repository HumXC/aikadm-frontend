<template>
    <div
        class="bg-transparent min-h-screen flex flex-col items-center justify-center text-gray-100 p-4"
        @click="router.push('login')"
        @keydown="handleKeydown"
        tabindex="0"
        ref="box"
    >
        <DateTime />
        <SettingsButton />
    </div>
</template>
<script setup lang="ts">
import DateTime from "../components/DateTime.vue";
import SettingsButton from "../components/SettingsButton.vue";
import { onMounted, useTemplateRef } from "vue";
import router from "../router";
const box = useTemplateRef("box");
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
        router.push("login");
    }
};
onMounted(() => {
    box.value?.focus();
});
</script>
