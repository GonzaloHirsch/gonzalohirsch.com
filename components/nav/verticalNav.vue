<template>
    <nav :class="['hidden sm:flex fixed flex-col bottom-0 w-section-x items-center z-10', props.left ? 'left-0' : '', props.right ? 'right-0' : '']">
        <slot />
        <div class="border h-[100px] w-[2px] border-typography_primary_light dark:border-typography_primary_dark mb-4"></div>
    </nav>
</template>

<script setup>
const props = defineProps({
    left: {
        type: Boolean,
        default: false
    },
    right: {
        type: Boolean,
        default: false
    }
});
</script>
