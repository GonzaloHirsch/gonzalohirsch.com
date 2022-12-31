<template>
    <div class="grid grid-cols-4 gap-4">
        <template v-for="movie in movies" :key="`${movie.title}-${movie.date}`">
            <FilmsItem :movie="movie" class="col-span-2 lg:col-span-1"/>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    movies: {
        type: Array,
        default: []
    }
});
</script>
