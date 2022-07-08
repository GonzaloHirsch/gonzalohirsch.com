<template>
    <nav
        :class="[
            'sticky top-0 px-section-x-sm sm:px-section-x py-4 h-nav flex flex-row items-center justify-between z-50 w-full transition duration-[.4s]',
            isUp ? '' : 'md:transform md:-translate-y-full',
            'bg-white dark:bg-background_dark bg-opacity-[98%] overflow-x-hidden overflow-y-clip'
        ]"
    >
        <a
            class="text-h4 leading-h4 md:text-h3 md:leading-h3 font-semibold text-brand_primary_light dark:text-brand_primary_dark"
            href="/#"
            target="_self"
            >Gonzalo Hirsch</a
        >
        <ul class="hidden lg:flex flex-row">
            <template v-for="link in links" :key="link.href">
                <li class="large-nav-item">
                    <a :href="link.href" :alt="link.alt" target="_self">
                        {{ link.text }}
                    </a>
                </li>
            </template>
        </ul>
        <Menu
            :class="['w-8 h-8 block lg:hidden cursor-pointer text-typography_primary_light dark:text-typography_primary_dark', isMenuVisible ? 'hidden' : '']"
            @click="toggleMenu"
        />
        <Close
            :class="['w-8 h-8 block lg:hidden cursor-pointer text-typography_primary_light dark:text-typography_primary_dark', isMenuVisible ? '' : 'hidden']"
            @click="toggleMenu"
        />
        <div
            :class="[
                'side-menu h-full fixed bottom-0 right-0 border-l border-typography_primary_light bg-white dark:border-typography_primary_dark dark:bg-background_dark duration-200',
                isMenuVisible ? '' : 'translate-x-full'
            ]"
        ></div>
    </nav>
    <div v-if="isMenuVisible" class="z-[5] absolute bottom-0 top-0 right-0 left-0 w-full h-full bg-gray-400 bg-opacity-25" @click="toggleMenu" />
</template>

<script setup>
// Link rendering
const links = [
    {
        href: '#about',
        text: 'About',
        alt: 'Check out the About section.'
    },
    {
        href: '#experience',
        text: 'Experience',
        alt: 'Check out the Experience section.'
    },
    {
        href: '#projects',
        text: 'Projects',
        alt: 'Check out the Projects section.'
    },
    {
        href: '#passion',
        text: 'Passion',
        alt: 'Check out the Passion section.'
    },
    {
        href: '#contact',
        text: 'Contact',
        alt: 'Check out the Contact section.'
    }
];

// Menu visibility
import Menu from '../icons/menu.vue';
import Close from '../icons/close.vue';
const isMenuVisible = ref(false);
const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
};

// Scroll handling
import { onUnmounted, ref } from 'vue';
const previousScroll = ref(0);
// Start scroll up by default to show the nav
const isUp = ref(true);
const handleScroll = () => {
    // Only run the code if we are on the client
    if (typeof window !== 'undefined') {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > previousScroll.value) {
            isUp.value = false;
        } else {
            isUp.value = true;
        }
        previousScroll.value = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
};
if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
}
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
    }
});
</script>

<style scoped>
.side-menu {
    height: calc(100vh - theme('spacing.nav'));
    width: 250px;
}

.large-nav-item {
    @apply list-none mx-2 text-h5 rounded-md px-2 py-1 duration-200 text-typography_primary_light;
}
.large-nav-item:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.dark .large-nav-item {
    @apply text-typography_primary_dark;
}
.dark .large-nav-item:hover {
    @apply bg-brand_primary_dark text-typography_primary_light;
}
</style>
