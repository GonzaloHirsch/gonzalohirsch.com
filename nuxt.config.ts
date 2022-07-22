import { defineNuxtConfig } from 'nuxt';

const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Gonzalo Hirsch | Software Engineer and Freelancer',
    description:
        "I'm an Argentina-based Software Engineering Student and Full-Stack Developer focused on developing clean, user-friendly, and fast experiences.",
    publisher: {
        '@type': 'Person',
        jobTitle: 'Software Engineer',
        name: 'Gonzalo Hirsch',
        url: 'https://gonzalohirsch.com/'
    },
    license: 'http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US'
};
const website = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Gonzalo Hirsch | Software Engineer and Freelancer',
    url: 'https://gonzalohirsch.com/'
};
const person = {
    '@context': 'http://www.schema.org',
    '@type': 'Person',
    '@id': 'https://gonzalohirsch.com/#about',
    name: 'Gonzalo Hirsch',
    alternateName: 'Gonzalo Hirsch',
    nationality: 'Argentinian',
    alumniOf: [
        {
            '@type': 'CollegeOrUniversity',
            name: 'Instituto Tecnológico de Buenos Aires',
            sameAs: 'http://itba.edu.ar/'
        }
    ],
    gender: 'Male',
    jobTitle: 'Software Engineer',
    worksFor: [
        {
            '@type': 'Organization',
            name: 'Toptal',
            sameAs: [
                'https://www.toptal.com/',
                'https://www.linkedin.com/company/toptal',
                'https://twitter.com/toptal',
                'https://www.facebook.com/toptal',
                'https://www.instagram.com/toptal/'
            ]
        }
    ],
    url: 'https://gonzalohirsch.com/',
    image: 'https://gonzalohirsch.com/meta-img.jpg',
    sameAs: [
        'https://gonzalohirsch.com/',
        'https://github.com/GonzaloHirsch',
        'https://www.linkedin.com/in/gonzalo-hirsch/',
        'https://www.instagram.com/gonzalohirsch/?hl=en',
        'https://www.toptal.com/resume/gonzalo-hirsch'
    ]
};

const jsonLds = [webpage, website, person];

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    css: ['/assets/css/main.css'],
    target: 'server',
    ssr: true,
    generate: {
        routes: ['/', '/404', '/blog']
    },
    // Sitemap
    // https://content.nuxtjs.org/guide/recipes/sitemap/
    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'Gonzalo Hirsch | Software Engineer and Freelancer',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        "I'm an Argentina-based Software Engineering Student and Full-Stack Developer focused on developing clean, user-friendly, and fast experiences."
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'Development, Developer, Software, Engineer, Software Engineer, Engineering, Full-Stack, Freelancer, Experiences'
                },
                {
                    hid: 'author',
                    name: 'author',
                    content: 'Gonzalo Hirsch'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: '/favicon.png' },
                {
                    hid: 'canonical',
                    rel: 'canonical',
                    href: `https://gonzalohirsch.com/`
                }
            ],
            script: jsonLds.map((elem) => {
                return {
                    type: 'application/ld+json',
                    children: JSON.stringify(elem)
                };
            })
        }
    },
    tailwindcss: {
        // This is the option that works
        darkMode: 'class'
    },
    // Inspired on https://blog.openreplay.com/power-your-blog-with-nuxt-content
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark'
        }
    }
});
