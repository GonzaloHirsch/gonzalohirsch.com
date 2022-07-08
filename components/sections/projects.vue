<template>
    <Section id="projects">
        <h2 class="section-title projects-title text-left mb-16 relative">Featured Projects</h2>
        <ProjectsFeaturedList/>
        <h3 class="section-title text-center mb-12 relative">More Projects</h3>
    </Section>
</template>

<style scoped>
.projects-title::before {
    @apply bg-typography_primary_light block mx-auto absolute left-0;
    content: '';
    width: 15%;
    height: 2px;
    top: -50px;
}
.dark .projects-title::before {
    @apply bg-typography_primary_dark;
}
</style>
