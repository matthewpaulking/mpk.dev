import { _ as __astro_tag_component__, F as Fragment, q as createVNode } from './astro_7874eeba.mjs';
import '@astrojs/internal-helpers/path';
import { a as $$Image } from './pages/404_46a2a474.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                           */
const frontmatter = {
  "title": "Neovim: PHP class property to array and back again",
  "publishDate": "23 Dec 2022",
  "description": "A handy keymap when I forget if some data is an object or an array",
  "tags": ["neovim"],
  "minutesRead": "1 min read"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "the-problem",
    "text": "The problem"
  }, {
    "depth": 2,
    "slug": "the-solution",
    "text": "The solution"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    pre: "pre",
    code: "code",
    span: "span",
    img: "img"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "the-problem",
      children: "The problem"
    }), "\n", createVNode(_components.p, {
      children: "When passing around a lot of data collections, sometimes I\u2019ll assume something\nis an object, when it\u2019s actually an array."
    }), "\n", createVNode(_components.pre, {
      "is:raw": "",
      class: "astro-code dracula",
      style: {
        backgroundColor: "#282A36",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "$climbingGear"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "->"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "carabiners"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "->"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "lockers;  "
          }), createVNode(_components.span, {
            style: {
              color: "#6272A4"
            },
            children: "// \u274C"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "$climbingGear["
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "carabiners"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "]["
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "lockers"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "]; "
          }), createVNode(_components.span, {
            style: {
              color: "#6272A4"
            },
            children: "// this is what it actually is"
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "This is always a pain to fix. Usually I\u2019ll make a quick macro to surround the\nproperty with quotes and brackets, then finally remove the arrow. But now I\u2019ve\ngot a much more efficient way. Behold!"
    }), "\n", createVNode(_components.h2, {
      id: "the-solution",
      children: "The solution"
    }), "\n", createVNode(_components.img, {
      src: "https://res.cloudinary.com/dawwvmppi/image/upload/v1671819629/neovim-php-class-to-array_lnwvvv.gif",
      alt: "Screen capture showing neovim editor, changing php class proprties to array"
    }), "\n", createVNode(_components.pre, {
      "is:raw": "",
      class: "astro-code dracula",
      style: {
        backgroundColor: "#282A36",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      },
      tabindex: "0",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#50FA7B"
            },
            children: "keymap"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "n"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "<leader>cta"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "<cmd>s/"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "(->"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: ")"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "w*"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: ")/['"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "2']/g<cr>"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ")"
          })]
        }), "\n", createVNode(_components.span, {
          class: "line"
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: [createVNode(_components.span, {
            style: {
              color: "#50FA7B"
            },
            children: "keymap"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "n"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "<leader>atc"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "'"
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ", "
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "<cmd>s/"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "['"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: ")"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "("
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "w*"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: ")"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "('"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "]"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: ")/->"
          }), createVNode(_components.span, {
            style: {
              color: "#FF79C6"
            },
            children: "\\\\"
          }), createVNode(_components.span, {
            style: {
              color: "#F1FA8C"
            },
            children: "2/g<cr>"
          }), createVNode(_components.span, {
            style: {
              color: "#E9F284"
            },
            children: "\""
          }), createVNode(_components.span, {
            style: {
              color: "#F8F8F2"
            },
            children: ")"
          })]
        })]
      })
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/post/class-to-array-and-back-again.mdx";
const file = "/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/mpk/Sites/mpk.dev/src/content/post/class-to-array-and-back-again.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
