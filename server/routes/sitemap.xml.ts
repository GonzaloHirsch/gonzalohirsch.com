import { serverQueryContent } from '#content/server';
import { SitemapStream, streamToPromise } from 'sitemap';
import minimatch from 'minimatch';

// Exclusion patterns
const exclude = ['/experience**', '/authors**', '/featured-projects/**', '/projects/**'];
// URLs to include
const include = ['/', '/Gonzalo-Hirsch-CV.pdf', '/blog'];

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = await serverQueryContent(event).find();
    const sitemap = new SitemapStream({
        hostname: 'https://gonzalohirsch.com'
    });

    const inclusionMap = {};
    let excludeFromList;
    for (const doc of docs) {
        excludeFromList = false;
        // Verify if the URL matches any of the exclusion patterns
        exclude.forEach((pattern) => {
            if (minimatch(doc._path, pattern)) {
                excludeFromList = true;
            }
        });

        // Do not write if it's excluded
        if (!excludeFromList) {
            sitemap.write({
                // Adding a trailing slash
                url: doc._path + '/',
                changefreq: 'monthly'
            });
            // Verify if the url to include is already there or not
            include.forEach((url) => {
                if (url === doc._path) {
                    inclusionMap[url] = true;
                }
            });
        }
    }

    // Add all the urls specified in the include
    include.forEach((url) => {
        if (!inclusionMap[url]) {
            sitemap.write({
                url: url,
                changefreq: 'monthly'
            });
        }
    });

    sitemap.end();

    return streamToPromise(sitemap);
});
