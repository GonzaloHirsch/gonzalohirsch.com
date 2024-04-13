---
dqid: 'optimising-nuxt-ssg-site-for-page-speed'
title: 'Optimising a Nuxt SSG site for Page Speed'
description: 'Optimize your Nuxt SSG (Static Site Generation) app for page speed to benefit from improved User Experience and loading times with this guide and my experience.'
headline: 'Optimising a Nuxt SSG site for Page Speed'
excerpt: 'Optimize your Nuxt SSG (Static Site Generation) app for page speed to benefit from improved User Experience and loading times with this guide and my experience.'
date: '2024-04-13T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--optimising-nuxt-ssg-site-for-page-speed.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Optimising a Nuxt SSG site for Page Speed"'
  width: 1200
  height: 630
faq:
  - question: 'What is the best Nuxt 3 SSR cache configuration?'
    answer: 'Ensure all files that contain their MD5 in their path have a long-lived cache control configuration, while resources like HTML files should have a short-lived cache configuration. You should consider hosting your assets (fonts, CSS, etc). Consider using a Content Delivery Network (CDN) service to guarantee minimal latency with your users.'

  - question: 'What options for Nuxt Image should I use?'
    answer: "Lazy loading and dynamic sizes. Using the `loading='lazy'` attribute, you ensure that Nuxt doesn't load and render the image if it's not within view. It defers loading images when landing on the site, improving loading times. Using the `sizes` attribute, you ensure that images are correctly sized depending on the viewport. Nuxt Image renders out an `img` tag with the appropriate attributes. It reduces loading times on mobile since it gets smaller images from the servers."

  - question: 'What is delayed hydration?'
    answer: 'Delayed hydration is a process that prevents the Nuxt app from automatically hydrating the site when landing on it. Since hydration is a resource-intensive process, you can attempt to delay loading components that are unnecessary when the user lands on your site.'

  - question: 'What is hydration?'
    answer: 'Hydration occurs on the client side when the Nuxt app takes the HTML from the site and adds functionality via JavaScript. It is a process that automatically happens when you load an SSG or SPA site.'

  - question: 'How can I identify the size of my JavaScript bundle?'
    answer: 'Using the `nuxt analyze` command to understand what goes on in your Nuxt SSG bundle. You can visualize the size of each library/JavaScript file you are shipping.'

  - question: 'What is Cumulative Layout Shift (CLS)?'
    answer: 'It measures how much elements move in your rendered website after loading all the assets. You tend to see high CLS when images have an unknown size or default fonts have different sizes to the loaded ones.'
# tags: []
---

**Page Speed Insights (PSI) is a commonly used tool for measuring UX metrics**. Part of the measures it computes are actual page speed metrics for mobile and desktop users. Web developers already using Nuxt **switch to Nuxt SSG (Static Site Generation) to improve some of the SEO and page speed metrics, but you might find that your page is still lacking in mobile and desktop speed**. In this piece, I'll walk you through optimizations you can add to your static generation site to improve your page speed scores.

I've been running my site hosting a [Nuxt blog](/blog/zero-to-blog-building-with-nuxt-3/) (using the Nuxt Content module) for quite some time now, so I've gathered skills in optimizing my [Nuxt blog](/blog/zero-to-blog-building-with-nuxt-3/). To ensure you get the best page speed scores possible, you can implement these improvements:

- Configure optimal Nuxt 3 SSR cache options.
- Use Nuxt Image for images.
- Lazy loading components.
- Use delayed hydration.
- Eliminate unused JavaScript.
- Avoid significant layout shifts.

## Optimal Nuxt 3 SSR cache configuration

Since I have covered this in my blog posts on [Nuxt 3 SSR cache](/blog/ultimate-guide-ssg-caching-with-nuxt-3/), I won't cover it here in detail. The main takeaway is to **ensure all files that contain their MD5 in their path have a long-lived cache control configuration, while resources like HTML files should have a short-lived cache configuration.** You can achieve these configurations with AWS Cloudfront and AWS S3.

As part of your Nuxt Static Site Generation strategy, you should consider **hosting your assets** (fonts, CSS, etc). It **gives you control over the compression and cache that you serve your assets with**.

To ensure your loading times are optimal, consider using a Content Delivery Network (CDN) service to guarantee minimal latency with your users.

## Using Nuxt Image for images

The [Nuxt Image](https://image.nuxt.com/usage/nuxt-img) module renders an `img` tag in the rendered HTML and provides speed improvements over using `img` tags yourself.

These are the configurations you should be mostly aware of when optimizing your Nuxt application for page speed:

- **Lazy loading**: Using the `loading="lazy"` attribute, you ensure that Nuxt doesn't load and render the image if it's not within view. It defers loading images when landing on the site, improving loading times.
- **Dynamic sizes**: Using the `sizes` attribute, you ensure that images are correctly sized depending on the viewport. Nuxt Image renders out an `img` tag with the appropriate attributes. It reduces loading times on mobile since it gets smaller images from the servers.

## Lazy loading components

Using **lazy loading for non-critical components** can defer loading their JS files after the initial load, which is great if your Vue component is not critical. You can do this by prefixing `Lazy` to the components.

The performance changes are insignificant, but in theory, they help the Nuxt project load faster.

## Using delayed hydration

**What is hydration?** Hydration occurs on the client side when the Nuxt app takes the HTML from the site and adds functionality via JavaScript. It is a process that automatically happens when you load an SSG or SPA site.

**What is delayed hydration?** Delayed hydration is a process that prevents the Nuxt app from automatically hydrating the site when landing on it. Since hydration is a resource-intensive process, you can attempt to delay loading components that are unnecessary when the user lands on your site.

Using the [nuxt-delay-hydration](https://github.com/harlan-zw/nuxt-delay-hydration) module, you can specify components to load later. It optimizes initial loading times, making your site faster in the eyes of Google. Implementing the `manual` configuration yielded better results in my case. You should configure the following:

```javascript [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    //...
    'nuxt-delay-hydration',
  ],
  delayHydration: {
    mode: 'manual',
    debug: process.env.NODE_ENV === 'development',
  },
  //...
});
```

```html [pages/index.vue]
<DelayHydration>
  <LazyComponent />
</DelayHydration>
```

You can wrap any components that are not essential during the initial load or should not be visible during that time.

Note that using Server Side Rendering generally eliminates the hydration issue, but in this scenario for static site generation, we have to deal with it.

## Eliminating unused JavaScript

It goes without saying that if you have code you are not using, you should remove it. The same concept applies to libraries.

You should consider using your implementations if you only use a small portion of a library, but it takes a significant portion of your loading time.

Consider using the `nuxt analyze` command to understand what goes on in your Nuxt SSG bundle. You can visualize the size of each library/JavaScript file you are shipping.

## Avoid significant layout shifts

One of the relevant metrics for Page Speed is the [Cumulative Layout Shift](https://web.dev/articles/cls) (CLS). It measures how much elements move in your rendered website after loading all the assets. You tend to see high CLS when images have an unknown size or default fonts have different sizes to the loaded ones.

**To reduce layout shifts, you can use the Nuxt Image module to set the width and height of images.** Even if you don't know the exact size, an approximation will help you reduce the layout shift.

If you pick fonts contributing to significant layout shifts, **properly size the elements around them to prevent movement.**

## How to optimize a site for page speed?

Most web developers only look at page speed for their landing page route, but your users might not even be landing there. That's why **you should look at every route that your site offers.** To do so, you can use [Unlighthouse](https://unlighthouse.dev/) to analyze every route your Nuxt project has.

## Takeaways

**Optimizing a Nuxt Static Site Generation (SSG) website is not easy.** Most optimizations shave only milliseconds of loading time, which, according to Google, [can impact your User Experience](https://designingforperformance.com/performance-is-ux/).

With these strategies for optimization, **you can ensure that your site is up to the task of delivering the correct experience for end users.** After that, you will still need to improve your content to see organic growth, but having good SEO and performance will help your site grow organically. For information on SEO optimization, you can visit my blogs on [improving SEO and indexability](/blog/improving-seo-and-indexability/).

::backToBasics

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future implementations.

::basicExpand{heading="What is the best Nuxt 3 SSR cache configuration?" componentType="h3"}
#description
Ensure all files that contain their MD5 in their path have a long-lived cache control configuration, while resources like HTML files should have a short-lived cache configuration. You should consider hosting your assets (fonts, CSS, etc). Consider using a Content Delivery Network (CDN) service to guarantee minimal latency with your users.
::

::basicExpand{heading="What options for Nuxt Image should I use?" componentType="h3"}
#description
Lazy loading and dynamic sizes. Using the `loading="lazy"` attribute, you ensure that Nuxt doesn't load and render the image if it's not within view. It defers loading images when landing on the site, improving loading times. Using the `sizes` attribute, you ensure that images are correctly sized depending on the viewport. Nuxt Image renders out an `img` tag with the appropriate attributes. It reduces loading times on mobile since it gets smaller images from the servers.
::

::basicExpand{heading="What is delayed hydration?" componentType="h3"}
#description
Delayed hydration is a process that prevents the Nuxt app from automatically hydrating the site when landing on it. Since hydration is a resource-intensive process, you can attempt to delay loading components that are unnecessary when the user lands on your site.
::

::basicExpand{heading="What is hydration?" componentType="h3"}
#description
Hydration occurs on the client side when the Nuxt app takes the HTML from the site and adds functionality via JavaScript. It is a process that automatically happens when you load an SSG or SPA site.
::

::basicExpand{heading="How can I identify the size of my JavaScript bundle?" componentType="h3"}
#description
Using the `nuxt analyze` command to understand what goes on in your Nuxt SSG bundle. You can visualize the size of each library/JavaScript file you are shipping.
::

::basicExpand{heading="What is Cumulative Layout Shift (CLS)?" componentType="h3"}
#description
It measures how much elements move in your rendered website after loading all the assets. You tend to see high CLS when images have an unknown size or default fonts have different sizes to the loaded ones.
::
::
