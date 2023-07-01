<template>
    <div class="flex flex-row items-center justify-center">
        <IconsNight v-show="currentTheme === 'light'" class="theme-icon text-typography_primary_light dark:text-typography_primary_dark" width="28" height="28" @click="toggleTheme"/>
        <IconsLight v-show="currentTheme === 'dark'" class="theme-icon text-typography_primary_light dark:text-typography_primary_dark" width="28" height="28" @click="toggleTheme"/>
    </div>
</template>

<script setup>
// Components
import { ref, onMounted } from 'vue';

const colorMode = useColorMode();
const currentTheme = ref('light');

const updatePageTheme = (theme) => {
    currentTheme.value = theme;
    colorMode.preference = theme
};

const updateStoredTheme = (theme) => {
    localStorage.theme = theme;
};

const toggleTheme = () => {
    const targetTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
    updatePageTheme(targetTheme);
    updateStoredTheme(targetTheme);
};

onMounted(() => {
    // Client side code
    if (typeof window !== 'undefined') {
        const cachedTheme = localStorage.theme ? localStorage.theme : false;
        //  `true` if the user has set theme to `dark` on browser/OS
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const targetTheme = !cachedTheme ? (userPrefersDark ? 'dark' : 'light') : cachedTheme;
        updatePageTheme(targetTheme);
        updateStoredTheme(targetTheme);
    }
});
</script>

<style scoped>
.theme-icon {
    @apply w-7 h-7 cursor-pointer transition-transform duration-100;
}
.theme-icon:hover {
    @apply scale-125;
}
</style>
