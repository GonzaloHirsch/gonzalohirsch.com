<template>
    <component :is="href ? 'a' : 'div'"
        :class="[
            extraClass,
            format === 'white'
                ? 'button-white bg-transparent border-brand_primary_light dark:border-brand_primary_dark text-brand_primary_light dark:text-brand_primary_dark hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:text-background_dark dark:hover:bg-brand_primary_dark'
                : '',
            format === 'primary'
                ? 'button-primary bg-transparent border-typography_primary_dark text-typography_primary_dark dark:border-background_dark dark:text-background_dark hover:text-brand_primary_light hover:bg-typography_primary_dark dark:hover:text-brand_primary_dark dark:hover:bg-background_dark'
                : '',
            format === 'secondary'
                ? 'button-secondary dark:border-background_dark dark:text-background_dark hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark dark:hover:bg-background_dark'
                : '',
            format === 'disabled'
                ? 'button-disabled'
                : '',
            'button'
        ]"
        :aria-label="aria"
        :href="href"
        :target="target"
        :aria-disabled="format === 'disabled'"
        >{{ text }}</component
    >
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
    @apply px-4 py-2 rounded-lg duration-100;
    width: fit-content;
}

.button-white {
    @apply border-2;
}

.button-primary {
    @apply border-2;
}

.button-primary:hover {
    @apply bg-background_light;
}

.button-secondary {
    @apply border-2 border-background_light text-background_light bg-transparent;
}

.button-secondary:hover {
    @apply bg-background_light;
}

.button-disabled {
    @apply border-2 border-background_dark text-background_dark bg-transparent opacity-50
}

.dark .button-disabled {
    @apply border-2 border-background_light text-background_light bg-transparent opacity-50
}
</style>
