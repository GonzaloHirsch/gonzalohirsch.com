---
dqid: 'gcp-cloud-run-virtually-free-serverless-containers'
title: 'GCP Cloud Run for Virtually Free Serverless Containers'
description: 'GCP Cloud Run allows you to automatically scale enterprise-level deployments using serverless Docker containers without management overhead in Google Cloud.'
headline: 'GCP Cloud Run for Virtually Free Serverless Containers'
excerpt: 'GCP Cloud Run allows you to automatically scale enterprise-level deployments using serverless Docker containers without management overhead in Google Cloud.'
date: '2024-04-03T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--gcp-cloud-run-virtually-free-serverless-containers.webp'
  mime: 'webp'
  alt: 'Illustration with the text "GCP Cloud Run for Virtually Free Serverless Containers"'
  width: 1200
  height: 630
faq:
  - question: 'What is Cloud Run?'
    answer: "Cloud Run is one of the serverless computing services from the Google Cloud Platform. In it, you run Docker container images that are purpose-built for your application. You can run it as a service or as a job. The main difference between the two approaches is that jobs have a finite life, while services don't. You usually run websites or APIs as a Cloud Run service and batch jobs as Cloud Run jobs."

  - question: 'How does GCP Cloud Run work?'
    answer: 'Google Cloud Run uses Docker images to run serverless workloads. Those Docker images have all the application code bundled in, so they are ready to execute the code. A revision is a version of the Cloud Run service or job. A revision can have multiple instances of the Docker image running.'

  - question: 'Does Cloud Run have any pitfalls?'
    answer: 'The main two limitations are that Docker images can only come from the Artifact Registry and the Docker Hub, and cold starts can happen when there is no active or idle instance to handle your request. In this case, Cloud Run spins up a new instance to do so, but that can take a considerable amount of time, depending on your image. Apart from those limitations, Cloud Run has service quotas, which are limits imposed by GCP.'

  - question: 'How do I configure a Cloud Run service?'
    answer: 'You get to pick the minimum and maximum number of instances the service has. Choosing a minimum instance number greater than 0 ensures that several containers will always be idle. You also define the number of concurrent requests that each instance will handle. You configure the timeout for requests, which goes up to 60 minutes. You define the Service Account that will execute the Cloud Run service, which inherits the permissions from the Service Account. You can place GCP Cloud Run services in VPCs using direct VPC egress or VPC connectors. To configure the container, define the image, arguments, run commands, and environment. All of that ensures that you have a consistent container configuration each time. You can mount secrets into a container as environment variables. Within the container configuration, you also define liveness and startup probes for each container, which verify if the container is alive and started, respectively. Traffic routing defines which percentage of traffic goes into the revision, allowing you to configure split traffic for AB testing.'

  - question: 'How does Cloud Run integrate with other GCP services?'
    answer: 'You can combine a Cloud Run service with multiple other GCP services. You can have custom domains for Cloud Run by using an Application Load Balancer in front of it, which forwards requests to the configured Cloud Run service. You can use Cloud PubSub for asynchronous communication. PUSH services work better with Cloud Run. To schedule some workloads, you could use Cloud Run Jobs or combine a GCP Cloud Scheduler (or more than one) to send HTTP requests to the target Cloud Run Service. You can natively connect a Google Cloud SQL instance to the Cloud Run service. Alternatively, you can directly connect with a database service using the traditional mechanisms offered by the database service. You can use Cloud Build to prepare the Docker images for your workload in Google Cloud. It is the perfect choice to abstract and standardize the image where your builds happen, removing local computers from the equation.'

  - question: 'Are there any alternatives to Cloud Run?'
    answer: 'These are some of the most common alternatives to Cloud Run. You can use a Cloud Function to focus on the application code of the function you want to run. The new Cloud Functions engine in Google Cloud uses Cloud Run as the backend, so essentially, you are abstracting the Docker image part of it. Compute Engine is an Infrastructure as a Service, which means you handle all the provisioning and scaling. You handle all the operational aspects, needing more expertise and time commitment. GKE is a service that allows you to run Kubernetes workloads in the cloud. You can use it to work with Kubernetes. App Engine simplifies deployments, but you retain significantly less control than Cloud Run.'

  - question: 'Should I use Cloud Run GCP?'
    answer: 'If you are looking for ways to run some personal projects or small workloads in the cloud, paying the least amount possible, Google Cloud Run might suit you. Working with enterprise-scale applications is an option since Cloud Run can scale significantly. Look at your use cases and analyze how you need it to scale, when, and how long it runs. After you analyze that, you are ready to pick which service you can use.'
# tags: []
---

You've probably read about GCP Cloud Run in one of my [posts](https://gonzalohirsch.com/blog/nuxt-3-free-ssr-configuration/) or [online](https://youtu.be/cw34KMPSt4k?si=Tdv1iIC336NXvZ01) and wondered if you could use it. Although it doesn't have the great publicity it deserves, it is a fantastic Google Cloud service for serverless containers at a great price. **I'm here to answer the most common questions around Cloud Run to expand your horizon for serverless container service options.**

## What is Cloud Run?

[Cloud Run](https://cloud.google.com/run) is one of the **serverless computing services from the Google Cloud Platform**. In it, you **run Docker container images** that are purpose-built for your application.

You have two (2) ways of running Cloud Run. **You can run it as a service or as a job.** The main difference between the two approaches is that **jobs have a finite life, while services don't**. You usually run websites or APIs as a Cloud Run service and batch jobs as Cloud Run jobs.

## How does GCP Cloud Run work?

**Google Cloud Run uses Docker images to run serverless workloads.** Those Docker images have all the application code bundled in, so they are ready to execute the code.

**Cloud Run manages the concept of revisions and instances.** A **revision** is a **version of the Cloud Run service or job**. You could have different revisions because you have updated your application code, made changes to the environment, or any other configuration change from the previous revision, which might trigger a new revision. A revision can have multiple instances of the Docker image running. An **instance** is a **[Virtual Machine](https://www.vmware.com/topics/glossary/content/virtual-machine.html) running the Docker image you specify for your revision**. It handles receiving your requests or jobs.

**Essentially, instances can have two states: idle or active. Active instances are the ones handling requests or running jobs.** An instance **becomes [idle](https://cloud.google.com/run/docs/about-instance-autoscaling#idle-instance) after it finishes the request**, and there's no other request to process. **It stays idle for 15 minutes**, and after that, it stops. If it receives a request while idle, it goes back to the active state. You can minimize cold starts by using idle instances that are always ready, but that increases the cost.

## Does Cloud Run have any pitfalls?

**Not every cloud provider service is perfect**, and Cloud Run is proof of it. These are some of the main limitations regarding the service:

- **Docker images can only come from the [Artifact Registry](https://cloud.google.com/artifact-registry/docs/overview) and the [Docker Hub](https://hub.docker.com/) (source [here](https://cloud.google.com/run/docs/deploying#images)).** You are limited to those two sources for images, which can be a deal-breaker, depending on your company policies. You could always pull an image locally and re-upload it to the corresponding registry.
- **[Cold starts](https://cloud.google.com/run/docs/tips/general#use_minimum_instances_to_reduce_cold_starts) can happen when there is no active or idle instance to handle your request.** In this case, Cloud Run spins up a new instance to do so, but that can take a considerable amount of time, depending on your image. It means that the latency during the startup time of your instance will be high. Having a minimum amount of container instances will help you at the expense of an increased cost.

If you are interested in the service quotas (limits imposed by the Google Cloud Platform), you can read about those [here](https://cloud.google.com/run/quotas).

## How do I configure a Cloud Run service?

I have significantly more experience working with Cloud Run services, so we'll focus on going through the configuration for one of those. To simplify explaining it, I'll list the configuration components and walk you through what each of those means. I will use the [Terraform documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service) for the reference.

### Scalability

You get to **pick the [minimum and maximum number of instances](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#nested_scaling) the service has**. Choosing a minimum instance number greater than 0 ensures that several containers will always be idle. You also define the [number of concurrent requests](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#max_instance_request_concurrency) that each instance will handle.

For example, having a maximum number of instances of 10 and a maximum concurrency of 15 ensures your service can handle up to 150 simultaneous requests.

You configure the [timeout](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#timeout) for requests, which goes up to 60 minutes.

### Execution permissions via Service Accounts

You define the [Service Account](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#service_account) that will execute the Cloud Run service. It means that the service inherits the permissions from the Service Account.

### VPC configuration

You can place GCP Cloud Run services in [VPCs](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#nested_vpc_access) ([restricted to some regions](https://cloud.google.com/run/docs/locations#direct)). There are two options for [configuring VPC access](https://cloud.google.com/run/docs/configuring/connecting-vpc): **direct VPC egress or VPC connectors**. It defines how traffic for ingress and egress flows.

### Container configuration

To configure the [container](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#nested_containers), define the image, arguments, run commands, and environment. All of that ensures that you have a consistent container configuration each time. You can mount secrets into a container as environment variables.

Within the container configuration, you also define liveness and startup probes for each container, which verify if the container is alive and started, respectively.

### Traffic routing

[Traffic routing](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#nested_traffic) defines which percentage of traffic goes into the revision, allowing you to configure split traffic for AB testing.

## How does Cloud Run integrate with other GCP services?

GCP being the integrated ecosystem it is, you can combine a Cloud Run service with multiple other GCP services. These are some scenarios and how to combine them with other GCP services.

- **Custom domains for Cloud Run**: To add a custom domain to a Cloud Run service, you should put an Application Load Balancer in front of it. You can then configure an [APEX domain record](https://www.easyredir.com/blog/what-is-an-apex-domain/) against the Load Balancer IP. The Load Balancer will forward requests to the configured Cloud Run service. More information on that approach is [here](https://cloud.google.com/run/docs/mapping-custom-domains).
- **Notifications for workloads**: If you want to use a notification system for your workloads, you can use Cloud PubSub. You could have PUSH or PULL services, depending on the type of architecture that you need. PUSH services work better with Cloud Run, while PULL services work better with App Engine or Compute Engine. More information on that approach is [here](https://cloud.google.com/eventarc/docs/run/pubsub-authenticated).
- **Scheduling for workloads**: To schedule some workloads, you could use Cloud Run Jobs or combine a GCP Cloud Scheduler (or more than one) to send HTTP requests to the target Cloud Run Service. More information on that approach [here](https://cloud.google.com/run/docs/triggering/using-scheduler).
- **Databases for workloads**: You can natively connect a Google Cloud SQL instance to the Cloud Run service. Alternatively, you can directly connect with a database service using the traditional mechanisms offered by the database service. More information on that connection is [here](https://cloud.google.com/sql/docs/mysql/connect-run).
- **Remotely building workloads**: You can use Cloud Build to prepare the Docker images for your workload in Google Cloud. It is the perfect choice to abstract and standardize the image where your builds happen, removing local computers from the equation. More information on that connection is [here](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run).

Above, you have some use case scenarios that you might encounter, but there are dozens of ways to connect your Google Cloud Run instances with other Google Cloud services. You can even connect to services like [AWS CloudFront](/blog/nuxt-3-free-ssr-configuration/).

## Are there any alternatives to Cloud Run?

There are alternatives to Google Cloud Run in Google Cloud. These are some of the most common ones and how they differ from Cloud Run.

- [Google Cloud Function](https://cloud.google.com/functions): You can use a Cloud Function to focus on the application code of the function you want to run. The new Cloud Functions engine in Google Cloud uses Cloud Run as the backend, so essentially, you are abstracting the Docker image part of it.
- [Compute Engine](https://cloud.google.com/products/compute): This Cloud Computing service is an Infrastructure as a Service, which means you handle all the provisioning and scaling. You handle all the operational aspects, needing more expertise and time commitment.
- [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine): GKE is a service that allows you to run Kubernetes workloads in the cloud. You can use it to work with Kubernetes.
- [Google App Engine](https://cloud.google.com/appengine): This platform simplifies deployments, but you retain significantly less control than with Cloud Run. For example, this service scales more slowly than Cloud Run.

## Should I use Cloud Run GCP?

If you are looking for ways to run some personal projects or small workloads in the cloud, paying the least amount possible, Google Cloud Run might suit you. Working with enterprise-scale applications is an option since Cloud Run can scale significantly.

I recommend you look at your use cases and analyze how you need it to scale, when, and how long it runs. After you analyze that, you are ready to pick which service you can use.

::backToBasics

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future implementations.

::basicExpand{heading="What is Cloud Run?" componentType="h3"}
#description
Cloud Run is one of the serverless computing services from the Google Cloud Platform. In it, you run Docker container images that are purpose-built for your application. You can run it as a service or as a job. The main difference between the two approaches is that jobs have a finite life, while services don't. You usually run websites or APIs as a Cloud Run service and batch jobs as Cloud Run jobs.
::

::basicExpand{heading="How does GCP Cloud Run work?" componentType="h3"}
#description
Google Cloud Run uses Docker images to run serverless workloads. Those Docker images have all the application code bundled in, so they are ready to execute the code. A revision is a version of the Cloud Run service or job. A revision can have multiple instances of the Docker image running.
::

::basicExpand{heading="Does Cloud Run have any pitfalls?" componentType="h3"}
#description
The main two limitations are that Docker images can only come from the Artifact Registry and the Docker Hub, and cold starts can happen when there is no active or idle instance to handle your request. In this case, Cloud Run spins up a new instance to do so, but that can take a considerable amount of time, depending on your image. Apart from those limitations, Cloud Run has service quotas, which are limits imposed by GCP.
::

::basicExpand{heading="How do I configure a Cloud Run service?" componentType="h3"}
#description
You get to pick the minimum and maximum number of instances the service has. Choosing a minimum instance number greater than 0 ensures that several containers will always be idle. You also define the number of concurrent requests that each instance will handle. You configure the timeout for requests, which goes up to 60 minutes. You define the Service Account that will execute the Cloud Run service, which inherits the permissions from the Service Account. You can place GCP Cloud Run services in VPCs using direct VPC egress or VPC connectors. To configure the container, define the image, arguments, run commands, and environment. All of that ensures that you have a consistent container configuration each time. You can mount secrets into a container as environment variables. Within the container configuration, you also define liveness and startup probes for each container, which verify if the container is alive and started, respectively. Traffic routing defines which percentage of traffic goes into the revision, allowing you to configure split traffic for AB testing.
::

::basicExpand{heading="How does Cloud Run integrate with other GCP services?" componentType="h3"}
#description
You can combine a Cloud Run service with multiple other GCP services. You can have custom domains for Cloud Run by using an Application Load Balancer in front of it, which forwards requests to the configured Cloud Run service. You can use Cloud PubSub for asynchronous communication. PUSH services work better with Cloud Run. To schedule some workloads, you could use Cloud Run Jobs or combine a GCP Cloud Scheduler (or more than one) to send HTTP requests to the target Cloud Run Service. You can natively connect a Google Cloud SQL instance to the Cloud Run service. Alternatively, you can directly connect with a database service using the traditional mechanisms offered by the database service. You can use Cloud Build to prepare the Docker images for your workload in Google Cloud. It is the perfect choice to abstract and standardize the image where your builds happen, removing local computers from the equation.
::

::basicExpand{heading="Are there any alternatives to Cloud Run?" componentType="h3"}
#description
These are some of the most common alternatives to Cloud Run. You can use a Cloud Function to focus on the application code of the function you want to run. The new Cloud Functions engine in Google Cloud uses Cloud Run as the backend, so essentially, you are abstracting the Docker image part of it. Compute Engine is an Infrastructure as a Service, which means you handle all the provisioning and scaling. You handle all the operational aspects, needing more expertise and time commitment. GKE is a service that allows you to run Kubernetes workloads in the cloud. You can use it to work with Kubernetes. App Engine simplifies deployments, but you retain significantly less control than Cloud Run.
::

::basicExpand{heading="Should I use Cloud Run GCP?" componentType="h3"}
#description
If you are looking for ways to run some personal projects or small workloads in the cloud, paying the least amount possible, Google Cloud Run might suit you. Working with enterprise-scale applications is an option since Cloud Run can scale significantly. Look at your use cases and analyze how you need it to scale, when, and how long it runs. After you analyze that, you are ready to pick which service you can use.
::
::
