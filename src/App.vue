<template>
    <div class="bg-gray-900/98 text-gray-100 overflow-hidden">
        <Background />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script setup lang="ts">
import { Aikadm } from "@aikadm/aikadm";
import { applyZoom } from "./common";
import { getConfig } from "./config";
declare global {
    interface Window {
        wlsunset_pid: number;
    }
}

getConfig().then((config) => {
    applyZoom(config.zoom);
    if (config.nightLightMode) {
        Aikadm.Exec([
            "wlsunset",
            "-l",
            config.latitude,
            "-L",
            config.longitude,
            "-t",
            config.lowColorTemp.toString(),
            "-T",
            config.highColorTemp.toString(),
        ])
            .catch((err) => {
                console.error(err);
            })
            .then((pid) => {
                window.wlsunset_pid = pid as number;
            });
    }
});
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
