<template>
    <div>
        <ContentRenderer :value="data">
            <template v-for="(project, index) in data" :key="project._path">
                <ProjectsFeatured :isLeft="index % 2 === 0" :project="project" class="last:mb-0 first:mt-0 my-20 md:my-32 lg:my-40"/>
            </template>
        </ContentRenderer>
    </div>
</template>

<script setup>
const { data } = await useAsyncData('featured-projects', () => queryContent('/featured-projects').find());
</script>
