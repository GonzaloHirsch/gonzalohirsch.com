<template>
    <a
        :class="[
            extraClass,
            format === 'white'
                ? 'button-white bg-transparent border-brand_primary_light dark:border-brand_primary_dark text-brand_primary_light dark:text-brand_primary_dark hover:bg-brand_primary_light hover:text-typography_primary_dark dark:hover:text-background_dark dark:hover:bg-brand_primary_dark'
                : format === 'primary'
                ? 'button-primary bg-transparent border-typography_primary_dark text-typography_primary_dark dark:border-background_dark dark:text-background_dark hover:text-brand_primary_light hover:bg-typography_primary_dark dark:hover:text-brand_primary_dark dark:hover:bg-background_dark'
                : 'button-secondary dark:border-background_dark dark:text-background_dark hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark dark:hover:bg-background_dark',
            'button'
        ]"
        :aria-label="aria"
        :href="href"
        :target="target"
        >{{ text }}</a
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
        required: true
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
    @apply px-4 py-2 rounded-lg duration-200;
    width: fit-content;
}

.button-white {
    @apply border-2;
}

.button-primary {
    @apply border-2;
}

.button-primary:hover {
    @apply bg-white;
}

.button-secondary {
    @apply border-2 border-white text-white bg-transparent;
}

.button-secondary:hover {
    @apply bg-white;
}
</style>
