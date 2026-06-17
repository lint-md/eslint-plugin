import { lintMarkdown } from '@lint-md/core'

// 该 rule 是否可以 fix，供模板替换
// @ts-ignore
// eslint-disable-next-line no-undef
const FIXABLE = $FIXABLE$

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: FIXABLE
  },
  create(context) {
    // 获取 fixer
    const getFixer = (node) => {
      return FIXABLE ? {
        fix: (fixer) => {
          const { fixedResult } = lintMarkdown(node.value)
          return fixer.replaceTextRange(
            [0, node.value.length - 1],
            fixedResult.result
          )
        }
      } : {}
    }

    return {
      MarkdownNode(node) {
        if (node.value) {
          const { lintResult } = lintMarkdown(node.value)
          const resultErr = lintResult.filter(e => e.name === '$MD_LINT_RULE_NAME$')
          for (let err of resultErr) {
            context.report({
              message: err.message,
              loc: {
                start: err.loc.start,
                end: err.loc.end
              },
              ...getFixer(node)
            })
          }
        }
      }
    }
  }
}
