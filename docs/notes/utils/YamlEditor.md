---
title: YamlEditor
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/YamlEditor/
---
# YamlEditor 工具文档

## 1. YamlEditor 类

`YamlEditor` 是一个用于编辑 YAML 文件的类，提供了丰富的 YAML 操作方法。

### 1.1 构造函数

**参数**:

| 参数名 | 类型     | 描述                       |
| ------ | -------- | -------------------------- |
| `file` | `string` | 文件路径或 YAML 字符串内容 |

```ts twoslash
import { YamlEditor } from 'node-karin'
// ---cut---
const editor = new YamlEditor('config.yaml')
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
// ---cut---
// 从文件创建
const editor = new YamlEditor('config.yaml')

// 从字符串创建
const yamlString = 'name: test\nversion: 1.0.0'
const editor2 = new YamlEditor(yamlString)
```

### 1.2 获取值 (get)

获取指定路径的值。
**参数**:

| 参数名 | 类型     | 描述                             |
| ------ | -------- | -------------------------------- |
| `path` | `string` | 使用点号分隔的路径，例如 `a.b.c` |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
// ---cut---
editor.get(path)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 获取 config.name 的值
const name = editor.get('config.name')

// 获取整个文档
const allData = editor.get('')
```

### 1.3 设置值 (set)

设置指定路径的值。
**参数**:

| 参数名    | 类型      | 默认值 | 描述                                               |
| --------- | --------- | ------ | -------------------------------------------------- |
| `path`    | `string`  | -      | 使用点号分隔的路径                                 |
| `value`   | `any`     | -      | 要设置的值，可以是字符串、布尔值、数字、对象或数组 |
| `isSplit` | `boolean` | `true` | 是否分割路径                                       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const value = 'newName'
const isSplit = true
// ---cut---
editor.set(path, value, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 设置 config.name 的值为 "newName"
editor.set('config.name', 'newName')

// 设置对象
editor.set('config.server', { host: 'localhost', port: 3000 })

// 不分割路径
editor.set('config.with.dots', 'value', false)
```

### 1.4 添加值 (add)

向指定路径添加新值。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `value`   | `any`     | -      | 要添加的值         |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.items'
const value = 'newItem'
const isSplit = true
// ---cut---
editor.add(path, value, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 向 config.items 添加新值
editor.add('config.items', 'newItem')
```

### 1.5 删除路径 (del)

删除指定路径。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const isSplit = true
// ---cut---
editor.del(path, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 删除 config.name
editor.del('config.name')
```

### 1.6 向数组添加元素 (append)

向指定路径的数组添加新元素。
**参数**:

| 参数名    | 类型      | 默认值  | 描述                                       |
| --------- | --------- | ------- | ------------------------------------------ |
| `path`    | `string`  | -       | 使用点号分隔的路径                         |
| `value`   | `any`     | -       | 要添加的值                                 |
| `prepend` | `boolean` | `false` | 是否添加到数组开头，`false` 表示添加到末尾 |
| `isSplit` | `boolean` | `true`  | 是否分割路径                               |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.items'
const value = 'newItem'
const prepend = false
const isSplit = true
// ---cut---
editor.append(path, value, prepend, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 向 config.items 数组末尾添加元素
editor.append('config.items', 'newItem')

// 向 config.items 数组开头添加元素
editor.append('config.items', 'firstItem', true)
```

### 1.7 从数组删除元素 (remove)

从指定路径的数组中删除指定值。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `value`   | `any`     | -      | 要删除的值         |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.items'
const value = 'item1'
const isSplit = true
// ---cut---
editor.remove(path, value, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 从 config.items 数组中删除值为 "item1" 的元素
editor.remove('config.items', 'item1')
```

### 1.8 检查路径是否存在 (has)

检查指定路径是否存在。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const isSplit = true
// ---cut---
editor.has(path, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 检查 config.name 是否存在
if (editor.has('config.name')) {
  console.log('config.name 存在')
}
```

### 1.9 检查路径是否包含指定值 (hasval)

检查指定路径是否包含指定值。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `value`   | `any`     | -      | 要检查的值         |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.items'
const value = 'item1'
const isSplit = true
// ---cut---
editor.hasval(path, value, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 检查 config.items 数组是否包含 "item1"
if (editor.hasval('config.items', 'item1')) {
  console.log('config.items 包含 item1')
}
```

### 1.10 向根节点数组添加元素 (pusharr)

向根节点数组添加新元素，如果根节点不是数组，则将其转换为数组。
**参数**:

| 参数名  | 类型  | 描述       |
| ------- | ----- | ---------- |
| `value` | `any` | 要添加的值 |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const value = 'newItem'
// ---cut---
editor.pusharr(value)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 向根节点数组添加元素
editor.pusharr('newItem')
```

### 1.11 从根节点数组删除元素 (delarr)

根据索引从根节点数组删除元素。
**参数**:

| 参数名  | 类型     | 描述             |
| ------- | -------- | ---------------- |
| `index` | `number` | 要删除元素的索引 |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const index = 0
// ---cut---
editor.delarr(index)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 删除根节点数组中索引为 0 的元素
editor.delarr(0)
```

### 1.12 获取节点对象 (getpair)

获取指定路径的节点对象。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const isSplit = true
// ---cut---
editor.getpair(path, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 获取 config.name 的节点对象
const pair = editor.getpair('config.name')
```

### 1.13 设置注释 (comment)

为指定路径设置注释。
**参数**:

| 参数名    | 类型      | 默认值 | 描述                                           |
| --------- | --------- | ------ | ---------------------------------------------- |
| `path`    | `string`  | -      | 使用点号分隔的路径                             |
| `comment` | `string`  | -      | 要设置的注释内容                               |
| `prepend` | `boolean` | `true` | 是否添加到节点前面，`false` 则添加到同一行末尾 |
| `isSplit` | `boolean` | `true` | 是否分割路径                                   |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const comment = '这是名称配置'
const prepend = true
const isSplit = true
// ---cut---
editor.comment(path, comment, prepend, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 在 config.name 前添加注释
editor.comment('config.name', '这是名称配置')

// 在 config.version 同一行末尾添加注释
editor.comment('config.version', '当前版本', false)
```

### 1.14 删除注释 (uncomment)

删除指定路径的注释。
**参数**:

| 参数名    | 类型      | 默认值  | 描述                                                        |
| --------- | --------- | ------- | ----------------------------------------------------------- |
| `path`    | `string`  | -       | 使用点号分隔的路径                                          |
| `type`    | `string`  | `'all'` | 要删除的注释类型，可选值为 `'before'`、`'after'` 或 `'all'` |
| `isSplit` | `boolean` | `true`  | 是否分割路径                                                |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const type = 'all'
const isSplit = true
// ---cut---
editor.uncomment(path, type, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 删除 config.name 的所有注释
editor.uncomment('config.name')

// 只删除 config.version 前面的注释
editor.uncomment('config.version', 'before')
```

### 1.15 检查注释是否存在 (hascomment)

检查指定路径是否有注释。
**参数**:

| 参数名    | 类型      | 默认值 | 描述                                               |
| --------- | --------- | ------ | -------------------------------------------------- |
| `path`    | `string`  | -      | 使用点号分隔的路径                                 |
| `type`    | `string`  | -      | 要检查的注释类型，可选值为 `'before'` 或 `'after'` |
| `isSplit` | `boolean` | `true` | 是否分割路径                                       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const type = 'before'
const isSplit = true
// ---cut---
editor.hascomment(path, type, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 检查 config.name 是否有前置注释
if (editor.hascomment('config.name', 'before')) {
  console.log('config.name 有前置注释')
}
```

### 1.16 获取注释 (getcomment)

获取指定路径的注释。
**参数**:

| 参数名    | 类型      | 默认值 | 描述               |
| --------- | --------- | ------ | ------------------ |
| `path`    | `string`  | -      | 使用点号分隔的路径 |
| `isSplit` | `boolean` | `true` | 是否分割路径       |

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const path = 'config.name'
const isSplit = true
// ---cut---
editor.getcomment(path, isSplit)
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 获取 config.name 的注释
const comment = editor.getcomment('config.name')
console.log('注释内容:', comment)
```

### 1.17 保存文件 (save)

将修改保存到文件。

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
editor.save()
```

**示例**:

```ts twoslash
import { YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
// ---cut---
// 修改后保存文件
editor.set('config.name', 'newName')
editor.save()
```

## 2. 工具函数

### 2.1 读取 YAML 文件 (read)

读取并解析 YAML 文件。
**参数**:

| 参数名 | 类型     | 描述          |
| ------ | -------- | ------------- |
| `path` | `string` | YAML 文件路径 |

```ts twoslash
import { yaml } from 'node-karin'
const path = 'config.yaml'
// ---cut---
const data = yaml.read(path)
```

**示例**:

```ts twoslash
import { yaml } from 'node-karin'
// ---cut---
// 读取 YAML 文件
const config = yaml.read('config.yaml')
console.log(config.name)

// 修改后保存（带注释）
config.name = 'newName'
yaml.save('config.yaml', config, {
  name: {
    comment: '用户名',
    type: 'end'
  }
})
```

### 2.2 写入 YAML 文件 (write)

将数据写入 YAML 文件。
**参数**:

| 参数名  | 类型     | 描述         |
| ------- | -------- | ------------ |
| `path`  | `string` | 文件路径     |
| `value` | `any`    | 要写入的数据 |

```ts twoslash
const path = 'config.yaml'
const value = { name: 'test', version: '1.0.0' }
// ---cut---
import { write } from 'node-karin'
write(path, value)
```

**示例**:

```ts twoslash
import { write } from 'node-karin'
// 写入 YAML 文件
const data = { name: 'test', version: '1.0.0' }
write('config.yaml', data)
```

### 2.3 保存数据并写入注释 (save)

保存数据并写入注释。
**参数**:

| 参数名    | 类型               | 必选 | 描述                                         |
| --------- | ------------------ | ---- | -------------------------------------------- |
| `path`    | `string`           | 是   | 文件路径                                     |
| `value`   | `any`              | 是   | 要保存的数据                                 |
| `options` | `string \| object` | 否   | 注释配置，可以是 JSON 文件路径或注释配置对象 |

```ts twoslash
import { yaml, YamlEditor } from 'node-karin'
const path = 'config.yaml'
const value = { name: 'test', version: '1.0.0' }
// ---cut---
yaml.save(path, value, {
  version: {
    comment: '版本号',
    type: 'end'
  }
})
```

**示例**:

```ts twoslash
import { yaml } from 'node-karin'
// ---cut---
// 保存数据并添加注释
const data = { name: 'test', version: '1.0.0' }
yaml.save('config.yaml', data, {
  version: {
    comment: '版本号',
    type: 'end'
  }
})

// 使用 JSON 文件中的注释配置
yaml.save('config.yaml', data, 'comments.json')
```

### 2.4 为文件添加注释 (comment)

为现有 YAML 文件添加注释。
**参数**:

| 参数名          | 类型               | 描述                                         |
| --------------- | ------------------ | -------------------------------------------- |
| `filePath`      | `string`           | YAML 文件路径                                |
| `commentConfig` | `string \| object` | 注释配置，可以是 JSON 文件路径或注释配置对象 |

```ts twoslash
import { yaml } from 'node-karin'
const filePath = 'config.yaml'
// ---cut---
yaml.comment(filePath, {
  version: {
    comment: '版本号',
    type: 'end'
  }
})
```

**示例**:

```ts twoslash
import { yaml } from 'node-karin'
// 为现有文件添加注释
yaml.comment('config.yaml', {
  version: {
    comment: '版本号',
    type: 'end'
  }
})

// 使用 JSON 文件中的注释配置
yaml.comment('config.yaml', 'comments.json')
```

### 2.5 批量添加注释 (applyComments)

为 YamlEditor 实例批量添加注释。

```ts twoslash
import type { YamlComment } from 'node-karin'
// ---cut---
import { yaml, YamlEditor } from 'node-karin'
const editor = new YamlEditor('config.yaml')
const comments: YamlComment = {
  version: {
    comment: '版本号',
    type: 'end'
  },
  name: {
    comment: '配置名称',
    type: 'end'
  }
}
yaml.applyComments(editor, comments)
```

**参数**:

| 参数名     | 类型         | 描述            |
| ---------- | ------------ | --------------- |
| `editor`   | `YamlEditor` | YamlEditor 实例 |
| `comments` | `object`     | 注释配置对象    |

**示例**:

```ts twoslash
import { yaml, YamlEditor } from 'node-karin'
// 创建编辑器实例
const editor = new YamlEditor('config.yaml')

// 批量添加注释
yaml.applyComments(editor, {
  version: {
    comment: '版本号',
    type: 'end'
  },
  name: {
    comment: '配置名称',
    type: 'top'
  }
})

// 保存文件
editor.save()
```

## 3. YAML 注释配置说明

### 3.1 注释配置格式

YamlEditor 支持两种注释配置格式：

1. 简单键值对格式：

```json
{
  "key": "comment"
}
```

2. 对象格式（可指定注释位置）：

```json
{
  "key": {
    "comment": "注释内容",
    "type": "top" | "end"  // top: 在键上方，end: 在行尾
  }
}
```

::: danger 注意：

- 当使用对象格式时，`type` 字段是可选的，默认为 `end`。
- 当使用对象格式时，`comment` 字段是必选的。
- `简单键值对格式` 和 `对象格式` 不能**混合使用**。

:::

### 3.2 注释位置说明

- `type: "top"`: 注释将添加在键的上方

  ```yaml
  # 这是上方注释
  key: value
  ```

- `type: "end"`: 注释将添加在行尾
  ```yaml
  key: value # 这是行尾注释
  ```

### 3.3 注释配置示例

```ts twoslash
// 1. 简单键值对格式
const comments = {
  name: '项目名称',
  version: '项目版本号',
  author: '作者信息'
}

// 2. 对象格式
const comments2 = {
  name: {
    comment: '项目名称',
    type: 'top'
  },
  version: {
    comment: '项目版本号',
    type: 'end'
  },
  dependencies: {
    comment: '项目依赖配置',
    type: 'top'
  }
}
```

### 3.4 添加注释的方法

1. 使用 `YamlEditor` 类：

```ts twoslash
import type { YamlComment } from 'node-karin'
// ---cut---
import { yaml, YamlEditor } from 'node-karin'

// 创建编辑器实例
const editor = new YamlEditor('config.yaml')

// 添加单个注释
editor.comment('name', '项目名称', true) // true 表示添加到键上方
editor.comment('version', '版本号', false) // false 表示添加到行尾

// 批量添加注释
const comments: YamlComment = {
  name: { comment: '项目名称', type: 'top' },
  version: { comment: '版本号', type: 'end' }
}
yaml.applyComments(editor, comments)

// 保存文件
editor.save()
```

2. 使用 `yaml.save` 方法：

```ts twoslash
import { yaml } from 'node-karin'

const data = {
  name: 'my-project',
  version: '1.0.0'
}

// 方式一：直接传入注释配置对象
yaml.save('config.yaml', data, {
  name: { comment: '项目名称', type: 'top' },
  version: { comment: '版本号', type: 'end' }
})

// 方式二：使用 JSON 文件存储注释配置
yaml.save('config.yaml', data, 'comments.json')
```

3. 使用 `yaml.comment` 方法为现有文件添加注释：

```ts twoslash
import { yaml } from 'node-karin'

// 方式一：直接传入注释配置对象
// 自定义注释位置
yaml.comment('config.yaml', {
  name: { comment: '项目名称', type: 'top' },
  version: { comment: '版本号', type: 'end' }
})
// 简单格式默认添加到键上方
yaml.comment('config.yaml', {
  name: '项目名称',
  version: '版本号'
})

// 方式二：使用 JSON 文件存储注释配置
yaml.comment('config.yaml', 'comments.json')
```

### 3.5 注释配置文件示例

如果使用 JSON 文件存储注释配置，文件内容应如下所示：

```json
{
  "name": {
    "comment": "项目名称",
    "type": "top"
  },
  "version": {
    "comment": "项目版本号",
    "type": "end"
  },
  "description": "项目描述信息",
  "author": {
    "comment": "作者信息",
    "type": "top"
  },
  "dependencies": {
    "comment": "项目依赖列表",
    "type": "top"
  }
}
```

### 3.6 注释处理说明

1. 对于嵌套路径，使用点号（.）连接：

```ts twoslash
const comments = {
  'server.host': { comment: '服务器地址', type: 'end' },
  'server.port': { comment: '服务器端口', type: 'top' }
}
```

2. 当使用简单字符串格式时，注释默认添加到键的上方：

```ts twoslash
const comments = {
  name: '项目名称', // 等同于 { comment: '项目名称', type: 'top' }
  version: '版本号' // 等同于 { comment: '版本号', type: 'top' }
}
```

3. 注释会自动添加适当的空格，无需手动添加：

```yaml
# 这样写
# { name: '项目名称' }
# 实际效果
# 项目名称
name: my-project

# 这样写
# { version: { comment: '版本号', type: 'end' } }
# 实际效果
version: 1.0.0 # 版本号
```

## 3. 完整使用示例

以下是一个完整的使用示例，展示了如何使用 YamlEditor 创建、编辑和保存 YAML 文件：

```ts twoslash
// 引入 yaml 工具
import { yaml, YamlEditor } from 'node-karin'

// 创建新的 YAML 文件
const config = {
  name: 'myApp',
  version: '1.0.0',
  settings: {
    debug: true,
    port: 3000
  },
  plugins: ['logger', 'auth']
}

// 保存文件并添加注释
yaml.save('config.yaml', config, {
  name: { comment: '应用名称', type: 'top' },
  version: { comment: '应用版本', type: 'top' }
})

// 读取并修改文件
const editor = new YamlEditor('config.yaml')

// 修改设置
editor.set('settings.debug', false)
editor.set('settings.timeout', 30000)

// 添加新插件
editor.append('plugins', 'database')

// 检查并删除插件
if (editor.hasval('plugins', 'auth')) {
  editor.remove('plugins', 'auth')
}

// 添加新注释
editor.comment('settings.timeout', '连接超时时间（毫秒）')

// 保存修改
editor.save()

// 读取并显示内容
const updatedConfig = yaml.read('config.yaml')
console.log(JSON.stringify(updatedConfig, null, 2))
```
