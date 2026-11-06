/*
 * File: utils.ts
 * Description: 工具函数模块
 */

import * as core from '@lint-md/core'
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
 * @created: ${time || new Date().toDateString()}${rule ? `\n * @rule: ${rule}` : ''}
 * @see: https://github.com/lint-md/lint-md
 */\n\n`
}

// Read rule names from Core exports. Its rules directory also contains support files.
export const getTotalRuleNames = () => {
  return Object.values(core)
    .filter((rule: any) => rule?.meta?.name)
    .map((rule: any) => rule.meta.name)
    .filter(data => ARGS_RULES.indexOf(data) < 0)
}
