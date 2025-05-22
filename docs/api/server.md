# Server 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。
> 使用 `karin` 自带的 `express` 可以让你无需考虑任何端口、鉴权问题，快速创建路由。

## 核心模块

### app

> [!tip] 提示
> 无需重新安装 `express` 直接使用

```ts
import { app } from 'node-karin'

// -> 这个app其实就是下面的代码...

// import express from 'express'
// /**
//  * @public
//  * @description express 服务
//  */
// export const app: Express = express()
```

### server

> [!warning] 提示
> 一般来说这个函数用于内部使用。

```ts
import { server } from 'node-karin'

// -> 这个server其实就是下面的代码...

// /**
//  * @public
//  * @description http 服务
//  */
// export const server = createServer(app)
```

### router

> [!warning] 提示
> 这个是`karin`的内部路由，也可以直接使用，但是推荐使用自定义路由。

```ts
import { router, createSuccessResponse, BASE_ROUTER } from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

const demo: RequestHandler = async (req, res) => {
  createSuccessResponse('这是一个karin内部的路由demo')
}

router.get('/demo', demo)

console.log(`url: http://127.0.0.1:${process.env.HTTP_PORT}${BASE_ROUTER}/demo`)
// -> url: http://127.0.0.1:7777/api/v1/demo
```

## Response 响应工具

> [!note] 温馨提示
> 该模块包含处理 HTTP 响应的实用工具函数，方便开发者构建标准化的 API 响应。

### HTTP状态码

`node-karin` 提供了标准的 HTTP 状态码枚举：

> [!warning] 特别提醒
> 1. 如果你正在编写 `TypeScript`
> 2. 直接运行 `TypeScript` 文件  
> 3. `TypeScript` 运行时非 `ts-node`  
> - 如满足以上条件，请不要在`node-karin`中直接导入枚举  
> - 目前已知: 除`ts-node`以外的所有运行时都无法处理这种导入。

```ts
import { HTTPStatusCode } from 'node-karin'

// 可用的状态码
HTTPStatusCode.OK                 // 200 成功
HTTPStatusCode.BadRequest         // 400 请求错误
HTTPStatusCode.Unauthorized       // 401 未授权
HTTPStatusCode.Forbidden          // 403 禁止访问
HTTPStatusCode.NotFound           // 404 未找到
HTTPStatusCode.MethodNotAllowed   // 405 方法不允许
HTTPStatusCode.PayloadTooLarge    // 413 请求体过大
HTTPStatusCode.InternalServerError // 500 服务器错误
HTTPStatusCode.AccessTokenExpired  // 419 访问令牌已过期
HTTPStatusCode.RefreshTokenExpired // 420 刷新令牌已过期
```

### 创建通用响应

```ts
import { createResponse, HTTPStatusCode } from 'node-karin'
import type { Response } from 'express'

/**
 * 创建通用响应
 * @param res Express响应对象
 * @param code 状态码
 * @param data 响应数据
 * @param message 响应消息
 */
createResponse(res, HTTPStatusCode.OK, { userName: '张三' }, '获取成功')
```

### 常用响应工具函数

#### 成功响应

```ts
import { createSuccessResponse } from 'node-karin'
import type { Response } from 'express'

/**
 * 创建成功响应
 * @param res Express响应对象
 * @param data 响应数据 (可选)
 * @param message 响应消息 (默认为"成功")
 */
const successHandler = (res: Response) => {
  // 返回数据和自定义消息
  createSuccessResponse(res, { id: 1, name: '测试数据' }, '获取数据成功') 
  
  // 仅返回数据，使用默认消息
  createSuccessResponse(res, { count: 10 })
  
  // 仅返回自定义消息，无数据
  createSuccessResponse(res, null, '操作已完成')
}
```

#### 错误响应

```ts
import { 
  createBadRequestResponse,
  createUnauthorizedResponse,
  createForbiddenResponse,
  createNotFoundResponse,
  createServerErrorResponse,
  createMethodNotAllowedResponse,
  createPayloadTooLargeResponse,
  createAccessTokenExpiredResponse,
  createRefreshTokenExpiredResponse
} from 'node-karin'

// 400: 参数错误
createBadRequestResponse(res, '请求参数格式不正确')
// 401: 未授权
createUnauthorizedResponse(res, '请先登录')
// 403: 禁止访问
createForbiddenResponse(res, '权限不足')
// 404: 资源不存在
createNotFoundResponse(res, '请求的资源不存在')
// 405: 方法不允许
createMethodNotAllowedResponse(res)
// 413: 请求体过大
createPayloadTooLargeResponse(res, '上传文件过大')
// 419: 访问令牌过期
createAccessTokenExpiredResponse(res)
// 420: 刷新令牌过期
createRefreshTokenExpiredResponse(res)
// 500: 服务器错误
createServerErrorResponse(res, '系统发生未知错误')
```

### 在路由中使用

```ts
import { app, createSuccessResponse, createBadRequestResponse } from 'node-karin'
import type { Request, Response } from 'express'

app.get('/api/user/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  
  if (!userId) {
    return createBadRequestResponse(res, '用户ID不能为空')
  }
  
  // 假设这里获取用户数据
  const userData = { id: userId, name: '用户' + userId }
  
  return createSuccessResponse(res, userData, '获取用户成功')
})
```

> [!tip] 提示
> 使用这些响应工具函数可以确保你的 API 返回格式一致的响应，便于前端处理。

## getMimeType 工具

> [!note] 温馨提示
> 该模块提供了根据文件扩展名获取对应 MIME 类型的工具函数。

### 基本用法

`getMimeType` 函数接收一个文件路径作为参数，返回该文件的 MIME 类型：

```ts
import { getMimeType } from 'node-karin'

// 获取各种文件的 MIME 类型
getMimeType('image.png')  // 返回: 'image/png'
getMimeType('document.pdf')  // 返回: 'application/pdf'
getMimeType('styles.css')  // 返回: 'text/css'
getMimeType('app.js')  // 返回: 'application/javascript'
getMimeType('data.json')  // 返回: 'application/json'
getMimeType('unknown.xyz')  // 返回: 'application/octet-stream'（默认二进制类型）
```

### 在 Express 中的应用示例

#### 创建静态文件服务器

```ts
import { app, getMimeType } from 'node-karin'
import fs from 'node:fs'
import path from 'node:path'

const staticFilesDir = path.join(__dirname, 'public')

app.get('/static/*', (req, res) => {
  try {
    // 获取请求的文件路径
    const filePath = path.join(staticFilesDir, req.path.replace('/static/', ''))
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return res.status(404).send('文件未找到')
    }
    
    // 获取文件的 MIME 类型
    const mimeType = getMimeType(filePath)
    
    // 设置响应头并发送文件
    res.setHeader('Content-Type', mimeType)
    fs.createReadStream(filePath).pipe(res)
  } catch (error) {
    res.status(500).send('服务器错误')
  }
})
```

#### 文件下载示例

```ts
import { app, getMimeType } from 'node-karin'
import fs from 'node:fs'
import path from 'node:path'

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, 'downloads', filename)
  
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('文件未找到')
    }
    
    // 获取文件的 MIME 类型
    const mimeType = getMimeType(filePath)
    
    // 设置响应头
    res.setHeader('Content-Type', mimeType)
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`)
    
    // 发送文件
    fs.createReadStream(filePath).pipe(res)
  } catch (error) {
    res.status(500).send('服务器错误')
  }
})
```

### 支持的文件类型

`getMimeType` 函数支持的文件类型包括但不限于：

| 文件扩展名  | MIME 类型                     |
| ----------- | ----------------------------- |
| .js         | application/javascript        |
| .css        | text/css                      |
| .html       | text/html                     |
| .json       | application/json              |
| .png        | image/png                     |
| .jpg, .jpeg | image/jpeg                    |
| .gif        | image/gif                     |
| .bmp        | image/bmp                     |
| .svg        | image/svg+xml                 |
| .ico        | image/x-icon                  |
| .mp3        | audio/mpeg                    |
| .wav        | audio/wav                     |
| .mp4        | video/mp4                     |
| .webm       | video/webm                    |
| .pdf        | application/pdf               |
| .doc, .docx | application/msword            |
| .xls, .xlsx | application/vnd.ms-excel      |
| .ppt, .pptx | application/vnd.ms-powerpoint |
| .xml        | application/xml               |
| .zip        | application/zip               |
| .rar        | application/x-rar-compressed  |
| .tar        | application/x-tar             |
| .gz         | application/gzip              |
| .txt        | text/plain                    |
| .csv        | text/csv                      |
| .ts         | application/typescript        |
| .woff       | font/woff                     |
| .woff2      | font/woff2                    |
| .ttf        | font/ttf                      |
| .otf        | font/otf                      |
| .eot        | application/vnd.ms-fontobject |

对于未知的文件类型，默认返回 `application/octet-stream`。

## 路由路径常量

> [!tip]
> 路由在1.8.0版本发生了一次大变动，下方都是以`1.8.0`版本为准

```ts
/** 基本路由 */
export const BASE_ROUTER = '/api/v1'
/** 登录路由 */
export const LOGIN_ROUTER = '/login'
/** 刷新令牌路由 */
export const REFRESH_ROUTER = '/refresh'
/** 获取系统配置路由 */
export const GET_CONFIG_ROUTER = '/config/new/get'
/** 保存系统配置路由 */
export const SAVE_CONFIG_ROUTER = '/config/new/save'
/** 获取日志路由 */
export const GET_LOG_ROUTER = '/log'
/** 设置日志等级路由 */
export const SET_LOG_LEVEL_ROUTER = '/logs/level'
/** 获取日志文件列表路由 */
export const GET_LOG_FILE_LIST_ROUTER = '/logs/list'
/** 获取指定日志文件路由 */
export const GET_LOG_FILE_ROUTER = '/logs/file'
/** 退出karin路由 */
export const EXIT_ROUTER = '/exit'
/** 重启karin路由 */
export const RESTART_ROUTER = '/restart'
/** 获取网络状态路由 */
export const GET_NETWORK_STATUS_ROUTER = '/system/get/network'
/** 更新karin路由 */
export const UPDATE_CORE_ROUTER = '/system/update'
/** 获取所有bot列表路由 */
export const GET_BOTS_ROUTER = '/system/get/bots'
/** console适配器路由 */
export const CONSOLE_ROUTER = '/console/{*path}'
/** ping路由 */
export const PING_ROUTER = '/ping'
/** 系统状态路由 */
export const SYSTEM_STATUS_ROUTER = '/status/system'
/** 系统信息路由 */
export const SYSTEM_INFO_ROUTER = '/info'
/** 系统ws连接 */
export const SYSTEM_STATUS_WS_ROUTER = '/status/ws'
/** karin状态 */
export const SYSTEM_STATUS_KARIN_ROUTER = '/status/karin'
/** 获取在线插件列表 */
export const GET_ONLINE_PLUGIN_LIST_ROUTER = '/plugin/index'
/** 获取插件列表 */
export const GET_PLUGIN_LIST_ROUTER = '/plugin/list'
/** 获取插件应用 */
export const GET_PLUGIN_APPS_ROUTER = '/plugin/apps'
/** 获取插件文件 */
export const GET_PLUGIN_FILE_ROUTER = '/plugin/file'
/** 获取可更新插件 */
export const GET_UPDATABLE_PLUGINS_ROUTER = '/plugin/updates'
/** 批量更新插件 */
export const BATCH_UPDATE_PLUGINS_ROUTER = '/plugin/update/batch'
/** 获取插件配置 */
export const GET_PLUGIN_CONFIG_ROUTER = '/plugin/config/get'
/** 保存插件配置 */
export const SAVE_PLUGIN_CONFIG_ROUTER = '/plugin/config/save'
/** 判断插件配置是否存在 */
export const IS_PLUGIN_CONFIG_EXIST_ROUTER = '/plugin/config/is-exist'
/** 更新插件 */
export const UPDATE_PLUGIN_ROUTER = '/plugin/update'
/** 安装插件 */
export const INSTALL_PLUGIN_ROUTER = '/plugin/install'
/** 卸载插件 */
export const UNINSTALL_PLUGIN_ROUTER = '/plugin/uninstall'
/** 获取任务状态 */
export const GET_TASK_STATUS_ROUTER = '/plugin/task'
/** 获取任务列表 */
export const GET_TASK_LIST_ROUTER = '/plugin/task/list'
/** 更新任务状态 */
export const UPDATE_TASK_STATUS_ROUTER = '/plugin/task/status'
/** 获取本地插件列表 */
export const GET_LOCAL_PLUGIN_LIST_ROUTER = '/plugin/local'
/** 创建终端 */
export const CREATE_TERMINAL_ROUTER = '/terminal/create'
/** 获取终端列表 */
export const GET_TERMINAL_LIST_ROUTER = '/terminal/list'
/** 关闭终端 */
export const CLOSE_TERMINAL_ROUTER = '/terminal/close'
/** 检查是否安装了指定的npm包 */
export const CHECK_PLUGIN_ROUTER = '/system/check/plugin'
/** 安装webui插件 */
export const INSTALL_WEBUI_PLUGIN_ROUTER = '/plugin/webui/install'
/** 获取webui插件列表 */
export const GET_WEBUI_PLUGIN_LIST_ROUTER = '/plugin/webui/list'
/** 卸载webui插件 */
export const UNINSTALL_WEBUI_PLUGIN_ROUTER = '/plugin/webui/uninstall'
/** 获取WebUI插件版本 */
export const GET_WEBUI_PLUGIN_VERSIONS_ROUTER = '/plugin/webui/versions'
/** 更新WebUI插件到指定版本 */
export const UPDATE_WEBUI_PLUGIN_VERSION_ROUTER = '/plugin/webui/update-version'

/** 获取任务列表 */
export const TASK_LIST_ROUTER = '/task/list'
// /** 新增任务 */
// export const TASK_ADD_ROUTER = '/task/add'
/** 执行任务 */
export const TASK_RUN_ROUTER = '/task/run'
/** 获取任务日志 */
export const TASK_LOGS_ROUTER = '/task/logs'
/** 删除任务记录 */
export const TASK_DELETE_ROUTER = '/task/delete_record'
/** 插件管理 */
export const PLUGIN_ADMIN_ROUTER = '/plugin/admin'
/** @version 1.8.0 获取插件管理所需的插件信息列表 */
export const GET_PLUGIN_LIST_PLUGIN_ADMIN_ROUTER = '/plugin/detail/list'

/** 获取依赖列表 */
export const GET_DEPENDENCIES_LIST_ROUTER = '/dependencies/list'
/** 依赖管理路由 */
export const MANAGE_DEPENDENCIES_ROUTER = '/dependencies/manage'
/** 获取.npmrc文件列表 */
export const GET_NPMRC_LIST_ROUTER = '/dependencies/npmrc/list'
/** 获取npm config文件内容 */
export const GET_NPM_CONFIG_ROUTER = '/dependencies/npmrc/get'
/** 获取npm registry、proxy、https-proxy配置 */
export const GET_NPM_BASE_CONFIG_ROUTER = '/dependencies/npm/base'
/** 保存npmrc文件 */
export const SAVE_NPMRC_ROUTER = '/dependencies/npmrc/save'

/** 获取已加载命令插件缓存信息列表 */
export const GET_LOADED_COMMAND_PLUGIN_CACHE_LIST_ROUTER = '/plugin/loaded/command'
```

## 进阶

> [!note]
> 实战案例 这部分可以查看express官方文档了  
> 如果是 `TypeScript`，记得安装 `@types/express` 哦

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
 * 在这里，我们可以挂载一些解析中间件
 */
router.use(express.json())
// 还可以挂上面说的，用karin内部的鉴权函数来对所有api进行鉴权

// ======================================================

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

// ======================================================

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
