import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'marndown-transform',
    enforce: 'pre',
    transform() {
      // if (!id.endsWith('.md'))
      //   return

      // const componentId = path.basename(id, '.md')
      // const append: Append = {
      //   headers: [],
      //   footers: [],
      //   scriptSetups: [
      //     `const demos = import.meta.glob('../example/${componentId}/*.vue', { eager: true })`,
      //   ],
      // }

      // if (id.endsWith('.md')) {
      //   console.log(code)
      // }

      // console.log(path.basename(id, '.md'))
    },
  }
}
