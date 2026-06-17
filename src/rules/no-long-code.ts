import { lintMarkdown } from '@lint-md/core'

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: false,
    schema: [
      {
        'type': 'object',
        'properties': {
          'length': {
            'type': 'number'
          },
          'exclude': {
            'type': 'array'
          }
        },
        'additionalProperties': false
      }
    ]
  },
  create(context) {
    return {
      MarkdownNode(node) {
        if (node.value) {
          const opt = Array.isArray(context.options) && context.options.length ? context.options[0] : {}
          const ruleConfig = {
            'no-long-code': [1, {
              'length': opt.length,
              'exclude': opt.exclude || []
            }] as [number, Record<string, any>]
          }
          const { lintResult } = lintMarkdown(node.value, ruleConfig)
          const resultErr = lintResult.filter(e => e.name === 'no-long-code')
          for (let err of resultErr) {
            context.report({
              message: err.message,
              loc: {
                start: err.loc.start,
                end: err.loc.end
              }
            })
          }
        }
      }
    }
  }
}
