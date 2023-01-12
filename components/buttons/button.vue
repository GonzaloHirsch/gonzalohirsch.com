<template>
    <div class="contents">
        <NuxtLink
            v-if="href"
            :is="href ? 'a' : 'div'"
            :class="[
                extraClass,
                format === 'white'
                    ? 'bg-transparent border-typography_primary_dark dark:border-typography_primary_light text-typography_primary_dark dark:text-typography_primary_light hover:bg-typography_primary_dark dark:hover:bg-typography_primary_light hover:text-brand_primary_light dark:hover:text-brand_primary_dark'
                    : '',
                format === 'primary'
                    ? 'bg-transparent border-brand_primary_light dark:border-brand_primary_dark text-brand_primary_light dark:text-brand_primary_dark hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:text-background_dark dark:hover:bg-brand_primary_dark'
                    : '',
                format === 'secondary'
                    ? 'bg-brand_secondary_light dark:bg-brand_secondary_dark text-typography_primary_dark dark:text-typography_primary_light border-brand_secondary_light dark:border-brand_secondary_dark hover:bg-transparent dark:hover:bg-transparent hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark'
                    : '',
                format === 'disabled' ? 'button-disabled' : '',
                'button'
            ]"
            :aria-label="aria"
            :to="href"
            :target="target"
            :aria-disabled="format === 'disabled'"
            >{{ text }}</NuxtLink
        >
        <div
            v-else
            :class="[
                extraClass,
                format === 'white'
                    ? 'bg-transparent border-typography_primary_dark dark:border-typography_primary_light text-typography_primary_dark dark:text-typography_primary_light hover:bg-typography_primary_dark dark:hover:typography_primary_light hover:text-brand_primary_light dark:hover:text-brand_primary_dark'
                    : '',
                format === 'primary'
                    ? 'bg-transparent border-brand_primary_light dark:border-brand_primary_dark text-brand_primary_light dark:text-brand_primary_dark hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:text-background_dark dark:hover:bg-brand_primary_dark'
                    : '',
                format === 'secondary'
                    ? 'bg-brand_secondary_light dark:bg_brand_secondary:dark text-typography_primary_dark dark:text-typography_primary_light border-brand_secondary_light dark:border-brand_secondary_dark hover:bg-transparent hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark'
                    : '',
                format === 'disabled' ? 'button-disabled' : '',
                'button'
            ]"
            :aria-label="aria"
            :aria-disabled="format === 'disabled'"
        >
            {{ text }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    aria: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: false,
        default: '_self'
    },
    href: {
        type: String,
        required: false
    },
    extraClass: {
        type: String,
        required: false
    },
    format: {
        type: String,
        required: false,
        default: 'primary'
    }
});
</script>

<style scoped>
.button {
    @apply px-4 py-2 rounded-lg border-2;
    width: fit-content;
}

.button-disabled {
    @apply border-2 border-background_dark text-background_dark bg-transparent opacity-50;
}

.dark .button-disabled {
    @apply border-2 border-background_light text-background_light bg-transparent opacity-50;
}
</style>
