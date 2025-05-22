# 工具库

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

node-karin提供了丰富的工具库函数，涵盖了文件操作、网络请求、配置管理等多种功能，方便开发者构建插件和应用。

## 常用工具模块

以下是node-karin工具库中最常用的模块：

| 模块名称                 | 说明         | 功能简介                                               |
| ------------------------ | ------------ | ------------------------------------------------------ |
| [root](../exports.md)    | 路径管理     | 框架中常用的路径和状态信息                             |
| [config](./config.md)    | 配置管理     | 配置文件的初始化、读取和缓存                           |
| [common](./common.md)    | 通用工具集合 | 提供各种常用工具函数的集合                             |
| [button](./button.md)    | 按钮工具     | 处理交互按钮的创建、转换和渲染                         |
| [fs](./fs.md)            | 文件系统     | 文件系统操作的核心模块，包含多个子模块                 |
| [logger](./logger.md)    | 日志工具     | 提供格式化日志输出和日志级别控制                       |
| [message](./message.md)  | 消息工具     | 创建、解析和格式化各种消息类型                         |
| [system](./system.md)    | 系统工具     | 系统级操作和进程管理函数                               |
| [git](./git.md)          | Git工具      | Git仓库操作和管理                                      |
| [ini](./ini.md)          | INI解析      | INI格式配置文件解析和生成                              |
| [request](./request.md)  | 请求处理     | HTTP请求处理和格式化                                   |
| [changelog](./changelog) | changelog    | changelog相关的工具，通常用于解析标准化的npm包更新日志 |

## 使用方式

node-karin的工具函数可以通过以下方式导入：

```typescript
// 方式1：从主模块导入
import { common, config, fs } from 'node-karin'

// 方式2：直接导入具体函数 并非所有函数都支持 推荐使用方式1
import { formatTime, readJson } from 'node-karin'

// 方式3：使用命名空间访问
import { common } from 'node-karin'
common.axios('https://example.com', 'get')
```

## ESM格式说明

> [!warning] 警告
> node-karin是纯ESM格式的包，不支持CommonJS的require()方式导入。必须使用import语法，并确保你的项目也支持ESM。

```typescript
// ✅ 正确的导入方式
import { common } from 'node-karin'

// ❌ 错误的导入方式
const { common } = require('node-karin') // 这种方式将无法工作
```

## TypeScript支持

node-karin完全用TypeScript编写，提供了完整的类型定义。在TypeScript项目中使用时，可以获得完整的类型提示和编译时类型检查。 