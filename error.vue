<template>
    <div class="relative dark:bg-background_dark">
        <Nav />
        <NavVerticalIcons />
        <NavVerticalEmail />
        <SectionsError/>
        <NavFooter />
    </div>
</template>

<script setup>
useHead({
    meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
});
</script>
