<template>
  <figure class="block my-6">
    <NuxtImg
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="mx-auto"
      loading="lazy"
      sizes="450px md:650px lg:1080px"
    />
    <figcaption
      class="text-base leading-base text-center mt-2 opacity-70 block"
    >
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { withBase } from 'ufo';
import { useRuntimeConfig, computed } from '#imports';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL);
  }
  return props.src;
});
</script>
