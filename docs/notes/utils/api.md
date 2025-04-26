---
title: api
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/api/
---
# 公开 API 列表

::: warning 注意
需要注意的是 并非所有的`API`都是已实现的  
将在后续注明各适配器的支持情况
:::

|          API 名称           |                备注                |
| :-------------------------: | :--------------------------------: |
|          `logger`           |      打印当前 Bot 的专属日志       |
|          `sendMsg`          |              发送消息              |
|        `sendLongMsg`        |             发送长消息             |
|      `sendForwardMsg`       |          发送合并转发消息          |
|         `recallMsg`         |     撤回消息，返回值不值得信任     |
|       `getAvatarUrl`        |            获取头像 URL            |
|     `getGroupAvatarUrl`     |           获取群头像 URL           |
|          `getMsg`           |              获取消息              |
|       `getHistoryMsg`       |            获取历史消息            |
|       `getForwardMsg`       |          获取合并转发消息          |
|    `getGroupHighlights`     |           获取群精华消息           |
|        `createResId`        |      构造资源 ID，不发送消息       |
|    `setGgroupHighlights`    |        设置或取消群精华消息        |
|         `sendLike`          |             发送好友赞             |
|      `groupKickMember`      | 群踢人，支持理由与拒绝再次申请选项 |
|       `setGroupMute`        |             禁言群成员             |
|      `setGroupAllMute`      |            设置全员禁言            |
|       `setGroupAdmin`       |         设置或取消群管理员         |
|    `setGroupMemberCard`     |             设置群名片             |
|       `setGroupName`        |              设置群名              |
|       `setGroupQuit`        |          退出群组或解散群          |
|    `setGroupMemberTitle`    |     设置群专属头衔，仅群主可用     |
|      `getStrangerInfo`      |           获取陌生人信息           |
|       `getFriendList`       |            获取好友列表            |
|       `getGroupInfo`        |             获取群信息             |
|       `getGroupList`        |             获取群列表             |
|    `getGroupMemberInfo`     |           获取群成员信息           |
|    `getGroupMemberList`     |           获取群成员列表           |
|       `getGroupHonor`       |           获取群荣誉信息           |
|   `setFriendApplyResult`    |          设置好友请求结果          |
|    `setGroupApplyResult`    |         设置加入群请求结果         |
| `setInvitedJoinGroupResult` |           设置群邀请结果           |
|      `setMsgReaction`       |          设置消息表情回应          |
|        `uploadFile`         |        上传群文件或私聊文件        |
|       `downloadFile`        |        下载文件到协议端本地        |
|     `createGroupFolder`     |            创建群文件夹            |
|     `renameGroupFolder`     |           重命名群文件夹           |
|      `delGroupFolder`       |            删除群文件夹            |
|      `uploadGroupFile`      |             上传群文件             |
|       `delGroupFile`        |             删除群文件             |
|  `getGroupFileSystemInfo`   |         获取群文件系统信息         |
|     `getGroupFileList`      |       获取群文件夹下文件列表       |
|      `setGroupRemark`       |             设置群备注             |
|   `getNotJoinedGroupInfo`   |           获取陌生群信息           |
|       `getAtAllCount`       |        获取全体艾特剩余次数        |
|     `getGroupMuteList`      |        获取群被禁言用户列表        |
|         `pokeUser`          |             戳一戳用户             |
|        `getCookies`         |            获取 Cookies            |
|      `getCredentials`       |          获取相关接口凭证          |
|       `getCSRFToken`        |          获取 CSRF Token           |
|      `getHttpCookies`       |         获取 HTTP Cookies          |

## 调用示例

::: tip 提示
调用方式一共有两种，一种是在被动事件中调用，一种是主动调用
:::

### 被动事件中调用

> [!IMPORTANT] 温馨提示
> 以上所有`API`都可以通过`e.bot`进行调用

```js twoslash
import karin from 'node-karin'

export const api = karin.command(/^api$/, async (e) => {
  const result = await e.bot.getAvatarUrl(e.userId)
  // => 你的头像链接为: https://q.qlogo.cn/headimg_dl?dst_uin=1072411694&spec=100
  await e.reply(`你的头像链接为: ${result}`)
  return true
}, { name: '调用api测试' })
```

### 主动调用

> [!IMPORTANT] 温馨提示
> 以上所有`API`都可以通过获取到的`bot`对象进行调用

```js twoslash
import karin from 'node-karin'

const selfId = '123456789' // bot的id
const bot = karin.getBot(selfId) // 注意可能是`null`，请自行处理
const result = await bot.getAvatarUrl(selfId)
// => 你的头像链接为: https://q.qlogo.cn/headimg_dl?dst_uin=123456789&spec=100
```

## API 参数和调用

::: warning 注意
这里的调用示例默认使用`e.bot`进行调用  
只展示调用`Api`的方式，请自行替代到上方的`调用示例`中  
返回值: 均使用`result`进行展示
:::

### `logger`

> 打印当前 Bot 的专属日志

|   参数    |   类型   |   描述   |                            备注                            |
| :-------: | :------: | :------: | :--------------------------------------------------------: |
|  `level`  | `string` | 日志等级 | `all` `trace` `debug` `mark` `info` `warn` `error` `fatal` |
| `...args` | `any[]`  | 日志内容 |                                                            |

::: code-group

```ts twoslash [调用示例]
import { Message } from 'node-karin'
const e = {} as Message
// ---cut-before---
const result = await e.bot.logger('info', '这是一条info日志')
```

```js [返回值]
// 此接口无返回值
```

:::

### `sendMsg`

> 发送消息

|     参数     |       类型       |   描述   |                               备注                               |
| :----------: | :--------------: | :------: | :--------------------------------------------------------------: |
|  `contact`   |    `Contact`     | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
|  `elements`  | `Array<Element>` | 消息元素 |                            注意是数组                            |
| `retryCount` |     `number`     | 重试次数 |                               可选                               |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
const e = {} as Message
const elements = [segment.text('Hello, world!')]
// ---cut-before---
const result = await e.bot.sendMsg(e.contact, elements)
```

```ts [返回值]
/** 发送消息后返回的结果 */
export interface SendMsgResults {
  /** @deprecated 已废弃 请使用 `messageId` */
  message_id: string
  /** 消息ID */
  messageId: string
  /** 消息发送时间戳 */
  messageTime: number
  /** 原始结果 一般是Object、Array */
  rawData: object | Array<any>
}
```

:::

### `sendLongMsg`

> 发送长消息

|   参数    |   类型    |   描述   |                               备注                               |
| :-------: | :-------: | :------: | :--------------------------------------------------------------: |
| `contact` | `Contact` | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
|  `resId`  | `string`  | 资源 ID  |                                                                  |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
const e = {} as Message
// ---cut-before---
const resId = 'abcdefg'
const result = await e.bot.sendLongMsg(e.contact, resId)
```

```js [返回值]
/** 发送消息后返回的结果 */
export interface SendMsgResults {
  /** @deprecated 已废弃 请使用 `messageId` */
  message_id: string;
  /** 消息ID */
  messageId: string;
  /** 消息发送时间戳 */
  messageTime: number;
  /** 原始结果 一般是Object、Array */
  rawData: object | Array<any>;
}
```

:::

### `sendForwardMsg`

> 发送合并转发消息

|    参数    |       类型       |   描述   |                               备注                               |
| :--------: | :--------------: | :------: | :--------------------------------------------------------------: |
| `contact`  |    `Contact`     | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `elements` | `Array<Element>` | 消息元素 |                                                                  |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment, common } from 'node-karin'
const e = {} as Message
// ---cut-before---
const list = [segment.text('1'), segment.text('2'), segment.text('3')]
const elements = common.makeForward(list, e.selfId, e.bot.account.name)
const result = await e.bot.sendForwardMsg(e.contact, elements)
```

```ts [返回值]
{
  /** 消息ID */
  messageId: string
}
```

:::

### `recallMsg`

> 撤回消息，返回值不值得信任

|    参数     |   类型    |   描述   |                               备注                               |
| :---------: | :-------: | :------: | :--------------------------------------------------------------: |
|  `contact`  | `Contact` | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `messageId` | `string`  | 消息 ID  |                                                                  |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment, common } from 'node-karin'
const e = {} as Message
// ---cut-before---
const messageId = '123456789'
const result = await e.bot.recallMsg(e.contact, messageId)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `getAvatarUrl`

> 获取头像 URL

|   参数   |   类型   |   描述   |  备注   |
| :------: | :------: | :------: | :-----: |
| `userId` | `string` | 用户 ID  |         |
|  `size`  | `number` | 头像大小 | 默认`0` |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment, common } from 'node-karin'
const e = {} as Message
// ---cut-before---
const userId = '123456'
const result = await e.bot.getAvatarUrl(userId)
```

```js [返回值]
// 返回值为string类型
```

:::

### `getGroupAvatarUrl`

> 获取群头像 URL

|   参数    |   类型   |   描述   |  备注   |
| :-------: | :------: | :------: | :-----: |
| `groupId` | `string` |   群号   |         |
|  `size`   | `number` | 头像大小 | 默认`0` |
| `history` | `number` | 历史头像 | 默认`0` |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const size = 0
const history = 0
// ---cut-before---
const result = await e.bot.getGroupAvatarUrl(e.groupId, size, history)
```

```js [返回值]
// 返回值为string类型
```

:::

### `getMsg`

> 获取消息

|    参数     |   类型    |   描述   |                               备注                               |
| :---------: | :-------: | :------: | :--------------------------------------------------------------: |
|  `contact`  | `Contact` | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `messageId` | `string`  | 消息 ID  |                                                                  |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
// ---cut-before---
const result = await e.bot.getMsg(e.contact, e.messageId)
```

```ts twoslash [返回值]
import { ElementTypes, Contact, GroupSender } from 'node-karin'
// ---cut-before---
/** 基本消息返回值结构 */
export interface MessageResponse {
  /** 消息发送时间 */
  time: number
  /** 消息ID */
  messageId: string
  /** 消息序列号 */
  messageSeq: number
  /** 消息来源目标信息 */
  contact: Contact // 与传入的contact相同
  /** 消息发送者 */
  sender: GroupSender // 请查看发送者结构
  /** 消息元素 */
  elements: Array<ElementTypes>
}
// 关于ElementTypes类型请自行查看`segment`文档
```

:::

### `getHistoryMsg`

> 获取历史消息

|     参数     |   类型    |   描述   |                               备注                               |
| :----------: | :-------: | :------: | :--------------------------------------------------------------: |
|  `contact`   | `Contact` | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `startMsgId` | `string`  | 起始消息 |                                                                  |
|   `count`    | `number`  | 消息数量 |                             默认`1`                              |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
// ---cut-before---
const startMsgId = '123456789'
const count = 10
const result = await e.bot.getHistoryMsg(e.contact, startMsgId, count)
```

```ts twoslash [返回值]
import { MessageResponse } from 'node-karin'
// ---cut-before---
// 此处反面返回值结构为数组`MessageResponse`
Array<MessageResponse>
```

:::

### `getForwardMsg`

> 获取合并转发消息 **暂时无法使用**

|  参数   |   类型   |  描述   | 备注 |
| :-----: | :------: | :-----: | :--: |
| `resId` | `string` | 资源 ID |      |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
// ---cut-before---
const resId = 'abcdefg'
const result = await e.bot.getForwardMsg(resId)
```

```js [返回值]
// 接口返回值错误，接口暂时无法使用
```

:::

### `getGroupHighlights`

> 获取群精华消息

|    参数    |   类型   |   描述   | 备注 |
| :--------: | :------: | :------: | :--: |
| `groupId`  | `string` |  群 ID   |      |
|   `page`   | `number` |   页码   |      |
| `pageSize` | `number` | 每页数量 |      |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const page = 1
const pageSize = 10
// ---cut-before---
const result = await e.bot.getGroupHighlights(groupId, page, pageSize)
```

```js [返回值]
/** 获取精华消息返回值结构 */
export interface GetGroupHighlightsResponse {
  /** 群ID */
  groupId: string
  /** 消息发送者ID */
  senderId: string
  /** 发送者昵称 */
  senderName: string
  /** 操作者ID */
  operatorId: string
  /** 操作者昵称 */
  operatorName: string
  /** 操作时间 */
  operationTime: number
  /** 消息发送时间 */
  messageTime: number
  /** 消息ID */
  messageId: string
  /** 消息序列号 */
  messageSeq: number
  /** 被设置的精华消息元素文本 */
  jsonElements: string
}

// 返回值为 `Array<GetGroupHighlightsResponse>`
```

:::

### `createResId`

> 构造资源 ID，不发送消息

|    参数    |           类型           |   描述   |                               备注                               |
| :--------: | :----------------------: | :------: | :--------------------------------------------------------------: |
| `contact`  |        `Contact`         | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `elements` | `Array<NodeElementType>` | 消息元素 |                                                                  |

::: code-group

```ts twoslash [调用示例]
import karin, { GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const list = [segment.text('1'), segment.text('2'), segment.text('3')]
const elements = common.makeForward(list, e.selfId, e.bot.account.name)
// ---cut-before---
const result = await e.bot.createResId(e.contact, elements)
```

```js [返回值]
// 返回值为string类型
```

:::

### `setGgroupHighlights`

> 设置或取消群精华消息

|    参数     |   类型    |   描述   |    备注    |
| :---------: | :-------: | :------: | :--------: |
|  `groupId`  | `string`  |  群 ID   |            |
| `messageId` | `string`  | 消息 ID  |            |
|  `create`   | `boolean` | 是否创建 | 默认`true` |

::: code-group

```ts twoslash [调用示例]
import karin, { GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const messageId = 'abcdefg'
const create = true
// ---cut-before---
const result = await e.bot.setGgroupHighlights(groupId, messageId, create)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `sendLike`

> 发送好友赞

|    参数    |   类型   |   描述   |   备注   |
| :--------: | :------: | :------: | :------: |
| `targetId` | `string` | 目标 ID  |          |
|  `count`   | `number` | 赞的次数 | 默认`10` |

::: code-group

```ts twoslash [调用示例]
import karin, { GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const targetId = '123456'
const count = 10
// ---cut-before---
const result = await e.bot.sendLike(targetId, count)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `groupKickMember`

> 群踢人

|        参数        |   类型    |     描述     |    备注     |
| :----------------: | :-------: | :----------: | :---------: |
|     `groupId`      | `string`  |    群 ID     |             |
|     `targetId`     | `string`  |   目标 ID    |             |
| `rejectAddRequest` | `boolean` | 拒绝再次申请 | 默认`false` |
|    `kickReason`    | `string`  |   踢出原因   |    可选     |

::: code-group

```ts twoslash [调用示例]
import karin, { GroupMessage, segment, common } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const rejectAddRequest = false
const kickReason = '测试踢人'
// ---cut-before---
const result = await e.bot.groupKickMember(groupId, targetId, rejectAddRequest, kickReason)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupMute`

> 禁言群成员

|    参数    |   类型   |   描述   |  备注   |
| :--------: | :------: | :------: | :-----: |
| `groupId`  | `string` |  群 ID   |         |
| `targetId` | `string` | 目标 ID  |         |
| `duration` | `number` | 禁言时长 | 单位:秒 |

::: code-group

```ts twoslash [调用示例]
import karin, { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const duration = 60 * 60 * 24 // 禁言一天
// ---cut-before---
const result = await e.bot.setGroupMute(groupId, targetId, duration)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupAllMute`

> 设置全员禁言

|   参数    |   类型    |   描述   | 备注 |
| :-------: | :-------: | :------: | :--: |
| `groupId` | `string`  |  群 ID   |      |
|  `isBan`  | `boolean` | 是否禁言 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const isBan = true
// ---cut-before---
const result = await e.bot.setGroupAllMute(groupId, isBan)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupAdmin`

> 设置或取消群管理员

|    参数    |   类型    |    描述    | 备注 |
| :--------: | :-------: | :--------: | :--: |
| `groupId`  | `string`  |   群 ID    |      |
| `targetId` | `string`  |  目标 ID   |      |
| `isAdmin`  | `boolean` | 是否管理员 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const isAdmin = true
// ---cut-before---
const result = await e.bot.setGroupAdmin(groupId, targetId, isAdmin)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupMemberCard`

> 设置群名片

|    参数    |   类型   |  描述   | 备注 |
| :--------: | :------: | :-----: | :--: |
| `groupId`  | `string` |  群 ID  |      |
| `targetId` | `string` | 目标 ID |      |
|   `card`   | `string` | 群名片  |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const card = '测试群名片'
// ---cut-before---
const result = await e.bot.setGroupMemberCard(groupId, targetId, card)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupName`

> 设置群名

|    参数     |   类型   | 描述  | 备注 |
| :---------: | :------: | :---: | :--: |
|  `groupId`  | `string` | 群 ID |      |
| `groupName` | `string` | 群名  |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const groupName = '测试群名'
// ---cut-before---
const result = await e.bot.setGroupName(groupId, groupName)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupQuit`

> 退出群组

|    参数     |   类型    |   描述   | 备注 |
| :---------: | :-------: | :------: | :--: |
|  `groupId`  | `string`  |  群 ID   |      |
| `isDismiss` | `boolean` | 是否解散 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const isDismiss = false
// ---cut-before---
const result = await e.bot.setGroupQuit(groupId, isDismiss)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupMemberTitle`

> 设置群专属头衔

|    参数    |   类型   |   描述   | 备注 |
| :--------: | :------: | :------: | :--: |
| `groupId`  | `string` |  群 ID   |      |
| `targetId` | `string` | 目标 ID  |      |
|  `title`   | `string` | 专属头衔 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const title = '测试头衔'
// ---cut-before---
const result = await e.bot.setGroupMemberTitle(groupId, targetId, title)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `getStrangerInfo`

> 获取陌生人信息

|    参数    |   类型   |  描述   | 备注 |
| :--------: | :------: | :-----: | :--: |
| `targetId` | `string` | 用户 ID |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const targetId = '123456'
// ---cut-before---
const result = await e.bot.getStrangerInfo(targetId)
```

```ts [返回值]
/**
 * 用户信息结构
 * @description 此接口仅可保证返回user_id、nick这两个字段
 */
export interface UserInfo {
  /** 用户ID */
  userId: string
  /** 名称 */
  nick: string
  /** 用户UID */
  uid: string
  /** 用户UIN */
  uin: string
  /** qid */
  qid?: string
  /** 备注 */
  remark?: string
  /** 用户等级 */
  level?: number
  /** 生日 */
  birthday?: string
  /** 登录天数 */
  loginDay?: number
  /** 点赞数 */
  likeCount?: number
  /** 学校是否已核实 */
  isSchoolVerified?: boolean
  /** 年龄 */
  age?: number
  /** 性别 */
  sex?: SexEnum
  /** 好莱坞/腾讯视频会员 */
  hollywoodVip?: boolean
  /** QQ会员 */
  qqVip?: boolean
  /** QQ超级会员 */
  qqSvip?: boolean
  /** 大会员 */
  bigVip?: boolean
  /** 是否已经赞过 */
  isLike?: boolean
  [key: string]: any
}
```

:::

### `getFriendList`

> 获取好友列表

|   参数    |   类型    |       描述       | 备注 |
| :-------: | :-------: | :--------------: | :--: |
| `refresh` | `boolean` | 是否刷新好友列表 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const refresh = false
// ---cut-before---
const result = await e.bot.getFriendList(refresh)
```

```js [返回值]
// 返回值为`API-getStrangerInfo`的数组结构
// 比如`API-getStrangerInfo`的返回值是UserInfo，那么此处的返回值就是`Array<UserInfo>`
```

:::

### `getGroupInfo`

> 获取群信息

|   参数    |   类型    |     描述     | 备注 |
| :-------: | :-------: | :----------: | :--: |
| `groupId` | `string`  |    群 ID     |      |
| `noCache` | `boolean` | 是否刷新缓存 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const noCache = true
// ---cut-before---
const result = await e.bot.getGroupInfo(groupId, noCache)
```

```ts [返回值]
/**
 * 群信息结构
 * @description 此接口仅可保证返回group_id这个字段
 */
export interface GroupInfo {
  /** 群ID */
  groupId: string
  /** 群名称 */
  groupName?: string
  /** 群主ID */
  owner?: string
  /** 群备注 */
  groupRemark?: string
  /** 群管理员ID列表 */
  admins?: Array<string>
  /** 最大成员数 */
  maxMemberCount?: number
  /** 当前成员数 */
  memberCount?: number
  /** 群描述 */
  groupDesc?: string
}
```

:::

### `getGroupList`

> 获取群列表

|   参数    |   类型    |      描述      | 备注 |
| :-------: | :-------: | :------------: | :--: |
| `refresh` | `boolean` | 是否刷新群列表 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const refresh = false
// ---cut-before---
const result = await e.bot.getGroupList(refresh)
```

```js [返回值]
// 返回值为`API-getGroupInfo`的数组结构
// 比如`API-getGroupInfo`的返回值是GroupInfo，那么此处的返回值就是`Array<GroupInfo>`
```

:::

### `getGroupMemberInfo`

> 获取群成员信息

|    参数    |   类型    |     描述     | 备注 |
| :--------: | :-------: | :----------: | :--: |
| `groupId`  | `string`  |    群 ID     |      |
| `targetId` | `string`  | 目标用户 ID  |      |
| `refresh`  | `boolean` | 是否刷新缓存 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456'
const targetId = 'abcdefg'
const refresh = true
// ---cut-before---
const result = await e.bot.getGroupMemberInfo(groupId, targetId, refresh)
```

```ts [返回值]
/**
 * 群成员信息
 * @description 此接口仅可保证返回user_id这个字段
 */
export interface GroupMemberInfo {
  /** 用户ID */
  userId: string
  /** 用户角色 */
  role?: RoleEnum
  /** 用户昵称 */
  nick?: string
  /** 年龄 */
  age?: number
  /** 群内头衔 */
  uniqueTitle?: string
  /** 群名片 */
  card?: string
  /** 加群时间 */
  joinTime?: number
  /** 最后活跃时间 */
  lastActiveTime?: number
  /** 用户等级 */
  level?: number
  /** 禁言时间 */
  shutUpTime?: number
  /** 距离 */
  distance?: number
  /** 荣誉列表 */
  honors?: Array<number>
  /** 是否好友 */
  unfriendly?: boolean
}
```

:::

### `getGroupMemberList`

> 获取群成员列表

|   参数    |   类型    |     描述     | 备注 |
| :-------: | :-------: | :----------: | :--: |
| `groupId` | `string`  |    群 ID     |      |
| `refresh` | `boolean` | 是否刷新缓存 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const refresh = true
// ---cut-before---
const result = await e.bot.getGroupMemberList(groupId, refresh)
```

```js [返回值]
// 返回值为`API-getGroupMemberInfo`的数组结构
// 比如`API-getGroupMemberInfo`的返回值是GroupMemberInfo，那么此处的返回值就是`Array<GroupMemberInfo>`
```

:::

### `getGroupHonor`

> 获取群荣誉信息

|   参数    |   类型   | 描述  | 备注 |
| :-------: | :------: | :---: | :--: |
| `groupId` | `string` | 群 ID |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
// ---cut-before---
const result = await e.bot.getGroupHonor(groupId)
```

```js [返回值]
/**
 * 群荣誉信息
 * @description 此接口仅可在QQ协议端中使用
 */
export interface QQGroupHonorInfo {
  /** 荣誉成员ID */
  userId: string
  /** 荣誉成员昵称 */
  nick: string
  /** 荣誉名称 */
  honorName: string
  /** 荣誉图标url */
  avatar: string
  /** 荣誉id */
  id: number
  /** 荣誉描述 */
  description: string
}
// 返回值为`Array<QQGroupHonorInfo>`
```

:::

### `setFriendApplyResult`

> 设置好友请求结果

|    参数     |   类型    |    描述     | 备注 |
| :---------: | :-------: | :---------: | :--: |
| `requestId` | `string`  | 请求事件 ID |      |
| `isApprove` | `boolean` |  是否同意   |      |
|  `remark`   | `string`  |  好友备注   | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const requestId = '123456789'
const isApprove = true
const remark = '测试备注'
// ---cut-before---
const result = await e.bot.setFriendApplyResult(requestId, isApprove, remark)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setGroupApplyResult`

> 设置申请加入群请求结果

|     参数     |   类型    |    描述     | 备注 |
| :----------: | :-------: | :---------: | :--: |
| `requestId`  | `string`  | 请求事件 ID |      |
| `isApprove`  | `boolean` |  是否同意   |      |
| `denyReason` | `string`  |  拒绝理由   | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const requestId = '123456789'
const isApprove = true
const denyReason = '不给你进来 ~'
// ---cut-before---
const result = await e.bot.setGroupApplyResult(requestId, isApprove, denyReason)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setInvitedJoinGroupResult`

> 设置邀请加入群请求结果

|    参数     |   类型    |    描述     | 备注 |
| :---------: | :-------: | :---------: | :--: |
| `requestId` | `string`  | 请求事件 ID |      |
| `isApprove` | `boolean` |  是否同意   |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const requestId = '123456789'
const isApprove = true
// ---cut-before---
const result = await e.bot.setInvitedJoinGroupResult(requestId, isApprove)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `setMsgReaction`

> 设置消息表情回应

|    参数     |   类型    |   描述   |                               备注                               |
| :---------: | :-------: | :------: | :--------------------------------------------------------------: |
|  `contact`  | `Contact` | 目标信息 | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
| `messageId` | `string`  | 消息 ID  |                                                                  |
|  `faceId`   | `number`  | 表情 ID  |                                                                  |
|   `isSet`   | `boolean` | 是否设置 |                                                                  |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const messageId = '123456789'
const faceId = 1
const isSet = true
// ---cut-before---
const result = await e.bot.setMsgReaction(e.contact, messageId, faceId, isSet)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `uploadFile`

> 上传群文件或私聊文件

|   参数    |   类型    |     描述     |                               备注                               |
| :-------: | :-------: | :----------: | :--------------------------------------------------------------: |
| `contact` | `Contact` |   目标信息   | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
|  `file`   | `string`  | 本地文件路径 |                                                                  |
|  `name`   | `string`  |   文件名称   |                                                                  |
| `folder`  | `string`  |  父目录 ID   |                               可选                               |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const file = 'C:/test.jpg'
const name = 'test.jpg'
const folder = '123456789'
// ---cut-before---
const result = await e.bot.uploadFile(e.contact, file, name, folder)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `downloadFile`

> 下载文件到协议端本地

|   参数    |         类型          |   描述   | 备注 |
| :-------: | :-------------------: | :------: | :--: |
| `options` | `DownloadFileOptions` | 下载选项 | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage, DownloadFileOptions } from 'node-karin'
const e = {} as GroupMessage
const options: DownloadFileOptions = {
  url: 'https://example.com/file.zip',
}
// ---cut-before---
const result = await e.bot.downloadFile(options)
```

```js [返回值]
/** 让协议端下载文件到协议端本地返回值结构 */
export interface DownloadFileResponse {
  /** 下载后文件的绝对路径 */
  filePath: string;
}
```

:::

### `createGroupFolder`

> 创建群文件夹

|   参数    |   类型   |   描述   | 备注 |
| :-------: | :------: | :------: | :--: |
| `groupId` | `string` |   群号   |      |
|  `name`   | `string` | 文件夹名 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const name = '测试文件夹'
// ---cut-before---
const result = await e.bot.createGroupFolder(groupId, name)
```

```js [返回值]
/** 创建群文件夹返回值结构 */
export interface CreateGroupFolderResponse {
  /** 文件夹ID */
  id: string
  /** 已使用空间 */
  usedSpace: string
}
```

:::

### `renameGroupFolder`

> 重命名群文件夹

|    参数    |   类型   |   描述    | 备注 |
| :--------: | :------: | :-------: | :--: |
| `groupId`  | `string` |   群号    |      |
| `folderId` | `string` | 文件夹 ID |      |
|   `name`   | `string` | 文件夹名  |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const folderId = '1234567890'
const name = '测试重命名文件夹'
// ---cut-before---
const result = await e.bot.renameGroupFolder(groupId, folderId, name)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `delGroupFolder`

> 删除群文件夹

|    参数    |   类型   |   描述    | 备注 |
| :--------: | :------: | :-------: | :--: |
| `groupId`  | `string` |   群号    |      |
| `folderId` | `string` | 文件夹 ID |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const folderId = '1234567890'
// ---cut-before---
const result = await e.bot.delGroupFolder(groupId, folderId)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `uploadGroupFile`

> 上传群文件

|   参数    |   类型   |   描述   | 备注 |
| :-------: | :------: | :------: | :--: |
| `groupId` | `string` |   群号   |      |
|  `file`   | `string` | 文件路径 |      |
|  `name`   | `string` |  文件名  | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const file = 'C:/test.jpg'
const name = 'test.jpg'
// ---cut-before---
const result = await e.bot.uploadGroupFile(groupId, file, name)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `delGroupFile`

> 删除群文件

|   参数    |   类型   |    描述     | 备注 |
| :-------: | :------: | :---------: | :--: |
| `groupId` | `string` |    群号     |      |
| `fileId`  | `string` |   文件 ID   |      |
|  `busId`  | `number` | 文件类型 ID |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const fileId = '1234567890'
const busId = 1
const result = await e.bot.delGroupFile(groupId, fileId, busId)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `getGroupFileSystemInfo`

> 获取群文件系统信息

|   参数    |   类型   | 描述 | 备注 |
| :-------: | :------: | :--: | :--: |
| `groupId` | `string` | 群号 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
// ---cut-before---
const result = await e.bot.getGroupFileSystemInfo(groupId)
```

```ts [返回值]
/** 获取群文件系统信息返回值结构 */
export interface GetGroupFileSystemInfoResponse {
  /** 文件数量 */
  fileCount: number
  /** 文件夹数量 */
  totalCount: number
  /** 已使用空间 */
  usedSpace: number
  /** 总空间 */
  totalSpace: number
}
```

:::

### `getGroupFileList`

> 获取群文件夹下文件列表

|    参数    |   类型   |   描述    | 备注 |
| :--------: | :------: | :-------: | :--: |
| `groupId`  | `string` |   群号    |      |
| `folderId` | `string` | 文件夹 ID | 可选 |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const folderId = '1234567890'
// ---cut-before---
const result = await e.bot.getGroupFileList(groupId, folderId)
```

```ts twoslash [返回值]
import { QQGroupFolderInfo, QQGroupFileInfo } from 'node-karin'
// ---cut-before---
/** 获取群文件夹下文件列表返回值结构 */
export interface GetGroupFileListResponse {
  /** 文件列表 */
  files: QQGroupFileInfo[]
  /** 文件夹列表 */
  folders: QQGroupFolderInfo[]
}
```

:::

### `setGroupRemark`

> 设置群备注

|   参数    |   类型   |   描述   | 备注 |
| :-------: | :------: | :------: | :--: |
| `groupId` | `string` |   群号   |      |
| `remark`  | `string` | 新的备注 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const remark = '测试备注群'
const result = await e.bot.setGroupRemark(groupId, remark)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `getNotJoinedGroupInfo`

> 获取陌生群信息

|   参数    |   类型   | 描述 | 备注 |
| :-------: | :------: | :--: | :--: |
| `groupId` | `string` | 群号 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const result = await e.bot.getNotJoinedGroupInfo!(groupId)
```

```js [返回值]
// 返回值与`API-getGroupInfo`相同
```

:::

### `getAtAllCount`

> 获取全体艾特剩余次数

|   参数    |   类型   | 描述 | 备注 |
| :-------: | :------: | :--: | :--: |
| `groupId` | `string` | 群号 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const result = await e.bot.getAtAllCount(groupId)
```

```ts [返回值]
/** 获取at全体成员剩余次数返回值结构 */
export interface GetAtAllCountResponse {
  /** 是否允许at全体成员 */
  accessAtAll: boolean
  /** 全群剩余次数 */
  groupRemainCount: number
  /** 个人剩余次数 */
  userRremainCount: number
}
```

:::

### `getGroupMuteList`

> 获取群被禁言用户列表

|   参数    |   类型   | 描述 | 备注 |
| :-------: | :------: | :--: | :--: |
| `groupId` | `string` | 群号 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const groupId = '123456789'
const result = await e.bot.getGroupMuteList(groupId)
```

```js [返回值]
/** 获取群被禁言用户列表返回值结构 */
export interface GetGroupMuteListResponse {
  /** 用户ID */
  userId: string
  /** 禁言时间 */
  muteTime: number
}
```

:::

### `pokeUser`

> 戳一戳用户

|   参数    |   类型    |    描述    |                               备注                               |
| :-------: | :-------: | :--------: | :--------------------------------------------------------------: |
| `contact` | `Contact` |  目标信息  | `e.contact` 或 [手动构建](../utils/karin.md#contactgroup) |
|  `count`  | `number`  | 戳一戳次数 |                               可选                               |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const count = 1
// ---cut-before---
const result = await e.bot.pokeUser(e.contact, count)
```

```js [返回值]
// 返回值为boolean类型 此接口的返回值不值得信任
```

:::

### `getCookies`

> 获取 Cookies

|   参数   |   类型   | 描述 | 备注 |
| :------: | :------: | :--: | :--: |
| `domain` | `string` | 域名 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const domain = 'https://example.com'
// ---cut-before---
const result = await e.bot.getCookies(domain)
```

```js [返回值]
{
  cookie: string
}
```

:::

### `getCredentials`

> 获取相关接口凭证

|   参数   |   类型   | 描述 | 备注 |
| :------: | :------: | :--: | :--: |
| `domain` | `string` | 域名 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const domain = 'https://example.com'
// ---cut-before---
const result = await e.bot.getCredentials(domain)
```

```js [返回值]
{ cookies: string, csrf_token: number }
```

:::

### `getCSRFToken`

> 获取 CSRF Token

|   参数   |   类型   | 描述 | 备注 |
| :------: | :------: | :--: | :--: |
| `domain` | `string` | 域名 |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const domain = 'https://example.com'
// ---cut-before---
const result = await e.bot.getCSRFToken(domain)
```

```js [返回值]
{
  token: number
}
```

:::

### `getHttpCookies`

> 获取 HTTP Cookies

|   参数    |   类型   |   描述   | 备注 |
| :-------: | :------: | :------: | :--: |
|  `appid`  | `string` | 应用 ID  |      |
|  `daid`   | `string` |   DAID   |      |
| `jumpUrl` | `string` | 跳转 URL |      |

::: code-group

```ts twoslash [调用示例]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const appid = '123456789'
const daid = '1234567890'
const jumpUrl = 'https://example.com'
// ---cut-before---
const result = await e.bot.getHttpCookies(appid, daid, jumpUrl)
```

```js [返回值]
{
  token: number
}
```

:::

### `sendApi`

> 发送 API 请求 **onebot11 专属**

|   参数   |   类型   |   描述   |      备注      |
| :------: | :------: | :------: | :------------: |
| `action` | `string` |   动作   |                |
| `params` | `object` | 请求参数 |                |
|  `time`  | `number` | 超时时间 | 可选 默认 120s |

::: code-group

```js [js调用]
const result = await e.bot.sendApi(action, params, time)
```

```ts twoslash [ts调用]
import { GroupMessage } from 'node-karin'
const e = {} as GroupMessage
const action = 'get_group_list'
const params = {
  group_id: 123456789,
}
const time = 120
// ---cut-before---
// 多一个`!`...
const result = await e.bot.sendApi!(action, params, time)
```

```js [返回值]
// 返回值`karin`做了处理，协议如果返回请求成功，则会返回其中的`data`字段
// 如果请求失败，则`karin`会抛出异常
```

:::
