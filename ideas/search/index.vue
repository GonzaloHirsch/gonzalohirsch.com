<template>
  <main>
    <BlogHero
      class="pb-5 md:pb-6"
      currentPage="Search Blog Posts"
      title="Search Blog Posts"
      description="A personal blog where I write about programming and insights I gain on software engineering and different technologies from the industry. You can find coding challenges, tutorials, and insights on multiple stacks. Search for the blog posts through the search bar!"
    />
    <Section
      id="search"
      class="!pt-0 !pb-0 sticky md:relative top-nav md:top-0 z-10 md:bg-transparent"
    >
      <input
        type="text"
        placeholder="Search for a blog title or tag..."
        v-model="filter"
        class="w-full border-2 rounded-md px-4 py-2 bg-opacity-[98%] border-background_dark dark:border-background_light bg-background_light text-typography_primary_light dark:bg-background_dark dark:text-typography_primary_dark ring-0 ring-offset-0 outline-none"
      />
    </Section>
    <Section id="main" class="!pt-4">
      <BlogList
        :data="data"
        message="No blog posts found. Try searching for something different."
      />
    </Section>
    <SectionsNewsletterCta :tags="['2824862', '2824865']" class="!pt-0">
      <template #title>Unlock Valuable Tech Knowledge!</template>
    </SectionsNewsletterCta>
  </main>
</template>

<script setup>
import { ref } from 'vue';
const filter = ref('');

const { data } = await useAsyncData(
  `search`,
  async () => {
    return await queryContent('/blog')
      .where({
        $or: [
          { headline: { $regex: `/${filter.value}/ig` } },
          { tags: { $regex: `/${filter.value}/ig` } },
        ],
      })
      .sort({ date: -1 })
      .only(['headline', 'excerpt', 'date', 'tags', '_path'])
      .find();
  },
  {
    watch: [filter],
  }
);

// Set the meta
const title = 'Search for Blog Posts | Gonzalo Hirsch';
const description =
  'A personal blog where Gonzalo Hirsch writes about programming and insights he gains on software engineering and different technologies from the industry.';
const baseUrl = 'https://gonzalohirsch.com/';
const image = 'meta-img.webp';
const canonicalPath = baseUrl + 'search/';

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
