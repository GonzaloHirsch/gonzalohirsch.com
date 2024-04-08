<template>
  <div class="grid grid-cols-8 grid-rows-8 gap-2">
    <div
      class="grid-image-wrapper row-start-2 row-span-3 col-start-2 col-span-3"
    >
      <NuxtImg
        :src="props.imageTL.src"
        :alt="props.imageTL.alt"
        sizes="150px md:250px lg:400px"
        class="grid-image"
        loading="lazy"
      />
      <div
        class="image-overlay bg-brand_primary_light dark:bg-brand_primary_dark"
      />
    </div>
    <div class="grid-image-wrapper row-start-5 row-span-4 col-span-4">
      <NuxtImg
        :src="props.imageBL.src"
        :alt="props.imageBL.alt"
        sizes="150px md:250px lg:400px"
        class="grid-image"
        loading="lazy"
      />
      <div
        class="image-overlay bg-brand_primary_light dark:bg-brand_primary_dark"
      />
    </div>
    <div
      class="grid-image-wrapper row-start-1 row-span-5 col-start-5 col-span-3"
    >
      <NuxtImg
        :src="props.imageTR.src"
        :alt="props.imageTR.alt"
        sizes="150px md:250px lg:400px"
        class="grid-image"
        loading="lazy"
      />
      <div
        class="image-overlay bg-brand_primary_light dark:bg-brand_primary_dark"
      />
    </div>
    <div
      class="grid-image-wrapper row-start-6 row-span-2 col-start-5 col-span-2"
    >
      <NuxtImg
        :src="props.imageBR.src"
        :alt="props.imageBR.alt"
        sizes="150px md:250px lg:400px"
        class="grid-image"
        loading="lazy"
      />
      <div
        class="image-overlay bg-brand_primary_light dark:bg-brand_primary_dark"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageTR: {
    type: Object,
  },
  imageTL: {
    type: Object,
  },
  imageBR: {
    type: Object,
  },
  imageBL: {
    type: Object,
  },
});
</script>

<style scoped>
.grid-image {
  @apply object-cover z-[1] w-full h-full;
}
.grid-image-wrapper:hover {
  @apply shadow-lg;
}
.image-overlay {
  @apply w-full h-full opacity-25 absolute top-0 left-0 z-[2];
}
.grid-image-wrapper {
  @apply relative overflow-hidden z-[1] rounded-sm duration-300 transition-all;
}
</style>
