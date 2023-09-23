import { c as createAstro, b as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../astro_7874eeba.mjs';
import 'clsx';
import { $ as $$Base } from './404_46a2a474.mjs';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
/* empty css                            */
const $$Astro = createAstro("https://mpk.dev");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const meta = {
    title: "About",
    description: "I'm a conservation biologist focused on desert ecosystems, and a second career developer building web apps with Laravel and Vue."
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="space-y-6"><h1 class="title">Allow me to introduce myself</h1><p>Hi, I’m Matt. Thanks for coming to my website!</p><p>
I love web development. I mostly use Laravel, Vue, and Postgres to build things, with a
			healthy dose of R for data wrangling. I work at the intersection of conservation biology and
			tech, building tools to enable folks to do better conservation.
</p><p>
I'm a second career developer. My career started off in plant ecology, then graduate school
			for paleoclimatology (you can read my thesis <a href="https://drive.google.com/file/d/1tePK6T9n6Qk-9wj2A_PCTut47dtF3CPO/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="underline">here</a> if you're so inclined). Now, I mostly focus on building internal tools for wildlife data
			management.
</p></div>` })}`;
}, "/Users/mpk/Sites/mpk.dev/src/pages/about.astro", void 0);

const $$file = "/Users/mpk/Sites/mpk.dev/src/pages/about.astro";
const $$url = "/about";

export { $$About as default, $$file as file, $$url as url };
