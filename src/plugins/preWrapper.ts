import type MarkdownIt from 'markdown-it'
import { extractLang } from './containers'

export interface Options {
  codeCopyButtonTitle: string
  hasSingleTheme: boolean
}

export function preWrapperPlugin(md: MarkdownIt) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]

    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')

    // eslint-disable-next-line regexp/no-unused-capturing-group
    const active = / active( |$)/.test(token.info) ? ' active' : ''
    token.info = token.info.replace(/ active$/, '').replace(/ active /, ' ')

    const lang = extractLang(token.info)

    return (
      `<div class="language-${lang}${active}">${
      fence(...args)
      }</div>`
    )
  }
}
