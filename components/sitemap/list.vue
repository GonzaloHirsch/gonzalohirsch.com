<template>
  <ul
    class="grid grid-cols-10 gap-4 text-typography_primary_light dark:text-typography_primary_dark"
  >
    <li
      v-for="link in data"
      :key="link._path"
      class="col-span-full md:col-span-5 relative rounded-md border-2 border-typography_primary_light dark:border-typography_primary_dark hover:border-brand_primary_light hover:dark:border-brand_primary_dark group"
    >
      <NuxtLink :to="link._path + '/'" class="p-4 block relative">
        <div class="wrapper">
          <header>
            <h3
              :class="[
                'text-h4 leading-h4 font-semibold group-hover:text-brand_primary_light dark:group-hover:text-brand_primary_dark',
                link.excerpt ? 'mb-2' : 'mb-0',
              ]"
            >
              {{ link.headline }}
            </h3>
            <p v-if="link.excerpt">{{ link.excerpt }}</p>
          </header>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
