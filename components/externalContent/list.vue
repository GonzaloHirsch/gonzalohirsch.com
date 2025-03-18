<template>
  <div class="grid grid-cols-10 gap-4 external-content-list">
    <template v-for="item in items" :key="`${item.title}-${item.date}`">
      <ExternalContentItem :item="item" class="col-span-5 lg:col-span-2" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});
</script>
