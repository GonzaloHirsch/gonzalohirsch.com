<template>
  <ul
    class="grid grid-cols-10 gap-4 text-typography_primary_light dark:text-typography_primary_dark"
  >
    <li
      v-for="article in data"
      :key="article._path"
      class="col-span-full md:col-span-5 relative rounded-md border-2 border-typography_primary_light dark:border-typography_primary_dark hover:border-brand_primary_light hover:dark:border-brand_primary_dark group"
    >
      <NuxtLink :to="article._path + '/'" class="p-4 block relative">
        <div class="wrapper">
          <header>
            <h2
              class="text-h3 leading-h3 font-semibold mb-2 group-hover:text-brand_primary_light dark:group-hover:text-brand_primary_dark"
            >
              {{ article.headline }}
            </h2>
            <p
              class="text-sm leading-sm mb-4 text-typography_primary_light/75 dark:text-typography_primary_dark/75"
            >
              {{ $formatDate(article.date) }}
            </p>
            <p>{{ article.excerpt }}</p>
            <!-- <ul class="article-tags">
                                            <li class="tag !py-0.5" v-for="(tag, n) in article.tags" :key="n">{{ tag }}</li>
                                        </ul> -->
          </header>
        </div>
      </NuxtLink>
    </li>
  </ul>
  <p
    v-if="data?.length == 0"
    class="w-full md:w-7/12 text-h3 leading-h3 font-bold dark:text-white"
  >
    {{ message }}
  </p>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    default:
      'There are no posts right now, but stay tuned for newer releases in the future.',
  },
});
const { $formatDate } = useNuxtApp();
</script>
