<template>
    <main>
        <article class="prose text-typography_primary_light dark:text-typography_primary_dark">
            <Section id="blog-title">
                <h1 class="font-bold mb-12">{{ data.article.headline }}</h1>
                <span class="text-lg leading-lg font-light text-typography_primary_light/90 dark:text-typography_primary_dark/90">{{ $formatDate(data.article.publishDate) }}</span>
                {{data.article}}
            </Section>
            <Section id="main">
                <ContentDoc />
            </Section>
        </article>
    </main>
</template>

<script setup>
const {$formatDate} = useNuxtApp();
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {
    // fetch document where the document path matches with the cuurent route
    let article = queryContent().where({ _path: path }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent().only(['_path', 'title', 'description']).sort({ date: 1 }).findSurround(path);
    return {
        article: await article,
        surround: await surround
    };
});
// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;
// set the meta
useHead({
    title: data.value.article.title,
    meta: [
        { name: 'description', content: data.value.article.description },
        {
            hid: 'og:image',
            property: 'og:image',
            content: `https://site.com/${data.value.article.img}`
        }
    ]
});
</script>
