---
dqid: 'nuxt-tailwind-dark-mode'
title: 'Configuring Dark Mode for Tailwind CSS in Nuxt 3 | Gonzalo Hirsch'
description: "Learn how to configure Dark Mode for Tailwind CSS in Nuxt 3 with this comprehensive tutorial, enhancing your website's aesthetics and user experience."
headline: 'Step-by-Step Guide: Configuring Dark Mode for Tailwind CSS in Nuxt 3'
excerpt: "Learn how to configure Dark Mode for Tailwind CSS in Nuxt 3 with this comprehensive tutorial, enhancing your website's aesthetics and user experience."
date: '2023-07-02T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--dark-mode-with-tailwind-css-in-nuxt-3.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Configuring Dark Mode for Tailwind CSS in Nuxt 3"'
  width: 1200
  height: 630
faq:
  - question: 'What is Tailwind CSS?'
    answer: "Tailwind CSS is an open-source, utility-first CSS framework that simplifies web development by providing ready-to-use utility classes. You can quickly build responsive and customizable user interfaces without writing custom CSS from scratch. The latest version of Tailwind CSS natively supports the Dark Theme (and Light Mode, of course!), so it's perfect for this. Also, Tailwind natively supports media breakpoints, so it helps you define a media strategy for your application."
  - question: 'What is Nuxt?'
    answer: 'Nuxt is an open-source web JavaScript framework built over Vue that offers an improved developer experience and optimized user experience. It has a very active community and a comprehensive list of plugins, some of which help seamlessly integrate Tailwind CSS into your Nuxt 3 app.'
# tags: []
---

**Dark Mode is the most coveted theme across the software development community**. It provides a visually appealing alternative for users who prefer to work in low-light environments. Dark Mode is not only a trend. Dark Mode makes your users feel included and helps you keep up with design trends. In this post, I'll show you how you can easily configure the Tailwind CSS Dark Mode in a Nuxt application!

**What is Tailwind CSS?** Tailwind CSS is an open-source, utility-first CSS framework that simplifies web development by providing ready-to-use utility classes. You can quickly build responsive and customizable user interfaces without writing custom CSS from scratch. The latest version of Tailwind CSS natively supports the Dark Theme (and Light Mode, of course!), so it's perfect for this. Also, Tailwind natively supports media breakpoints, so it helps you define a media strategy for your application.

**What is Nuxt?** Nuxt is an open-source web JavaScript framework built over Vue that offers an improved developer experience and optimized user experience. It has a very active community and a comprehensive list of plugins, some of which help seamlessly integrate Tailwind CSS into your Nuxt 3 app.

## Adding Tailwind CSS to a Nuxt 3 application

Adding Tailwind CSS to a Nuxt 3 app is very simple. Start by installing the Tailwind plugin for Nuxt 3 in your project:

```bash
npm install --save-dev @nuxtjs/tailwindcss
```

Once you have Tailwind installed, you add the plugin to the Nuxt 3 configuration (`nuxt.config.ts`):

```typescript[nuxt.config.ts]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
});
```

Once you have declared the plugin in the Nuxt app configuration, you will create the Tailwind configuration file, which holds all your Tailwind config:

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
}
```

That's all you need to do! If you want extra guidance on some more complex configurations, go to the Nuxt Tailwind plugin [site](https://tailwindcss.nuxtjs.org/getting-started/setup/). With this minimal Tailwind config, you can use the Tailwind classes in your Nuxt project. Note that by default, your Tailwind config is working on Light Mode. Later on, we'll add a Dark Mode switcher to our application so you can experience the Dark Mode variant. Head to the Tailwind site for a [comprehensive list](https://tailwindcss.com/docs/aspect-ratio) of all the Tailwind CSS classes that you have available.

## Adding Nuxt Color Mode to a Nuxt 3 application

[Nuxt Color Mode](https://color-mode.nuxtjs.org/) is the base of this simple implementation of the Dark Mode functionality in our application. It is a simple yet powerful plugin for Nuxt 3. Using this plugin, you can easily toggle the dark variant of your site, taking into account the system preference and system settings to provide an enhanced user experience.

Start by installing the plugin in your Nuxt 3 app:

```bash
npm install --save-dev @nuxtjs/color-mode
```

Once you have the plugin installed, add it to the Nuxt 3 configuration (`nuxt.config.ts`) with the following config:

```typescript[nuxt.config.ts]
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light'
    },
}
```

A special note on the settings:

- `classSuffix` determines the namespace added at the end of the dark color scheme class. **If you want to simplify your Tailwind config, leave it empty, but don't remove it**.
- `preference` determines the default theme selected for your user when they visit your site initially. In my case, I prefer if they use the Light Theme when they land.
- `fallback` determines the theme if there is no system settings preference.

Once you configure the Color Mode plugin, go ahead and add one last setting to the Tailwind config file:

```javascript[tailwind.config.js]{12}
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
  darkMode: 'class',
}
```

You are all set! You can now use the `dark:` directive for Tailwind in any Nuxt 3 component to create a powerful component variant, but you still need a theme switcher to leverage your Dark Mode feature.

## Creating a Nuxt 3 Theme Switcher component

One of the main advantages of the Nuxt Color Mode plugin is that it handles saving the user's choice so it becomes the current theme the next time they visit. It makes your site snappier than doing it yourself, and your Dark Mode toggle component is simplified.

Start by creating a new component in your Nuxt project components folder and adding the following code:

```html[/components/buttons/themeSwitch.vue]
<template>
    <div class="flex flex-row items-center justify-center">
        <IconsNight
            v-show="colorMode.preference === 'light'"
            class="theme-icon text-typography_primary_light dark:text-typography_primary_dark"
            width="28"
            height="28"
            @click="toggleTheme"
        />
        <IconsLight
            v-show="colorMode.preference === 'dark'"
            class="theme-icon text-typography_primary_light dark:text-typography_primary_dark"
            width="28"
            height="28"
            @click="toggleTheme"
        />
    </div>
</template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-icon {
    @apply w-7 h-7 cursor-pointer transition-transform duration-100;
}
.theme-icon:hover {
    @apply scale-125;
}
</style>
```

Note that the only necessary code to import the Nuxt Color Mode plugin is this:

```html
<script setup>
  const colorMode = useColorMode();
  const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  };
</script>
```

You can then toggle the dark class by using an HTML select, but in my case, I wanted some nice icons with hover effects. Using Tailwind CSS, the light and dark mode option icons have a simple hover effect. Import the component in any of your Vuejs pages for Nuxt 3, and you are all set!

Remember, you can still use their default theme of choice if you choose the system preference setting.

See it in action! Look how quickly the background color and text color change. They also persist well after a reload!

![Example of Dark Mode and Light Mode toggle.](/img/blog--dark-mode-with-tailwind-css-in-nuxt-3--example.gif)

## Takeaway

**By combining Nuxt 3, Vuejs, Tailwind CSS, and Nuxt Color Mode, you can add Dark Mode support in less than 20 minutes**. As you have seen, the implementation is simple yet powerful. A dark version provides a visually appealing alternative for users who prefer to work in low-light environments, makes them feel included, and helps you keep up with design trends.

Read more of my Nuxt 3 guides, such as [my guide on Nuxt 3 SSG caching](/blog/ultimate-guide-ssg-caching-with-nuxt-3/), [adding a blog to a Nuxt 3 Application](/blog/zero-to-blog-building-with-nuxt-3/), and [integrating a free newsletter feature to Nuxt 3](/blog/nuxt-3-free-newsletter-integration/). If none of those appeal to you, subscribe to the newsletter for a heads-up for future posts!
