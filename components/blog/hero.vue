<template>
  <Section
    id="blog"
    class="text-typography_primary_light dark:text-typography_primary_dark"
  >
    <div
      class="border-t-2 pt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right mb-6 md:mb-8"
    >
      <ol
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
        class="blog-breadcrumb"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <a itemprop="item" href="https://gonzalohirsch.com/">
            <span itemprop="name">Home</span></a
          >
          <meta itemprop="position" content="1" />
        </li>
        <span>/</span>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name">{{ currentPage }}</span>
          <meta itemprop="position" content="2" />
        </li>
      </ol>
    </div>
    <h1
      class="font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left"
    >
      {{ title }}
    </h1>
    <p class="mb-3 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">
      {{ description }}
    </p>
    <p class="mb-8 text-sm leading-sm text-center md:text-left">
      <a href="/rss.xml" target="_blank" class="hover:underline"
        ><em>Get the RSS feed</em></a
      >
      or
      <a href="#signup" target="_self" class="hover:underline"
        ><em>sign up for updates!</em></a
      >
      <!-- Search for blog posts
      <a href="/search/" target="_self" class="hover:underline"><em>here</em></a
      >! -->
    </p>
    <div
      class="border-t-2 mt-8 border-typography_primary_light dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between md:text-right"
    ></div>
  </Section>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: String,
    required: false,
    default: 'Blog',
  },
  title: {
    type: String,
    required: false,
    default: 'Blog',
  },
  description: {
    type: String,
    required: false,
    default:
      'A personal blog where I write about programming and insights I gain on software engineering and different technologies from the industry. You can find coding challenges, tutorials, and insights on multiple stacks. I might share my experiences and lessons learned from working in the industry.',
  },
});
</script>
