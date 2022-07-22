---
title: 'Test Blog | Blog | Gonzalo Hirsch'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam. Risus commodo viverra maecenas accumsan lacus.'
headline: "Test Blog #1"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum tempus egestas sed sed risus pretium quam. Risus commodo viverra maecenas accumsan lacus."
publishDate: "2022-07-20T12:00:00"
author: "Gonzalo Hirsch"
authorUrl: "https://www.linkedin.com/in/gonzalo-hirsch/"
image:
    src: ''
    alt: ''
    width: 400
    height: 400
tags: []
---

<!-- ./content/blog/first-post.md -->

## My first blog post
Welcome to my first blog post using \[content v2 module\](https://content.nuxtjs.org/)
Hey there! 👋🏾
This is my first blog post learning nuxt content.
I'm currently building it using the following:
- Nuxt.js
- Nuxt Content module
- TailwindCSS
    - TailwindCSS typography

## Nuxt.js
\[Nuxt\](https://nuxtjs.org/) is a powerful Vue framework that offers excellent development features such as server-side rendering.

```bash
npx nuxi init nuxt-app
cd nuxt-app
yarn install
yarn dev -o
```

```javascript
// ./nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
    // My Nuxt config
})
```

## Nuxt content module
Empower your NuxtJS application with \[@nuxt/content module\](https://content.nuxtjs.org/): write in a content/ directory and fetch your Markdown, JSON, YAML, XML, and CSV files through a MongoDB-like API, acting as a Git-based Headless CMS.

You can get started with Nuxt Content by installing a new project.

```bash
npx nuxi init content-app -t content
```

## TailwindCSS
Rapidly build modern websites without ever leaving your HTML. \[TailwindCSS\](https://tailwindcss.com/) is A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design directly in your markup.

### TailwindCSS Typography
\[Typography\](https://tailwindcss.com/docs/typography-plugin) is a plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown or pulled from a CMS).
