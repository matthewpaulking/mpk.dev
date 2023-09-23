import {
	A as AstroError,
	j as UnknownContentCollectionError,
	b as createComponent,
	k as renderUniqueStylesheet,
	l as renderScriptElement,
	n as createHeadAndContent,
	r as renderTemplate,
	f as renderComponent,
	u as unescapeHTML,
	C as CollectionDoesNotExistError,
	c as createAstro,
	m as maybeRenderHead,
	e as addAttribute,
	s as spreadAttributes,
} from "../astro_7874eeba.mjs";
import { s as siteConfig, $ as $$Base } from "./404_46a2a474.mjs";
import "clsx";
import { prependForwardSlash } from "@astrojs/internal-helpers/path";

const dateFormat = new Intl.DateTimeFormat(siteConfig.date.locale, siteConfig.date.options);
function getFormattedDate(date, options) {
	if (typeof options !== "undefined") {
		return new Date(date).toLocaleDateString(siteConfig.date.locale, {
			...siteConfig.date.options,
			...options,
		});
	}
	return dateFormat.format(new Date(date));
}

function createCollectionToGlobResultMap({ globResult, contentDir }) {
	const collectionToGlobResultMap = {};
	for (const key in globResult) {
		const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
		const segments = keyRelativeToContentDir.split("/");
		if (segments.length <= 1) continue;
		const collection = segments[0];
		collectionToGlobResultMap[collection] ??= {};
		collectionToGlobResultMap[collection][key] = globResult[key];
	}
	return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport,
}) {
	return async function getCollection(collection, filter) {
		let type;
		if (collection in contentCollectionToEntryMap) {
			type = "content";
		} else if (collection in dataCollectionToEntryMap) {
			type = "data";
		} else {
			throw new AstroError({
				...CollectionDoesNotExistError,
				message: CollectionDoesNotExistError.message(collection),
			});
		}
		const lazyImports = Object.values(
			type === "content"
				? contentCollectionToEntryMap[collection]
				: dataCollectionToEntryMap[collection],
		);
		let entries = [];
		if (cacheEntriesByCollection.has(collection)) {
			entries = [...cacheEntriesByCollection.get(collection)];
		} else {
			entries = await Promise.all(
				lazyImports.map(async (lazyImport) => {
					const entry = await lazyImport();
					return type === "content"
						? {
								id: entry.id,
								slug: entry.slug,
								body: entry.body,
								collection: entry.collection,
								data: entry.data,
								async render() {
									return render({
										collection: entry.collection,
										id: entry.id,
										renderEntryImport: await getRenderEntryImport(collection, entry.slug),
									});
								},
						  }
						: {
								id: entry.id,
								collection: entry.collection,
								data: entry.data,
						  };
				}),
			);
			cacheEntriesByCollection.set(collection, entries);
		}
		if (typeof filter === "function") {
			return entries.filter(filter);
		} else {
			return entries;
		}
	};
}
function createGetEntryBySlug({ getEntryImport, getRenderEntryImport }) {
	return async function getEntryBySlug(collection, slug) {
		const entryImport = await getEntryImport(collection, slug);
		if (typeof entryImport !== "function") return void 0;
		const entry = await entryImport();
		return {
			id: entry.id,
			slug: entry.slug,
			body: entry.body,
			collection: entry.collection,
			data: entry.data,
			async render() {
				return render({
					collection: entry.collection,
					id: entry.id,
					renderEntryImport: await getRenderEntryImport(collection, slug),
				});
			},
		};
	};
}
async function render({ collection, id, renderEntryImport }) {
	const UnexpectedRenderError = new AstroError({
		...UnknownContentCollectionError,
		message: `Unexpected error while rendering ${String(collection)} \u2192 ${String(id)}.`,
	});
	if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
	const baseMod = await renderEntryImport();
	if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
	const { default: defaultMod } = baseMod;
	if (isPropagatedAssetsModule(defaultMod)) {
		const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
		if (typeof getMod !== "function") throw UnexpectedRenderError;
		const propagationMod = await getMod();
		if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
		const Content = createComponent({
			factory(result, baseProps, slots) {
				let styles = "",
					links = "",
					scripts = "";
				if (Array.isArray(collectedStyles)) {
					styles = collectedStyles
						.map((style) => {
							return renderUniqueStylesheet(result, {
								type: "inline",
								content: style,
							});
						})
						.join("");
				}
				if (Array.isArray(collectedLinks)) {
					links = collectedLinks
						.map((link) => {
							return renderUniqueStylesheet(result, {
								type: "external",
								src: prependForwardSlash(link),
							});
						})
						.join("");
				}
				if (Array.isArray(collectedScripts)) {
					scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
				}
				let props = baseProps;
				if (id.endsWith("mdx")) {
					props = {
						components: propagationMod.components ?? {},
						...baseProps,
					};
				}
				return createHeadAndContent(
					unescapeHTML(styles + links + scripts),
					renderTemplate`${renderComponent(
						result,
						"Content",
						propagationMod.Content,
						props,
						slots,
					)}`,
				);
			},
			propagation: "self",
		});
		return {
			Content,
			headings: propagationMod.getHeadings?.() ?? [],
			remarkPluginFrontmatter: propagationMod.frontmatter ?? {},
		};
	} else if (baseMod.Content && typeof baseMod.Content === "function") {
		return {
			Content: baseMod.Content,
			headings: baseMod.getHeadings?.() ?? [],
			remarkPluginFrontmatter: baseMod.frontmatter ?? {},
		};
	} else {
		throw UnexpectedRenderError;
	}
}
function isPropagatedAssetsModule(module) {
	return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = "/src/content/";

const contentEntryGlob = /* #__PURE__ */ Object.assign({
	"/src/content/post/class-to-array-and-back-again.mdx": () =>
		import("../class-to-array-and-back-again_361e1595.mjs"),
	"/src/content/post/hey-a-website.md": () => import("../hey-a-website_4f9466a1.mjs"),
	"/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md": () =>
		import("../how-to-manually-add-ssl-certificate-for-valet-and-linux_df47fcfe.mjs"),
	"/src/content/post/reference/index.md": () => import("../index_a6fbb2d6.mjs"),
});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {
	post: {
		type: "content",
		entries: {
			"hey-a-website": "/src/content/post/hey-a-website.md",
			"how-to-manually-add-ssl-certificate-for-valet-and-linux":
				"/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md",
			reference: "/src/content/post/reference/index.md",
			"class-to-array-and-back-again": "/src/content/post/class-to-array-and-back-again.mdx",
		},
	},
};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({
	"/src/content/post/class-to-array-and-back-again.mdx": () =>
		import("../class-to-array-and-back-again_11abf820.mjs"),
	"/src/content/post/hey-a-website.md": () => import("../hey-a-website_c701b57f.mjs"),
	"/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md": () =>
		import("../how-to-manually-add-ssl-certificate-for-valet-and-linux_acd37cc9.mjs"),
	"/src/content/post/reference/index.md": () => import("../index_28cb6cd1.mjs"),
});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const getEntryBySlug = createGetEntryBySlug({
	getEntryImport: createGlobLookup(contentCollectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

async function getAllPosts() {
	return await getCollection("post", ({ data }) => {
		return data.draft !== true;
	});
}
function sortMDByDate(posts) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
		return bDate - aDate;
	});
}
function getAllTags(posts) {
	return posts.flatMap((post) => [...post.data.tags]);
}
function getUniqueTags(posts) {
	return [...new Set(getAllTags(posts))];
}
function getUniqueTagsWithCount(posts) {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			/* @__PURE__ */ new Map(),
		),
	].sort((a, b) => b[1] - a[1]);
}

function diveChildren(item, depth) {
	if (depth === 1 || !item.subheadings.length) {
		return item.subheadings;
	} else {
		return diveChildren(item.subheadings[item.subheadings.length - 1], depth - 1);
	}
}
function generateToc(headings) {
	const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
	const toc = [];
	bodyHeadings.forEach((h) => {
		const heading = { ...h, subheadings: [] };
		if (heading.depth === 2) {
			toc.push(heading);
		} else {
			const lastItemInToc = toc[toc.length - 1];
			if (heading.depth < lastItemInToc.depth) {
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}
			const gap = heading.depth - lastItemInToc.depth;
			const target = diveChildren(lastItemInToc, gap);
			target.push(heading);
		}
	});
	return toc;
}

const $$Astro$4 = createAstro("https://mpk.dev");
const $$FormattedDate = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
		Astro2.self = $$FormattedDate;
		const { date, dateTimeOptions, ...attrs } = Astro2.props;
		const postDate = getFormattedDate(date, dateTimeOptions);
		return renderTemplate`${maybeRenderHead()}<time${addAttribute(
			date.toISOString(),
			"datetime",
		)}${spreadAttributes(attrs)}>${postDate}</time>`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/FormattedDate.astro",
	void 0,
);

const $$Astro$3 = createAstro("https://mpk.dev");
const $$PostPreview = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
		Astro2.self = $$PostPreview;
		const { post, as: Tag = "div", withDesc = false } = Astro2.props;
		const postDate = post.data.updatedDate ?? post.data.publishDate;
		return renderTemplate`${renderComponent($$result, "FormattedDate", $$FormattedDate, {
			date: postDate,
			class: "min-w-[120px] text-gray-500",
		})}${renderComponent(
			$$result,
			"Tag",
			Tag,
			{},
			{
				default: ($$result2) =>
					renderTemplate`${maybeRenderHead()}<a${addAttribute(
						`/posts/${post.slug}/`,
						"href",
					)} class="cactus-link" rel="prefetch">${post.data.title}</a>`,
			},
		)}${
			withDesc && renderTemplate`<q class="line-clamp-3 block italic">${post.data.description}</q>`
		}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/blog/PostPreview.astro",
	void 0,
);

const $$Astro$2 = createAstro("https://mpk.dev");
const $$Paginator = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
		Astro2.self = $$Paginator;
		const { prevUrl, nextUrl } = Astro2.props;
		return renderTemplate`${
			(prevUrl || nextUrl) &&
			renderTemplate`${maybeRenderHead()}<nav class="mt-8 flex items-center gap-x-4">${
				prevUrl &&
				renderTemplate`<a class="me-auto py-2 sm:hover:text-accent"${addAttribute(
					prevUrl.url,
					"href",
				)} rel="prefetch">${
					prevUrl.srLabel && renderTemplate`<span class="sr-only">${prevUrl.srLabel}</span>`
				}${prevUrl.text ? prevUrl.text : "Previous"}</a>`
			}${
				nextUrl &&
				renderTemplate`<a class="ms-auto py-2 sm:hover:text-accent"${addAttribute(
					nextUrl.url,
					"href",
				)} rel="prefetch">${
					nextUrl.srLabel && renderTemplate`<span class="sr-only">${nextUrl.srLabel}</span>`
				}${nextUrl.text ? nextUrl.text : "Next"}</a>`
			}</nav>`
		}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/components/Paginator.astro",
	void 0,
);

const $$Astro$1 = createAstro("https://mpk.dev");
const getStaticPaths$1 = async ({ paginate }) => {
	const allPosts = await getAllPosts();
	const allPostsByDate = sortMDByDate(allPosts);
	const uniqueTags = getUniqueTags(allPosts);
	return paginate(allPostsByDate, { props: { uniqueTags }, pageSize: 10 });
};
const $$$1 = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
		Astro2.self = $$$1;
		const { page, uniqueTags } = Astro2.props;
		const meta = {
			title: "Posts",
			description: "Ready my collection of posts and the things that interest me",
		};
		const paginationProps = {
			...(page.url.prev && {
				prevUrl: {
					url: page.url.prev,
					text: `\u2190 Previous Posts`,
				},
			}),
			...(page.url.next && {
				nextUrl: {
					url: page.url.next,
					text: `Next Posts \u2192`,
				},
			}),
		};
		return renderTemplate`${renderComponent(
			$$result,
			"PageLayout",
			$$Base,
			{ meta: meta },
			{
				default: ($$result2) =>
					renderTemplate`${maybeRenderHead()}<h1 class="title mb-6">Posts</h1><div class="grid gap-y-16 sm:grid-cols-[3fr_1fr] sm:gap-x-8"><section aria-label="Blog post list"><ul class="space-y-8 text-start">${page.data.map(
						(p) =>
							renderTemplate`<li class="flex flex-col flex-wrap gap-2 sm:flex-row [&_q]:basis-full">${renderComponent(
								$$result2,
								"PostPreview",
								$$PostPreview,
								{ post: p, as: "h2", withDesc: true },
							)}</li>`,
					)}</ul>${renderComponent($$result2, "Pagination", $$Paginator, {
						...paginationProps,
					})}</section>${
						!!uniqueTags.length &&
						renderTemplate`<aside><h2 class="mb-4 flex items-center text-lg font-semibold"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z"></path><path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116"></path><path d="M6 9h-.01"></path></svg>
Tags
</h2><ul class="flex flex-wrap gap-2 text-bgColor">${uniqueTags.map(
							(tag) =>
								renderTemplate`<li><a class="flex items-center justify-center rounded-lg bg-accent p-1"${addAttribute(
									`/tags/${tag}/`,
									"href",
								)}${addAttribute(
									`View all posts with the tag: ${tag}`,
									"aria-label",
								)}>${tag}</a></li>`,
						)}</ul><span class="mt-4 block sm:text-end"><a class="sm:hover:text-accent" href="/tags/" aria-label="View all blog categories">
View all →
</a></span></aside>`
					}</div>`,
			},
		)}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/pages/posts/[...page].astro",
	void 0,
);

const $$file$1 = "/Users/mpk/Sites/mpk.dev/src/pages/posts/[...page].astro";
const $$url$1 = "/posts/[...page]";

const ____page_$1 = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$$1,
			file: $$file$1,
			getStaticPaths: getStaticPaths$1,
			url: $$url$1,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

const $$Astro = createAstro("https://mpk.dev");
const getStaticPaths = async ({ paginate }) => {
	const allPosts = await getAllPosts();
	const allPostsByDate = sortMDByDate(allPosts);
	const uniqueTags = getUniqueTags(allPostsByDate);
	return uniqueTags.flatMap((tag) => {
		const filterPosts = allPostsByDate.filter((post) => post.data.tags.includes(tag));
		return paginate(filterPosts, {
			params: { tag },
			pageSize: 10,
		});
	});
};
const $$ = createComponent(
	async ($$result, $$props, $$slots) => {
		const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
		Astro2.self = $$;
		const { page } = Astro2.props;
		const { tag } = Astro2.params;
		const meta = {
			title: `Tag: ${tag}`,
			description: `View all posts with the tag - ${tag}`,
		};
		const paginationProps = {
			...(page.url.prev && {
				prevUrl: {
					url: page.url.prev,
					text: `\u2190 Previous Tags`,
				},
			}),
			...(page.url.next && {
				nextUrl: {
					url: page.url.next,
					text: `Next Tags \u2192`,
				},
			}),
		};
		return renderTemplate`${renderComponent(
			$$result,
			"PageLayout",
			$$Base,
			{ meta: meta },
			{
				default: ($$result2) =>
					renderTemplate`${maybeRenderHead()}<h1 class="title mb-6 flex items-center"><a href="/tags/" class="text-accent sm:hover:underline">Tags</a><span class="me-3 ms-2">→</span><span class="text-xl">#${tag}</span></h1><section aria-label="Blog post list"><ul class="space-y-8">${page.data.map(
						(p) =>
							renderTemplate`<li class="flex flex-col flex-wrap gap-2 sm:flex-row [&_q]:basis-full">${renderComponent(
								$$result2,
								"PostPreview",
								$$PostPreview,
								{ post: p, as: "h2", withDesc: true },
							)}</li>`,
					)}</ul>${renderComponent($$result2, "Pagination", $$Paginator, {
						...paginationProps,
					})}</section>`,
			},
		)}`;
	},
	"/Users/mpk/Sites/mpk.dev/src/pages/tags/[tag]/[...page].astro",
	void 0,
);

const $$file = "/Users/mpk/Sites/mpk.dev/src/pages/tags/[tag]/[...page].astro";
const $$url = "/tags/[tag]/[...page]";

const ____page_ = /*#__PURE__*/ Object.freeze(
	/*#__PURE__*/ Object.defineProperty(
		{
			__proto__: null,
			default: $$,
			file: $$file,
			getStaticPaths,
			url: $$url,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);

export {
	$$FormattedDate as $,
	____page_$1 as _,
	getAllPosts as a,
	getEntryBySlug as b,
	getFormattedDate as c,
	$$PostPreview as d,
	getUniqueTagsWithCount as e,
	____page_ as f,
	generateToc as g,
	sortMDByDate as s,
};
