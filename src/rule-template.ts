import * as core from '@lint-md/core'
import { diffChars } from 'diff'

// 该 rule 是否可以 fix，供模板替换
// @ts-ignore
// eslint-disable-next-line no-undef
const FIXABLE = $FIXABLE$
const RULE_NAME = '$MD_LINT_RULE_NAME$'

// Core enables every rule by default. Disable all rules except this ESLint rule.
const ruleConfig = Object.fromEntries(
  Object.values(core)
    .filter((rule: any) => rule?.meta?.name)
    .map((rule: any) => [rule.meta.name, 0])
)
ruleConfig[RULE_NAME] = 2

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: FIXABLE
  },
  create(context) {
    const getFixes = (node) => {
      const { fixedResult } = core.lintMarkdown(node.value, ruleConfig, true)
      if (fixedResult.result === node.value) return []

      const fixes = []
      let offset = 0
      let start = -1
      let replacement = ''
      const addFix = () => {
        if (start < 0) return
        fixes.push({ range: [start, offset], text: replacement })
        start = -1
        replacement = ''
      }

      for (const part of diffChars(node.value, fixedResult.result)) {
        if (!part.added && !part.removed) {
          addFix()
          offset += part.value.length
          continue
        }
        if (start < 0) start = offset
        if (part.removed) offset += part.value.length
        if (part.added) replacement += part.value
      }
      addFix()
      return fixes
    }

    return {
      MarkdownNode(node) {
        if (node.value) {
          const { lintResult } = core.lintMarkdown(node.value, ruleConfig, false)
          const resultErr = lintResult.filter(e => e.name === RULE_NAME)
          const fixes = FIXABLE && resultErr.length ? getFixes(node) : []
          // ESLint merges fix arrays from one report. Apply remaining edits in later passes.
          resultErr.forEach((err, index) => {
            const fix = fixes[index]
            context.report({
              message: err.message,
              loc: {
                start: err.loc.start,
                end: err.loc.end
              },
              ...(fix ? { fix: fixer => fixer.replaceTextRange(fix.range, fix.text) } : {})
            })
          })
        }
      }
    }
  }
}
