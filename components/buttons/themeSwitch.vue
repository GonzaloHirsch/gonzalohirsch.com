<template>
    <div class="flex flex-row items-center justify-center">
        <IconsNight
            v-show="colorMode.preference === 'light'"
            class="theme-icon text-typography_primary_light dark:text-typography_primary_dark"
            width="28"
            height="28"
            @click="toggleTheme"
        />
        <IconsLight
            v-show="colorMode.preference === 'dark'"
            class="theme-icon text-typography_primary_light dark:text-typography_primary_dark"
            width="28"
            height="28"
            @click="toggleTheme"
        />
    </div>
</template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-icon {
    @apply w-7 h-7 cursor-pointer transition-transform duration-100;
}
.theme-icon:hover {
    @apply scale-125;
}
</style>
