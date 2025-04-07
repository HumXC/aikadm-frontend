<template>
    <div
        class="bg-blur rounded-2xl w-90 shadow-lg h-130 flex flex-col items-center justify-center bg-gray-900/80 text-gray-100 p-4"
    >
        <div class="p-8">
            <!-- Avatar -->
            <div class="flex justify-center mb-6">
                <div
                    class="w-38 h-38 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center"
                >
                    <img
                        v-if="selectedAvatar"
                        :src="selectedAvatar"
                        alt="User Avatar"
                        class="w-full h-full object-cover"
                    />
                    <UserIcon v-else class="w-12 h-12 text-gray-500" />
                </div>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <!-- Username Selection -->
                <div class="relative">
                    <input
                        v-model="selectedUsername"
                        type="text"
                        @click="
                            (e) => {
                                e.stopPropagation();
                                showSessionDropdown = false;
                                showUsernameDropdown = true;
                            }
                        "
                        @focus="(e)=>{
                            const ipt = e.target as HTMLInputElement;
                            showUsernameDropdown = true;
                            ipt.classList.add('focus');
                        }"
                        @blur="(e)=>{ 
                            const ipt = e.target as HTMLInputElement;
                            ipt.classList.remove('focus'); 
                        }"
                        @change="(e)=>{
                            const ipt = e.target as HTMLInputElement;
                            const user = users.find(u => u.username === ipt.value);
                            if ( user){
                                loginUsername =user.username
                            } else{
                                loginUsername = ipt.value
                            }
                        }"
                        @keydown="showUsernameDropdown = false"
                        placeholder="Select username"
                        class="hand-cursor inline-block text-left w-full px-3 py-2 bg-gray-700/80 rounded cursor-default"
                    />
                    <div
                        v-if="showUsernameDropdown"
                        class="bg-blur bg-gray-700/90 absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        <div
                            v-for="user in users"
                            @click="
                                () => {
                                    selectedUsername = user.name === '' ? user.username : user.name;
                                    loginUsername = user.username;
                                    showUsernameDropdown = false;
                                }
                            "
                            class="hand-cursor px-3 py-2 hover:bg-gray-800/40 cursor-pointer flex justify-between"
                        >
                            <span>{{ user.name === "" ? user.username : user.name }}</span>
                            <span class="text-gray-400">{{ user.username }}</span>
                        </div>
                    </div>
                </div>
                <!-- Session Selection -->
                <div class="relative">
                    <span
                        type="text"
                        :class="{ focus: showSessionDropdown }"
                        @click="toggleSessionDropdown"
                        @focus="showSessionDropdown = true"
                        v-if="selectedSession < 0"
                        class="hand-cursor inline-block text-left text-gray-400 w-full px-3 py-2 bg-gray-700/80 rounded cursor-default"
                    >
                        {{ "Select session" }}
                    </span>
                    <span
                        v-else
                        type="text"
                        :class="{ focus: showSessionDropdown }"
                        @click="toggleSessionDropdown"
                        @focus="showSessionDropdown = true"
                        class="hand-cursor inline-block text-left w-full px-3 py-2 bg-gray-700/80 rounded cursor-default"
                    >
                        {{ sessions[selectedSession].name }}
                    </span>
                    <div
                        v-if="showSessionDropdown"
                        class="bg-blur bg-gray-700/90 absolute z-10 w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto"
                    >
                        <div
                            v-for="session in sessions"
                            @click="selectedSession = session.id"
                            class="hand-cursor px-3 py-2 hover:bg-gray-800/40 cursor-pointer flex justify-between"
                        >
                            <span
                                class="text-nowrap overflow-hidden overflow-ellipsis whitespace-nowrap"
                                >{{ session.name }}</span
                            >
                            <span class="text-gray-400">{{ session.type }}</span>
                        </div>
                    </div>
                </div>
                <!-- Password Input -->
                <div>
                    <label for="password" class="block text-sm font-medium mb-1 mt-4"
                        >Password</label
                    >
                    <div class="relative">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="password"
                            :class="{ focus: showPassword }"
                            @focus="(e)=>{
                                const ipt = e.target as HTMLInputElement;
                                ipt.classList.add('focus');
                            }"
                            @blur="(e)=>{
                                const ipt = e.target as HTMLInputElement;
                                ipt.classList.remove('focus');
                            }"
                            v-model="password"
                            class="w-full px-3 py-2 bg-gray-700/80 rounded-md border border-gray-600 pr-10"
                            required
                            ref="passwordInput"
                        />
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 pr-3 pl-3 flex items-center !bg-transparent"
                        >
                            <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                            <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <!-- Login Button -->
                <button
                    type="submit"
                    class="w-full py-2 px-4 !bg-teal-600 hover:!bg-teal-700 rounded-md transition-colors duration-200 font-medium focus:!ring-offset-gray-800"
                    :disabled="isLoading"
                >
                    <span v-if="isLoading" class="flex items-center justify-center">
                        <svg
                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Logging in...
                    </span>
                    <span v-else>Login</span>
                </button>
            </form>
        </div>
    </div>
    <!-- Message Display -->
    <div
        v-if="message.text"
        class="message-container fixed bottom-10 w-90 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-md text-sm transition-all duration-300"
        :class="{
            'bg-red-900/50 text-red-200 border border-red-700': message.type === 'error',
            'bg-yellow-900/50 text-yellow-200 border border-yellow-700': message.type === 'warning',
            'bg-blue-900/50 text-blue-200 border border-blue-700': message.type === 'info',
        }"
    >
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <AlertCircleIcon v-if="message.type === 'error'" class="h-6 w-6 text-red-400" />
                <AlertTriangleIcon
                    v-else-if="message.type === 'warning'"
                    class="h-6 w-6 text-yellow-400"
                />
                <InfoIcon v-else class="h-6 w-6 text-blue-400" />
            </div>
            <div class="ml-2">{{ message.text }}</div>
        </div>
    </div>
</template>
<style scoped>
.focus {
    outline: none;
    box-shadow: 0 0 0 2px #049185 inset;
    transition: box-shadow 0.05s ease-in-out;
}
.bg-blur {
    backdrop-filter: blur(18px);
}
</style>
<script setup lang="ts">
import { ref, onMounted, watch, useTemplateRef, onUnmounted } from "vue";
import {
    UserIcon,
    EyeIcon,
    EyeOffIcon,
    AlertCircleIcon,
    AlertTriangleIcon,
    InfoIcon,
} from "lucide-vue-next";
import { Config, GetConfig } from "../config";
import { GetUsers, GetSessions, GetUserAvatar, Login } from "@aikadm/aikadm";
import { Window } from "@wailsio/runtime";
const users = ref<{ id: number; username: string; name: string }[]>([]);
const sessions = ref<{ id: number; name: string; type: string }[]>([]);
const selectedUsername = ref("");
const selectedSession = ref(-1);
const password = ref("");
const selectedAvatar = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const showUsernameDropdown = ref(false);
const showSessionDropdown = ref(false);
const message = ref({ type: "info", text: "" });
const passwordInputRef = useTemplateRef("passwordInput");
const config = ref(new Config());
GetConfig().then((c) => (config.value = c));
// 登陆时要使用的用户名
const loginUsername = ref("");
const closeAllDropdowns = () => {
    showUsernameDropdown.value = false;
    showSessionDropdown.value = false;
};
const toggleSessionDropdown = (e: MouseEvent) => {
    e.stopPropagation();
    showUsernameDropdown.value = false;
    showSessionDropdown.value = !showSessionDropdown.value;
};
const fetchUsers = async () => {
    try {
        let _users = await GetUsers();
        _users.forEach((user, i) => {
            users.value.push({ id: i, username: user.Username, name: user.Name });
        });
    } catch (error) {
        message.value = { type: "error", text: "Failed to load users" };
        console.error("Error fetching users:", error);
    }
};

const fetchSessions = async () => {
    try {
        let _sessions = await GetSessions();
        _sessions.forEach((session, i) => {
            sessions.value.push({ id: i, name: session.Name, type: session.SessionType });
        });
    } catch (error) {
        message.value = { type: "error", text: "Failed to load sessions" };
        console.error("Error fetching sessions:", error);
    }
};

const fetchAvatar = async () => {
    const username = loginUsername.value;
    if (username === "") return;
    try {
        let _avatar = await GetUserAvatar(username);
        selectedAvatar.value = `data:image/png;base64,${_avatar}`;
    } catch (error) {
        // TODO: 增加无网络连接时的处理
        selectedAvatar.value = `https://ui-avatars.com/api/?name=${selectedUsername.value}&background=random&color=fff&size=128`;
    }
};

const handleLogin = async () => {
    // Clear any existing messages
    message.value = { type: "info", text: "" };

    // Validate form fields
    if (selectedUsername.value === "") {
        message.value = { type: "error", text: "Please select a username" };
        return;
    }

    if (selectedSession.value < 0) {
        message.value = { type: "error", text: "Please select a session" };
        return;
    }

    if (password.value === "") {
        message.value = { type: "error", text: "Please enter your password" };
        return;
    }

    isLoading.value = true;

    try {
        // Show info message during login
        message.value = { type: "info", text: "Authenticating..." };
        let username = loginUsername.value;
        let password_ = password.value.toString();
        let session = selectedSession.value;
        await Login(username, password_, session);

        console.log("Login successful", {
            username: selectedUsername.value,
            session: selectedSession.value,
        });

        message.value = { type: "info", text: "Login successful! Redirecting..." };
        Window.Close();
    } catch (error) {
        passwordInputRef.value?.focus();
        passwordInputRef.value?.select();
        message.value = { type: "error", text: error || "Login failed. Please try again." };
    } finally {
        isLoading.value = false;
    }
};
// Add animation effect when an error message appears
watch(
    () => message.value,
    (newMessage) => {
        if (newMessage.type === "error" && newMessage.text) {
            // Add a subtle shake animation to the message element
            const messageElement = document.querySelector(".message-container");
            if (messageElement) {
                messageElement.classList.add(
                    "animate-[shake_0.5s_cubic-bezier(0.36,0.07,0.19,0.97)_both]"
                );
                setTimeout(() => {
                    messageElement.classList.remove(
                        "animate-[shake_0.5s_cubic-bezier(0.36,0.07,0.19,0.97)_both]"
                    );
                }, 500);
            }
        }
    },
    { deep: true }
);
watch(
    () => selectedSession.value,
    (newSession) => {
        config.value.defaultSession = sessions.value[newSession].name;
    },
    { deep: true }
);
watch(
    () => selectedUsername.value,
    (name) => {
        if (name === "") return;
        const user = users.value.find((u) => u.name === name);
        if (user) {
            config.value.defaultUsername = user.username;
        } else {
            config.value.defaultUsername = name;
        }
        fetchAvatar();
    }
);

onMounted(async () => {
    await fetchUsers();
    await fetchSessions();
    if (passwordInputRef.value) {
        passwordInputRef.value.focus();
    }
    loginUsername.value = config.value.defaultUsername;
    selectedUsername.value = config.value.defaultUsername;
    users.value.forEach((user) => {
        if (user.username === config.value.defaultUsername) {
            selectedUsername.value = user.name;
            loginUsername.value = user.username;
        }
    });
    sessions.value.forEach((session, i) => {
        if (session.name === config.value.defaultSession) {
            selectedSession.value = i;
        }
    });
    document.addEventListener("click", closeAllDropdowns);
});
onUnmounted(() => {
    document.removeEventListener("click", closeAllDropdowns);
});
</script>
