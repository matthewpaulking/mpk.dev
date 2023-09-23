import rss from '@astrojs/rss';
import { s as siteConfig } from './404_46a2a474.mjs';
import { a as getAllPosts } from './__3423bf30.mjs';
import '@astrojs/internal-helpers/path';
import '../astro_7874eeba.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                            */
const GET = async () => {
  const posts = await getAllPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: "https://mpk.dev",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `posts/${post.slug}`
    }))
  });
};

export { GET };
