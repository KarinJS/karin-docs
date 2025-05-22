---
title: 🚀 插件示例
createTime: 2025/05/14 03:50:59
permalink: /guide/h9ywms45/
---

> 一个简单的 `demo` 示例，直接代码展示了。

## 准备工作

- 打开 `plugins/karin-plugin-example` 目录，在此新建一个 `index-demo.js` 文件。

::: tip 提示
鼠标轻扫代码块内的代码，可查看对应的类型或注释
:::

## 函数式语法糖示例

以下所有示例都在 `karin` 对象中扩展出来，使用前请先导入 `karin` 对象。

```ts twoslash
// @noErrorValidation
import karin from 'node-karin'
```

### 1. 命令正则处理

调用 `karin.command` 注册一个插件

> [!IMPORTANT]
>
> - `command` 的第一个参数为正则表达式，匹配消息是否触发该插件。
> - `command` 的第二个参数为命令的插件的方法函数或者或字符串、或`segment`元素类型。
> - `command` 的第三个参数为插件的配置项，具体请查看下方详细说明。

---

- `command` 的第一种使用方法，直接回复字符串

```ts twoslash
// @noErrorValidation
import karin from 'node-karin'
export const test = karin.command('^文本$', '这是一段文本消息')
```

- `command` 的第二种使用方法，传入`segment`元素

```ts twoslash
// @noErrorValidation
import karin, { segment } from 'node-karin'
export const text = karin.command(
  /^#文本测试$/,
  segment.text('这是一段文本消息')
)
```

- `command` 的第三种使用方法，回调函数

```ts twoslash
// @noErrorValidation
import { karin, segment } from 'node-karin'
// 参数二支持同步和异步函数
export const callback = karin.command(/^#回调测试$/, async (e, next) => {
  //                                                           ^?
  // reply 方法支持多种类型的参数
  await e.reply('这是一个回调测试')
  // 传入`sengment`元素
  await e.reply(segment.text('这是一个回调测试'))
  // 传入数组 支持各种组合的`segment`元素
  await e.reply([
    segment.text('这是一个回调测试'),
    segment.image('https://www.example.com/example.png')
  ])
  // 若要继续匹配下一个插件，请调用 next 方法（类似 return false）
  next() // 注释该行则终止匹配
})
```

- `command` 的第三个参数

> 第三个参数是一个对象，用于设置插件的一些属性  
> 全部参数都是可选的，不填写则使用默认值  
> 强烈建议设置`name`属性，也就是插件的名称，方便后续查找和管理插件  
> 参数的配置项请查看更下方

```ts twoslash
// @noErrorValidation
import karin from 'node-karin'
// ---cut-before---
export const test = karin.command('^文本$', '这是一段文本消息', {
  event: 'message', // 监听的事件
  name: '文本', // 插件名称
  perm: 'all', // 触发权限
  at: false, // 是否加上at 仅在群聊中有效
  reply: false, // 是否加上引用回复
  recallMsg: 0, // 发送是否撤回消息 单位秒
  log: true, // 是否启用日志
  rank: 10000, // 优先级
  adapter: [], // 生效的适配器
  dsbAdapter: [], // 禁用的适配器
  delay: 0, // 延迟回复 单位毫秒 仅在第二个参数非函数时有效
  stop: false // 是否停止执行后续插件 仅在第二个参数非函数时有效
})
```

### 2. 监听事件处理 <Badge type="danger" text="待完善..." />

调用 `karin.accept` 注册一个事件监听插件

> [!IMPORTANT]
>
> - `accept` 的第一个参数为事件名称，支持监听 [`通知`](../event/notice.md) 和 [`请求`](../event/request.md) 事件。
> - `accept` 的第二个参数为事件处理函数。
> - `accept` 的第三个参数为插件的配置项，参数内容参考上方 [`command`](#_1-命令正则处理) 的参数三

监听入群通知事件插件示例

<!-- prettier-ignore -->
```ts twoslash
// @noErrorValidation
import karin from 'node-karin'
export const accept = karin.accept('notice.groupMemberAdd', async (e) => {
  await e.reply('\n欢迎新人 Ciallo～(∠・ω< )⌒☆', { at: true })
}, { name: '加群通知' })
```


### 3. 事件处理器 <Badge type="danger" text="待完善..." />

调用 `karin.handle` 注册一个事件处理器

### 4. 定时任务 <Badge type="warning" text="待完善..." />

调用 `karin.task` 注册一个定时任务插件

<!-- prettier-ignore -->
```ts twoslash
// @noErrorValidation
import { logger } from 'node-karin'
// ---cut-before---
import karin from 'node-karin'
// 注册一个定时任务
const task = karin.task('打印 Hello World', '*/10 * * * *', async () => {
  logger.mark('Hello, world!') // 每十分钟打印一次 Hello, world!
}, { log: true, name: 'test' })
```

## 类语法糖示例

> 该示例为消息插件示例  
> 将下面的代码复制到 `index-demo.js` 中，保存  
> 对机器人发送 `#你好` ，机器人会回复 `你好` 、图片、语音、视频、@某人

```ts twoslash
// @noErrorValidation
import { Plugin, segment } from 'node-karin'

export class hello extends Plugin {
  constructor() {
    super({
      name: '插件名称',
      desc: '插件描述',
      rule: [
        {
          /** 命令正则匹配 */
          reg: /^#你好$/,
          /** 正则对应的执行方法 */
          fnc: 'hello'
        }
      ]
    })
  }

  async hello() {
    // 这里在this上会多一个reply方法，和函数插件的e.reply一样
    await this.reply('你好')

    // e在this上也会有
    await this.reply(segment.image('https://www.example.com/example.png'))
    // 其他方法都和函数插件一样
    return true
  }
}
```

## 更复杂的类语法糖示例

```ts twoslash
// @noErrorValidation
import { Plugin, segment } from 'node-karin'

export class hello extends Plugin {
  constructor() {
    super({
      name: '插件名称',
      desc: '插件描述',
      /** 监听事件 具体请查看事件分类 */
      event: 'message',
      /** 插件的优先级 必须为数字 数字越小优先级越高 默认5000 */
      priority: 1000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: /^#你好$/,
          /** 正则对应的执行方法 */
          fnc: 'hello',
          /** 是否显示操作日志 默认显示 */
          log: true,
          /** 操作权限 all | admin | master | group.admin | group.owner */
          permission: 'all'
        }
      ]
    })
  }

  async hello() {
    // ...不再赘述
    return true
  }
}
```
