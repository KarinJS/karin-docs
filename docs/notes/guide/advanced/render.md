---
title: 🎨 渲染器安装
createTime: 2025/05/14 01:01:55
permalink: /guide/9e95pid5/
---

使用 `puppeteer` 作为默认渲染器。

问：渲染器的作用是什么？  
答：`karin` 大多数插件均使用 `html` 模板，渲染器的作用是将 `html` 转换为 `图片` 格式，以便于展示。

问：为什么使用 `puppeteer` ？  
答：经过我们将近一周的测试，`puppeteer` 无论在性能、渲染速度、兼容性等多方面均以碾压性优势领先于其他渲染器。

问：可否不安装渲染器？  
答：可以，只要不使用需要渲染的插件即可。

## 渲染器类型

Karin 提供了两种类型的渲染器实现：

1. **插件版渲染器**：直接集成在 Karin 项目中，随 Karin 一起启动
2. **独立版渲染器**：作为独立项目运行，需要单独部署

## 插件版渲染器

插件版渲染器 `@karinjs/plugin-puppeteer` 是 Karin 开发团队提供的渲染器插件，可以直接安装在 Karin 项目中，无需额外部署和维护。

### 特点

- **一体化部署**：随 Karin 一起启动，无需额外维护
- **简单配置**：安装即用，配置简单
- **性能优良**：提供与独立版相同的渲染性能

### 安装方法

::: code-tabs
@tab npm

```bash
npm install @karinjs/plugin-puppeteer -w
```

@tab pnpm

```bash
pnpm add @karinjs/plugin-puppeteer -w
```

@tab yarn

```bash
yarn add @karinjs/plugin-puppeteer
```

:::

安装完成后，插件会自动注册到 Karin 框架中，无需额外配置即可使用。

### 配置说明

插件版渲染器会自动读取 Karin 的配置文件，您可以在 Karin 的 WebUI 中添加或修改相关配置：

## 独立版渲染器

::: warning 注意
karin-puppeteer 是一个单独的项目，需要单独安装运行。
:::

- 反向 WS:
  - 渲染方式：本地文件
  - 优点：稳定、快速
  - 缺点：此方法仅在 `karin-puppeteer` 与 `karin` 在同一台服务器上时有效。
- 正向 WS:
  - 渲染方式：远程文件、本地文件
  - 优点：在拥有反向 WS 的基础上，支持远程文件渲染，支持无公网
  - 缺点：远程渲染速度较慢，使用公有服务可能会有安全风险
- HTTP:
  - 渲染方式：本地文件、远程文件
  - 优点：同样支持远程文件渲染，速度较快
  - 缺点：需要 `karin-puppeteer` 与 `karin` 在同一局域网、公网内

总结：

> 如果你只需要偶尔进行测试，可选择使用正向 WS。  
> 如果需要长期文档使用，建议自建使用反向 WS。  
> HTTP 的作用在本地使用环境下，几乎和正向、反向 WS 无异。  
> 如果你的局域网内有高性能的渲染服务器，推荐使用 HTTP。

### 安装

::: tip 温馨提示
请自行安装 `Node.js`。
:::

::: details 中国大陆服务器建议先更换 npm 源
终端内设置 npm 镜像源，加速下载依赖。

```bash
npm config set registry https://registry.npmmirror.com
```

:::

::: code-tabs
@tab npm

```bash
npm init -y && npm install @karinjs/puppeteer@latest && npx init && node .
```

@tab pnpm

```bash
pnpm init && pnpm install @karinjs/puppeteer@latest && npx init && node .
```

@tab yarn

```bash
yarn init -y && yarn add @karinjs/puppeteer@latest && npx init && node .
```

:::

执行完成以上命令后不出意外，`karin-puppeteer` 已经安装成功并且正常启动了

### 相关命令

::: code-tabs
@前台启动

```bash
npx k .
```

@后台启动

```bash
npx k pm2

```

@后台重启

```bash
npx k rs
```

@查看日志

```bash
npx k log
```

@查看帮助

```bash
npx k
```

:::

### 配置文件

`karin-puppeteer` 初次启动之后，会在 `跟目录` 下生成 `config.json` 配置文件。

```json
{
  "logLevel": "info", // 日志级别
  "headless": true, // 是否无头启动
  // http服务配置
  "http": {
    "host": "0.0.0.0", // 监听地址
    "port": 7005, // 监听端口
    "token": "123456" // 鉴权token
  },
  // 反向WS配置
  "ws": {
    "enable": true, // 是否启用
    "token": "123456", // 鉴权token
    "path": "/ws", // WS路径
    // 反向WS列表
    "list": [
      {
        "url": "ws://127.0.0.1:7000/puppeteer", // WS地址
        "token": "123456" // 鉴权token
      }
    ]
  },
  "browserCount": 1, // 浏览器数量
  // 启动参数
  "args": ["--enable-gpu", "--no-sandbox", "--disable-setuid-sandbox", "--no-zygote", "--disable-extensions", "--disable-dev-shm-usage"]
}
```

## 渲染器对比

| 特性       | 插件版              | 独立版               |
| ---------- | ------------------- | -------------------- |
| 部署方式   | 作为 Karin 插件安装 | 独立项目部署         |
| 资源占用   | 与 Karin 共享资源   | 独立占用资源         |
| 适用场景   | 个人使用、小型部署  | 大型部署、高性能需求 |
| 配置复杂度 | 简单                | 相对复杂             |
| 更新维护   | WebUI 统一管理更新  | 需单独更新           |

::: tip 选择建议

- 如果您是个人用户或小型团队，推荐使用插件版渲染器，安装简单，无需额外维护
- 如果您有高性能需求或需要在多个 Karin 实例间共享渲染服务，推荐使用独立版渲染器
  
:::
