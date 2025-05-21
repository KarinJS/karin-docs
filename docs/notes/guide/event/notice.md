---
title: 📢 通知事件
createTime: 2025/05/15 00:40:00
permalink: /guide/49w0mt5c/
---

::: danger
当前页面正在施工中 🚧
:::

## 事件类型

通知事件分为私聊（好友）通知和群聊通知。

#### 私聊通知事件

| 事件名称                       | 描述                           |
| ------------------------------ | ------------------------------ |
| **notice.receiveLike**         | 收到点赞时触发。               |
| **notice.friendDecrease**      | 好友减少时触发（好友被删除）。 |
| **notice.friendIncrease**      | 好友增加时触发（新好友添加）。 |
| **notice.privatePoke**         | 在私聊中收到戳一戳时触发。     |
| **notice.privateRecall**       | 在私聊中消息被撤回时触发。     |
| **notice.privateFileUploaded** | 在私聊中文件上传时触发。       |

```ts twoslash
// @noErrorValidation
import { ReceiveLikeNotice, FriendDecreaseNotice, FriendIncreaseNotice, PrivatePokeNotice, PrivateRecallNotice, PrivateFileUploadedNotice } from 'node-karin'
// ---cut-before---
/** 私聊通知事件对应的对象类型 */
interface FriendNoticeEventMap {
  'notice.receiveLike': ReceiveLikeNotice
  'notice.friendDecrease': FriendDecreaseNotice
  'notice.friendIncrease': FriendIncreaseNotice
  'notice.privatePoke': PrivatePokeNotice
  'notice.privateRecall': PrivateRecallNotice
  'notice.privateFileUploaded': PrivateFileUploadedNotice
}
```

#### 群聊通知事件

| 事件名称                           | 描述                       |
| ---------------------------------- | -------------------------- |
| **notice.groupPoke**               | 在群聊中收到戳一戳时触发。 |
| **notice.groupRecall**             | 在群聊中消息被撤回时触发。 |
| **notice.groupFileUploaded**       | 在群聊中文件上传时触发。   |
| **notice.groupCardChanged**        | 群成员名片变更时触发。     |
| **notice.groupMemberTitleUpdated** | 群成员头衔更新时触发。     |
| **notice.groupHighlightsChanged**  | 群精华消息变更时触发。     |
| **notice.groupMemberIncrease**     | 新成员加入群聊时触发。     |
| **notice.groupMemberDecrease**     | 群成员离开时触发。         |
| **notice.groupAdminChanged**       | 群管理员变更时触发。       |
| **notice.groupSignIn**             | 群签到事件触发。           |
| **notice.groupMemberBan**          | 群成员被禁言时触发。       |
| **notice.groupWholeBan**           | 群全员禁言时触发。         |
| **notice.groupMessageReaction**    | 群消息表情反应时触发。     |
| **notice.groupLuckKing**           | 群运气王事件触发。         |
| **notice.groupHonorChanged**       | 群荣誉变更时触发。         |

```ts twoslash
// @noErrorValidation
import {
  GroupPokeNotice,
  GroupRecallNotice,
  GroupFileUploadedNotice,
  GroupCardChangedNotice,
  GroupMemberTitleUpdatedNotice,
  GroupHlightsChangedNotice,
  GroupMemberIncreaseNotice,
  GroupMemberDecreaseNotice,
  GroupAdminChangedNotice,
  GroupSignInNotice,
  GroupMemberBanNotice,
  GroupWholeBanNotice,
  GroupMessageReactionNotice,
  GroupLuckKingNotice,
  GroupHonorChangedNotice,
} from 'node-karin'
// ---cut-before---

/** 群聊通知事件对应的对象类型 */
export interface GroupNoticeEventMap {
  'notice.groupPoke': GroupPokeNotice
  'notice.groupRecall': GroupRecallNotice
  'notice.groupFileUploaded': GroupFileUploadedNotice
  'notice.groupCardChanged': GroupCardChangedNotice
  'notice.groupMemberTitleUpdate': GroupMemberTitleUpdatedNotice
  'notice.groupHighlightsChange': GroupHlightsChangedNotice
  'notice.groupMemberAdd': GroupMemberIncreaseNotice
  'notice.groupMemberRemove': GroupMemberDecreaseNotice
  'notice.groupAdminChanged': GroupAdminChangedNotice
  'notice.groupSignIn': GroupSignInNotice
  'notice.groupMemberBan': GroupMemberBanNotice
  'notice.groupWholeBan': GroupWholeBanNotice
  'notice.groupMessageReaction': GroupMessageReactionNotice
  'notice.groupLuckyKing': GroupLuckKingNotice
  'notice.groupHonorChange': GroupHonorChangedNotice
}
```

<!-- ### 请求事件

请求事件分为好友请求和群聊请求。

#### 好友请求事件

| 事件类型                | 描述               |
| ----------------------- | ------------------ |
| **PrivateApplyRequest** | 表示好友申请请求。 |

```typescript
export interface FriendRequestEventMap {
  'request.friendApply': PrivateApplyRequest
}
```

#### 群聊请求事件

| 事件类型               | 描述               |
| ---------------------- | ------------------ |
| **GroupApplyRequest**  | 表示群聊申请请求。 |
| **GroupInviteRequest** | 表示群聊邀请请求。 |

```typescript
export interface GroupRequestEventMap {
  'request.groupApply': GroupApplyRequest
  'request.groupInvite': GroupInviteRequest
}
```

### 组合事件映射

组合事件映射包括所有消息、通知和请求事件。

```typescript
export interface NoticeEventMap extends FriendNoticeEventMap, GroupNoticeEventMap {
  notice: Notice
}

export interface RequestEventMap extends FriendRequestEventMap, GroupRequestEventMap {
  request: Request
}
```

## 通知类型

`notice.ts` 文件定义了各种通知类型，每个类型都继承自 `NoticeBase` 类。这些类型包括：

- **ReceiveLikeNotice**
- **FriendIncreaseNotice**
- **FriendDecreaseNotice**
- **PrivatePokeNotice**
- **PrivateRecallNotice**
- **PrivateFileUploadedNotice**
- **GroupPokeNotice**
- **GroupRecallNotice**
- **GroupFileUploadedNotice**
- **GroupCardChangedNotice**
- **GroupMemberTitleUpdatedNotice**
- **GroupHlightsChangedNotice**
- **GroupMemberIncreaseNotice**
- **GroupMemberDecreaseNotice**
- **GroupAdminChangedNotice**
- **GroupSignInNotice**
- **GroupMemberBanNotice**
- **GroupWholeBanNotice**
- **GroupMessageReactionNotice**
- **GroupLuckKingNotice**
- **GroupHonorChangedNotice**

每个通知类型都有 `subEvent`、`contact`、`sender` 和 `content` 等属性，以及用于确定上下文的方法（例如 `isPrivate`、`isFriend`、`isGroup`）。

```typescript
export class ReceiveLikeNotice extends NoticeBase {
  #subEvent: 'receiveLike'
  #contact: ReceiveLikeOptions['contact']
  #sender: ReceiveLikeOptions['sender']
  content: ReceiveLikeOptions['content']

  constructor(options: ReceiveLikeOptions) {
    super(Object.assign(options, { subEvent: 'receiveLike' as const }))

    this.#subEvent = 'receiveLike'
    this.#contact = options.contact
    this.#sender = options.sender
    this.content = options.content
  }

  // Getters and other methods...
}
``` -->
