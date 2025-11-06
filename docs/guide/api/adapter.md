---
title: 🔌 适配器 API 接口
createTime: 2025/05/24 00:03:09
---

此篇介绍了适配器API的基本接口，所有适配器都会实现 `AdapterType` 基类中定义的这些方法。开发者可以通过这些统一的接口，实现跨平台的机器人功能开发。

## 适配器基本信息

每个适配器实例都包含以下基本属性：

| 属性       | 类型          | 描述                            |
| ---------- | ------------- | ------------------------------- |
| `super`    | `any`         | 原生方法                        |
| `raw`      | `any`         | 原生方法                        |
| `sendApi?` | `Function`    | onebot专属方法，用于发送API请求 |
| `adapter`  | `AdapterInfo` | 适配器信息                      |
| `account`  | `AccountInfo` | 账号信息                        |

## 适配器API分类

以下是适配器API的分类表格，按功能进行了归类整理。
随时间推移可能会有调整。

### 基础信息获取

| 方法名      | 参数                                 | 返回值   | 描述                  |
| ----------- | ------------------------------------ | -------- | --------------------- |
| `selfId`    | 无                                   | `string` | 获取Bot的ID           |
| `selfName`  | 无                                   | `string` | 获取Bot的名称         |
| `selfSubId` | `key: string`                        | `string` | 获取Bot的子ID         |
| `logger`    | `level: LoggerLevel, ...args: any[]` | `void`   | 打印当前Bot的专属日志 |

### 消息发送与处理

| 方法名           | 参数                                                                       | 返回值                            | 描述                       |
| ---------------- | -------------------------------------------------------------------------- | --------------------------------- | -------------------------- |
| `sendMsg`        | `contact: Contact, elements: Array<SendElement>, retryCount?: number`      | `Promise<SendMsgResults>`         | 发送消息                   |
| `sendLongMsg`    | `contact: Contact, resId: string`                                          | `Promise<SendMsgResults>`         | 发送长消息                 |
| `sendForwardMsg` | `contact: Contact, elements: Array<NodeElement>, options?: ForwardOptions` | `Promise<{ messageId: string }>`  | 发送合并转发消息           |
| `recallMsg`      | `contact: Contact, messageId: string`                                      | `Promise<boolean>`                | 撤回消息                   |
| `getMsg`         | `contact: Contact, messageId: string`                                      | `Promise<MessageResponse>`        | 获取消息                   |
| `getHistoryMsg`  | `contact: Contact, startMsgSeq: number, count: number`                     | `Promise<Array<MessageResponse>>` | 通过消息序列号获取历史消息 |
| `getHistoryMsg`  | `contact: Contact, startMsgId: string, count: number`                      | `Promise<Array<MessageResponse>>` | 通过消息ID获取历史消息     |
| `getForwardMsg`  | `resId: string`                                                            | `Promise<Array<MessageResponse>>` | 获取合并转发消息           |
| `createResId`    | `contact: Contact, elements: Array<NodeElement>`                           | `Promise<string>`                 | 构造一个资源ID             |
| `setMsgReaction` | `contact: Contact, messageId: string, faceId: number \| string, isSet: boolean`      | `Promise<boolean>`                | 设置消息表情回应           |

> [!note]
> **版本说明**：
> - `setMsgReaction` 的 `faceId` 参数从 v1.11.1 开始支持 `string` 类型

### 群管理

| 方法名                | 参数                                                                                 | 返回值                                     | 描述                 |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ | -------------------- |
| `groupKickMember`     | `groupId: string, targetId: string, rejectAddRequest?: boolean, kickReason?: string` | `Promise<boolean>`                         | 群踢人               |
| `setGroupMute`        | `groupId: string, targetId: string, duration: number`                                | `Promise<boolean>`                         | 禁言群成员           |
| `setGroupAllMute`     | `groupId: string, isBan: boolean`                                                    | `Promise<boolean>`                         | 群全员禁言           |
| `setGroupAdmin`       | `groupId: string, targetId: string, isAdmin: boolean`                                | `Promise<boolean>`                         | 设置群管理员         |
| `setGroupMemberCard`  | `groupId: string, targetId: string, card: string`                                    | `Promise<boolean>`                         | 设置群名片           |
| `setGroupName`        | `groupId: string, groupName: string`                                                 | `Promise<boolean>`                         | 设置群名             |
| `setGroupQuit`        | `groupId: string, isDismiss: boolean`                                                | `Promise<boolean>`                         | 退出群组             |
| `setGroupMemberTitle` | `groupId: string, targetId: string, title: string`                                   | `Promise<boolean>`                         | 设置群专属头衔       |
| `setGroupRemark`      | `groupId: string, remark: string`                                                    | `Promise<boolean>`                         | 设置群备注           |
| `getGroupMuteList`    | `groupId: string`                                                                    | `Promise<Array<GetGroupMuteListResponse>>` | 获取群被禁言用户列表 |

### 群文件管理

| 方法名                   | 参数                                                            | 返回值                                    | 描述                         |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------- | ---------------------------- |
| `uploadFile`             | `contact: Contact, file: string, name: string, folder?: string` | `Promise<boolean>`                        | 上传群文件、私聊文件         |
| `uploadGroupFile`        | `groupId: string, file: string, name?: string`                  | `Promise<boolean>`                        | 上传群文件                   |
| `downloadFile`           | `options?: DownloadFileOptions`                                 | `Promise<DownloadFileResponse>`           | 让协议端下载文件到协议端本地 |
| `createGroupFolder`      | `groupId: string, name: string`                                 | `Promise<CreateGroupFolderResponse>`      | 创建群文件夹                 |
| `renameGroupFolder`      | `groupId: string, folderId: string, name: string`               | `Promise<boolean>`                        | 重命名群文件的文件夹         |
| `delGroupFolder`         | `groupId: string, folderId: string`                             | `Promise<boolean>`                        | 删除群文件的文件夹           |
| `delGroupFile`           | `groupId: string, fileId: string, busId: number`                | `Promise<boolean>`                        | 删除群文件                   |
| `getGroupFileSystemInfo` | `groupId: string`                                               | `Promise<GetGroupFileSystemInfoResponse>` | 获取群文件系统信息           |
| `getGroupFileList`       | `groupId: string, folderId?: string`                            | `Promise<GetGroupFileListResponse>`       | 获取群文件夹下文件列表       |

### 群信息与成员信息

| 方法名                   | 参数                                                   | 返回值                                       | 描述                     |
| ------------------------ | ------------------------------------------------------ | -------------------------------------------- | ------------------------ |
| `getGroupInfo`           | `groupId: string, noCache?: boolean`                   | `Promise<GroupInfo>`                         | 获取群信息               |
| `getGroupList`           | `refresh?: boolean`                                    | `Promise<Array<GroupInfo>>`                  | 获取群列表               |
| `getGroupMemberInfo`     | `groupId: string, targetId: string, refresh?: boolean` | `Promise<GroupMemberInfo>`                   | 获取群成员信息           |
| `getGroupMemberList`     | `groupId: string, refresh?: boolean`                   | `Promise<Array<GroupMemberInfo>>`            | 获取群成员列表           |
| `getGroupHonor`          | `groupId: string`                                      | `Promise<Array<QQGroupHonorInfo>>`           | 获取群荣誉信息           |
| `getGroupHighlights`     | `groupId: string, page: number, pageSize: number`      | `Promise<Array<GetGroupHighlightsResponse>>` | 获取精华消息             |
| `setGroupHighlights`     | `groupId: string, messageId: string, create: boolean`  | `Promise<boolean>`                           | 设置、取消群精华消息     |
| `getNotJoinedGroupInfo?` | `groupId: string`                                      | `Promise<GroupInfo>`                         | 获取陌生群信息           |
| `getAtAllCount`          | `groupId: string`                                      | `Promise<GetAtAllCountResponse>`             | 获取艾特全体成员剩余次数 |

> [!note]
> **版本说明**：
> - `GroupInfo` 接口从 v1.11.0 开始新增 `avatar` 字段，用于获取群头像

### 好友与用户信息

| 方法名              | 参数                                                              | 返回值                     | 描述           |
| ------------------- | ----------------------------------------------------------------- | -------------------------- | -------------- |
| `getStrangerInfo`   | `targetId: string`                                                | `Promise<UserInfo>`        | 获取陌生人信息 |
| `getFriendList`     | `refresh?: boolean`                                               | `Promise<Array<UserInfo>>` | 获取好友列表   |
| `sendLike`          | `targetId: string, count: number`                                 | `Promise<boolean>`         | 发送好友赞     |
| `getAvatarUrl`      | `userId: string, size?: 0 \| 40 \| 100 \| 140`                    | `Promise<string>`          | 获取头像url    |
| `getGroupAvatarUrl` | `groupId: string, size?: 0 \| 40 \| 100 \| 140, history?: number` | `Promise<string>`          | 获取群头像url  |
| `pokeUser`          | `contact: Contact, count?: number`                                | `Promise<boolean>`         | 戳一戳用户     |

### 请求处理

| 方法名                      | 参数                                                         | 返回值             | 描述                   |
| --------------------------- | ------------------------------------------------------------ | ------------------ | ---------------------- |
| `setFriendApplyResult`      | `requestId: string, isApprove: boolean, remark?: string`     | `Promise<boolean>` | 设置好友请求结果       |
| `setGroupApplyResult`       | `requestId: string, isApprove: boolean, denyReason?: string` | `Promise<boolean>` | 设置申请加入群请求结果 |
| `setInvitedJoinGroupResult` | `requestId: string, isApprove: boolean`                      | `Promise<boolean>` | 设置邀请加入群请求结果 |

### 凭证获取

| 方法名           | 参数                                           | 返回值                                             | 描述                 |
| ---------------- | ---------------------------------------------- | -------------------------------------------------- | -------------------- |
| `getCookies`     | `domain: string`                               | `Promise<{ cookie: string }>`                      | 获取 Cookies         |
| `getCredentials` | `domain: string`                               | `Promise<{ cookies: string, csrf_token: number }>` | 获取 QQ 相关接口凭证 |
| `getCSRFToken`   | `domain: string`                               | `Promise<{ token: number }>`                       | 获取 CSRF Token      |
| `getHttpCookies` | `appid: string, daid: string, jumpUrl: string` | `Promise<{ cookie: string }>`                      | 获取 HTTP Cookies    |

## 使用示例

### 获取适配器实例

使用前请先知道如何获取到适配器实例。分为被动事件提供和主动获取。

> * 在被动事件中一般为 `e.bot` ，注册后的适配器实例会在每个事件对象中提供。
> * 在主动事件中需要自行调用对应方法进行获取，详情查看 [获取机器人实例](./bot.md#获取机器人实例)

以下是一些常用API的主动调用示例：

### 发送消息

```ts twoslash
import type { AdapterType, Contact, SendMsgResults } from 'node-karin'
// ---cut---
import { segment } from 'node-karin'

// ---cut-start---
/**
 * 发送文本消息的函数类型
 * @param _ 适配器实例
 * @param contact 联系人信息
 * @param text 要发送的文本内容
 * @returns Promise 包含发送结果
 */
type fn1 = (_: AdapterType, contact: Contact, text: string) => Promise<SendMsgResults>

/**
 * 发送图片消息的函数类型
 * @param _ 适配器实例
 * @param contact 联系人信息
 * @param imagePath 图片文件路径
 * @returns Promise 包含发送结果
 */
type fn2 = (_: AdapterType, contact: Contact, imagePath: string) => Promise<SendMsgResults>
// ---cut-end---
const sendTextMessage: fn1 = async (_, contact, text) => {
  const result = await _.sendMsg(contact, [segment.text(text)])
  console.log('消息发送结果:', result.messageId)
  return result
}

const sendImageMessage: fn2 = async (_, contact, imagePath) => {
  const result = await _.sendMsg(contact, [segment.image(imagePath)])
  return result
}
```

### 获取群信息

```ts twoslash
import type { AdapterType, Contact, SendMsgResults } from 'node-karin'
import { segment } from 'node-karin'
// ---cut---
const getGroupInfoExample = async (_: AdapterType, groupId: string) => {
  const groupInfo = await _.getGroupInfo(groupId)
  console.log(`群名称: ${groupInfo.groupName}`)
  console.log(`群成员数: ${groupInfo.memberCount}`)
  console.log(`群主ID: ${groupInfo.owner}`)
  // v1.11.0+ 新增 avatar 字段
  if (groupInfo.avatar) {
    console.log(`群头像: ${groupInfo.avatar}`)
  }
}
```

### 处理群管理

```ts twoslash
import type { AdapterType, Contact, SendMsgResults } from 'node-karin'
import { segment } from 'node-karin'
// ---cut---
/**
 * 禁言群成员
 * @param groupId 群ID
 * @param targetId 被禁言目标的ID 任选其一
 * @param duration 禁言时长 单位:秒
 * @returns 此接口的返回值不值得信任
 */
const muteGroupMember = async (_: AdapterType, groupId: string, userId: string, duration: number) => {
  // duration单位为秒
  const result = await _.setGroupMute(groupId, userId, duration)
  return result
}

/**
 * 设置群名片
 * @param groupId 群ID
 * @param targetId 目标用户的ID
 * @param card 新的群名片
 * @returns 此接口的返回值不值得信任
 */
const setMemberNickname = async (_: AdapterType, groupId: string, userId: string, nickname: string) => {
  const result = await _.setGroupMemberCard(groupId, userId, nickname)
  return result
}
```

### 处理好友请求

```ts twoslash
import type { AdapterType, Contact, SendMsgResults } from 'node-karin'

// ---cut---
/**
 * 设置好友请求结果
 * @param requestId 请求事件ID
 * @param isApprove 是否同意
 * @param remark 好友备注 同意时有效
 * @returns 设置结果
 */
const handleFriendRequest = async (_: AdapterType, requestId: string, approve: boolean, remark = '') => {
  const result = await _.setFriendApplyResult(requestId, approve, remark)
  return result
}
```

## 注意事项

1. 不同平台的适配器可能对某些API的实现有所差异，部分API可能在特定平台不可用。
2. 部分API的返回值可能不可靠，文档中已标注"此接口的返回值不值得信任"的方法需要谨慎处理返回结果。
3. 在使用文件相关API时，请确保路径正确且有足够的权限。
4. 部分API仅在特定协议端（如QQ）可用，使用前请确认当前适配器是否支持。
