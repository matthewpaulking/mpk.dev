import {
	c as createAstro,
	b as createComponent,
	r as renderTemplate,
	m as maybeRenderHead,
	f as renderComponent,
	e as addAttribute,
	F as Fragment,
	i as renderSlot,
} from "../astro_7874eeba.mjs";
import "clsx";
import { a as $$Image, $ as $$Base } from "./404_46a2a474.mjs";
import "@astrojs/internal-helpers/path";
import { $ as $$FormattedDate, g as generateToc, a as getAllPosts } from "./__a0ced33a.mjs";
import "html-escaper";
/* empty css                            */
const $$Astro$4 = createAstro("https://mpk.dev");
const $$Hero = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
		Astro2.self = $$Hero;
		const {
			content: { data, render },
		} = Astro2.props;
		const { remarkPluginFrontmatter } = await render();
		const dateTimeOptions = {
			month: "long",
		};
		return renderTemplate`${
			data.coverImage &&
			renderTemplate`${maybeRenderHead()}<div class="aspect-h-9 aspect-w-16 mb-6">${renderComponent(
				$$result,
				"Image",
				$$Image,
				{
					src: data.coverImage.src,
					alt: data.coverImage.alt,
					class: "object-cover",
					loading: "eager",
					fetchpriority: "high",
				},
			)}</div>`
		}<h1 class="title mb-3 sm:mb-1">${
			data.title
		}</h1><div class="flex flex-wrap items-center gap-x-3 gap-y-2"><p class="font-semibold">${renderComponent(
			$$result,
			"FormattedDate",
			$$FormattedDate,
			{ date: data.publishDate, dateTimeOptions: dateTimeOptions },
		)} /${" "}${remarkPluginFrontmatter.minutesRead}</p>${
			data.updatedDate &&
			renderTemplate`<span class="rounded-lg bg-quote/10 p-1 text-quote">
Last Updated:
${renderComponent($$result, "FormattedDate", $$FormattedDate, {
	class: "ms-1",
	date: data.updatedDate,
	dateTimeOptions: dateTimeOptions,
})}</span>`
		}</div>${
			!!data.tags?.length &&
			renderTemplate`<div class="mt-3"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" class="me-1 inline-block h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z"></path><path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116"></path><path d="M6 9h-.01"></path></svg>${data.tags.map(
				(tag, i) =>
					renderTemplate`${renderComponent(
						$$result,
						"Fragment",
						Fragment,
						{},
						{
							default: ($$result2) =>
								renderTemplate`<a class="cactus-link inline-block before:content-['#']"${addAttribute(
									`View more blogs with the tag ${tag}`,
									"aria-label",
								)}${addAttribute(`/tags/${tag}/`, "href")} data-pagefind-filter="tag">${tag}</a>${
									i < data.tags.length - 1 && ", "
								}`,
						},
					)}`,
			)}</div>`
		}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/blog/Hero.astro",
	void 0,
);

const $$Astro$3 = createAstro("https://mpk.dev");
const $$TOCHeading = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
		Astro2.self = $$TOCHeading;
		const {
			heading: { slug, text, depth, subheadings },
		} = Astro2.props;
		return renderTemplate`${maybeRenderHead()}<li${addAttribute(
			`${depth > 2 ? "ms-2" : ""}`,
			"class",
		)}><a${addAttribute(
			`block line-clamp-2 hover:text-accent ${depth <= 2 ? "mt-3" : "mt-2 text-[0.6875rem]"}`,
			"class",
		)}${addAttribute(`#${slug}`, "href")}${addAttribute(
			`Scroll to section: ${text}`,
			"aria-label",
		)}><span class="me-0.5">#</span>${text}</a>${
			!!subheadings.length &&
			renderTemplate`<ul>${subheadings.map(
				(subheading) =>
					renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, {
						heading: subheading,
					})}`,
			)}</ul>`
		}</li>`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/blog/TOCHeading.astro",
	void 0,
);

const $$Astro$2 = createAstro("https://mpk.dev");
const $$TOC = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
		Astro2.self = $$TOC;
		const { headings } = Astro2.props;
		const toc = generateToc(headings);
		return renderTemplate`${maybeRenderHead()}<aside class="sticky top-20 order-2 -me-32 hidden basis-64 lg:block"><h2 class="font-semibold">Table of Contents</h2><ul class="mt-4 text-xs">${toc.map(
			(heading) =>
				renderTemplate`${renderComponent($$result, "TOCHeading", $$TOCHeading, {
					heading: heading,
				})}`,
		)}</ul></aside>`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/blog/TOC.astro",
	void 0,
);

const $$Astro$1 = createAstro("https://mpk.dev");
const $$BlogPost = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
		Astro2.self = $$BlogPost;
		const { post } = Astro2.props;
		const {
			data: { title, description, ogImage, publishDate, updatedDate },
			slug,
		} = post;
		const socialImage = ogImage ?? `/og-image/${slug}.png`;
		const articleDate = updatedDate?.toISOString() ?? publishDate.toISOString();
		const { headings } = await post.render();
		return renderTemplate`${renderComponent(
			$$result,
			"BaseLayout",
			$$Base,
			{ meta: { title, description, articleDate, ogImage: socialImage } },
			{
				default: ($$result2) =>
					renderTemplate`${maybeRenderHead()}<div class="gap-x-10 lg:flex lg:items-start">${
						!!headings.length &&
						renderTemplate`${renderComponent($$result2, "TOC", $$TOC, { headings: headings })}`
					}<article class="flex-grow break-words" data-pagefind-body><div id="blog-hero">${renderComponent(
						$$result2,
						"BlogHero",
						$$Hero,
						{ content: post },
					)}</div><div class="prose prose-cactus mt-12 prose-headings:font-semibold prose-headings:text-accent-2 prose-headings:before:absolute prose-headings:before:-ms-4 prose-headings:before:text-accent prose-headings:before:content-['#'] prose-th:before:content-none">${renderSlot(
						$$result2,
						$$slots["default"],
					)}</div></article></div><button id="to-top-btn" class="z-90 fixed bottom-8 end-4 flex h-10 w-10 translate-y-28 items-center justify-center rounded-full border-2 border-transparent bg-zinc-200 text-3xl opacity-0 transition-all duration-300 hover:border-zinc-400 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 dark:bg-zinc-700 sm:end-8 sm:h-12 sm:w-12" aria-label="Back to Top" data-show="false"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path></svg></button>`,
			},
		)}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/layouts/BlogPost.astro",
	void 0,
);

const $$Astro = createAstro("https://mpk.dev");
const getStaticPaths = async () => {
	const blogEntries = await getAllPosts();
	return blogEntries.map((entry) => ({
		params: { slug: entry.slug },
		props: { entry },
	}));
};
const $$slug = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$slug;
		const { entry } = Astro2.props;
		const { Content } = await entry.render();
		return renderTemplate`${renderComponent(
			$$result,
			"PostLayout",
			$$BlogPost,
			{ post: entry },
			{
				default: ($$result2) =>
					renderTemplate`${renderComponent($$result2, "Content", Content, {})}`,
			},
		)}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/pages/posts/[slug].astro",
	void 0,
);

const $$file = "/Users/mpk/Sites/mpk.dev/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

export { $$slug as default, $$file as file, getStaticPaths, $$url as url };
