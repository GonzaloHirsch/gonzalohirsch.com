<template>
  <main>
    <ContentQuery
      path="/blog"
      :only="['headline', 'description', 'date', 'tags', '_path', 'image']"
      :sort="{
        date: -1,
      }"
      :skip="blogCountLimit * (getPageNumber() - 1)"
      :limit="blogCountLimit"
    >
      <template v-slot="{ data }">
        <BlogHero />
        <Section id="main" class="!pt-0">
          <BlogList :data="data" />
          <ContentQuery path="/blog" :only="['headline']">
            <template v-slot="{ data }">
              <BlogPagination
                v-if="getPageLimit(data.length) > 1"
                class="mt-8"
                :currentPage="getPageNumber()"
                :totalPages="getPageLimit(data.length)"
                :nextPage="getPageNumber() < getPageLimit(data.length)"
                baseUrl="/blog/page/1/"
                pageUrl="/blog/page/"
              />
            </template>
            <template #not-found>
              <!-- Nothing -->
            </template>
          </ContentQuery>
        </Section>
        <SectionsNewsletterCta :tags="['2824862', '2824865']" class="!pt-0">
          <template #title>Unlock Valuable Tech Knowledge!</template>
        </SectionsNewsletterCta>
      </template>
      <template #not-found>
        <BlogHero />
        <Section id="main" class="!pt-0">
          <BlogList
            :data="[]"
            message="There are no posts in this page, maybe try searching on another one."
          />
        </Section>
      </template>
    </ContentQuery>
  </main>
</template>

<script setup>
// Fetching data
const { path, params } = useRoute();
const blogCountLimit = 6;

const getPageLimit = (totalPosts) => {
  return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
  return Number(params.number);
};

// Attempt to get the number
const router = useRouter();
let pageNo;
try {
  pageNo = getPageNumber();
  if (isNaN(pageNo) || pageNo <= 0) {
    router.replace('/blog/');
  }
} catch (err) {
  console.error(err);
  router.replace('/blog/');
}

// Set the meta
const title = `Page ${pageNo} | Blog | Gonzalo Hirsch`;
const description =
  'A personal blog where Gonzalo Hirsch writes about programming and insights he gains on software engineering and different technologies from the industry.';
const image = 'meta-img.webp';
const baseUrl = 'https://gonzalohirsch.com/';
const canonicalPath = `${baseUrl}blog/page/${params.number}/`;
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
