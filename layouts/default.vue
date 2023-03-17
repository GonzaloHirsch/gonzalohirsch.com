<template>
    <div class="relative dark:bg-background_dark">
        <NavSkipToContent/>
        <Nav />
        <NavVerticalIcons />
        <NavVerticalEmail />
        <slot />
        <NavFooter />
    </div>
</template>

<script setup lang="ts">
// Add base styles to fool Google when it doesn't load my styles
useHead({
  style: [ { innerHTML: 'code {display: grid; overflow: hidden;} p, a, span, li, code, figcaption {font-size: 24px;} .custom-icon {margin: 0.5rem;} a {margin: 0.5rem;}' } ]
})
</script>