---
title: 🕒 上下文事件处理 (Context)
createTime: 2025/05/15 10:30:00
permalink: /guide/gv44q6ds/
---

> [!NOTE]
> `karin.ctx` 提供了一种强大的上下文处理机制，允许开发者在特定时间内等待用户交互响应。

## 核心概念

`karin.ctx` 方法用于创建一个上下文等待环境，主要特点包括：

- **非插件**：可以在任何地方调用，不局限于插件内部
- **异步等待**：在指定时间内等待用户响应
- **多场景适用**：支持消息事件、通知事件和请求事件
- **超时处理**：内置超时机制和自动回复功能

## 方法签名

```ts twoslash
import { type Message, Notice, Request } from 'node-karin'
// ---cut---
/**
 * 上下文
 * @param e - 消息事件
 * @param options - 上下文选项
 * @returns 返回下文消息事件 如果超时则返回null
 */
const ctx = async (
  event: Message | Notice | Request,
  options?: {
    /** 指定用户id触发下文 不指定则使用默认e.user_id */
    userId?: string
    /** 超时时间 默认120秒 */
    time?: number
    /** 超时后是否回复 */
    reply?: boolean
    /** 超时回复文本 默认为'操作超时已取消' */
    replyMsg?: string
  }
) => Promise<Message>
```

## 参数详解

### 事件参数 (event)

| 类型      | 描述         |
| --------- | ------------ |
| `Message` | 消息事件对象 |
| `Notice`  | 通知事件对象 |
| `Request` | 请求事件对象 |

### 配置选项 (options)

```ts twoslash
interface ContextOptions {
  /** 超时后是否自动回复 (默认: true) */
  reply?: boolean
  /** 超时回复内容 (默认: '操作超时已取消') */
  replyMsg?: string
  /** 超时时间(秒) (默认: 120) */
  time?: number
  /** 指定触发用户ID (默认: 使用event.userId) */
  userId?: string | number
}
```

## 使用示例

### 基础用法

```ts twoslash
// @noErrorValidation
import { Message } from 'node-karin'
const e = {} as Message
// ---cut-before---
import karin from 'node-karin'

// 创建上下文等待环境
const context = await karin.ctx(e, {
  reply: true,
  replyMsg: '操作已超时',
  time: 60, // 1分钟超时
  userId: e.userId // 指定用户ID
})
```

### 登录验证场景

```ts twoslash
// @noErrorValidation
import karin, { logger } from 'node-karin'

const loginHandler = karin.command('登录', async (e) => {
  // 发送验证码
  await e.reply('6位验证码已发送至您的邮箱，请输入验证码继续')
  
  // 等待用户输入验证码 (120秒)
  const ctx = await karin.ctx(e)
  
  // 验证逻辑
  if (ctx.msg === '123456') {
    await e.reply(`验证成功，欢迎 ${ctx.sender.name}`)
  } else {
    await e.reply('验证码错误，请重试')
  }
})
```

### 问卷调查场景

```ts twoslash
// @noErrorValidation
import karin from 'node-karin'

const surveyHandler = karin.command('问卷', async (e) => {
  await e.reply('请回答以下问题：\n1. 您的年龄是？')
  
  // 等待第一个回答 (60秒)
  const age = await karin.ctx(e, { time: 60 })
  await e.reply(`记录年龄: ${age.msg}\n2. 您的职业是？`)
  
  // 等待第二个回答 (60秒)
  const job = await karin.ctx(e, { time: 60 })
  await e.reply(`记录职业: ${job.msg}\n感谢参与问卷调查！`)
})
```

## 注意事项

- 上下文环境会持续占用内存，避免创建过多长期存活的上下文
- 超时后会自动清理上下文资源
- 同一个用户同时只能有一个活跃的上下文
- 上下文不支持跨平台/适配器使用

## 相关API

- [`karin.command`](../../plugins/demo.md#_1-命令正则处理) - 命令注册
- [`karin.accept`](../../plugins/demo.md#_2-监听事件处理) - 事件监听
- [`Message`](../../event/message.md) - 消息事件对象
