<template>
    <div
        :class="[
            'flex w-full',
            isLeft ? 'justify-start flex-row' : 'justify-end flex-row-reverse',
            isLeft ? 'project-featured-left' : 'project-featured-right'
        ]"
    >
        <div class="w-full z-[2]">
            <h3 class="text-typography_primary_light dark:text-typography_primary_dark">{{ project.title }}</h3>
            <div class="relative w-full z-[2]">
                <div
                    class="project-featured-description bg-brand_secondary_light dark:bg-brand_secondary_dark p-4 rounded-md shadow-lg z-[2] lg:w-6/12 relative"
                >
                    <ContentDoc :path="project._path" class="project-featured-content" />
                </div>
                <NuxtLink
                    :to="project.url || project.github"
                    class="hidden lg:block group feature-project-image-link absolute top-0 bottom-0 h-fit w-6/12 rounded-md border-2 border-brand_primary_light dark:border-brand_primary_dark z-[1] overflow-hidden my-auto"
                    target="_blank"
                    rel="noopener noreferer"
                >
                    <img
                        v-if="project.image && project.image.url"
                        :src="getImage(project.image.url)"
                        :alt="project.image.alt"
                        class="w-full h-full object-cover"
                    />
                    <div
                        class="absolute top-0 left-0 right-0 bottom-0 duration-200 group-hover:opacity-100 opacity-0 bg-brand_primary_light/20 dark:bg-brand_primary_dark/20"
                    ></div>
                </NuxtLink>
            </div>
            <ul v-if="project.tags && project.tags.length > 0" class="project-featured-tags">
                <li
                    v-for="tag in project.tags"
                    :key="tag"
                    class="px-2 py-1 mt-2 text-sm leading-sm rounded-md bg-brand_secondary_light/75 dark:bg-brand_secondary_dark/75 text-typography_primary_light dark:text-typography_primary_dark"
                >
                    {{ tag }}
                </li>
            </ul>
            <div class="flex flex-row project-featured-external mt-2">
                <NuxtLink v-if="project.url" class="project-featured-external-link" :to="project.url" target="_blank" rel="noopener noreferer">
                    <IconsExternal class="w-7 h-7" />
                </NuxtLink>
                <NuxtLink v-if="project.github" class="project-featured-external-link" :to="project.github" target="_blank" rel="noopener noreferer">
                    <IconsGithub class="w-6 h-6" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isLeft: {
        type: Boolean,
        default: true
    },
    project: {
        type: Object,
        required: true
    }
});

import SmartNfts from '../../assets/img/projects/smart-nfts.webp';
import Snippit from '../../assets/img/projects/snippit.webp';
import AIML from '../../assets/img/projects/ai-ml.webp';
import RedirectAPI from '../../assets/img/projects/redirect-api.webp';
import Gamedev from '../../assets/img/projects/gamedev.webp';
const assets = {
    'smart-nfts.webp': SmartNfts,
    'snippit.webp': Snippit,
    'ai-ml.webp': AIML,
    'redirect-api.webp': RedirectAPI,
    'gamedev.webp': Gamedev,
};
const getImage = (url) => {
    return assets[url];
};
</script>

<style>
.project-featured-content {
    @apply text-typography_primary_light;
    word-break: break-word;
}
.dark .project-featured-content {
    @apply text-typography_primary_dark;
}
.project-featured-content ul {
    @apply list-disc mt-2;
}
.project-featured-content p + p {
    @apply mt-4;
}
.project-featured-content a {
    @apply duration-200 font-bold;
}
.project-featured-content a:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.dark .project-featured-content a:hover {
    @apply bg-brand_primary_dark text-typography_primary_light;
}
.project-featured-left {
    @apply text-left;
}
.project-featured-right {
    @apply text-right;
}
.project-featured-right .project-featured-description {
    @apply ml-auto;
}
.project-featured-left .project-featured-content ul {
    @apply pl-6;
}
.project-featured-right .project-featured-content ul {
    @apply pr-6;
    direction: rtl;
}
.project-featured-tags {
    @apply flex flex-row flex-wrap list-none;
}
.project-featured-right .project-featured-tags {
    @apply justify-end;
}
.project-featured-left .project-featured-tags {
    @apply justify-start;
}
.project-featured-right .project-featured-tags li {
    @apply ml-2;
}
.project-featured-left .project-featured-tags li {
    @apply mr-2;
}
/* LINK */
.project-featured-left .feature-project-image-link {
    @apply -translate-x-[10%] right-0;
}
.project-featured-right .feature-project-image-link {
    @apply translate-x-[10%] left-0;
}
.project-featured-right .project-featured-external {
    @apply justify-end ml-auto;
}
.project-featured-left .project-featured-external {
    @apply justify-start mr-auto;
}
/* EXTERNAL LINK */
.project-featured-external-link {
    @apply w-fit flex text-typography_primary_light duration-200;
}
.project-featured-right .project-featured-external-link {
    @apply ml-2;
}
.project-featured-left .project-featured-external-link {
    @apply mr-2;
}
.dark .project-featured-external-link {
    @apply text-typography_primary_dark;
}
.project-featured-external-link:hover {
    @apply scale-125 text-brand_primary_light;
}
.dark .project-featured-external-link:hover {
    @apply text-brand_primary_dark ;
}
</style>
