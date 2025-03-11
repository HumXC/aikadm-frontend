<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

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
