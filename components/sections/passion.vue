<template>
    <Section id="passion" :fullHeight="true" :forcedHeight="true">
        <div
            class="flex flex-row items-center justify-center h-full bg-brand_primary_light/10 dark:bg-brand_primary_dark/10 rounded-md group hover:border-4 hover:shadow-lg border-brand_primary_light dark:border-brand_primary_dark duration-300"
        >
            <p class="passion-text w-10/12 group-hover:scale-[115%] duration-300 transition-transform">
                My passion is building <strong>reliable</strong> and <strong>efficient</strong> <strong>software</strong>,
                <strong>algorithms</strong>, and <strong>experiences</strong>.
            </p>
        </div>
    </Section>
</template>

<style scoped>
.passion-text {
    @apply text-h3 leading-h3 relative text-center my-auto text-typography_primary_light;
}
.dark .passion-text {
    @apply text-typography_primary_dark;
}
.passion-text strong {
    @apply text-brand_primary_light font-semibold;
}
.dark .passion-text strong {
    @apply text-brand_primary_dark;
}
@screen md {
    .passion-text {
        @apply text-h2 leading-h2;
    }
}
</style>
