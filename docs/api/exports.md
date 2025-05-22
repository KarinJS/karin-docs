# node-karin 导出模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

> [!warning] 警告
> 除了sqlite3以外，所有导出模块都是ESM格式。底层使用了vite+tsup对模块本身进行了重新打包，可能存在一定的兼容性问题。如果遇到问题，请在GitHub仓库开issues报告。
>
> 使用TypeScript开发时，目前`lodash`和`express`需要单独安装类型包：
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

> [!note] Api变动
>
> | 版本 | 变动 |
> | --- | --- |
> | 1.8.0 | 新增 `karinPathKv` `kvPath`，统一前缀 `karinPath` ，并废弃了旧的常量 |

| 常量名                   | 描述                       | 路径示例                                         |
| ------------------------ | -------------------------- | ------------------------------------------------ |
| `karinPathRoot`          | node-karin根目录的绝对路径 | `/path/to/node_modules/node-karin`               |
| `karinPathMain`          | node-karin主入口文件路径   | `/path/to/node_modules/node-karin/dist/index.js` |
| `karinPathPlugins`       | 插件根目录                 | `${cwd}/plugins`                                 |
| `isPackaged`             | 是否处于node_modules中     | `true/false`                                     |
| `karinPathDefaultConfig` | 默认config目录             | `npm/default/config`                             |
| `karinPathDefaultView`   | 默认view目录               | `npm/default/view`                               |
| `karinPathComment`       | 注释目录                   | `npm/default/comment`                            |
| `karinPathBase`          | 配置根目录                 | `${cwd}/@karinjs`                                |
| `karinPathConfig`        | config目录                 | `${cwd}/@karinjs/config`                         |
| `karinPathData`          | data目录                   | `${cwd}/@karinjs/data`                           |
| `karinPathTemp`          | 临时文件存储               | `${cwd}/@karinjs/temp`                           |
| `karinPathResource`      | resource目录               | `${cwd}/@karinjs/resource`                       |
| `karinPathDb`            | db根目录                   | `${cwd}/@karinjs/data/db`                        |
| `karinPathTaskDb`        | 任务数据库目录             | `${cwd}/@karinjs/data/db/task`                   |
| `karinPathRedisSqlite3`  | 伪redis sqlite3目录        | `${cwd}/@karinjs/data/db/redis-sqlite3`          |
| `karinPathKv`            | kv数据库目录               | `${cwd}/@karinjs/data/db/kv`                     |
| `karinPathLogs`          | logs目录                   | `${cwd}/@karinjs/logs`                           |
| `karinPathHtml`          | html目录                   | `${cwd}/@karinjs/temp/html`                      |
| `karinPathPm2Config`     | pm2配置路径                | `${cwd}/@karinjs/config/pm2.yaml`                |
| `karinPathConsole`       | console适配器目录          | `${cwd}/@karinjs/temp/console`                   |
| `karinPathSandboxData`   | 沙盒数据目录               | `${cwd}/@karinjs/data/sandbox`                   |
| `karinPathSandboxTemp`   | 沙盒临时数据目录           | `${cwd}/@karinjs/temp/sandbox`                   |

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

node-karin框架将多个常用的第三方模块重新打包并导出，方便开发者直接使用，无需额外安装这些依赖。

### express

Web应用框架，用于构建API和Web应用。

```typescript
import express from 'node-karin/express'
// 或
import { Router } from 'node-karin/express'
```

> [!note] TypeScript类型
> TypeScript开发中，需要单独安装类型声明包：`npm install -D @types/express`

详细文档请参考 [express官方文档](https://expressjs.com/)

### lodash

实用工具库，提供函数式编程辅助函数。

```typescript
import _ from 'node-karin/lodash'
// 或
import { merge } from 'node-karin/lodash'
```

> [!note] TypeScript类型
> TypeScript开发中，需要单独安装类型声明包：`npm install -D @types/lodash`

详细文档请参考 [lodash官方文档](https://lodash.com/docs)

### axios

基于Promise的HTTP客户端。

```typescript
import axios from 'node-karin/axios'
```

详细文档请参考 [axios官方文档](https://axios-http.com/docs/intro)

### chalk

终端字符串样式库。

```typescript
import chalk from 'node-karin/chalk'
```

详细文档请参考 [chalk文档](https://github.com/chalk/chalk)

### chokidar

高性能文件监控库。

```typescript
import chokidar from 'node-karin/chokidar'
```

详细文档请参考 [chokidar文档](https://github.com/paulmillr/chokidar)

### art-template

高性能JavaScript模板引擎。

```typescript
import template from 'node-karin/art-template'
// 或
import template from 'node-karin/template'
```

详细文档请参考 [art-template文档](https://aui.github.io/art-template/)

### moment

日期处理库。

```typescript
import moment from 'node-karin/moment'
```

详细文档请参考 [moment.js文档](https://momentjs.com/docs/)

### node-schedule

定时任务调度库。

```typescript
import schedule from 'node-karin/schedule'
// 或
import schedule from 'node-karin/node-schedule'
```

详细文档请参考 [node-schedule文档](https://github.com/node-schedule/node-schedule)

### redis

Redis客户端库。

```typescript
import redis from 'node-karin/redis'
```

详细文档请参考 [redis文档](https://github.com/redis/node-redis)

### sqlite3

SQLite数据库客户端。

```typescript
import sqlite3 from 'node-karin/sqlite3'
```

> [!note] 特别说明
> 不同于其他导出模块，sqlite3为CommonJS格式。

详细文档请参考 [sqlite3文档](https://github.com/TryGhost/node-sqlite3)

### ws

WebSocket客户端和服务器实现。

```typescript
import WebSocket from 'node-karin/ws'
```

详细文档请参考 [ws文档](https://github.com/websockets/ws)

### yaml

YAML解析和序列化库。

```typescript
import yaml from 'node-karin/yaml'
```

详细文档请参考 [yaml文档](https://github.com/eemeli/yaml)
