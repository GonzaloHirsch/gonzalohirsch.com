<template>
  <div class="w-full my-1">
    <p class="flex">
      <strong class="flex flex-shrink min-w-fit">{{ text }}</strong>
      <span
        :class="[
          'ml-2',
          !stat
            ? 'animate-pulse leading-base flex-grow bg-white/25 dark:bg-background_dark/25 rounded-md'
            : '',
        ]"
      >
        <template v-if="stat">{{ stat }}</template>
        <template v-else>    </template>
      </span>
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
});
</script>
