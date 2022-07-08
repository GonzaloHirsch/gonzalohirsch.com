<template>
    <div>
        <ContentRenderer :value="data">
            <template v-for="(project, index) in data" :key="project._path">
                <ProjectsFeatured :isLeft="index % 2 === 0" :project="project" class="last:mb-0 mt-12 mb-12 md:mb-24"/>
            </template>
        </ContentRenderer>
    </div>
</template>

<script setup>
const { data } = await useAsyncData('featured-projects', () => queryContent('/featured-projects').find());
</script>
