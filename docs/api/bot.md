# Bot 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

Bot模块提供了机器人实例的管理功能，包括注册、获取、卸载机器人实例以及发送消息等核心功能。该模块是框架与各类适配器之间的桥梁，负责协调机器人实例的生命周期管理。

## 获取机器人实例

### getBot

获取指定的机器人实例。可以通过索引、协议或机器人ID获取。

```typescript
import { karin } from 'node-karin'

/**
 * 获取Bot
 * @param id 适配器索引 | 适配器协议实现 | 机器人ID
 * @param isProtocol 此项是为了区分传入的是BotID还是协议实现
 * @returns 适配器实例或null
 */

// 通过索引获取
const botInstance1 = karin.getBot(0)

// 通过协议获取
const botInstance2 = karin.getBot('onebot', true)

// 通过机器人ID获取
const botInstance3 = karin.getBot('123456789')
```

### getAllBot

获取所有已注册的机器人实例，不包含索引信息。

```typescript
import { karin } from 'node-karin'

/**
 * 获取所有Bot类，不包含索引
 * @returns Bot类列表
 */
const allBots = karin.getAllBot()
```

### getAllBotList

获取所有已注册的机器人实例，包含索引信息。

```typescript
import { karin } from 'node-karin'

/**
 * 获取所有Bot类，包含索引
 * @returns 注册的Bot列表
 */
const botsList = karin.getAllBotList()
// 返回格式: [{ index: 1, bot: AdapterType }, ...]
```

### getAllBotID

获取所有已注册机器人的ID。

```typescript
import { karin } from 'node-karin'

/**
 * 获取所有BotID
 * @returns BotID列表
 */
const botIds = karin.getAllBotID()
// 返回格式: ['123456789', '987654321', ...]
```

### getBotCount

获取当前注册的机器人数量。

```typescript
import { karin } from 'node-karin'

/**
 * 获取注册的Bot数量
 * @returns Bot数量
 */
const count = karin.getBotCount()
```

## 注册与卸载机器人

### registerBot

注册一个新的机器人实例，通常由适配器内部调用，不建议直接使用。

```typescript
import { karin } from 'node-karin'

/**
 * 注册Bot
 * @param _ 适配器通信对象
 * @param botInstance 适配器实例
 * @returns 适配器索引
 */
// 该方法主要在适配器内部使用，不建议直接调用
const botIndex = karin.registerBot(communication, botInstance)
```

注册过程中会：
1. 分配全局唯一的索引
2. 重写sendMsg和sendForwardMsg方法以支持钩子
3. 处理重启后的消息通知

### unregisterBot

卸载指定的机器人实例。支持通过索引、机器人ID或机器人ID与地址组合进行卸载。

```typescript
import { karin } from 'node-karin'

/**
 * 卸载Bot
 * @param type 卸载方式
 * @param idOrIndex 适配器索引 | 机器人ID
 * @param address 机器人地址（当type为'address'时必需）
 * @returns 是否成功卸载
 */

// 通过索引卸载
const success1 = karin.unregisterBot('index', 1)

// 通过机器人ID卸载
const success2 = karin.unregisterBot('selfId', '123456789')

// 通过机器人ID和地址卸载
const success3 = karin.unregisterBot('address', '123456789', 'ws://example.com')
```

## 消息发送

### sendMsg

发送主动消息，是最常用的消息发送方法。

```typescript
import { karin, segment } from 'node-karin'

/**
 * 发送主动消息
 * @param selfId Bot的id
 * @param contact 目标信息
 * @param elements 消息内容
 * @param options 消息选项
 * @returns 发送结果
 */

// 发送文本消息
const result1 = await karin.sendMsg('123456789', {
  scene: 'group',
  peer: '群号',
  userId: '发送者ID'
}, '这是一条消息')

// 发送复杂消息元素
const result2 = await karin.sendMsg('123456789', {
  scene: 'private',
  peer: '私聊对象ID'
}, [
  segment.text('Hello'),
  segment.image('/path/to/image.jpg')
])

// 使用选项
const result3 = await karin.sendMsg('123456789', {
  scene: 'group',
  peer: '群号'
}, '这条消息将在5秒后自动撤回', {
  recallMsg: 5, // 5秒后撤回
  retryCount: 3 // 失败后最多重试3次
})
```

#### 消息选项

| 选项        | 类型   | 默认值 | 说明                                            |
| ----------- | ------ | ------ | ----------------------------------------------- |
| recallMsg   | number | 0      | 发送成功后自动撤回消息的时间（秒），0表示不撤回 |
| retryCount  | number | 1      | 发送失败时的重试次数                            |
| retry_count | number | 1      | 已废弃，请使用retryCount                        |

## 类型定义

### Contact

联系人信息，用于指定消息发送的目标。

```typescript
interface Contact {
  /** 场景 'group'表示群聊，'private'表示私聊 */
  scene: 'group' | 'private'
  /** 目标ID，群聊为群号，私聊为用户ID */
  peer: string
  /** 用户ID，仅在群聊中表示@的用户 */
  userId?: string
}
```

### SendMsgOptions

消息发送选项。

```typescript
interface SendMsgOptions {
  /** 发送成功后撤回消息时间（秒） */
  recallMsg?: number
  /** @deprecated 已废弃 请使用 `retryCount` */
  retry_count?: number
  /** 重试次数 */
  retryCount?: number
}
```

### SendMsgResults

消息发送结果。

```typescript
interface SendMsgResults {
  /** 消息ID */
  messageId: string
  /** 消息发送时间戳 */
  time: number
  /** 原始数据 */
  rawData: any
  /** 消息ID别名 */
  message_id: string
  /** 消息时间别名 */
  messageTime: number
}
```

## 使用示例

### 获取并使用机器人实例

```typescript
import { karin, segment } from 'node-karin'

// 获取所有机器人实例
const allBots = karin.getAllBot()
console.log(`当前共有 ${karin.getBotCount()} 个机器人实例`)

// 通过ID获取特定机器人
const myBot = karin.getBot('123456789')
if (myBot) {
  console.log(`找到机器人: ${myBot.account.name}`)
}

// 向特定群组发送消息
await karin.sendMsg('123456789', {
  scene: 'group',
  peer: '10000000'
}, [
  segment.text('这是一条来自Karin框架的消息'),
  segment.image('https://example.com/image.jpg')
])
```

### 高级使用：消息发送与撤回

```typescript
import { karin, segment } from 'node-karin'

// 发送一条5秒后自动撤回的消息
const result = await karin.sendMsg('123456789', {
  scene: 'private',
  peer: '10000000'
}, [
  segment.text('这条消息将在5秒后自动消失'),
  segment.image('/path/to/image.jpg')
], {
  recallMsg: 5, // 5秒后自动撤回
  retryCount: 2 // 失败后重试2次
})

console.log(`消息已发送，ID: ${result.messageId}，时间: ${result.time}`)
```

### 动态获取和管理机器人

```typescript
import { karin } from 'node-karin'

// 定期检查机器人状态的功能
const checkBotsStatus = () => {
  const botIds = karin.getAllBotID()
  
  botIds.forEach(id => {
    const botInstance = karin.getBot(id)
    if (botInstance) {
      console.log(`Bot ${id} 在线状态: ${botInstance.online ? '在线' : '离线'}`)
      
      // 如果机器人离线，可以尝试重新连接或者卸载
      if (!botInstance.online) {
        // 可以选择卸载该机器人
        // karin.unregisterBot('selfId', id)
        
        // 或者尝试重新连接（根据适配器实现方式可能不同）
        // botInstance.reconnect()
      }
    }
  })
}

// 每5分钟检查一次
setInterval(checkBotsStatus, 5 * 60 * 1000)
```
