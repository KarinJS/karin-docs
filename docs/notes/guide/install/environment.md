---
title: 🛠️ 环境安装
createTime: 2025/05/14 02:39:47
permalink: /guide/j6ksgvd6/
---

## Node.js <Badge type="danger" text="铛铛铛！必需品" />

::: warning 友情提示
`Karin`是一个基于`Node.js`开发的可爱机器人框架，在 [MIT License](./license.md) 下开源~
:::

### 版本要求

::: warning 友情提示
🌟 推荐使用 Node.js 的 `LTS` 版本(v22+)，这样可以获得最稳定的体验哦！
:::

小贴士：

- 最低支持 v18+，推荐使用 v22+
- ~~虽然理论上支持 v16+，但是为了获得最佳体验还是推荐使用更新版本啦~~
- 官方的`LTS`版本，所以跟着大家一起用 v22+ 准没错！
- 当然啦，如果你只是想尝鲜，用其他版本也不是不可以 😉

### 安装方式

::: warning 友情提示
如果没有一定的基础，请勿随意使用`nvm`安装，否则可能会出现一些奇奇怪怪的问题哦
:::

<details>
<summary>Windows 系统安装方法</summary>

#### Windows 系统

1. 使用官方安装包(推荐)

   - 访问 [Node.js 官网](https://nodejs.org/zh-cn) 下载安装包
   - [如果无法访问，可以使用下方列表的安装包哦](#下载地址)
   - 下载 LTS 版本的 .msi 安装包
   - 双击运行安装程序，全部下一步即可

2. 使用 nvm-windows (适合需要管理多个 Node.js 版本的用户)

   - 访问 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 下载最新版本
   - 下载 nvm-setup.exe 并安装
   - 打开命令提示符(cmd)，运行:

     ```bash
     nvm install latest  # 安装最新版
     nvm install lts    # 安装 LTS 版本
     nvm use xxx       # 使用指定版本
     ```

</details>

<details>
<summary>macOS 系统安装方法</summary>

#### macOS 系统

1. 使用 Homebrew

   ```bash
   brew install node
   ```

2. 使用 nvm (推荐)

   ```bash
   # 1. 安装 nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # 2. 安装 Node.js
   nvm install node    # 安装最新版
   nvm install --lts  # 安装 LTS 版本
   nvm use xxx       # 使用指定版本
   ```

</details>

<details>
<summary>Linux 系统安装方法</summary>

#### Linux 系统

1. 使用包管理器

::: code-tabs
@tab Ubuntu/Debian

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

@tab CentOS/RHEL

```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

:::

2. 使用 nvm (推荐)

   ```bash
   # 1. 安装 nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # 2. 安装 Node.js
   nvm install node    # 安装最新版
   nvm install --lts  # 安装 LTS 版本
   nvm use xxx       # 使用指定版本
   ```

</details>

### 下载地址

::: warning 友情提示
以下下载链接由 npmmirror 提供的国内镜像，如果无法访问请前往 [Node.js 官网](https://nodejs.org/) 下载。
:::

<NodeDownloads />

### 验证安装

::: warning 友情提示
`npm` 是 `Node.js` 的自带的包管理器，安装`Node.js`时会自动安装
:::

安装完成后，打开终端输入以下命令验证:

```bash
node -v  # 查看 Node.js 版本
npm -v   # 查看 npm 版本
```

如果能正确显示版本号，说明安装成功啦！

## Git <Badge type="warning" text="可选，但强烈推荐！" />

::: warning 友情提示
`Git` 是一个分布式版本控制系统，在 Karin 中主要用于 `Git` 插件的安装和更新
:::

### Windows 安装

1. 下载安装包:

   - [Git 官网](https://git-scm.com/)
   - 国内镜像源(推荐):
     - [64 位 Git](https://registry.npmmirror.com/-/binary/git-for-windows/v2.47.1.windows.1/Git-2.47.1-64-bit.exe)
     - [32 位 Git](https://registry.npmmirror.com/-/binary/git-for-windows/v2.47.1.windows.1/Git-2.47.1-32-bit.exe)
     - [ARM64 位 Git](https://registry.npmmirror.com/-/binary/git-for-windows/v2.47.1.windows.1/Git-2.47.1-arm64.exe)

2. 运行安装程序，全部使用`默认选项`即可

> ps: 也就是一路`Next`，直到安装完成~

### macOS 安装

```bash
brew install git
```

### Linux 安装

::: code-tabs
@tab Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install git
```

@tab CentOS/RHEL

```bash
sudo yum install git
```

:::

### 验证安装

```bash
git --version  # 显示版本号即为安装成功
```

## 包管理器 pnpm <Badge type="tip" text="更快更好用！" />

### 什么是 pnpm？

pnpm 是一个快速、节省磁盘空间的包管理器。它具有以下特点：

- 比 npm/yarn 快 2-3 倍
- 节省磁盘空间，相同的依赖只会被存储一次
- 支持 monorepo，方便管理多个项目
- 更安全的依赖管理
- `你也不想你的依赖吃掉你的硬盘空间吧~`

在 Karin 框架中，pnpm 的工作区(workspace)功能尤为重要：

- 所有的`Git`插件都是一个独立的工作区
- 可以统一管理所有插件的依赖
- 方便进行插件的开发和调试

### 安装 pnpm

::: warning 友情提示
pnpm 在 10.x 版本引入了一个破坏性变更  
~~目前暂时无法很好的对此进行兼容~~  
请务必使用 `pnpm v9` 版本  
如果已经安装了`pnpm v10`的小伙伴请不要跳过此步骤

新增版本: `1.8.0`

目前已经对`pnpm v10.x`版本进行一定的适配  
如果没有编程基础推荐使用`9`，无脑哦！！！  
下方也列出了关于`pnpm v10.x`的指引  
使用 `pnpm v10.x` 版本的用户请注意：

- 必须使用`node-karin v1.8.0`及以上版本
- `pnpm` 必须使用 `v10.8.0` 及以上版本

:::

::: code-tabs
@官方源

```bash
# 安装 9.x 版本的pnpm
npm install pnpm@9 -g

# pnpm v10.x
npm install pnpm -g
```

@国内源

```bash
# 国内加速版！
npm --registry=https://registry.npmmirror.com install pnpm@9 -g

# pnpm v10.x
npm --registry=https://registry.npmmirror.com install pnpm -g
```

@查看版本

```bash
# 查看版本
pnpm -v
```

:::

### 配置镜像源

::: warning 友情提示
国内的小伙伴们注意啦！如果访问官方源太慢，咱们换个源吧！
:::


🚀 换源指南：

::: code-tabs

@tab 淘宝源
```sh
# 推荐使用这个，速度杠杠的！
npm config set registry https://registry.npmmirror.com
```

@tab 腾讯源
```sh
# 淘宝源不行？试试腾讯源！
npm config set registry https://mirrors.cloud.tencent.com/npm
```

@tab 官方源
```sh
# 想换回官方源也可以哦
npm config set registry https://registry.npmjs.org
```

```sh
# 看看现在用的是哪个源
npm config get registry
```

:::

### pnpm 常用命令

::: tip 小贴士

- 后面我们会经常用到 pnpm，建议先熟悉一下这些基本命令哦！
- 在开发插件时，工作区相关的命令会特别有用
  :::

```bash
# 工作区相关
pnpm -r install           # 安装所有工作区的依赖
pnpm --filter <pkg> add   # 为指定工作区安装依赖
pnpm -r update           # 更新所有工作区的依赖

# 基础命令
pnpm install      # 安装所有依赖
pnpm add <pkg>    # 安装某个包
pnpm add -D <pkg> # 安装开发依赖
pnpm up           # 更新所有依赖
pnpm update       # 更新所有依赖
pnpm rm <pkg>     # 删除某个包
pnpm remove <pkg> # 删除某个包
pnpm run <script> # 运行 package.json 中定义的脚本
```

## 关于`pnpm v10.x`版本

> [!note] 
> karin 非 1.8.0+ 的版本，请勿使用 pnpm v10.x

### 背景

> [!caution] 
> pnpm v10.x 版本引入了一个破坏性变更
>
> 官方原文如下:  
> Since v10, pnpm doesn't run the lifecycle scripts of dependencies unless they are listed in onlyBuiltDependencies.
>
> 从 v10 开始，pnpm 不会运行依赖项的生命周期脚本，除非它们在 onlyBuiltDependencies 中列出。  
> 原文地址: [点击查看](https://pnpm.io/settings#ignoredepscripts)

- 我们使用`sqlite3`作为举例，`sqlite3`的安装需要编译二进制文件的
- 但是开发者为了方便用户的使用，会将构建产物预编译，并将这些构建产物托管到对应的代码平台上
- 这样用户在安装的时候就不需要自己编译了，直接下载对应的二进制文件即可
- 在`pnpm v9.x`版本中，执行`pnpm install`
- `sqlite3`会执行一个`install`的脚本，来下载对应的二进制文件
- 在`pnpm v10.x`版本中，`sqlite3`的这个下载行为会被禁止，需要手动允许

如下所示:
![sqlite3](/web/approve-builds.png)

### 解决方法

> [!note]
> 执行完成`pnpm install`后  
> 如果出现了上图的这个提示，只需要跟着下面的步骤走就可以了哦~

- 输入 `pnpm approve-builds`

  ![pnpm approve-builds](/web/pnpm-approve-builds.png)

- 输入 `a`

  ![a](/web/pnpm-approve-builds-a.png)

- 按下回车 也就是直接按下`Enter`键即可

  ![enter](/web/pnpm-approve-builds-enter.png)

- 输入 `y`

  ![y](/web/pnpm-approve-builds-y.png)

到此为止，`sqlite3`的安装就完成了

> [!note]
> 当然，一个依赖只需要一次即可~  
> 查看`pnpm-workspace.yaml`，会发现`onlyBuiltDependencies`中已经添加了对应的依赖  
> 这样下次安装的时候就不会再询问了哦~

```yaml
onlyBuiltDependencies:
  - '@karinjs/node-pty'
  - '@karinjs/sqlite3-cjs'
  - canvas
  - classic-level
  - sqlite3
```

### 写给开发者的话

> [!note]
> 如果你的插件依赖了包含`生命周期脚本`的依赖  
> 可以将安装指令修改为如下所示  
> 注意要求使用`pnpm v10.8.0+`版本哦~

```bash
pnpm add karin-plugin-xxx -w
```

修改为

```bash
# pnpm v9.x 版本
pnpm add karin-plugin-xxx -w

# pnpm v10.x 版本
pnpm --allow-build=sqlite3 add karin-plugin-xxx -w
```

如果是多个:

```bash
# pnpm v9.x 版本
pnpm add karin-plugin-xxx -w

# pnpm v10.x 版本
pnpm --allow-build=sqlite3 --allow-build=canvas add karin-plugin-xxx -w
```
