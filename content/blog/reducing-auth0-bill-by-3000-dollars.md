---
dqid: 'reducing-auth0-bill-3000-dollars'
title: 'How I reduced my Auth0 bill by $3,000 | Gonzalo Hirsch'
description: 'By analyzing our M2M token usage in Auth0 and implementing a quick (and free) change, I managed to reduce our Auth0 bill by $3,000 per year.'
headline: 'How I reduced my Auth0 bill by $3,000'
excerpt: 'By analyzing our M2M token usage in Auth0 and implementing a quick (and free) change, I managed to reduce our Auth0 bill by $3,000 per year.'
date: '2023-01-12T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--reducing-auth0-bill-by-3000-dollars-2.webp'
  mime: 'webp'
  alt: 'Illustration with the text "How I reduced my Auth0 bill by $3,000"'
  width: 1200
  height: 630
faq:
  - question: 'What is Auth0?'
    answer: 'Auth0 is an Argentinian-born unicorn that provides authentication and authorization as a service. They offer developers and companies a way to secure their applications quickly. Some Auth0 use cases and sectors are the public sector, B2B SaaS, passwordless logins, Customer Identity Access Management (CIAM), and healthcare.'
  - question: 'What is an M2M token exactly?'
    answer: "Given your application architecture or requirements, you might need one of your processes or back-end systems (origin system) to communicate with another system (destination system). This communication might happen without users filling in a user and a password, so you need a secure way to authenticate to the destination system. Here's where M2M tokens come into play. You can create an M2M application (for your origin system) in Auth0 and set its permissions (grants, actions it can perform) to allow interaction with your destination system."
  - question: 'Why is it important to keep an eye on your M2M token usage?'
    answer: 'The monthly M2M limit for "Free" and "Essential" users in Auth0 is 1,000 tokens per month. This allowance means you could average using ~33 M2M tokens per day without upgrading your account. If you have multiple distributed systems, and each might require multiple M2M authentications per day, you can imagine that going over that daily average is simple. Upgrading your account to a "Professional" plan could be the solution to get 5,000 tokens in total, but it costs about $3,000 per month (at the least).'
  - question: 'What is the outcome of this approach?'
    answer: "The main impact is on the use of M2M tokens. In the Auth0 dashboard, you can verify that the authentication token consumption doesn't exceed one M2M token per day in your reports. It improves the system's performance as authentication will be faster when using the cached token. Your information is still secured, and your platform usage will always be limited. Reducing one of the causes of M2M token consumption has another advantage because it leaves more authentication tokens for the management API free for consumption."
# tags: []
---

Last year, by analyzing our M2M token usage in Auth0 and implementing a quick (and free) change, I managed to reduce our Auth0 bill by $3,000 per year. M2M is a token used for machine-to-machine authentication, where no human interaction is involved. Given Auth0's pricing tiers, consuming too many of these tokens can lead to a hefty bill.

Before explaining how I reduced my auth0 bill by $3,000, let's review what Auth0 is.

## What is Auth0?

In a nutshell, Auth0 is an Argentinian-born [unicorn](https://auth0.com/blog/so-you-want-to-be-a-unicorn/) that provides authentication and authorization as a service. They offer developers and companies a way to secure their applications quickly. Some Auth0 use cases and sectors are the public sector, [B2B SaaS](https://auth0.com/b2b-saas), [passwordless logins](https://www.okta.com/customer-identity/passwordless/), [Customer Identity Access Management](https://auth0.com/ciam) (CIAM), and [healthcare](https://auth0.com/healthcare). You can connect any application, define the identity providers you will use, and each time a user enters your application, Auth0 verifies their identity and calls back to you.

### What is an M2M token exactly?

Given your application architecture or requirements, you might need one of your processes or back-end systems (origin system) to communicate with another system (destination system). This communication might happen without users filling in a user and a password, so you need a secure way to authenticate to the destination system. Note that in this use case, no multifactor authentication is involved. Here's where M2M tokens come into play.

You can create an [M2M application](https://auth0.com/blog/using-m2m-authorization/) (for your origin system) in Auth0 and set its permissions (grants, actions it can perform) to allow interaction with your destination system. It is part of the access management of the M2M application. After setting that up, you can execute a request to Auth0 with your client id + secret (from the origin system) and obtain a token to authenticate in your destination system. These tokens are valid for 24hs.

### Why is it important to keep an eye on your M2M token usage?

The [monthly M2M limit](https://auth0.com/pricing) for "Free" and "Essential" users in Auth0 is 1,000 tokens per month. This allowance means you could average using ~33 M2M tokens per day without upgrading your account. If you have multiple distributed systems, and each might require multiple M2M authentications per day, you can imagine that going over that daily average is simple. For example, when dealing with static sites that use a headless CMS and require fetching data during the build phase, the M2M limit is low.

Upgrading your account to a "Professional" plan could be the solution to get 5,000 tokens in total, but it costs about $3,000 per month (at the least). Although this cost might not be prohibitive, if you go over that new M2M limit, paying for "Enterprise" could be a tad overkill.

Although the solution is simple, it might not be apparent at first. The main issue with this setup is not being able to reuse M2M tokens when needed. What if you were able to cache the tokens somewhere?

## Caching the tokens with Redis

For those unfamiliar with it, [Redis](https://redis.io/) is an open-source, in-memory data store that supports a variety of data structures. Given Redis' speed and versatile in-memory data structures, it works well as a distributed cache and real-time data store. As part of their cloud offering, [Redis Cloud](https://redis.com/cloud/overview/) offers a free tier that is more than enough for this use case.

In this case, we can use Redis to keep a copy of the latest token requested as long as it's still valid and use that M2M token in subsequent operations in any other system. We implement a [lazy loading](https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/Strategies.html) strategy in which we write to the cache once we have requested an M2M token for the first time or the previous one has expired. The second time the system requires an authentication token, it will be already cached. If there is no need for an authentication token, we don't obtain and store it. Because Redis can store key-value pairs, we can directly store the M2M token with a unified key name and access it using the cluster credentials.

As an improvement to this strategy, for example, you can set [expiration](https://redis.io/commands/expire/) to the key to automatically remove it once 24hs has passed, reducing potential errors from using an outdated token. Let's review some of the details of using this approach.

## What is the outcome of this approach?

The main impact is on the use of M2M tokens. In the Auth0 dashboard, you can verify that the authentication token consumption doesn't exceed one M2M token per day in your reports. It improves the system's performance as authentication will be faster when using the cached token. Your information is still secured, and your platform usage will always be limited. Reducing one of the causes of M2M token consumption has another advantage because it leaves more authentication tokens for the management API free for consumption. These tokens can then be used, for example, to manage users from an API.

One could claim that login security is compromised because you store the information on Redis. I highly advise exercising due diligence when protecting parameters such as the cluster URL, username, password, and key name. If that does happen, your information will be safe. Breached passwords are not something you should worry about more than you worry about breached client credentials for the M2M token. In addition, if you are worried about the features that Redis' Cloud free tier offers, you can always pay a higher one, and the return on investment is still positive against paying Auth0.

Of course, more details come into play when setting up this caching scheme, but with this information, you should be able to set it up on your own and stop paying huge Auth0 bills. I highly recommend using the Auth0 community in order to troubleshoot your setup.
