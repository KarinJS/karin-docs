---
title: server
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/server/
---
# Express 服务

::: tip
如果开发者有 api 需求，无需自行实现一个`webServer`
你无需关心端口问题，`karin`已经帮你处理好啦~  
:::

直接参考代码实现吧~

```ts
import { app } from 'node-karin'
import express, { RequestHandler } from 'node-karin/express'

/**
 * 我们创建一个路由，等下将其挂载到app上
 * 后续所有的api都将挂载到这个路由上
 * 这个`router`就跟你平时在`express`的`app`用法是一样的
 */
const router = express.Router()

/**
 * 我们创建一个测试路由
 * 方法1
 */
router.get('/ping', (req, res) => {
  res.send('pong')
})

/**
 * 方法2
 */
const ping: RequestHandler = (req, res) => {
  res.send('pong')
}
router.get('/ping', ping)

/**
 * 这里我们需要一个`path`，这个path将作为所有api的路径前缀
 * 例如：/api/test
 * 需要注意的是，请不要使用`/api/v1`这个路径(`karin用掉啦!~`)
 */
app.use('/api/test', router)

/**
 * 此时 我们可以使用
 * `http://127.0.0.1:7777/api/test/ping`
 * 访问到我们的路由
 */
```
