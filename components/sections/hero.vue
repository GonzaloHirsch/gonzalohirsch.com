<template>
    <Section id="hero" :fullHeight="true">
        <div class="flex flex-col justify-center h-full text-center relative">
            <h1 class="home-title text-typography_primary_light dark:text-typography_primary_dark">
                Hi! My name is <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Gonzalo Hirsch</span>
            </h1>
            <h2
                class="text-h3_sm leading-h3_sm md:text-h3 md:leading-h3 md:w-9/12 mx-auto mt-2 md:mt-8 text-typography_primary_light dark:text-typography_primary_dark"
            >
                I'm a
                <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Software Engineer (BS, MEng)</span>, certified
                <a
                    href="https://www.credly.com/badges/9bcea4aa-826b-46c9-a711-64f5f314aeab/public_url"
                    target="_blank"
                    rel="noopener noreferer"
                    class="impact text-brand_primary_light dark:text-brand_primary_dark"
                    >AWS Solutions Architect Associate</a
                >, and
                <span class="impact text-brand_primary_light dark:text-brand_primary_dark">Full-Stack Engineer</span> focused on developing clean,
                user-friendly, and fast experiences.
            </h2>
            <div class="mt-8 mx-auto flex flex-col md:flex-row">
                <ButtonsButton
                    text="Contact Me"
                    format="secondary"
                    href="mailto:hirschgonzalo@gmail.com?subject=Hi! | gonzalohirsch.com"
                    aria="Contact me via email."
                    extraClass="mr-0 mb-4 md:mb-0 md:mr-4 mx-auto"
                />
                <ButtonsButton
                    text="Get My CV"
                    format="primary"
                    href="/Gonzalo_Hirsch-Software_Engineer-CV.pdf"
                    target="_blank"
                    aria="Check out my CV."
                    extraClass="mx-auto"
                />
            </div>
        </div>
    </Section>
</template>

<style scoped>
.home-title::before {
    @apply bg-typography_primary_light dark:bg-typography_primary_dark block mx-auto absolute left-0 right-0;
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
.home-title {
    @apply text-h3_sm leading-h3_sm relative;
}
.home-title .impact {
    @apply text-h1_sm leading-h1_sm block mt-3;
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
