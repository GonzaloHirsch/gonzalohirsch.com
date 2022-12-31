<template>
    <Section id="films" class="film-content">
        <h2 class="section-title title-decor relative mb-6">Bonus! I love movies!</h2>
        <p class="dark:text-typography_primary_dark">
            See the latest movies I've watched. Follow me on
            <a href="https://letterboxd.com/GonzaloHirsch/" target="_blank" rel="noopener noreferrer" aria-label="Follow me on Letterboxd.">Letterboxd</a> to view more activity.
        </p>
        <FilmsList v-if="films.length > 0" :movies="films" class="my-6"/>
        <p v-else class="dark:text-typography_primary_dark my-6">Loading watch list...</p>
        <p class="text-sm leading-sm dark:text-typography_primary_dark"><em>Powered by <a href="https://letterboxd.com/" target="_blank" aria-label="Letterboxd" rel="noopener noreferrer">Letterboxd</a>.</em></p>
    </Section>
</template>

<script setup>
import { ref } from 'vue';
const films = ref([]);

const RSS_URL = `https://proxy.gonzalohirsch.com/letterboxd`;
fetch(RSS_URL)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
        films.value = [...data.querySelectorAll('item')].splice(0, 8).map((el) => {
            let imgStr = el.querySelector('description').innerHTML.replace(' ]]>', '').replace('<![CDATA[ <p><img src=\"', '');
            return {
                title: el.getElementsByTagName('letterboxd:filmTitle')[0].innerHTML,
                year: el.getElementsByTagName('letterboxd:filmYear')[0].innerHTML,
                date: el.getElementsByTagName('letterboxd:watchedDate')[0].innerHTML,
                url: el.querySelector('link').innerHTML,
                img: imgStr.substring(0, imgStr.indexOf("\"/></p>"))
            };
        });
    });
</script>

<style scoped>
.film-content a {
    @apply font-bold;
}
.film-content a:hover {
    @apply bg-brand_primary_light text-typography_primary_dark;
}
.dark .film-content a:hover {
    @apply bg-brand_primary_dark text-typography_primary_light;
}
</style>
