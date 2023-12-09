<template>
  <div class="w-full my-1">
    <p :class="[!uri ? 'flex' : '']">
      <strong :class="[!uri ? 'flex flex-shrink min-w-fit' : '']">{{
        text
      }}</strong>
      <template v-if="uri"
        ><a
          :href="uri"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 underline"
          >{{ name }}</a
        >
        ({{ stat }})</template
      >
      <template v-else
        ><span
          class="ml-2 animate-pulse leading-base flex-grow bg-white/25 dark:bg-background_dark/25 rounded-md"
          >    
        </span></template
      >
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  stat: {
    type: String,
  },
  name: {
    type: String,
  },
  uri: {
    type: String,
  },
});
</script>
