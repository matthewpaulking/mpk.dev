import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_593f3bb8.mjs';
import './chunks/astro_7874eeba.mjs';
import 'clsx';
import 'html-escaper';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_37e9d59f.mjs');
const _page1  = () => import('./chunks/index_033bd852.mjs');
const _page2  = () => import('./chunks/_slug__dac2e577.mjs');
const _page3  = () => import('./chunks/rss_01e6b903.mjs');
const _page4  = () => import('./chunks/about_00895554.mjs');
const _page5  = () => import('./chunks/_slug__15fd27a3.mjs');
const _page6  = () => import('./chunks/_.._0f7dd3d7.mjs');
const _page7  = () => import('./chunks/index_cf2b1cb2.mjs');
const _page8  = () => import('./chunks/_.._440ac898.mjs');
const _page9  = () => import('./chunks/404_1c50892d.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/og-image/[slug].png.ts", _page2],["src/pages/rss.xml.ts", _page3],["src/pages/about.astro", _page4],["src/pages/posts/[slug].astro", _page5],["src/pages/posts/[...page].astro", _page6],["src/pages/tags/index.astro", _page7],["src/pages/tags/[tag]/[...page].astro", _page8],["src/pages/404.astro", _page9]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
