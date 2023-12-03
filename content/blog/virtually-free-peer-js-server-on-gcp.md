---
dqid: 'free-peer-js-server-on-gcp'
title: 'Virtually Free Peer JS Server on GCP | Gonzalo Hirsch'
description: 'Create a cost-effective PeerJS server on GCP with Cloud Run and Terraform, simplifying WebRTC for small projects. Monitor usage to avoid unexpected charges.'
headline: 'Virtually Free Peer JS Server on GCP'
excerpt: 'Create a cost-effective PeerJS server on GCP with Cloud Run and Terraform, simplifying WebRTC for small projects. Monitor usage to avoid unexpected charges.'
date: '2023-12-03T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--virtually-free-peer-js-server-on-gcp.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Virtually Free Peer JS Server on GCP"'
  width: 1200
  height: 630
faq:
  - question: 'What is a firewall?'
    answer: 'A firewall is a barrier you can configure in front of your network to limit the traffic coming to and going out of it. Firewalls, in general, are used to prevent unwanted incoming connections from initiating a connection against our local machines. It can block specific ports and protocols for inbound and outbound connections.'
  - question: 'What is a NAT?'
    answer: 'NAT (or Network Address Translation) is a way to map multiple private IPs within a local network to a public IP before transmitting data to the internet. Routers are generally responsible for performing the NAT for inbound/outbound packets.'
  - question: 'What is a Signaling Server?'
    answer: 'A Signaling Server helps peers in your application or service find each other. Since no peer knows the other peers, there is no way for them to transmit the IP data to the other. At this point, a Signaling Server comes in. A Signaling Server acts as a third party (known by the peers) to help them find each other and exchange connection data so they can connect. Peers can register with the Signaling Server to indicate they are open for connections.'
  - question: 'What is a STUN Server?'
    answer: "A STUN Server helps peers identify their public IP addresses so they can register at the Signaling Server and manage to connect. It's helpful in the scenario where there is a NAT in at least one of the networks, so the peers aren't aware of their public IPs."
  - question: 'What is a TURN Server?'
    answer: 'A TURN Server acts as a middleman in scenarios where there are firewalls that prevent peers from initiating connections with each other. It provides a channel for peers to exchange data. Each peer starts a connection with the TURN server, and the server forwards the data each peer sends to the other. Note that when using TURN servers, all communication stops being peer-to-peer because the data travels through the TURN server.'
  - question: 'What is PeerJS?'
    answer: "PeerJS is a JavaScript wrapper for the browser's WebRTC implementation to simplify the implementation of WebRTC in a web application. WebRTC is an open-source project that provides a framework for web browsers and mobile applications to communicate. The PeerJS library offers an easy-to-use interface to simplify the adoption of the WebRTC API. The PeerJS API offers listeners for connection events and interfaces to simplify data exchange. This connection also supports real-time communication, meaning you can, for example, integrate an audio or video stream for a video chat application. You might be wondering what's the caveat in all of this, and you are right. There is one. You require a server to act as the Signaling Server (and possibly STUN or TURN server) to broker connections between peers. Although PeerJS offers a free-to-use version of their PeerJS server, that's not a setup suitable for a production environment of web real time communication."
# tags: []
---

**Peer-to-peer connections across the internet generally pose a challenge when ensuring they work correctly.** For them to work seamlessly across devices and network types, you usually need a [signaling server](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#the_signaling_server), a [STUN server](https://getstream.io/glossary/stun-server/), and a [TURN server](https://webrtc.org/getting-started/turn-server) optionally. **Opting for this setup allows you to bypass firewalls and NATs to ensure smooth communication** among your peers (quite a good read about this topic on this [site](https://support.medialooks.com/hc/en-us/articles/360000213312-%D0%95nvironment-signaling-STUN-and-TURN-servers) and this [one](https://www.toptal.com/webrtc/taming-webrtc-with-peerjs)). As you may have noticed, **this requires a server**, which can become a **limitation for small-scale applications and hobby projects**. Facing this limitation in a personal project, I found a **virtually free way to ensure peer-to-peer connection via GCP**.

Let's start with some networking and communication basics to ensure you can understand the full scope of the solution.

## Some of the basics

These are some helpful knowledge bits that will get you to understand the whole solution.

### What is a firewall?

A [firewall](https://www.cisco.com/c/en_uk/products/security/firewalls/what-is-a-firewall.html) is a **barrier you can configure in front of your network** to limit the traffic coming to and going out of it. Firewalls, in general, are used to **prevent unwanted incoming connections from initiating a connection** against our local machines. It can **block specific ports and protocols for inbound and outbound connections**.

_If you have two peers (Alfred and Batman) in different networks, the firewall blocks Alfred from initiating communication with Batman, and vice versa. In this case, none of them can start a connection with the other._

### What is a NAT?

NAT (or [Network Address Translation](https://www.comptia.org/content/guides/what-is-network-address-translation)) is a way to **map multiple private IPs within a local network to a public IP** before transmitting data to the internet. **Routers are generally responsible** for performing the NAT for inbound/outbound packets.

_Following the example of Alfred and Batman, if Alfred wanted to communicate with Batman, he would only know it's a public IP, not a private one. When there are tens of other devices in Batman's network, he cannot identify which is Batman._

### What is a Signaling Server?

A [Signaling Server](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#the_signaling_server) **helps peers** in your application or service **find each other**. Since no peer knows the other peers, there is no way for them to transmit the IP data to the other. At this point, a Signaling Server comes in.

A Signaling Server acts as a third party (known by the peers) to **help them find each other and exchange connection data so they can connect**. **Peers can register with the Signaling Server** to indicate they are open for connections.

_Let's continue with the Batman and Alfred scenario. If they don't know where the other is, both can send their location to the Batcave since they know its location. Since the Batcave knows where each other is, it can send their respective locations to Alfred and Batman. The Batcave acts as a signaling server._

### What is a STUN Server?

A [STUN Server](https://getstream.io/glossary/stun-server/) **helps peers identify their public IP addresses** so they can register at the Signaling Server and manage to connect. It's **helpful in the scenario where there is a NAT** in at least one of the networks, so the peers aren't aware of their public IPs.

_It would be equivalent to Alfred or Batman looking up their public IP online to send it to the Batcave. The online IP lookup service is a STUN server._

### What is a TURN Server?

A [TURN Server](https://webrtc.org/getting-started/turn-server) acts as a **middleman in scenarios where there are firewalls** that prevent peers from initiating connections with each other. It provides a **channel for peers to exchange data**. Each peer starts a connection with the TURN server, and the server forwards the data each peer sends to the other.

Note that **when using TURN servers, all communication stops being peer-to-peer** because the data travels through the TURN server.

_If Batman and Alfred cannot connect because of security protocols, they can call Robin in the Batcave. Robin then can tell Batman what Alfred says, and vice versa. Robin becomes a middleman and acts as a STUN server._

### What is PeerJS?

[PeerJS](https://peerjs.com/) is a **JavaScript wrapper for the browser's WebRTC implementation** to simplify the implementation of WebRTC in a web application. [WebRTC](https://webrtc.org/) is an **open-source project** that provides a framework for web browsers and mobile applications to communicate. The PeerJS library offers an easy-to-use interface to simplify the adoption of the WebRTC API.

The **PeerJS API offers listeners for connection events and interfaces to simplify data exchange**. This connection also supports real-time communication, meaning you can, for example, integrate an audio or video stream for a video chat application.

You might be wondering what's the caveat in all of this, and you are right. There is one. **You require a server to act as the Signaling Server (and possibly STUN or TURN server) to broker connections between peers**. Although **PeerJS offers a free-to-use** version of their **PeerJS server**, that's **not a setup suitable for a production environment** of web real time communication.

## PeerJS Server via Cloud Run

**The principal blocker for developers wanting to implement the WebRTC API is that running a dedicated server can have a significant cost**. Factoring in the need for public IPs and load balancing adds to the ever-growing cost of it. To get around this, you can use Cloud Run.

[Cloud Run](https://cloud.google.com/run?hl=en) is a **fully managed platform for containerized applications**. It allows you to define workloads and services that use containers as the underlying images, which are administered and automatically scaled (up and down) by the Cloud Run platform.

Developers can use Cloud Run to **run the open source image** of the [PeerJS server](https://github.com/peers/peerjs-server) and have an instance of the server where **they have complete control over the environment**. It is the server the PeerJS client, from the browser, will connect to.

The main advantage of Cloud Run is the **generous and permanent free tier** that allows hobby developers and small-scale applications to run applications in the platform. Said applications can handle a media connection and media stream (audio or video stream).

**Cloud Run works similarly to Lambda Functions**, where the container turns on when needed, ensuring you only pay for what you use. It means it also has the same disadvantage, which is cold starts. That's when the server is off and turns back on, which can add a couple of seconds to the initial request.

### Configuring the implementation

The following sections will explain how to configure all the components to ensure they all work correctly. All infrastructure elements will be set up via Terraform to ensure consistency.

Before starting any implementation, you should ensure that peer-to-peer communication is available for the web browser you expect your users to use. To do this, you can head to the following [site](https://caniuse.com/rtcpeerconnection), which lists browser support for the WebRTC APIs.

**Please note the following disclaimer. The solution is virtually free because the free tier covers certain usage levels.** For example, if a remote peer starts to open multiple connections and uses the app constantly for a month, you might incur some charges. Setting up a billing budget and alerts is a good practice that you should follow. **You are responsible for your cloud usage.**

### How to configure the PeerJS server via Cloud Run

#### Configuring a GCP account

**Start by creating an account** in [Google Cloud](https://cloud.google.com/gcp). You might need to add credit card details, but you shouldn't start to incur charges. You can [get $300 worth of credits](https://cloud.google.com/free/docs/free-cloud-features#free-trial) if you are a new user.

Once you have created an account, **install the** [gcloud CLI](https://cloud.google.com/sdk/docs/install). It will ensure Terraform has the necessary credentials when performing all the requests. After installing it, run the [login command](https://cloud.google.com/sdk/docs/authorizing) to authorize the tool.

#### Configuring the Google Cloud provider

Before defining the Terraform resources for the server and the billing budget, you should **create the provider configuration** for the Google Cloud module in Terraform.

```hcl[providers.tf]
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.3.0"
    }
  }
}

# Configure the GCP provider
provider "google" {
  project               = var.gcp_project_id
  region                = var.gcp_region
  billing_project       = var.gcp_project_id
  user_project_override = true
}
```

You might notice that some of the configurations use variables or local values. These are the definitions of those values.

```hcl[locals.tf]
locals {
  display_name = "tictactoe"
  # GCP APIS
  apis = ["billingbudgets.googleapis.com", "run.googleapis.com", "iam.googleapis.com", "cloudresourcemanager.googleapis.com", "cloudbilling.googleapis.com"]
  # Server locals
  server_name  = "${local.display_name}-server"
  server_image = "docker.io/peerjs/peerjs-server:latest"
  server_key   = md5(var.base_server_key)
}
```

```hcl[variables.tf]
variable "base_server_key" {
  type        = string
  description = "Server key to be used in connections."
}
variable "gcp_region" {
  type        = string
  description = "Region to use for GCP. By default is `europe-west1`."
  default     = "europe-west1"
}
variable "gcp_project_id" {
  type        = string
  description = "ID for the GCP project compute resources."
}
```

#### Enabling the relevant Google Cloud APIs

**Google Cloud's service model works with APIs**. Before using a service, **you need to enable its API**. You can do this **programmatically with Terraform**, which gives you the advantage of being declarative over what you configure in your project.

```hcl[apis.tf]
resource "google_project_service" "apis" {
  project            = var.gcp_project_id
  for_each           = toset(local.apis)
  service            = each.key
  disable_on_destroy = false
}
```

#### Creating the Cloud Run service

For the PeerJS server, we are using the [open source implementation](https://github.com/peers/peerjs-server) PeerJS offers. The team behind **PeerJS is kind enough to provide a Docker image already built** in the following URL: `docker.io/peerjs/peerjs-server`. You could also generate the image yourself, but **it saves the cost of hosting it**.

The following Terraform snippet contains the **deployment for the PeerJS server in Cloud Run**:

```hcl[server.tf]
resource "google_cloud_run_service" "default" {
  name     = local.server_name
  project  = var.gcp_project_id
  location = var.gcp_region

  # Metadata to note allow all ingress.
  metadata {
    annotations = {
      "run.googleapis.com/ingress"        = "all"
      "run.googleapis.com/ingress-status" = "all"
    }
  }

  # Container template
  template {
    metadata {
      # Ensure the correct annotations for scale and not continuously allocated.
      annotations = {
        "run.googleapis.com/startup-cpu-boost" = false
        "autoscaling.knative.dev/maxScale"     = 1
      }
    }
    spec {
      # Container request limits.
      container_concurrency = 50
      timeout_seconds       = 300
      containers {
        # Image and port configuration for the Peer JS server.
        image = local.server_image
        ports {
          container_port = 9000
        }
        # Arguments you send to the container.
        args = ["--allow_discovery", "--key", "${local.server_key}"]
        # Resources allocated for the container.
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
        # Probe to determine if the container started correctly.
        startup_probe {
          timeout_seconds   = 240
          period_seconds    = 240
          failure_threshold = 1
          tcp_socket {
            port = 9000
          }
        }

      }
    }
  }
  # Traffic allocation to the revisions is always 100%.
  traffic {
    percent         = 100
    latest_revision = true
  }
}
```

Note the following from the configuration:

- The ingress annotations **allow traffic from anywhere**.
- The template metadata annotations limit the **maximum number of container instances to 1** and **prevent the CPU from being constantly on** (which increases the cost). The documentation doesn't specify this, but **the maximum amount of container instances is 1** (it outlines it in the [App Engine deployment example](https://github.com/peers/peerjs-server#running-in-google-app-engine)).
- The **container concurrency limits the number of requests handled at the same time**. If you expect higher traffic, you can change this.
- The **container port must be in port 9000** as per the documentation for the PeerJS server.
- You can **send parameters to the container, which allows you to customize your deployment**. I recommend adding the `allow_discovery` flag and the server `key` option to **make your implementation more robust**.
- The **container is limited to 1 vCPU and 512 MB of memory**, which is more than enough for an initial implementation. **A full production deployment would probably have more resources allocated to it**.
- When you configure a **startup probe**, ensure the **port is the container port**, so **port 9000**.
- All the **traffic automatically goes to the latest revision**. It is necessary to prevent a remote peer from using an older version.

For the instance to be open to the internet, **you also need a policy that allows all users (unauthenticated as well) to send requests to the server**. Along with that, a policy attachment to Cloud Run. The following Terraform resources take care of that.

```hcl[server.tf (continued)]
# Policy for no authentication.
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

# Policy to allow unauthenticated requests.
resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
```

If you are deploying this from the Google Cloud Console, please copy the configurations from the Terraform file and ensure that all unauthenticated requests are allowed. This way, any remote peer will be able to access the server.

#### Creating a billing budget

The [billing budget](https://cloud.google.com/billing/docs/how-to/budgets) is one of the most relevant aspects of the deployment because it **ensures that you are spending (or consuming) the amount of money you feel comfortable with**. See below for an example of the billing budget I configured. It is for 1 US dollar, and I receive a notification after half of it is gone.

```hcl[billing.tf]
data "google_billing_account" "account" {
  provider     = google
  display_name = "My Billing Account"
}

# Billing limits for the GCP project.
resource "google_billing_budget" "budget" {
  billing_account = data.google_billing_account.account.id
  display_name    = "Billing Budget"
  # Max budget is 1 USD.
  amount {
    specified_amount {
      currency_code = "USD"
      units         = "1"
    }
  }
  # Alerts at 50% of the budget.
  threshold_rules {
    threshold_percent = 0.5
  }
  depends_on = [google_project_service.apis]
}
```

Note that to assign the budget, you first need to get the billing account associated with the project.

### Configuring Terraform outputs

Create an output file for Terraform so you can more easily get the values of the server URI and the server key.

```hcl[outputs.tf]
output "server_url" {
  value       = google_cloud_run_service.default.status[0].url
  description = "URL of the Cloud Run server."
}
output "server_key" {
  value       = local.server_key
  description = "Key for the server."
}
```

## How to configure the PeerJS client

**Start by including the PeerJS library's JavaScript file from the Peer JS CDN**. You can also host the peer min JS file yourself. You can get more information about it [here](https://peerjs.com/docs/#start):

```html[index.html]{8}
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Head content... -->
</head>
<body>
    <!-- Add this at the bottom of the body... -->
    <script src="https://unpkg.com/peerjs@1.5.1/dist/peerjs.min.js"></script>
    <!-- Any other scripts... -->
</body>
</html>
```

Then, you **can create a peer object**, which will handle all the connections to the rest of the peers. Note that when initializing this peer object, **you can define the peer ID, which should be unique across all users**. In my implementation, I define a peer ID as the following when initializing the peer object:

```javascript
// Generate the ID for the connection, once per load of the tab.
const UUID = window.crypto.randomUUID();
// Server connection information.
// Complete with the URI of your Cloud Run server.
const SERVER_URI = 'example.a.run.app';
// Key will be exposed to front end, that's fine.
// This is the MD5 of the key from Terraform.
const SERVER_KEY = 'XXXX';
const SERVER_CONNECTION = {
  host: SERVER_URI,
  port: 443,
  ping: 1000 * 15, // 15s ping
  secure: true,
  debug: 2,
  key: SERVER_KEY,
};
// Create the peer instance object.
let peer = new Peer(UUID, SERVER_CONNECTION);
// Configure callback when a correct connection with
// the Cloud Run server is established.
peer.on('open', (id) => {
  console.log(`My peer ID is ${id}`);
});
```

You can also allow your users to define their peer ID, but you should handle duplicates correctly. I recommend you stick to random IDs, which can even be [human-readable](https://medium.com/blog-for-developers/uuid-readable-human-readable-reads-like-shakespeare-cooding-dessign-5f315fb3dfbf). The approach from above lets each window in the current browser be a new peer. In the case of **some browsers, you might not have the crypto API available unless you are working from a secure environment, which is an SSL-enabled site**. It changes how you deploy your front end because you should have SSL.

Part of the peer object creation is defining the parameters for the connection. **Note how you define the server key and URI of the server**.

Once you have the peer object, **you can define connection listeners to act over any connection event supported by Peer JS**. You define them as a **function that gets executed after the event trigger**. Your client side code will contain all the logic to handle connections, while the peerserver instance is the broker for them. Part of the work here is working through any error that can occur during the connection process (which is very error-prone).

```javascript[Peer that starts the connection]
// Start a connection on one end.
let conn = peer.connect('YOUR_DESTINATION_PEER');
conn.on('open', function() {
	// Configure other connection listeners like send or
  // received data using the conn object.
});
```

```javascript[Peer that receives the connection]
// Receive a connection on the other end.
peer.on('connection', (conn) => {
  // Add connection listeners to the conn object.
});
```

**Note that both sides of the connection should have the code to create or receive connections**. That's because both ends should be able to start or accept a connection.

Once you have your connection listeners, **you can establish a direct connection to any other peer if you know their peer ID**. You do this by calling the connect method. Note this will trigger a connection event on the receiving end of the connection.

As the last part of the client-side implementation, you have to be able to send data using the send function provided by the peer object.

```javascript
conn.send({
  strings: 'hi!',
  numbers: 150,
  arrays: [1, 2, 3],
  evenBinary: new Blob([1, 2, 3]),
  andMore: { bool: true },
});
```

The Peer JS tutorial in the documentation has a compelling [Peer JS example](https://peerjs.com/docs/#api) that can help you get started.

### Implementing a peer lookup

**A peer lookup is one aspect that you shouldn't overlook**. It provides a great user experience, as they can establish a remote connection hassle-free.

**Implementing this lookup has two sides**. On one side, you need to **allow a remote peer to get data from the server, like the list of peers**. We already did this by **configuring our Cloud Run instance of the PeerJS server to allow peer discovery**. It will enable a `/peers` route on the server, which anyone can query under the following URI.

```javascript
`https://${SERVER_URI}/${SERVER_KEY}/peers`;
```

Then, your client side code needs to support the users getting the data from the server and choosing which peer to connect to.

**Note that you can customize the logic running in the Peer JS server**, meaning you can do anything you want with the server. But this involves building your own Docker image.

## Closing thoughts

As outlined throughout the piece, **a physical server is a critical dependency when working with peer-to-peer connections**. **Choosing a cost-effective** (or virtually free) hosting **solution is relevant** for the initial tests and small-scale projects. **Cloud Run in GCP can be a serious choice for a hobby or production environment** before moving on to more customizable solutions (if necessary). This article outlines the steps to deploy only the back-end part of the solution but still has an entire front-end aspect to it.

You can head to [my implementation of PeerJS](https://github.com/GonzaloHirsch/peer-to-peer-js-tic-tac-toe) in a peer-to-peer game of Ultimate Tic Tac Toe and challenge your friends online. For more information on how releases on that repository work, read [my post about Semantic Release and branch protection rules](/blog/semantic-release-and-branch-protection-rules/).
