<template>
    <div class="w-full">
        <h3 class="experience-item-title text-h4_sm leading-h4_sm md:text-h4 md:leading-h4 mb-2 text-typography_primary_light dark:text-typography_primary_dark">
            {{ data.position }}<span class="text-brand_primary_light dark:text-brand_primary_dark mx-1 inline-block">@</span> 
            <NuxtLink
                :to="data.company.url"
                target="_blank"
                rel="noopener noreferer"
                class="text-brand_primary_light dark:text-brand_primary_dark hover:underline inline-block transition duration-100"
                >{{ data.company.name }}</NuxtLink
            >
        </h3>
        <p class="text-lg leading-lg flex flex-row items-center justify-start mb-6 text-typography_primary_light/70 dark:text-typography_primary_dark/70">{{data.time}}<span v-if="data.volunteer" class="ml-2 uppercase text-xs leading-xs bg-brand_primary_light dark:bg-brand_primary_dark text-typography_primary_dark dark:text-typography_primary_light p-1 rounded-sm">volunteer</span></p>
        <p v-if="data.description" class="item-copy">{{data.description}}
        </p>
        <ul v-if="data.items && data.items.length > 0" class="list-disc pl-6 mt-2">
            <li v-for="(item, index) in data.items" :key="index" class="item-copy">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.item-copy {
    @apply text-typography_primary_light;
}

.dark .item-copy {
    @apply text-typography_primary_dark;
}

.experience-item-title {
    word-break: break-word;
}
</style>