<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <transition name="fade" mode="out-in">
            <WelcomeScreen v-if="showWelcome" @enter-login="showWelcome = false" />
            <LoginScreen v-else @enter-welcome="showWelcome = true" />
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import LoginScreen from "./components/LoginScreen.vue";

const showWelcome = ref(true);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
