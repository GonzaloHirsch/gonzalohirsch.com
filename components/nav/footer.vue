<template>
    <footer class="relative grid grid-cols-9 px-section-x-sm sm:px-section-x py-4">
        <div class="page-footer-divider bg-typography_primary_light dark:bg-typography_primary_dark" />
        <p class="col-span-full md:col-span-3 text-center md:text-left text-typography_primary_light dark:text-typography_primary_dark order-1 md:order-1">
            Made with <Heart class="w-6 h-6 inline-block duration-200 hover:animate-pulse hover:text-red-500" /> by Gonzalo Hirsch.
        </p>
        <ButtonsThemeSwitch class="col-span-full md:col-span-3 mt-2 md:mt-0 order-3 md:order-2" />
        <NavHorizontalIcons class="col-span-full md:col-span-3 justify-center md:justify-end order-2 md:order-3 my-4 md:my-0"/>
    </footer>
</template>

<script setup>
import Heart from '../icons/heart.vue';
</script>

<style scoped>
.page-footer-divider {
    @apply mx-auto absolute top-0 left-0 right-0;
    width: calc(100vw - 2 * theme('padding.section-x-sm'));
    height: 1px;
}
@screen sm {
    .page-footer-divider {
        width: calc(100vw - 2 * theme('padding.section-x'));
    }
}
</style>
