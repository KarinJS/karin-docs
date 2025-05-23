---
title: fs
createTime: 2025/05/15 00:12:24
permalink: /guide/cdxrb7gu/
---

# fs 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

fs 模块是 node-karin 的文件系统工具集合，提供了一系列便捷的文件操作函数，包括文件读写、路径处理、数据转换等功能。

## 命名空间使用

fs 模块可以作为命名空间整体导入，也可以直接导入其中的函数：

```ts twoslash
// @noErrorValidation
// 作为命名空间使用
import { fs } from 'node-karin'
fs.file.downFile('https://example.com/image.png', '/path/to/save.png')

// 直接导入函数
import { downFile, readJson, existsSync } from 'node-karin'
downFile('https://example.com/image.png', '/path/to/save.png')
```

fs 模块下的许多子模块也可以作为命名空间使用：

```ts twoslash
// @noErrorValidation
// 使用json命名空间
import { json } from 'node-karin'
const config = await json.read('/path/to/config.json')
await json.write('/path/to/config.json', { updated: true })

// 使用yaml命名空间
import { yaml } from 'node-karin'
const data = yaml.read('/path/to/config.yaml')
yaml.write('/path/to/config.yaml', { server: { port: 8080 } })

// 使用changelog命名空间
import { changelog } from 'node-karin'
const logs = changelog.log('1.0.0', changelogContent)
```

## 文件操作模块 (file)

file 模块提供了文件下载、复制和递归目录操作等功能。

### 文件下载

```ts twoslash
// @noErrorValidation
import { downFile, downloadFile } from 'node-karin'

/**
 * 下载文件
 * @param fileUrl 下载地址
 * @param savePath 保存路径
 * @param param axios参数
 * @returns 布尔值，表示是否下载成功
 */
const success = await downFile('https://example.com/image.png', '/path/to/save.png')

/**
 * 下载文件(高级版)
 * @param fileUrl 下载地址
 * @param savePath 保存路径
 * @param options 选项，可包含axios参数和returnBoolean选项
 * @returns 根据returnBoolean返回布尔值或对象
 */
// 返回布尔值
const success = await downloadFile('https://example.com/image.png', '/path/to/save.png', { returnBoolean: true })

// 返回对象
const result = await downloadFile('https://example.com/image.png', '/path/to/save.png')
if (result.success) {
  console.log('下载成功:', result.data)
}
```

### 路径处理

```ts twoslash
// @noErrorValidation
import { absPath } from 'node-karin'

/**
 * 标准化文件路径
 * @param file 路径
 * @param absPath 返回绝对路径，默认为true
 * @param prefix 添加file://前缀，默认为false
 * @returns 标准化后的路径
 */
// 转换为绝对路径，使用/作为分隔符
const normalizedPath = absPath('./relative/path') // '/absolute/path/relative/path'

// 添加file://前缀
const uriPath = absPath('./relative/path', true, true) // 'file:///absolute/path/relative/path'
```

### 插件目录创建

```ts twoslash
// @noErrorValidation
import { createPluginDir } from 'node-karin'

/**
 * 为插件创建基本文件夹结构
 * @param name 插件名称
 * @param files 需要创建的文件夹列表，默认为['config', 'data', 'resources']
 */
await createPluginDir('my-plugin') // 创建默认目录结构
await createPluginDir('my-plugin', ['config', 'data', 'logs', 'temp']) // 创建自定义目录结构
```

### 文件列表获取

```ts twoslash
// @noErrorValidation
import { getFiles } from 'node-karin'

/**
 * 获取符合后缀的文件列表
 * @param filePath 文件路径
 * @param suffixs 需要筛选的文件后缀数组，可带点
 * @returns 符合条件的文件名数组
 */
// 获取目录下所有文件
const allFiles = getFiles('/path/to/dir')

// 获取目录下所有JSON和YAML文件
const configFiles = getFiles('/path/to/dir', ['.json', '.yaml'])
```

### 配置文件复制

```ts twoslash
// @noErrorValidation
import { copyConfig, copyConfigSync } from 'node-karin'

/**
 * 创建配置文件
 * @param defaulPath 模板配置文件路径
 * @param userPath 目标文件夹路径
 * @param suffixs 需要复制的文件后缀数组
 * @param isThrow 是否抛出异常
 * @returns 是否复制成功
 */
// 异步复制
await copyConfig('template/config', 'user/config')
await copyConfig('template/config', 'user/config', ['.json', '.yaml'])

// 同步复制
copyConfigSync('template/config', 'user/config')
```

### 递归文件获取

```ts twoslash
// @noErrorValidation
import { getAllFiles, getAllFilesSync } from 'node-karin'

/**
 * 递归获取目录下的所有文件
 * @param dir 目录路径
 * @param options 选项对象
 * @returns 符合条件的文件路径数组
 */
// 同步版本
const files = getAllFilesSync('src', {
  suffixs: ['.ts', '.js'], // 只获取.ts和.js文件
  returnType: 'abs', // 返回绝对路径
})

// 异步版本
const files2 = await getAllFiles('src', {
  exclude: ['.d.ts'], // 排除.d.ts文件
  returnType: 'rel', // 返回相对路径
})
```

## 路径处理模块 (path)

path 模块提供了路径处理和比较相关的工具函数。

### 按后缀筛选文件

```ts twoslash
// @noErrorValidation
import { filesByExt } from 'node-karin'

/**
 * 根据文件后缀名筛选文件
 * @param filePath 路径
 * @param ext 后缀名或后缀名数组
 * @param returnType 返回类型：'name'(文件名)、'rel'(相对路径)、'abs'(绝对路径)
 * @returns 符合条件的文件路径数组
 */
// 获取目录下所有.js文件名
const jsFiles = filesByExt('./src', '.js') // ['index.js', 'utils.js']

// 获取目录下所有.js和.ts文件的绝对路径
const scriptFiles = filesByExt('./src', ['.js', '.ts'], 'abs')
```

### 路径分割

```ts twoslash
// @noErrorValidation
import { splitPath } from 'node-karin'

/**
 * 分割路径为文件夹路径和文件名
 * @param filePath 路径
 * @returns 包含dirname和basename的对象
 */
const { dirname, basename } = splitPath('/path/to/file.txt')
// dirname: '/path/to'
// basename: 'file.txt'
```

### 相对路径处理

```ts twoslash
// @noErrorValidation
import { getRelPath, urlToPath } from 'node-karin'

/**
 * 去掉相对路径的前缀和后缀
 * @param filePath 相对路径
 * @returns 处理后的路径
 */
const cleanPath = getRelPath('./plugins/my-plugin/index.js')
// 'plugins/my-plugin/index.js'

/**
 * 根据import.meta.url计算相对于项目根目录的路径
 * @param url import.meta.url
 * @returns 相对路径层级，用'../'表示
 */
// 在plugins/my-plugin/src/index.ts中使用
const rootPath = urlToPath(import.meta.url) // '../../../'
```

### 路径比较和检查

```ts twoslash
// @noErrorValidation
import { isSubPath, isPathEqual, formatPath } from 'node-karin'

/**
 * 检查目标路径是否处于根路径下
 * @param root 根路径
 * @param target 目标路径
 * @param isAbs 是否将传入的路径转为绝对路径
 * @returns 布尔值
 */
const isInDir = isSubPath('/root/dir', '/root/dir/subdir') // true

/**
 * 比较两个路径是否相同
 * @param path1 第一个路径
 * @param path2 第二个路径
 * @returns 布尔值
 */
const isSame = isPathEqual('C:\\Users\\admin', 'C:/Users/admin') // true

/**
 * 将路径统一格式化为绝对路径，使用/分隔符
 * @param filePath 路径
 * @returns 格式化后的路径
 */
const formattedPath = formatPath('./relative/path') // '/absolute/path/relative/path'
```

## 数据转换模块 (data)

data 模块提供了各种数据格式转换和处理函数。

### Base64 转换

```ts twoslash
// @noErrorValidation
import { base64 } from 'node-karin'

/**
 * 将数据转换为不带前缀的base64字符串
 * @param data 文件路径、Buffer、可读流、HTTP地址或base64://字符串
 * @param options 选项
 * @returns base64字符串
 */
// 文件转Base64
const fileBase64 = await base64('/path/to/file.png')

// URL转Base64
const urlBase64 = await base64('https://example.com/image.png')

// 已有Base64处理
const cleanBase64 = await base64('base64://aGVsbG8=') // 'aGVsbG8='
```

### Buffer 转换

```ts twoslash
// @noErrorValidation
import { buffer, stream } from 'node-karin'

/**
 * 将数据转换为Buffer对象
 * @param data 文件路径、Buffer、可读流、HTTP地址或base64://字符串
 * @param options 选项
 * @returns Buffer对象
 */
// 文件转Buffer
const fileBuffer = await buffer('/path/to/file.png')

// URL转Buffer
const urlBuffer = await buffer('https://example.com/image.png')

// Base64转Buffer
const base64Buffer = await buffer('base64://aGVsbG8=')

/**
 * 将数据流对象转换为Buffer对象
 * @param stream 要转换的数据流对象
 * @returns Buffer对象
 */
import { createReadStream } from 'fs'
const streamBuffer = await stream(createReadStream('/path/to/file.txt'))
```

### 其他工具函数

```ts twoslash
// @noErrorValidation
import { readFile, randomStr } from 'node-karin'

/**
 * 传入文件路径转为buffer
 * @param path 文件路径
 * @returns Buffer对象，失败时返回null
 */
const fileData = await readFile('/path/to/file.txt')

/**
 * 生成随机字符串
 * @param length 长度，默认为8
 * @returns 随机字符串
 */
const random = randomStr() // 8位随机字符串
const longRandom = randomStr(16) // 16位随机字符串
```

## 包信息模块 (pkg)

pkg 模块提供了获取 NPM 包路径和插件信息的函数。

### 获取包根目录

```ts twoslash
// @noErrorValidation
import { pkgRoot } from 'node-karin'

/**
 * 获取包根目录的绝对路径
 * @param name 包名
 * @param rootPath 导入包的路径，适用于在插件中读取插件的依赖包
 * @returns 包根目录的绝对路径
 */
// 获取axios包的根目录
const axiosRoot = pkgRoot('axios')

// 从插件中获取依赖包的根目录
const lodashRoot = pkgRoot('lodash', import.meta.url)
```

### 插件信息获取

```ts twoslash
// @noErrorValidation
import { getPluginInfo, isPlugin } from 'node-karin'

/**
 * 获取插件信息
 * @param name 插件名称
 * @returns 插件信息对象，包含路径、package.json等
 */
const plugin = getPluginInfo('my-plugin')
if (plugin) {
  console.log(`插件路径: ${plugin.root}`)
  console.log(`插件版本: ${plugin.pkg.version}`)
}

/**
 * 检查是否为已安装的插件
 * @param name 插件名称
 * @returns 布尔值
 */
const isInstalled = isPlugin('my-plugin')
```

## 文件检查模块

node-karin 提供了同步和异步两个版本的文件检查函数。

### 异步文件检查 (fsPromises)

```ts twoslash
// @noErrorValidation
import { exists, isDir, isFile, mkdir, existToMkdir } from 'node-karin'

/**
 * 异步检查路径文件是否存在
 * @param file 文件路径
 * @returns 存在为true，不存在为false
 */
const fileExists = await exists('/path/to/file.txt')

/**
 * 异步检查是否为目录
 * @param file 文件路径
 * @returns 是目录为true，不是目录为false
 */
const isDirectory = await isDir('/path/to/directory')

/**
 * 异步检查是否为文件
 * @param file 文件路径
 * @returns 是文件为true，不是文件为false
 */
const isRegularFile = await isFile('/path/to/file.txt')

/**
 * 递归创建文件夹
 * @param dirname 文件夹路径
 * @returns 创建成功为true，失败为false
 */
const created = await mkdir('/path/to/new/directory')

/**
 * 检查目录是否存在，不存在则创建
 * @param file 文件路径
 * @returns 操作成功为true，失败为false
 */
const ensured = await existToMkdir('/path/to/ensure/directory')
```

### 同步文件检查 (fsSync)

```ts twoslash
// @noErrorValidation
import { existsSync, isDirSync, isFileSync, mkdirSync, existToMkdirSync, rmSync } from 'node-karin'

/**
 * 检查目录是否存在
 * @param file 文件路径
 * @returns 存在为true，不存在为false
 */
const fileExists = existsSync('/path/to/file.txt')

/**
 * 检查是否为目录
 * @param file 文件路径
 * @returns 是目录为true，不是目录为false
 */
const isDirectory = isDirSync('/path/to/directory')

/**
 * 检查是否为文件
 * @param file 文件路径
 * @returns 是文件为true，不是文件为false
 */
const isRegularFile = isFileSync('/path/to/file.txt')

/**
 * 递归创建文件夹
 * @param dirname 文件夹路径
 * @returns 创建成功为true，失败为false
 */
const created = mkdirSync('/path/to/new/directory')

/**
 * 检查目录是否存在，不存在则创建
 * @param file 文件路径
 * @returns 操作成功为true，失败为false
 */
const ensured = existToMkdirSync('/path/to/ensure/directory')

/**
 * 同步删除文件或目录
 * @param path 文件或目录路径
 * @param options 删除选项
 */
// 删除文件
rmSync('/path/to/file.txt')

// 递归删除目录及其内容
rmSync('/path/to/directory', { recursive: true, force: true })
```

## JSON 文件操作

json 模块提供了读写 JSON 文件的便捷函数，支持同步和异步操作。

```ts twoslash
// @noErrorValidation
import { readJson, writeJson, readJsonSync, writeJsonSync } from 'node-karin'
// 或使用命名空间
import { json } from 'node-karin'

/**
 * 异步读取JSON文件
 * @param path 文件路径
 * @param isThrow 是否抛出异常，默认为false
 * @returns 解析后的JSON对象，读取失败时返回null
 */
const config = await readJson('/path/to/config.json')
// 使用命名空间
const config2 = await json.read('/path/to/config.json')

/**
 * 异步写入JSON文件
 * @param path 文件路径
 * @param data 要写入的数据
 * @param isThrow 是否抛出异常，默认为false
 * @returns 写入是否成功，成功为true，失败为false
 */
const data = { name: 'node-karin', version: '1.0.0' }
const success = await writeJson('/path/to/config.json', data)
// 使用命名空间
const success2 = await json.write('/path/to/config.json', data)

/**
 * 同步读取JSON文件
 * @param path 文件路径
 * @param isThrow 是否抛出异常，默认为false
 * @returns 解析后的JSON对象，读取失败时返回null
 */
const configSync = readJsonSync('/path/to/config.json')
// 使用命名空间
const configSync2 = json.readSync('/path/to/config.json')

/**
 * 同步写入JSON文件
 * @param path 文件路径
 * @param data 要写入的数据
 * @param isThrow 是否抛出异常，默认为false
 * @returns 写入是否成功，成功为true，失败为false
 */
const successSync = writeJsonSync('/path/to/config.json', data)
// 使用命名空间
const successSync2 = json.writeSync('/path/to/config.json', data)
```

## YAML 文件操作

yaml 模块提供了读写 YAML 文件的工具函数，同时支持注释处理和高级编辑功能。

```ts twoslash
// @noErrorValidation
// @noErrorValidation
import { readYaml, writeYaml, YamlEditor } from 'node-karin'
// 或使用命名空间
import { yaml } from 'node-karin'

/**
 * 读取YAML文件
 * @param path YAML文件路径
 * @returns 解析后的JavaScript对象
 */
const config = readYaml('/path/to/config.yaml')
// 使用命名空间
const config2 = yaml.read('/path/to/config.yaml')

/**
 * 写入YAML文件
 * @param path YAML文件路径
 * @param value 要写入的数据
 * @returns 是否写入成功
 */
const data = { server: { port: 3000 }, debug: true }
writeYaml('/path/to/config.yaml', data)
// 使用命名空间
yaml.write('/path/to/config.yaml', data)

/**
 * YAML编辑器
 * 提供更高级的YAML文件操作功能
 */
// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')
// 使用命名空间
const editor2 = new yaml.YamlEditor('/path/to/config.yaml')

// 获取值
const port = editor.get('server.port')

// 设置值
editor.set('server.port', 4000)

// 删除值
editor.del('server.logger')

// 向数组添加元素
editor.append('server.allowed_ips', '192.168.1.1')

// 从数组删除元素
editor.remove('server.allowed_ips', '192.168.1.1')

// 添加注释
editor.comment('server.port', '服务器端口号', true)

// 保存修改
editor.save()
```

## 更新日志处理

changelog 模块提供了用于处理更新日志(CHANGELOG.md)的工具函数。

```ts twoslash
// @noErrorValidation
import { log, logs, range, parseChangelog } from 'node-karin'
// 或使用命名空间
import { changelog } from 'node-karin'

import fs from 'node:fs'

/**
 * 提取指定版本号的更新日志
 * @param version 版本号，如 "1.0.0"
 * @param data CHANGELOG.md文件内容
 * @returns 更新日志内容，未找到则返回null
 */
const changelogContent = fs.readFileSync('CHANGELOG.md', 'utf-8')
const version100Log = log('1.0.0', changelogContent)
// 使用命名空间
const version100Log2 = changelog.log('1.0.0', changelogContent)

/**
 * 提取指定范围版本号的更新日志
 * @param version 起始版本号
 * @param data CHANGELOG.md文件内容
 * @param length 提取长度，默认为1
 * @param reverse 是否反向提取，默认为false(向后提取)
 * @returns 合并后的更新日志内容
 */
// 从1.0.0版本开始，向后提取2个版本的日志
const forwardLogs = logs('1.0.0', changelogContent, 2, false)
// 使用命名空间
const forwardLogs2 = changelog.logs('1.0.0', changelogContent, 2, false)

/**
 * 提取两个指定版本号之间的所有更新日志
 * @param data CHANGELOG.md文件内容
 * @param startVersion 起始版本号
 * @param endVersion 结束版本号
 * @returns 合并后的更新日志内容
 */
const versionRangeLogs = range(changelogContent, '1.0.0', '2.0.0')
// 使用命名空间
const versionRangeLogs2 = changelog.range(changelogContent, '1.0.0', '2.0.0')

/**
 * 将更新日志解析为以版本号为键的对象结构
 * @param data 更新日志内容
 * @returns 以版本号为键的更新日志对象
 */
const changelogObj = parseChangelog(changelogContent)
// 使用命名空间
const changelogObj2 = changelog.parseChangelog(changelogContent)
```

## 使用示例

综合使用 fs 模块中的多个函数：

```ts twoslash
// @noErrorValidation
import { downFile, exists, mkdir, readJson, writeJson, base64, formatPath } from 'node-karin'
import path from 'node:path'

const configPath = 'config.json'
async function processConfigFile(configPath: string) {
  // 确保目录存在
  const dir = formatPath(path.dirname(configPath))
  if (!(await exists(dir))) {
    await mkdir(dir)
  }

  // 读取配置文件
  let config = await readJson(configPath)
  if (!config) {
    // 配置不存在，从模板下载
    const templateUrl = 'https://example.com/template-config.json'
    const downloaded = await downFile(templateUrl, configPath)
    if (!downloaded) {
      throw new Error('配置模板下载失败')
    }
    config = await readJson(configPath)
  }

  // 处理配置
  config.lastUpdated = new Date().toISOString()

  // 如果有图片配置，转换为base64
  if (config.image && (await exists(config.image))) {
    config.imageBase64 = await base64(config.image)
  }

  // 保存修改后的配置
  await writeJson(configPath, config)

  return config
}
```
