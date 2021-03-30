/*
 * File: index.js
 * Description: package 入口
 * Created: 2021-3-9 10:15:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import { Rules } from './rules'

module.exports = {
  processors: {
    '.md': {
      preprocess: function(text) {
        return [text]
      },
      postprocess: function(messages) {
        return messages.flat()
      },
      supportsAutofix: true
    }
  },
  rules: Rules,
  configs: {
    // 提供默认配置
    recommend: {
      plugins: ['@lint-md'],
      overrides: [
        {
          files: ['*.md'],
          parser: './parser',
          rules: {
            '@lint-md/no-empty-blockquote': ['error'],
            '@lint-md/no-empty-code-lang': ['error'],
            '@lint-md/no-empty-code': ['error'],
            '@lint-md/no-empty-delete': ['error'],
            '@lint-md/no-empty-inlinecode': ['error'],
            '@lint-md/no-empty-list': ['error'],
            '@lint-md/no-empty-url': ['error'],
            '@lint-md/no-fullwidth-number': ['error'],
            '@lint-md/no-multiple-space-blockquote': ['error'],
            '@lint-md/no-space-in-emphasis': ['error'],
            '@lint-md/no-space-in-inlinecode': ['error'],
            '@lint-md/no-space-in-link': ['error'],
            '@lint-md/no-special-characters': ['error'],
            '@lint-md/no-trailing-punctuation': ['error'],
            '@lint-md/space-round-alphabet': ['error'],
            '@lint-md/space-round-number': ['error'],
            '@lint-md/use-standard-ellipsis': ['error'],
            '@lint-md/no-long-code': ['error', {
              'length': 100,
              'exclude': []
            }]
          }
        }
      ]
    }
  }
}
