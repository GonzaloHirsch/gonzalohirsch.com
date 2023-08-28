<template>
  <main class="blog-post-text">
    <ContentDoc>
      <template v-slot="{ doc }">
        <Section id="blog-title" type="header">
          <div
            class="border-t-2 pt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
          >
            <ol
              itemscope
              itemtype="https://schema.org/BreadcrumbList"
              class="blog-breadcrumb"
            >
              <li
                itemprop="itemListElement"
                itemscope
                itemtype="https://schema.org/ListItem"
              >
                <a itemprop="item" href="https://gonzalohirsch.com/">
                  <span itemprop="name">Home</span></a
                >
                <meta itemprop="position" content="1" />
              </li>
              <li class="separator">/</li>
              <li
                itemprop="itemListElement"
                itemscope
                itemtype="https://schema.org/ListItem"
              >
                <a
                  itemscope
                  itemtype="https://schema.org/WebPage"
                  itemprop="item"
                  itemid="https://gonzalohirsch.com/blog/"
                  href="https://gonzalohirsch.com/blog/"
                >
                  <span itemprop="name">Blog</span></a
                >
                <meta itemprop="position" content="2" />
              </li>
              <li class="separator">/</li>
              <li
                itemprop="itemListElement"
                itemscope
                itemtype="https://schema.org/ListItem"
              >
                <span itemprop="name">{{ doc.headline }}</span>
                <meta itemprop="position" content="3" />
              </li>
            </ol>
            <span
              class="font-light text-typography_primary_light/75 dark:text-typography_primary_dark/75 mt-2 md:mt-0"
              >{{ $formatDate(doc.date) }}</span
            >
          </div>
          <h1
            class="blog-post-text font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left"
          >
            {{ doc.headline }}
          </h1>
          <p
            class="blog-post-text mb-8 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left"
          >
            {{ doc.excerpt }}
          </p>
          <div
            class="border-b-2 pb-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
          >
            <div class="flex flex-row items-center justify-center">
              <img
                :src="getImage(doc.author)"
                :alt="`Image of ${doc.author}`"
                class="w-8 h-8 object-cover rounded-full mr-2"
              />
              <span class="blog-post-text text-lg leading-lg font-light"
                >By
                <a
                  class="hover:underline italic"
                  :href="doc.authorUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ doc.author }}</a
                ></span
              >
            </div>
            <div class="mt-6 md:mt-0">
              <NavShareIcons
                :headline="doc.headline"
                :excerpt="doc.excerpt"
                :path="doc._path + '/'"
              />
            </div>
          </div>
        </Section>
        <Section
          id="main"
          class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12"
        >
          <aside class="col-span-full md:col-span-3 md:hidden">
            <SectionsMinimalNewsletterCta
              :tags="['2824862', '2824866']"
              class="mb-4"
            >
              <template #title>Don't Miss Out!</template>
              <template #description
                >Gain access to <strong>technical insider knowledge</strong>,
                <strong>thought-provoking articles</strong>, and
                <strong>actionable advice</strong>.</template
              >
            </SectionsMinimalNewsletterCta>
            <div class="blog-post-text blog-aside-wrapper mb-2">
              <BlogTableOfContents :links="doc.body?.toc?.links" />
            </div>
          </aside>
          <article class="prose col-span-full md:col-span-7 relative">
            <span
              v-show="doc.dateUpdated"
              class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary_light/75 dark:text-typography_primary_dark/75"
              >(Updated: {{ $formatDate(doc.dateUpdated) }})</span
            >
            <ContentRenderer :value="doc" class="blog-content blog-post-text" />
          </article>
          <aside class="col-span-full md:col-span-3 blog-aside h-fit">
            <SectionsMinimalNewsletterCta
              :tags="['2824862', '2824866']"
              class="mb-4"
            >
              <template #title>Don't Miss Out!</template>
              <template #description
                >Gain access to <strong>technical insider knowledge</strong>,
                <strong>thought-provoking articles</strong>, and
                <strong>actionable advice</strong>.</template
              >
            </SectionsMinimalNewsletterCta>
            <div class="!hidden blog-aside-wrapper md:!flex mb-4">
              <BlogTableOfContents
                :links="doc.body?.toc?.links"
                class="blog-post-text"
              />
            </div>
            <div
              v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0"
              class="blog-aside-wrapper"
            >
              <BlogRelatedArticles
                :surround="data?.surround"
                class="blog-post-text"
              />
            </div>
          </aside>
        </Section>
        <Section id="comments">
          <div
            class="!bg-background_light !text-typography_primary_light p-8 border-t-2 border-b-2 border-typography_primary_light"
          >
            <div id="disqus_thread" />
          </div>
        </Section>
        <NavScrollTopIcon />
      </template>
      <template #not-found>
        <SectionsError />
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');
const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  // Remove a trailing slash in case the browser adds it, it might break the routing
  // fetch document where the document path matches with the cuurent route
  let article = queryContent('/blog').where({ _path: cleanPath }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent('/blog')
    .sort({ date: -1 })
    .only(['_path', 'headline', 'excerpt'])
    .findSurround(cleanPath, { before: 1, after: 1 });
  return {
    article: await article,
    surround: await surround,
  };
});

// Get the authors
const { data: authorData } = await useAsyncData('home', () =>
  queryContent('/authors').findOne()
);

// Set the meta
const baseUrl = 'https://gonzalohirsch.com';
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image =
  baseUrl + (data.value?.article?.socialImage.src || '/meta-img.jpg');

// JSON+LD
const jsonScripts = [
  {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://gonzalohirsch.com/',
      },
      url: canonicalPath,
      image: image,
      headline: data.value?.article?.headline,
      abstract: data.value?.article?.excerpt,
      datePublished: data.value?.article?.date,
      dateModified:
        data.value?.article?.dateUpdated || data.value?.article?.date,
      author: authorData.value[data.value?.article?.author],
      publisher: authorData.value['Gonzalo Hirsch'],
    }),
  },
];
// Adding the FAQ schema
if (data.value?.article?.faq) {
  jsonScripts.push({
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.value?.article?.faq.map((elem) => {
        return {
          '@type': 'Question',
          name: elem.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: elem.answer,
          },
        };
      }),
    }),
  });
}
useHead({
  title: data.value?.article?.title,
  meta: [
    { name: 'author', content: data.value?.article?.author },
    { name: 'description', content: data.value?.article?.description },
    {
      property: 'article:published_time',
      content: data.value?.article?.date.split('T')[0],
    },
    // OG
    {
      hid: 'og:title',
      property: 'og:title',
      content: data.value?.article?.headline,
    },
    { hid: 'og:url', property: 'og:url', content: canonicalPath },
    {
      hid: 'og:description',
      property: 'og:description',
      content: data.value?.article?.description,
    },
    { hid: 'og:image', name: 'image', property: 'og:image', content: image },
    { hid: 'og:type', property: 'og:type', content: 'Article' },
    {
      hid: 'og:image:type',
      property: 'og:image:type',
      content: `image/${data.value?.article?.socialImage.mime}`,
    },
    {
      hid: 'og:image:width',
      property: 'og:image:width',
      content: data.value?.article?.socialImage.width || 190,
    },
    {
      hid: 'og:image:height',
      property: 'og:image:height',
      content: data.value?.article?.socialImage.height || 190,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: data.value?.article?.socialImage.alt,
    },
    // Twitter
    { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: data.value?.article?.headline,
    },
    { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: data.value?.article?.description,
    },
    { hid: 'twitter:image', name: 'twitter:image', content: image },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: data.value?.article?.socialImage.alt,
    },
  ],
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: canonicalPath,
    },
  ],
  script: jsonScripts,
});

// Author image
import gh from '../../assets/img/authors/Gonzalo Hirsch.webp';
const authors = {
  'Gonzalo Hirsch': gh,
};
const getImage = (name) => {
  return authors[name];
};

// Script loading for comments
import { onMounted } from 'vue';
onMounted(() => {
  if (typeof window !== 'undefined') {
    // Disqus is not loaded, do it
    if (!window.loaded) {
      const targetId = 'disqus-tag';
      // Add the script
      const script = document.createElement('script');
      script.id = targetId;
      script.innerHTML = `var disqus_config = function () {this.page.url = "${canonicalPath}";this.page.identifier = "${data.value.article.dqid}";this.page.title = "${data.value.article.headline}"};(function () {var d = document,s = d.createElement('script');s.addEventListener("load", function() {loaded=true;});s.src = "https://gonzalohirsch.disqus.com/embed.js";s.setAttribute('data-timestamp', new Date());(d.head || d.body).appendChild(s);})(); /* * * Disqus Reset Function * * */var reset = function (newIdentifier, newUrl, newTitle, newLanguage) {DISQUS.reset({reload: true,config: function () {this.page.identifier = newIdentifier;this.page.url = newUrl;this.page.title = newTitle;this.language = newLanguage;}});};`;
      document.body.appendChild(script);
    } else {
      window.reset(
        data.value.article.dqid,
        canonicalPath,
        data.value.article.headline,
        'en'
      );
    }
  }
});
</script>

<style scoped>
.blog-aside {
  @apply sticky;
  top: calc(theme('spacing.nav') + 0.25rem);
}
.blog-aside-wrapper {
  @apply flex flex-col border-t-2 border-b-2 border-typography_primary_light dark:border-typography_primary_dark py-4;
}
.blog-post-text {
  @apply text-typography_primary_light dark:text-typography_primary_dark;
}
.separator {
  @apply mx-1;
}
</style>
