<template>
    <div class="flex flex-row">
        <template v-for="icon in icons" :key="icon.href">
            <NuxtLink
                :to="icon.href"
                target="_blank"
                rel="noopener noreferer"
                class="hover:scale-125 mx-2 text-typography_primary_light dark:text-typography_primary_dark hover:text-brand_primary_light dark:hover:text-brand_primary_dark duration-100"
            >
                <component :is="icon.icon" :alt="icon.alt" :aria-label="icon.alt" class="w-6 h-6" width="24" height="24" />
            </NuxtLink>
        </template>
    </div>
</template>

<script setup>
import Github from '../icons/github.vue';
import Instagram from '../icons/instagram.vue';
import Linkedin from '../icons/linkedin.vue';
import Toptal from '../icons/toptal.vue';
import Gmail from '../icons/gmail.vue';

const icons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/gonzalo-hirsch/', alt: 'LinkedIn profile.' },
    { icon: Github, href: 'https://github.com/GonzaloHirsch', alt: 'Github profile.' },
    { icon: Toptal, href: 'https://www.toptal.com/resume/gonzalo-hirsch', alt: 'Toptal profile.' },
    { icon: Gmail, href: 'mailto:hirschgonzalo@gmail.com', alt: 'Email address.' },
    { icon: Instagram, href: 'https://www.instagram.com/gonzalohirsch/?hl=en', alt: 'Instagram profile.' }
];
</script>
