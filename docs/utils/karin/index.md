# 概述

通过使用别名，开发者可以更简洁地引入所需的模块，无需指定完整的路径。

```js twoslash
// 不建议这么做！
import segment from 'node_modules/node-karin/lib/bot/segment.js'
import plugin from 'node_modules/node-karin/lib/plugins/plugin.js'

// 以上的导入麻烦且冗长，在使用别名后可以简化为
import { segment, Plugin } from 'node-karin'
```

## 使用

::: tip
文档可能会更新不及时，有一定阅读能力的可以查看 [**src/index.ts**](https://github.com/KarinJS/Karin/blob/dev/src/index.ts)
:::

- ## `kritor`

内部方法，若无特殊需求，不建议使用

- ## `APP`

```js twoslash
import { App } from 'node-karin'
// ...
```

- ## `karin`
`karin` 类拥有 [**标准API**](../../api/standard.md) 中的所有

常用方法：
* [命令正则处理](./command.md)
* [监听事件](./accept.md)
* [中间件](./use.md)
* [上下文处理](./ctx.md)
* [事件处理器](./handler.md)

- ## `Cfg`
```ts twoslash
import { Cfg, KarinMessage } from 'node-karin'

const e = {} as KarinMessage

const data = Cfg.group('123456789', e)
 ```

- ## `plugin`

```ts twoslash
import { Plugin, segment } from 'node-karin'

export class hello extends Plugin {
  constructor () {
    super({
      name: '插件名称',
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

  async hello () {
    /** 回复纯文本 */
    await this.reply(segment.text('你好'))
    /** 回复图片 */
    await this.reply(segment.image('https://www.example.com/example.png'))
    /** 回复语音 */
    await this.reply(segment.record('https://www.example.com/example.mp3'))
    /** 回复视频 */
    await this.reply(segment.video('https://www.example.com/example.mp4'))
    /** @某人 */
    await this.reply(segment.at('888888'))
    /** ...更多类型请查看segment 这里只展示常用的 */

    /** 这里return若为false karin会继续匹配下一个插件 */
    // return false
    /** 若为true 则此次用户触发的事件到此结束 */
    return true
  }
}
```
