<template>
    <Section id="about">
        <div class="grid grid-cols-10 gap-8">
            <div class="col-span-full lg:col-span-6">
                <div class="flex flex-col justify-center h-full">
                    <h2 class="about-title section-title relative mb-6">About Me</h2>
                    <p class="about-text">
                        I'm a full-stack developer with more than three years of professional experience working on front-end and back-end projects. I
                        have a passion for technology, incredible ideas, and teaching programming.
                    </p>
                    <p class="about-text">
                        I study Software Engineering at the
                        <a
                            href="https://www.itba.edu.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="link"
                            aria-label="Check out the Instituto Tecnológico de Buenos Aires website."
                            >Instituto Tecnológico de Buenos Aires</a
                        >
                        (ITBA) and work as a Full-Stack Freelancer at
                        <a
                            href="https://www.toptal.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="link"
                            aria-label="Check out Gonzalo Hirsch's profile at Toptal."
                            >Toptal</a
                        >. I'm also the first and former vice president and co-founder of
                        <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" class="link" aria-label="Check out IEEE's website."
                            >IEEE</a
                        >'s
                        <a
                            href="https://csitba.web.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="link"
                            aria-label="Check out Computer Society ITBA's website."
                            >Computer Society ITBA</a
                        >
                        Argentina branch here in Buenos Aires, Argentina.
                    </p>
                </div>
            </div>
            <div class="col-span-7 col-start-2 lg:col-start-auto lg:col-span-4">
                <ImagesGrid
                    :imageTR="{
                        src: imageTR,
                        alt: 'Gonzalo on a mountain.'
                    }"
                    :imageBR="{
                        src: imageBR,
                        alt: 'Gonzalo on a park.'
                    }"
                    :imageTL="{
                        src: imageTL,
                        alt: 'Gonzalo in Cambridge.'
                    }"
                    :imageBL="{
                        src: imageBL,
                        alt: 'Gonzalo in Edinburgh.'
                    }"
                />
            </div>
        </div>
    </Section>
</template>

<script setup>
import imageTR from '../../assets/img/mountain.jpg';
import imageBR from '../../assets/img/park.jpg';
import imageTL from '../../assets/img/cambridge.jpg';
import imageBL from '../../assets/img/edinburgh.jpg';
</script>

<style scoped>
.about-title::before {
    @apply bg-typography_primary_light block mx-auto absolute left-0;
    content: '';
    width: 15%;
    height: 2px;
    top: -50px;
}
.dark .about-title::before {
    @apply bg-typography_primary_dark;
}
.about-text {
    @apply text-h4 leading-h3 relative text-typography_primary_light;
}
.about-text:not(:last-of-type) {
    @apply mb-6;
}
.dark .about-text {
    @apply text-typography_primary_dark;
}
.about-text .link {
    @apply font-bold duration-200;
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
