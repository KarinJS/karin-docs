---
title: 📦 node-karin 导出模块
createTime: 2025/05/15 00:12:24
permalink: /guide/utils/1ususf67/
---

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

> [!warning]
> 除了 sqlite3 以外，所有导出模块都是 ESM 格式。底层使用了 vite+tsup 对模块本身进行了重新打包，可能存在一定的兼容性问题。如果遇到问题，请在 GitHub 仓库开 issues 报告。
>
> 使用 TypeScript 开发时，目前`lodash`和`express`需要单独安装类型包：
>
> ```bash
> pnpm add @types/lodash @types/express -D
> ```

## 根目录 (Root) API

通过 `node-karin/root` 或 `node-karin/dir` 导出，提供了框架中常用的路径和状态信息。

```typescript
import * as KarinRoot from 'node-karin/root'
// 或
import KarinRoot from 'node-karin/root'
// 或
import { karinPathRoot } from 'node-karin/root'
```

### 新的路径常量

> [!note]
> Api 变动
> | 版本  | 变动                                                                 |
> | ----- | -------------------------------------------------------------------- |
> | 1.8.0 | 新增 `karinPathKv` `kvPath`，统一前缀 `karinPath` ，并废弃了旧的常量 |

| 常量名                   | 描述                        | 路径示例                                         |
| ------------------------ | --------------------------- | ------------------------------------------------ |
| `karinPathRoot`          | node-karin 根目录的绝对路径 | `/path/to/node_modules/node-karin`               |
| `karinPathMain`          | node-karin 主入口文件路径   | `/path/to/node_modules/node-karin/dist/index.js` |
| `karinPathPlugins`       | 插件根目录                  | `${cwd}/plugins`                                 |
| `isPackaged`             | 是否处于 node_modules 中    | `true/false`                                     |
| `karinPathDefaultConfig` | 默认 config 目录            | `npm/default/config`                             |
| `karinPathDefaultView`   | 默认 view 目录              | `npm/default/view`                               |
| `karinPathComment`       | 注释目录                    | `npm/default/comment`                            |
| `karinPathBase`          | 配置根目录                  | `${cwd}/@karinjs`                                |
| `karinPathConfig`        | config 目录                 | `${cwd}/@karinjs/config`                         |
| `karinPathData`          | data 目录                   | `${cwd}/@karinjs/data`                           |
| `karinPathTemp`          | 临时文件存储                | `${cwd}/@karinjs/temp`                           |
| `karinPathResource`      | resource 目录               | `${cwd}/@karinjs/resource`                       |
| `karinPathDb`            | db 根目录                   | `${cwd}/@karinjs/data/db`                        |
| `karinPathTaskDb`        | 任务数据库目录              | `${cwd}/@karinjs/data/db/task`                   |
| `karinPathRedisSqlite3`  | 伪 redis sqlite3 目录       | `${cwd}/@karinjs/data/db/redis-sqlite3`          |
| `karinPathKv`            | kv 数据库目录               | `${cwd}/@karinjs/data/db/kv`                     |
| `karinPathLogs`          | logs 目录                   | `${cwd}/@karinjs/logs`                           |
| `karinPathHtml`          | html 目录                   | `${cwd}/@karinjs/temp/html`                      |
| `karinPathPm2Config`     | pm2 配置路径                | `${cwd}/@karinjs/config/pm2.yaml`                |
| `karinPathConsole`       | console 适配器目录          | `${cwd}/@karinjs/temp/console`                   |
| `karinPathSandboxData`   | 沙盒数据目录                | `${cwd}/@karinjs/data/sandbox`                   |
| `karinPathSandboxTemp`   | 沙盒临时数据目录            | `${cwd}/@karinjs/temp/sandbox`                   |

### 已废弃的路径常量

以下常量已被标记为废弃，但为保持兼容性仍可使用：

| 废弃常量名          | 对应的新常量名           |
| ------------------- | ------------------------ |
| `karinDir`          | `karinPathRoot`          |
| `karinMain`         | `karinPathMain`          |
| `pluginDir`         | `karinPathPlugins`       |
| `isPkg`             | `isPackaged`             |
| `defaultConfigPath` | `karinPathDefaultConfig` |
| `defaultViewPath`   | `karinPathDefaultView`   |
| `commentPath`       | `karinPathComment`       |
| `basePath`          | `karinPathBase`          |
| `configPath`        | `karinPathConfig`        |
| `dataPath`          | `karinPathData`          |
| `tempPath`          | `karinPathTemp`          |
| `resourcePath`      | `karinPathResource`      |
| `dbPath`            | `karinPathDb`            |
| `redisSqlite3Path`  | `karinPathRedisSqlite3`  |
| `kvPath`            | `karinPathKv`            |
| `logsPath`          | `karinPathLogs`          |
| `htmlPath`          | `karinPathHtml`          |
| `pm2Path`           | `karinPathPm2Config`     |
| `consolePath`       | `karinPathConsole`       |
| `sandboxDataPath`   | `karinPathSandboxData`   |
| `sandboxTempPath`   | `karinPathSandboxTemp`   |

## 导出的第三方模块

node-karin 框架将多个常用的第三方模块重新打包并导出，方便开发者直接使用，无需额外安装这些依赖。

### express

Web 应用框架，用于构建 API 和 Web 应用。

```typescript
import express from 'node-karin/express'
// 或
import { Router } from 'node-karin/express'
```

> [!note] 
> TypeScript 类型
> TypeScript 开发中，需要单独安装类型声明包：`npm install -D @types/express`

详细文档请参考 [express 官方文档](https://expressjs.com/)

### lodash

实用工具库，提供函数式编程辅助函数。

```typescript
import _ from 'node-karin/lodash'
// 或
import { merge } from 'node-karin/lodash'
```

> [!note] 
> TypeScript 类型
> TypeScript 开发中，需要单独安装类型声明包：`npm install -D @types/lodash`

详细文档请参考 [lodash 官方文档](https://lodash.com/docs)

### axios

基于 Promise 的 HTTP 客户端。

```typescript
import axios from 'node-karin/axios'
```

详细文档请参考 [axios 官方文档](https://axios-http.com/docs/intro)

### chalk

终端字符串样式库。

```typescript
import chalk from 'node-karin/chalk'
```

详细文档请参考 [chalk 文档](https://github.com/chalk/chalk)

### chokidar

高性能文件监控库。

```typescript
import chokidar from 'node-karin/chokidar'
```

详细文档请参考 [chokidar 文档](https://github.com/paulmillr/chokidar)

### art-template

高性能 JavaScript 模板引擎。

```typescript
import template from 'node-karin/art-template'
// 或
import template from 'node-karin/template'
```

详细文档请参考 [art-template 文档](https://aui.github.io/art-template/)

### moment

日期处理库。

```typescript
import moment from 'node-karin/moment'
```

详细文档请参考 [moment.js 文档](https://momentjs.com/docs/)

### node-schedule

定时任务调度库。

```typescript
import schedule from 'node-karin/schedule'
// 或
import schedule from 'node-karin/node-schedule'
```

详细文档请参考 [node-schedule 文档](https://github.com/node-schedule/node-schedule)

### redis

Redis 客户端库。

```typescript
import redis from 'node-karin/redis'
```

详细文档请参考 [redis 文档](https://github.com/redis/node-redis)

### sqlite3

SQLite 数据库客户端。

```typescript
import sqlite3 from 'node-karin/sqlite3'
```

> [!note]
> 不同于其他导出模块，sqlite3 为 CommonJS 格式。

详细文档请参考 [sqlite3 文档](https://github.com/TryGhost/node-sqlite3)

### ws

WebSocket 客户端和服务器实现。

```typescript
import WebSocket from 'node-karin/ws'
```

详细文档请参考 [ws 文档](https://github.com/websockets/ws)

### yaml

YAML 解析和序列化库。

```typescript
import yaml from 'node-karin/yaml'
```

详细文档请参考 [yaml 文档](https://github.com/eemeli/yaml)
