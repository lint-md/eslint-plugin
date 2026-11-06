const { test } = require('node:test')
const assert = require('node:assert/strict')
const { Linter } = require('eslint')
const plugin = require('../lib')
const parser = require('../lib/parser')

function runFix(input, rules) {
  const linter = new Linter()
  const config = makeConfig(rules)
  return linter.verifyAndFix(input, config, { filename: 'example.md' })
}

function makeConfig(rules) {
  return [{
    files: ['**/*.md'],
    languageOptions: { parser },
    plugins: { '@lint-md': plugin },
    rules: Object.fromEntries(
      Object.entries(rules).map(([name, setting]) => [`@lint-md/${name}`, setting])
    )
  }]
}

test('fix replaces the full document, including its final character', () => {
  for (const [input, expected] of [
    ['你好......终', '你好……终'],
    ['你好......', '你好……'],
    ['你好......尾\n', '你好……尾\n']
  ]) {
    const result = runFix(input, { 'use-standard-ellipsis': 'error' })
    assert.equal(result.output, expected)
    assert.equal(result.fixed, true)
    assert.deepEqual(result.messages, [])
  }
})

test('one enabled rule only changes its own content', () => {
  const input = '# 标题。\n\n你好......尾'
  const result = runFix(input, { 'use-standard-ellipsis': 'error' })
  assert.equal(result.output, '# 标题。\n\n你好……尾')
  assert.deepEqual(result.messages, [])
})

test('enabled rules apply together and converge on the second run', () => {
  const input = '# 标题。\n\n你好......尾'
  const rules = {
    'correct-title-trailing-punctuation': 'error',
    'use-standard-ellipsis': 'error'
  }
  const first = runFix(input, rules)
  assert.equal(first.output, '# 标题\n\n你好……尾')
  assert.equal(first.fixed, true)
  assert.deepEqual(first.messages, [])

  const second = runFix(first.output, rules)
  assert.equal(second.output, first.output)
  assert.equal(second.fixed, false)
  assert.deepEqual(second.messages, [])
})

test('one rule keeps separate fixes on both sides of another rule', () => {
  const input = '# 开头。\n\n你好......尾\n\n# 结尾。'
  const rules = {
    'correct-title-trailing-punctuation': 'error',
    'use-standard-ellipsis': 'error'
  }
  const messages = new Linter().verify(input, makeConfig(rules), { filename: 'example.md' })
  const titleFixes = messages
    .filter(message => message.ruleId === '@lint-md/correct-title-trailing-punctuation')
    .map(message => message.fix.range)
  assert.equal(titleFixes.length, 2)
  assert.ok(titleFixes[0][1] < input.indexOf('......'))
  assert.ok(titleFixes[1][0] > input.indexOf('......'))

  const result = runFix(input, rules)
  assert.equal(result.output, '# 开头\n\n你好……尾\n\n# 结尾')
  assert.deepEqual(result.messages, [])
})

for (const [name, input, expected] of [
  ['no-space-in-inline-code', '` hello `', '`hello`'],
  ['no-space-in-link', '[ hello ](https://example.com)', '[hello](https://example.com)']
]) {
  test(`${name} reports one problem for two text edits`, () => {
    const rules = { [name]: 'error' }
    const messages = new Linter().verify(input, makeConfig(rules), { filename: 'example.md' })
    assert.equal(messages.length, 1)
    assert.equal(messages[0].ruleId, `@lint-md/${name}`)

    const first = runFix(input, rules)
    assert.equal(first.output, expected)
    assert.deepEqual(first.messages, [])

    const second = runFix(first.output, rules)
    assert.equal(second.output, expected)
    assert.equal(second.fixed, false)
  })
}

test('more than ten rules fix separate locations within the ESLint pass limit', () => {
  const input = [
    '# 标题。',
    '> ',
    '>    内容',
    '- ',
    '```',
    'const x = 1',
    '```',
    '```js',
    '   ',
    '```',
    '这里有空格代码 ` text ` 。',
    '[链接]( )',
    '[ 链接 ](https://example.com)',
    '全角１２３数字',
    '特殊\u200a字符',
    '中文abc结尾',
    '中文123结尾',
    '等等......结束'
  ].join('\n\n')
  const names = [
    'correct-title-trailing-punctuation',
    'no-empty-blockquote',
    'no-multiple-space-blockquote',
    'no-empty-list',
    'no-empty-code-lang',
    'no-empty-code',
    'no-space-in-inline-code',
    'no-empty-url',
    'no-space-in-link',
    'no-full-width-number',
    'no-special-characters',
    'space-around-alphabet',
    'space-around-number',
    'use-standard-ellipsis'
  ]
  const rules = Object.fromEntries(names.map(name => [name, 'error']))
  const initialMessages = new Linter().verify(input, makeConfig(rules), { filename: 'example.md' })
  assert.ok(new Set(initialMessages.map(message => message.ruleId)).size > 10)

  const first = runFix(input, rules)
  assert.equal(first.fixed, true)
  assert.deepEqual(first.messages, [])

  const second = runFix(first.output, rules)
  assert.equal(second.output, first.output)
  assert.equal(second.fixed, false)
  assert.deepEqual(second.messages, [])
})

test('no-long-code reports without changing the document', () => {
  const input = '```js\nconst value = 123456789\n```\n'
  const result = runFix(input, { 'no-long-code': ['error', { length: 10 }] })
  assert.equal(result.output, input)
  assert.equal(result.fixed, false)
  assert.ok(result.messages.some(message => message.ruleId === '@lint-md/no-long-code'))
})
