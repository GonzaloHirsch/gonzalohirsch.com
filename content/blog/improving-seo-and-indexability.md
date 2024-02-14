---
dqid: 'improving-seo-and-indexability'
title: 'Improving SEO and Indexability with Ahrefs Site Auditing'
description: 'Learn how to improve SEO and website indexability using Ahrefs for site auditing and website health monitoring. Follow these actions to boost your SEO score.'
headline: 'Improving SEO and Indexability with Ahrefs Site Auditing'
excerpt: 'Learn how to improve SEO and website indexability using Ahrefs for site auditing and website health monitoring. Follow these actions to boost your SEO score.'
date: '2024-02-14T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--improving-seo-and-indexability.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Improving SEO and Indexability with Ahrefs Site Auditing"'
  width: 1200
  height: 630
faq:
  - question: 'How do I plan to manage the newsletter?'
    answer: "From this point onwards, the monthly newsletters will run on the second Wednesday of every month. I have also decided to send updates each time I post a new article instead of doing it in the digest. You might see that I'm new to this, so I'm finding out what works best within my limitations. I will be uploading the monthly newsletter of the previous month each following month to ensure there's a record of them on my site for people to know what they're missing."
  - question: 'What to look out for in the upcoming newsletter?'
    answer: "One topic I discuss with multiple people and find lacking is job search and how to significantly improve your chances of getting the job you want. Next month's newsletter will cover a great deal, so stay tuned!"
# tags: []
---

::inlineQuote
This blog post was sent as part of the [newsletter](/#signup) to all subscribers on January 19th, 2024. To receive the latest extra content, consider subscribing to the newsletter.
::

Hi! This month, the digest packs a punch. It has updates, ideas, opinions, and even some surprises. It includes topics to look out for in blog posts, where I was featured, my latest project, and more.

## Improving SEO & Indexability

Recently, I discovered [Ahrefs](https://ahrefs.com/), a website monitoring tool. As you might know from some of my blog posts, I emphasize my website's indexability and health. This tool has been essential in understanding my website's indexability and other issues. It has a generous free plan that will help you diagnose your domain's health. Some of the actions I've taken:

- Correcting 3XX errors on my blog posts for link quality.
- Correcting orphaned pages with no links by adding a Sitemap page (more on this below).
- Adding missing robots.txt or sitemaps to other subdomains.
- Correcting issues from other subdomains within the main domain.

I highly recommend considering adding a Sitemap page to your website since it can improve your internal linking structure. Don't confuse the sitemap.xml with a sitemap page. The latter is a page with links to every single page on your website.

Please note that the free plan has considerable limitations, but the free features are still helpful. See in the example below how I managed to improve the metric "Domain Health" by reducing the number of pages with errors:

![Reduction in errors with each subsequent scrape.](/img/blog--improving-seo-and-indexability-1.webp)

![Overall distribution of issues per scrape.](/img/blog--improving-seo-and-indexability-2.webp)

## Achievements

I started my blog to get some ideas out of my head, experiment with writing more (also to help improve my writing skills), and dive deeper into SEO and how to write performing content. I never imagined that I would start a newsletter, less gain visibility by some of the pieces I write.

One of the features of Ahrefs is getting visibility into some of the domains that refer to your sites. Using this, I discovered that a couple of external websites featured my posts:

- https://masteringnuxt.com/blog/10-of-the-best-nuxt3-tutorials
- https://mtype.com/bookmarks/nuxt/
- https://vrgamenews.com/vr-headset-under-70/

It makes me happy to see people using the content I produce!

## Weekend Projects: Digital Art and Computer Graphics

One of my latest interests was digital art via shader programming. The pieces you create can be captivating, and the possibilities are endless. I have always found computer graphics programming (shaders) compelling, but I never had the time to play around with it until I came across [this video](https://www.youtube.com/watch?v=f4s1h2YETNY). That tutorial for shader programming was one of the best I've ever seen, and it prompted me to start playing around with it.

After playing around with a few shaders in [ShaderToy](https://shadertoy.com/), I wanted to export them to be able to upload them somewhere else. I could do it locally on my computer, but my engineering mind wanted me to have it rendered on a pipeline. That was my project from a couple of weekends ago.

I wanted to create a pipeline that would take my GLSL files and render them in GitHub Actions. With time, this proved to be more complicated than I anticipated. The main complication was that GitHub Actions are Docker runners, so they have no screen buffers. It complicates the whole operation.

I found a way to simulate a screen buffer and forked a [repository for shader rendering](https://github.com/GonzaloHirsch/shadertoy-to-video) to adapt it to the problem I was solving. I put together a [pipeline in GitHub](https://github.com/GonzaloHirsch/shader-playground) Actions that would render my shaders, freeing my computer from having to render it. Headless rendering is not an easy problem, but being able to render headlessly in GitHub Actions is cool.

## How do I plan to manage the newsletter?

From this point onwards, the **monthly newsletters will run on the second Wednesday of every month**. I have also decided to send updates each time I post a new article instead of doing it in the digest. You might see that I'm new to this, so I'm finding out what works best within my limitations.

I will be uploading the monthly newsletter of the previous month each following month to ensure there's a record of them on my site for people to know what they're missing.

## What to look out for in the upcoming newsletter?

One topic I discuss with multiple people and find lacking is job search and how to significantly improve your chances of getting the job you want. Next month's newsletter will cover a great deal, so stay tuned!

Thank you for sticking with me while I figure this out!

Happy reading!
