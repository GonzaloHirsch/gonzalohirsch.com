<template>
    <Section id="blog" class="bg-brand_primary_light dark:bg-brand_primary_dark flex flex-col items-center">
        <div class="flex flex-col md:w-9/12 text-center text-background_light dark:text-background_dark">
            <h2 class="font-bold">Check out the blog!</h2>
            <p class="text-lg leading-lg">
                A personal blog where I write about programming and insights I gain on software engineering and different technologies from the
                industry.
            </p>
        </div>
        <div class="mt-6">
            <ButtonsButton text="Read The Blog" format="white" href="/blog/" target="_self" aria="Check out the blog." extraClass="mx-auto" />
        </div>
    </Section>
</template>

<style scoped>
.about-text {
    @apply text-h5 leading-h4 relative text-typography_primary_light;
}
.about-text:not(:last-of-type) {
    @apply mb-6;
}
.dark .about-text {
    @apply text-typography_primary_dark;
}
.about-text .link {
    @apply font-bold;
}
.about-text .link:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.dark .about-text .link:hover {
    @apply bg-brand_primary_dark text-typography_primary_light;
}
@screen md {
    .about-text {
        @apply text-h3 leading-h3;
    }
}
</style>
