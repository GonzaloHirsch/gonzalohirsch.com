<template>
    <div class="container group">
        <span v-if="filename" class="filename-text">
            {{ filename }}
        </span>
        <span v-if="languageText" class="language-text">
            {{ languageText }}
        </span>
        <slot />
        <div class="bottom-container opacity-100 group-hover:md:opacity-100 md:opacity-0 transition-opacity duration-150">
            <div class="copy-container">
                <button
                    @click="copy(code)"
                    class="p-1 text-background_light border rounded-md border-background_light hover:border-brand_primary_light dark:hover:border-brand_primary_dark hover:bg-brand_primary_light dark:hover:bg-brand_primary_dark hover:text-background_light dark:hover:text-background_dark"
                >
                    <IconsCheck v-if="copied" class="w-5 h-5" width="20" height="20" />
                    <IconsCopy v-else class="w-5 h-5" width="20" height="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// https://mokkapps.de/blog/how-to-create-a-custom-code-block-with-nuxt-content-v2/
import { useClipboard } from '@vueuse/core';

const { copy, copied, text } = useClipboard();

const props = withDefaults(
    defineProps<{
        code?: string;
        language?: string | null;
        filename?: string | null;
        highlights?: Array<number>;
    }>(),
    { code: '', language: null, filename: null, highlights: [] }
);

const languageMap: Record<string, { text: string }> = {
    java: {
        text: 'Java'
    },
    javascript: {
        text: 'JavaScript'
    },
    python: {
        text: 'Python'
    }
};

const languageText = computed(() => (props.language ? languageMap[props.language]?.text : null));
</script>

<style scoped>
.container {
    @apply w-full my-6 rounded-md bg-background_dark border border-brand_primary_light/50 pt-8 relative overflow-hidden;
}

.dark .container {
    @apply border-brand_primary_dark/50;
}

:slotted(pre) {
    @apply flex overflow-x-auto px-4 pb-4 text-sm;
    line-height: 1.625;
    counter-reset: lines;
}

@screen md {
    :slotted(pre) {
        @apply text-base;
    }
}

.container pre > code .line {
    @apply break-words;
}

.bottom-container {
    @apply absolute right-0 bottom-4 pr-2 pb-2;
}

@screen md {
    .bottom-container {
        @apply top-10;
    }
}

.copy-container {
    @apply flex;
}

.filename-text {
    @apply absolute top-0 left-4 py-1 text-xs text-background_light/75;
}

@screen md {
    .filename-text {
        @apply text-sm;
    }
}

.language-text {
    @apply absolute right-0 top-0 bg-brand_primary_light text-background_light px-2 py-1 rounded-bl-md;
}

.dark .language-text {
    @apply bg-brand_primary_dark text-background_dark;
}

:slotted(pre code) {
    @apply w-full flex flex-col;
}

:slotted(pre code .line) {
    @apply inline-table;
    min-height: 1rem;
}

:slotted(pre code .line::before) {
    @apply w-4 mr-6 inline-block text-left;
    counter-increment: lines;
    content: counter(lines);
    color: rgba(115, 138, 148, 0.4);
}

:slotted(pre code .highlight) {
    @apply block -mx-4 pr-4 pl-3 border-l-4 border-brand_primary_light;
    content: '';
    background-color: #363b46;
}

.dark :slotted(pre code .highlight) {
    @apply border-brand_primary_dark;
}
</style>
