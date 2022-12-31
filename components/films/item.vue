<template>
    <a
        :href="movie.url"
        :aria-label="`Go to ${movie.title}.`"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-md overflow-hidden relative group"
    >
        <img :src="movie.img" :alt="`Poster for ${movie.title}.`" />
        <div
            class="absolute bottom-0 left-0 w-full bg-brand_primary_light text-typography_primary_dark dark:bg-brand_primary_dark dark:text-typography_primary_light px-2 py-1 movie-info transform transition-transform duration-200 group-hover:translate-y-full"
        >
            <p>
                <em>{{ movie.title }}</em
                >, {{ movie.year }}
            </p>
            <p>Watched on: {{ movie.date }}</p>
        </div>
    </a>
</template>

<script setup>
const props = defineProps({
    movie: {
        type: Object
    }
});
</script>

<style scoped>
.movie-info p {
    @apply text-xs leading-xs;
}

@screen md {
    .movie-info p {
        @apply text-sm leading-sm;
    }
}
</style>
