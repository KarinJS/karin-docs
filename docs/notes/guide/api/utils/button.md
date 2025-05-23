---
title: button
createTime: 2025/05/15 00:12:24
permalink: /guide/2m6z62a9/
---

# button 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

button 模块提供了处理和转换机器人按钮消息的工具函数。

## 按钮处理函数

### buttonHandle

根据正则表达式调用注册的按钮处理器，用于生成交互按钮元素。

```ts twoslash
// @noErrorValidation
import { buttonHandle } from 'node-karin'

/**
 * 调用按钮处理器
 * @param reg 正则表达式字符串
 * @param args 可选参数对象
 * @returns 返回按钮元素数组
 */
const buttons = await buttonHandle('正则表达式', { e: event对象, 其他参数 })
```

**参数：**

- `reg` - 用于匹配按钮处理器的正则表达式字符串
- `args` - 可选参数对象
  - `e` - 消息事件对象
  - 其他自定义参数

**返回值：**

返回一个包含`ButtonElement`或`KeyboardElement`类型元素的数组

## 按钮转换函数

### karinToQQBot

将 karin 标准格式的按钮转换为 QQ 官方按钮格式。

```ts twoslash
// @noErrorValidation
import { karinToQQBot } from 'node-karin'

/**
 * 将karin标准格式的按钮转换为QQ官方按钮
 * @param button karin格式的按钮元素
 * @returns QQ官方按钮数组
 */
const qqButtons = karinToQQBot(karinButton)
```

**参数：**

- `button` - karin 格式的按钮元素（ButtonElement 或 KeyboardElement 类型）

**返回值：**

返回 QQ 官方按钮数组格式

### qqbotToKarin

将 QQ 官方按钮转换为 karin 标准格式的按钮文本。

```ts twoslash
// @noErrorValidation
import { type QQBotButton } from 'node-karin'
import { qqbotToKarin } from 'node-karin'

const qqbotButtons: { buttons: QQBotButton[] }[] = [
  {
    buttons: [
      {
        id: 'example-id',
        render_data: {
          label: '示例按钮',
          visited_label: '已点击',
          style: 1,
        },
        action: {
          type: 1,
          permission: {
            type: 2,
          },
          data: 'example-data',
          unsupport_tips: '不支持的操作',
        },
      },
    ],
  },
]

/**
 * 将QQ官方按钮转换为karin标准格式的按钮
 * @param button QQ官方按钮数组（content.rows）
 * @returns karin格式的按钮文本
 */
const karinButtonText = qqbotToKarin(qqbotButtons)
```

**参数：**

- `button` - QQ 官方按钮数组，通常是`content.rows`

**返回值：**

返回 karin 格式的按钮文本字符串

## 按钮类型定义

以下是按钮相关的主要类型：

```ts twoslash
// @noErrorValidation
// 按钮元素
interface ButtonElement {
  type: 'button'
  data: ButtonRow
}

// 键盘元素
interface KeyboardElement {
  type: 'keyboard'
  rows: ButtonRow[]
}

// 按钮行
type ButtonRow = ButtonData[]

// 按钮数据
interface ButtonData {
  text?: string // 按钮文本
  link?: string // 链接URL
  data?: string // 按钮数据
  show?: string // 点击后显示的文本
  style?: number // 样式（0-4）
  tips?: string // 不支持时的提示
  callback?: boolean // 是否为回调按钮
  enter?: boolean // 点击后是否自动发送
  reply?: boolean // 点击后是否回复
  admin?: boolean // 仅管理员可用
  list?: string[] // 可使用用户ID列表
  role?: string[] // 可使用角色ID列表
  type?: 0 | 1 | 2 // 按钮类型：0-链接，1-回调，2-普通
}
```
