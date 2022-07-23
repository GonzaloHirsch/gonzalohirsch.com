<template>
    <main>
        <BlogHero />
        <Section v-if="data?.posts?.length > 0" id="main" class="!pt-0">
            <BlogList :data="data.posts" />
            <BlogPagination
                v-if="data.totalPages > 1"
                class="mt-8"
                :currentPage="data.pageNo"
                :totalPages="data.totalPages"
                :nextPage="data.nextPage"
                baseUrl="/blog/"
                pageUrl="/blog/page/"
            />
        </Section>
        <Section v-else id="main" class="!pt-0">
            <div class="text-center text-typography_primary_light dark:text-typography_primary_dark">
                <h2>No posts were found</h2>
                <p>Why don't you try going to the main blog page or go back home?.</p>
                <div class="flex mt-8 justify-center">
                    <ButtonsButton
                        text="Blog Home"
                        format="white"
                        href="/blog/"
                        target="_self"
                        aria="Go back to the blog homepage."
                        extraClass=""
                    />
                    <ButtonsButton text="Home" format="white" href="/" target="_self" aria="Go back home." extraClass="ml-4" />
                </div>
            </div>
        </Section>
    </main>
</template>

<script setup>
// Fetching data
const { path, params } = useRoute();
const postCount = 6;
const { data } = await useAsyncData(`content-${path}`, async () => {
    const pageNo = parseInt(params.number);
    const posts = await queryContent('/blog')
        .sort({ date: -1 })
        .only(['headline', 'excerpt', 'date', 'tags', '_path', 'image'])
        .limit(postCount)
        .skip(postCount * (pageNo - 1))
        .find();
    // Calculate total pages
    const allPosts = await queryContent('/blog').find();
    const totalPages = Math.ceil(allPosts.length / postCount);

    if (!posts.length) {
        return { nextPage: false, posts: undefined, pageNo, allPostsLength: totalPages };
    }

    const nextPage = pageNo < Math.ceil(totalPages / postCount);
    return { nextPage, posts, pageNo, totalPages };
});

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
    url: `${baseUrl}blog/page/${params.number}/`,
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
        { hid: 'og:url', property: 'og:url', content: `${baseUrl}blog/page/${params.number}/` },
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
        { hid: 'twitter:url', name: 'twitter:url', content: `${baseUrl}blog/page/${params.number}/` },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: baseUrl + image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Gonzalo Hirsch' }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: `${baseUrl}blog/page/${params.number}/`
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
