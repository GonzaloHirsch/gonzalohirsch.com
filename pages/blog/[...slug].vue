<template>
    <main>
        <article class="prose text-typography_primary_light dark:text-typography_primary_dark">
            <Section id="blog-title">
                <div
                    class="border-t-2 pt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
                >
                    <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <a itemprop="item" href="https://gonzalohirsch.com/"> <span itemprop="name">Home</span></a>
                            <meta itemprop="position" content="1" />
                        </li>
                        <span>/</span>
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
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
                        <span>/</span>
                        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <span itemprop="name">{{ data.article.headline }}</span>
                            <meta itemprop="position" content="3" />
                        </li>
                    </ol>
                    <span class="font-light text-typography_primary_light/75 dark:text-typography_primary_dark/75 mt-2 md:mt-0">{{
                        $formatDate(data.article.date)
                    }}</span>
                </div>
                <h1 class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left">
                    {{ data.article.headline }}
                </h1>
                <p class="mb-8 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">{{ data.article.excerpt }}</p>
                <div
                    class="border-b-2 pb-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
                >
                    <div class="flex flex-row items-center justify-center">
                        <img
                            :src="getImage(data.article.author)"
                            :alt="`Image of ${data.article.author}`"
                            class="w-8 h-8 object-cover rounded-full mr-2"
                        />
                        <span class="text-lg leading-lg font-light"
                            >By
                            <a class="hover:underline italic" :href="data.article.authorUrl" target="_blank" rel="noopener noreferrer">{{
                                data.article.author
                            }}</a></span
                        >
                    </div>
                    <div class="mt-6 md:mt-0">
                        <NavShareIcons :headline="data.article.headline" :excerpt="data.article.excerpt" :path="data.article._path" />
                    </div>
                </div>
            </Section>
            <Section id="main" class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12">
                <div class="col-span-full md:col-span-7">
                    <ContentDoc class="blog-content" />
                </div>
                <div class="col-span-full md:col-span-3 relative">
                    <div
                        class="related-posts flex flex-col border-t-2 border-b-2 border-typography_primary_light dark:border-typography_primary_dark py-4"
                    >
                        <span class="uppercase font-extrabold text-xs leading-xs font-highlight mb-2">Continue Reading</span>
                        <ul class="list-none">
                            <template v-for="(other, index) in data.surround" :key="index">
                                <li v-if="other" class="first:mt-0 mt-4">
                                    <a
                                        :href="other._path"
                                        class="underline hover:text-brand_primary_light dark:hover:text-brand_primary_dark duration-200"
                                        :aria-label="other.headline"
                                    >
                                        {{ other.headline }}
                                    </a>
                                    <p class="!no-underline text-sm leading-sm mt-1">{{ other.excerpt }}</p>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </Section>
        </article>
    </main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {
    // fetch document where the document path matches with the cuurent route
    let article = queryContent().where({ _path: path }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent('/blog').sort({ date: -1 }).findSurround(path, { before: 2, after: 1 });
    return {
        article: await article,
        surround: await surround
    };
});

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());

// Set the meta
const baseUrl = 'https://gonzalohirsch.com';
const image = '/meta-img.jpg';
useHead({
    title: data.value.article.title,
    meta: [
        // OG
        { name: 'description', content: data.value.article.description },
        { hid: 'og:title', property: 'og:title', content: data.value.article.title },
        { hid: 'og:url', property: 'og:url', content: baseUrl + data.value.article._path + '/' },
        { hid: 'og:description', property: 'og:description', content: data.value.article.description },
        { hid: 'og:image', property: 'og:image', content: baseUrl + image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        { hid: 'og:image:width', property: 'og:image:width', content: '800' },
        { hid: 'og:image:height', property: 'og:image:height', content: '418' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Gonzalo Hirsch' },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: data.value.article.title },
        { hid: 'twitter:url', name: 'twitter:url', content: baseUrl + data.value.article._path + '/' },
        { hid: 'twitter:description', name: 'twitter:description', content: data.value.article.description },
        { hid: 'twitter:image', name: 'twitter:image', content: baseUrl + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Gonzalo Hirsch' }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: baseUrl + data.value.article._path + '/'
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://gonzalohirsch.com/'
                },
                url: baseUrl + data.value.article._path + '/',
                image: [data.value.article?.image?.src || 'https://gonzalohirsch.com/meta-img.jpg'],
                headline: data.value.article.headline,
                abstract: data.value.article.excerpt,
                datePublished: data.value.article.date,
                dateModified: data.value.article.date,
                author: authorData.value[data.value.article.author],
                publisher: authorData.value['Gonzalo Hirsch']
            })
        }
    ]
});

// Author image
import gh from '../../assets/img/authors/Gonzalo Hirsch.webp';
const authors = {
    'Gonzalo Hirsch': gh
};
const getImage = (name) => {
    return authors[name];
};
</script>

<style scoped>
.related-posts {
    @apply sticky;
    top: calc(theme('spacing.nav') + 0.25rem);
}
</style>