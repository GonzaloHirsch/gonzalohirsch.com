---
title: 'Ultimate guide on SSG caching for Nuxt 3 | Gonzalo Hirsch'
description: 'SSG leverages the benefits of SSR in terms of SEO while keeping costs down and providing a fast user experience. Proper cache configuration can make the user experience of your site far better.'
headline: 'Ultimate guide on SSG caching for Nuxt 3'
excerpt: 'SSG leverages the benefits of SSR in terms of SEO while keeping costs down and providing a fast user experience. Proper cache configuration can make the user experience of your site far better.'
date: '2023-01-14T12:00:00'
dateUpdated: ""
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
    src: '/img/blog--ultimate-guide-ssg-caching-with-nuxt-3.webp'
    mime: 'webp'
    alt: 'Illustration with the text "Ultimate guide on SSG caching for Nuxt 3"'
    width: 1200
    height: 630
# tags: []
---

It is no secret that Server Side Rendering (SSR) sites have a huge SEO advantage compared to hosting a Single Page Application (SPA), where rendering happens on the client side. But the main pitfall of SSR is the associated cost. It is expensive to provision the servers to do the rendering. What if I told you there is a better way to create and host your sites? Enter Static Site Generation (SSG).

With SSG, you can render your static site offline, upload it to object storage, and serve it. This approach leverages the benefits of SSR in terms of SEO while keeping costs down and providing a fast user experience. Proper cache configuration can make the user experience of your site far better.

[Nuxt.js](https://nuxt.com/docs/getting-started/introduction) has been around for some time, but [recently they launched](https://nuxt.com/v3) their 3.0.0 stable version of the framework. Although the product is fantastic, they lack one main documentation item: how to cache your static site and its static files. Let me give you my ultimate guide on SSG caching for Nuxt 3.

## What is Server Side Rendering?

SSR is the process of rendering your application files on your servers. It means that whenever someone accesses a route in your app, the request goes to the server, the server generates the content, and you get a static HTML file. Almost no Javascript code runs on the client side.

There are multiple options for a framework that performs SSR. The most common ones (Nuxt.js, [Next.js](https://nextjs.org/)) allow you to build a NuxtJS App or a NextJS app.

## What is a Single Page Application?

In a SPA, there is only one actual route within your app, but the router in your application simulates different pages by changing the components.
For example, in a VueJS app, the Vue Router intercepts requests from the user wanting to change the route and swaps the VueJS components. It allows fast, responsive navigation between routes but a faster initial loading time.

This rendering scheme works for a web application requiring rich client-side interaction. 

## What is Static Site Generation?

In SSG, you use a Static Site Generator framework to pre-render your static website offline and then upload all the files to a distribution platform. The process of rendering the site products multiple static files.

Dynamic content can run on the client side, so the user experience when loading the content is not affected. These frameworks offer specific components to allow this. For example, Nuxt offers a Vue Component called [ClientOnly](https://nuxt.com/docs/api/components/client-only).

The static assets get copied to the `public` folder in the same way as in SSR or SPA frameworks.

Some framework options for SSG are [Gridsome](https://gridsome.org/) (Vue.js) and [Gatsby](https://www.gatsbyjs.com/) (React). Platforms for deploying your static websites are [Netlify](https://www.netlify.com/), [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/), or doing it yourself in AWS.

Nuxt has recently launched its 3.0.0 stable version, which includes a mode for SSG. We can leverage all the NuxtJS Modules and Vue 3 to build our static website.

## How can you use SSG in a Nuxt App?

I recommend following the Nuxt 3 [tutorial](https://nuxt.com/docs/getting-started/installation) on installing the framework, but once that is taken care of, rendering of the static website content is done with the `nuxt generate` command.

Although that is the command your Nuxt Application needs to render the page content, it is not enough. In my experience with this Javascript framework, a crucial configuration is missing. The `nuxt.config.ts` file needs to have the `ssr: true` set. It makes the framework generate the content properly; otherwise, some errors with the routes appear. This flag expands the possibilities of writing your NuxtJS Modules for added behaviors.

Executing the `generate` command again renders the site content and leaves the result in the `.output/public` folder, not in the `dist` folder.

## Deploying the content with a proper cache configuration

### How can I deploy the site content myself?

There are some free and no-code options to deploy and serve your site, such as Netlify. But nothing can beat the satisfaction of deploying your site on infrastructure created by yourself. I offer some details on deploying your static page using AWS and GitHub Actions.

When deploying your site in AWS, you need an S3 bucket, a CloudFront distribution, and Route 53 for DNS. I will not go into the details myself because there are [good resources online](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/) that already explain this.

The idea is to upload the `.output/public` contents to an S3 bucket. Then you point the CloudFront distribution origin to the bucket and configure the Route 53 DNS to point to the distribution. Uploading the content to the bucket can be automated using GitHub Actions (for free!), where the configuration matters. There you can configure the cache control header for each file.

Of course, there are some details I am omitting when configuring the CloudFront distribution cache behavior, for example, but those don't impact the cache control header configuration we need.

### What am I deploying?

Most of the time, we deploy a static site to the hosting, and we have no idea what we are uploading. We do what the tutorial says. I want to change that by diving deeper into what Nuxt generates when rendering the site content.

The contents of `.output/public` look like this:

```bash
.output/public
├── 200.html
├── 404.html
├── _nuxt
│   ├── ContentDoc.5188c211.js
│   ├── ... (more like this)
│   ├── web-socket.f1427101.js
│   └── welcome.bf2a1ad8.js
├── _payload.js
├── api
│   └── _content
│       ├── cache.1673724369133.json
│       └── query
│           ├── 03C7dWGL7F.1673724369133.json
│           ├── ... (more like this)
│           └── yb4tCNXTXy.1673724369133.json
├── blog
│   ├── _payload.js
│   ├── index.html
│   └── blog-name-here
│       ├── _payload.js
│       └── index.html
├── ... (more files from the /public directory)
├── index.html
├── rss.xml
└── sitemap.xml
```

Let us review what those files and folders mean:
* `_nuxt` is a folder that contains components, icons, fonts, CSS, and everything the site needs to hydrate. A hydration process that happens on the client side; helps add interactivity to the site. All the files within this folder are named using a content hash.
* `api/_content` is a folder generated using the [Nuxt Content](https://content.nuxtjs.org/) plugin, which I recommend to build blogs. It has the results for the content queries used to add interactivity. The files are named based on the query results, not the content itself. A reference to this is [here](https://github.com/nuxt/framework/issues/6151#issuecomment-1196684149).
* `_payload.js` is a file used in a similar way to the `api/_content` folder. Note that the name doesn't change, but the content might.
* There are other standard HTML and XML files. Any static file added to the `public` folder will be there.

### How do I configure the cache?

When configuring your GitHub Action, you need to specify the cache headers for files uploaded to S3. As a rule of thumb, you should only cache (long-term) files whose name contains a content digest. If the file contents change, the file name will change, thus changing the import on the file that requires it.

Given the explanation of the generated content, we can safely cache the `_nuxt` folder with a cache header of `max-age=31536000,public,immutable`. The rest of the files can use a cache policy of `max-age=0,public,must-revalidate` so that the browser shouldn't load the file on the disk.

I hope this guide is a great starting point for people to upload their static site to AWS with the proper cache configuration. There are currently no resources online that explain how to configure this cache behavior for the site content.