---
dqid: 'challenges-working-on-an-open-source-npm-package'
title: 'Tutorial: Challenges Working on an Open Source NPM Package'
description: 'Building a Node JS NPM package traffic visualizer powered entirely by the data available in Google Cloud without having to configure anything on the instances.'
headline: 'Tutorial: Challenges Working on an Open Source NPM Package'
excerpt: 'Building a Node JS NPM package traffic visualizer powered entirely by the data available in Google Cloud without having to configure anything on the instances.'
date: '2024-06-10T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--challenges-working-on-an-open-source-npm-package.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Tutorial: Challenges Working on an Open Source NPM Package"'
  width: 1200
  height: 630
faq:
  - question: 'What is the best Nuxt 3 SSR cache configuration?'
    answer: 'Ensure all files that contain their MD5 in their path have a long-lived cache control configuration, while resources like HTML files should have a short-lived cache configuration. You should consider hosting your assets (fonts, CSS, etc). Consider using a Content Delivery Network (CDN) service to guarantee minimal latency with your users.'
  - question: "What's the idea behind this?"
    answer: "There's a GCP service for serverless containers called Cloud Run. Cloud Run is one of the serverless computing services from the Google Cloud Platform. In it, you run Docker container images that are purpose-built for your application. Since this service is so compelling, many businesses use it, but traffic is quite opaque. No solutions by Google Cloud allow you to visualize Cloud Run traffic in real time. It reduces transparency and your ability to identify malicious actors if you limit yourself to using only the Google Cloud service offering. I set myself to build a Node JS traffic visualizer powered entirely by the data available in Google Cloud without having to configure anything on the Cloud Run instances or any other dependency. The idea is that you can drop this package into your project, and it simply works. That's why I settled on it being an NPM package. The initial stack for this Node module is Vue 3 for the frontend dashboard and TypeScript and Express for the backend API. After dealing with configuration issues, I migrated Vue 3 SPA to Vue 3 SSR with Express."

  - question: 'Why create an NPM package?'
    answer: 'NPM packages are the gold standard for distributable, open source software since they power most web and Node-based projects today. You can create free NPM packages, and the NPM package manager handles the distribution and verification of your package. You can combine your package to make it executable with NPX, removing the installation from the picture and minimizing user friction.'

  - question: 'What are some of the challenges?'
    answer: 'One of the first aspects that you need to decide is how to bundle the production code and how you will be able to install it. It affects the package installation process since you can install the compiled source or the entire source code. I opted for a pre-compiled version of the source code to reduce the bundle size, simplify usage, and cut down on the dependencies that the project may have. A build step is necessary before uploading the package into the package manager. This package depends on a backend API and frontend dashboard running simultaneously (this will change in the future to a more robust approach for v2). To achieve this in development and production, I needed to include some mechanism to run concurrent NPM commands. To solve this, I included `concurrently` in the production dependencies. Semantic Release can publish NPM packages into the NPM registry without running the `npm publish` command manually during the deployment of the NPM module. The challenge was to get Semantic Release to publish packages into the NPM registry successfully. I was using semantic-release/github and semantic-release/npm. You cannot use both and publish packages into both package managers. The last challenge I faced was setting up NPX commands to remove the need to have this as an installed package. To achieve this, you can configure a `bin` property in your package.json file. That property indicates to the Node package manager what to run when the invocation comes from NPX.'
# tags: []
---

::inlineQuote
This blog post was sent as part of the [newsletter](/#signup) to all subscribers on May 6th, 2024. To receive the latest extra content, consider subscribing to the newsletter.
::

This month is a bit of a change in the topic of the digest. Inspired by my experience working to create an open source NPM package for analyzing and visualizing traffic from Google Cloud in real time, I put together this digest. You can expect to see how that works, the challenges, and the outcome.

## What's the idea behind this?

As I have mentioned in several previous blog posts ([free serverless containers in GCP](/blog/gcp-cloud-run-virtually-free-serverless-containers/) and [free Nuxt 3 SSR infrastructure](/blog/nuxt-3-free-ssr-configuration/)), there's a GCP service for serverless containers called Cloud Run.

[Cloud Run](https://cloud.google.com/run) is one of the **serverless computing services from the Google Cloud Platform**. In it, you **run Docker container images that are purpose-built for your application**. Since this service is so compelling, many businesses use it, but traffic is quite opaque.

No solutions by Google Cloud allow you to visualize Cloud Run traffic in real time. It reduces transparency and your ability to identify malicious actors if you limit yourself to using only the Google Cloud service offering.

I set myself to build a Node JS traffic visualizer powered entirely by the data available in Google Cloud without having to configure anything on the Cloud Run instances or any other dependency. The idea is that you can drop this package into your project, and it simply works. That's why I settled on it being an NPM package.

The initial stack for this Node module is Vue 3 for the frontend dashboard and TypeScript and Express for the backend API. After dealing with configuration issues, I migrated Vue 3 SPA to Vue 3 SSR with Express.

## Why create an NPM package?

NPM packages are the gold standard for distributable, open source software since they power most web and Node-based projects today. You can create free NPM packages, and the NPM package manager handles the distribution and verification of your package. You can combine your package to make it executable with NPX, removing the installation from the picture and minimizing user friction.

While setting up an NPM package that follows the best practices specified by the package manager, I stumbled upon the fact that there are no compelling guides on creating an NPM with significant automation to improve the developer experience.

## What are some of the challenges?

There were several challenges related to configuring everything necessary for correctly uploading the NPM package into the NPM registry. Some of those were related to the implementation I decided to use, but others were related to the most common tools for publishing packages.

### Preparing for the production build

One of the first aspects that you need to decide is how to bundle the production code and how you will be able to install it. It affects the package installation process since you can install the compiled source or the entire source code.

In this case, I opted for a pre-compiled version of the source code to reduce the bundle size, simplify usage, and cut down on the dependencies that the project may have. This last point is relevant since users generally try to avoid transitive dependencies by not including libraries with too many.

A build step is necessary before uploading the package into the package manager. It ensures the compiled package code is updated when publishing a new version.

This decision reflects how your application interacts with the filesystem during a production build. For example, Vue 3 SSR production builds interact with the dist folder. It is different from the way it interacts with the filesystem during development.

### Configuring simultaneous services

This package runs a backend API and frontend dashboard simultaneously (this will change in the future to a more robust approach for v2). To achieve this in development and production, I needed to include some mechanism to run concurrent NPM commands. To solve this, I included `concurrently` in the production dependencies.

This layout for the services introduced another complexity, allowing users to configure the backend port but having the dashboard need to be aware of that port. After several trials and errors, I migrated the Vue 3 SPA into a Vue 3 SSR application to simplify passing a configuration file.

### Configuring automatic releases

I advocate for automation and ensure no developer friction when possible. To prepare for releases in my projects, I use [Semantic Release](/blog/semantic-release-and-branch-protection-rules/). It allows me to run consistent releases against GitHub. That's why I decided to use Semantic Release for this too. Semantic Release can publish NPM packages into the NPM registry without running the `npm publish` command manually during the deployment of the NPM module. Semantic Release can also handle the NPM version of the package seamlessly, so it is a great option.

The challenge was to get Semantic Release to publish packages into the NPM registry successfully. It was particularly complicated since no documentation indicates how different Semantic Release packages interact with each other if present in the same environment. In my case, I was using [semantic-release/github](https://github.com/semantic-release/github) and [semantic-release/npm](https://github.com/semantic-release/npm). You cannot use both and publish packages into both package managers.

After multiple trials and errors with the NPM config, `npm publish`, and `npm login` commands, I got the publishing configuration working by removing the semantic-release/github plugin. Ensuring you have a correct NPM token for the publishing step is crucial.

### Configuring NPX commands

The last challenge I faced was setting up NPX commands to remove the need to have this as an installed package. The idea is to have the package run with `npx ...` instead of `npm install ...` and then have to execute it. There is no good documentation on how to set up a proper NPM script as the NPX entry point.

To achieve this, you can configure a `bin` property in your package.json file. That property indicates to the Node package manager what to run when the invocation comes from NPX.

NPX will execute a Node JS file that, in turn, will execute your Node JS scripts as defined in the package.json file. You have to solve a few challenges in streaming the output of the given commands in the NPX scripts, but that is a job that ChatGPT can easily solve.

## Takeaways

Creating an NPM package for the first time is an interesting project to start opening into the open source community and distribute software meant to do great things.

You can find one of the initial versions of the [npm package](https://www.npmjs.com/package/traffic-visualizer) here, but there will be a great overhaul to simplify the code and reduce the amount of dependencies shortly.

## What to look out for in the upcoming newsletter?

I haven't decided on the topic for the following newsletter, so I'm open to suggestions.

You will find the previous one as a blog post in the following days, so stay tuned!

Happy reading!

::backToBasics

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future implementations.

::basicExpand{heading="What's the idea behind this?" componentType="h3"}
#description
There's a GCP service for serverless containers called Cloud Run. Cloud Run is one of the serverless computing services from the Google Cloud Platform. In it, you run Docker container images that are purpose-built for your application. Since this service is so compelling, many businesses use it, but traffic is quite opaque. No solutions by Google Cloud allow you to visualize Cloud Run traffic in real time. It reduces transparency and your ability to identify malicious actors if you limit yourself to using only the Google Cloud service offering. I set myself to build a Node JS traffic visualizer powered entirely by the data available in Google Cloud without having to configure anything on the Cloud Run instances or any other dependency. The idea is that you can drop this package into your project, and it simply works. That's why I settled on it being an NPM package. The initial stack for this Node module is Vue 3 for the frontend dashboard and TypeScript and Express for the backend API. After dealing with configuration issues, I migrated Vue 3 SPA to Vue 3 SSR with Express.
::

::basicExpand{heading="Why create an NPM package?" componentType="h3"}
#description
NPM packages are the gold standard for distributable, open source software since they power most web and Node-based projects today. You can create free NPM packages, and the NPM package manager handles the distribution and verification of your package. You can combine your package to make it executable with NPX, removing the installation from the picture and minimizing user friction.
::

::basicExpand{heading="What are some of the challenges?" componentType="h3"}
#description
One of the first aspects that you need to decide is how to bundle the production code and how you will be able to install it. It affects the package installation process since you can install the compiled source or the entire source code. I opted for a pre-compiled version of the source code to reduce the bundle size, simplify usage, and cut down on the dependencies that the project may have. A build step is necessary before uploading the package into the package manager. This package depends on a backend API and frontend dashboard running simultaneously (this will change in the future to a more robust approach for v2). To achieve this in development and production, I needed to include some mechanism to run concurrent NPM commands. To solve this, I included `concurrently` in the production dependencies. Semantic Release can publish NPM packages into the NPM registry without running the `npm publish` command manually during the deployment of the NPM module. The challenge was to get Semantic Release to publish packages into the NPM registry successfully. I was using semantic-release/github and semantic-release/npm. You cannot use both and publish packages into both package managers. The last challenge I faced was setting up NPX commands to remove the need to have this as an installed package. To achieve this, you can configure a `bin` property in your package.json file. That property indicates to the Node package manager what to run when the invocation comes from NPX.
::

::
