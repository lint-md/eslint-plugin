/*
 * File: utils.ts
 * Description: 工具函数模块
 * Created: 2021-3-8 21:29:46
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import * as fs from 'fs'
import * as path from 'path'
import { ARGS_RULES } from './constants'


// 模板导出文件头部注释信息输出
export const getTemplateHeaderComment = (rule?: string, time?: string, command = 'npm run sync-rules') => {
  return `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "${command}"
 *
 * Please refer to the lint-md documentation for details about this rule
 *
 * @created: ${time || new Date().toDateString()} ${!rule ? '' : `\n * @rule: ${rule || 'undefined'}`}
 * @see: https://github.com/lint-md/lint-md
 */\n\n`
}

// 获取 lint-md 下的所有 rules
export const getTotalRuleNames = () => {
  const ruleDir = path.dirname(require.resolve('@lint-md/core/lib/lint-rules'))
  const ruleFiles = fs.readdirSync(ruleDir)
  return ruleFiles
    .filter(res => (res !== 'index.js' && res.endsWith('.js')))
    .map(data => data.slice(0, -3))
    .filter(data => ARGS_RULES.indexOf(data) < 0)
}
