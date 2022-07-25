<template>
    <NavVerticalNav :right="true">
        <NuxtLink class="vertical-email mb-2 ml-[3px] font-medium vertical-content text-typography_primary_light dark:text-typography_primary_dark hover:text-brand_secondary_light dark:hover:text-brand_secondary_dark transition-transform duration-100" to="mailto:hirschgonzalo@gmail.com?subject=Hi Gonza!&body=I found you on gonzalohirsch.com...">hirschgonzalo@gmail.com</NuxtLink>
    </NavVerticalNav>
</template>

<style scoped>
.vertical-email {
    text-orientation: mixed;
    writing-mode: vertical-rl;
}
</style>