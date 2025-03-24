<template>
    <img
        class="background z-0 fixed w-full h-full object-cover object-center"
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
    transition: opacity 0.3s ease-in-out;
    transition: filter 0.3s ease-in-out;
}
.background.loaded {
    opacity: 1;
}
.blur {
    filter: blur(32px) brightness(0.7);
}
</style>
<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
const isBackgroundLoaded = ref(false);
import { Config, getConfig } from "../config";
import router from "../router";
const config = ref(new Config());
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
onMounted(async () => {
    config.value = await getConfig();
});
</script>
