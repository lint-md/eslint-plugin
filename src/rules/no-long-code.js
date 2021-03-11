/*
 * File: no-long-code.js
 * Description: no-long-code rules（代码长度限制）
 *
 * 关于 rule 的详细信息，请参考 lint-md 文档
 *
 * Created: 2021-3-9 10:16:05
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */
const { lint, getDescription } = require('lint-md')

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
            'type': 'Array'
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
          // 调用 lint 函数
          const opt = Array.isArray(context.options) && context.options.length ? context.options[0] : {}
          const errors = lint(node.value, {
            // 将第一个参数设为 null 我们可以通过 .eslintrc.js 决定之
            'no-long-code': [
              null, {
                'length': opt.length,
                'exclude': opt.exclude || []
              }
            ]
          })
          const resultErr = errors.filter(e => e.type === 'no-long-code')
          for (let err of resultErr) {
            const describe = getDescription(err.type)
            context.report({
              message: describe.message,
              loc: {
                start: err.start,
                end: err.end
              }
            })
          }
        }
      }
    }
  }
}
