# 命令、处理方法（command）

介绍:

```js twoslash
import karin, { segment } from 'node-karin'

// 回调函数
export const hello = karin.command(/^#你好$/, async (e) => {
  await e.reply(segment.text('hello'))
  return true
})
```