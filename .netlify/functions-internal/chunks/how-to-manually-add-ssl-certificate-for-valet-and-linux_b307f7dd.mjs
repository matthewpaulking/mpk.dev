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

				const html = updateImageReferences("<p>At work, our organization recently upgraded our SSL certificates. Unfortunately, this broke some stuff on our application servers. Suddenly I was getting cURL errors like this:</p>\n<p><code>curl: (60) Peer's Certificate issuer is not recognized</code>.</p>\n<p>After a loooooong Google/ChatGPT session, I finally cobbled together a solution. Since I’m developing locally with Laravel Valet, and our application servers are using Linux, I needed a different solutions for each.</p>\n<p>In our case, the certificate was from GoDaddy. Turns out, they have a repository of certificate files here: <a href=\"https://certs.godaddy.com/repository\">https://certs.godaddy.com/repository</a>. The one I needed was an Intermediate Certificate. Get the <code>.pem</code> file on your machines, then run the following.</p>\n<h2 id=\"how-to-add-the-certificate-file-for-laravel-valet\">How to add the certificate file for Laravel Valet</h2>\n<p>Copy the text of your <code>whatever.pem</code> file, and append to <code>/opt/homebrew/etc/openssl@1.1/cert.pem</code>. Do a <code>valet restart</code> and hopefully you’re in good to go!</p>\n<h2 id=\"how-to-add-the-certificate-file-on-linux\">How to add the certificate file on Linux</h2>\n<pre is:raw=\"\" class=\"astro-code dracula\" style=\"background-color: #282A36; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #50FA7B\">cp</span><span style=\"color: #F8F8F2\"> </span><span style=\"color: #F1FA8C\">whatever.pem</span><span style=\"color: #F8F8F2\"> </span><span style=\"color: #F1FA8C\">/etc/pki/ca-trust/source/anchors/</span></span>\n<span class=\"line\"><span style=\"color: #50FA7B\">update-ca-trust</span><span style=\"color: #F8F8F2\"> </span><span style=\"color: #F1FA8C\">extract</span></span></code></pre>");

				const frontmatter = {"title":"How to manually add an SSL Certificate for Valet and Linux.","publishDate":"23 Sep 2023","description":"After our organization had updated our GoDaddy SSL certificates, anything using cURL started throwing errors.","tags":["bug-tales","ssl"],"draft":true,"minutesRead":"1 min read"};
				const file = "/Users/mpk/Sites/mpk.dev/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md";
				const url = undefined;
				function rawContent() {
					return "\nAt work, our organization recently upgraded our SSL certificates. Unfortunately, this broke some stuff on our application servers. Suddenly I was getting cURL errors like this:\n\n`curl: (60) Peer's Certificate issuer is not recognized`.\n\nAfter a loooooong Google/ChatGPT session, I finally cobbled together a solution. Since I'm developing locally with Laravel Valet, and our application servers are using Linux, I needed a different solutions for each.\n\nIn our case, the certificate was from GoDaddy. Turns out, they have a repository of certificate files here: https://certs.godaddy.com/repository. The one I needed was an Intermediate Certificate. Get the `.pem` file on your machines, then run the following.\n\n## How to add the certificate file for Laravel Valet\n\nCopy the text of your `whatever.pem` file, and append to `/opt/homebrew/etc/openssl@1.1/cert.pem`. Do a `valet restart` and hopefully you're in good to go!\n\n## How to add the certificate file on Linux\n\n```sh\ncp whatever.pem /etc/pki/ca-trust/source/anchors/\nupdate-ca-trust extract\n```\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"how-to-add-the-certificate-file-for-laravel-valet","text":"How to add the certificate file for Laravel Valet"},{"depth":2,"slug":"how-to-add-the-certificate-file-on-linux","text":"How to add the certificate file on Linux"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${unescapeHTML(html)}`;
				});
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
