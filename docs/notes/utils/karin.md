---
title: karin
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/karin/
---
# 默认导出

## 使用

## <mark>karin</mark>

### `command`

详见 [命令正则处理](../plugins/demo.md#_1-命令正则处理)

### `accept`

详见 [监听事件](../plugins/demo.md#_2-监听事件处理)

### `ctx`

详见 [上下文处理](../plugins/demo.md#_4-上下文处理)

### `handle`

详见 [事件处理器](../plugins/demo.md#_5-事件处理器)

### `contactFriend`

> 构建好友 contact

|  参数  |   类型   |  描述   |    备注    |
| :----: | :------: | :-----: | :--------: |
| `peer` | `string` | 用户 id | 好友 QQ 号 |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
// ---cut-before---
const peer = '123456'
const result = karin.contactFriend(peer)
```

```ts twoslash [返回值]
/** 不具有 sub_peer 的事件联系人信息 */
export interface ContactWithoutSubPeer<
  T extends 'friend' | 'group' = 'friend' | 'group'
> {
  /** 事件来源场景 */
  scene: `${T}`
  /** 事件来源id 群号或者用户id */
  peer: string
  /** 事件来源子id 不存在 */
  subPeer?: undefined | null
  /** @deprecated 即将废弃 请使用 `subPeer` */
  sub_peer?: undefined | null
}
```

:::

### `contactGroup`

> 构建群 contact

|  参数  |   类型   | 描述 | 备注 |
| :----: | :------: | :--: | :--: |
| `peer` | `string` | 群号 |      |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
// ---cut-before---
const peer = '123456789'
const result = karin.contactGroup(peer)
```

```ts twoslash [返回值]
/** 不具有 sub_peer 的事件联系人信息 */
export interface ContactWithoutSubPeer<
  T extends 'friend' | 'group' = 'friend' | 'group'
> {
  /** 事件来源场景 */
  scene: `${T}`
  /** 事件来源id 群号或者用户id */
  peer: string
  /** 事件来源子id 不存在 */
  subPeer?: undefined | null
  /** @deprecated 即将废弃 请使用 `subPeer` */
  sub_peer?: undefined | null
}
```

:::

### `contactGuild`

> 构建频道 contact

|   参数    |   类型   |   描述    |   备注    |
| :-------: | :------: | :-------: | :-------: |
|  `peer`   | `string` |  频道 ID  | 主频道 ID |
| `subPeer` | `string` | 子频道 ID | 子频道 ID |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
// ---cut-before---
const peer = '123456789'
const subPeer = '987654321'
const result = karin.contactGuild(peer, subPeer)
```

```ts twoslash [返回值]
/** 具有 sub_peer 的事件联系人信息 */
export interface ContactWithSubPeer<
  T extends 'channel' | 'group_temp' = 'channel' | 'group_temp'
> {
  /** 事件来源场景 */
  scene: `${T}`
  /** 事件来源id 群号或者频道id */
  peer: string
  /** 事件来源子id 用户id或者子频道id */
  subPeer: string
  /** @deprecated 即将废弃 请使用 `subPeer` */
  sub_peer: string
}
```

:::

### `contactGroupTemp`

> 构建临时聊天 contact

|   参数    |   类型   |  描述   |     备注      |
| :-------: | :------: | :-----: | :-----------: |
|  `peer`   | `string` |  群号   |     群 ID     |
| `subPeer` | `string` | 用户 ID | 群成员用户 ID |

::: code-group

```ts twoslash [调用示例]
import karin, { Message, segment } from 'node-karin'
// ---cut-before---
const peer = '123456789'
const subPeer = '987654321'
const result = karin.contactGroupTemp(peer, subPeer)
```

```ts twoslash [返回值]
/** 具有 sub_peer 的事件联系人信息 */
export interface ContactWithSubPeer<
  T extends 'channel' | 'group_temp' = 'channel' | 'group_temp'
> {
  /** 事件来源场景 */
  scene: `${T}`
  /** 事件来源id 群号或者频道id */
  peer: string
  /** 事件来源子id 用户id或者子频道id */
  subPeer: string
  /** @deprecated 即将废弃 请使用 `subPeer` */
  sub_peer: string
}
```

:::

### `task`

> 构建定时任务

|   参数    |    类型    |    描述     |                备注                |
| :-------: | :--------: | :---------: | :--------------------------------: |
|  `name`   |  `string`  |  任务名称   |                                    |
|  `cron`   |  `string`  | cron 表达式 | 如 "0 0 12 \* \* ?" 每天中午 12 点 |
|   `fnc`   | `Function` |  执行函数   |                                    |
| `options` |  `object`  |    选项     |                                    |

::: code-group

```ts twoslash [调用示例]
import karin from 'node-karin'
// ---cut-before---
karin.task(
  '每日提醒',
  '0 0 12 * * ?',
  async () => {
    console.log('现在是中午12点')
  },
  { log: true }
)
```

```ts twoslash [返回值]
export interface Task {
  /** 任务名称 */
  name: string
  /** cron表达式 */
  cron: string
  /** 执行函数 */
  fnc: Function
  /** 日志 */
  log: (msg: string) => void
  /** 文件信息 */
  file: string
  /** 包信息 */
  pkg: string
}
```

:::

### `handler`

> 构建事件处理器

|   参数    |    类型    |   描述   |       备注       |
| :-------: | :--------: | :------: | :--------------: |
|   `key`   |  `string`  | 事件 key | 自定义事件标识符 |
|   `fnc`   | `Function` | 函数实现 |                  |
| `options` |  `object`  |   选项   |                  |

::: code-group

```ts twoslash [调用示例]
import karin from 'node-karin'
// ---cut-before---
karin.handler(
  'custom:event',
  async (data) => {
    console.log('收到自定义事件', data)
  },
  { log: true, priority: 100 }
)
```

```ts twoslash [返回值]
export interface Handler {
  /** 事件key */
  key: string
  /** 函数实现 */
  fnc: (data: any) => Promise<unknown> | unknown
  /** 优先级 */
  priority: number
  /** 文件信息 */
  file: string
  /** 包信息 */
  pkg: string
}
```

:::

### `render`

> 渲染 HTML 为图片

|      参数       |               类型                |     描述     |        备注        |
| :-------------: | :-------------------------------: | :----------: | :----------------: |
|    `options`    |       `string` 或 `object`        |   渲染参数   | 文件路径或配置对象 |
| `multiPageOrId` | `string` 或 `number` 或 `boolean` | 多页截图参数 |        可选        |
|      `id`       |             `string`              |   页面 ID    |        可选        |

::: code-group

```ts twoslash [调用示例]
import karin from 'node-karin'
// ---cut-before---
// 简单渲染
const image = await karin.render('path/to/template.html')

// 分页渲染
const images = await karin.render('path/to/template.html', true)

// 使用配置对象
const result = await karin.render(
  'opt',
  {
    file: 'https://example.com',
    setViewport: {
      width: 1280,
      height: 720
    },
    type: 'jpeg',
    quality: 90
  },
  'custom-id'
)
```

```ts twoslash [返回值]
export interface RenderResult<T> {
  /** 图片路径 */
  imgs: string[]
  /** 渲染参数 */
  options: T
  /** 页面ID */
  id: string
}
```

:::

### `sendMaster`

> 给主人发消息

|    参数    |   类型    |   描述    | 备注 |
| :--------: | :-------: | :-------: | :--: |
|  `selfId`  | `string`  | Bot 的 ID |      |
| `targetId` | `string`  |  主人 ID  |      |
| `elements` | `Message` | 消息内容  |      |
| `options`  | `object`  | 消息选项  | 可选 |

::: code-group

```ts twoslash [调用示例]
import karin, { segment } from 'node-karin'
// ---cut-before---
await karin.sendMaster(
  '123456789', // Bot ID
  '987654321', // 主人 ID
  segment.text('这是发送给主人的消息'),
  { recallMsg: 30 } // 30秒后撤回
)
```

```ts twoslash [选项]
export interface SendMasterOptions {
  /** 发送是否撤回消息 单位秒 */
  recallMsg?: number
  /** 重试次数 */
  retryCount?: number
  /** 是否必须是主人 */
  mustMaster?: boolean
}
```

:::

### `sendAdmin`

> 给管理员发消息

|    参数    |   类型    |   描述    | 备注 |
| :--------: | :-------: | :-------: | :--: |
|  `selfId`  | `string`  | Bot 的 ID |      |
| `targetId` | `string`  | 管理员 ID |      |
| `elements` | `Message` | 消息内容  |      |
| `options`  | `object`  | 消息选项  | 可选 |

::: code-group

```ts twoslash [调用示例]
import karin, { segment } from 'node-karin'
// ---cut-before---
await karin.sendAdmin(
  '123456789', // Bot ID
  '987654321', // 管理员 ID
  segment.text('这是发送给管理员的消息'),
  { recallMsg: 30 } // 30秒后撤回
)
```

```ts twoslash [选项]
export interface SendAdminOptions {
  /** 发送是否撤回消息 单位秒 */
  recallMsg?: number
  /** 重试次数 */
  retryCount?: number
  /** 是否必须是管理员 */
  mustAdmin?: boolean
}
```

:::

### `button`

> 构建按钮事件处理器

|   参数    |    类型    |   描述   |       备注       |
| :-------: | :--------: | :------: | :--------------: |
|   `id`    |  `string`  | 按钮 ID  | 按钮的唯一标识符 |
|   `fnc`   | `Function` | 函数实现 |                  |
| `options` |  `object`  |   选项   |                  |

::: code-group

```ts twoslash [调用示例]
import karin, { segment } from 'node-karin'
// ---cut-before---
karin.button(
  'confirm-button',
  async (next, e) => {
    console.log('按钮被点击', e)
    e?.e?.reply('你点击了按钮')
    // 继续下一个中间件
    next()
    return segment.button({ admin: true, text: '确认' })
  },
  { log: true, priority: 100 }
)
```

```ts twoslash [选项]
export interface ButtonOptions {
  /** 插件名称 */
  name?: string
  /** 是否启用日志 */
  log?: boolean
  /**
   * 插件优先级 数字越小优先级越高
   * @default 10000
   */
  priority?: number
  /** 优先级 默认`10000` */
  rank?: number
}
```

:::

## 更多内容正在编写中 。。。。。。
