---
dqid: 'google-cloud-platform-experience'
title: 'My Complete Experience Working with Google Cloud Platform'
description: 'Read about my experience working with Google cloud Platform, designing cloud-native workloads, and understanding GCP as an upcoming cloud provider.'
headline: 'My Complete Experience Working with Google Cloud Platform'
excerpt: 'Read about my experience working with Google cloud Platform, designing cloud-native workloads, and understanding GCP as an upcoming cloud provider.'
date: '2024-04-10T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--google-cloud-platform-experience.webp'
  mime: 'webp'
  alt: 'Illustration with the text "My Complete Experience Working with Google Cloud Platform"'
  width: 1200
  height: 630
faq:
  - question: 'What are the models for cloud services?'
    answer: "You can generally identify said services by understanding the types of services cloud providers offer. Infrastructure as a Service (IaaS) is when the cloud provider offers you the bare minimum networking, cloud computing, and storage resources to configure everything you need. It is the most flexible and most complex one. Platform as a Service (PaaS) is when the cloud provider abstracts the infrastructure part from the client. It's aimed at application developers who don't intend to manage their infrastructure. Software as a Service (SaaS) is when the cloud providers offer a complete product to end users, generally managed by the same provider. End users don't know how it works; they only use it."

  - question: 'What is vendor lock-in?'
    answer: 'Designing cloud-native apps can be a challenge. The principal balance you have to strike is between cost and vendor lock-in. Vendor lock-in occurs when you cannot move a workload from one cloud provided to another without significant changes. It generally happens when you use services specific to the cloud provider you are working on. Vendor lock-in happens if you use too many Platform or Software as a Service component in your architecture. As I mentioned, you need to balance maintainability and cost. It depends on the type of service you use, the pricing model, and its limitations.'

  - question: 'What are the pricing models in cloud providers?'
    answer: 'Pay As You Go is a model where you only pay for what you use. This model could be more expensive than the other one on a large scale. Pay For Provisioning is a model where you pay to reserve the resources. If you are still unsure about the cost of using the cloud, you can always use the cloud cost calculators. There, you can simulate the cost of your architecture by picking the components and specifying how much you would use them.'

  - question: 'Can I use the cloud for free?'
    answer: "Pay As You Go services are usually the Platform as a Service type. You can build apps on the cloud over a minimal budget (maybe even for free), but you will start to lock yourself into the cloud provider you use. If you are designing cloud apps in an organization, it's best to clarify the cloud budget to help you during the design process."

  - question: 'Can I set up budgets in Google Cloud Platform?'
    answer: 'You can set up billing alerts, which are notifications triggered when your spending goes over a certain threshold. Then you have billing budgets, which are notifications too. You could leverage them by turning off certain services programmatically. You manage all Google Cloud products via the APIs, so if you feel you are overspending, you can turn the API off to analyze the usage.'

  - question: 'What are the limitations of cloud services?'
    answer: "Services may advertise specific limits and quotas, but it depends on HOW you use that service. Some service-to-service connections might take away from the usage limits of one of them. For example, Cloud Run has a 60 minute timeout limit for requests, but if you combine it with PubSub, which has a 10 minute timeout for PUSH events, you essentially have 10 minutes for your Cloud Run service That's why it is necessary to understand the limitations of each service and how each can be combined with others to create the architecture you need."

  - question: 'How can I secure workloads in Google Cloud Platform?'
    answer: "Workload Identity Federation is a combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation part). Workload Identity Federation requires a bit of more upfront configuration, but it's worth the effort. Essentially, you configure the resources on the Google Cloud Platform side and the actions on GitHub. The rest of the process is transparent to a user since the exchange of keys happens in the background."

  - question: 'What is GCP Cloud Shell?'
    answer: "It's a VM in the Google Cloud Console you turn on to perform operations against your Google Cloud project. The best part is that it is free, so you can log in from anywhere, even if you don't have your computer. It's helpful if you need to run some operations against the project or verify something. Although it's not a fully-fledged bastion host, it's very close to it."
# tags: []
---

::inlineQuote
This blog post was sent as part of the [newsletter](/#signup) to all subscribers on March 12th, 2024. To receive the latest extra content, consider subscribing to the newsletter.
::

Hi! This digest focuses on **my experience in Google Cloud Platform (GCP) and my experience taking local workloads into the cloud**. I'll focus on **designing Cloud-Native applications and securing workloads from the cloud**.

## Context

As some might be aware, I work at a UK-based digital marketing agency (Croud) that does most of the work in Google Cloud. We design most workloads for Google Cloud, so we have ample experience working on it.

**Being a Senior Software Engineer, I design pipelines and workloads around the Google Cloud Platform.** Part of my latest projects have included designing Cloud Native workloads from scratch. This newsletter focuses on my experience with those latest designs.

## Designing cloud-native products

**Designing cloud-native apps can be a challenge.** The principal **balance** you have to strike is between **cost and vendor lock-in**. Vendor **lock-in occurs when you cannot move a workload from one cloud provided to another without significant changes**. It generally happens when you use services specific to the cloud provider you are working on.

### Models of cloud services

You can generally identify said services by understanding the types of services cloud providers offer. There are [three main models of services](https://aws.amazon.com/types-of-cloud-computing/): **Infrastructure as a Service (IaaS)**, **Platform as a Service (PaaS)**, and **Software as a Service (SaaS)**.

- _Infrastructure as a Service (IaaS)_ is when the **cloud provider offers you the bare minimum networking, cloud computing, and storage resources to configure everything you need**. It is the most flexible and most complex one. An example of IaaS is Google Compute Engine in Google Cloud and EC2 in Amazon Web Services.
- _Platform as a Service (PaaS)_ is when the **cloud provider abstracts the infrastructure part from the client**. It's aimed at application developers who don't intend to manage their infrastructure. An example is Elastic Beanstalk in AWS and Google App Engine in Google Cloud.
- _Software as a Service (SaaS)_ is when the **cloud providers offer a complete product to end users, generally managed by the same provider**. End users don't know how it works; they only use it. An example is Amazon WorkMail in AWS and Gmail (GSuite) in Google Cloud.

Note that all of the services mentioned across Amazon Web Services and Google Cloud are equivalent to each other in the cloud providers I mentioned. Microsoft Azure will have equivalent services as well.

**Vendor lock-in happens if you use too many Platform or Software as a Service component in your architecture**. As I mentioned, you need to balance maintainability and cost. It depends on the type of service you use, the pricing model, and its limitations.

### Cost of cloud services

Generally, when I discuss my projects with people, they ask where I host them. When I tell them I use Amazon Web Services with one or two Google Cloud Platform services over that, they are surprised that the cost is negligible. People don't understand the different Cloud Provider pricing models. It prevents them from using cloud services, which could be a fantastic learning opportunity, probably for fear of the cost.

Pay As You Go and Pay For Provisioning are the most basic cloud pricing models.

- **Pay As You Go** is a model where you **only pay for what you use**. This model could be more expensive than the other one on a large scale. But if you are wise about it and at the scale of a personal project, the cost can be virtually none. For example, you can use BigQuery in Google Cloud and only pay for your data storage and your queries over it.
- **Pay For Provisioning** is a model where you **pay to reserve the resources**. For example, you can pay for a 10GB database in Cloud SQL in Google Cloud. In this case, you pay for the 10GB database each month, even if you are not using it.

**Pay As You Go services are usually the Platform as a Service type**. You can build apps on the cloud over a minimal budget (maybe even for free), but you will start to lock yourself into the cloud provider you use. If you are designing cloud apps in an organization, **it's best to clarify the cloud budget to help you during the design process**.

If you are still unsure about the cost of using the cloud, you can always **use the cloud cost calculators**. There, you can simulate the cost of your architecture by picking the components and specifying how much you would use them.

### Budgeting for the cloud

**People generally overlook the importance of cloud provider billing budgets**. It can be your first line of defense against overspending in the cloud. Use them to set a budget for whatever you feel comfortable spending on the cloud.

For reference, I understand how I use my resources in personal Google Cloud Console projects, so the budget I set up is 1 dollar. I don't need a bigger budget because I expect to pay nothing for it.

In general, you can set up billing alerts, which are notifications triggered when your spending goes over a certain threshold. Then you have billing budgets, which are notifications too. You could leverage them by turning off certain services programmatically. You can read more about Google Cloud Platform's billing budgets [here](https://cloud.google.com/billing/docs/how-to/budgets).

You manage all Google Cloud products via the APIs, so if you feel you are overspending, you can turn the API off to analyze the usage.

### Limitations of cloud services

One of the first things you need to **understand** when working with cloud providers is the **limitations of their services**. Services may advertise specific limits and quotas, but it depends on **HOW** you use that service. **Some service-to-service connections might take away from the usage limits of one of them**. Let me illustrate this with a real Google Cloud example of it.

Google Cloud has a very compelling cloud computing service called Google [Cloud Run](/blog/gcp-cloud-run-virtually-free-serverless-containers/). Essentially, the service works this way. Docker images spin up when requests come in, do the processing, and then spin back down. _According to the documentation for the service, each request can last up to 60 minutes_. Cloud Run is a fantastic alternative to Google Compute Engine since it's easier to configure but lacks the flexibility of Compute Engine. Compared to Google App Engine, it has faster scaling but lacks the fully managed aspect of App Engine.

When using Google Cloud, you can create message queues in Cloud PubSub. Ideally, you could submit messages to a message queue and have a Cloud Run service spin up, process it, and then turn itself off.

This type of architecture is popular since it saves considerably from having virtual machines 24/7. The problem is that _PubSub messages in Google Cloud have a 10-minute acknowledgment time_, after which the service retries delivery. **It means it renders the rest of the 60-minute timeout worthless in Cloud Run, so it's 50 minutes you cannot use.** You get the same scenario from above if you use object notifications from Google Cloud Storage since those notifications go through PubSub.

Note the limitations from above are in case you use a Push type notification for PubSub. Pull subscriptions allow more acknowledgment time, but you require the server to be on constantly to process and pull the messages. If you intend on using Cloud Functions in Google Cloud Platform, you should note that they run on Cloud Run, so it's essentially the same service but with less overhead.

**There are hundreds of examples like this one, not only in Google Cloud. That's why it is necessary to understand the limitations of each service and how each can be combined with others to create the architecture you need.**

## Securing cloud-native workloads

One of the most significant aspects of the cloud is security. **Never overlook security in the cloud**, especially when you are working with it from third-party platforms. I'll discuss securing workloads when working with Google Cloud Platform and GitHub.

**One aspect to take into account when using third-party platforms is authentication**. It means showing the Google Cloud Platform that you are an authorized user trying to perform actions against it. You have two main options here:

- [Service Account Keys](https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys): These are **private keys that identify a user**. You use these users (Service Accounts) for automatic actions in general. You copy and paste them across platforms to get them from GCP into GitHub. It can be a security risk doing this with keys since it's most likely that the account has vast permissions across the projects.
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation): A **combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform**. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation part).

Workload Identity Federation requires a bit of more upfront configuration, but it's worth the effort. Essentially, you configure the resources on the Google Cloud Platform side and the actions on GitHub. The rest of the process is transparent to a user since the exchange of keys happens in the background.

To further understand how the Workload Identity Federation works, these are the steps behind it:

1. GitHub Actions gives the action run a token for authentication (this happens every time you have an action run).
2. GitHub Actions exchanges the GitHub token for a short-lived token from Google Cloud.
3. GitHub Actions uses that short-lived token to access the service account in Google Cloud.
4. GitHub Actions continues to perform all the actions against Google Cloud by being authenticated as the service account.
5. From this point onwards, you can perform any action, like deploying a new Cloud Run revision or uploading files to Google Cloud Storage (as long as the service account has the appropriate IAM permissions).

The only thing you need to configure Workload Identity Federation on the side of GitHub is the Identity Federation ID, which is not a secret.

Google Cloud offers several [guides](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) for configuring Workload Identity Federation against multiple providers. It is one of their many Google Cloud security guides.

## Bonus: Something nice to have in Google Cloud Console

The principal player in the cloud provider ecosystem is Amazon Web Services. There's no discussion over that. Their machine learning, cloud computing, and cloud storage services are significantly more advanced than their counterparts from Google Cloud services.

**Regardless of that, there's one massive feature that Google Cloud offers, which is Cloud Shell.** It's a VM in the Google Cloud Console you turn on to perform operations against your Google Cloud project. The best part is that it is free, so you can log in from anywhere, even if you don't have your computer.

It's helpful if you need to run some operations against the project or verify something. Although it's not a fully-fledged [bastion host](https://en.wikipedia.org/wiki/Bastion_host), it's very close to it.

## Looking forward to the Google Cloud Platform

With all the Generative AI (Artificial Intelligence) craze, **I imagine that Google Cloud will earn more popularity and market share as a cloud provider, especially with Gemini and the extended context window**. The Google Cloud AI platform (Vertex AI) will continue to grow and include even more Generative AI data products and service offerings.

Google Cloud is much more than Google One, Google Maps Platform, Google Workspace, Google Drive, and the widely-known Google Cloud Products. For example, many people overlook Google BigQuery when it has some great pricing options and powerful connections to Google Analytics. I suggest you take a look and expand your cloud service provider horizons by looking into Google infrastructure and Google products.

## New blog posts

In the past weeks, I released a new blog about my complete experience [working for Toptal](/blog/remote-work-my-complete-toptal-experience/) and the [Toptal interview process](/blog/working-for-toptal-and-how-to-get-started/). People asked about it multiple times over the years I worked there, so I imagine it could be helpful for someone looking to understand more about the network.

## What to look out for in the upcoming newsletter?

The upcoming newsletter will be a more detailed description and explanation of how workload identity federation works.

You will find the previous one as a blog post in the following days, so stay tuned!

Happy reading!

::backToBasics

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future implementations.

::basicExpand{heading="What are the models for cloud services?" componentType="h3"}
#description
You can generally identify said services by understanding the types of services cloud providers offer. Infrastructure as a Service (IaaS) is when the cloud provider offers you the bare minimum networking, cloud computing, and storage resources to configure everything you need. It is the most flexible and most complex one. Platform as a Service (PaaS) is when the cloud provider abstracts the infrastructure part from the client. It's aimed at application developers who don't intend to manage their infrastructure. Software as a Service (SaaS) is when the cloud providers offer a complete product to end users, generally managed by the same provider. End users don't know how it works; they only use it.
::

::basicExpand{heading="What is vendor lock-in?" componentType="h3"}
#description
Designing cloud-native apps can be a challenge. The principal balance you have to strike is between cost and vendor lock-in. Vendor lock-in occurs when you cannot move a workload from one cloud provided to another without significant changes. It generally happens when you use services specific to the cloud provider you are working on. Vendor lock-in happens if you use too many Platform or Software as a Service component in your architecture. As I mentioned, you need to balance maintainability and cost. It depends on the type of service you use, the pricing model, and its limitations.
::

::basicExpand{heading="What are the pricing models in cloud providers?" componentType="h3"}
#description
Pay As You Go is a model where you only pay for what you use. This model could be more expensive than the other one on a large scale. Pay For Provisioning is a model where you pay to reserve the resources. If you are still unsure about the cost of using the cloud, you can always use the cloud cost calculators. There, you can simulate the cost of your architecture by picking the components and specifying how much you would use them.
::

::basicExpand{heading="Can I use the cloud for free?" componentType="h3"}
#description
Pay As You Go services are usually the Platform as a Service type. You can build apps on the cloud over a minimal budget (maybe even for free), but you will start to lock yourself into the cloud provider you use. If you are designing cloud apps in an organization, it's best to clarify the cloud budget to help you during the design process.
::

::basicExpand{heading="Can I set up budgets in Google Cloud Platform?" componentType="h3"}
#description
You can set up billing alerts, which are notifications triggered when your spending goes over a certain threshold. Then you have billing budgets, which are notifications too. You could leverage them by turning off certain services programmatically. You manage all Google Cloud products via the APIs, so if you feel you are overspending, you can turn the API off to analyze the usage.
::

::basicExpand{heading="What are the limitations of cloud services?" componentType="h3"}
#description
Services may advertise specific limits and quotas, but it depends on HOW you use that service. Some service-to-service connections might take away from the usage limits of one of them. For example, Cloud Run has a 60 minute timeout limit for requests, but if you combine it with PubSub, which has a 10 minute timeout for PUSH events, you essentially have 10 minutes for your Cloud Run service That's why it is necessary to understand the limitations of each service and how each can be combined with others to create the architecture you need.
::

::basicExpand{heading="How can I secure workloads in Google Cloud Platform?" componentType="h3"}
#description
Workload Identity Federation is a combination of secure steps allowing GitHub Actions to impersonate the service account and perform all the actions against the Google Cloud Platform. The best part is that it's simpler to use than service account keys (after implementing the Workload Identity Federation part). Workload Identity Federation requires a bit of more upfront configuration, but it's worth the effort. Essentially, you configure the resources on the Google Cloud Platform side and the actions on GitHub. The rest of the process is transparent to a user since the exchange of keys happens in the background.
::

::basicExpand{heading="What is GCP Cloud Shell?" componentType="h3"}
#description
It's a VM in the Google Cloud Console you turn on to perform operations against your Google Cloud project. The best part is that it is free, so you can log in from anywhere, even if you don't have your computer. It's helpful if you need to run some operations against the project or verify something. Although it's not a fully-fledged bastion host, it's very close to it.
::
::
