import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    rules: {
      // Allow trailing space in comments, for possible JSDoc formattings
      'style/no-trailing-spaces': ['error', { ignoreComments: true }],
      // Relaxes inline statements a bit
      'style/max-statements-per-line': ['error', { max: 2 }],
      // 将UnoCSS类顺序规则改为警告
      'unocss/order': 'warn',
      // 将花括号格式规则改为警告
      'style/brace-style': 'warn',
      // 将未使用变量规则改为警告
      'unused-imports/no-unused-vars': 'warn',
      // 将console语句规则改为警告
      'no-console': 'warn',
    },
  },
  // Allow trailing space for markdown formatting
  {
    files: ['**/*.md'],
    rules: {
      'style/no-trailing-spaces': 'off',
    },
  },
))
