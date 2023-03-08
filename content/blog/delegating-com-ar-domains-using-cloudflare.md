---
title: 'Delegating a .com.ar domain with Cloudflare | Gonzalo Hirsch'
description: "Delegating a .com.ar domain using Cloudflare might be daunting, but you might realize it's easier than you expected. Leverage their FREE DNS to power your sites."
headline: 'Delegating a .com.ar domain using Cloudflare'
excerpt: "Delegating a .com.ar domain using Cloudflare might be daunting, but you might realize it's easier than you expected. Leverage their FREE DNS to power your sites."
date: '2023-02-07T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
    src: '/img/blog--delegating-com-ar-domains-using-cloudflare.webp'
    mime: 'webp'
    alt: 'Illustration with the text "Delegating a .com.ar domain using Cloudflare"'
    width: 1200
    height: 630
faq:
    - question: 'Where to register a domain name in Argentina?'
      answer: "Nic.ar is the most significant authority in Argentina that offers domain name registrations. Registering a domain is simple enough, and the site walks you through the entire process. There's a caveat though if you are a non-Argentinian resident, you need to validate your identity."
    - question: 'How to delegate a .com.ar name?'
      answer: 'Delegating is a simple process too. After buying the custom domain and logging in to the Nic.ar registrar page, you can select the option to delegate your domain. You will then need to choose to start a new delegation. You need to add your DNS server names and save them.'
    - question: 'What if you already have some existing infrastructure?'
      answer: "<p>In my personal experience, I have infrastructure running on AWS, and I wanted my domain to redirect (with a CNAME record) to another. I didn't want to pay for another hosted zone, so I used Cloudflare DNS. More configurations are required to keep serving traffic with SSL under those conditions:<ol><li>An SSL certificate that includes both your .com and .com.ar domains. Because AWS CloudFront doesn't support adding multiple SSL certificates to a distribution, a single certificate is required.</li><li>Configure the SSL/TLS encryption mode to Full (strict) to correctly use SSL/TLS. It ensures communication is always via HTTPS so that your visitors and traffic are safe.</li><li>A new CNAME record for your apex zone because you don't have a public IP address for your CloudFront distribution. Cloudflare supports CNAME flattening on the apex zone.</li></ol></p>"
# tags: []
---

**Registering a domain in Argentina can be inexpensiv**e. When writing this post, the [price for a `.com.ar` domain](https://nic.ar/es/dominios/dominios_y_aranceles) is around **855 ARS** (**less than 3 USD**). It can be a cheap way for someone to start branding their websites. Registering a domain name is useless unless you have access to a public DNS server to delegate your domain. Generally, DNS servers can be pricey, depending on your providers. In this guide, I'll show you can start delegating a `.com.ar` domain using Cloudflare, taking advantage of their free DNS.

A **domain registrar** offers domain name registrations. A registrar is an entity that allows you to register and purchase a domain. To have control of the response from the DNS service, you need to perform a delegation. A **delegation** is a process of defining alternate DNS servers that respond when looking for the authority of your domain or subdomain. You define a set of servers that take care of those queries.

## Where to register a domain name in Argentina?

Currently, [Nic.ar](https://nic.ar/es) is the most significant authority in Argentina that offers domain name registrations. Registering a domain is simple enough, and the site walks you through the entire process. There's a caveat though if you are a non-Argentinian resident, you need to validate your identity as described [here](https://nic.ar/es/ayuda/atencion_a_usuarios/no-residentes).

## How to delegate a .com.ar name?

Delegating is a simple process too. After buying the custom domain and logging in to the Nic.ar registrar page, you will see the following:

![Delegate option in Nic.ar.](/img/blog--delegating-com-ar-domains-using-cloudflare--ar-step-1.webp)

You can select the option to delegate your domain. You will then need to choose to start a new delegation, as shown here:

![Create a new delegation option in Nic.ar.](/img/blog--delegating-com-ar-domains-using-cloudflare--ar-step-2.webp)

The only missing step is to add your DNS server names and save them. You might not have your nameservers yet, so keep reading to learn how to obtain them from Cloudflare.

![Adding the nameservers to the delegation.](/img/blog--delegating-com-ar-domains-using-cloudflare--ar-step-3.webp)

You can list as many nameservers as you want. The delegation process might take up to 1 hour to start working.

Nic.ar also offers a [tutorial](https://nic.ar/es/ayuda/instructivos/delegacion-de-dominios) on delegating domains, which goes into more detail.

## Using Cloudflare's free DNS

The first step to using [Cloudflare](https://www.cloudflare.com/)'s free DNS is to create an account in Cloudflare. Once you have an account, you can head into the "Websites" option in the menu and add a site.

![Creating a new website in Cloudflare.](/img/blog--delegating-com-ar-domains-using-cloudflare--cf-step-1.webp)

After using the same domain name you registered, Cloudflare will run some checks and prompt you to select a pricing plan. I recommend you choose the free plan they offer.

![Selecting the free Cloudflare princing plan.](/img/blog--delegating-com-ar-domains-using-cloudflare--cf-step-2.webp)

After choosing the plan, Cloudflare will run some checks for any existing DNS configuration, and you will have access to the management console for your site. When you access a configured site for the first time, it shows you Cloudflare's nameservers you should use. In my case, they were `tosana.ns.cloudflare.com` and `ziggy.ns.cloudflare.com`, but yours might differ.

![Cloudflare's DNS nameservers.](/img/blog--delegating-com-ar-domains-using-cloudflare--cf-step-3.webp)

The nameservers you see are the ones you should use in your `.com.ar` domain delegation. Note that **it might take 24 hours** for the nameservers to notice updates.

With DNS resolution working, you should add an `A` or `AAAA` record from your apex name to your public IP address. It is optional, as you might not have an IP address to use, so read on to see instructions on that case. You can also add an MX record for email configuration.

## What if you already have some existing infrastructure?

In my personal experience, I have infrastructure running on AWS, and I wanted my gonzalohirsch.com.ar domain to redirect (with a CNAME record) to gonzalohirsch.com. I didn't want to pay for another [hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html), so I used Cloudflare DNS. More configurations are required to keep serving traffic with SSL under those conditions:

1. **An SSL certificate** that includes both your `.com` and `.com.ar` domains. Because [AWS CloudFront](https://aws.amazon.com/cloudfront/) doesn't support adding multiple SSL certificates to a distribution, a single certificate is required. With the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/), you can create a certificate that meets these requirements. A CNAME record in your Cloudflare DNS and your hosted zone in AWS is required to validate the certificate. You can add a DNS record in Cloudflare via the "DNS" menu option. Use this new SSL certificate in your CloudFront distribution.
2. **Configure the SSL/TLS encryption mode to Full (strict)** to correctly use SSL/TLS. It ensures communication is always via HTTPS so that your visitors and traffic are safe.
3. A **new CNAME record for your apex zone** because you don't have a public IP address for your CloudFront distribution. Cloudflare supports [CNAME flattening](https://developers.cloudflare.com/dns/additional-options/cname-flattening/) on the apex zone. It means you can have a CNAME record to resolve your new domain. You could have a CNAME DNS record for your WWW domain too.

I hope my personal experience helps you set up your site and DNS faster. Delegating a `.com.ar` domain using Cloudflare might be daunting, but you might realize it's easier than you expected. Having proper SSL/TLS can help you rank better too. Don't overlook that aspect.
