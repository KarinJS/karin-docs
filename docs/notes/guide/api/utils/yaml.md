---
title: yaml
createTime: 2025/05/15 00:12:24
permalink: /guide/37u0i3zq/
---

# yaml 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

yaml 模块提供了读写 YAML 文件的工具函数，同时支持注释处理和高级编辑功能。

## 基本读写

### read

读取 YAML 文件并解析为 JavaScript 对象。

```ts twoslash
// @noErrorValidation
import { read as readYaml } from 'node-karin'

/**
 * 读取YAML文件
 * @param path YAML文件路径
 * @returns 解析后的JavaScript对象
 */
const config = readYaml('/path/to/config.yaml')
```

### write

将 JavaScript 对象序列化为 YAML 并写入文件。

```ts twoslash
// @noErrorValidation
import { write as writeYaml } from 'node-karin'

/**
 * 写入YAML文件
 * @param path YAML文件路径
 * @param value 要写入的数据
 * @returns 是否写入成功
 */
const data = { server: { port: 3000 }, debug: true }
writeYaml('/path/to/config.yaml', data)
```

## 带注释的保存

### save

将数据写入 YAML 文件并应用注释。

```ts twoslash
// @noErrorValidation
import { save } from 'node-karin'

// 方式1: 使用JSON配置文件中的注释
save('/path/to/config.yaml', data, '/path/to/comments.json')

// 方式2: 使用键值对格式的注释
save('/path/to/config.yaml', data, {
  'server.port': '服务器端口',
  debug: '是否开启调试模式',
})

// 方式3: 使用对象格式的注释，指定注释位置
save('/path/to/config.yaml', data, {
  'server.port': { comment: '服务器端口', type: 'top' },
  debug: { comment: '是否开启调试模式', type: 'end' },
})
```

### comment

单独为 YAML 文件添加注释。

```ts twoslash
// @noErrorValidation
import { comment } from 'node-karin'

// 使用键值对格式的注释
comment('/path/to/config.yaml', {
  'server.port': '端口设置，默认为3000',
  debug: '调试模式开关',
})

// 使用对象格式的注释
comment('/path/to/config.yaml', {
  'server.port': { comment: '端口设置，默认为3000', type: 'top' },
  debug: { comment: '调试模式开关', type: 'end' },
})
```

## YAML 编辑器

YamlEditor 类提供了更高级的 YAML 文件操作功能。

```ts twoslash
// @noErrorValidation
import { YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')

// 读取值
const port = editor.get('server.port')
const config = editor.get() // 获取整个文档

// 设置值
editor.set('server.port', 4000)
editor.set('server.host', 'localhost')

// 删除值
editor.del('server.logger')

// 向数组添加元素
editor.append('server.allowed_ips', '192.168.1.1')
editor.append('server.allowed_ips', '10.0.0.1', true) // 添加到数组开头

// 从数组删除元素
editor.remove('server.allowed_ips', '192.168.1.1')

// 检查路径是否存在
const hasLogLevel = editor.has('server.log_level')

// 检查路径是否包含特定值
const hasLocalhost = editor.hasval('server.allowed_ips', 'localhost')

// 添加注释
editor.comment('server.port', '服务器端口号', true) // true表示在上方添加注释

// 保存修改
editor.save()
```

## YamlEditor 方法

### get

获取指定路径的值。

```ts twoslash
// @noErrorValidation
import { YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')
// ---cut---
/**
 * 获取指定路径的值
 * @param path 路径，多个路径使用`.`连接，例如：`a.b.c`
 * @returns 路径对应的值
 */
const value = editor.get('server.port')
```

### set

设置指定路径的值。

```ts twoslash
// @noErrorValidation
import { YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')
// ---cut---
/**
 * 设置指定路径的值
 * @param path 路径，多个路径使用`.`连接，例如：`a.b.c`
 * @param value 要设置的值
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 是否设置成功
 */
editor.set('server.port', 8080)
```

### del

删除指定路径的值。

```ts twoslash
// @noErrorValidation
import { YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')
// ---cut---
/**
 * 删除指定路径
 * @param path 路径，多个路径使用`.`连接，例如：`a.b.c`
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 是否删除成功
 */
editor.del('server.temp_dir')
```

### append / remove

操作数组类型的值。

```ts twoslash
// @noErrorValidation
/**
 * 向指定路径的数组添加新值
 * @param path 路径，多个路径使用`.`连接
 * @param value 要添加的值
 * @param prepend 是否添加到数组开头，默认为false(添加到末尾)
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 是否添加成功
 */
editor.append('server.domains', 'example.com')

/**
 * 从指定路径的数组删除值
 * @param path 路径，多个路径使用`.`连接
 * @param value 要删除的值
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 是否删除成功
 */
editor.remove('server.domains', 'example.org')
```

### has / hasval

检查路径和值。

```ts twoslash
// @noErrorValidation
import { YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('/path/to/config.yaml')
// ---cut---
/**
 * 检查指定路径是否存在
 * @param path 路径，多个路径使用`.`连接
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 路径是否存在
 */
const exists = editor.has('server.ssl')

/**
 * 检查指定路径中是否包含特定值
 * @param path 路径，多个路径使用`.`连接
 * @param value 要检查的值
 * @param isSplit 是否使用点号分割路径，默认为true
 * @returns 是否包含值
 */
const hasValue = editor.hasval('server.protocols', 'https')
```
