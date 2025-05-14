---
title: 🔌 接入平台
createTime: 2025/05/14 02:39:47
permalink: /guide/8qzackqe/
---

# 目录

[[toc]]

## 接入适配器

::: warning 温馨提示
支持所有符合 `OneBot11` 标准的平台 包括但不限于以下  
以下排名不分先后 感谢所有前行者的无私奉献！  
:::

- [NapCat](https://www.napcat.wiki/)
- [LLOneBot](https://llonebot.github.io/zh-CN/)
- [Lagrange.OneBot](https://lagrangedev.github.io/Lagrange.Doc/Lagrange.OneBot/)
- [Gensokyo](https://github.com/Hoshinonyaruko/Gensokyo)
- [OneBots](https://github.com/lc-cn/onebots)
- 更多适配器正在路上... 🚀

## 基本配置信息

::: warning 温馨提示
本文适用于`1.4.7+`版本  
启动 Karin 后，你将看到一个充满魔法的控制台界面 ✨
:::

### 默认配置一览

- HTTP 服务端口: `7777`
- WebSocket 服务端口: `7777` (与 HTTP 端口共用)
- HTTP Token: 自动生成的 6 位随机大小写字母
- WebSocket Token: 自动生成的 6 位随机大小写字母
- Web 控制台地址: `http://127.0.0.1:7777/web`
- OneBot11 API 接入点`(任选其一)`:
  - 1: `ws://127.0.0.1:7777`
  - 2: `ws://127.0.0.1:7777/onebot/v11/ws`
  - 3: `http_post` `http://127.0.0.1:7777/onebot`

![karin_start](/web/karin_start.png)

## WebSocket 连接说明

::: tip 小贴士
让我们来了解一下 WebSocket 连接的两种模式，就像认识两个性格不同的小伙伴 🤝
:::

### 正向 WebSocket vs 反向 WebSocket

想象一下两种不同的交友方式：

- **反向 WebSocket (Client 模式)**

  - 协议端主动出击，向 Karin 发起连接请求
  - Karin 作为 WebSocket 服务器(Server)静待连接
  - 就像是协议端主动来敲 Karin 的门

- **正向 WebSocket (Server 模式)**
  - Karin 主动出击，向协议端发起连接
  - 协议端作为 WebSocket 服务器等待连接
  - 就像是 Karin 去拜访协议端

Karin 默认开启反向 WebSocket 模式，也就是在家里等着朋友来访 🏠

## 实战配置：以 NapCat 为例

::: warning 温馨提示
开始之前，请确保已从 Karin 控制台获取到 WebSocket 鉴权 Token
:::

### 配置步骤

1. 启动 `Karin`，它会在 `7777` 端口开启派对 🎉
2. 从控制台获取专属的 WebSocket 鉴权 Token
3. 启动 `NapCat`，建立友谊
4. 配置 `NapCat`，让它知道去哪找 `Karin`
5. 查看 `Karin` 日志，确认连接成功

### NapCat 具体配置

首先确保你已经：

- 安装好 `NapCat`
- 进入 `NapCat` 的 Web 控制台

#### 配置详细步骤

1. 在 `NapCat` 控制台点击`网络配置`：

![napcat_webui](/web/napcat_webui.png)

2. 创建新连接：
   - 点击`新建`按钮
   - 选择`WebSocket客户端`模式

![napcat_webui_client_new](/web/napcat_webui_client_new.png)

3. 填写连接信息：
   - 启用开关：✅ 开启
   - 名称：`karin` `(支持任意名称)`
   - URL：`ws://127.0.0.1:7777`
   - 鉴权 Token：填入 Karin 控制台显示的 Token
   - 最后点击`保存`

![napcat_webui_client_save](/web/napcat_webui_client_save.png)

如果一切顺利，切换到 Karin 控制台，你会看到这样温馨的提示：

![karin_connect](/web/karin_connect.png)

恭喜你！Karin 和 NapCat 已经成功牵手啦 🎊

## 实战配置二: Karin 主动出击 NapCat

::: warning 温馨提示
`鉴权token`支持不配置，但是推荐配置。
:::

### 配置步骤

1. 启动 `NapCat` 开启服务
2. 配置 `NapCat` 开启端口
3. 启动 `karin`
4. 进入 `Karin-webui` 配置 `WebSocket` 连接
5. 配置 `WebSocket` 连接信息
6. 保存配置
7. 查看 `Karin` 日志，确认连接成功

#### NapCat 具体配置

1. 在 `NapCat` 控制台点击`网络配置`：

![napcat_webui](/web/napcat_webui.png)

2. 创建新连接：
   - 点击`新建`按钮
   - 选择`WebSocket服务器`模式

![napcat_webui_client_new](/web/napcat_webui_client_new.png)

3. 填写连接信息：
   - 启用开关：✅ 开启
   - 名称：`karin_server` `(支持任意名称)`
   - HOST: `无需修改 默认即可`
   - Port: 3001 `(记住此端口 后续需要使用)`
   - Token: NapCat `(不配置也可以的 如果配置需要记住 后续需要使用)`
   - 最后点击`保存`

![napcat_webui_client_save](/web/napcat_webui_client_save.png)

4. 组合 wsUrl: `ws://127.0.0.1:3001` token: `NapCat`

#### Karin 具体配置

1. 打开 `Karin-webui`
   - 打开 `http://127.0.0.1:7777/web` 如果更换了端口请以控制台打印为准
   - 在登录页面输入控制台打印的 http 鉴权 token: `AffryQ`
   - 点击`登录`

![karin_webui_login](/web/karin_webui_login.png)

2. 进入 `Karin-webui` 配置 `WebSocket` 连接
   - 点击 `配置信息` 进入系统配置
   - 选择 `适配器`
   - 选择 `正向 WebSocket 客户端`
   - 点击 `添加`

![karin_webui_client_new](/web/karin_webui_client_new.png)

3. 填写连接信息：
   - 启用开关：✅ 开启
   - WebSocketServer 地址: `ws://127.0.0.1:3001`
   - Token: `NapCat`
   - 最后点击右上角的`保存`

![karin_webui_websocket_save](/web/karin_webui_websocket_save.png)

4. 查看 `Karin` 日志，确认连接成功

![karin_connect](/web/karin_connect.png)

::: tip
更多接入正在编写中...
:::
