<template>
    <div class="flex flex-col items-center w-full">
        <div class="grid md:grid-cols-8 lg:grid-cols-9 gap-4 w-full">
            <ContentRenderer :value="data">
                <template v-for="(project, index) in data" :key="project._path">
                    <ProjectsSimple
                        :project="project"
                        :class="['col-span-full md:col-span-4 lg:col-span-3', index < initialLoadLimit || loadAll ? 'block' : 'hidden']"
                    />
                </template>
            </ContentRenderer>
        </div>
        <ButtonsButton text="Load More" :format="loadAll ? 'disabled' : 'white'" @click="loadMoreProjects" aria="Load more projects." :extraClass="`mx-auto mt-8 ${loadAll ? '' : 'cursor-pointer' }`" />
    </div>
</template>

<script setup>
const { data } = await useAsyncData('projects', () => queryContent('/projects').find());

import { ref } from 'vue';
const initialLoadLimit = 6;
const loadAll = ref(false);
const loadMoreProjects = () => {
    loadAll.value = true;
};
</script>
