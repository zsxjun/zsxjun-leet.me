// vite.config.ts
import { basename, dirname, resolve } from "node:path";
import { Buffer } from "node:buffer";
import { defineConfig } from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/vite@5.4.20_@types+node@24.7.2_terser@5.44.0/node_modules/vite/dist/node/index.js";
import fs2 from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/fs-extra@11.3.2/node_modules/fs-extra/lib/index.js";
import Inspect from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/vite-plugin-inspect@0.8.9_rollup@4.52.4_vite@5.4.20_@types+node@24.7.2_terser@5.44.0_/node_modules/vite-plugin-inspect/dist/index.mjs";
import Icons from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.22/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.22/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.28.4_rollup@4.52.4_vue@3.5.22_typescript@5.9.3_/node_modules/unplugin-vue-components/dist/vite.js";
import Markdown from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-vue-markdown@0.26.3_rollup@4.52.4_vite@5.4.20_@types+node@24.7.2_terser@5.44.0_/node_modules/unplugin-vue-markdown/dist/vite.js";
import Vue from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.20_@types+node@24.7.2_terser@5.44.0__vue@3.5.22_typescript@5.9.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import matter from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import AutoImport from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.1_vue@3.5.22_typescript@5.9.3___rollup@4.52.4/node_modules/unplugin-auto-import/dist/vite.js";
import anchor from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-anchor@8.6.7_@types+markdown-it@14.1.2_markdown-it@14.1.0/node_modules/markdown-it-anchor/dist/markdownItAnchor.js";
import LinkAttributes from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import GitHubAlerts from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-github-alerts@0.3.2_markdown-it@14.1.0/node_modules/markdown-it-github-alerts/dist/index.mjs";
import UnoCSS from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unocss@0.61.9_postcss@8.5.6_rollup@4.52.4_vite@5.4.20_@types+node@24.7.2_terser@5.44.0_/node_modules/unocss/dist/vite.mjs";
import SVG from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.22_typescript@5.9.3_/node_modules/vite-svg-loader/index.js";
import MarkdownItShiki from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/@shikijs+markdown-it@1.29.2/node_modules/@shikijs/markdown-it/dist/index.mjs";
import { rendererRich, transformerTwoslash } from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/@shikijs+twoslash@1.29.2_typescript@5.9.3/node_modules/@shikijs/twoslash/dist/index.mjs";
import MarkdownItMagicLink from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-magic-link@0.1.4/node_modules/markdown-it-magic-link/dist/index.mjs";
import VueRouter from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-vue-router@0.10.9_rollup@4.52.4_vue-router@4.2.5_vue@3.5.22_typescript@5.9.3___vue@3.5.22_typescript@5.9.3_/node_modules/unplugin-vue-router/dist/vite.js";
import { VueRouterAutoImports } from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/unplugin-vue-router@0.10.9_rollup@4.52.4_vue-router@4.2.5_vue@3.5.22_typescript@5.9.3___vue@3.5.22_typescript@5.9.3_/node_modules/unplugin-vue-router/dist/index.js";
import TodoLists from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-todo-lists@0.1.8_markdown-it@14.1.0/node_modules/markdown-it-todo-lists/dist/index.mjs";
import TOC from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-table-of-contents@0.6.0/node_modules/markdown-it-table-of-contents/index.js";
import sharp from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/sharp@0.33.1/node_modules/sharp/lib/index.js";

// scripts/slugify.ts
import { remove } from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/diacritics@1.3.0/node_modules/diacritics/index.js";
var rControl = /[\u0000-\u001F]/g;
var rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;
function slugify(str) {
  return remove(str).replace(rControl, "").replace(rSpecial, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").replace(/^(\d)/, "_$1").toLowerCase();
}

// src/plugins/containers.ts
import fs from "node:fs";
import path from "node:path";
import container from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/markdown-it-container@4.0.0/node_modules/markdown-it-container/index.mjs";
import { nanoid } from "file:///D:/zsxjun-github/zsxjun-leet.me/node_modules/.pnpm/nanoid@5.1.6/node_modules/nanoid/index.js";

// src/plugins/preWrapper.ts
function preWrapperPlugin(md) {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    token.info = token.info.replace(/\[.*\]/, "");
    const active = / active( |$)/.test(token.info) ? " active" : "";
    token.info = token.info.replace(/ active$/, "").replace(/ active /, " ");
    const lang = extractLang(token.info);
    return `<div class="language-${lang}${active}">${fence(...args)}</div>`;
  };
}
function extractTitle(info, html = false) {
  if (html) {
    return info.replace(/<!--[\s\S]*?-->/g, "").match(/data-title="(.*?)"/)?.[1] || "";
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || "txt";
}
function extractLang(info) {
  return info.trim().replace(/=(\d*)/, "").replace(/:(no-)?line-numbers(\{| |$|=\d*).*/, "").replace(/(-vue|\{| ).*$/, "").replace(/^vue-html$/, "template").replace(/^ansi$/, "");
}

// src/plugins/containers.ts
var __vite_injected_original_dirname = "D:\\zsxjun-github\\zsxjun-leet.me\\src\\plugins";
function containerPlugin(md, options, containerOptions) {
  md.use(...createContainer("tip", containerOptions?.tipLabel || "TIP", md)).use(...createContainer("warning", containerOptions?.warningLabel || "WARNING", md)).use(...createContainer("danger", containerOptions?.dangerLabel || "DANGER", md)).use(...createContainer("info", containerOptions?.infoLabel || "INFO", md)).use(...createContainer("details", containerOptions?.detailsLabel || "Details", md)).use(...createCodeGroup()).use(...createCodePreview(md));
}
function createContainer(klass, defaultTitle, md) {
  return [
    container,
    klass,
    {
      render(tokens, idx, _options, env) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        const attrs = md.renderer.renderAttrs(token);
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle, {
            references: env.references
          });
          if (klass === "details")
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>
`;
          return `<div class="${klass} custom-block"${attrs}><p class="custom-block-title">${title}</p>
`;
        } else {
          return klass === "details" ? `</details>
` : `</div>
`;
        }
      }
    }
  ];
}
function createCodeGroup() {
  return [
    container,
    "code-group",
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5);
          let tabs = "";
          let checked = "checked";
          for (let i = idx + 1; !(tokens[i].nesting === -1 && tokens[i].type === "container_code-group_close"); i++) {
            const isHtml = tokens[i].type === "html_block";
            if (tokens[i].type === "fence" && tokens[i].tag === "code" || isHtml) {
              const title = extractTitle(isHtml ? tokens[i].content : tokens[i].info, isHtml);
              if (title) {
                const id = nanoid(7);
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`;
                if (checked && !isHtml)
                  tokens[i].info += " active";
                checked = "";
              }
            }
          }
          return `<div class="code-group"><div class="tabs">${tabs}</div><div class="blocks">
`;
        }
        return `</div></div>
`;
      }
    }
  ];
}
function createCodePreview(md) {
  return [
    container,
    "demo",
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const sourceFileToken = tokens[idx + 2];
          const sourceFile = sourceFileToken.children?.[0].content ?? "";
          let source = "";
          if (sourceFileToken.type === "inline") {
            source = fs.readFileSync(
              path.resolve(__vite_injected_original_dirname, `../${sourceFile}.vue`),
              "utf-8"
            );
          }
          if (!source)
            throw new Error(`Incorrect source file: ${sourceFile}`);
          return `<CodePreview :demos="demos" source="${encodeURIComponent(md.render(`\`\`\` vue
${source}\`\`\``))}" raw-source="${encodeURIComponent(source)}" path="${sourceFile}">`;
        } else {
          return "</CodePreview>";
        }
      }
    }
  ];
}

// src/plugins/markdownTransform.ts
function MarkdownTransform() {
  return {
    name: "marndown-transform",
    enforce: "pre",
    async transform(code, id) {
      if (!id.endsWith(".md"))
        return;
      const examples = extractDemoComponents(code);
      if (examples.length === 0)
        return code;
      const scriptSetups = [
        `const demos = import.meta.glob([${examples.map((example) => `'${example}'`).join(",")}], { eager: true })`
      ];
      return combineMarkdown(
        code,
        [combineScriptSetup(scriptSetups)]
      );
    }
  };
}
function combineScriptSetup(codes) {
  return `
<script setup>
${codes.join("\n")}
</script>
`;
}
function combineMarkdown(code, headers) {
  const matches = [...code.matchAll(/---\r?\n/g)];
  const frontmatterEnds = matches[1]?.index ?? -1;
  const sliceIndex = frontmatterEnds < 0 ? code.indexOf("\n") + 1 : frontmatterEnds + matches[1][0].length;
  if (sliceIndex <= 0) {
    return code + headers.join("\n");
  }
  code = code.slice(0, sliceIndex) + headers.join("\n") + code.slice(sliceIndex);
  return code;
}
var demoContainerRE = /::: demo\s*([\s\S]*?)\s*:::/g;
function extractDemoComponents(code) {
  const matches = code.matchAll(demoContainerRE);
  const demos = [];
  for (const match of matches) {
    const sourceFile = match[1].trim();
    demos.push(`../../src${sourceFile}.vue`);
  }
  return demos;
}

// vite.config.ts
var __vite_injected_original_dirname2 = "D:\\zsxjun-github\\zsxjun-leet.me";
var promises = [];
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      { find: "~/", replacement: `${resolve(__vite_injected_original_dirname2, "src")}/` }
    ]
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "dayjs",
      "dayjs/plugin/localizedFormat"
    ]
  },
  plugins: [
    UnoCSS(),
    VueRouter({
      extensions: [".vue", ".md"],
      routesFolder: "pages",
      logs: true,
      extendRoute(route) {
        const path2 = route.components.get("default");
        if (!path2)
          return;
        if (!path2.includes("projects.md") && path2.endsWith(".md")) {
          const { data } = matter(fs2.readFileSync(path2, "utf-8"));
          route.addToMeta({
            frontmatter: data
          });
        }
      }
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        defineModel: true
      }
    }),
    MarkdownTransform(),
    Markdown({
      wrapperComponent: "WrapperPost",
      wrapperClasses: (id, code) => code.includes("@layout-full-width") ? "" : code.includes("@layout-links") ? "links prose m-auto slide-enter-content" : "prose m-auto slide-enter-content",
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: `""''`
      },
      async markdownItSetup(md) {
        md.use(await MarkdownItShiki({
          themes: {
            dark: "vitesse-dark",
            light: "vitesse-light"
          },
          defaultColor: false,
          cssVariablePrefix: "--s-",
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich()
            })
          ]
        }));
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" })
          })
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>'
        });
        md.use(MarkdownItMagicLink, {
          linksMap: {
            Vitest: "https://github.com/vitest-dev/vitest",
            VueUse: "https://github.com/vueuse/vueuse",
            UnoCSS: "https://github.com/unocss/unocss",
            Vue: "https://github.com/vuejs/core",
            Nuxt: "https://github.com/nuxt/nuxt",
            Vite: "https://github.com/vitejs/vite",
            Unplugin: "https://github.com/unplugin",
            ESLint: "https://github.com/eslint/eslint",
            Netlify: { link: "https://netlify.com", imageUrl: "https://github.com/netlify.png" },
            Vercel: { link: "https://vercel.com", imageUrl: "https://github.com/vercel.png" },
            JavaScript: "https://www.javascript.com/",
            TypeScript: "https://github.com/microsoft/TypeScript",
            NodeJS: "https://github.com/nodejs/node",
            Java: "https://www.java.com/zh-CN/",
            Go: "https://github.com/golang/go",
            React: "https://github.com/facebook/react",
            Electron: "https://github.com/electron/electron",
            D3: "https://github.com/d3/d3",
            Next: "https://github.com/vercel/next.js"
          },
          imageOverrides: [
            ["https://www.javascript.com/", "https://cdn-icons-png.flaticon.com/64/5968/5968292.png"],
            ["https://github.com/microsoft/TypeScript", "https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae"],
            ["https://github.com/vuejs/core", "https://vuejs.org/logo.svg"],
            ["https://github.com/nuxt/nuxt", "https://nuxt.com/assets/design-kit/icon-green.svg"],
            ["https://github.com/vitejs/vite", "https://vitejs.dev/logo.svg"],
            ["https://github.com/facebook/react", "https://react.dev/favicon-32x32.png"]
          ]
        });
        md.use(GitHubAlerts);
        md.use(TodoLists);
        md.use(preWrapperPlugin);
        md.use(containerPlugin);
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          if (!id.endsWith(".md"))
            return;
          const route = basename(id, ".md");
          if (route === "index" || frontmatter.image || !frontmatter.title)
            return;
          const path2 = `og/${route}.png`;
          promises.push(
            fs2.existsSync(`${id.slice(0, -3)}.png`) ? fs2.copy(`${id.slice(0, -3)}.png`, `public/${path2}`) : generateOg(frontmatter.title.replace(/\s-\s.*$/, "").trim(), `public/${path2}`)
          );
          frontmatter.image = `https://leetme.netlify.app/${path2}`;
        })();
        const head = defaults(frontmatter, options);
        return { head, frontmatter };
      }
    }),
    AutoImport({
      imports: [
        "vue",
        VueRouterAutoImports,
        "@vueuse/core"
      ]
    }),
    Components({
      extensions: ["vue", "md"],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: ""
        })
      ]
    }),
    Inspect(),
    Icons({
      defaultClass: "inline",
      defaultStyle: "vertical-align: sub;"
    }),
    SVG({
      svgo: false,
      defaultImport: "url"
    }),
    {
      name: "await",
      async closeBundle() {
        await Promise.all(promises);
      }
    }
  ],
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== "UNUSED_EXTERNAL_IMPORT")
          next(warning);
      }
    }
  },
  ssgOptions: {
    formatting: "minify"
  }
});
var ogSVg = fs2.readFileSync("./scripts/og-template.svg", "utf-8");
async function generateOg(title, output) {
  if (fs2.existsSync(output))
    return;
  await fs2.mkdir(dirname(output), { recursive: true });
  const lines = title.trim().split(/(.{0,30})(?:\s|$)/g).filter(Boolean);
  const data = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2]
  };
  const svg = ogSVg.replace(/\{\{([^}]+)\}\}/g, (_, name) => data[name] || "");
  console.log(`Generating ${output}`);
  try {
    await sharp(Buffer.from(svg)).resize(1200 * 1.1, 630 * 1.1).png().toFile(output);
  } catch (e) {
    console.error("Failed to generate og image", e);
  }
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9zbHVnaWZ5LnRzIiwgInNyYy9wbHVnaW5zL2NvbnRhaW5lcnMudHMiLCAic3JjL3BsdWdpbnMvcHJlV3JhcHBlci50cyIsICJzcmMvcGx1Z2lucy9tYXJrZG93blRyYW5zZm9ybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3pzeGp1bi1naXRodWIvenN4anVuLWxlZXQubWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ25vZGU6YnVmZmVyJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCBNYXJrZG93biBmcm9tICd1bnBsdWdpbi12dWUtbWFya2Rvd24vdml0ZSdcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgYW5jaG9yIGZyb20gJ21hcmtkb3duLWl0LWFuY2hvcidcbmltcG9ydCBMaW5rQXR0cmlidXRlcyBmcm9tICdtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXMnXG5pbXBvcnQgR2l0SHViQWxlcnRzIGZyb20gJ21hcmtkb3duLWl0LWdpdGh1Yi1hbGVydHMnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuaW1wb3J0IFNWRyBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgTWFya2Rvd25JdFNoaWtpIGZyb20gJ0BzaGlraWpzL21hcmtkb3duLWl0J1xuaW1wb3J0IHsgcmVuZGVyZXJSaWNoLCB0cmFuc2Zvcm1lclR3b3NsYXNoIH0gZnJvbSAnQHNoaWtpanMvdHdvc2xhc2gnXG5pbXBvcnQgTWFya2Rvd25JdE1hZ2ljTGluayBmcm9tICdtYXJrZG93bi1pdC1tYWdpYy1saW5rJ1xuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXG5pbXBvcnQgeyBWdWVSb3V0ZXJBdXRvSW1wb3J0cyB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXInXG5pbXBvcnQgVG9kb0xpc3RzIGZyb20gJ21hcmtkb3duLWl0LXRvZG8tbGlzdHMnXG5cbi8vIEB0cy1leHBlY3QtZXJyb3IgbWlzc2luZyB0eXBlc1xuaW1wb3J0IFRPQyBmcm9tICdtYXJrZG93bi1pdC10YWJsZS1vZi1jb250ZW50cydcbmltcG9ydCBzaGFycCBmcm9tICdzaGFycCdcbmltcG9ydCB7IHNsdWdpZnkgfSBmcm9tICcuL3NjcmlwdHMvc2x1Z2lmeSdcbmltcG9ydCB7IGNvbnRhaW5lclBsdWdpbiB9IGZyb20gJy4vc3JjL3BsdWdpbnMvY29udGFpbmVycydcbmltcG9ydCB7IHByZVdyYXBwZXJQbHVnaW4gfSBmcm9tICcuL3NyYy9wbHVnaW5zL3ByZVdyYXBwZXInXG5pbXBvcnQgeyBNYXJrZG93blRyYW5zZm9ybSB9IGZyb20gJy4vc3JjL3BsdWdpbnMvbWFya2Rvd25UcmFuc2Zvcm0nXG5cbmNvbnN0IHByb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnfi8nLCByZXBsYWNlbWVudDogYCR7cmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCB9LFxuICAgIF0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICd2dWUnLFxuICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAnZGF5anMnLFxuICAgICAgJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnLFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBVbm9DU1MoKSxcblxuICAgIFZ1ZVJvdXRlcih7XG4gICAgICBleHRlbnNpb25zOiBbJy52dWUnLCAnLm1kJ10sXG4gICAgICByb3V0ZXNGb2xkZXI6ICdwYWdlcycsXG4gICAgICBsb2dzOiB0cnVlLFxuICAgICAgZXh0ZW5kUm91dGUocm91dGUpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHJvdXRlLmNvbXBvbmVudHMuZ2V0KCdkZWZhdWx0JylcbiAgICAgICAgaWYgKCFwYXRoKVxuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGlmICghcGF0aC5pbmNsdWRlcygncHJvamVjdHMubWQnKSAmJiBwYXRoLmVuZHNXaXRoKCcubWQnKSkge1xuICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gbWF0dGVyKGZzLnJlYWRGaWxlU3luYyhwYXRoLCAndXRmLTgnKSlcbiAgICAgICAgICByb3V0ZS5hZGRUb01ldGEoe1xuICAgICAgICAgICAgZnJvbnRtYXR0ZXI6IGRhdGEsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIFZ1ZSh7XG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG4gICAgICBzY3JpcHQ6IHtcbiAgICAgICAgZGVmaW5lTW9kZWw6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgTWFya2Rvd25UcmFuc2Zvcm0oKSxcblxuICAgIE1hcmtkb3duKHtcbiAgICAgIHdyYXBwZXJDb21wb25lbnQ6ICdXcmFwcGVyUG9zdCcsXG4gICAgICB3cmFwcGVyQ2xhc3NlczogKGlkLCBjb2RlKSA9PiBjb2RlLmluY2x1ZGVzKCdAbGF5b3V0LWZ1bGwtd2lkdGgnKVxuICAgICAgICA/ICcnXG4gICAgICAgIDogY29kZS5pbmNsdWRlcygnQGxheW91dC1saW5rcycpXG4gICAgICAgICAgPyAnbGlua3MgcHJvc2UgbS1hdXRvIHNsaWRlLWVudGVyLWNvbnRlbnQnXG4gICAgICAgICAgOiAncHJvc2UgbS1hdXRvIHNsaWRlLWVudGVyLWNvbnRlbnQnLFxuICAgICAgaGVhZEVuYWJsZWQ6IHRydWUsXG4gICAgICBleHBvcnRGcm9udG1hdHRlcjogZmFsc2UsXG4gICAgICBleHBvc2VGcm9udG1hdHRlcjogZmFsc2UsXG4gICAgICBleHBvc2VFeGNlcnB0OiBmYWxzZSxcbiAgICAgIG1hcmtkb3duSXRPcHRpb25zOiB7XG4gICAgICAgIHF1b3RlczogJ1wiXCJcXCdcXCcnLFxuICAgICAgfSxcbiAgICAgIGFzeW5jIG1hcmtkb3duSXRTZXR1cChtZCkge1xuICAgICAgICBtZC51c2UoYXdhaXQgTWFya2Rvd25JdFNoaWtpKHtcbiAgICAgICAgICB0aGVtZXM6IHtcbiAgICAgICAgICAgIGRhcms6ICd2aXRlc3NlLWRhcmsnLFxuICAgICAgICAgICAgbGlnaHQ6ICd2aXRlc3NlLWxpZ2h0JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlZmF1bHRDb2xvcjogZmFsc2UsXG4gICAgICAgICAgY3NzVmFyaWFibGVQcmVmaXg6ICctLXMtJyxcbiAgICAgICAgICB0cmFuc2Zvcm1lcnM6IFtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyVHdvc2xhc2goe1xuICAgICAgICAgICAgICBleHBsaWNpdFRyaWdnZXI6IHRydWUsXG4gICAgICAgICAgICAgIHJlbmRlcmVyOiByZW5kZXJlclJpY2goKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pKVxuXG4gICAgICAgIG1kLnVzZShhbmNob3IsIHtcbiAgICAgICAgICBzbHVnaWZ5LFxuICAgICAgICAgIHBlcm1hbGluazogYW5jaG9yLnBlcm1hbGluay5saW5rSW5zaWRlSGVhZGVyKHtcbiAgICAgICAgICAgIHN5bWJvbDogJyMnLFxuICAgICAgICAgICAgcmVuZGVyQXR0cnM6ICgpID0+ICh7ICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9KSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSlcblxuICAgICAgICBtZC51c2UoTGlua0F0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgICAgICByZWw6ICdub29wZW5lcicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBtZC51c2UoVE9DLCB7XG4gICAgICAgICAgaW5jbHVkZUxldmVsOiBbMSwgMiwgMywgNF0sXG4gICAgICAgICAgc2x1Z2lmeSxcbiAgICAgICAgICBjb250YWluZXJIZWFkZXJIdG1sOiAnPGRpdiBjbGFzcz1cInRhYmxlLW9mLWNvbnRlbnRzLWFuY2hvclwiPjxkaXYgY2xhc3M9XCJpLXJpLW1lbnUtMi1maWxsXCIgLz48L2Rpdj4nLFxuICAgICAgICB9KVxuXG4gICAgICAgIG1kLnVzZShNYXJrZG93bkl0TWFnaWNMaW5rLCB7XG4gICAgICAgICAgbGlua3NNYXA6IHtcbiAgICAgICAgICAgIFZpdGVzdDogJ2h0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdCcsXG4gICAgICAgICAgICBWdWVVc2U6ICdodHRwczovL2dpdGh1Yi5jb20vdnVldXNlL3Z1ZXVzZScsXG4gICAgICAgICAgICBVbm9DU1M6ICdodHRwczovL2dpdGh1Yi5jb20vdW5vY3NzL3Vub2NzcycsXG4gICAgICAgICAgICBWdWU6ICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvY29yZScsXG4gICAgICAgICAgICBOdXh0OiAnaHR0cHM6Ly9naXRodWIuY29tL251eHQvbnV4dCcsXG4gICAgICAgICAgICBWaXRlOiAnaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlJyxcbiAgICAgICAgICAgIFVucGx1Z2luOiAnaHR0cHM6Ly9naXRodWIuY29tL3VucGx1Z2luJyxcbiAgICAgICAgICAgIEVTTGludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50JyxcbiAgICAgICAgICAgIE5ldGxpZnk6IHsgbGluazogJ2h0dHBzOi8vbmV0bGlmeS5jb20nLCBpbWFnZVVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9uZXRsaWZ5LnBuZycgfSxcbiAgICAgICAgICAgIFZlcmNlbDogeyBsaW5rOiAnaHR0cHM6Ly92ZXJjZWwuY29tJywgaW1hZ2VVcmw6ICdodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsLnBuZycgfSxcbiAgICAgICAgICAgIEphdmFTY3JpcHQ6ICdodHRwczovL3d3dy5qYXZhc2NyaXB0LmNvbS8nLFxuICAgICAgICAgICAgVHlwZVNjcmlwdDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdCcsXG4gICAgICAgICAgICBOb2RlSlM6ICdodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUnLFxuICAgICAgICAgICAgSmF2YTogJ2h0dHBzOi8vd3d3LmphdmEuY29tL3poLUNOLycsXG4gICAgICAgICAgICBHbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9nb2xhbmcvZ28nLFxuICAgICAgICAgICAgUmVhY3Q6ICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QnLFxuICAgICAgICAgICAgRWxlY3Ryb246ICdodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24nLFxuICAgICAgICAgICAgRDM6ICdodHRwczovL2dpdGh1Yi5jb20vZDMvZDMnLFxuICAgICAgICAgICAgTmV4dDogJ2h0dHBzOi8vZ2l0aHViLmNvbS92ZXJjZWwvbmV4dC5qcycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbWFnZU92ZXJyaWRlczogW1xuICAgICAgICAgICAgWydodHRwczovL3d3dy5qYXZhc2NyaXB0LmNvbS8nLCAnaHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS82NC81OTY4LzU5NjgyOTIucG5nJ10sXG4gICAgICAgICAgICBbJ2h0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdCcsICdodHRwczovL3d3dy50eXBlc2NyaXB0bGFuZy5vcmcvZmF2aWNvbi0zMngzMi5wbmc/dj04OTQ0YTA1YThiNjAxODU1ZGUxMTZjOGE1NmQzYjNhZSddLFxuICAgICAgICAgICAgWydodHRwczovL2dpdGh1Yi5jb20vdnVlanMvY29yZScsICdodHRwczovL3Z1ZWpzLm9yZy9sb2dvLnN2ZyddLFxuICAgICAgICAgICAgWydodHRwczovL2dpdGh1Yi5jb20vbnV4dC9udXh0JywgJ2h0dHBzOi8vbnV4dC5jb20vYXNzZXRzL2Rlc2lnbi1raXQvaWNvbi1ncmVlbi5zdmcnXSxcbiAgICAgICAgICAgIFsnaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlJywgJ2h0dHBzOi8vdml0ZWpzLmRldi9sb2dvLnN2ZyddLFxuICAgICAgICAgICAgWydodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QnLCAnaHR0cHM6Ly9yZWFjdC5kZXYvZmF2aWNvbi0zMngzMi5wbmcnXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KVxuXG4gICAgICAgIG1kLnVzZShHaXRIdWJBbGVydHMpXG5cbiAgICAgICAgbWQudXNlKFRvZG9MaXN0cylcblxuICAgICAgICBtZC51c2UocHJlV3JhcHBlclBsdWdpbilcblxuICAgICAgICBtZC51c2UoY29udGFpbmVyUGx1Z2luKVxuICAgICAgfSxcbiAgICAgIGZyb250bWF0dGVyUHJlcHJvY2Vzcyhmcm9udG1hdHRlciwgb3B0aW9ucywgaWQsIGRlZmF1bHRzKSB7XG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFpZC5lbmRzV2l0aCgnLm1kJykpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICBjb25zdCByb3V0ZSA9IGJhc2VuYW1lKGlkLCAnLm1kJylcbiAgICAgICAgICBpZiAocm91dGUgPT09ICdpbmRleCcgfHwgZnJvbnRtYXR0ZXIuaW1hZ2UgfHwgIWZyb250bWF0dGVyLnRpdGxlKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgY29uc3QgcGF0aCA9IGBvZy8ke3JvdXRlfS5wbmdgXG4gICAgICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgICAgIGZzLmV4aXN0c1N5bmMoYCR7aWQuc2xpY2UoMCwgLTMpfS5wbmdgKVxuICAgICAgICAgICAgICA/IGZzLmNvcHkoYCR7aWQuc2xpY2UoMCwgLTMpfS5wbmdgLCBgcHVibGljLyR7cGF0aH1gKVxuICAgICAgICAgICAgICA6IGdlbmVyYXRlT2coZnJvbnRtYXR0ZXIudGl0bGUhLnJlcGxhY2UoL1xccy1cXHMuKiQvLCAnJykudHJpbSgpLCBgcHVibGljLyR7cGF0aH1gKSxcbiAgICAgICAgICApXG4gICAgICAgICAgZnJvbnRtYXR0ZXIuaW1hZ2UgPSBgaHR0cHM6Ly9sZWV0bWUubmV0bGlmeS5hcHAvJHtwYXRofWBcbiAgICAgICAgfSkoKVxuICAgICAgICBjb25zdCBoZWFkID0gZGVmYXVsdHMoZnJvbnRtYXR0ZXIsIG9wdGlvbnMpXG4gICAgICAgIHJldHVybiB7IGhlYWQsIGZyb250bWF0dGVyIH1cbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIFZ1ZVJvdXRlckF1dG9JbXBvcnRzLFxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICBkdHM6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC9dLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIGNvbXBvbmVudFByZWZpeDogJycsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIEluc3BlY3QoKSxcblxuICAgIEljb25zKHtcbiAgICAgIGRlZmF1bHRDbGFzczogJ2lubGluZScsXG4gICAgICBkZWZhdWx0U3R5bGU6ICd2ZXJ0aWNhbC1hbGlnbjogc3ViOycsXG4gICAgfSksXG5cbiAgICBTVkcoe1xuICAgICAgc3ZnbzogZmFsc2UsXG4gICAgICBkZWZhdWx0SW1wb3J0OiAndXJsJyxcbiAgICB9KSxcblxuICAgIHtcbiAgICAgIG5hbWU6ICdhd2FpdCcsXG4gICAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG5cbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvbndhcm4od2FybmluZywgbmV4dCkge1xuICAgICAgICBpZiAod2FybmluZy5jb2RlICE9PSAnVU5VU0VEX0VYVEVSTkFMX0lNUE9SVCcpXG4gICAgICAgICAgbmV4dCh3YXJuaW5nKVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHNzZ09wdGlvbnM6IHtcbiAgICBmb3JtYXR0aW5nOiAnbWluaWZ5JyxcbiAgfSxcbn0pXG5cbmNvbnN0IG9nU1ZnID0gZnMucmVhZEZpbGVTeW5jKCcuL3NjcmlwdHMvb2ctdGVtcGxhdGUuc3ZnJywgJ3V0Zi04JylcblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVPZyh0aXRsZTogc3RyaW5nLCBvdXRwdXQ6IHN0cmluZykge1xuICBpZiAoZnMuZXhpc3RzU3luYyhvdXRwdXQpKVxuICAgIHJldHVyblxuXG4gIGF3YWl0IGZzLm1rZGlyKGRpcm5hbWUob3V0cHV0KSwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgLy8gYnJlYWtsaW5lIGV2ZXJ5IDMwIGNoYXJzXG4gIGNvbnN0IGxpbmVzID0gdGl0bGUudHJpbSgpLnNwbGl0KC8oLnswLDMwfSkoPzpcXHN8JCkvZykuZmlsdGVyKEJvb2xlYW4pXG5cbiAgY29uc3QgZGF0YTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICBsaW5lMTogbGluZXNbMF0sXG4gICAgbGluZTI6IGxpbmVzWzFdLFxuICAgIGxpbmUzOiBsaW5lc1syXSxcbiAgfVxuICBjb25zdCBzdmcgPSBvZ1NWZy5yZXBsYWNlKC9cXHtcXHsoW159XSspXFx9XFx9L2csIChfLCBuYW1lKSA9PiBkYXRhW25hbWVdIHx8ICcnKVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nICR7b3V0cHV0fWApXG4gIHRyeSB7XG4gICAgYXdhaXQgc2hhcnAoQnVmZmVyLmZyb20oc3ZnKSlcbiAgICAgIC5yZXNpemUoMTIwMCAqIDEuMSwgNjMwICogMS4xKVxuICAgICAgLnBuZygpXG4gICAgICAudG9GaWxlKG91dHB1dClcbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBnZW5lcmF0ZSBvZyBpbWFnZScsIGUpXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcenN4anVuLWdpdGh1YlxcXFx6c3hqdW4tbGVldC5tZVxcXFxzY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx6c3hqdW4tZ2l0aHViXFxcXHpzeGp1bi1sZWV0Lm1lXFxcXHNjcmlwdHNcXFxcc2x1Z2lmeS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovenN4anVuLWdpdGh1Yi96c3hqdW4tbGVldC5tZS9zY3JpcHRzL3NsdWdpZnkudHNcIjsvLyBzdHJpbmcuanMgc2x1Z2lmeSBkcm9wcyBub24gYXNjaWkgY2hhcnMgc28gd2UgaGF2ZSB0b1xuLy8gdXNlIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uIGhlcmVcbmltcG9ydCB7IHJlbW92ZSB9IGZyb20gJ2RpYWNyaXRpY3MnXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5jb25zdCByQ29udHJvbCA9IC9bXFx1MDAwMC1cXHUwMDFGXS9nXG5jb25zdCByU3BlY2lhbCA9IC9bXFxzfmAhQCMkJV4mKigpXFwtXys9W1xcXXt9fFxcXFw7OlwiJzw+LC4/L10rL2dcblxuZXhwb3J0IGZ1bmN0aW9uIHNsdWdpZnkoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gKFxuICAgIHJlbW92ZShzdHIpXG4gICAgICAvLyBSZW1vdmUgY29udHJvbCBjaGFyYWN0ZXJzXG4gICAgICAucmVwbGFjZShyQ29udHJvbCwgJycpXG4gICAgICAvLyBSZXBsYWNlIHNwZWNpYWwgY2hhcmFjdGVyc1xuICAgICAgLnJlcGxhY2UoclNwZWNpYWwsICctJylcbiAgICAgIC8vIFJlbW92ZSBjb250aW51b3Mgc2VwYXJhdG9yc1xuICAgICAgLnJlcGxhY2UoLy17Mix9L2csICctJylcbiAgICAgIC8vIFJlbW92ZSBwcmVmaXhpbmcgYW5kIHRyYWlsaW5nIHNlcGFydG9yc1xuICAgICAgLnJlcGxhY2UoL14tK3wtKyQvZywgJycpXG4gICAgICAvLyBlbnN1cmUgaXQgZG9lc24ndCBzdGFydCB3aXRoIGEgbnVtYmVyICgjMTIxKVxuICAgICAgLnJlcGxhY2UoL14oXFxkKS8sICdfJDEnKVxuICAgICAgLy8gbG93ZXJjYXNlXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICApXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcXFxcc3JjXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxcY29udGFpbmVycy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovenN4anVuLWdpdGh1Yi96c3hqdW4tbGVldC5tZS9zcmMvcGx1Z2lucy9jb250YWluZXJzLnRzXCI7aW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0J1xuaW1wb3J0IHR5cGUgeyBSZW5kZXJSdWxlIH0gZnJvbSAnbWFya2Rvd24taXQvbGliL3JlbmRlcmVyLm1qcydcbmltcG9ydCBjb250YWluZXIgZnJvbSAnbWFya2Rvd24taXQtY29udGFpbmVyJ1xuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSAnbmFub2lkJ1xuaW1wb3J0IHsgZXh0cmFjdFRpdGxlIH0gZnJvbSAnLi9wcmVXcmFwcGVyJ1xuXG5pbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGNvZGVDb3B5QnV0dG9uVGl0bGU6IHN0cmluZ1xuICBoYXNTaW5nbGVUaGVtZTogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbmVyUGx1Z2luKG1kOiBNYXJrZG93bkl0LCBvcHRpb25zOiBPcHRpb25zLCBjb250YWluZXJPcHRpb25zPzogQ29udGFpbmVyT3B0aW9ucykge1xuICBtZC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCd0aXAnLCBjb250YWluZXJPcHRpb25zPy50aXBMYWJlbCB8fCAnVElQJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCd3YXJuaW5nJywgY29udGFpbmVyT3B0aW9ucz8ud2FybmluZ0xhYmVsIHx8ICdXQVJOSU5HJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdkYW5nZXInLCBjb250YWluZXJPcHRpb25zPy5kYW5nZXJMYWJlbCB8fCAnREFOR0VSJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdpbmZvJywgY29udGFpbmVyT3B0aW9ucz8uaW5mb0xhYmVsIHx8ICdJTkZPJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29udGFpbmVyKCdkZXRhaWxzJywgY29udGFpbmVyT3B0aW9ucz8uZGV0YWlsc0xhYmVsIHx8ICdEZXRhaWxzJywgbWQpKVxuICAgIC51c2UoLi4uY3JlYXRlQ29kZUdyb3VwKCkpXG4gICAgLnVzZSguLi5jcmVhdGVDb2RlUHJldmlldyhtZCkpXG59XG5cbnR5cGUgQ29udGFpbmVyQXJncyA9IFt0eXBlb2YgY29udGFpbmVyLCBzdHJpbmcsIHsgcmVuZGVyOiBSZW5kZXJSdWxlIH1dXG5cbi8qKlxuICpcbiAqIEBwYXJhbSBrbGFzcyAtIGNvbnRhaW5lclx1N0M3Qlx1NTc4QlxuICogQHBhcmFtIGRlZmF1bHRUaXRsZSAtIGNvbnRhaW5lclx1NjgwN1x1OTg5OFxuICogQHBhcmFtIG1kIC0gbWFya2Rvd24taXRcdTVCOUVcdTRGOEJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKFxuICBrbGFzczogc3RyaW5nLFxuICBkZWZhdWx0VGl0bGU6IHN0cmluZyxcbiAgbWQ6IE1hcmtkb3duSXQsXG4pOiBDb250YWluZXJBcmdzIHtcbiAgcmV0dXJuIFtcbiAgICBjb250YWluZXIsXG4gICAga2xhc3MsXG4gICAge1xuICAgICAgcmVuZGVyKHRva2VucywgaWR4LCBfb3B0aW9ucywgZW52OiB7IHJlZmVyZW5jZXM/OiBhbnkgfSkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdXG4gICAgICAgIGNvbnN0IGluZm8gPSB0b2tlbi5pbmZvLnRyaW0oKS5zbGljZShrbGFzcy5sZW5ndGgpLnRyaW0oKVxuICAgICAgICBjb25zdCBhdHRycyA9IG1kLnJlbmRlcmVyLnJlbmRlckF0dHJzKHRva2VuKVxuICAgICAgICBpZiAodG9rZW4ubmVzdGluZyA9PT0gMSkge1xuICAgICAgICAgIGNvbnN0IHRpdGxlID0gbWQucmVuZGVySW5saW5lKGluZm8gfHwgZGVmYXVsdFRpdGxlLCB7XG4gICAgICAgICAgICByZWZlcmVuY2VzOiBlbnYucmVmZXJlbmNlcyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIGlmIChrbGFzcyA9PT0gJ2RldGFpbHMnKVxuICAgICAgICAgICAgcmV0dXJuIGA8ZGV0YWlscyBjbGFzcz1cIiR7a2xhc3N9IGN1c3RvbS1ibG9ja1wiJHthdHRyc30+PHN1bW1hcnk+JHt0aXRsZX08L3N1bW1hcnk+XFxuYFxuICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7a2xhc3N9IGN1c3RvbS1ibG9ja1wiJHthdHRyc30+PHAgY2xhc3M9XCJjdXN0b20tYmxvY2stdGl0bGVcIj4ke3RpdGxlfTwvcD5cXG5gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGtsYXNzID09PSAnZGV0YWlscycgPyBgPC9kZXRhaWxzPlxcbmAgOiBgPC9kaXY+XFxuYFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIF1cbn1cblxuLyoqXG4gKiBcdTUyMjlcdTc1MjhpbnB1dFx1NzY4NHJhZGlvXHU3Njg0Y2hlY2tlZFx1Njc2NVx1NUI5RVx1NzNCMGNvZGUtZ3JvdXBcdTc2ODRcdTUyMDdcdTYzNjJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29kZUdyb3VwKCk6IENvbnRhaW5lckFyZ3Mge1xuICByZXR1cm4gW1xuICAgIGNvbnRhaW5lcixcbiAgICAnY29kZS1ncm91cCcsXG4gICAge1xuICAgICAgcmVuZGVyKHRva2VucywgaWR4KSB7XG4gICAgICAgIGlmICh0b2tlbnNbaWR4XS5uZXN0aW5nID09PSAxKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IG5hbm9pZCg1KVxuICAgICAgICAgIGxldCB0YWJzID0gJydcbiAgICAgICAgICBsZXQgY2hlY2tlZCA9ICdjaGVja2VkJ1xuXG4gICAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBpID0gaWR4ICsgMTtcbiAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgIHRva2Vuc1tpXS5uZXN0aW5nID09PSAtMVxuICAgICAgICAgICAgICAmJiB0b2tlbnNbaV0udHlwZSA9PT0gJ2NvbnRhaW5lcl9jb2RlLWdyb3VwX2Nsb3NlJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGkrK1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gXHU1MTdDXHU1QkI5XHU1NzI4bWRcdTRFMkRcdTc2RjRcdTYzQTVcdTRGN0ZcdTc1MjggPHByZT48Y29kZT48L2NvZGU+PC9wcmU+IFx1N0YxNlx1NTE5OVx1NEVFM1x1NzgwMVx1NTc1N1x1RkYwQ1x1NUU3Nlx1NTMwNVx1NTQyQlx1NUM1RVx1NjAyN2RhdGEtdGl0bGU9XCJcIlxuICAgICAgICAgICAgY29uc3QgaXNIdG1sID0gdG9rZW5zW2ldLnR5cGUgPT09ICdodG1sX2Jsb2NrJ1xuXG4gICAgICAgICAgICBpZiAoKHRva2Vuc1tpXS50eXBlID09PSAnZmVuY2UnICYmIHRva2Vuc1tpXS50YWcgPT09ICdjb2RlJykgfHwgaXNIdG1sKSB7XG4gICAgICAgICAgICAgIC8vIFx1NzUyOFx1NEU4RVx1NjNEMFx1NTNENlx1NEVFM1x1NzgwMVx1NTc1N1x1NzY4NFx1NUM1RVx1NjAyN1x1RkYwQ1x1NkJENFx1NTk4MmBgYGpzIHt9XHU2MjE2YGBganMgW11cdTdCNDlcbiAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBleHRyYWN0VGl0bGUoaXNIdG1sID8gdG9rZW5zW2ldLmNvbnRlbnQgOiB0b2tlbnNbaV0uaW5mbywgaXNIdG1sKVxuXG4gICAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gbmFub2lkKDcpXG4gICAgICAgICAgICAgICAgdGFicyArPSBgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJncm91cC0ke25hbWV9XCIgaWQ9XCJ0YWItJHtpZH1cIiAke2NoZWNrZWR9PjxsYWJlbCBmb3I9XCJ0YWItJHtpZH1cIj4ke3RpdGxlfTwvbGFiZWw+YFxuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQgJiYgIWlzSHRtbClcbiAgICAgICAgICAgICAgICAgIHRva2Vuc1tpXS5pbmZvICs9ICcgYWN0aXZlJ1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSAnJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiY29kZS1ncm91cFwiPjxkaXYgY2xhc3M9XCJ0YWJzXCI+JHt0YWJzfTwvZGl2PjxkaXYgY2xhc3M9XCJibG9ja3NcIj5cXG5gXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGA8L2Rpdj48L2Rpdj5cXG5gXG4gICAgICB9LFxuICAgIH0sXG4gIF1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29kZVByZXZpZXcobWQ6IE1hcmtkb3duSXQpOiBDb250YWluZXJBcmdzIHtcbiAgcmV0dXJuIFtcbiAgICBjb250YWluZXIsXG4gICAgJ2RlbW8nLFxuICAgIHtcbiAgICAgIHJlbmRlcih0b2tlbnMsIGlkeCkge1xuICAgICAgICBpZiAodG9rZW5zW2lkeF0ubmVzdGluZyA9PT0gMSkge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZUZpbGVUb2tlbiA9IHRva2Vuc1tpZHggKyAyXVxuICAgICAgICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBzb3VyY2VGaWxlVG9rZW4uY2hpbGRyZW4/LlswXS5jb250ZW50ID8/ICcnXG4gICAgICAgICAgbGV0IHNvdXJjZSA9ICcnXG5cbiAgICAgICAgICBpZiAoc291cmNlRmlsZVRva2VuLnR5cGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8ke3NvdXJjZUZpbGV9LnZ1ZWApLFxuICAgICAgICAgICAgICAndXRmLTgnLFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc291cmNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmNvcnJlY3Qgc291cmNlIGZpbGU6ICR7c291cmNlRmlsZX1gKVxuXG4gICAgICAgICAgcmV0dXJuIGA8Q29kZVByZXZpZXcgOmRlbW9zPVwiZGVtb3NcIiBzb3VyY2U9XCIke2VuY29kZVVSSUNvbXBvbmVudChtZC5yZW5kZXIoYFxcYFxcYFxcYCB2dWVcXG4ke3NvdXJjZX1cXGBcXGBcXGBgKSl9XCIgcmF3LXNvdXJjZT1cIiR7ZW5jb2RlVVJJQ29tcG9uZW50KHNvdXJjZSl9XCIgcGF0aD1cIiR7c291cmNlRmlsZX1cIj5gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8L0NvZGVQcmV2aWV3PidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICBdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyT3B0aW9ucyB7XG4gIGluZm9MYWJlbD86IHN0cmluZ1xuICB0aXBMYWJlbD86IHN0cmluZ1xuICB3YXJuaW5nTGFiZWw/OiBzdHJpbmdcbiAgZGFuZ2VyTGFiZWw/OiBzdHJpbmdcbiAgZGV0YWlsc0xhYmVsPzogc3RyaW5nXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcXFxcc3JjXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHpzeGp1bi1naXRodWJcXFxcenN4anVuLWxlZXQubWVcXFxcc3JjXFxcXHBsdWdpbnNcXFxccHJlV3JhcHBlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovenN4anVuLWdpdGh1Yi96c3hqdW4tbGVldC5tZS9zcmMvcGx1Z2lucy9wcmVXcmFwcGVyLnRzXCI7aW1wb3J0IHR5cGUgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCdcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgY29kZUNvcHlCdXR0b25UaXRsZTogc3RyaW5nXG4gIGhhc1NpbmdsZVRoZW1lOiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVXcmFwcGVyUGx1Z2luKG1kOiBNYXJrZG93bkl0KSB7XG4gIGNvbnN0IGZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2UhXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBbdG9rZW5zLCBpZHhdID0gYXJnc1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF1cblxuICAgIC8vIHJlbW92ZSB0aXRsZSBmcm9tIGluZm9cbiAgICB0b2tlbi5pbmZvID0gdG9rZW4uaW5mby5yZXBsYWNlKC9cXFsuKlxcXS8sICcnKVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby11bnVzZWQtY2FwdHVyaW5nLWdyb3VwXG4gICAgY29uc3QgYWN0aXZlID0gLyBhY3RpdmUoIHwkKS8udGVzdCh0b2tlbi5pbmZvKSA/ICcgYWN0aXZlJyA6ICcnXG4gICAgdG9rZW4uaW5mbyA9IHRva2VuLmluZm8ucmVwbGFjZSgvIGFjdGl2ZSQvLCAnJykucmVwbGFjZSgvIGFjdGl2ZSAvLCAnICcpXG5cbiAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmcodG9rZW4uaW5mbylcblxuICAgIHJldHVybiAoXG4gICAgICBgPGRpdiBjbGFzcz1cImxhbmd1YWdlLSR7bGFuZ30ke2FjdGl2ZX1cIj4ke1xuICAgICAgZmVuY2UoLi4uYXJncylcbiAgICAgIH08L2Rpdj5gXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogXHU1M0JCXHU5NjY0XHU1NzU3XHU1MTg1XHU2Q0U4XHU5MUNBXHU1RTc2XHU2M0QwXHU1M0Q2ZGF0YS10aXRsZVx1NUM1RVx1NjAyN1x1NTAzQ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRpdGxlKGluZm86IHN0cmluZywgaHRtbCA9IGZhbHNlKSB7XG4gIGlmIChodG1sKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGluZm8ucmVwbGFjZSgvPCEtLVtcXHNcXFNdKj8tLT4vZywgJycpLm1hdGNoKC9kYXRhLXRpdGxlPVwiKC4qPylcIi8pPy5bMV0gfHwgJydcbiAgICApXG4gIH1cbiAgcmV0dXJuIGluZm8ubWF0Y2goL1xcWyguKilcXF0vKT8uWzFdIHx8IGV4dHJhY3RMYW5nKGluZm8pIHx8ICd0eHQnXG59XG5cbi8qKlxuICogXHU2M0QwXHU1M0Q2XHU0RUUzXHU3ODAxXHU1NzU3XHU3Njg0XHU4QkVEXHU4QTAwXHVGRjBDYGBganMgPSBqc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdExhbmcoaW5mbzogc3RyaW5nKSB7XG4gIHJldHVybiBpbmZvXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC89KFxcZCopLywgJycpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9vcHRpbWFsLXF1YW50aWZpZXItY29uY2F0ZW5hdGlvblxuICAgIC5yZXBsYWNlKC86KG5vLSk/bGluZS1udW1iZXJzKFxce3wgfCR8PVxcZCopLiovLCAnJylcbiAgICAucmVwbGFjZSgvKC12dWV8XFx7fCApLiokLywgJycpXG4gICAgLnJlcGxhY2UoL152dWUtaHRtbCQvLCAndGVtcGxhdGUnKVxuICAgIC5yZXBsYWNlKC9eYW5zaSQvLCAnJylcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcenN4anVuLWdpdGh1YlxcXFx6c3hqdW4tbGVldC5tZVxcXFxzcmNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcenN4anVuLWdpdGh1YlxcXFx6c3hqdW4tbGVldC5tZVxcXFxzcmNcXFxccGx1Z2luc1xcXFxtYXJrZG93blRyYW5zZm9ybS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovenN4anVuLWdpdGh1Yi96c3hqdW4tbGVldC5tZS9zcmMvcGx1Z2lucy9tYXJrZG93blRyYW5zZm9ybS50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIE1hcmtkb3duVHJhbnNmb3JtKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ21hcm5kb3duLXRyYW5zZm9ybScsXG4gICAgZW5mb3JjZTogJ3ByZScsXG4gICAgYXN5bmMgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICBpZiAoIWlkLmVuZHNXaXRoKCcubWQnKSlcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGV4YW1wbGVzID0gZXh0cmFjdERlbW9Db21wb25lbnRzKGNvZGUpXG5cbiAgICAgIGlmIChleGFtcGxlcy5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiBjb2RlXG5cbiAgICAgIGNvbnN0IHNjcmlwdFNldHVwcyA9IFtcbiAgICAgICAgYGNvbnN0IGRlbW9zID0gaW1wb3J0Lm1ldGEuZ2xvYihbJHtleGFtcGxlcy5tYXAoZXhhbXBsZSA9PiBgJyR7ZXhhbXBsZX0nYCkuam9pbignLCcpfV0sIHsgZWFnZXI6IHRydWUgfSlgLFxuICAgICAgXVxuXG4gICAgICByZXR1cm4gY29tYmluZU1hcmtkb3duKFxuICAgICAgICBjb2RlLFxuICAgICAgICBbY29tYmluZVNjcmlwdFNldHVwKHNjcmlwdFNldHVwcyldLFxuICAgICAgKVxuICAgIH0sXG4gIH1cbn1cblxuZnVuY3Rpb24gY29tYmluZVNjcmlwdFNldHVwKGNvZGVzOiBzdHJpbmdbXSkge1xuICByZXR1cm4gYFxcbjxzY3JpcHQgc2V0dXA+XG4ke2NvZGVzLmpvaW4oJ1xcbicpfVxuPC9zY3JpcHQ+XG5gXG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVNYXJrZG93bihjb2RlOiBzdHJpbmcsIGhlYWRlcnM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBbLi4uY29kZS5tYXRjaEFsbCgvLS0tXFxyP1xcbi9nKV1cbiAgY29uc3QgZnJvbnRtYXR0ZXJFbmRzID0gbWF0Y2hlc1sxXT8uaW5kZXggPz8gLTFcbiAgY29uc3Qgc2xpY2VJbmRleCA9IGZyb250bWF0dGVyRW5kcyA8IDAgPyBjb2RlLmluZGV4T2YoJ1xcbicpICsgMSA6IGZyb250bWF0dGVyRW5kcyArIG1hdGNoZXNbMV1bMF0ubGVuZ3RoXG5cbiAgaWYgKHNsaWNlSW5kZXggPD0gMCkge1xuICAgIHJldHVybiBjb2RlICsgaGVhZGVycy5qb2luKCdcXG4nKVxuICB9XG5cbiAgY29kZSA9IGNvZGUuc2xpY2UoMCwgc2xpY2VJbmRleCkgKyBoZWFkZXJzLmpvaW4oJ1xcbicpICsgY29kZS5zbGljZShzbGljZUluZGV4KVxuXG4gIHJldHVybiBjb2RlXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tc3VwZXItbGluZWFyLWJhY2t0cmFja2luZ1xuY29uc3QgZGVtb0NvbnRhaW5lclJFID0gLzo6OiBkZW1vXFxzKihbXFxzXFxTXSo/KVxccyo6OjovZ1xuXG5mdW5jdGlvbiBleHRyYWN0RGVtb0NvbXBvbmVudHMoY29kZTogc3RyaW5nKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBjb2RlLm1hdGNoQWxsKGRlbW9Db250YWluZXJSRSlcbiAgY29uc3QgZGVtb3MgPSBbXVxuXG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBtYXRjaFsxXS50cmltKClcbiAgICBkZW1vcy5wdXNoKGAuLi8uLi9zcmMke3NvdXJjZUZpbGV9LnZ1ZWApXG4gIH1cblxuICByZXR1cm4gZGVtb3Ncbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVIsU0FBUyxVQUFVLFNBQVMsZUFBZTtBQUNoVSxTQUFTLGNBQWM7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBT0EsU0FBUTtBQUNmLE9BQU8sYUFBYTtBQUNwQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUyxjQUFjLDJCQUEyQjtBQUNsRCxPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLGVBQWU7QUFDdEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxlQUFlO0FBR3RCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7OztBQ3hCbEIsU0FBUyxjQUFjO0FBR3ZCLElBQU0sV0FBVztBQUNqQixJQUFNLFdBQVc7QUFFVixTQUFTLFFBQVEsS0FBcUI7QUFDM0MsU0FDRSxPQUFPLEdBQUcsRUFFUCxRQUFRLFVBQVUsRUFBRSxFQUVwQixRQUFRLFVBQVUsR0FBRyxFQUVyQixRQUFRLFVBQVUsR0FBRyxF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QUN6QyxXQUFXO0FBQUEsUUFDVCxjQUFjO0FBQUEsVUFDWixpQkFBaUI7QUFBQSxRQUNuQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBRUQsUUFBUTtBQUFBLElBRVIsTUFBTTtBQUFBLE1BQ0osY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxJQUVELElBQUk7QUFBQSxNQUNGLE1BQU07QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFFRDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTSxjQUFjO0FBQ2xCLGNBQU0sUUFBUSxJQUFJLFFBQVE7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPLFNBQVMsTUFBTTtBQUNwQixZQUFJLFFBQVEsU0FBUztBQUNuQixlQUFLLE9BQU87QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxZQUFZO0FBQUEsSUFDVixZQUFZO0FBQUEsRUFDZDtBQUNGLENBQUM7QUFFRCxJQUFNLFFBQVFDLElBQUcsYUFBYSw2QkFBNkIsT0FBTztBQUVsRSxlQUFlLFdBQVcsT0FBZSxRQUFnQjtBQUN2RCxNQUFJQSxJQUFHLFdBQVcsTUFBTTtBQUN0QjtBQUVGLFFBQU1BLElBQUcsTUFBTSxRQUFRLE1BQU0sR0FBRyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBRW5ELFFBQU0sUUFBUSxNQUFNLEtBQUssRUFBRSxNQUFNLG9CQUFvQixFQUFFLE9BQU8sT0FBTztBQUVyRSxRQUFNLE9BQStCO0FBQUEsSUFDbkMsT0FBTyxNQUFNLENBQUM7QUFBQSxJQUNkLE9BQU8sTUFBTSxDQUFDO0FBQUEsSUFDZCxPQUFPLE1BQU0sQ0FBQztBQUFBLEVBQ2hCO0FBQ0EsUUFBTSxNQUFNLE1BQU0sUUFBUSxvQkFBb0IsQ0FBQyxHQUFHLFNBQVMsS0FBSyxJQUFJLEtBQUssRUFBRTtBQUczRSxVQUFRLElBQUksY0FBYyxNQUFNLEVBQUU7QUFDbEMsTUFBSTtBQUNGLFVBQU0sTUFBTSxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQ3pCLE9BQU8sT0FBTyxLQUFLLE1BQU0sR0FBRyxFQUM1QixJQUFJLEVBQ0osT0FBTyxNQUFNO0FBQUEsRUFDbEIsU0FDTyxHQUFHO0FBQ1IsWUFBUSxNQUFNLCtCQUErQixDQUFDO0FBQUEsRUFDaEQ7QUFDRjsiLAogICJuYW1lcyI6IFsiZnMiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicGF0aCIsICJmcyJdCn0K
