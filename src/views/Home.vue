<template>
    <div
        tabindex="0"
        class="min-h-screen flex flex-col items-center justify-center text-gray-100 p-4"
        @click="isLogin = true"
        @keydown="handleKeydown"
    >
        <img
            class="background z-0 fixed w-full h-full object-cover object-center"
            :class="{ loaded: isBackgroundLoaded }"
            :src="config.background"
            @load="isBackgroundLoaded = true"
        />
        <div class="z-1">
            <transition name="fade" mode="out-in">
                <DateTime v-if="!isLogin" />
                <Login v-else />
            </transition>
            <transition name="fade" mode="out-in">
                <PowerButtons v-if="isLogin" />
            </transition>
            <transition name="fade" mode="out-in">
                <SettingsButton v-if="!isLogin" />
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import DateTime from "../components/DateTime.vue";
import Login from "../components/Login.vue";
import SettingsButton from "../components/SettingsButton.vue";
import { onMounted, ref } from "vue";
import PowerButtons from "../components/PowerButtons.vue";
import { Config, getConfig } from "../config";
const config = ref(new Config());
const isLogin = ref(false);
const isBackgroundLoaded = ref(false);
const handleKeydown = (event) => {
    if (event.key === " " || event.key === "Enter") {
        isLogin.value = true;
    }
    if (event.key === "Escape") {
        isLogin.value = false;
    }
};
onMounted(async () => {
    config.value = await getConfig();
});
</script>
<style lang="css">
#home {
    background-color: transparent;
}
.background {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.background.loaded {
    opacity: 1;
}
@keyframes fadeInBackground {
    0% {
        opacity: 0;
        transform: scale(1.05); /* 轻微缩放，增加视觉效果 */
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
