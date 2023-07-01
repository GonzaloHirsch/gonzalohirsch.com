---
title: 'Complete Guide on a Nuxt 3 Free Newsletter | Gonzalo Hirsch'
description: "Learn how to add a free newsletter to your Nuxt 3 SSG site and harness the power of email marketing to grow your online presence."
headline: "Level Up Your Nuxt 3 SSG Site: A Complete Guide to Free Newsletter Integration"
excerpt: "Learn how to add a free newsletter to your Nuxt 3 SSG site and harness the power of email marketing to grow your online presence."
date: '2023-07-01T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
    src: '/img/blog--nuxt-3-free-newsletter-integration.webp'
    mime: 'webp'
    alt: 'Illustration with the text "Complete Guide on a Nuxt 3 Free Newsletter"'
    width: 1200
    height: 630
faq:
    - question: 'Why should I add a newsletter to my site?'
      answer: "Newsletters are a fantastic tool to start building your audience and engaging with them to increase your site's traffic"
    - question: 'What is Nuxt?'
      answer: "Nuxt is an open source web JavaScript framework built over Vue that offers an improved developer experience and optimized user experience. It is compatible with YARN or NPM, and you can build sites using Single Page Application (SPA, Vue apps), Static Site Generation (SSG), or Server Side Rendering (SSR) schemes. It has an active community and plenty of plugins and extensions available. Leveraging SSG deployments for static websites (static files) can boost your SEO without the burdens of SSR, especially in monetary terms."
    - question: 'Which platforms can I use for free?'
      answer: "The list of email marketing platforms out there is endless. However, the list of companies that offer comprehensive suites of tools that simplify your newsletter management is minute. Platforms like Mailgun offer copious free options, but you build the acquisition forms and codebase yourself. There aren't many platforms that simplify the newsletter process or are easy to integrate with a Nuxt application. In my research on platforms before building my newsletter, I found Mailchimp. They offer a very comprehensive suite of tools for free that includes building forms for user acquisition and handling all your email campaigns. It is the perfect tool for someone looking to build their audience or grow their social media campaigns."
    - question: 'Why do we use Embedded Forms?'
      answer: "We are working with SSG (Static Site Generation) sites, where the HTML is pre-rendered during build-time and then served to the client along with some JavaScript. We want to embed the HTML forms (and style them with custom CSS from Tailwind CSS) to keep our brand."
    - question: 'How can I leverage custom tags?'
      answer: "Custom tags allow you to identify the source of your users and define an initial status for them in a marketing campaign. Because we are working with the free membership of Mailchimp, we need to get creative in ways to maximize its value. I suggest you include two tags per form you embed on your site. You should use one tag that identifies the page where you obtained the user. It will help you understand which pages or Call To Action copies perform well. An example of this tag could be `page--home` or `page--blog-list`. The other tag should indicate that the user has not received a welcome email to your newsletter. Something like `no-welcome` will serve this purpose perfectly. This tag can help you identify users without a welcome email so you can send one. After sending the email, you can tag them with `yes-welcome` and remove the `no-welcome` tag."
    - question: 'How can I add the Embedded Form to my Nuxt 3 application?'
      answer: "It is super simple! In your Nuxt project, create a Vue 3 component for the form in a new file, paste the HTML form from Mailchimp and import it into multiple pages."
# tags: []
---

Assuming you didn't accidentally click on this post, you probably wonder, **"Why should I add a newsletter to my site?"**. I did wonder the same in the past, but I have come to realize that **newsletters are a fantastic tool to start building your audience and engaging with them to increase your site's traffic**. It can be offputting the prices and features of most email marketing platforms, but some platforms give you comprehensive suites for free and are very simple to integrate with Nuxt 3 for a Nuxt app. **Follow this guide on adding a newsletter to Nuxt to learn more!**
 
**What is Nuxt?** Nuxt is an open source web JavaScript framework built over Vue that offers an improved developer experience and optimized user experience. It is compatible with YARN or NPM, and you can build sites using Single Page Application (SPA, Vue apps), Static Site Generation (SSG), or Server Side Rendering (SSR) schemes. It has an active community and plenty of plugins and extensions available. Leveraging SSG deployments for static websites (static files) can boost your SEO without the burdens of SSR, especially in monetary terms.

## Why should I add a newsletter to my site?

**Newsletters are integral to the success of modern websites, serving as a powerful tool for driving growth, enhancing user engagement, and building a loyal readership.** They provide direct lines of communication with your audience, fostering personalized connections and a sense of community. Delivering valuable content directly to subscribers' inboxes can nurture relationships and establish a loyal following.
 
Regarding website growth, **newsletters attract new visitors and encourage return visits, resulting in increased traffic, longer session durations, and improved rankings in search engines.** They also facilitate enhanced user engagement by sparking readers' interest, encouraging feedback, and tailoring content to their preferences. It fosters a dynamic feedback loop that strengthens user engagement and loyalty.
 
Furthermore, **newsletters allow you to build a dedicated readership that appreciates your insights and expertise**. As your subscriber base grows, the potential for organic word-of-mouth promotion increases as satisfied subscribers share your valuable content with their networks. Additionally, newsletters are effective marketing and communication tools, enabling you to promote products, services, or events directly to an interested audience.
 
**Through compelling and relevant content, you unlock the newsletter's full potential**. There are hundreds of resources on crafting effective strategies for creating charming newsletters, optimizing subject lines, and utilizing data-driven insights for continuous improvement. We are going to focus on the implementation. By understanding the significance of newsletters and leveraging them strategically, you can drive website growth, enhance user engagement, and foster a community of loyal readers invested in your content and offerings.

## Which platforms can I use for free?

The list of email marketing platforms out there is endless. However, **the list of companies that offer comprehensive suites of tools that simplify your newsletter management is minute.** Platforms like [Mailgun](https://www.mailgun.com/) offer copious free options, but you build the acquisition forms and codebase yourself. There aren't many platforms that simplify the newsletter process or are easy to integrate with a Nuxt application.
 
In my research on platforms before building my newsletter, I found [Mailchimp](https://mailchimp.com/?currency=GBP). **They offer a very comprehensive suite of tools for free that includes building forms for user acquisition and handling all your email campaigns.** It is the perfect tool for someone looking to build their audience or grow their social media campaigns.
 
On the downside, automation features from Mailchimp are behind a paywall, but it is a simple and easy way to get started with your email marketing campaigns in your Nuxt 3 app. **It even integrates easily with Nuxt 3 SSG (Universal Rendering) or Single Page Application (SPA, Client Side Rendering) sites!**
 
Start by creating a free account in Mailchimp. Note that you don't need a credit card (a huge plus!).

## Setting up newsletter subscription forms

Once you have created a new account with Mailchimp, start by going to the *Audience* tab. Within that selection, choose *Signup Forms* and, subsequently, *Embedded Forms*.
 
**Why do we use Embedded Forms?** We are working with SSG (Static Site Generation) sites, where the HTML is pre-rendered during build-time and then served to the client along with some JavaScript. We want to embed the HTML forms (and style them with custom CSS from Tailwind CSS) to keep our brand.
 
By leveraging the Embedded Forms, you can replicate signup forms across your site and use generative AI tools to create catchy Calls To Action (CTA).

### Configuring the embedded forms

**It takes five minutes to configure these forms.** I recommend you choose the following options:

1. **Ask only for an email**, as users are keen to insert their email when you ask for little information about them.
2. **Remove CSS styles** to style your form when you embed it on the site.
3. **Add custom tags to identify the source of users and grant them status**. More on this in the following heading.

Do not worry about the Mailchimp Referral Badge. I will show you how to remove it later, although you might lose the referrals if you do so.

### How can I leverage custom tags?

**Custom tags allow you to identify the source of your users and define an initial status for them in a marketing campaign.** Because we are working with the free membership of Mailchimp, we need to get creative in ways to maximize its value. I suggest you include two tags per form you embed on your site. 
 
**You should use one tag that identifies the page where you obtained the user**. It will help you understand which pages or Call To Action copies perform well. An example of this tag could be `page--home` or `page--blog-list`.
 
**The other tag should indicate that the user has not received a welcome email to your newsletter**. Something like `no-welcome` will serve this purpose perfectly. This tag can help you identify users without a welcome email so you can send one. After sending the email, you can tag them with `yes-welcome` and remove the `no-welcome` tag.

### Understanding the Embedded Forms

After following the steps and configuring the embedded form, you will get an HTML contact form like this one:
 
```html[form.html]
<div id="mc_embed_shell">
    <div id="mc_embed_signup">
        <form
            action="https://gonzalohirsch.us21.list-manage.com/subscribe/post?u=678a62e113d9424516dc8cfe6&amp;id=295cbd2bb3&amp;f_id=00f55de1f0"
            method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
            target="_self" novalidate="">
            <div id="mc_embed_signup_scroll">
                <h2>Unlock Valuable Tech Knowledge: Join My Newsletter Today!</h2>
                <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span
                            class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email"
                        id="mce-EMAIL" required="" value=""></div>
                <div hidden=""><input type="hidden" name="tags" value="2823217,2824862"></div>
                <div id="mce-responses" class="clear foot">
                    <div class="response" id="mce-error-response" style="display: none;"></div>
                    <div class="response" id="mce-success-response" style="display: none;"></div>
                </div>
                <div aria-hidden="true" style="position: absolute; left: -5000px;">
                    /* real people should not fill this in and expect good things - do not remove this or risk form bot
                    signups */
                    <input type="text" name="b_678a62e113d9424516dc8cfe6_295cbd2bb3" tabindex="-1" value="">
                </div>
                <div class="optionalParent">
                    <div class="clear foot">
                        <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button"
                            value="Subscribe">
                        <p class="brandingLogo" style="margin: 0px auto;"><a href="http://eepurl.com/iudr5M"
                                title="Mailchimp - email marketing made easy and fun"><img
                                    src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"
                                    alt="referral badge"></a></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
```
 
Note that:

1. **Line 13 is the list of tags you will add to the user**. You can use this to build a reusable component that configures tags as props.
2. **Lines 18-22 are hidden input for bots**, so don't remove them unless you want spam in your form submission.
3. **Lines 27-30 are the referral badge with the Mailchimp icon**. You can opt to remove it altogether or use CSS to hide it. 

## How can I add the Embedded Form to my Nuxt 3 application?

It is super simple! In your Nuxt project, create a Vue 3 component for the form in a new file, paste the HTML form from Mailchimp and import it into multiple pages. For example, this is the component I use for some minimal signup forms scattered across my site.
 
```vue[reusableForm.vue]
<template>
    <div id="mc_embed_shell" class="flex flex-col items-center">
        <div id="mc_embed_signup">
            <form
                action="https://gonzalohirsch.us21.list-manage.com/subscribe/post?u=678a62e113d9424516dc8cfe6&amp;id=295cbd2bb3&amp;f_id=00f55de1f0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                class="validate bg-brand_primary_light dark:bg-brand_primary_dark rounded-md px-4 py-6"
                target="_self"
                novalidate=""
            >
                <div id="mc_embed_signup_scroll" class="text-center">
                    <h4 class="font-bold relative mb-3 text-background_light dark:text-background_dark">
                        <slot name="title">Unlock Valuable Tech Knowledge: Join The Newsletter Today!</slot>
                    </h4>
                    <div class="mdmx-auto">
                        <p class="text-center mb-4 text-background_light dark:text-background_dark text-base">
                            <slot name="description"
                                >Sign up for my newsletter to gain access to <strong>insider knowledge</strong>,
                                <strong>thought-provoking articles</strong>, and <strong>actionable advice</strong> to advance your tech career and
                                improve your tech stack.
                            </slot>
                        </p>
                        <div class="flex flex-row md:flex-col lg:flex-row max-w-md mx-auto">
                            <div class="mc-field-group">
                                <label for="mce-EMAIL" class="base-text hidden" aria-hidden="true">Email Address</label
                                ><input
                                    type="email"
                                    name="EMAIL"
                                    class="required email"
                                    id="mce-EMAIL"
                                    required=""
                                    value=""
                                    placeholder="Cool email address..."
                                />
                            </div>
                            <div hidden=""><input type="hidden" name="tags" :value="tags.join(',')" /></div>
                            <div id="mce-responses" class="clear foot">
                                <div class="response" id="mce-error-response" style="display: none"></div>
                                <div class="response" id="mce-success-response" style="display: none"></div>
                            </div>
                            <div aria-hidden="true" style="position: absolute; left: -5000px">
                                /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
                                <input type="text" name="b_678a62e113d9424516dc8cfe6_295cbd2bb3" tabindex="-1" value="" />
                            </div>
                            <div class="optionalParent mt-0 md:mt-2 lg:mt-0">
                                <div class="clear foot">
                                    <ButtonsButton
                                        type="submit"
                                        text="Subscribe to the blog"
                                        id="mc-embedded-subscribe"
                                        format="white"
                                        aria="Subscribe to the blog."
                                        value="Subscribe"
                                        extraClass="mx-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tags: {
        type: Array,
        default: ['2824862']
    }
});
</script>

<style scoped>
.mc-field-group {
    @apply flex-grow mr-1 text-left;
}
.mc-field-group input {
    @apply rounded-md border-brand_primary_light dark:border-brand_primary_dark border bg-background_light text-typography_primary_light dark:bg-background_dark dark:text-typography_primary_dark px-4 py-2 text-center text-lg;
}
.mc-field-group input:focus,
.mc-field-group input:focus-visible {
    @apply outline-brand_primary_light dark:outline-brand_primary_dark;
}
.mc-field-group > * {
    @apply w-full;
}
</style>
```
 
**Note how you can edit the form as much as you like while keeping the critical parts intact**. I used Tailwind CSS to edit the style of this new file in my Nuxt project. I also keep some default tag IDs to simplify the configuration. You can add props or slots to make your Vue component reusable. There is no need for server side rendering, server middleware, or any middleware.

## Takeaway

**Newsletters are a fantastic tool to build your audience and engage with them to increase your site's traffic.** You can drive website growth, enhance user engagement, and foster a community of loyal readers invested in your content and offerings. **You don't need to pay significant fees to create great email marketing campaigns**, especially with Mailchimp. Use their guides on how to drive campaigns after you start getting subscriptions. Then think about monetizing your newsletter.
 
With Nuxt 3, you can quickly add a newsletter to your Nuxtjs app and Vuejs applications. Leverage this guide and Mailchimp's free membership to take your blog or product to the next level. Pair this guide with Nuxt Content to create a blog post, and your organic growth and presence on search engines will skyrocket. Subscribe to the newsletter to be the first to know about new posts, or read [my guide on the Nuxt Content module for blog development in Nuxt 3](zero-to-blog-building-with-nuxt-3)!