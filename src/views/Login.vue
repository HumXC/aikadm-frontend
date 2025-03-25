<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center text-gray-100 p-4"
        @keydown="handleKeydown"
        ref="box"
        tabindex="0"
    >
        <Login />
        <PowerButtons />
    </div>
</template>
<script setup lang="ts">
import Login from "../components/Login.vue";
import { onMounted, useTemplateRef } from "vue";
import PowerButtons from "../components/PowerButtons.vue";
import router from "../router";
const box = useTemplateRef("box");
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
        router.back();
    }
};
onMounted(async () => {
    box.value?.focus();
});
</script>
