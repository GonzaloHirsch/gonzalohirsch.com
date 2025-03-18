<template>
  <a
    :href="item.url"
    :aria-label="`Go to ${item.title}.`"
    target="_blank"
    rel="noopener noreferrer"
    class="rounded-md overflow-hidden relative group"
  >
    <NuxtImg
      v-if="item.img"
      :key="item.img"
      :src="item.img"
      :alt="`Poster for ${item.title}.`"
      loading="lazy"
      class="w-full item-image"
    />
    <p
      v-else
      class="item-image w-full flex justify-center items-center text-center text-2xl bg-brand_primary_light/75 dark:bg-brand_primary_dark/75 text-background_light dark:text-background_dark p-2"
    >
      {{ getDefaultString() }}
    </p>
    <div
      class="absolute bottom-0 left-0 w-full bg-brand_primary_light text-typography_primary_dark dark:bg-brand_primary_dark dark:text-typography_primary_light px-2 py-1 item-info translate-y-full transform transition-transform duration-200 group-hover:translate-y-0"
    >
      <p>
        <em>{{ item.title }}</em
        >{{ item?.author ? ' by ' : ''
        }}<em v-show="item?.author">{{ item.author }}</em
        >,
        {{ item.year }}
      </p>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
});

const getDefaultString = () => {
  let text = `\"${props.item.title}\"`;
  text = text + (props.item?.author ? ` by ${props.item?.author}` : '');
  text = text + ', ' + props.item.year;
  return text;
};
</script>

<style scoped>
.item-image {
  aspect-ratio: 131 / 197;
}

.item-info p {
  @apply text-xs leading-xs;
}

@screen md {
  .item-info p {
    @apply text-sm leading-sm;
  }
}
</style>
