<template>
    <Section id="contact" :fullHeight="true" :forcedHeight="true">
        <div
            class="flex flex-col items-center justify-center h-full bg-brand_secondary_light/20 dark:bg-brand_secondary_dark/20 rounded-md border-brand_primary_light dark:border-brand_primary_dark my-auto"
        >
            <h2 class="section-title relative mb-6">Get in Touch</h2>
            <p class="contact-text w-10/12">
                If you have something cool you want to work on or have a project in mind, send me an email or contact me on my social networks.
            </p>
            <ButtonsButton
                text="Send an Email"
                format="primary"
                href="mailto:hirschgonzalo@gmail.com?subject=Let's build together"
                aria="Send me an email."
                extraClass="mx-auto mt-6"
            />
        </div>
    </Section>
</template>

<style scoped>
.contact-text {
    @apply text-h4 leading-h4 relative text-center text-typography_primary_light dark:text-typography_primary_dark;
}
@screen md {
    .contact-text {
        @apply text-h3 leading-h3;
    }
}
</style>
