<template>
    <section :class="['px-section-x-sm py-section-y-sm sm:px-section-x sm:py-section-y relative', props.fullHeight ? 'full-height' : '']">
        <span :id="props.id" class="invisible-id"/>
        <slot/>
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
    }
});
</script>

<style scoped>
.invisible-id {
    @apply absolute left-0 -top-nav w-0 h-0;
}
.full-height {
    height: calc(100vh - theme('spacing.nav'))
}
</style>