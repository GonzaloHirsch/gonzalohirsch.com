import { Feed } from 'feed';
import { serverQueryContent } from '#content/server';
import minimatch from 'minimatch';

const authors = {
    "Gonzalo Hirsch": {
        email: "hirschgonzalo@gmail.com",
        name: "Gonzalo Hirsch",
        link: "https://gonzalohirsch.com"
    }
}

// https://journal.maciejpedzi.ch/generating-rss-feeds-for-a-nuxt-content-site
export default defineEventHandler(async (event) => {
    // Feed setup
    const blogUrl = 'https://gonzalohirsch.com';
    const feed = new Feed({
        id: blogUrl,
        title: "Gonzalo Hirsch's Blog",
        description:
            'A personal blog where Gonzalo Hirsch writes about programming and insights he gains on software engineering and different technologies from the industry.',
        link: blogUrl,
        copyright: `All rights reserved ${new Date().getFullYear()}, Gonzalo Hirsch`,
        generator: "awesome",
        favicon: new URL('favicon.png', blogUrl).href,
    });
    // Recovering the docs and filtering for only blogs
    let docs = await serverQueryContent(event).find();
    docs = docs.filter((doc) => minimatch(doc._path, '/blog/**'));
    // Modifying them to fit the HAST tree
    for (const doc of docs) {
        const recursivelyPatchChildren = (node) => {
            if (node.type === 'text') {
                return node;
            } else if (node.tag === 'code' && node.props.language) {
                node.props.lang = node.props.language;
                node.children = [
                    {
                        type: 'text',
                        value: node.props.code
                    }
                ];
                delete node.props.language;
                delete node.props.code;
            }
            node.tagName = node.tag;
            node.properties = node.props;
            node.children = node.children.map(recursivelyPatchChildren);
            return node;
        };
        doc.body.children = doc.body.children.map(recursivelyPatchChildren);
        feed.addItem({
            id: doc._id,
            title: doc.headline,
            description: doc.description,
            link: (new URL(doc._path, blogUrl).href + '/').replace(/\/+$/, '/'),
            date: new Date(doc.date),
            image: new URL(doc.socialImage.src, blogUrl).href,
            author: [
                authors[doc.author]
            ]
        });
    }
    appendHeader(event, 'Content-Type', 'application/xml');
    return feed.rss2();
});
