<template>
  <main id="main">
    <SectionsHero />
    <SectionsAbout />
    <SectionsBlogCta />
    <SectionsNewsletterCta :tags="['2824862', '2823217']" class="!pb-0" />
    <SectionsExperience />
    <SectionsPassion />
    <SectionsProjects />
    <ClientOnly>
      <DelayHydration>
        <HydrationStatus />
        <LazySectionsGithubSummary />
      </DelayHydration>
    </ClientOnly>
    <SectionsProjectsExtended />
    <SectionsContact />
    <ClientOnly>
      <DelayHydration>
        <HydrationStatus />
        <LazySectionsFilms />
      </DelayHydration>
    </ClientOnly>
  </main>
</template>

<script setup>
const title = 'Gonzalo Hirsch | Software Engineer and Freelancer';
const description =
  'UK-based Software Engineer (BS, MEng), AWS Certified Solutions Architect Associate and Full-Stack Engineer focused on creating performant and clean experiences.';
const image = '/meta-img.webp';
const url = 'https://gonzalohirsch.com';

// Get the authors
const { data: authorData } = await useAsyncData('home', () =>
  queryContent('/authors').findOne()
);
const webpage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  url: url,
  description: description,
  publisher: authorData.value['Gonzalo Hirsch'],
  license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US',
};
useHead({
  title: title,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content:
        'Development, Developer, Software, Engineer, Software Engineer, Engineering, Full-Stack, Freelancer, Experiences, AWS, Solutions Architect Associate, SAA-C03',
    },
    {
      hid: 'author',
      name: 'author',
      content: 'Gonzalo Hirsch',
    },
    // OG Card
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:url', property: 'og:url', content: url },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:image', property: 'og:image', content: url + image },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
    { hid: 'og:image:width', property: 'og:image:width', content: '800' },
    { hid: 'og:image:height', property: 'og:image:height', content: '418' },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Gonzalo Hirsch',
    },

    // Twitter card
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    { hid: 'twitter:site', name: 'twitter:site', content: '@GonzaloHirsch' },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@GonzaloHirsch',
    },
    { hid: 'twitter:title', name: 'twitter:title', content: title },
    { hid: 'twitter:url', name: 'twitter:url', content: url },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
    { hid: 'twitter:image', name: 'twitter:image', content: url + image },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Gonzalo Hirsch',
    },
  ],
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: url,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(webpage),
    },
  ],
});
</script>
