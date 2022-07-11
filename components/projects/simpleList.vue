<template>
    <div class="grid md:grid-cols-8 lg:grid-cols-9 gap-4">
        <ContentRenderer :value="data">
            <template v-for="(project, index) in data" :key="project._path">
                <ProjectsSimple :project="project" class="col-span-full md:col-span-4 lg:col-span-3"/>
            </template>
        </ContentRenderer>
    </div>
</template>

<script setup>
const { data } = await useAsyncData('projects', () => queryContent('/projects').find());
</script>
