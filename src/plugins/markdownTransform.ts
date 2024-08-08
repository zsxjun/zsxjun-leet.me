import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'marndown-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md'))
        return

      const examples = transformMarkdown(code)

      const scriptSetups = [
          `const demos = import.meta.glob([${examples.map(example => `'${example}'`).join(',')}], { eager: true })`,
      ]

      return combineMarkdown(
        code,
        [combineScriptSetup(scriptSetups)],
      )
    },
  }
}

function combineScriptSetup(codes: string[]) {
  return `\n<script setup>
${codes.join('\n')}
</script>
`
}

function combineMarkdown(code: string, headers: string[]) {
  const frontmatterEnds = code.indexOf('---\r\n\r\n')
  const sliceIndex = frontmatterEnds < 0 ? 0 : frontmatterEnds + 4

  code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)

  return code
}

// eslint-disable-next-line regexp/no-super-linear-backtracking
const demoContainerRE = /::: demo\s*([\s\S]*?)\s*:::/g

function transformMarkdown(code: string) {
  const matches = code.matchAll(demoContainerRE)
  const demos = []

  for (const match of matches) {
    const sourceFile = match[1].trim()
    demos.push(`../../src${sourceFile}.vue`)
  }

  return demos
}
