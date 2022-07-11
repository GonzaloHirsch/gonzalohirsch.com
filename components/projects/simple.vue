<template>
    <div class="project-simple-wrapper flex w-full flex-col bg-brand_secondary_light dark:bg-brand_secondary_dark rounded-md p-4">
        <h4 class="text-typography_primary_light dark:text-typography_primary_dark font-semibold">{{ project.title }}</h4>
        <ContentDoc :path="project._path" class="project-simple-content" />
        <ul v-if="project.tags && project.tags.length > 0" class="flex flex-row flex-wrap list-none mt-2">
            <li
                v-for="tag in project.tags"
                :key="tag"
                class="mr-4 mt-2 text-sm leading-sm rounded-md text-typography_primary_light/90 dark:text-typography_primary_dark/90"
            >
                {{ tag }}
            </li>
        </ul>
        <div class="flex flex-row project-simple-external mt-4">
            <NuxtLink
                v-if="project.url"
                class="project-simple-external-link"
                :to="project.url"
                :alt="`See ${project.title} on an external URL.`"
                :aria-label="`See ${project.title} on an external URL.`"
                target="_blank"
                rel="noopener noreferer"
            >
                <IconsExternal
                    class="w-7 h-7"
                    :alt="`See ${project.title} on an external URL.`"
                    :aria-label="`See ${project.title} on an external URL.`"
                />
            </NuxtLink>
            <NuxtLink
                v-if="project.github"
                class="project-simple-external-link"
                :to="project.github"
                :alt="`See ${project.title} on Github.`"
                :aria-label="`See ${project.title} on Github.`"
                target="_blank"
                rel="noopener noreferer"
            >
                <IconsGithub class="w-6 h-6" :alt="`See ${project.title} on Github.`" :aria-label="`See ${project.title} on Github.`" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
});
</script>

<style>
.project-simple-wrapper {
    height: 250px;
}
.project-simple-content {
    @apply text-typography_primary_light mb-auto;
    word-break: break-word;
}
@screen md {
    .project-simple-wrapper {
        height: 250px;
    }
}
@screen lg {
    .project-simple-wrapper {
        height: 290px;
    }
}
.dark .project-simple-content {
    @apply text-typography_primary_dark;
}
.project-simple-content ul {
    @apply list-disc mt-2 pl-6;
}
.project-simple-content p + p {
    @apply mt-4;
}
.project-simple-content a {
    @apply duration-200 font-bold;
}
.project-simple-content a:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.dark .project-simple-content a:hover {
    @apply bg-brand_primary_dark text-typography_primary_light;
}
/* EXTERNAL LINK */
.project-simple-external-link {
    @apply w-fit flex text-typography_primary_light duration-200 mr-2;
}
.dark .project-simple-external-link {
    @apply text-typography_primary_dark;
}
.project-simple-external-link:hover {
    @apply scale-125;
}
</style>
