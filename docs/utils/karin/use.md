# 中间件（use）

介绍: 

```js twoslash
import karin from 'node-karin'

export const middleware = karin.use('forwardMsg', async (bot, contact, element, next, exit) => {
  console.log(contact.scene)
  console.log(element)

  return exit()
}, { adapter: ['ICQQ'] })
```