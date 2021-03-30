/*
 * File: rule-generator.js
 * Description: rules 生成器
 *
 * 对于一些无参 rules(几乎所有)
 * 我们直接基于 lint-md 生成相应的模板，
 * 这样无需再去花费大量时间单独写 rules
 *
 * Created: 2021-3-9 10:14:11
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import * as path from 'path'
import * as fs from 'fs'
import { getTemplateHeaderComment, getTotalRuleNames } from './utils'
import { NOT_SUPPORTED_FIX } from './constants'


// paths
const templatePath = path.resolve(__dirname, './rule-template.js')
const eslintRuleDir = path.resolve(__dirname, './rules/no-args-rules')

// 生成 eslint rules 文件
const generateRuleCode = () => {
  const template = fs.readFileSync(templatePath)
  const rules = getTotalRuleNames()
  let data = `exports.Rules = {\n  'no-long-code': require('./no-long-code'),\n`
  // 生成 rules && index.js

  rules.forEach(name => {
    const comment = getTemplateHeaderComment(name)

    const result = template.toString()
      .replace(/\$MD_LINT_RULE_NAME\$/g, name)
      // @ts-ignore
      .replace(/\$FIXABLE\$/g, NOT_SUPPORTED_FIX.indexOf(name) >= 0 ? false : '"code"')

    if (!fs.existsSync(path.resolve(eslintRuleDir))) {
      fs.mkdirSync(path.resolve(eslintRuleDir))
    }

    fs.writeFileSync(path.resolve(eslintRuleDir, `${name}.js`), `${comment}${result}`)
    data += `  '${name}': require('./no-args-rules/${name}'),\n`
  })
  data += '}'

  fs.writeFileSync(path.resolve(path.resolve(eslintRuleDir, '../'), 'index.js'), `${getTemplateHeaderComment()}${data}`)
}

generateRuleCode()

