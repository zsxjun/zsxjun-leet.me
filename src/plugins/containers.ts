import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'
import { nanoid } from 'nanoid'
import { extractTitle } from './preWrapper'

interface Options {
  codeCopyButtonTitle: string
  hasSingleTheme: boolean
}

export function containerPlugin(md: MarkdownIt, options: Options, containerOptions?: ContainerOptions) {
  md.use(...createContainer('tip', containerOptions?.tipLabel || 'TIP', md))
    .use(...createContainer('warning', containerOptions?.warningLabel || 'WARNING', md))
    .use(...createContainer('danger', containerOptions?.dangerLabel || 'DANGER', md))
    .use(...createContainer('info', containerOptions?.infoLabel || 'INFO', md))
    .use(...createContainer('details', containerOptions?.detailsLabel || 'Details', md))
    .use(...createCodeGroup())
    .use(...createCodeDemo(md))
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

/**
 *
 * @param klass - container类型
 * @param defaultTitle - container标题
 * @param md - markdown-it实例
 */
function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt,
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx, _options, env: { references?: any }) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        const attrs = md.renderer.renderAttrs(token)
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle, {
            references: env.references,
          })
          if (klass === 'details')
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>\n`
          return `<div class="${klass} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`
        }
        else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      },
    },
  ]
}

/**
 * 利用input的radio的checked来实现code-group的切换
 */
function createCodeGroup(): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5)
          let tabs = ''
          let checked = 'checked'

          for (
            let i = idx + 1;
            !(
              tokens[i].nesting === -1
              && tokens[i].type === 'container_code-group_close'
            );
            i++
          ) {
            // 兼容在md中直接使用 <pre><code></code></pre> 编写代码块，并包含属性data-title=""
            const isHtml = tokens[i].type === 'html_block'

            if ((tokens[i].type === 'fence' && tokens[i].tag === 'code') || isHtml) {
              // 用于提取代码块的属性，比如```js {}或```js []等
              const title = extractTitle(isHtml ? tokens[i].content : tokens[i].info, isHtml)

              if (title) {
                const id = nanoid(7)
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`

                if (checked && !isHtml)
                  tokens[i].info += ' active'
                checked = ''
              }
            }
          }

          return `<div class="code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></div>\n`
      },
    },
  ]
}

function createCodeDemo(md: MarkdownIt): ContainerArgs {
  return [
    container,
    'demo',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const contentToken = tokens[idx + 1]
          const content = contentToken.content ?? ''
          // let source = ''
          // console.log(tokens)

          // if (contentToken.type === 'inline') {
          //   source = fs.readFileSync(
          //     path.resolve(__dirname, `../example/${content}.vue`),
          //     'utf-8',
          //   )
          //   // console.log(source)
          //   if (!source)
          //     throw new Error('Incorrect source File')
          // }

          // encodeURIComponent 防止特殊符号导致渲染失败
          return `<Demo source="${encodeURIComponent(
              md.render(`\`\`\` vue\n${content}\`\`\``),
            )}" raw-source="${encodeURIComponent(
              content,
            )}">`
        }
        else {
          return '</Demo>'
        }
      },
    },
  ]
}

export interface ContainerOptions {
  infoLabel?: string
  tipLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
}
