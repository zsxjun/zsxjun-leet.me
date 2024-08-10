import type { Plugin } from 'vite'

export function MarkdownTransform(): Plugin {
  return {
    name: 'marndown-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md'))
        return

      const examples = transformMarkdown(code)

      if (examples.length === 0)
        return code

      const scriptSetups = [
        `const demos = import.meta.glob([${examples.map(example => `'${example}'`).join(',')}], { eager: true })`,
      ]

      return code + combineScriptSetup(scriptSetups)
    },
  }
}

function combineScriptSetup(codes: string[]) {
  return `\n<script setup>
${codes.join('\n')}
</script>
`
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
