<template>
  <nav
    :class="[
      'hidden sm:flex fixed flex-col bottom-0 w-section_x items-center z-10',
      props.left ? 'left-0 nav-left' : '',
      props.right ? 'right-0 nav-right' : '',
    ]"
  >
    <slot />
    <div
      v-show="!hideBorder"
      class="border h-[100px] w-[2px] border-typography_primary_light dark:border-typography_primary_dark mb-4"
    ></div>
  </nav>
</template>

<script setup>
const props = defineProps({
  left: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  hideBorder: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
@media screen and (min-width: 1537px) {
  .nav-left {
    left: calc((100% - 1536px) / 2);
  }
  .nav-right {
    right: calc((100% - 1536px) / 2);
  }
}
</style>
