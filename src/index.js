/*
 * File: index.js
 * Description: package 入口
 * Created: 2021-3-9 10:15:17
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

const rules = require('./rules/index')
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
  rules: rules
}