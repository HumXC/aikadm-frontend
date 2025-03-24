<template>
    <div>
        <img
            class="background z-0 fixed w-full h-full object-cover object-center"
            :class="{ loaded: isBackgroundLoaded }"
            :src="config.background"
            @load="isBackgroundLoaded = true"
        />
    </div>
</template>
<style lang="css">
.background {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.background.loaded {
    opacity: 1;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const isBackgroundLoaded = ref(false);
import { Config, getConfig } from "../config";
const config = ref(new Config());
onMounted(async () => {
    config.value = await getConfig();
});
</script>
