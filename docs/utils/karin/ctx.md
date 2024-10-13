# 上下文（context）

介绍:

```js twoslash
export const context = karin.command(/^#上下文$/, async (e) => {
  /** 方法实现 */
  e.reply('请回复一条消息')
  const context = await karin.ctx(e, { userId: '123456789', reply: true, time: 180, replyMsg: '超时了。。。' })
  e.reply('你的回复内容是：' + context.msg)
  return true
})
```