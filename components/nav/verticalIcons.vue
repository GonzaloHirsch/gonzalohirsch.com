<template>
    <NavVerticalNav :left="true">
        <template v-for="icon in icons" :key="icon.href">
            <NuxtLink :to="icon.href" target="_blank" rel="noopener noreferer" class="vertical-content my-2 text-typography_primary_light dark:text-typography_primary_dark hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark rounded-sm transition-transform duration-100">
                <component :is="icon.icon" :alt="icon.alt" :aria-label="icon.alt" class="w-6 h-6" width="24" height="24"/>
            </NuxtLink>
        </template>
    </NavVerticalNav>
</template>

<script setup>
import Github from '../icons/github.vue';
import Instagram from '../icons/instagram.vue';
import Linkedin from '../icons/linkedin.vue';
import Toptal from '../icons/toptal.vue';

const icons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gonzalo-hirsch/', alt: 'LinkedIn profile.' },
    { icon: Github, href: 'https://github.com/GonzaloHirsch', alt: 'Github profile.' },
    { icon: Toptal, href: 'https://www.toptal.com/resume/gonzalo-hirsch', alt: 'Toptal profile.' },
    { icon: Instagram, href: 'https://www.instagram.com/gonzalohirsch/?hl=en', alt: 'Instagram profile.' }
];
</script>
