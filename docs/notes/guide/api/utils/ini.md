---
title: ini
createTime: 2025/05/15 00:12:24
permalink: /guide/bnvigc6e/
---

# ini 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

ini 模块提供了对 INI 格式文件的解析和写入功能，特别适用于处理`.npmrc`格式的配置文件。

## INI 解析器

### ini

一个预先创建好的 INI 解析器实例，可以直接用于读写 INI 文件。

```ts twoslash
// @noErrorValidation
import { ini } from 'node-karin'

// 读取INI文件
const config = ini.read('/path/to/config.ini')
console.log(config) // { key1: 'value1', key2: 'value2' }

// 修改配置
config.key3 = 'value3'
config.key1 = 'new-value'

// 保存INI文件
const success = ini.write(config, '/path/to/config.ini')
```

### createINIParser

创建一个新的 INI 解析器实例。

```ts twoslash
// @noErrorValidation
import { createINIParser } from 'node-karin'

// 创建新的解析器实例
const myParser = createINIParser()

// 使用新创建的解析器
const data = myParser.read('/path/to/file.ini')
```

## API 参考

### INIParser 接口

INI 解析器提供了以下方法：

```ts twoslash
// @noErrorValidation
interface INIParser {
  /**
   * 从指定路径读取并解析INI文件
   * @param filePath - 文件路径
   * @returns 解析后的键值对对象
   */
  read: (filePath: string) => Record<string, string>

  /**
   * 将键值对对象保存到指定路径
   * @param data - 要保存的键值对数据
   * @param filePath - 保存的文件路径
   * @returns 是否保存成功
   */
  write: (data: Record<string, string>, filePath: string) => boolean
}
```

### read 方法

读取并解析 INI 文件。

```ts twoslash
// @noErrorValidation
/**
 * 从指定路径读取并解析INI文件
 * @param filePath - 文件路径
 * @returns 解析后的键值对对象
 */
const config = ini.read('/path/to/config.ini')
```

**参数**

- `filePath`: 字符串，要读取的 INI 文件路径

**返回值**

- 返回一个对象，包含 INI 文件中的所有键值对
- 如果文件不存在或读取失败，返回空对象`{}`

### write 方法

将键值对数据写入 INI 文件。

```ts twoslash
// @noErrorValidation
import { ini } from 'node-karin'
// ---cut---
/**
 * 将键值对对象保存到指定路径
 * @param data - 要保存的键值对数据
 * @param filePath - 保存的文件路径
 * @returns 是否保存成功
 */
const success = ini.write({ key: 'value' }, '/path/to/config.ini')
```

**参数**

- `data`: 对象，包含要写入文件的键值对
- `filePath`: 字符串，要写入的文件路径

**返回值**

- `true`: 写入成功
- `false`: 写入失败

## 注意事项

1. INI 解析器会自动创建不存在的目录
2. 当读取不存在的文件时，会返回空对象而不是抛出错误
3. 这个解析器专为简单配置文件设计，不支持节(sections)、注释保留等高级功能
