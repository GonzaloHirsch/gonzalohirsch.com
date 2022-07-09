<template>
    <main>
        <SectionsHero />
        <SectionsAbout />
        <SectionsExperience />
        <SectionsProjects />
        <SectionsPassion />
    </main>
</template>

<script setup>
const title = 'Gonzalo Hirsch | Software Engineer and Freelancer';
const description =
    "I'm an Argentina-based Software Engineering Student and Full-Stack Developer focused on developing clean, user-friendly, and fast experiences.";
const image = 'meta-img.jpg';
const url = 'https://gonzalohirsch.com/';

useHead({
    meta: [
        // OG Card
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', content: url + image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        { hid: 'og:image:width', property: 'og:image:width', content: '190' },
        { hid: 'og:image:height', property: 'og:image:height', content: '190' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Gonzalo Hirsch' },

        // Twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: "Summary" },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:url', name: 'twitter:url', content: url },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: url + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: "Gonzalo Hirsch" }
    ]
});
</script>
