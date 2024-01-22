<template>
  <main>
    <SitemapHero />
    <Section id="main" class="!pt-0">
      <h2
        class="text-typography_primary_light dark:text-typography_primary_dark"
      >
        General
      </h2>
      <SitemapList :data="[{ headline: 'Homepage', _path: '' }]" />
      <h2
        class="mt-12 text-typography_primary_light dark:text-typography_primary_dark"
      >
        Blog
      </h2>
      <ContentQuery
        path="/blog"
        :only="['headline', 'excerpt', '_path', 'image']"
        :sort="{
          headline: 1,
        }"
        v-slot="{ data }"
      >
        <SitemapList :data="data" />
      </ContentQuery>
      <h2
        class="mt-12 text-typography_primary_light dark:text-typography_primary_dark"
      >
        Blog Pages
      </h2>
      <SitemapList
        :data="[
          { headline: 'Blog', _path: '/blog' },
          { headline: 'Blog Page 1', _path: '/blog/page/1' },
          { headline: 'Blog Page 2', _path: '/blog/page/2' },
          { headline: 'Blog Page 3', _path: '/blog/page/3' },
        ]"
      />
    </Section>
  </main>
</template>

<script setup>
// Set the meta
const title = 'Sitemap | Gonzalo Hirsch';
const description =
  'Explore my site for insights from the software engineering landscape, tech discussions, and diverse projects. Gain valuable industry insights from my journey.';
const baseUrl = 'https://gonzalohirsch.com/';
const image = 'meta-img.webp';
const canonicalPath = baseUrl + 'sitemap/';

// Get the authors
const { data: authorData } = await useAsyncData('home', () =>
  queryContent('/authors').findOne()
);
const webpage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  url: canonicalPath,
  description: description,
  publisher: authorData.value['Gonzalo Hirsch'],
  license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US',
};
useHead({
  title: title,
  meta: [
    // OG
    { name: 'description', content: description },
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:url', property: 'og:url', content: canonicalPath },
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:image', property: 'og:image', content: baseUrl + image },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
    { hid: 'og:image:width', property: 'og:image:width', content: '800' },
    { hid: 'og:image:height', property: 'og:image:height', content: '418' },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Gonzalo Hirsch',
    },
    // Twitter
    { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
    { hid: 'twitter:site', name: 'twitter:site', content: '@GonzaloHirsch' },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@GonzaloHirsch',
    },
    { hid: 'twitter:title', name: 'twitter:title', content: title },
    { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
    { hid: 'twitter:image', name: 'twitter:image', content: baseUrl + image },
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
      href: canonicalPath,
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
