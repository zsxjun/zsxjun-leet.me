import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'

interface Options {
  codeCopyButtonTitle: string
  hasSingleTheme: boolean
}

export function containerPlugin(md: MarkdownIt, options: Options, containerOptions?: ContainerOptions) {
  md.use(...createContainer('tip', containerOptions?.tipLabel || 'Tip', md))
    .use(...createContainer('warning', containerOptions?.warningLabel || 'Warning', md))
    .use(...createContainer('danger', containerOptions?.dangerLabel || 'Danger', md))
    .use(...createContainer('info', containerOptions?.infoLabel || 'Info', md))
    .use(...createContainer('details', containerOptions?.detailsLabel || 'Details', md))
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

export interface ContainerOptions {
  infoLabel?: string
  noteLabel?: string
  tipLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
  importantLabel?: string
  cautionLabel?: string
}
