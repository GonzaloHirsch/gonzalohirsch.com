<template>
    <section
        :class="[
            'px-section-x-sm py-section-y-sm sm:px-section-x sm:py-section-y relative',
            props.fullHeight ? 'full-height' : '',
            props.forcedHeight ? 'full-height--forced' : ''
        ]"
    >
        <span :id="props.id" class="invisible-id" />
        <slot />
    </section>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    fullHeight: {
        type: Boolean,
        required: false,
        default: false
    },
    forcedHeight: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<style scoped>
.invisible-id {
    @apply absolute left-0 -top-nav w-0 h-0;
}
.full-height.full-height--forced {
    height: calc(100vh - theme('spacing.nav'));
}
@screen md {
    .full-height:not(.full-height--forced) {
        height: calc(100vh - theme('spacing.nav'));
    }
}
</style>
