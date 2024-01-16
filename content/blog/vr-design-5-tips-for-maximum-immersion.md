---
dqid: 'vr-design-tips-immersive'
title: '5 Tips for Immersive Virtual Reality Design | Gonzalo Hirsch'
description: 'Learn how to design immersive virtual reality experiences. Understand the VR hardware market and why proper VR design is crucial to provide maximum immersion.'
headline: 'Virtual Reality Design: 5 Tips for Maximum Immersion'
excerpt: 'Learn how to design immersive virtual reality experiences. Understand the VR hardware market and why proper VR design is crucial to provide maximum immersion.'
date: '2023-03-08T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--vr-design-5-tips-for-maximum-immersion.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Virtual Reality Design: 5 Tips for Maximum Immersion"'
  width: 1200
  height: 630
faq:
  - question: 'What existing hardware is on the market?'
    answer: 'There are multiple hardware options for many different consumer profiles and backing hardware. Meta, PlayStation, Google, Pico, and HTC are the principal players in the VR ecosystem, capturing more than 97% of the consumer market.'
# tags: []
---

Virtual reality is considered the future of entertainment and gaming. Since the consumer release of Oculus Rift in 2016 and Google Cardboard in 2014, virtual reality technology companies have paved the way for this to become a reality. Although virtual reality is still not seen as a commodity, constant developments are happening to improve VR technology and reduce its price. Improvements in technology drive immersion, but without virtual reality design focused on user experience in-game, consumers won't catch on.

Let's start by getting an overview of the current state of VR hardware, and then we'll dive into tips to provide maximum user immersion.

## What existing hardware is on the market?

There are multiple hardware options for many different consumer profiles and backing hardware. Meta, PlayStation, Google, Pico, and HTC are the principal players in the VR ecosystem, capturing [more than 97%](https://www.insiderintelligence.com/content/meta-captures-90-of-vr-headset-market-share) of the consumer market.

**Meta Quest family**: Since Facebook changed its parent name to Meta, making a bet for the metaverse in 2021, Meta Quest hardware has seen significant developments. The higher-end [Meta Quest Pro](https://www.meta.com/quest/quest-pro/) and lower-end [Meta Quest 2](https://www.meta.com/quest/products/quest-2/) options cater to different use cases. While the Meta Quest Pro aims to cover enterprise mixed reality and high-end gaming, the Meta Quest 2 VR headset is a "budget" headset for gaming. Both offer an all-in-one solution to VR gaming, not needing backing PC hardware.

**PlayStation**: With the release of its new [PlayStation VR 2](https://www.playstation.com/en-us/ps-vr2/) headset, Sony is upping their VR presence in the market. Offering next-level hardware to PlayStation 5 users, including eye tracking and OLED screens, it's an upgrade from the last-generation headset, which needed a PlayStation camera. It still requires a PS5 to back the headset processing, which means a cable is still attached, but the technological improvements are there.

**Pico**: Offering different versions of VR headsets, Pico is a primary player in the VR race. Their high-end [Pico 4](https://www.picoxr.com/global/products/pico4) and lower-end [Pico Neo3 Link](https://www.picoxr.com/global/products/neo3-link) cater to consumer profiles having options for standalone and non-standalone headsets.

**HTC**: [HTC Vive](https://www.vive.com/us/) has a wide range of high-end and budget VR systems for users. They still offer VR solutions for users with high-end PC systems for high-fidelity VR experiences.

**Google**: Google Daydream and Google Cardboard (both discontinued) were the ultimate budget solution for VR gaming and still are. Using consumer phones and rudimentary headgear, they open-sourced VR experiences for everyone.

Although there are many options for VR hardware, without proper VR designs for games and experiences, virtual reality headsets are useless. There are many crucial concepts when designing worthwhile, immersive virtual reality experiences.

## Design for maximized presence

**Presence** is the sensation of being in a place. It involves recognizing that we can affect objects in our environment, and the environment can affect us. We feel present when we recognize material things and feel something is present when it acknowledges us. How can we maximize presence? We **maximize it through recognition**.

**There are two ways to maximize recognition in a virtual reality experience**. One is through the **design of objects and interactions** easily recognizable by the user and significant to them. Another is via **stories that we recognize and can identify.** Cultural differences in objects and stories play an important role too. Accounting for this can achieve design worlds and storylines appropriate to all.

Object and interaction design plays a significant role during VR development. Basing 3D environment and object design on the world fosters recognition. Physics-based interactions anchor the player to their VR experience, offering users predictable consequences for their actions. Affordances, how clearly an object shows its potential use, play a significant role in player recognition. Intuitive interaction design is essential to maximizing affordances.

**Self-recognition is essential** in this case too. Users should be able to recognize themselves in their virtual bodies. Otherwise, it breaks the illusion of presence. Stress Level Zero's [Bonelab](https://store.steampowered.com/app/1592190/BONELAB/) is the perfect example of this. Players can change their bodies, and their VR measurements adjust to their new dimensions, anchoring the user to the virtual environment and virtual reality.

## Design for user comfort

Virtual reality motion sickness is a significant problem that users face when going through a virtual reality experience. Although it is inherent to some users, you can reduce those effects. We can blame this problem on two causes: the **visual-vestibular conflict** and the **vergence-accommodation conflict**.

The visual-vestibular conflict occurs when the **acceleration perceived by the inner ear system is different than that by the eye**. To reduce this conflict, we can use **natural locomotion** (if available, depending on the headset) or the **teleportation pattern** (implemented in most VR SDKs).

Another option is to use the **Dynamic FOV pattern**, reducing the Field of View when the user is experiencing acceleration.

![Example of the Dynamic FOV pattern, the FOV is limited once moving (right).](/img/blog--vr-design-5-tips-for-maximum-immersion--dynamic-fov.webp)

The **Cabin pattern** can help reduce the visual-vestibular conflict by having a fixed reference point that prevents perceiving acceleration in the far-plane context.

![Example of the Cabin pattern.](/img/blog--vr-design-5-tips-for-maximum-immersion--cabin.webp)

The vergence-accommodation conflict occurs when the **vergence distance is different than the focal distance**. The focal distance in a virtual reality headset is the distance to the headset screen. **Interactions should be with objects at the focal length of the VR headset** (usually 2 meters).

Lastly, rotational motions generate more motion sickness due to the centripetal forces, so linear motion is preferred.

## Optimize your VR experience performance

The [optimal frame rate](https://help.irisvr.com/hc/en-us/articles/215884547-The-Importance-of-Frame-Rates) for VR is **90fps**. To achieve this, virtual reality developers should heavily optimize their experiences. How can you optimize your VR game?

- [Light mapping](https://docs.unity3d.com/Manual/Lightmapping.html) to simulate a ray-traced virtual environment. Light mapping pre-computes ray tracing from light sources into texture maps. During playtime, textures load, and no real-time tracing is required.
- Baking [reflection probes](https://docs.unity3d.com/Manual/class-ReflectionProbe.html) for static reflections and sky spheres can save processing. Well-placed reflection probes for static objects reduce unnecessary processing.
- [Occlusion Culling](https://docs.unity3d.com/Manual/OcclusionCulling.html) reduces the rendering of hidden objects. Engines like Unity offer computing Occlusion Culling areas, avoiding the rendering of hidden objects.
- **Optimizing objects in scenes** reduces CPU load. Use different [levels of detail](https://docs.unity3d.com/Manual/LevelOfDetail.html) to reduce polygon counts. Reduce shadow amount. Reduce the number of dynamic lights and mark entities and lights as static. Use billboarding for far-plane objects.
- **Optimize object counts** in scenes to reduce instancing. [GPU instancing](https://docs.unity3d.com/Manual/GPUInstancing.html) can offload instancing to the GPU, which is faster. [Object pooling](https://learn.unity.com/tutorial/introduction-to-object-pooling) pre-instances objects to offer consistent performance.
- **Optimize textures** depending on the use case and context.

Optimizing your virtual environment helps your VR device hit the necessary performance to offer an immersive experience. Dipping below the 90fps target can lead you to non-immersive VR content.

## User safety comes first

[Virtual reality harassment](https://edition.cnn.com/2022/05/05/tech/virtual-reality-harassment/index.html) is a reality. Users' virtual space should be a safe one. Especially in social VR applications, this is an ongoing issue. There are no established norms in place to protect VR users in applications. When users feel unsafe in a virtual world, immersion is lost.

Some considerations to take into account when designing safe social applications in a virtual world are:

- Allow the user to set **personal bubbles** where no other user is allowed.
- Allow the user to **mute or block other users**.
- Give the user a **quick way to exit into a safe space**.
- **Enable moderation** via artificial intelligence (AI) or physical moderators in rooms.

This immersive technology can have a real impact on people.

## Leverage 3D sound design

Today almost any virtual reality system can be paired with high-end headphones. **Leveraging 3D sound design libraries can take your immersive reality to the next level**. 3D audio engines like [Steam Audio](https://valvesoftware.github.io/steam-audio/), [Google Resonance](https://resonance-audio.github.io/resonance-audio/), [Oculus Audio](https://developer.oculus.com/documentation/native/audio-intro/), and [dearVR UNITY](https://www.dear-reality.com/products/dearvr-unity) can help you use raytracing for sound to spatialize sound in your experience. This spatialization can be for direction or distance.

**Direction spatialization** refers to the direction between the user and the sound source. **Distance spatialization** refers to the acoustic path soundwaves take until reaching the user.

## Takeaway

There are many options for consumer virtual reality devices; anyone can access a VR headset (or device using Google Cardboard). Regardless of the virtual reality system, designing for maximum immersion should be a priority. The main ways to achieve immersion are designing for increased presence, designing for user comfort, optimizing VR experience performance, accounting for user safety, and leveraging sound design. Creating a VR experience can be time-consuming, but the results are immersive and life-like experiences and virtual reality applications.
