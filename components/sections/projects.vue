<template>
    <Section id="projects" class="mt-6 md:mt-16">
        <h2 class="section-title projects-title text-left mb-16 md:mb-24 relative">Featured Projects</h2>
        <ProjectsFeaturedList/>
        <h3 class="section-title text-center mb-12 relative mt-20 md:mt-20 lg:mt-40">More Projects</h3>
        <ProjectsSimpleList/>
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
