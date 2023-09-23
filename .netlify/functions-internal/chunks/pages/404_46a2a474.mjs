import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, F as Fragment, g as createTransitionScope, h as renderHead, i as renderSlot } from '../astro_7874eeba.mjs';
import 'clsx';
/* empty css                            */
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(JSON.stringify(options.src))
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_c4f1b12d.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$a = createAstro("https://mpk.dev");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/Users/mpk/Sites/mpk.dev/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$9 = createAstro("https://mpk.dev");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/mpk/Sites/mpk.dev/node_modules/astro/components/ViewTransitions.astro", void 0);

const siteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Matthew Paul King",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "mpk.dev",
  // Meta property used as the default description meta property
  description: "An opinionated starter theme for Astro",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-US",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_US",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-US",
    options: {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  }
};
const menuLinks = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "About",
    path: "/about/"
  },
  {
    title: "Blog",
    path: "/posts/"
  }
];

const $$Astro$8 = createAstro("https://mpk.dev");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title, description, ogImage, articleDate } = Astro2.props;
  const titleSeparator = "\u2022";
  const siteTitle = `${title} ${titleSeparator} ${siteConfig.title}`;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImageURL = new URL(ogImage ? ogImage : "/social-card.png", Astro2.url).href;
  return renderTemplate`<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>${siteTitle}</title><!-- Icons / Favicon --><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><meta name="title"${addAttribute(siteTitle, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(siteConfig.author, "content")}><!-- Theme Colour --><meta name="theme-color" content=""><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(articleDate ? "article" : "website", "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:site_name"${addAttribute(siteConfig.title, "content")}><meta property="og:locale"${addAttribute(siteConfig.ogLocale, "content")}><meta property="og:image"${addAttribute(socialImageURL, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">${articleDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<meta property="article:author"${addAttribute(siteConfig.author, "content")}><meta property="article:published_time"${addAttribute(articleDate, "content")}>` })}`}<!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(canonicalURL, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(socialImageURL, "content")}><!-- Sitemap --><link rel="sitemap" href="/sitemap-index.xml"><!-- RSS auto-discovery --><link rel="alternate" type="application/rss+xml"${addAttribute(siteConfig.title, "title")} href="/rss.xml">`;
}, "/Users/mpk/Sites/mpk.dev/src/components/BaseHead.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$7 = createAstro("https://mpk.dev");
const $$ThemeProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ThemeProvider;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script>\n	function getUserPref() {\n		const storedTheme = typeof localStorage !== "undefined" && localStorage.getItem("theme");\n		return (\n			storedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")\n		);\n	}\n\n	function setTheme(theme) {\n		const colorThemeMetaTag = document.querySelector("meta[name=\'theme-color\']");\n		document.documentElement.classList.toggle("dark", theme === "dark");\n		const bgColour = getComputedStyle(document.body).getPropertyValue("--theme-bg");\n\n		colorThemeMetaTag.setAttribute("content", `hsl(${bgColour})`);\n		if (typeof localStorage !== "undefined") {\n			localStorage.setItem("theme", theme);\n		}\n	}\n\n	// initial setup\n	setTheme(getUserPref());\n\n	// View Transitions hook to restore theme mode\n	document.addEventListener("astro:after-swap", () => setTheme(getUserPref()));\n\n	// listen for theme-change custom event, fired in src/components/ThemeToggle.astro\n	document.addEventListener("theme-change", (e) => {\n		setTheme(e.detail.theme);\n	});\n<\/script>'], ['<script>\n	function getUserPref() {\n		const storedTheme = typeof localStorage !== "undefined" && localStorage.getItem("theme");\n		return (\n			storedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")\n		);\n	}\n\n	function setTheme(theme) {\n		const colorThemeMetaTag = document.querySelector("meta[name=\'theme-color\']");\n		document.documentElement.classList.toggle("dark", theme === "dark");\n		const bgColour = getComputedStyle(document.body).getPropertyValue("--theme-bg");\n\n		colorThemeMetaTag.setAttribute("content", \\`hsl(\\${bgColour})\\`);\n		if (typeof localStorage !== "undefined") {\n			localStorage.setItem("theme", theme);\n		}\n	}\n\n	// initial setup\n	setTheme(getUserPref());\n\n	// View Transitions hook to restore theme mode\n	document.addEventListener("astro:after-swap", () => setTheme(getUserPref()));\n\n	// listen for theme-change custom event, fired in src/components/ThemeToggle.astro\n	document.addEventListener("theme-change", (e) => {\n		setTheme(e.detail.theme);\n	});\n<\/script>'])));
}, "/Users/mpk/Sites/mpk.dev/src/components/ThemeProvider.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$6 = createAstro("https://mpk.dev");
const $$ThemeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  return renderTemplate(_a || (_a = __template(["", '<script>\n	const button = document.getElementById("toggle-theme");\n\n	function setButtonPresssed() {\n		const bodyThemeIsDark = document.documentElement.classList.contains("dark");\n		button.setAttribute("aria-pressed", String(bodyThemeIsDark));\n	}\n	setButtonPresssed();\n<\/script>'])), renderComponent($$result, "theme-toggle", "theme-toggle", { "class": "ms-2 sm:ms-4" }, { "default": () => renderTemplate`${maybeRenderHead()}<button type="button" id="toggle-theme" class="group relative h-9 w-9 rounded-md p-2 ring-zinc-400 transition-all hover:ring-2" aria-label="Toggle Dark Mode"><svg id="sun-svg" class="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all group-aria-pressed:scale-100 group-aria-pressed:opacity-100" aria-hidden="true" focusable="false" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg id="moon-svg" class="absolute start-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all group-aria-[pressed=false]:scale-100 group-aria-[pressed=false]:opacity-100" aria-hidden="true" focusable="false" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M7.63262 3.06689C8.98567 3.35733 9.99999 4.56025 9.99999 6.00007C9.99999 7.65693 8.65685 9.00007 6.99999 9.00007C5.4512 9.00007 4.17653 7.82641 4.01685 6.31997" stroke="currentColor" stroke-width="1.5"></path><path d="M22 13.0505C21.3647 12.4022 20.4793 12 19.5 12C17.567 12 16 13.567 16 15.5C16 17.2632 17.3039 18.7219 19 18.9646" stroke="currentColor" stroke-width="1.5"></path><path d="M14.5 8.51L14.51 8.49889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 17C11.1046 17 12 16.1046 12 15C12 13.8954 11.1046 13 10 13C8.89543 13 8 13.8954 8 15C8 16.1046 8.89543 17 10 17Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>` }));
}, "/Users/mpk/Sites/mpk.dev/src/components/ThemeToggle.astro", void 0);

const $$Astro$5 = createAstro("https://mpk.dev");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Search;
  return renderTemplate`${renderComponent($$result, "site-search", "site-search", { "id": "search", "class": "ms-auto", "data-astro-cid-otpdt6jm": true }, { "default": () => renderTemplate`${maybeRenderHead()}<button data-open-modal disabled class="flex h-9 w-9 items-center justify-center rounded-md ring-zinc-400 transition-all hover:ring-2" data-astro-cid-otpdt6jm><svg aria-label="search" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-astro-cid-otpdt6jm><path stroke="none" d="M0 0h24v24H0z" data-astro-cid-otpdt6jm></path><path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" data-astro-cid-otpdt6jm></path></svg></button><dialog aria-label="search" class="h-full max-h-full w-full max-w-full border border-zinc-400 bg-bgColor shadow backdrop:backdrop-blur sm:mx-auto sm:mb-auto sm:mt-16 sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:max-w-[48rem] sm:rounded-md" data-astro-cid-otpdt6jm><div class="dialog-frame flex flex-col gap-4 p-6 pt-12 sm:pt-6" data-astro-cid-otpdt6jm><button data-close-modal class="ms-auto cursor-pointer rounded-md bg-zinc-200 p-2 font-semibold dark:bg-zinc-700" data-astro-cid-otpdt6jm>Close</button>${renderTemplate`<div class="search-container" data-astro-cid-otpdt6jm><div id="cactus__search" data-astro-cid-otpdt6jm></div></div>`}</div></dialog>` })}`;
}, "/Users/mpk/Sites/mpk.dev/src/components/Search.astro", void 0);

const $$Astro$4 = createAstro("https://mpk.dev");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  const url = new URL(Astro2.request.url);
  return renderTemplate`${maybeRenderHead()}<header id="main-header" class="group relative mb-28 flex items-center sm:ps-[4.5rem]"${addAttribute(createTransitionScope($$result, "t24eiqgj"), "data-astro-transition-persist")}><div class="flex sm:flex-col"><a href="/" class="inline-flex items-center sm:relative sm:inline-block"${addAttribute(url.pathname === "/" ? "page" : false, "aria-current")}><svg class="me-3 h-10 w-6 sm:absolute sm:start-[-4.5rem] sm:me-0 sm:h-20 sm:w-12" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 480"><title>Logo</title><path d="M181.334 93.333v-40L226.667 80v40l-45.333-26.667ZM136.001 53.333 90.667 26.667v426.666L136.001 480V53.333Z" fill="#B04304"></path><path d="m136.001 119.944 45.333-26.667 45.333 26.667-45.333 26.667-45.333-26.667ZM90.667 26.667 136.001 0l45.333 26.667-45.333 26.666-45.334-26.666ZM181.334 53.277l45.333-26.666L272 53.277l-45.333 26.667-45.333-26.667ZM0 213.277l45.333-26.667 45.334 26.667-45.334 26.667L0 213.277ZM136 239.944l-45.333-26.667v53.333L136 239.944Z" fill="#FF5D01"></path><path d="m136 53.333 45.333-26.666v120L226.667 120V80L272 53.333V160l-90.667 53.333v240L136 480V306.667L45.334 360V240l45.333-26.667v53.334L136 240V53.333Z" fill="#53C68C"></path><path d="M45.334 240 0 213.334v120L45.334 360V240Z" fill="#B04304"></path></svg><span class="text-xl font-bold sm:text-2xl">Matthew Paul King</span></a><nav id="navigation-menu" class="absolute -inset-x-4 top-14 hidden flex-col items-end gap-y-4 rounded-md bg-bgColor/[.85] py-4 text-accent shadow backdrop-blur group-[.menu-open]:z-50 group-[.menu-open]:flex sm:static sm:z-auto sm:-ms-4 sm:mt-1 sm:flex sm:flex-row sm:items-center sm:divide-x sm:divide-dashed sm:divide-accent sm:rounded-none sm:bg-transparent sm:py-0 sm:shadow-none sm:backdrop-blur-none" aria-label="Main menu">${menuLinks.map((link) => renderTemplate`<a${addAttribute(link.path, "href")} class="px-4 py-4 sm:py-0 sm:hover:underline"${addAttribute(url.pathname === link.path ? "page" : false, "aria-current")} rel="prefetch">${link.title}</a>`)}</nav></div>${renderComponent($$result, "Search", $$Search, {})}${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})}<button id="toggle-navigation-menu" class="group relative ms-4 h-7 w-7 sm:invisible sm:hidden" type="button" aria-label="Open main menu" aria-expanded="false" aria-haspopup="menu"><svg id="line-svg" class="absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all group-aria-expanded:scale-0 group-aria-expanded:opacity-0" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path></svg><svg id="cross-svg" class="absolute start-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-0 text-accent opacity-0 transition-all group-aria-expanded:scale-100 group-aria-expanded:opacity-100" class="text-accent" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></header>`;
}, "/Users/mpk/Sites/mpk.dev/src/components/layout/Header.astro", "self");

const $$Astro$3 = createAstro("https://mpk.dev");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-auto flex w-full flex-col items-center justify-center gap-y-2 pb-4 pt-20 text-center align-top text-gray-500 sm:flex-row sm:justify-between sm:text-xs"><div class="me-0 sm:me-4">
Copyright &copy; ${year}${" "}${siteConfig.author}</div><nav aria-label="More on this site" class="flex gap-x-2 sm:gap-x-0 sm:divide-x sm:divide-gray-500">${menuLinks.map((link) => renderTemplate`<a${addAttribute(link.path, "href")} class="px-4 py-2 sm:px-2 sm:py-0 sm:hover:text-textColor sm:hover:underline">${link.title}</a>`)}</nav></footer>`;
}, "/Users/mpk/Sites/mpk.dev/src/components/layout/Footer.astro", void 0);

const $$Astro$2 = createAstro("https://mpk.dev");
const $$SkipLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SkipLink;
  return renderTemplate`${maybeRenderHead()}<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:start-1 focus:top-1.5">skip to content
</a>`;
}, "/Users/mpk/Sites/mpk.dev/src/components/SkipLink.astro", void 0);

const $$Astro$1 = createAstro("https://mpk.dev");
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    meta: { title, description = siteConfig.description, ogImage, articleDate }
  } = Astro2.props;
  return renderTemplate`<html${addAttribute(siteConfig.lang, "lang")}><head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "ogImage": ogImage, "articleDate": articleDate })}${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head><body>${renderComponent($$result, "ThemeProvider", $$ThemeProvider, {})}${renderComponent($$result, "SkipLink", $$SkipLink, {})}${renderComponent($$result, "Header", $$Header, {})}<main id="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/Users/mpk/Sites/mpk.dev/src/layouts/Base.astro", void 0);

const aboutImg = {"src":"/_astro/about-astro.850f94c9.png","width":249,"height":450,"format":"png"};

const aboutAstro = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: aboutImg
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://mpk.dev");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const meta = {
    title: "Oops! You found a missing page!",
    description: "Oops! It looks like this page is lost in space!"
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 class="title mb-6">404 | Oops something went wrong</h1><p class="mb-8">Please use the navigation to find your way back</p><div class="my-4 grid justify-center">${renderComponent($$result2, "Image", $$Image, { "class": "rotate-180", "src": aboutImg, "alt": "A cartoon cactus looking at the 'Astro.build' logo", "loading": "eager" })}</div>` })}`;
}, "/Users/mpk/Sites/mpk.dev/src/pages/404.astro", void 0);

const $$file = "/Users/mpk/Sites/mpk.dev/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Base as $, _404 as _, $$Image as a, isRemoteAllowed as b, baseService as c, getImage as d, aboutAstro as e, getConfiguredImageService as g, imageConfig as i, parseQuality as p, siteConfig as s };
