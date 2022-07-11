<template>
    <Section id="hero" :fullHeight="true">
        <div class="flex flex-col justify-center h-full text-center relative">
            <h1 class="home-title text-typography_primary_light dark:text-typography_primary_dark">
                Hi! My name is <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Gonzalo Hirsch</span>
            </h1>
            <h2
                class="text-h3-sm leading-h3-sm md:text-h3 md:leading-h3 md:w-9/12 mx-auto mt-2 md:mt-8 text-typography_primary_light dark:text-typography_primary_dark"
            >
                I'm an Argentina-based
                <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Software Engineering Student</span> and
                <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Full-Stack Developer</span> focused on developing clean,
                user-friendly, and fast experiences.
            </h2>
            <ButtonsButton text="CV" format="white" href="/Gonzalo-Hirsch-CV.pdf" target="_blank" aria="Check out my CV." extraClass="mx-auto mt-4" />
        </div>
    </Section>
</template>

<style scoped>
.home-title::before {
    @apply bg-typography_primary_light block mx-auto absolute left-0 right-0;
    content: '';
    width: 15%;
    height: 2px;
    top: -25px;
}
@screen md {
    .home-title::before {
        top: -50px;
    }
}
.dark .home-title::before {
    @apply bg-typography_primary_dark;
}
.home-title {
    @apply text-h3-sm leading-h3-sm relative;
}
.home-title .impact {
    @apply text-h1-sm leading-h1-sm block mt-3;
}

@screen md {
    .home-title {
        @apply text-h3 leading-h3;
    }
    .home-title .impact {
        @apply text-h1 leading-h1 block;
    }
}

.impact {
    @apply font-bold;
}
</style>
