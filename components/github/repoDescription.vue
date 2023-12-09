<template>
  <div
    class="bg-brand_secondary_light/25 dark:bg-brand_secondary_dark/25 rounded-md"
  >
    <p
      :class="[
        'mb-2',
        !repo
          ? 'animate-pulse leading-base bg-white/25 dark:bg-background_dark/25 rounded-md'
          : '',
      ]"
    >
      <a
        :href="repo?.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="underline mr-1"
        ><strong>{{ repo?.full_name }} </strong></a
      >
      <template v-if="stat">({{ stat }})</template>
      <template v-else>    </template>
    </p>
    <p
      :class="[
        'text-sm',
        !repo
          ? 'animate-pulse leading-base h-16 bg-white/25 dark:bg-background_dark/25 rounded-md'
          : '',
      ]"
    >
      <em>
        <template v-if="repo?.description">"{{ repo?.description }}"</template>
        <template v-else>    </template>
      </em>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  repo: {
    type: Object,
  },
  stat: {
    type: String,
  },
});
</script>
