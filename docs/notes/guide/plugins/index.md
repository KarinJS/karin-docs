---
title: 📖 插件要求
createTime: 2025/05/14 03:50:59
permalink: /guide/7243wqc0/
---

> [!WARNING] 温馨提示
> 本页较长，建议使用`Ctrl + F`搜索关键字查找内容、善用右边导航栏。

欢迎来到 karin 的开发文档，<mark>我们是一个开放、友好的社区，欢迎大家的加入~</mark>

## 了解插件

> [!note] 温馨提示
> 本章节不涉及插件创建相关内容  
> 这里很重要，认真观看哦

插件可分`3`种类型，分别是

- `Npm插件`: 最明显的特征是通过`pnpm`安装的插件，通常是已经发布到 `npmjs.org` 托管的插件
- `Git插件`: 最明显的特征是通过`git`克隆的插件，通常是托管在 `Github` 或 `Gitee` 上的插件
- `App插件`: 通常是指单个`js`、`ts`文件，通常处于`./plugins/karin-plugin-example`目录下

### App 插件

> [!tip] 温馨提示
> 因为`App`插件是最简单的插件，这里我们先来认识一下它  
> 通过`pnpm create karin`创建项目  
> 在 `./plugins` 目录下，附带了 `karin-plugin-example` 文件夹

此时，`karin-plugin-example` 就是我们所说的 `App插件`  
但是你打开它，会发现它是一个空文件夹，那么此时我们来了解一下 `App插件` 的特征

- `App插件` 是一个处于 `./plugins` 目录下的文件夹
- 目录下不允许存在 `package.json` 文件
- 目录必须是`karin-plugin-` 开头的文件夹

满足以上条件的文件夹，都会被当做 `App插件` 来处理。

### package.json

> [!tip] 温馨提示
> 在了解 `Npm插件` 和 `Git插件` 之前，我们先来了解一下 `package.json` 文件  
> 无论是 `Npm插件` 还是 `Git插件`，都需要有一个 `package.json` 文件  
> 并且 `package.json` 文件中必须包含 `karin` 字段

我们先来看一个标准的 `package.json`

```json
{
  "name": "@karinjs/project", // npm包的名称
  "version": "1.0.0", // npm包的版本号
  "description": "", // npm包的描述
  "keywords": [], // npm包的关键字
  "homepage": "", // npm包的主页
  "repository": {
    "type": "git", // npm包的仓库类型
    "url": "" // npm包的仓库地址
  },
  "license": "MIT", // npm包的许可证
  "author": "shijin", // npm包的作者
  "type": "module", // npm包的类型 没有此字段默认为 commonjs
  "main": "", // npm包的入口文件
  "scripts": {
    // npm包的脚本
    // ...
  },
  "dependencies": {
    // npm包的依赖
    // ...
  },
  "devDependencies": {
    // npm包的开发依赖
    // ...
  },
  "peerDependencies": {
    // npm包的对等依赖
    // ...
  }
}
```

而 `karin` 对于 `npm、git` 两种插件包，都需要存在以下字段

```json
{
  // ...
  "karin": {
    /** ts入口 */
    "main": "",
    /** 插件app列表 */
    "apps": [],
    /** web配置文件 */
    "web": "",
    /** ts插件app列表 ts专属 仅在ts开发模式下生效 */
    ["ts-apps"]: [],
    /** ts-web */
    ["ts-web"]: [],
    /** 静态资源目录 */
    "static": [],
    /** 基本文件夹结构 */
    "files": [],
    /** 环境变量配置 */
    "env": [],
    /** 引擎兼容性 官方的翻译。。。奇奇怪怪的 */
    "engines": {
      /**
       * @description karin版本
       * @example ^0.0.1
       * @example >=0.0.1
       * @example 0.0.1
       * @example 0.0.x
       */
      "karin": ""
    }
  }
}
```

当前，并未所有字段都是必须的，严格意义来说，只有 `karin` 字段是必须的。

```json
{
  // ...
  "main": "dist/index.js", // 插件的入口文件
  "karin": {} // 只要这样写，就是一个合法的插件，在加载的时候会正常加载入口文件
}
```

#### 字段说明

> [!IMPORTANT] 温馨提示
> 这里所有的字段都不是必须的  
> 但建议根据需要进行配置  
> 所有路径相关的字段，都是**相对路径**，相对于 `package.json` 文件所在的目录

| key             | 示例                 | 类型                   | 备注                                                           |
| --------------- | -------------------- | ---------------------- | -------------------------------------------------------------- |
| `apps`          | `[src/apps]`         | `string` \| `string[]` | js 环境下的 apps 目录                                          |
| `web`           | `dist/web.config.js` | `string`               | web 配置文件的路径                                             |
| `static`        | `[src/static]`       | `string` \| `string[]` | 静态资源目录                                                   |
| `files`         | `[src]`              | `string` \| `string[]` | 基本文件夹结构，会自动在`@karinjs/{plugin_name}`下创建的文件夹 |
| `env`           | `看下方详细说明`     | `PkgEnv[]`             | 环境变量配置，会自动写入`.env`、`process.env`中                |
| `engines`       | `{}`                 | `object`               | 引擎兼容性配置                                                 |
| `engines.karin` | `>=1.8.0`            | `string`               | karin 版本要求，支持 `^`、`>=`、`<=`、`>`、`<`、`=`等语法      |
|                 |                      |                        |                                                                |
| `main`          | `src/index.ts`       | `string`               | ts 环境下的入口，仅在 ts 下生效                                |
| `ts-apps`       | `[src/apps]`         | `string` \| `string[]` | ts 环境下的 apps 目录，仅在 ts 下生效                          |
| `ts-web`        | `dist/web.config.js` | `string`               | ts 环境下的 web 配置文件的路径                                 |

- `static`:

  - 此字段用于给远程`puppeteer`请求静态资源时使用
  - 默认值为 `resource` `resources`
  - `1.8.0` 版本之前的默认值为 `resource`

- `env`:

  - 此字段用于挂载环境变量到 `process.env`、`.env` 中
  - 这里的字段优先级是高于**插件本身被加载**的
  - 请不要配置`karin`已有的环境变量
  - 类型如下:

  ```ts
  export interface PkgEnv {
    /** 变量名 */
    key: string
    /** 变量值 */
    value: string
    /** 变量注释 */
    comment: string
  }
  ```

  - 示例:

  ```json
  {
    "karin": {
      "env": [
        {
          "key": "KARIN_TEST",
          "value": "test",
          "comment": "测试环境变量"
        }
      ]
    }
  }
  ```

  - 此时可以通过 `process.env.KARIN_TEST` 来获取变量值 `test`
  - 而在 `.env` 中会自动生成 `KARIN_TEST=test` 的变量

  ```ini
  # ...
  # 测试环境变量
  KARIN_TEST=test
  ```

  - `files`:
    - 如果字段不存在，默认创建 `config`、`data`、`resources` 三个文件夹
    - 如果字段存在并且为空，则不会创建任何文件夹
    - 对于 `App插件` 来说，`karin`的处理方式是**默认字段不存在**
    - 也就是说，`App插件` 也可以在`@karinjs`下统一管理配置啦

### Npm 插件

> [!IMPORTANT] 温馨提示
> 推荐所有开发者都使用 `此方式` 来发布插件，而不是使用 `Git` 方式~
> 如果你不会使用 `npm` 发布插件，请查看后续章节的通过`npm`发布插件

特征:

- 处于项目的 `package.json` 中的 `dependencies` 或 `devDependencies` 中
- 通过包管理器安装
- 插件本身的 `package.json` 中包含`karin`字段

### Git 插件

> [!warning] 温馨提示
> 此类型的插件包只推荐用于开发阶段，生产环境更推荐发布到 `npm` 上  
> 注意: 在这里，`package.json`中是不需要强制包含`karin`字段的  
> 其实与 `App插件` 最根本的区别就是 `package.json` 中是否包含 `karin` 字段...

为什么会不推荐 `git插件`发布到生产环境:

- 需要单独安装: 相较于`pnpm`只需要通过`nodejs`内置的`npm`一键安装...
- 版本混乱: 单个版本存在多个提交，哈希值不一样，但是版本号是一样的...
- 依赖管理: 依赖管理混乱，需要使用`pnpm-workspace`来管理依赖...
- 更新混乱: 如果开发者使用了`git push -f`，更新又冲突了...

特征:

- 处于`./plugins`目录下是文件夹并包含`package.json`文件
- 文件夹名称以 `karin-plugin-` 开头
- 还有最特殊的一种，处于开发阶段，<mark>在根目录的`package.json`中包含`karin`字段</mark>

> [!tip]
> 在一般的开发中，我们常常需要部署一个正式环境，让插件在`plugins`下运行  
> 而`特征`中的最后一条就是解决这个问题的  
> 下方是一个示例，推荐使用`pnpm create karin`中的开发模板来创建项目

- 我们将插件克隆到一个单独的目录
- 新增开发依赖`node-karin`: `pnpm add node-karin -D`
- 执行初始化`npx ki init`
- 在根目录的 `package.json` 中添加 `karin` 字段

完成上述操作，整个根项目都会被视为一个`git插件`，

<!-- #### 插件子类

> [!IMPORTANT] 温馨提示
> 插件子类是指插件的一种分类，通常是指插件的功能性质。

- `command`插件: 处理消息事件
- `accept`插件: 处理通知、请求事件
- `task`插件: 构建定时任务
- `handler`插件: 约定事件处理
- `button`插件: QQBot 专属，构建按钮
- `plugin`类插件: 消息插件类 -->

## 插件规范

> [!tip] 温馨提示
> 插件规范是指插件的基本规范和约定  
> 用于减少社区开发者之间的沟通成本

### 命名规范

术语:

- 小驼峰: `myName`、`myNameIsKarin`
- 大驼峰: `MyName`、`MyNameIsKarin`
- 全大写蛇形: `MY_NAME`、`MY_NAME_IS_KARIN`

约定:

- 文件使用`小驼峰`命名法
- 变量使用`小驼峰`命名法
- 函数使用`小驼峰`命名法
- 类使用`大驼峰`命名法
- 常量使用`全大写蛇形命名法`命名法

> [!note] 以下为强制规范

- plugin 包名称:
  - 以 `karin-plugin-` 开头
  - 统一`小写字母`，单词之间用 `-` 连接
- `App插件`: 与上述规范一致
- `Npm插件包`: 无需遵守上述规范
- `Git插件包`: 在上述规范中，还必须确保仓库名称与`package.json`中的`name`字段一致

### 数据规范

> [!note] 以下为强制规范

`数据规范`是指`karin`与插件的数据格式和约定

- base64:
  - 以 `base64://` 开头
  - 不允许包含 `data:image/png;base64,` 这样的格式
  - 示例: `base64://iVBORw0KGgoAAAANSUhEUgAA...`
- http/https:
  - 以 `http://` 或 `https://` 开头
  - 禁止省略 `http` 或 `https` 协议
  - 示例: `https://www.example.com/image.png`
- file:
  - 以 `file://` 开头
  - 绝对路径
  - 禁止省略 `file` 协议
  - 禁止使用 `file:///` 协议，容易和 `Linux` 下的 `file:///root` 混淆
  - 示例: `file://D:/example/image.png`、`file:///root/image.png`
- buffer: 内部使用，无需关注

以上规范适用于插件处理各种`图片`、`音频`、`视频`、`文件`等数据的传输和处理。

### 文件规范

> [!note] 温馨提示
> 推荐搭配`package.json`中的`files`字段使用  
> 该字段会自动在`@karinjs/{plugin_name}`下创建的文件夹

任何由插件产生的文件，都适用于以下规范

以下，`root`指的是`@karinjs/{plugin_name}`的根目录

- <mark>应保持用户在生产环境下无需查看插件本身的任何目录、文件</mark>
- 配置文件: 放置在`root/config`目录下
- 数据文件: 放置在`root/data`目录下
- 资源文件: 放置在`root/resources`目录下
- 临时文件: 放置在`@karinjs/temp`目录下，推荐新增一个文件夹来存放
- 其他文件: 放置在`root`的自定义目录下

文件分列说明:

- 配置文件: 用于存放插件的配置文件，通常是 `json`、`yaml`、`ini` 等格式的文件
- 数据文件: 用于存放插件处理的数据，通常是 `json`、`db` 等格式的文件
- 资源文件: 用于存放插件所需的静态资源，如图片、音频等文件
- 临时文件: 用于存放插件运行时产生的临时文件，通常是 `tmp`、`temp` 等格式的文件
- 其他文件: 用于存放插件的其他文件，如日志、缓存等文件

怎么获取这些目录:

- 建议查看[exports](../api//exports.md)
- 示例:

  ```ts
  // @karinjs
  import { karinPathBase } from 'node-karin/root'

  // @karinjs/temp
  import { karinPathTemp } from 'node-karin/temp'

  // 插件在@karinjs下的目录
  import path from 'node:path'
  import { karinPathPlugins } from 'node-karin/plugins'

  // App插件默认创建的哦，不记得了就看下上面的package.json吧
  const pluginName = 'karin-plugin-example'
  const pluginPath = path.join(karinPathPlugins, pluginName)

  const configPath = path.join(pluginPath, 'config')
  const dataPath = path.join(pluginPath, 'data')
  const resourcePath = path.join(pluginPath, 'resources')
  const tempPath = path.join(karinPathTemp, pluginName)
  ```

> [!note] 总结就是: 所有文件都要放在 @karinjs 下的目录中

### 其他约定

- 提供`README.md` 文件，包含插件的使用说明、安装方法、配置方法等信息
- 提供`LICENSE` 文件，包含插件的许可证信息
- 提供`CHANGELOG.md` 文件，包含插件的更新日志信息
- 提供开发插件的说明文档，包含插件的开发规范、代码风格等信息
- 使用`github`来托管插件
- `npm`使用`github-ci`来发布包

## 使用插件模板进行开发

使用`create-karin`可以快速创建一个标准的 Karin 插件项目。本章节将详细介绍如何使用插件模板进行开发。

### 创建插件项目

可以通过以下命令快速创建一个插件项目：

```bash
# 交互式创建项目
pnpm create karin

# 或者直接使用npx（无需安装pnpm）
npx create-karin
```

按照提示选择插件类型，可选择：

- TypeScript 插件（推荐）：`karin-plugin-ts`
- JavaScript 插件：`karin-plugin-js`

### 项目结构说明

以 TypeScript 插件为例，创建完成后的项目结构如下：

```
karin-plugin-example/
├── src/                 # 源代码目录
│   ├── apps/            # 插件应用目录（主要编写插件逻辑的地方）
│   │   ├── example.ts   # 示例插件
│   │   ├── handler.ts   # 事件处理器示例
│   │   ├── render.ts    # 渲染处理示例
│   │   ├── sendMsg.ts   # 消息发送示例
│   │   └── task.ts      # 定时任务示例
│   ├── utils/           # 工具函数目录
│   ├── app.ts           # 开发环境入口
│   ├── dir.ts           # 目录管理
│   └── index.ts         # 插件入口文件
├── config/              # 配置文件目录
├── resources/           # 静态资源目录
├── .vscode/             # VS Code配置
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript配置
├── tsup.config.ts       # 构建配置
├── development.env      # 开发环境配置
└── README.md            # 项目说明
```

### package.json 配置说明

插件的`package.json`中包含了一些重要配置：

```json
{
  "name": "karin-plugin-example", // 插件名称，需要以karin-plugin-开头
  "version": "1.0.0",
  "type": "module", // 使用ESM模块系统
  "scripts": {
    "dev": "cross-env EBV_FILE=\"development.env\" node --import tsx src/app.ts", // 开发命令
    "build": "tsup", // 构建命令
    "pub": "npm publish --access public" // 发布命令
  },
  "karin": {
    // Karin插件特有配置
    "main": "src/index.ts", // TS环境入口文件
    "apps": ["lib/apps"], // 生产环境apps目录
    "ts-apps": ["src/apps"], // 开发环境apps目录
    "static": ["resources"], // 静态资源目录
    "files": ["config", "data", "resources"] // 需要创建的文件夹
  }
}
```

### 开发流程

1. **环境准备**：确保已安装 Node.js (>=18) 和 pnpm

2. **创建项目**：

   ```bash
   pnpm create karin
   # 选择 TypeScript插件 或 JavaScript插件
   ```

3. **启动开发环境**：

   ```bash
   cd karin-plugin-example
   pnpm dev
   ```

4. **编写插件逻辑**：
   主要在 `src/apps/` 目录下编写插件逻辑。插件模板已经包含了几种常见的插件类型示例：

   - `example.ts`：基础命令示例
   - `handler.ts`：事件处理器示例
   - `task.ts`：定时任务示例
   - `render.ts`：渲染处理示例
   - `sendMsg.ts`：消息发送示例

5. **插件构建**：

   ```bash
   pnpm build
   ```

6. **发布插件**：

   ```bash
   pnpm pub
   ```

### 示例：创建一个简单的命令插件

在`src/apps/`目录下创建一个新文件，例如`myCommand.ts`：

```ts
import { karin } from 'node-karin'

/**
 * 创建一个简单的命令插件
 * 当接收到消息"#我的命令"时，回复"这是我的第一个Karin插件！"
 */
export const myFirstCommand = karin.command('^(#)?我的命令$', '这是我的第一个Karin插件！', {
  name: '我的命令', // 插件名称
  event: 'message', // 监听的事件
  reply: true, // 启用引用回复
})
```

### 插件调试技巧

1. **日志输出**：使用 Karin 内置的 logger 进行日志输出

   ```ts
   import { logger } from 'node-karin'

   logger.info('这是一条信息日志')
   logger.error('这是一条错误日志')
   logger.success('这是一条成功日志')
   ```

2. **开发模式热重载**：开发模式下，修改`apss`目录下的代码后会自动重新加载插件

3. **配置文件**：在`config`目录下创建 JSON 配置文件，可以通过以下方式读取

   ```ts
   import { readJSONSync } from 'node-karin/fs'
   import path from 'node:path'
   import { dir } from '../dir'

   // 读取配置文件
   const config = readJSONSync(path.join(dir.config, 'myConfig.json'))
   ```

### 更多资源

- 完整 API 文档：https://karin.fun/api/
- 命令插件示例：参考下方[消息插件示例](./demo.md)章节
- 前端组件开发：参考[前端配置](./component.md)章节

## 插件示例

- [消息插件示例](./demo.md)

## 前端配置

- [前端配置](./component.md)
