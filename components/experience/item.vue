<template>
  <div class="w-full bg-background_light dark:bg-background_dark">
    <div
      class="sticky top-0 bg-background_light dark:bg-background_dark mb-2 pb-2 pt-4 border-b-2 border-brand_primary_light dark:border-brand_primary_dark"
    >
      <h3
        class="experience-item-title text-h4_sm leading-h4_sm md:text-h4 md:leading-h4 mb-2 text-typography_primary_light dark:text-typography_primary_dark"
      >
        {{ data.position
        }}<span
          class="text-brand_primary_light dark:text-brand_primary_dark mx-1 inline-block"
          >@</span
        >
        <NuxtLink
          :to="data.company.url"
          target="_blank"
          rel="noopener noreferer"
          class="text-brand_primary_light dark:text-brand_primary_dark hover:underline inline-block"
          >{{ data.company.name }}</NuxtLink
        >
      </h3>
      <p
        class="text-lg leading-lg flex flex-row items-center justify-start text-typography_primary_light/70 dark:text-typography_primary_dark/70"
      >
        {{ data.time
        }}<span
          v-show="data.volunteer"
          class="ml-2 uppercase text-xs leading-xs bg-brand_primary_light dark:bg-brand_primary_dark text-typography_primary_dark dark:text-typography_primary_light p-1 rounded-sm"
          >volunteer</span
        >
      </p>
    </div>
    <div>
      <p v-show="data.description" class="item-copy">{{ data.description }}</p>
      <ul
        v-show="data.items && data.items.length > 0"
        class="list-disc pl-6 mt-2 font-text"
      >
        <li v-for="(item, index) in data.items" :key="index" class="item-copy">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.item-copy {
  @apply text-typography_primary_light dark:text-typography_primary_dark;
}

.experience-item-title {
  word-break: break-word;
}
</style>
