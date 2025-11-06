---
title: 通知与请求事件插件
createTime: 2025/06/30 21:39:58
---

## 基本用法

通知与请求事件插件用于处理机器人收到的各类通知和请求事件，例如好友申请、入群邀请、群成员变动等。创建事件处理插件需要使用 `karin.accept` 函数：

```ts twoslash
import { karin } from 'node-karin'

// 处理所有通知事件
export const noticeHandler = karin.accept(
  'notice',
  async (ctx, next) => {
    // 打印申请信息
    console.log(`收到类型为 ${ctx.subEvent} 的事件`)
    console.log(`事件内容: ${ctx.content}`)

    // 可以调用 next() 让事件继续传递给优先级更高的处理器
    next()
  }
)

// 处理所有请求事件
export const requestHandler = karin.accept(
  'request',
  async (ctx, next) => {
   console.log(`收到类型为 ${ctx.subEvent} 的事件`)
   console.log(`事件内容: ${ctx.content}`)

   // 可以调用 next() 让事件继续传递给优先级更高的处理器
   next()
  }
)
```

## 参数说明

`karin.accept` 函数接受以下参数：

| 参数名    | 类型            | 必填 | 描述                                   |
| --------- | --------------- | ---- | -------------------------------------- |
| `event`   | `string`        | 是   | 要监听的事件名称                       |
| `fnc`     | `Function`      | 是   | 事件处理函数，接收事件对象和 next 函数 |
| `options` | `AcceptOptions` | 否   | 插件的附加选项                         |

### AcceptOptions 选项

| 选项名       | 类型       | 默认值      | 描述                               |
| ------------ | ---------- | ----------- | ---------------------------------- |
| `name`       | `string`   | `undefined` | 可选的插件名称，用于文件标识       |
| `log`        | `boolean`  | `true`      | 是否开启执行日志记录               |
| `adapter`    | `string[]` | `[]`        | 指定事件处理器仅在特定适配器上生效 |
| `dsbAdapter` | `string[]` | `[]`        | 指定事件处理器在哪些适配器上不生效 |
| `priority`   | `number`   | `10000`     | 处理器的优先级，数值越小优先级越高 |

## 可监听的事件类型

以下是可以通过 `karin.accept` 监听的所有事件：

### 通知事件

| 事件名                          | 描述               | 事件内容类型                        |
| ------------------------------- | ------------------ | ----------------------------------- |
| `notice`                        | 通知事件           | `NoticeType`                        |
| `notice.receiveLike`            | 收到点赞事件       | `ReceiveLikeType`                   |
| `notice.friendIncrease`         | 好友增加事件       | `FriendIncreaseType`                |
| `notice.friendDecrease`         | 好友减少事件       | `FriendDecreaseType`                |
| `notice.privatePoke`            | 私聊戳一戳事件     | `PrivatePokeType`                   |
| `notice.privateRecall`          | 私聊消息撤回事件   | `PrivateRecallType`                 |
| `notice.privateFileUploaded`    | 私聊文件上传事件   | `PrivateFileUploadedType`           |
| `notice.groupPoke`              | 群聊戳一戳事件     | `GroupPokeType`                     |
| `notice.groupRecall`            | 群聊消息撤回事件   | `GroupRecallType`                   |
| `notice.groupFileUploaded`      | 群聊文件上传事件   | `GroupFileUploadedType`             |
| `notice.groupCardChanged`       | 群名片变动事件     | `GroupCardChangedType`              |
| `notice.groupMemberTitleUpdate` | 群成员头衔变动事件 | `GroupMemberUniqueTitleChangedType` |
| `notice.groupHighlightsChange`  | 群精华消息变动事件 | `GroupHlightsChangedType`           |
| `notice.groupMemberAdd`         | 群成员增加事件     | `GroupMemberIncreaseType`           |
| `notice.groupMemberRemove`      | 群成员减少事件     | `GroupMemberDecreaseType`           |
| `notice.groupAdminChanged`      | 群管理员变动事件   | `GroupAdminChangedType`             |
| `notice.groupSignIn`            | 群打卡事件         | `GroupSignInType`                   |
| `notice.groupMemberBan`         | 群成员被禁言事件   | `GroupMemberBanType`                |
| `notice.groupWholeBan`          | 群全员禁言事件     | `GroupWholeBanType`                 |
| `notice.groupMessageReaction`   | 群表情动态事件     | `GroupMessageReactionType`          |
| `notice.groupLuckyKing`         | 群聊运气王事件     | `GroupLuckKingType`                 |
| `notice.groupHonorChange`       | 群聊荣誉变更事件   | `GroupHonorChangedType`             |

### 请求事件

| 事件名                | 描述                | 事件内容类型       |
| --------------------- | ------------------- | ------------------ |
| `request`             | 请求事件            | `RequestType`      |
| `request.friendApply` | 好友申请事件        | `PrivateApplyType` |
| `request.groupApply`  | 群成员申请入群事件  | `GroupApply`       |
| `request.groupInvite` | 邀请Bot加入群聊事件 | `GroupInvite`      |

## 事件处理函数

事件处理函数接收两个参数：
1. `event` - 事件对象，包含事件相关的所有信息
2. `next` - 函数，调用它可以让事件继续传递给下一个处理器

```ts twoslash
import { karin } from 'node-karin'

export const eventHandler = karin.accept(
  'request.friendApply',
  (ctx, next) => {
    // 处理事件
    console.log('处理好友申请')
    
    // 如果返回 next()，事件会继续传递
    next()
    
    // 如果不调用 next() 或者返回其他值，事件会终止传递
  }
)
```

## 高级用法

### 设置处理器优先级

处理器优先级决定了多个处理同一事件的插件的执行顺序：

```ts twoslash
import { karin } from 'node-karin'

// 高优先级处理器，先执行
export const highPriorityHandler = karin.accept(
  'notice.groupMemberAdd',
  (ctx, next) => {
    console.log('高优先级处理器执行')
    next() // 继续传递给下一个处理器
  },
  { priority: 100 } // 数值越小，优先级越高
)

// 低优先级处理器，后执行
export const lowPriorityHandler = karin.accept(
  'notice.groupMemberAdd',
  (ctx, next) => {
    console.log('低优先级处理器执行')
    // 不调用 next()，事件处理到此结束
    next()
  },
  { priority: 200 }
)
```

### 指定适配器

可以使用 `adapter` 或 `dsbAdapter` 选项指定处理器在哪些适配器上生效：

```ts twoslash
import { karin } from 'node-karin'

// 仅在 QQ 适配器上生效
export const qqOnlyHandler = karin.accept(
  'request.friendApply',
  (ctx, next) => {
    console.log('仅处理 QQ 好友申请')
    return next()
  },
  { adapter: ['qqbot'] }
)
```

## 注意事项

1. 通知和请求事件的详细信息请参考 [事件文档](../event/index.md)
2. 优先级较高的处理器可以通过不调用 `next()` 来阻止后续处理器执行
3. 处理器函数可以是异步的，支持 `async/await` 语法
4. 事件处理器应当尽量处理异常情况，避免因错误导致机器人功能中断
5. 多个插件处理同一事件时，请合理设置优先级，避免冲突
