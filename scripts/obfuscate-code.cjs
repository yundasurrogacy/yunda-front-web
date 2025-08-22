// 构建后的代码混淆脚本

const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const glob = require('glob')
const JavaScriptObfuscator = require('javascript-obfuscator')

// 检查环境
const isProd = process.env.NODE_ENV === 'production' || process.env.NUXT_ENV === 'production'

// 混淆配置
const obfuscatorOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  // 只在生产环境启用调试保护
  debugProtection: isProd,
  debugProtectionInterval: isProd ? 2000 : 0,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
}

// 查找所有JS文件
const distDir = path.join(__dirname, '../dist')
console.log('开始混淆JS文件...')

// 递归查找所有.js文件，不包括那些已经带有哈希值的文件（它们通常是第三方库）
const jsFiles = glob.sync(`${distDir}/_nuxt/**/*.js`, {
  ignore: [
    // 排除掉已经包含哈希值的文件（通常是库文件）
    `${distDir}/_nuxt/*-*.js`,
    // 排除manifest文件
    `${distDir}/_nuxt/manifest.*.js`,
  ],
})

let successCount = 0
let errorCount = 0

// 处理每个JS文件
for (const filePath of jsFiles) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8')
    console.log(`正在混淆: ${path.relative(distDir, filePath)}`)
    // 混淆代码
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
      content,
      obfuscatorOptions,
    ).getObfuscatedCode()

    // 写回文件
    fs.writeFileSync(filePath, obfuscatedCode, 'utf8')
    successCount++
  }
  catch (error) {
    console.error(`混淆失败: ${path.relative(distDir, filePath)}`)
    console.error(error)
    errorCount++
  }
}

console.log(`\n混淆完成! 成功: ${successCount} 文件, 失败: ${errorCount} 文件`)
