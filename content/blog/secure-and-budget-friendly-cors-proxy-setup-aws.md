---
dqid: 'cors-proxy-aws-setup'
title: 'Secure and Budget-Friendly CORS Proxy Setup in AWS | Gonzalo Hirsch'
description: 'Build robust and cost-efficient CORS proxies on AWS with our comprehensive guide, ensuring smooth cross-origin interaction for your applications.'
headline: 'Secure and Budget-Friendly CORS Proxy Setup in AWS'
excerpt: 'Build robust and cost-efficient CORS proxies on AWS with our comprehensive guide, ensuring smooth cross-origin interaction for your applications.'
date: '2023-08-15T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--secure-and-budget-friendly-cors-proxy-setup-aws.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Secure and Budget-Friendly CORS Proxy Setup in AWS"'
  width: 1200
  height: 630
faq:
  - question: 'What is Cross-Origin Resource Sharing (CORS)?'
    answer: 'CORS (Cross-Origin Resource Sharing) is a mechanism in modern web browsers that controls how websites from one domain access resources from another. It aims to prevent unauthorized access and security risks arising from interactions across different resource origins. CORS enforces the same origin policy, which restricts cross-origin requests by default. If a website intends to request a cross-origin resource, the target server must include the correct CORS headers to allow it. It prevents malicious websites from trying to make unauthorized requests.'
  - question: 'What is a CORS proxy?'
    answer: "CORS proxies are middleman servers that relay your requests to a secondary origin that might be using CORS. In this scenario, the secondary server doesn't allow cross-origin requests via browsers, but this doesn't mean it prevents other servers from accessing its resources. Using the proxy, your communication from 'browser -> secondary server' becomes a 'browser -> proxy -> secondary server' communication. Essentially, you use the CORS proxy to bypass the limitations of the secondary server's CORS policy."
  - question: 'Why use a CORS proxy?'
    answer: "Without accounting for malicious purposes, you can be interested in integrating a third party, but you might not have control over their Cross Origin Resource Sharing (CORS) policy. For example, I integrate Letterboxd (a fantastic service) using a proxy because their RSS feeds don't have a permissive CORS policy. Because I don't have control of their servers, I cannot enable CORS to add the necessary CORS headers to their responses."
  - question: 'Why should I avoid a third-party CORS proxy?'
    answer: "Nowadays, hundreds of cheap or free CORS proxies advertise their services on the web. These hassle-free solutions are tempting, but in reality, it is significantly dangerous to use them. You could be giving away sensitive data in the process. Because you have no control over the proxy, you don't know what data they store and whether or not they copy the data you send to and receive from the proxy server. You will be avoiding a CORS error, but at what cost?"
# tags: []
---

I'm sure that at one point in your life, you faced the following message:

```bash
Access to fetch at 'XXXX' from origin "XXXX' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
If an opaque response serves your needs, set the request's mode to 'no-cors'
to fetch the resource with CORS disabled.
```

This annoying message probably had you troubleshooting for hours, only to find that **it's not your fault**. Although **Cross-Origin Resource Sharing (CORS) is there to protect end users and websites, in some cases, it hinders the ability to integrate third-party services**.

CORS proxies act as a middleman for clients and requests for third-party data, adding the necessary CORS header to make your requests work. There are myriad online CORS proxies, but at an enterprise level (even on a personal level), using those free proxies is a significant security risk. **If you feel tempted to solve your issues with a no-cost and quick-to-implement proxy server, what's the actual cost? Your privacy and your data**.

There's a way to run a cheap and secure CORS proxy server in AWS, basically for free. If you keep reading, you'll find how to **spin up an AWS Lambda-based proxy function that scales automatically and is virtually cost-free**.

Let's start with some basics!

## What is Cross-Origin Resource Sharing (CORS)?

**CORS (Cross-Origin Resource Sharing)** is a mechanism in modern web browsers that **controls how websites from one domain access resources from another**. It aims to prevent unauthorized access and security risks arising from interactions across different resource origins. CORS enforces the same origin policy, which restricts cross-origin requests by default. If a website intends to request a cross-origin resource, the target server must include the correct CORS headers to allow it. It prevents malicious websites from trying to make unauthorized requests.

## What is a CORS proxy?

**CORS proxies are middleman servers that relay your requests to a secondary origin that might be using CORS**. In this scenario, the secondary server doesn't allow cross-origin requests via browsers, but this doesn't mean it prevents other servers from accessing its resources. Using the proxy, your communication from "browser -> secondary server" becomes a "browser -> proxy -> secondary server" communication. Essentially, **you use the CORS proxy to bypass the limitations of the secondary server's CORS policy**.

## Why use a CORS proxy?

Without accounting for malicious purposes, you can be interested in integrating a third party, but **you might not have control over their Cross Origin Resource Sharing (CORS) policy**. For example, I integrate Letterboxd (a fantastic service) using a proxy because their RSS feeds don't have a permissive CORS policy. Because I don't have control of their servers, I cannot enable CORS to add the necessary CORS headers to their responses.

## Why should I avoid a third-party CORS proxy?

Nowadays, hundreds of cheap or free CORS proxies advertise their services on the web. These hassle-free solutions are tempting, but in reality, it is significantly dangerous to use them. You could be giving away sensitive data in the process.

Because you have no control over the proxy, **you don't know what data they store and whether or not they copy the data you send to and receive from the proxy server**.

You will be avoiding a CORS error, but at what cost?

## Implementing a secure (and cheap!) CORS proxy

**Server-based proxies you manage are great performance-wise**, but you need to handle server management, and the cost of an EC2 instance in AWS running 24/7 can be astronomical, especially if you run a high volume of requests. In that case, **you need scalability and observability over your servers**. At this point, you can imagine the **management overhead** that goes into this solution.

By leveraging AWS Lambda and AWS API Gateway, you can quickly create a CORS proxy API that automatically scales to handle your traffic. The best part? **It's virtually free!** You'll have a secure and budget-friendly CORS proxy setup in AWS.

## The Lambda function

We can break down the function into several components performing different critical functions.

### Behavior

The function behavior is straightforward. It needs to grab the target URL (and parameters), send an actual request to a different domain, get the response, and then return it to the caller. The function should also forward the HTTP headers sent to it (using a specific format to determine which ones to send) and set any response header sent by the target web server.

There are several ways to configure the function itself. One approach is to take one query parameter for each critical part (HTTP method, body, URL, etc) of the request. Another is to use the HTTP method you want to send and have URL parameters. I leave it as an exercise to you, the reader, to define which configuration is more useful in your scenario.

### Security

There are two main options for the Lambda behavior towards any incoming HTTP request:

1. You proxy any incoming request.
2. You proxy only to an allowed list of target servers.

**Option 1 is more practical, though unsafe.** It's more efficient as it allows you to quickly proxy to new destinations, but having any allowed origin can become a liability if not managed properly.

**Option 2 requires more management but allows only an allowed set of origins for CORS support.** It uses DynamoDB to make up a list of viable HTTP targets for the proxied HTTP request. In this scenario, you manually add new targets to the DynamoDB list.

You can test your proxy using the Cross-Origin Resource Sharing OWASP [guide](https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/11-Client_Side_Testing/07-Testing_Cross_Origin_Resource_Sharing). OWASP is the Open Source Foundation for Application Security, a foundation that provides free information on security for your apps. You can leverage their guides to test your implementation.

### Headers

Before returning the response, the function needs to set the `Access-Control-Allow-Origin` and `Access-Control-Allow-Credentials` CORS headers. The allowed origin header can be anywhere (`"\*"`) or the specific origins you define. It depends on the type of security you intend on having.

By configuring this, you are enabling CORS for your proxy. Otherwise, you'll get the same CORS issue, but this time with this CORS proxy instead of a third-party server.

```javascript
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
```

Note that you can configure other CORS allow headers that you might need. The above is a mere suggestion for a basic configuration.

### Relaying the HTTP request

The HTTP request can go through using [HTTPS](https://nodejs.org/api/https.html) or [Axios](https://axios-http.com/docs/intro). A simple implementation of the relay that returns one origin header and the response body is as follows:

```javascript
https
  .get(targetUrl, (res) => {
    // Build the response
    headers['Content-Type'] =
      res.rawHeaders[res.rawHeaders.indexOf('Content-Type') + 1];
    let responseBody = '';
    res.on('data', (chunk) => (responseBody += chunk));
    res.on('end', () => resolve(responseBody));
  })
  .on('error', (e) => reject(Error(e)));
```

Note that this implementation doesn't relay any request header from the cross origin request sent to the proxy.

### DynamoDB integration

**You can integrate DynamoDB to get the allowed list of target destinations**. The DynamoDB table can be a simple key and value. The route name is the key, while the URL is the value. The following snippet requests the document from the database, and then you can take that value and use it in a request.

```javascript
await dynamo.get({
  TableName: tableName,
  Key: {
    name: keyName,
  },
});
```

### Option requests

API Gateway needs to respond to the preflight OPTIONS request. **Without the ability to respond to the preflight CORS request, all requests to the proxy will fail**. You can configure this in API Gateway, not necessarily as part of the Lambda proxy configuration.

Note that Lambda proxy integration is not what we are using in this case. It refers to a different configuration for REST APIs using API Gateway and Lambda functions.

### Packages

For libraries/packages, the function can use [HTTPS](https://nodejs.org/api/https.html) from Node, the [Serverless](https://www.serverless.com/) framework, and the [AWS SDK](https://aws.amazon.com/sdk-for-javascript/) to perform all the operations.

As a bonus, you can add this endpoint as part of a backend API if you already have one in AWS Lambda through API Gateway.

### DNS

Once you deploy API Gateway in AWS, you can use Route 53 for DNS in AWS to provide your free CORS proxy with a memorable URL. This way, it can be easier to integrate with your frontend or web application.

## What about monitoring?

All AWS services have built-in monitoring features, especially Lambda and API Gateway, so there's no need to worry about that. You only worry about the CORS request.

## What about scalability?

By using this Lambda API Gateway solution, API Gateway and Lambda take care of scaling the service while you worry about coding.

If you need more concurrent invocations because you know the browser is sending many requests, you can use the Lambda provisioned concurrency. Note that this setup will increase the cost of your website proxy significantly.

## What about security for the proxy?

Funnily enough, you can secure your proxy using the CORS allow origin header and API keys. This way, a browser from a different origin won't be able to use it, and only select users with keys can access it.

## Closing thoughts

**A self-hosted AWS Lambda proxy is the best option to get security and keep costs within your budget**. You can probably deploy this entire solution in less than 1 hour, so it's worth trying it to explore more options to solve your CORS issue. I hope this (virtually) free CORS proxy solution can help you!

You can find a working example in this [public repository](https://github.com/GonzaloHirsch/proxy-serverless-api) on my GitHub account. Last, a gentle reminder to configure the OPTIONS request response so the CORS preflight request goes through.

If you are interested in other technology topics, [check out the rest of the blog](/blog/)! You can find more insights into [reducing Auth0 costs](/blog/reducing-auth0-bill-by-3000-dollars/) or help to [crack the AWS Solution Architect Associate examination](/blog/cracking-the-aws-solutions-architect-associate-certification/).
