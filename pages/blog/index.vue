<template>
    <main>
        <Section id="blog" class="text-typography_primary_light dark:text-typography_primary_dark">
            <div
                class="border-t-2 pt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right mb-6 md:mb-8"
            >
                <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a itemprop="item" href="https://gonzalohirsch.com/"> <span itemprop="name">Home</span></a>
                        <meta itemprop="position" content="1" />
                    </li>
                    <span>/</span>
                    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <span itemprop="name">Blog</span>
                        <meta itemprop="position" content="2" />
                    </li>
                </ol>
            </div>
            <h1 class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left">Blog</h1>
            <p class="mb-8 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">
                A personal blog where I write about programming and insights I gain on software engineering and different technologies from the
                industry.
            </p>
            <div
                class="border-t-2 mt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right"
            ></div>
        </Section>
        <Section id="main" class="!pt-0">
            <ContentQuery
                path="/blog"
                :query="{
                    only: ['headline', 'excerpt', 'date', 'tags', '_path', 'image']
                }"
                :sort="{
                    date: -1
                }"
                v-slot="{ data }"
            >
                <!-- Default list slot -->
                <ul class="grid grid-cols-10 gap-4 text-typography_primary_light dark:text-typography_primary_dark">
                    <li v-for="article in data" :key="article._path" class="col-span-full md:col-span-5 relative rounded-md border-2 border-typography_primary_light dark:border-typography_primary_dark hover:border-brand_primary_light hover:dark:border-brand_primary_dark group duration-200">
                        <NuxtLink
                            :to="article._path"
                            class="p-4 block relative"
                        >
                            <div class="wrapper">
                                <header>
                                    <h2
                                        class="text-h3 leading-h3 font-semibold mb-2 group-hover:text-brand_primary_light dark:group-hover:text-brand_primary_dark duration-200"
                                    >
                                        {{ article.headline }}
                                    </h2>
                                    <p class="text-sm leading-sm mb-4 text-typography_primary_light/75 dark:text-typography_primary_dark/75">
                                        {{ $formatDate(article.date) }}
                                    </p>
                                    <p>{{ article.excerpt }}</p>
                                    <!-- <ul class="article-tags">
                                            <li class="tag !py-0.5" v-for="(tag, n) in article.tags" :key="n">{{ tag }}</li>
                                        </ul> -->
                                </header>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </ContentQuery>
        </Section>
    </main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
// Set the meta
const title = 'Blog | Gonzalo Hirsch';
const description =
    'A personal blog where Gonzalo Hirsch writes about programming and insights he gains on software engineering and different technologies from the industry.';
const baseUrl = 'https://gonzalohirsch.com/';
const image = 'meta-img.jpg';

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());
const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: baseUrl + 'blog/',
    description: description,
    publisher: authorData.value['Gonzalo Hirsch'],
    license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US'
};
useHead({
    title: title,
    meta: [
        // OG
        { name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: baseUrl + 'blog/' },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:image', property: 'og:image', content: baseUrl + image },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
        { hid: 'og:image:width', property: 'og:image:width', content: '800' },
        { hid: 'og:image:height', property: 'og:image:height', content: '418' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Gonzalo Hirsch' },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:url', name: 'twitter:url', content: baseUrl + 'blog/' },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: baseUrl + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Gonzalo Hirsch' }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: baseUrl + 'blog/'
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(webpage)
        }
    ]
});
</script>
