---
title: render
createTime: 2025/04/26 13:09:08
permalink: /docs/start/render/
---
# 渲染器安装

使用 `puppeteer` 作为默认渲染器。

问：渲染器的作用是什么？  
答：`karin` 大多数插件均使用 `html` 模板，渲染器的作用是将 `html` 转换为 `图片` 格式，以便于展示。

问：为什么使用 `puppeteer` ？  
答：经过我们将近一周的测试，`puppeteer` 无论在性能、渲染速度、兼容性等多方面均以碾压性优势领先于其他渲染器。

问：可否不安装渲染器？  
答：可以，只要不使用需要渲染的插件即可。

## 简介

<!-- - 国外源 (GitHub)： <Pill name="Github-karin-puppeteer" link="https://github.com/KarinJS/karin-puppeteer" />
- 国内源 (Gitee)： <Pill name="Gitee-karin-puppeteer" link="https://gitee.com/KarinJS/karin-puppeteer" /> -->

::: warning 注意
karin-puppeteer是一个单独的项目，需要单独安装运行。
:::

- 反向WS:
  - 渲染方式：本地文件
  - 优点：稳定、快速
  - 缺点：此方法仅在 `karin-puppeteer` 与 `karin` 在同一台服务器上时有效。
- 正向WS:
  - 渲染方式：远程文件、本地文件
  - 优点：在拥有反向WS的基础上，支持远程文件渲染，支持无公网
  - 缺点：远程渲染速度较慢，使用公有服务可能会有安全风险
- HTTP:
  - 渲染方式：本地文件、远程文件
  - 优点：同样支持远程文件渲染，速度较快
  - 缺点：需要 `karin-puppeteer` 与 `karin` 在同一局域网、公网内

总结：

> 如果你只需要偶尔进行测试，可选择使用正向 WS。  
> 如果需要长期文档使用，建议自建使用反向WS。  
> HTTP的作用在本地使用环境下，几乎和正向、反向WS无异。  
> 如果你的局域网内有高性能的渲染服务器，推荐使用HTTP。

## 安装渲染器

::: tip 温馨提示
请自行安装 `Node.js`。
:::

::: details 中国大陆服务器建议先更换npm源
终端内设置npm镜像源，加速下载依赖。
```bash
npm config set registry https://registry.npmmirror.com
```
:::

### 安装
::: code-group

```bash [npm]
npm init -y && npm install @karinjs/puppeteer@1.6.1 && npx init && node .
```

```bash [pnpm]
pnpm init && pnpm install @karinjs/puppeteer@1.6.1 && npx init && node .
```

```bash [yarn]
yarn init -y && yarn add @karinjs/puppeteer@1.6.1 && npx init && node .
```

:::

执行完成以上命令后不出意外，`karin-puppeteer` 已经安装成功并且正常启动了


## 相关命令

::: code-group

```bash [前台启动]
npx k .
```

```bash [后台启动]
npx k pm2

```

```bash [后台重启]
npx k rs
```

```bash [查看日志]
npx k log
```

```bash [查看帮助]
npx k
```

:::

## 配置文件

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
  "args": [
    "--enable-gpu",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--no-zygote",
    "--disable-extensions",
    "--disable-dev-shm-usage"
  ]
}
```
