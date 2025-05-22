---
title: 📋 插件规范
createTime: 2025/05/14 03:50:59
permalink: /guide/p13zmecw/
---

以往，在进行插件开发时，开发者常常将时间浪费在 **繁琐** 的兼容性、担忧各种问题的处理上。为了解决这些问题，我们制定了一套插件规范，帮助开发者更好的进行插件开发，提高 **开发效率** ，降低开发难度。

## 基本规范

> [!IMPORTANT]
> 为保证插件开发与使用的安全性、合法性以及社区的健康发展  
> 建议开发者在遵循以下规范的同时，保持对社区精神的尊重与支持

<details>

<summary><b>太长啦，打开看吧qaq</b></summary>

### 1. 免责声明与协议

- **免责声明**：建议开发者在仓库主页明确添加 **免责声明**，以规避潜在责任并为用户提供透明的信息。
- **开源插件**：必须提供符合国际标准的 **开源协议**。
- **闭源插件**：需严格遵守以下规则。

### 2. 禁止行为

开发者必须避免以下任何形式的违法、不当或有害行为：

- **法律与知识产权相关**：
  - 触犯法律法规的行为。
  - 侵犯第三方知识产权的行为。
- **恶意行为**：
  - 恶意推广、恶意宣传等不正当商业行为。
  - 利用插件进行违法犯罪活动。
  - 破坏性行为，包括恶意修改、删除、添加或利用插件进行损害操作。
- **用户隐私与数据安全**：
  - 侵害用户隐私，未经许可收集用户信息。
  - 恶意收集、泄露用户数据或隐私。
- **源代码安全**：
  - 恶意修改、删除或破坏插件源代码。
  - 在插件中嵌入后门、木马、病毒等恶意代码。
- **加密与混淆**：
  - 如插件含有加密或混淆代码，开发者需在仓库主页明确声明涉及的文件及其加密目的。

### 3. 提供开源协议的必要性

开发者需要为开源插件提供明确的开源协议，以下是原因：

1. **明确权利与义务**  
   开源并不等于免费。开源是一种精神，代表对社区的贡献与合作，也保障开发者权益，防止劳动成果被滥用或盗用。
2. **促进纠纷解决**  
   没有明确协议的插件，一旦产生争议，双方往往难以依托法规获得公正解决。开源协议为各方提供了清晰的法律依据。
3. **支持开发者商业化**  
   部分开源协议允许商业使用，开发者可借此实现收益，同时推动生态发展。

### 为什么遵守这些规范？

这些规范的核心在于倡导 **君子协议**，建立信任和合作的基础。通过遵守这些规范，我们可以：

- 一个良好的社区环境
- 增强用户与开发者的信心。
- 推动社区在透明、安全与创新的环境中发展。
- 维护 `karin` 生态的健康与稳定。

</details>

## 了解插件

> [!note]
> 本章节不涉及插件创建相关内容  
> 这里很重要，认真观看哦

插件可分`3`种类型，分别是

- `Npm插件`: 最明显的特征是通过`pnpm`安装的插件，通常是已经发布到 `npmjs.org` 托管的插件
- `Git插件`: 最明显的特征是通过`git`克隆的插件，通常是托管在 `Github` 或 `Gitee` 上的插件
- `App插件`: 通常是指单个`js`、`ts`文件，通常处于`./plugins/karin-plugin-example`目录下

### App 插件

> [!tip]
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

> [!tip]
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

> [!IMPORTANT]
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

> [!IMPORTANT]
> 推荐所有开发者都使用 `此方式` 来发布插件，而不是使用 `Git` 方式~
> 如果你不会使用 `npm` 发布插件，请查看后续章节的通过`npm`发布插件

特征:

- 处于项目的 `package.json` 中的 `dependencies` 或 `devDependencies` 中
- 通过包管理器安装
- 插件本身的 `package.json` 中包含`karin`字段

### Git 插件

> [!warning]
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

## 命名规范

> [!IMPORTANT]
> 命名规范是插件开发的基础，规范的命名有助于提高代码的可读性和可维护性

### 插件包

> [!CAUTION]
> **以下规范为强制要求，否则插件将无法被 Karin 识别和启用**

- <mark>插件包名称必须以 `karin-plugin-` 为前缀，紧接其后的部分为插件的具体名称。</mark>
- 必须使用英文命名，尽量保持简洁，避免使用特殊字符。
- 统一采用小写格式，单词之间使用 `-` 连接。
- 托管到 `Github` 或 `Gitee` 时，仓库名称必须与插件包名称一致。
- `package.json` 中的 `name` 字段必须与插件包名称一致。

**示例：**  
`karin-plugin-hello`、`karin-plugin-my-plugin`、`karin-plugin-my-awesome-plugin`

---

### App 插件

> 以下为推荐规范，但非强制要求。  
> **建议：** 除特殊需求外，不单独创建一个功能重复的 `karin-plugin-example` 文件夹。

- 文件应统一存放于 Karin 提供的 `karin-plugin-example` 文件夹中。
- 命名须使用英文，无需固定前缀。
- 名称应尽量简短，避免过长。
- 避免使用特殊字符，单词之间建议使用 `-` 连接。

**示例：**  
`hello-world.js`、`my-plugin.js`、`my-awesome-plugin.js`

## 多媒体资源规范

> [!IMPORTANT]
> 多媒体资源规范是框架和 Bot 协议交互过程中最重要的一环  
> 无论是上报的事件，主动请求的数据，都必须遵守这个规范

- 网络资源：
  - 必须携带 `http` 或 `https` 协议
  - 如：`https://www.example.com/image.png`
- 本地资源：
  - 必须携带 `file` 协议
  - 必须使用 `file://` 开头，禁止使用 `file:///` 开头
  - 同一服务器环境跨应用传输，比如使用 `绝对路径`
  - 如：`file://D:/example/image.png` 、`file:///root/image.png`
  - `file:///`前缀容易和`Linux`下的`file:///root`造成混淆，所以不使用
- `base64` :
  - 必须使用 `base64://` 开头
  - 不要携带 `data:image/png;base64,`等前缀
  - 如：`base64://iVBORw0KGAYAAR42mL8//8/AyUYw ...`
- `Buffer`:
  - 此类型在 `karin` 中无法使用，如有需求请转换为 `base64` 或 `file` 协议

## 可配置文件、数据文件规范

> [!note]
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

```ts twoslash
// @noErrorValidation
import { karinPathBase } from 'node-karin/root' // @karinjs

import { karinPathTemp } from 'node-karin/root' // @karinjs/temp

// 插件在@karinjs下的目录
import path from 'node:path'
import { karinPathPlugins } from 'node-karin/root'

// App插件默认创建的哦，不记得了就看下上面的package.json吧
const pluginName = 'karin-plugin-example'
const pluginPath = path.join(karinPathPlugins, pluginName)

const configPath = path.join(pluginPath, 'config')
const dataPath = path.join(pluginPath, 'data')
const resourcePath = path.join(pluginPath, 'resources')
const tempPath = path.join(karinPathTemp, pluginName)
```

> [!note] 
> 总结就是: 所有文件都要放在 @karinjs 下的目录中


<details>

<summary><b>点击查看示例文件结构</b></summary>

::: file-tree
- karin
  - @karinjs
    - <plugin_name> # 插件包名称
      - config # 配置文件夹
        - config.yaml # 用户配置文件
    - <plugin_name>
      - config # 配置文件夹
        - config.json # 用户配置文件
      - data/ # 数据文件夹
        - user.db # 用户数据文件
        - group.db # 群组数据文件 
      - resources/ # 资源文件夹
:::

</details>

### 临时文件

- ~~karin 会在启动的时候，在 `karin/temp` 下为每一个插件包创建对应名称的文件夹~~
- 相较于旧版本，`karin`不再为每个插件包在`temp`下创建对应的文件夹，有需求请自行创建
- 请不要直接在`temp`下创建文件，先创建一个文件夹，再在文件夹下创建文件
- 开发者可在该文件夹下存放临时文件，如缓存文件、日志文件等
- 请勿对他人的文件夹进行删除、修改
- 如无特殊需求，请不要在该文件夹下创建其他文件夹。


## 结构规范

::: tip
目前文档所呈现的规范均为`node-karin@1.0.0+`
:::

### 完整 Bot 结构

<!-- 推荐使用 https://devtool.tech/tree 生成树状结构 -->

<details>

<summary><b>点击查看树状结构</b></summary>

::: file-tree
- karin
  - @karinjs
    - config # 框架配置文件夹
      - config.yaml # 主配置文件
      - friendDirect.yaml # 好友直连配置
      - groupGuild.yaml # 群组配置
      - pm2.yaml # PM2配置
      - redis.yaml # Redis配置
      - server.yaml # 服务器配置
    - data # 框架数据文件夹
      - db # 数据库文件夹
        - level/ # Level数据库
        - redis-level/ # Redis-Level数据库
    - karin-plugin-example # 示例插件
      - config/ # 配置文件夹
      - data/ # 数据文件夹
      - resource/ # 资源文件夹
  - logs/ # 日志文件夹
  - node_modules/ # 依赖包
  - plugins/ # 插件包文件夹
    - karin-plugin-example/ # 示例插件
    - karin-plugin-xxx/ # 其他插件
  - .env # 环境变量文件
  - .npmrc # npm配置文件
  - .pnpmfile.cjs # PNPM配置文件
  - index.mjs # 入口文件
  - package.json # 包配置文件
  - package-lock.json # 依赖锁定文件
  - pnpm-workspace.yaml # PNPM工作区配置
:::

</details>

**关心以下重要的文件夹即可：**

- `@karinjs`：存放 `karin`和所有`plugin` 的配置文件、数据文件等
- `plugins`：存放所有的插件包 请将数据文件统一存放到 `@karinjs/<plugin_name>` 下

### TS 插件开发模板结构

:::tip
以下是`TypeScript`插件包的参考结构`(不含编译产物)`  
具体可根据实际情况进行调整  
请以[karin-plugin-template-ts][ts-template]为模板进行开发
:::

<details>

<summary><b>点击查看树状结构</b></summary>

::: file-tree
- karin-plugin-template-ts
  - .github
    - workflows
      - release.yml   # GitHub Actions工作流配置文件
  - .vscode
    - settings.json   # VS Code编辑器配置
  - config
    - config.json     # 插件默认配置文件
  - resources
    - image/          # 图片资源目录
    - template/       # 模板文件目录
  - src
    - apps/          # 插件应用目录（主要编写插件逻辑的地方）
      - example.ts   # 示例插件
      - handler.ts   # 事件处理器示例
      - render.ts    # 渲染处理示例
      - sendMsg.ts   # 消息发送示例
      - task.ts      # 定时任务示例
    - utils/         # 工具函数目录
    - app.ts         # 开发环境入口
    - dir.ts         # 目录管理
    - index.ts       # 插件入口文件
  - .env            # 环境变量配置文件
  - .gitignore      # Git忽略规则
  - development.env # 开发环境变量配置
  - eslint.config.mjs # ESLint配置
  - package.json    # 项目配置
  - README.md       # 项目说明文档
  - tsconfig.json   # TypeScript配置
  - tsup.config.ts  # 构建配置
:::


</details>

**温馨提示:**

- 下方的`<plugin_name>`就是指插件包的名称
- 请在发布到 npm 后，不要将可配置、可修改的文件防止到插件包内，而是放到`@karinjs/<plugin_name>`下
- 请将需要用户配置的 `json` `yaml` 等文件存放到 `@karinjs/<plugin_name>` 下的`config`文件夹下

## 仓库规范

> [!IMPORTANT]
> 强制仓库名称是为了方便用户可以快速在`Github`或`Gitee`上快速查找

- 要求插件仓库名称必须以 `karin-plugin-` 开头，必须与插件包名称一致
- 插件仓库必须提供开源协议

## 多媒体资源规范

- 网络资源：
  - 必须携带 `http` 或 `https` 协议
  - 如：`https://www.example.com/image.png`
- 本地资源：
  - 必须携带 `file` 协议
  - 必须使用 `file://` 开头，禁止使用 `file:///` 开头
  - 同一服务器环境跨应用传输，比如使用 `绝对路径`
  - 如：`file://D:/example/image.png` 、`file:///root/image.png`
- `base64` :
  - 必须使用 `base64://` 开头
  - 不要携带 `data:image/png;base64,`等前缀
  - 如：`base64://iVBORw0KGAYAAR42mL8//8/AyUYw ...`

[ts-template]: https://github.com/KarinJS/karin-plugin-template-ts
