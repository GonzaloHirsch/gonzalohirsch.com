<!-- components/content/Card.vue -->
<template>
  <div
    class="overflow-hidden border-t border-b mt-4 border-typography_primary_light dark:border-typography_primary_dark"
  >
    <div
      class="py-1 cursor-pointer select-none font-bold basic-expand-header flex no-anchor"
      @click="() => (open = !open)"
    >
      <span
        :class="[
          'flex flex-shrink px-1 transition-transform duration-200 w-6 justify-center font-highlight text-lg',
          open ? 'rotate-180 mb-[2px]' : 'rotate-0',
        ]"
      >
        {{ open ? '-' : '+' }}
      </span>
      <component
        :is="componentType"
        :id="id"
        class="flex flex-grow flex-shrink"
      >
        {{ heading }}
      </component>
    </div>

    <Transition name="expand">
      <div class="basic-expand-content pb-2" ref="expanded" v-show="open">
        <slot name="description" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);

const props = withDefaults(
  defineProps<{
    heading?: string;
    componentType?: string;
  }>(),
  { heading: '', componentType: 'h3' }
);

const id = props.heading
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .replace(/[^\s\w\d]/g, '')
  .replace(/[^\w\d]/g, '-');
</script>

<style>
.expand-enter-active {
  animation: expand reverse 200ms ease;
}
.expand-leave-active {
  animation: expand 200ms ease;
}
@keyframes expand {
  from {
    max-height: 600px;
  }
  to {
    max-height: 0px;
  }
}

.basic-expand-header > h1,
.basic-expand-header > h2,
.basic-expand-header > h3,
.basic-expand-header > h4,
.basic-expand-header > h5 {
  @apply mt-0 mb-0 text-lg;
}
</style>
