<template>
    <img
        class="background w-full h-full object-cover object-center"
        :class="{ loaded: isBackgroundLoaded }"
        :src="config.background"
        @load="isBackgroundLoaded = true"
        ref="img"
    />
</template>
<style scoped>
.background {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out;
}
.background.loaded {
    opacity: 1;
}
.blur {
    filter: blur(32px) brightness(0.7);
}
</style>
<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
const isBackgroundLoaded = ref(false);
import { GetConfig } from "../config";
import router from "../router";
const config = ref(GetConfig());
const img = useTemplateRef("img");
watch(
    () => router.currentRoute.value.name,
    () => {
        if (router.currentRoute.value.name === "login") {
            img.value?.classList.add("blur");
        } else {
            img.value?.classList.remove("blur");
        }
    }
);
</script>
