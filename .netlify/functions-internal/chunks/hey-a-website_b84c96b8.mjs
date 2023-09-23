import { b as createComponent, r as renderTemplate, u as unescapeHTML, s as spreadAttributes } from './astro_7874eeba.mjs';
import '@astrojs/internal-helpers/path';
import './pages/404_46a2a474.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                           */
const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="([^"]+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<h2 id=\"its-alive\">It’s alive!</h2>\n<p>I’ve dithered for a long time on building a personal website, but I found a really cool astro theme with a saguaro cactus!</p>\n<p>Shout out to <a href=\"https://github.com/chrismwilliams/astro-theme-cactus\">https://github.com/chrismwilliams/astro-theme-cactus</a>. Speaking of which, here’s a relevant picture I took.</p>\n<img src=\"https://res.cloudinary.com/dawwvmppi/image/upload/c_scale,f_webp,w_550/v1671771820/PXL_20220524_011332202_s2a46f.jpg\" alt=\"A saguaro cactus atop South Mountain in Phoenix, AZ\">");

				const frontmatter = {"title":"Hey, a website!","publishDate":"22 Dec 2022","description":"Matt used an Astro theme. It's super effective!","tags":["astro"],"minutesRead":"1 min read"};
				const file = "/Users/mpk/Sites/mpk.dev/src/content/post/hey-a-website.md";
				const url = undefined;
				function rawContent() {
					return "\n## It's alive!\n\nI've dithered for a long time on building a personal website, but I found a really cool astro theme with a saguaro cactus!\n\nShout out to https://github.com/chrismwilliams/astro-theme-cactus. Speaking of which, here's a relevant picture I took.\n\n![A saguaro cactus atop South Mountain in Phoenix, AZ](https://res.cloudinary.com/dawwvmppi/image/upload/c_scale,f_webp,w_550/v1671771820/PXL_20220524_011332202_s2a46f.jpg)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"its-alive","text":"It’s alive!"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${unescapeHTML(html)}`;
				});
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
