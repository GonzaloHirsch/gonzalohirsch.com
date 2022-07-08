<template>
    <div class="flex flex-row items-center justify-center">
        <Night v-if="currentTheme === 'light'" class="theme-icon text-typography_primary_light dark:text-typography_primary_dark" @click="toggleTheme"/>
        <Light v-else class="theme-icon text-typography_primary_light dark:text-typography_primary_dark" @click="toggleTheme"/>
    </div>
</template>

<script setup>
// Icons
import Night from '../icons/night.vue';
import Light from '../icons/light.vue';
// Components
import { ref, onMounted } from 'vue';

const currentTheme = ref('light');

const updatePageTheme = (theme) => {
    if (theme === 'dark') {
        document.querySelector('html').classList.add('dark');
    } else {
        document.querySelector('html').classList.remove('dark');
    }
    currentTheme.value = theme;
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
    @apply w-7 h-7 cursor-pointer duration-200;
}
.theme-icon:hover {
    @apply scale-125;
}
</style>
