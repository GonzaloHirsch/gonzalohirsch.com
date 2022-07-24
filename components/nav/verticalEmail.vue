<template>
    <NavVerticalNav :right="true">
        <a class="vertical-email mb-2 ml-[3px] font-medium vertical-content text-typography_primary_light dark:text-typography_primary_dark hover:text-brand_primary_light dark:hover:text-brand_primary_dark duration-100" href="mailto:hirschgonzalo@gmail.com?subject=Hi Gonza!&body=I found you on gonzalohirsch.com...">hirschgonzalo@gmail.com</a>
    </NavVerticalNav>
</template>

<style scoped>
.vertical-email {
    text-orientation: mixed;
    writing-mode: vertical-rl;
}
</style>