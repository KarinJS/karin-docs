---
title: common
createTime: 2025/05/15 00:12:24
permalink: /guide/atu408ly/
---

# common 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

common 模块提供了各种常用工具函数，这些函数在框架各个部分被广泛使用。该模块汇集了文件操作、网络请求、图像处理等多种功能。

## 导出的子模块

common 模块再导出了多个其他模块的功能:

```typescript
// 从其他模块导出
export * from './number'
export { sleep } from './sleep'
export { uptime } from './uptime'
export { downFile, absPath } from '@/utils/fs/file'
export { mkdirSync as mkdir } from '@/utils/fs/fsSync'
export { base64, buffer, stream } from '@/utils/fs/data'
export { getRelPath, urlToPath, splitPath } from '@/utils/fs/path'
export { isDir, existToMkdir as exists } from '@/utils/fs/fsPromises'
export { read as readYaml, write as writeYaml } from '@/utils/fs/yaml'
export { readJsonSync as readJson, writeJsonSync as writeJson } from '@/utils/fs/json'
export { pkgRoot as pkgroot, getPluginInfo as pkgJson, isPlugin } from '@/utils/fs/pkg'
export { karinToQQBot as buttonToQQBot, karinToQQBot, qqbotToKarin } from '@/utils/button/convert'
export { createRawMessage, createRawMessage as makeMessageLog, makeMessage, makeForward } from '@/utils/message/message'
```

## 使用方式

common 模块只能通过命名空间对象方式使用，不支持直接导入单个函数。

### 使用命名空间

通过导入 common 命名空间来访问所有函数：

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

// 通过命名空间访问函数
const response = await common.axios('https://example.com', 'get')
const timeDiff = common.formatTime(1620000000)
```

## 网络请求

### axios

对 Axios 进行简单封装，优化错误处理和超时处理。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

/**
 * 简化的Axios请求
 * @param paramOrUrl 请求参数对象或URL字符串
 * @param type 请求类型(get/post)，当第一个参数为URL时使用
 * @param param 额外的请求参数，当第一个参数为URL时使用
 * @returns 请求响应，失败时返回null，401时返回undefined
 */
// 方式1: 使用配置对象
const response = await common.axios({
  url: 'https://example.com',
  method: 'get',
})

// 方式2: 使用URL+方法
const postResponse = await common.axios('https://example.com/api', 'post', { data: { key: 'value' } })
```

## 时间处理

### formatTime

计算两个时间戳之间的时间差，并格式化为人类可读的字符串。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

/**
 * 格式化时间差
 * @param time 开始时间戳
 * @param time2 结束时间戳，默认为当前时间
 * @returns 格式化的时间差字符串
 */
// 计算给定时间戳到现在的时间差
const diff = common.formatTime(1620000000) // "18天"
// 计算两个时间戳之间的差值
const diff2 = common.formatTime(1620000000, 1624000000) // "46天"
```

## 图像处理

### mergeImage

将多张图片合并成一张图片。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

/**
 * 将多张图片合并成一张图片
 * @param images 图片数组，支持路径和base64格式
 * @param perRow 每行图片数量，默认为3
 * @returns 返回包含base64、宽度和高度的对象
 */
const result = await common.mergeImage(
  [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    'base64://...', // base64格式的图片
  ],
  2
)

console.log(result.base64) // 合并后图片的base64编码
console.log(result.width) // 合并后图片的宽度
console.log(result.height) // 合并后图片的高度
```

### getAbsPath

将图片路径数组转换为绝对路径数组，并处理 base64 格式的图片。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

/**
 * 将图片数组转为绝对路径数组
 * @param images 图片路径/base64数组
 * @param root 临时目录根路径
 * @returns 绝对路径数组
 */
const paths = common.getAbsPath(['/relative/path/image.jpg', 'base64://...'], '/temp/directory')
```

## 插件相关

> [!note]
> 以下函数已被标记为废弃，建议使用插件系统提供的新 API。

### updateYaml

更新 YAML 文件，支持添加注释。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

/**
 * 更新YAML文件
 * @param filePath 文件路径
 * @param settings 设置项数组
 */
common.updateYaml('/path/to/config.yaml', [
  {
    key: 'server.port',
    val: 3000,
    comment: '服务器端口',
    type: 'top', // 注释位置，top或end
  },
])
```

### getNpmPlugins / getPlugins / getGitPlugins

获取不同类型的插件列表。

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

// 获取NPM插件列表
const npmPlugins = await common.getNpmPlugins(true) // true表示返回详细信息

// 获取所有插件
const allPlugins = await common.getPlugins()

// 获取Git插件
const gitPlugins = await common.getGitPlugins(true) // true表示只返回带package.json的插件
```

## 文件和路径操作

common 模块重新导出了多个文件系统相关的函数，这些函数在各自的模块文档中有详细说明：

- [`downFile`, `absPath`](./fs.md#文件操作模块-file) - 文件下载和路径解析
- [`mkdir`](./fs.md#同步文件检查-fssync) - 创建目录
- [`base64`, `buffer`, `stream`](./fs.md#数据转换模块-data) - 数据转换
- [`getRelPath`, `urlToPath`, `splitPath`](./fs.md#路径处理模块-path) - 路径处理
- [`isDir`, `exists`](./fs.md#异步文件检查-fspromises) - 目录检查
- [`readYaml`, `writeYaml`](./fs.md#yaml文件操作) - YAML 文件操作
- [`readJson`, `writeJson`](./fs.md#json文件操作) - JSON 文件操作
- [`pkgroot`, `pkgJson`, `isPlugin`](./fs.md#包信息模块-pkg) - 包信息处理

## 按钮和消息处理

common 模块同样重新导出了按钮和消息处理相关的函数：

- [`buttonToQQBot`, `karinToQQBot`, `qqbotToKarin`](./button.md) - 按钮格式转换
- [`createRawMessage`, `makeMessageLog`, `makeMessage`, `makeForward`](./message.md) - 消息处理

## 使用示例

```ts twoslash
// @noErrorValidation
import { common } from 'node-karin'

async function processUserData(userId) {
  // 创建用户目录
  const userDir = `/data/users/${userId}`
  await common.mkdir(userDir)

  // 读取用户配置
  const config = (await common.readJson(`${userDir}/config.json`)) || {}

  // 获取用户资料
  const response = await common.axios(`https://api.example.com/users/${userId}`, 'get')
  if (!response) {
    console.log('获取用户资料失败')
    return null
  }

  // 合并用户头像
  if (response.data.avatars && response.data.avatars.length > 1) {
    const mergedAvatar = await common.mergeImage(response.data.avatars)
    response.data.mergedAvatar = mergedAvatar.base64
  }

  // 计算账户年龄
  const accountAge = common.formatTime(response.data.createdAt)
  console.log(`账户创建于 ${accountAge} 前`)

  // 保存更新后的用户数据
  common.writeJson(`${userDir}/data.json`, response.data)

  return response.data
}
```
