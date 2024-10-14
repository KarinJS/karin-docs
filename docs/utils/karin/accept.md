# 监听（accept）

介绍: 

```js twoslash
import karin from 'node-karin'

// 监听群成员增加事件
export const accept = karin.accept('notice.group_member_increase', async (e) => {
  await e.reply('\n欢迎━(*｀∀´*)ノ亻!', { at: true })
  return true
})
```