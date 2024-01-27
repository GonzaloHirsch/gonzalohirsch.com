---
dqid: 'nuxt-building-a-blog'
title: 'From zero to blog: Building with Nuxt 3 | Gonzalo Hirsch'
description: "Create a professional-looking blog in Nuxt 3 with this simple and effective guide. With step-by-step instructions, you'll quickly have a fully-functional blog."
headline: 'From zero to blog: Building with Nuxt 3'
excerpt: "Create a professional-looking blog in Nuxt 3 with this simple and effective guide. With step-by-step instructions, you'll quickly have a fully-functional blog."
date: '2023-03-22T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--zero-to-blog-building-with-nuxt-3.webp'
  mime: 'webp'
  alt: 'Illustration with the text "From zero to blog: Building with Nuxt 3"'
  width: 1200
  height: 630
faq:
  - question: 'What is Nuxt?'
    answer: 'Nuxt is an open source web framework built over Vue that offers an improved developer experience and optimized user experience. You can build sites using Single Page Applications (SPA), Static Site Generation (SSG), or Server Side Rendering (SSR) schemes. It has an active community and plenty of plugins and extensions available. Leveraging SSG deployments for static websites can boost your SEO without the burdens of SSR, especially in monetary terms.'
# tags: []
---

**What is Nuxt?** Nuxt is an open source web framework built over Vue that offers an improved developer experience and optimized user experience. You can build sites using Single Page Applications (SPA), Static Site Generation (SSG), or Server Side Rendering (SSR) schemes. It has an active community and plenty of plugins and extensions available. Leveraging SSG deployments for static websites can boost your SEO without the burdens of SSR, especially in monetary terms.

**Creating a blog using Nuxt 3 and Nuxt Content is a fantastic choice for developers and content creators to easily and quickly add blogs to your web pages**. The versatility of Nuxt 3 and the power of Nuxt Content can allow you to build any kind of blog imaginable. Follow this guide to create your Nuxt blog using Nuxt 3, Tailwind CSS, and Nuxt Content.

## Getting started with Nuxt 3

The first step for creating your Nuxt app using Nuxt 3 is to install Nuxt and scaffold the base app. I'll be using the Node package manager, but you can use Yarn if you'd like to:

```bash
npx nuxi init nuxt-blog-starter
cd nuxt-blog-starter
npm i
npm run dev
```

With the base app created, we can go ahead and add other dependencies for the base Nuxt project:

```bash
npm i -D @nuxtjs/tailwindcss
npm i @vueuse/core
```

We also need to create the TailwindCSS configuration file, `tailwind.config.js`:

```javascript[tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  theme: {
    extend: {
      colors: {
        'brand_primary': '#124BCF',
        'brand_secondary': '#5eceeb',
        'brand_secondary_saturated': '#5eceeb',
        'typography_primary': '#000000',
        'background': '#ffffff'
      },
      fontSize: {
        'xxs': '0.5rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'highlight': '5rem',
        'h1': '4rem',
        'h2': '3rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        'highlight_sm': '3.5rem',
        'h1_sm': '3rem',
        'h2_sm': '2.25rem',
        'h3_sm': '1.75rem',
        'h4_sm': '1.5rem',
        'h5_sm': '1.25rem'
      },
      lineHeight: {
        'xxs': '0.75rem',
        'xs': '1rem',
        'sm': '1.25rem',
        'base': '1.35rem',
        'lg': '1.45rem',
        'highlight': '5.5rem',
        'h1': '4.25rem',
        'h2': '3.25rem',
        'h3': '2.25rem',
        'h4': '1.75rem',
        'h5': '1.5rem',
        'highlight_sm': '3.75rem',
        'h1_sm': '3.25rem',
        'h2_sm': '2.5rem',
        'h3_sm': '2rem',
        'h4_sm': '1.75rem',
        'h5_sm': '1.5rem',
      },
      padding: {
        'section_x_sm': '1.5rem',
        'section_x': '5rem',
        'section_y_sm': '3rem',
        'section_y': '5rem'
      },
      spacing: {
        'nav': '4rem',
        'section_x': '5rem',
      }
    },
  },
  plugins: [],
}
```

The last step in the initial configuration and setup is to configure the `nuxt.config.ts` file with the build and Tailwind configuration:

```javascript[nuxt.config.ts]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    css: ['/assets/css/main.css'],
    ssr: true,
    experimental: {
        payloadExtraction: false
    },
    router: {
        options: {
            strict: false
        }
    },
    sourcemap: false
});
```

This configuration will ensure that **your NuxtJS project will build as a static website**. Any dynamic page we have in the future gets created during generation time for an SSG deployment.

Note that you will need to create an `assets/css/main.css` file for Tailwind, used later:

```css[/assets/css/main.css]
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
    scroll-behavior: smooth;
}

/* Headings */

h1 {
    @apply text-h1_sm leading-h1_sm mb-6;
}

h2 {
    @apply text-h2_sm leading-h2_sm mb-4;
}

h3 {
    @apply text-h3_sm leading-h3_sm mb-4;
}

h4 {
    @apply text-h4_sm leading-h4_sm mb-2;
}

h5 {
    @apply text-h5_sm leading-h5_sm mb-1;
}

@screen md {
    h1 {
        @apply text-h1 leading-h1;
    }

    h2 {
        @apply text-h2 leading-h2;
    }

    h3 {
        @apply text-h3 leading-h3;
    }

    h4 {
        @apply text-h4 leading-h4;
    }

    h5 {
        @apply text-h5 leading-h5;
    }
}

/* Body Text */

p {
    @apply text-base leading-base;
}
```

### Adding a sample index page

I'll add a sample index page so you can build the blog in any URL you want. To create the sample page, you need to have the following file `/pages/index.vue`, built as a Vue component:

```html[/pages/index.vue]
<template>
    <div class="flex flex-col items-center justify-center" style="height: 100vh">
        <h1 class="text-center">Welcome to the blog starter!</h1>
        <NuxtLink to="/blog/">Read the blog!</NuxtLink>
    </div>
</template>
```

Note that we don't have a `/blog/` route yet, so navigating to that page will result in a 404 error.

You also should change the `app.vue` file to use the Nuxt Router:

```html[app.vue]
<template>
    <main id="main">
        <NuxtPage/>
    </main>
</template>
```

Using the Nuxt Router in the `app.vue` allows you to have the `/pages` directory in your structure without importing any routes in a configuration.

## Integrating content management with Nuxt Content

After building a basic Nuxt application, adding the Nuxt Content module is next.

```bash
npm i -D @nuxt/content
```

We also have to configure the module after installing it. To configure it, we go to the `nuxt.config.ts` file and add the following:

```javascript[nuxt.config.ts]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    /* ... */
    content: {
        // Configuring code highlighting
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark',
            // Define languages you expect to use
            preload: ['java','javascript']
        },
        markdown: {
            // Configuring external link processing
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    }
});
```

The Nuxt Content module is a content management module. It allows you to **write your blog post in multiple formats, like Markdown**. It makes it simple to manage your blog and each article you post.

### Building blog pages and layouts

Although Nuxt Content handles content management, **it doesn't take care of the layouts or creating an article page**. **We need to add our Vue file**. Within our pages directory, we'll have the following structure:

```bash
pages
├── blog
│ ├── [...slug].vue
│ ├── index.vue
│ └── page
│   └── [number].vue
└── index.vue
```

Note the following files:

- `[...slug].vue` is the Vue file handling blog post rendering. It will act as a dynamic route for all blog URLs. It is the template for all blog post pages.
- `index.vue` is the Vue file that handles rendering the `/blog/` page, where we list all the blog posts.
- `[number].vue` is the Vue file that handles rendering paginated views of the `/blog/` page.

### Adding the blog rendering page

The page that renders a blog contains the following improvements: Structured data definitions for a blog post, OpenGraph/Twitter share card meta tags configuration, breadcrumbs, publish/update date, author, social media share, table of contents, and a list of articles to continue reading. Creating this file means adding components that lie [here](https://github.com/GonzaloHirsch/nuxt-blog-starter) and won't appear on this post for brevity. I will provide a brief overview of those components needed here:

```bash
...
├── components
│   ├── blog
│   │   ├── hero.vue
│   │   ├── list.vue
│   │   ├── pagination.vue
│   │   ├── relatedArticles.vue
│   │   └── tableOfContents.vue
│   ├── content
│   │   ├── ProseCode.vue
│   │   └── ProseImg.vue
│   ├── icons
│   │   ├── arrowUp.vue
│   │   ├── check.vue
│   │   ├── chevronDown.vue
│   │   ├── copy.vue
│   │   ├── facebook.vue
│   │   ├── github.vue
│   │   ├── gmail.vue
│   │   ├── instagram.vue
│   │   ├── linkedin.vue
│   │   ├── pinterest.vue
│   │   └── twitter.vue
│   ├── nav
│   │   ├── scrollTopIcon.vue
│   │   └── shareIcons.vue
│   ├── section.vue
│   └── sections
│       └── error.vue
├── content
│   └── authors.json
├── plugins
│   ├── format-date.ts
│   └── router.scrollBehaviour.js
...
```

Note the following:

- `/content/authors.json` contains information about authors that might write an article here.
- `/components/section.vue` and `/components/section/error.vue` are a section wrapper and an error section, respectively.
- `components/blog/` is a directory with various components used in the blog pages.
- `/components/icons/` and `/components/nav/` contain icons and components used for navigation, respectively.
- `/components/content/` provide extensions to existing Nuxt Content components for the Nuxt Image and Prose Code components. You can overwrite any other custom type that gets processed from Markdown here.
- `/plugins/` contains useful, custom plugins for dates and scrolling.

The dynamic route page for the slug looks like this:

```html[/pages/blog/[...slug].vue]
<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <Section id="blog-title" type="header">
                    <div
                        class="border-t-2 pt-8 border-typography_primary flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
                    >
                        <!-- Breadcrumbs -->
                        <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <a itemprop="item" href="/"> <span itemprop="name">Home</span></a>
                                <meta itemprop="position" content="1" />
                            </li>
                            <li class="separator">/</li>
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <a
                                    itemscope
                                    itemtype="https://schema.org/WebPage"
                                    itemprop="item"
                                    itemid="/blog/"
                                    href="/blog/"
                                >
                                    <span itemprop="name">Blog</span></a
                                >
                                <meta itemprop="position" content="2" />
                            </li>
                            <li class="separator">/</li>
                            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                <span itemprop="name">{{ doc.headline }}</span>
                                <meta itemprop="position" content="3" />
                            </li>
                        </ol>
                        <!-- Publish date -->
                        <span class="font-light text-typography_primary/75 dark:text-typography_primary_dark/75 mt-2 md:mt-0">{{
                            $formatDate(doc.date)
                        }}</span>
                    </div>
                    <!-- Headline -->
                    <h1 class="blog-post-text font-bold mb-4 md:mb-6 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center md:text-left">
                        {{ doc.headline }}
                    </h1>
                    <p class="blog-post-text mb-8 md:w-8/12 md:text-lg md:leading-lg text-center md:text-left">{{ doc.excerpt }}</p>
                    <div
                        class="border-b-2 pb-8 border-typography_primary dark:border-typography_primary_dark flex flex-col md:flex-row items-center md:justify-between mt-12 md:mt-4"
                    >
                        <!-- Author -->
                        <div class="flex flex-row items-center justify-center">
                            <span class="blog-post-text text-lg leading-lg font-light"
                                >By
                                <a class="hover:underline italic" :href="doc.authorUrl" target="_blank" rel="noopener noreferrer">{{
                                    doc.author
                                }}</a></span
                            >
                        </div>
                        <!-- Social Share -->
                        <div class="mt-6 md:mt-0">
                            <NavShareIcons :headline="doc.headline" :excerpt="doc.excerpt" :path="doc._path + '/'" />
                        </div>
                    </div>
                </Section>
                <!-- Content -->
                <Section id="main" class="!pt-0 relative grid grid-cols-10 gap-8 lg:gap-12">
                    <!-- Table of Contents -->
                    <aside class="col-span-full md:col-span-3 md:hidden">
                        <div class="blog-post-text blog-aside-wrapper mb-2">
                            <BlogTableOfContents :links="doc.body?.toc?.links" />
                        </div>
                    </aside>
                    <article class="prose col-span-full md:col-span-7 relative">
                        <!-- Update date -->
                        <span
                            v-show="doc.dateUpdated"
                            class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75"
                            >(Updated: {{ $formatDate(doc.dateUpdated) }})</span
                        >
                        <!-- Blog content -->
                        <ContentRenderer :value="doc" class="blog-content blog-post-text" />
                    </article>
                    <aside class="col-span-full md:col-span-3 blog-aside h-fit">
                        <!-- Mobile Table of Content -->
                        <div class="!hidden blog-aside-wrapper md:!flex mb-4">
                            <BlogTableOfContents :links="doc.body?.toc?.links" class="blog-post-text" />
                        </div>
                        <!-- Related articles -->
                        <div v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0" class="blog-aside-wrapper">
                            <BlogRelatedArticles :surround="data?.surround" class="blog-post-text" />
                        </div>
                    </aside>
                </Section>
                <!-- Scroll to top -->
                <NavScrollTopIcon />
            </template>
            <!-- Error in case not found -->
            <template #not-found>
                <SectionsError />
            </template>
        </ContentDoc>
    </main>
</template>

<script setup>
const { $formatDate } = useNuxtApp();
const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');
const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
    // Remove a trailing slash in case the browser adds it, it might break the routing
    // fetch document where the document path matches with the cuurent route
    let article = queryContent('/blog').where({ _path: cleanPath }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent('/blog').sort({ date: -1 }).only(['_path', 'headline', 'excerpt']).findSurround(cleanPath, { before: 1, after: 1 });
    return {
        article: await article,
        surround: await surround
    };
});

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());

// Set the meta
const baseUrl = 'https://example.com';
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image = baseUrl + (data.value?.article?.socialImage.src || '/sample.webp');

// JSON+LD
const jsonScripts = [
    {
        type: 'application/ld+json',
        children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://example.com/'
            },
            url: canonicalPath,
            image: image,
            headline: data.value?.article?.headline,
            abstract: data.value?.article?.excerpt,
            datePublished: data.value?.article?.date,
            dateModified: data.value?.article?.dateUpdated || data.value?.article?.date,
            author: authorData.value[data.value?.article?.author],
            publisher: authorData.value['Gonzalo Hirsch']
        })
    }
];
useHead({
    title: data.value?.article?.title,
    meta: [
        { name: 'author', content: data.value?.article?.author },
        { name: 'description', content: data.value?.article?.description },
        { property: 'article:published_time', content: data.value?.article?.date.split('T')[0] },
        // OG
        { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline },
        { hid: 'og:url', property: 'og:url', content: canonicalPath },
        { hid: 'og:description', property: 'og:description', content: data.value?.article?.description },
        { hid: 'og:image', name: 'image', property: 'og:image', content: image },
        { hid: 'og:type', property: 'og:type', content: 'Article' },
        { hid: 'og:image:type', property: 'og:image:type', content: `image/${data.value?.article?.socialImage.mime}` },
        { hid: 'og:image:width', property: 'og:image:width', content: data.value?.article?.socialImage.width || 190 },
        { hid: 'og:image:height', property: 'og:image:height', content: data.value?.article?.socialImage.height || 190 },
        { hid: 'og:image:alt', property: 'og:image:alt', content: data.value?.article?.socialImage.alt },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: data.value?.article?.headline },
        { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
        { hid: 'twitter:description', name: 'twitter:description', content: data.value?.article?.description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: data.value?.article?.socialImage.alt }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: canonicalPath
        }
    ],
    script: jsonScripts
});
</script>

<style scoped>
.blog-aside {
    @apply sticky;
    top: calc(theme('spacing.nav') + 0.25rem);
}
.blog-aside-wrapper {
    @apply flex flex-col border-t-2 border-b-2 border-typography_primary py-4;
}
.blog-post-text {
    @apply text-typography_primary;
}
.separator {
    @apply mx-1;
}
</style>
```

### Adding other blog pages

We are missing two critical blog pages, the page that renders a list of articles and a page that shows a page in the list of posts. You will probably have many blog posts, so I recommend having pagination on both pages so loading times are consistent. Each of those pages performs a query for the given blog page and shows the list along with a hero.

The `index.vue` blog page component looks like this:

```html[/pages/blog/index.vue]
<template>
    <main>
        <BlogHero />
        <Section id="main" class="!pt-0">
            <ContentQuery
                path="/blog"
                :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
                :sort="{
                    date: -1
                }"
                :limit="blogCountLimit"
                v-slot="{ data }"
            >
                <BlogList :data="data" />
            </ContentQuery>
            <BlogPagination
                v-if="data > 1"
                class="mt-8"
                :currentPage="1"
                :totalPages="data"
                :nextPage="data > 1"
                baseUrl="/blog/"
                pageUrl="/blog/page/"
            />
        </Section>
    </main>
</template>

<script setup>
// Find the number of blogs present
const blogCountLimit = 6;
const { data } = await useAsyncData(`content-/blog`, async () => {
    const _posts = await queryContent('/blog').only('headline').find()
    return Math.ceil(_posts.length / blogCountLimit);
});
</script>
```

While the dynamic route `[number].vue` component looks like this:

```html[/pages/blog/page/[number].vue]
<template>
    <main>
        <!-- Query for the given blog page number -->
        <ContentQuery
            path="/blog"
            :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
            :sort="{
                date: -1
            }"
            :skip="blogCountLimit * (getPageNumber() - 1)"
            :limit="blogCountLimit"
        >
            <!-- In case it is found -->
            <template v-slot="{ data }">
                <BlogHero />
                <Section id="main" class="!pt-0">
                    <BlogList :data="data" />
                    <ContentQuery
                        path="/blog"
                        :only="['headline']"
                    >
                        <template v-slot="{ data }">
                            <BlogPagination
                                v-if="getPageLimit(data.length) > 1"
                                class="mt-8"
                                :currentPage="getPageNumber()"
                                :totalPages="getPageLimit(data.length)"
                                :nextPage="getPageNumber() < getPageLimit(data.length)"
                                baseUrl="/blog/"
                                pageUrl="/blog/page/"
                            />
                        </template>
                        <template #not-found>
                            <!-- Nothing -->
                        </template>
                    </ContentQuery>
                </Section>
            </template>
            <!-- In case not found -->
            <template #not-found>
                <!-- Show hero and message -->
                <BlogHero />
                <Section id="main" class="!pt-0">
                    <BlogList :data="[]" message="There are no posts in this page, maybe try searching on another one."/>
                </Section>
            </template>
        </ContentQuery>
    </main>
</template>

<script setup>
// Fetching data
const { path, params } = useRoute();
const blogCountLimit = 6;

const getPageLimit = (totalPosts) => {
    return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
    return Number(params.number);
};

// Attempt to get the number
const router = useRouter();
let pageNo;
try {
    pageNo = getPageNumber();
    if (isNaN(pageNo) || pageNo <= 0) {
        router.replace('/blog/');
    }
} catch (err) {
    console.error(err);
    router.replace('/blog/');
}
</script>

```

Both pages use components and plugins defined above.

### Adding blog content

The last missing step for the blog is adding the blog content. In the content folder, you can add your [Markdown](https://content.nuxt.com/usage/markdown/) files (`/content/blog/example.md`). These files from the content folder use the blog template from above to render the complete article.

## Deploying the blog with Nuxt 3

After using the starter template, you might want to deploy your blog for everyone to read. Before deploying it, I recommend checking out [my SEO guide](/blog/boosting-website-seo-and-organic-search-performance/) to improve your blog and page SEO for better organic growth.

Note that the `package.json` file includes a command called Generate. This command generates all the static files ready for deployment in any static hosting like Netlify, Vercel, or AWS. Nuxt offers a [comprehensive guide](https://v2.nuxt.com/deployments/) to deploying sites in different providers. I recommend reading that guide and checking [my guide on caching](/blog/ultimate-guide-ssg-caching-with-nuxt-3/) for Nuxt sites.

## Closing thoughts

Creating a blog with Nuxt 3 is a simple process. In this particular example, I provide many files and configurations for the starter template. Nuxt 3 and Nuxt Content offer many configuration options and the possibility of expansion with custom components. In this case, I provided custom components for code blocks and images, but you can even write custom Vue components to import directly into a blog Markdown file. I invite you to continue working on the starter template, set your style to the blog and extend it.

_You can find the entire code [here](https://github.com/GonzaloHirsch/nuxt-blog-starter)._
