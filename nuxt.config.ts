const keywords = 'Development, Developer, Software, Engineer, Software Engineer, Engineering, Full-Stack, Freelancer, Experiences, BS, MEng';
const description =
"I'm an Argentina-based Software Engineer (BS, MEng), AWS Certified Solutions Architect Associate and Full-Stack Engineer focused on developing clean, user-friendly, and fast experiences.";
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
const logos = {
    '@context': 'http://www.schema.org',
    '@type': 'Organization',
    url: 'https://gonzalohirsch.com/',
    logo: 'https://gonzalohirsch.com/logo.webp',
    email: 'hirschgonzalo@gmail.com',
    name: 'Gonzalo Hirsch | Software Engineer and Freelancer',
    description: description,
    founder: person,
    keywords: keywords
};
const jsonLds = [website, person, logos];

// Sitemap
const blogPageCount = 1;
const routes: String[] = ['/'];
for (let i = 1; i <= blogPageCount; i++) {
    routes.push(`/blog/page/${i}/` as string);
}

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    css: ['/assets/css/main.css'],
    ssr: true,
    generate: {
        routes: routes
    },
    // Sitemap
    // https://content.nuxtjs.org/guide/recipes/sitemap/
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', '/rss.xml']
        }
    },
    experimental: {
        payloadExtraction: false
    },
    router: {
        options: {
            strict: false
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
                    hid: 'keywords',
                    name: 'keywords',
                    content: keywords
                },
                {
                    hid: 'author',
                    name: 'author',
                    content: 'Gonzalo Hirsch'
                }
            ],
            link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
            script: jsonLds.map((elem) => {
                return {
                    type: 'application/ld+json',
                    children: JSON.stringify(elem)
                };
            })
        }
    },
    // tailwindcss: {
    //     // This is the option that works
    //     darkMode: 'class'
    // },
    sourcemap: false,
    // Inspired on https://blog.openreplay.com/power-your-blog-with-nuxt-content
    content: {
        // https://content.nuxtjs.org/api/configuration
        highlight: {
            theme: 'github-dark',
            preload: ['java']
        },
        markdown: {
            // https://github.com/rehypejs/rehype-external-links
            rehypePlugins: [
                [
                    'rehype-external-links',
                    {
                        target: '_blank',
                        rel: 'noopener noreferer'
                    }
                ]
            ]
        }
    }
});
