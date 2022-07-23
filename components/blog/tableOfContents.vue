<template>
    <nav class="toc">
        <header :class="['flex flex-row justify-between items-center cursor-pointer', isVisible ? 'mb-2' : '']" @click="toggleToc" aria-label="Expand the table of contents.">
            <h3 class="blog-aside-title mb-0">Table of Contents</h3>
            <IconsChevronDown :class="['w-6 h-6 transform duration-100', isVisible ? '' : 'rotate-180']"/>
        </header>
        <ul :class="[isVisible ? 'block' : 'hidden']">
            <!-- render each link with depth class -->
            <li v-for="link of flattenLinks(links)" :key="link.id" :class="`toc-link_${link.depth} first:mt-0 mt-2 md:mt-1`">
                <NuxtLink :to="`#${link.id}`" class="hover:underline hover:text-brand_primary_light dark:hover:text-brand_primary_dark duration-100">
                    {{ link.text }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
defineProps({
    links: {
        type: Array,
        required: true
    }
});

// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
    let _links = links
        .map((link) => {
            let _link = [link];
            if (link.children) {
                // recursively flatten children links
                let flattened = flattenLinks(link.children);
                _link = [link, ...flattened];
            }
            return _link;
        })
        .flat(1);
    return _links;
};

import {ref} from 'vue';
const isVisible = ref(true);
const toggleToc = () => {
    isVisible.value = !isVisible.value;
}
</script>

<style scoped>
.toc-link_3 {
    @apply pl-4;
}
.toc-link_3::before {
    @apply pr-2;
    content: "-"
}
</style>