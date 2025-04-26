---
title: common
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/common/
---
# common 常用工具函数文档完善

`common` 模块提供了一系列实用工具函数，用于简化常见操作如网络请求、文件处理、路径管理等。

## 导入模块

```js twoslash
import { common, segment } from 'node-karin'
import fs from 'node:fs'
```

## 网络请求

### axios

对 axios 进行简单封装，支持 GET、POST 等请求方法和自定义配置。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 对axios进行简单封装 */
await common.axios('https://www.baidu.com', 'get', {
  headers: { Accept: 'application/json' }
})
```

## 时间处理

### sleep

提供异步休眠功能，暂停代码执行指定的毫秒数。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 休眠函数 延迟5秒 */
await common.sleep(5 * 1000)
```

### formatTime

将时间戳格式化为可读的时间字符串。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 格式化时间戳为可读时间
const formattedTime = common.formatTime(1728855116)
console.log(formattedTime) // 输出格式化后的时间字符串
```

### uptime

获取系统运行时间。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取系统运行时间
const uptimeInfo = common.uptime()
console.log(uptimeInfo) // 输出系统运行时间信息
```

## 文件操作

### downFile

下载远程文件到本地指定路径。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 下载文件 参数1为下载地址，参数2为保存到本地的路径 */
await common.downFile('https://example.com/1.jpg', './temp/test/1.jpg')
```

### mkdir

递归创建文件夹，确保目录结构存在。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 递归创建文件夹 */
common.mkdir('./temp/test')
```

### exists

检查文件或目录是否存在。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 检查文件是否存在
const fileExists = common.exists('./temp/test/1.jpg')
console.log(fileExists) // 输出: true 或 false
```

### isDir

检查指定路径是否为目录。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 检查是否为目录
const isDirectory = common.isDir('./temp/test')
console.log(isDirectory) // 输出: true 或 false
```

### readDir

读取目录内容，可选择性地按文件扩展名过滤。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 读取目录中的 .js 和 .ts 文件
const files = common.readDir('./plugins', ['.js', '.ts'])
console.log(files) // 输出符合条件的文件列表
```

## 路径处理

### absPath

获取绝对路径，支持 file:// 前缀。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 获取绝对路径，支持file://前缀 */
const absolutePath = common.absPath('file://./temp/test')
console.log(absolutePath)
// 输出：/home/karin/temp/test (在 Linux 系统上)
// 输出：C:\Users\username\temp\test (在 Windows 系统上)
```

### getRelPath

获取相对路径。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取相对路径
const relativePath = common.getRelPath('./temp/test/1.jpg')
console.log(relativePath) // 输出相对于当前工作目录的路径
```

### splitPath

分割路径为目录和文件名部分。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 分割路径
const pathParts = common.splitPath('../test/1.jpg')
console.log(pathParts) // 输出: { dir: '../test', base: '1.jpg' }
```

### urlToPath

将 URL 转换为文件路径，常用于处理 import.meta.url。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 将 URL 转换为路径
// @annotate: 在 plugins/karin-plugin-example/index.ts 中使用将返回 '../../'
const path = common.urlToPath(import.meta.url)
console.log(path) // 输出相对路径
```

## 数据转换

### base64

将文件转换为不带前缀的 base64 字符串。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 将文件转换为不带前缀的base64字符串 */
const base64String = await common.base64('./temp/test/1.jpg')
console.log(base64String.substring(0, 20)) // 输出：'/9j/4AAQSkZJRgABAQEAYABgAADg...'
```

### stream

将数据流对象转换为 Buffer 对象。

```js twoslash
import { common } from 'node-karin'
import fs from 'node:fs'
// ---cut-before---
/** 将数据流对象转换为Buffer对象 */
const buffer = await common.stream(fs.createReadStream('./temp/test/1.jpg'))
console.log(buffer instanceof Buffer) // 输出：true
```

### buffer

将多种格式的数据转换为 Buffer 对象，支持 file://、base64:// 前缀和可读流。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
/** 将文件转换为Buffer对象 支持file:// base64:// 可读流等... */
const base64 = 'base64://9j/4AAQSkZJRgABAQEAYABgAADg...'
const buffer = await common.buffer(base64)
console.log(buffer instanceof Buffer) // 输出：true
```

## 配置文件处理

### readYaml

读取 YAML 文件内容。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 读取 YAML 文件
const yamlContent = common.readYaml('./temp/test/1.yaml')
console.log(yamlContent) // 输出解析后的 YAML 内容
```

### writeYaml

将数据写入 YAML 文件。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 写入 YAML 文件
common.writeYaml('./temp/test/1.yaml', { a: 1 })
```

### updateYaml

更新 YAML 文件中的特定字段，可添加注释。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 更新 YAML 文件中的字段
common.updateYaml('./temp/test/1.yaml', [
  { key: 'service', val: true, comment: '是否开启服务' }
])
```

### writeJson

将数据写入 JSON 文件。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 写入 JSON 文件
common.writeJson('./temp/test/1.json', { a: 1 })
```

## 消息处理

### makeMessage

创建简单的文本消息。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 创建文本消息
const message = common.makeMessage('hello world')
console.log(message) // 输出: [{ type: 'text', text: 'hello world' }]
```

### makeMessageLog

将消息元素数组转换为可读的日志格式。

```js twoslash
import { common, segment } from 'node-karin'
// ---cut-before---
// 将消息元素转换为日志格式
const logMessage = common.makeMessageLog([
  segment.at('1919810'),
  segment.text('114514')
])
console.log(logMessage) // 输出格式化后的消息日志
```

### makeForward

创建合并转发消息。

```js twoslash
import { common, segment } from 'node-karin'
// ---cut-before---
// 创建合并转发消息
const forwardMessage = common.makeForward(
  [segment.at('114514')], // 消息内容
  '1919810', // 发送者 ID
  'hello world' // 消息文本
)
console.log(forwardMessage) // 输出合并转发消息结构
```

## 插件管理

### getPlugins

获取所有插件列表。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取所有插件
const allPlugins = common.getPlugins()
console.log(allPlugins) // 输出所有插件列表
```

### getGitPlugins

获取 Git 插件列表。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取 Git 插件
const gitPlugins = common.getGitPlugins()
console.log(gitPlugins) // 输出 Git 插件列表
```

### getNpmPlugins

获取 NPM 插件列表，可选择是否强制刷新。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取 NPM 插件，并强制刷新
const npmPlugins = await common.getNpmPlugins(true)
console.log(npmPlugins) // 输出 NPM 插件列表
```

### isPlugin

检查指定路径是否为有效的插件。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 检查是否为有效插件
const isValidPlugin = common.isPlugin('./plugins/karin-plugin-xxxxxx')
console.log(isValidPlugin) // 输出: true 或 false
```

### pkgJson

获取指定包的 package.json 内容。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取包的 package.json
const packageInfo = common.pkgJson('karin-plugin-xxxxxx')
console.log(packageInfo) // 输出包的 package.json 内容
```

### pkgroot

获取指定包的根目录路径。

```js twoslash
import { common } from 'node-karin'
// ---cut-before---
// 获取包的根目录
const rootPath = common.pkgroot('log4js')
console.log(rootPath) // 输出包的根目录路径
```
