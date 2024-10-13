# handler

介绍:

```js twoslash
import karin from 'node-karin'

export const handler = karin.handler('handler', async (e) => {
  /** 方法实现 */
}, { adapter: ['ICQQ', 'OneBot11'], priority: 500 })
```