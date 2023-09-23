import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_7874eeba.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[],"routeData":{"route":"/og-image/[slug]","type":"endpoint","pattern":"^\\/og-image\\/([^/]+?)\\.png$","segments":[[{"content":"og-image","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false},{"content":".png","dynamic":false,"spread":false}]],"params":["slug"],"component":"src/pages/og-image/[slug].png.ts","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.1af4fbc1.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/posts/[slug]","type":"page","pattern":"^\\/posts\\/([^/]+?)\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/posts/[slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/posts/[...page]","type":"page","pattern":"^\\/posts(?:\\/(.*?))?\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/posts/[...page].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/tags","type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/tags/[tag]/[...page]","type":"page","pattern":"^\\/tags\\/([^/]+?)(?:\\/(.*?))?\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"tag","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["tag","...page"],"component":"src/pages/tags/[tag]/[...page].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.b450fcbe.js"},{"type":"external","value":"/_astro/page.30c903a1.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.cb53df54.css"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"site":"https://mpk.dev","base":"/","compressHTML":true,"componentMetadata":[["/Users/mpk/Sites/mpk.dev/src/pages/posts/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/posts/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/mpk/Sites/mpk.dev/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/pages/og-image/[slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og-image/[slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/utils/post.ts",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/utils/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/components/FormattedDate.astro",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/components/blog/Hero.astro",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/components/blog/PostPreview.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/mpk/Sites/mpk.dev/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/posts/[slug].astro":"chunks/pages/_slug__e2a100a5.mjs","/src/pages/og-image/[slug].png.ts":"chunks/pages/_slug__43d7c3d9.mjs","/src/pages/about.astro":"chunks/pages/about_37a30983.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_0281ef5f.mjs","/src/pages/rss.xml.ts":"chunks/pages/rss_b09c0ffc.mjs","\u0000@astrojs-manifest":"manifest_edcf9966.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_37e9d59f.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_b257b4a2.mjs","\u0000@astro-page:src/pages/og-image/[slug].png@_@ts":"chunks/_slug__9ab63ae3.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_ccb88f08.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_00895554.mjs","\u0000@astro-page:src/pages/posts/[slug]@_@astro":"chunks/_slug__36dd4b6c.mjs","\u0000@astro-page:src/pages/posts/[...page]@_@astro":"chunks/_.._391d3fba.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"chunks/index_1d67a4be.mjs","\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro":"chunks/_.._536362b3.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_1c50892d.mjs","/Users/mpk/Sites/mpk.dev/node_modules/astro/dist/assets/services/sharp.js":"_astro/sharp.2b6ae657.js","/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx?astroContentCollectionEntry=true":"_astro/class-to-array-and-back-again.7f89a855.js","/Users/mpk/Sites/mpk.dev/src/content/post/hey-a-website.md?astroContentCollectionEntry=true":"_astro/hey-a-website.2058a5f2.js","/Users/mpk/Sites/mpk.dev/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md?astroContentCollectionEntry=true":"_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.7a10dbac.js","/Users/mpk/Sites/mpk.dev/src/content/post/reference/index.md?astroContentCollectionEntry=true":"_astro/index.2830fdfa.js","/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx?astroPropagatedAssets":"_astro/class-to-array-and-back-again.50b678ee.js","/Users/mpk/Sites/mpk.dev/src/content/post/hey-a-website.md?astroPropagatedAssets":"_astro/hey-a-website.96440ab8.js","/Users/mpk/Sites/mpk.dev/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md?astroPropagatedAssets":"_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.6cf11a13.js","/Users/mpk/Sites/mpk.dev/src/content/post/reference/index.md?astroPropagatedAssets":"_astro/index.c94fa788.js","/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx":"_astro/class-to-array-and-back-again.9f74034f.js","/Users/mpk/Sites/mpk.dev/src/content/post/hey-a-website.md":"_astro/hey-a-website.f9124cf6.js","/Users/mpk/Sites/mpk.dev/src/content/post/how-to-manually-add-ssl-certificate-for-valet-and-linux.md":"_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.68a9318b.js","/Users/mpk/Sites/mpk.dev/src/content/post/reference/index.md":"_astro/index.74491993.js","/Users/mpk/Sites/mpk.dev/src/content/post/reference/logo.png":"_astro/logo.bd67ef7e.js","/astro/hoisted.js?q=0":"_astro/hoisted.1af4fbc1.js","astro:scripts/page.js":"_astro/page.30c903a1.js","/Users/mpk/Sites/mpk.dev/src/assets/about-astro.png":"_astro/about-astro.f2692276.js","/astro/hoisted.js?q=1":"_astro/hoisted.b450fcbe.js","/Users/mpk/Sites/mpk.dev/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.4f44421d.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/roboto-mono-regular.e5cde272.ttf","/_astro/roboto-mono-700.1af3ab61.ttf","/_astro/about-astro.850f94c9.png","/_astro/logo.1c6fa3ee.png","/_astro/_slug_.cb53df54.css","/192x192.png","/512x512.png","/apple-touch-icon.png","/favicon.ico","/icon.svg","/manifest.webmanifest","/robots.txt","/social-card.png","/_astro/_astro_assets.41bd1ca1.js","/_astro/about-astro.f2692276.js","/_astro/class-to-array-and-back-again.50b678ee.js","/_astro/class-to-array-and-back-again.7f89a855.js","/_astro/class-to-array-and-back-again.9f74034f.js","/_astro/hey-a-website.2058a5f2.js","/_astro/hey-a-website.96440ab8.js","/_astro/hey-a-website.f9124cf6.js","/_astro/hoisted.1af4fbc1.js","/_astro/hoisted.b450fcbe.js","/_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.68a9318b.js","/_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.6cf11a13.js","/_astro/how-to-manually-add-ssl-certificate-for-valet-and-linux.7a10dbac.js","/_astro/index.2830fdfa.js","/_astro/index.74491993.js","/_astro/index.a575a9f4.js","/_astro/index.c94fa788.js","/_astro/logo.bd67ef7e.js","/_astro/page.30c903a1.js","/_astro/sharp.2b6ae657.js","/_astro/ui-core.4f44421d.js","/images/astro-theme-cactus.png","/_astro/page.30c903a1.js"]});

export { manifest };
