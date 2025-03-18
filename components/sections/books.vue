<template>
  <Section id="books" class="external-content-grid">
    <h2 class="section-title relative mb-6">More Bonus! My Reading List!</h2>
    <p class="dark:text-typography_primary_dark">
      See the latest books I've read. Follow me on
      <a
        href="https://www.goodreads.com/user/show/183922252-gonzalo-hirsch"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow me on Goodreads."
        >Goodreads</a
      >
      to view more activity.
    </p>
    <ExternalContentList v-if="items.length > 0" :items="items" class="my-6" />
    <p v-else class="dark:text-typography_primary_dark my-6">
      Loading reading list...
    </p>
    <p class="text-sm leading-sm dark:text-typography_primary_dark">
      <em
        >Powered by
        <a
          href="https://www.goodreads.com/"
          target="_blank"
          aria-label="Goodreads"
          rel="noopener noreferrer"
          >Goodreads</a
        >.</em
      >
    </p>
  </Section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const items = ref([]);

const cleanItem = (text) => {
  return text.replace(']]>', '').replace('<![CDATA[', '');
};

const safeGetItem = (el, tagName) => {
  const els = el.getElementsByTagName(tagName);
  return els.length > 0 ? cleanItem(els[0].innerHTML) : '';
};

onMounted(() => {
  // Feed is sorted by activity.
  const RSS_URL = `https://proxy.gonzalohirsch.com/goodreads`;
  fetch(RSS_URL)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      items.value = [...data.querySelectorAll('item')]
        // Map to [hasDate, element]
        .map((el) => {
          const nodes = el.getElementsByTagName('user_read_at');
          const text =
            nodes.length > 0 && nodes[0] !== undefined && nodes[0] !== null
              ? cleanItem(nodes[0].innerHTML)
              : '';
          return [text, el];
        })
        // Filter the ones without dates read.
        .filter((arr) => arr[0].length > 1)
        // Convert the dates.
        .map((arr) => [new Date(arr[0]), arr[1]])
        // Sort by the dates.
        .sort((a, b) => b[0] - a[0])
        // Get latest
        .splice(0, 10)
        .map((arr) => {
          const el = arr[1];
          let urlStr = el
            .querySelector('description')
            .innerHTML.replace(' ]]>', '')
            .replace('<![CDATA[\n<a href="', '');
          const imgUrl = safeGetItem(el, 'book_large_image_url');
          return {
            title: safeGetItem(el, 'title'),
            author: safeGetItem(el, 'author_name'),
            year: safeGetItem(el, 'book_published'),
            img: !imgUrl.includes('nophoto') ? imgUrl : undefined,
            url: urlStr.substring(0, urlStr.indexOf('"><img alt=')),
          };
        });
    });
});
</script>
