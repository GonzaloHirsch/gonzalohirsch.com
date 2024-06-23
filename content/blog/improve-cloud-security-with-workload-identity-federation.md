---
dqid: 'improve-cloud-security-with-workload-identity-federation'
title: 'Improve Cloud Security with Workload Identity Federation'
description: 'Secure operations are essential to ensure no breaches occur. Workload Identity Federation provides a safe mechanism to impersonate Service Accounts.'
headline: 'Improve Cloud Security with Workload Identity Federation'
excerpt: 'Secure operations are essential to ensure no breaches occur. Workload Identity Federation provides a safe mechanism to impersonate Service Accounts.'
date: '2024-05-06T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--improve-cloud-security-with-workload-identity-federation.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Improve Cloud Security with Workload Identity Federation"'
  width: 1200
  height: 630
faq:
  - question: 'What is the best Nuxt 3 SSR cache configuration?'
    answer: 'Ensure all files that contain their MD5 in their path have a long-lived cache control configuration, while resources like HTML files should have a short-lived cache configuration. You should consider hosting your assets (fonts, CSS, etc). Consider using a Content Delivery Network (CDN) service to guarantee minimal latency with your users.'

  - question: 'What are Service Account Keys?'
    answer: "These are private credentials that identify a user. You use these users (Service Accounts) for automatic actions in general. You copy and paste the keys across platforms to get them from GCP into GitHub. It can be a security risk doing this with keys since it's most likely that the account has vast permissions across the projects. Multiple organizations might prevent you from creating a service account key."

  - question: 'What is Workload Identity Federation?'
    answer: "A combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform. The impersonation uses short-lived tokens, ensuring access to the cloud identity is time-bound. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation components)."

  - question: 'How does Workload Identity Federation in GitHub Actions?'
    answer: 'GitHub Actions gives the action run a token for authentication. You can find this token as the `GITHUB_TOKEN`. GitHub Actions exchanges the GitHub token for a short-lived token from Google Cloud. A security token service emits a short-lived token with the idea of exchanging it for service account credentials. You exchange the external identity token to access GCP credentials. GitHub Actions uses that short-lived token to access the service account in Google Cloud. GitHub Actions continues to perform all the actions against Google Cloud by being authenticated as the GCP service account.'

  - question: 'Why is it so secure?'
    answer: "Workload Identity Federation ensures workload authentication, meaning they are not bound to a person/user. It removes human error and the need to create account keys by removing people from the equation. Since you don't need keys, security falls under the native security mechanisms the platforms in question offer."

  - question: 'What are the components of the Workload Identity Federation?'
    answer: "Workload Identity Pool helps you manage external identities. It is where you bind your cloud identities. Workload Identity Pool Provider helps you outline the relationship between Google Cloud and an external Identity Provider (IdP). It's how both providers will interact. External IdPs will connect to the pools to get access to cloud identities."

  - question: 'What is the cost of Workload Identity Federation?'
    answer: "GCP Workload Identity Federation is 100% free since it's part of the IAM service in the Google Cloud Platform. Security of the Google Cloud resources is their main priority, so it makes sense that the service is free."
# tags: []
---

::inlineQuote
This blog post was sent as part of the [newsletter](/#signup) to all subscribers on April 10th, 2024. To receive the latest extra content, consider subscribing to the newsletter.
::

This month follows up on the discussion in the last newsletter, **Workload Identity Federation**. Security in the cloud (e.g., GCP or any cloud provider) is one of the most relevant design aspects for cloud workloads, but nowadays, everything is automated. In the rise of infrastructure automation, **secure operations are essential to ensure no breaches occur**. Google Workload Identity Federation solves this to provide a safe mechanism to impersonate Service Accounts (GCP).

## Securing Cloud-Native Workloads

One of the most significant aspects of the cloud is security. **Never overlook security in the cloud, especially when you are working with it from third-party platforms**. I'll discuss securing workloads when working with Google Cloud Platform and GitHub.

**One aspect to take into account when using third-party platforms is authentication**. It means showing the Google Cloud Platform that you are an authorized user trying to perform actions against it. You have two main options here:

- [Service Account Key](https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys): These are **private credentials that identify a user**. You use these users (Service Accounts) for automatic actions in general. You copy and paste the keys across platforms to get them from GCP into GitHub. **It can be a security risk doing this with keys** since it's most likely that the account has vast permissions across the projects. Multiple organizations might prevent you from creating a service account key.
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation): **A combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform**. The impersonation uses short-lived tokens, ensuring access to the cloud identity is time-bound. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation components).

Note that, in both scenarios, you still need a Service Account, which is a managed identity by GCP IAM. These accounts work for server-to-server communication where OAuth might not be available. You can manage this cloud identity as you would a general user, so you can still grant it an IAM role.

**Workload Identity Federation requires a bit of more upfront configuration, but it's worth the effort**. You can have a Terraform script that does most of the work for you, so you only have to do it once. Essentially, you configure the resources on the Google Cloud Platform side and the actions on GitHub. The rest of the process is transparent to a user since the exchange of keys happens in the background.

To further understand how the Workload Identity Federation works, these are the steps behind it:

1. GitHub Actions gives the action run a token for authentication (this happens every time you have an action run). You can find this token as the `GITHUB_TOKEN`.
2. GitHub Actions exchanges the GitHub token for a short-lived token from Google Cloud. A security token service emits a short-lived token with the idea of exchanging it for service account credentials. You exchange the external identity token to access GCP credentials.
3. GitHub Actions uses that short-lived token to access the service account in Google Cloud.
4. GitHub Actions continues to perform all the actions against Google Cloud by being authenticated as the GCP service account.
5. From this point onwards, you can perform any action, like deploying a new Cloud Run revision or uploading files to Google Cloud Storage (as long as the service account has the appropriate IAM permissions).

The only thing you need to configure Workload Identity Federation on the side of GitHub is the Identity Federation ID, which is not a secret. Google Cloud offers several [guides](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) for configuring Workload Identity Federation against multiple providers. It is one of their many Google Cloud security guides.

## Why is it so secure?

Workload Identity Federation ensures workload authentication, meaning they are not bound to a person/user. It removes human error and the need to create account keys by removing people from the equation. Since you don't need keys, security falls under the native security mechanisms the platforms in question offer.

## What are the components of the Workload Identity Federation?

Going into further detail on Workload Identity Federation against GitHub, you need to understand the following concepts:

- **Workload Identity Pool** helps you manage external identities. It is where you bind your cloud identities.
- **Workload Identity Pool Provider** helps you outline the relationship between Google Cloud and an external Identity Provider (IdP). It's how both providers will interact. External IdPs will connect to the pools to get access to cloud identities.

You generally create a **Workload Identity Pool** per environment you are working on. Because each pool will have service accounts bound to it, you try to avoid mixing service accounts and deployment environments by creating a different workload identity pool per environment.

You generally create a **Workload Identity Pool Provider** per identity provider in your environment. For example, if you work with GitHub and Azure to deploy infrastructure or perform actions against GCP, you will have one GitHub and one Azure provider. You can link both providers to the same pool if they need to access the same service account identity. You will configure different attributes and conditions depending on your provider and their authentication methods ([OIDC](https://auth0.com/intro-to-iam/saml-vs-openid-connect-oidc), [SAML](https://auth0.com/intro-to-iam/saml-vs-openid-connect-oidc)). Your Workload Identity Pool Provider defines the context in which a workload from which the external identity provider (IdP) will have access to the accounts in the identity pool.

The conditions for accessing the Workload Identity Pool are critical to the provider configuration. For example, you could define that a specific repository will have access to one provider, authenticating GitHub Actions running only on specific GitHub repositories. It ensures that the service account is accessed securely via the Workload Identity Federation resources and only by authorized actors.

## What is the cost of Workload Identity Federation?

GCP Workload Identity Federation is [100% free](https://cloud.google.com/iam/pricing) since it's part of the IAM service in the Google Cloud Platform. Security of the Google Cloud resources is their main priority, so it makes sense that the service is free.

## Takeaways

Workload Identity Federation is the scheme you should be looking for to enhance your cloud security and secure access to your service account credentials. By automating the whole process, you will ensure that access security is the top priority in the long run.

## What to look out for in the upcoming newsletter?

I haven't decided on the topic for the following newsletter, so I'm open to suggestions.

You will find the previous one as a blog post in the following days, so stay tuned!

Happy reading!

::backToBasics

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future implementations.

::basicExpand{heading="What are Service Account Keys?" componentType="h3"}
#description
These are private credentials that identify a user. You use these users (Service Accounts) for automatic actions in general. You copy and paste the keys across platforms to get them from GCP into GitHub. It can be a security risk doing this with keys since it's most likely that the account has vast permissions across the projects. Multiple organizations might prevent you from creating a service account key.
::

::basicExpand{heading="What is Workload Identity Federation?" componentType="h3"}
#description
A combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform. The impersonation uses short-lived tokens, ensuring access to the cloud identity is time-bound. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation components).
::

::basicExpand{heading="How does Workload Identity Federation in GitHub Actions?" componentType="h3"}
#description
GitHub Actions gives the action run a token for authentication. You can find this token as the `GITHUB_TOKEN`. GitHub Actions exchanges the GitHub token for a short-lived token from Google Cloud. A security token service emits a short-lived token with the idea of exchanging it for service account credentials. You exchange the external identity token to access GCP credentials. GitHub Actions uses that short-lived token to access the service account in Google Cloud. GitHub Actions continues to perform all the actions against Google Cloud by being authenticated as the GCP service account.
::

::basicExpand{heading="Why is it so secure?" componentType="h3"}
#description
Workload Identity Federation ensures workload authentication, meaning they are not bound to a person/user. It removes human error and the need to create account keys by removing people from the equation. Since you don't need keys, security falls under the native security mechanisms the platforms in question offer.
::

::basicExpand{heading="What are the components of the Workload Identity Federation?" componentType="h3"}
#description
Workload Identity Pool helps you manage external identities. It is where you bind your cloud identities. Workload Identity Pool Provider helps you outline the relationship between Google Cloud and an external Identity Provider (IdP). It's how both providers will interact. External IdPs will connect to the pools to get access to cloud identities.
::

::basicExpand{heading="What is the cost of Workload Identity Federation?" componentType="h3"}
#description
GCP Workload Identity Federation is 100% free since it's part of the IAM service in the Google Cloud Platform. Security of the Google Cloud resources is their main priority, so it makes sense that the service is free.
::

::
