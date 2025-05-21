---
title: 📝 配置文件
createTime: 2025/05/14 01:01:55
permalink: /guide/t0xrpxol/
---

> [!IMPORTANT]
> 在本节中，我们将详细介绍配置文件的各个配置项。

`.env`:

- 位置: 处于`karin`的根目录下: `karin/.env`
- 描述: 存放`karin`的环境变量

## `.env` 文件

> [!IMPORTANT]
> 环境变量配置文件，用于配置一些基础的运行环境参数
> 支持在控制台通过`log <level>`命令动态更新日志等级哦~

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项               | 类型      | 描述                                                            |
| -------------------- | --------- | --------------------------------------------------------------- |
| `HTTP_ENABLE`        | `boolean` | 是否启用 HTTP 服务                                              |
| `HTTP_PORT`          | `number`  | HTTP 服务监听端口                                               |
| `HTTP_HOST`          | `string`  | HTTP 服务监听地址                                               |
| `HTTP_AUTH_KEY`      | `string`  | HTTP 服务鉴权密钥，仅用于 karin 自身 Api                        |
| `WS_SERVER_AUTH_KEY` | `string`  | WebSocket 服务器鉴权密钥                                        |
| `REDIS_ENABLE`       | `boolean` | 是否启用 Redis，关闭后将使用内部虚拟 Redis                      |
| `PM2_RESTART`        | `boolean` | 重启是否调用 pm2，如果不调用则会直接关机                        |
| `LOG_LEVEL`          | `string`  | 日志等级，可选值: `trace` `debug` `info` `warn` `error` `fatal` |
| `LOG_DAYS_TO_KEEP`   | `number`  | 日志保留天数                                                    |
| `LOG_MAX_LOG_SIZE`   | `number`  | 日志文件最大大小(字节)，如果大于 0 则启用日志分割               |
| `LOG_FNC_COLOR`      | `string`  | logger.fnc 的颜色，支持 HEX 格式                                |
| `FFMPEG_PATH`        | `string`  | ffmpeg 可执行文件路径                                           |
| `FFPROBE_PATH`       | `string`  | ffprobe 可执行文件路径                                          |
| `FFPLAY_PATH`        | `string`  | ffplay 可执行文件路径                                           |
| `RUNTIME`            | `string`  | 运行时环境，固定为`node`                                        |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```ini
# 是否启用HTTP
HTTP_ENABLE=true
# HTTP监听端口
HTTP_PORT=7777
# HTTP监听地址
HTTP_HOST=0.0.0.0
# HTTP鉴权秘钥 仅用于karin自身Api
HTTP_AUTH_KEY=default
# ws_server鉴权秘钥
WS_SERVER_AUTH_KEY=

# 是否启用Redis 关闭后将使用内部虚拟Redis
REDIS_ENABLE=true
# 重启是否调用pm2 如果不调用则会直接关机 此配置适合有进程守护的程序
PM2_RESTART=true

# 日志等级
LOG_LEVEL=info
# 日志保留天数
LOG_DAYS_TO_KEEP=7
# 日志文件最大大小 如果此项大于0则启用日志分割
LOG_MAX_LOG_SIZE=0
# logger.fnc颜色
LOG_FNC_COLOR="#E1D919"

# ffmpeg
FFMPEG_PATH=
# ffprobe
FFPROBE_PATH=
# ffplay
FFPLAY_PATH=

# 这里请勿修改
RUNTIME=node
```

</details>

<!-- 点击展开示例配置 -->

<details>
<summary>点击展开示例配置</summary>

```ini
# 启用HTTP服务并监听所有地址的7777端口
HTTP_ENABLE=true
HTTP_PORT=7777
HTTP_HOST=0.0.0.0
# 设置API鉴权密钥
HTTP_AUTH_KEY=your_secret_key
# 设置WebSocket服务器鉴权密钥
WS_SERVER_AUTH_KEY=your_ws_key

# 启用Redis服务
REDIS_ENABLE=true
# 启用PM2重启
PM2_RESTART=true

# 设置日志级别为debug以获取更详细的日志
LOG_LEVEL=debug
# 保留30天的日志
LOG_DAYS_TO_KEEP=30
# 设置日志分割大小为10MB
LOG_MAX_LOG_SIZE=10485760
# 设置logger.fnc的颜色为蓝色
LOG_FNC_COLOR="#4169E1"

# 配置ffmpeg相关路径
FFMPEG_PATH=/usr/local/bin/ffmpeg
FFPROBE_PATH=/usr/local/bin/ffprobe
FFPLAY_PATH=/usr/local/bin/ffplay

RUNTIME=node
```

</details>

`@karinjs:`

- 位置: 处于`karin`的根目录下: `karin/@karinjs`
- 描述: 存放插件以及`karin`本身的配置、临时、数据文件等
- 结构: 除了`config` `data` `temp`文件夹外，其余文件夹均属于插件的配置文件夹

- 插件的配置文件夹一般情况会自动生成
  - 插件包名称: 名称来源于`package.json`的`name`字段，并且`karin`会将其中的`/`替换为`-`
  - 位置: `karin/@karinjs/<plugin_name>`

## `config` 目录

- 位置: `karin/@karinjs/config`
- 描述: 存放`karin`的配置文件夹
- 结构:
  - `adapter.json`: 适配器配置文件
  - `config.json`: `karin`基本配置文件
  - `privates.json`: `好友、频道私信` 触发事件相关的配置文件
  - `groups.json`: `群、频道` 触发事件相关的配置文件
  - `pm2.json`: `pm2`配置文件
  - `redis.json`: `redis`配置文件
  - `render.json`: 渲染器配置

### `adapter.json`

> [!IMPORTANT]
> 适配器配置文件，用于配置各种协议适配器

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项                         | 类型       | 描述                                      |
| ------------------------------ | ---------- | ----------------------------------------- |
| `console`                      | `object`   | 控制台适配器配置                          |
| `console.isLocal`              | `boolean`  | 是否为只允许本地访问                      |
| `console.token`                | `string`   | 如果`isLocal`为`false`，则需要设置`token` |
| `console.host`                 | `string`   | 打印的资源地址                            |
| `onebot`                       | `object`   | onebot 适配器配置                         |
| `onebot.ws_server`             | `object`   | WebSocket 服务器配置(反向 ws)             |
| `onebot.ws_server.enable`      | `boolean`  | 是否启用 WebSocket 服务器                 |
| `onebot.ws_server.timeout`     | `number`   | onebot 发送请求超时时间                   |
| `onebot.ws_client`             | `object[]` | WebSocket 客户端配置(正向 ws)             |
| `onebot.ws_client[].enable`    | `boolean`  | 是否启用此 WebSocket 客户端               |
| `onebot.ws_client[].url`       | `string`   | 正向 ws 的地址                            |
| `onebot.ws_client[].token`     | `string`   | 正向 ws 的鉴权令牌                        |
| `onebot.http_server`           | `object[]` | HTTP 服务器配置                           |
| `onebot.http_server[].enable`  | `boolean`  | 是否启用此 HTTP 服务器                    |
| `onebot.http_server[].self_id` | `string`   | 正向 http 的 QQ 号                        |
| `onebot.http_server[].url`     | `string`   | http 服务的地址                           |
| `onebot.http_server[].token`   | `string`   | http 服务的鉴权令牌                       |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "console": {
    "isLocal": true,
    "token": "",
    "host": ""
  },
  "onebot": {
    "ws_server": {
      "enable": true,
      "timeout": 120
    },
    "ws_client": [
      {
        "enable": false,
        "url": "ws://127.0.0.1:7778",
        "token": ""
      }
    ],
    "http_server": [
      {
        "enable": false,
        "self_id": "default",
        "url": "http://127.0.0.1:6099",
        "token": ""
      }
    ]
  }
}
```

</details>

<!-- 点击展开示例配置 -->

<details>
<summary>点击展开示例配置</summary>

```json
{
  "console": {
    "isLocal": false, // 允许远程访问
    "token": "abc123", // 设置远程访问令牌
    "host": "example.com" // 设置资源访问地址
  },
  "onebot": {
    "ws_server": {
      "enable": true, // 启用反向WebSocket服务器
      "timeout": 60 // 设置请求超时时间为60秒
    },
    "ws_client": [
      {
        "enable": true, // 启用第一个正向WebSocket客户端
        "url": "ws://bot1.example.com:6700", // 连接到第一个机器人
        "token": "xyz789" // 设置连接令牌
      },
      {
        "enable": true, // 启用第二个正向WebSocket客户端
        "url": "ws://bot2.example.com:6700", // 连接到第二个机器人
        "token": "uvw321" // 设置连接令牌
      }
    ],
    "http_server": [
      {
        "enable": true, // 启用第一个HTTP服务器
        "self_id": "123456789", // 设置机器人QQ号
        "url": "http://bot1.example.com:5700", // 第一个机器人的API地址
        "token": "def456" // 设置访问令牌
      },
      {
        "enable": true, // 启用第二个HTTP服务器
        "self_id": "987654321", // 设置机器人QQ号
        "url": "http://bot2.example.com:5700", // 第二个机器人的API地址
        "token": "ghi789" // 设置访问令牌
      }
    ]
  }
}
```

</details>

### `config.json`

> [!IMPORTANT] 
> `karin`基本配置文件

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

> [!IMPORTANT]
> 对于黑白名单配置，是可以同时存在的，并且黑名单的优先级更高  
> 例如: 如果一个用户同时处于黑白名单中，那么他将被视为黑名单用户

| 配置项                      | 类型       | 描述                 |
| --------------------------- | ---------- | -------------------- |
| `master`                    | `string[]` | Bot 主人列表         |
| `admin`                     | `string[]` | Bot 管理员列表       |
| `user`                      | `object`   | 用户管理配置         |
| `user.enable_list`          | `string[]` | 用户白名单           |
| `user.disable_list`         | `string[]` | 用户黑名单           |
| `friend`                    | `object`   | 好友管理配置         |
| `friend.enable`             | `boolean`  | 是否启用好友消息事件 |
| `friend.enable_list`        | `string[]` | 好友白名单           |
| `friend.disable_list`       | `string[]` | 好友黑名单           |
| `friend.log_enable_list`    | `string[]` | 好友日志白名单       |
| `friend.log_disable_list`   | `string[]` | 好友日志黑名单       |
| `group`                     | `object`   | 群管理配置           |
| `group.enable`              | `boolean`  | 是否启用群消息事件   |
| `group.enable_list`         | `string[]` | 群白名单             |
| `group.disable_list`        | `string[]` | 群黑名单             |
| `group.log_enable_list`     | `string[]` | 群日志白名单         |
| `group.log_disable_list`    | `string[]` | 群日志黑名单         |
| `directs`                   | `object`   | 频道私信管理配置     |
| `directs.enable`            | `boolean`  | 是否启用私信消息事件 |
| `directs.enable_list`       | `string[]` | 私信白名单           |
| `directs.disable_list`      | `string[]` | 私信黑名单           |
| `directs.log_enable_list`   | `string[]` | 私信日志白名单       |
| `directs.log_disable_list`  | `string[]` | 私信日志黑名单       |
| `guilds`                    | `object`   | 频道管理配置         |
| `guilds.enable`             | `boolean`  | 是否启用频道消息事件 |
| `guilds.enable_list`        | `string[]` | 频道白名单           |
| `guilds.disable_list`       | `string[]` | 频道黑名单           |
| `guilds.log_enable_list`    | `string[]` | 频道日志白名单       |
| `guilds.log_disable_list`   | `string[]` | 频道日志黑名单       |
| `channels`                  | `object`   | 频道消息管理配置     |
| `channels.enable`           | `boolean`  | 是否启用频道消息事件 |
| `channels.enable_list`      | `string[]` | 频道白名单           |
| `channels.disable_list`     | `string[]` | 频道黑名单           |
| `channels.log_enable_list`  | `string[]` | 频道日志白名单       |
| `channels.log_disable_list` | `string[]` | 频道日志黑名单       |

</details>

<!-- 点击展开默认配置 -->
<details>
<summary>点击展开默认配置</summary>

```json
{
  "master": ["console"],
  "admin": [],
  "user": {
    "enable": true,
    "enable_list": [],
    "disable_list": []
  },
  "friend": {
    "enable": true,
    "enable_list": [],
    "disable_list": [],
    "log_enable_list": [],
    "log_disable_list": []
  },
  "group": {
    "enable": true,
    "enable_list": [],
    "disable_list": [],
    "log_enable_list": [],
    "log_disable_list": []
  },
  "directs": {
    "enable": true,
    "enable_list": [],
    "disable_list": [],
    "log_enable_list": [],
    "log_disable_list": []
  },
  "guilds": {
    "enable": true,
    "enable_list": [],
    "disable_list": [],
    "log_enable_list": [],
    "log_disable_list": []
  },
  "channels": {
    "enable": true,
    "enable_list": [],
    "disable_list": [],
    "log_enable_list": [],
    "log_disable_list": []
  }
}
```

</details>

<!-- 点击展开示例配置 -->
<details>
<summary>点击展开示例配置</summary>

```json
{
  "master": [
    "console", // 默认控制台用户
    "123456789" // 示例：添加一个主人用户
  ],
  "admin": [
    "987654321" // 示例：添加一个管理员
  ],
  "user": {
    "enable": true, // 示例：启用用户事件
    "enable_list": [
      "111111111" // 示例：允许此用户使用机器人
    ],
    "disable_list": [
      "222222222" // 示例：禁止此用户使用机器人
    ]
  },
  "friend": {
    "enable": true,
    "enable_list": [
      "333333333" // 示例：允许此好友触发事件
    ],
    "disable_list": [
      "444444444" // 示例：禁止此好友触发事件
    ],
    "log_enable_list": [
      "555555555" // 示例：记录此好友的日志
    ],
    "log_disable_list": [
      "666666666" // 示例：不记录此好友的日志
    ]
  },
  "group": {
    "enable": true,
    "enable_list": [
      "777777777" // 示例：允许此群触发事件
    ],
    "disable_list": [
      "888888888" // 示例：禁止此群触发事件
    ],
    "log_enable_list": [
      "999999999" // 示例：记录此群的日志
    ],
    "log_disable_list": [
      "000000000" // 示例：不记录此群的日志
    ]
  },
  "directs": {
    "enable": true,
    "enable_list": [
      "111222333" // 示例：允许此用户私信触发事件
    ],
    "disable_list": [
      "444555666" // 示例：禁止此用户私信触发事件
    ],
    "log_enable_list": [
      "777888999" // 示例：记录此用户的私信日志
    ],
    "log_disable_list": [
      "000111222" // 示例：不记录此用户的私信日志
    ]
  },
  "guilds": {
    "enable": true,
    "enable_list": [
      "333444555" // 示例：允许此频道触发事件
    ],
    "disable_list": [
      "666777888" // 示例：禁止此频道触发事件
    ],
    "log_enable_list": [
      "999000111" // 示例：记录此频道的日志
    ],
    "log_disable_list": [
      "222333444" // 示例：不记录此频道的日志
    ]
  },
  "channels": {
    "enable": true,
    "enable_list": [
      "555666777" // 示例：允许此子频道触发事件
    ],
    "disable_list": [
      "888999000" // 示例：禁止此子频道触发事件
    ],
    "log_enable_list": [
      "111222333" // 示例：记录此子频道的日志
    ],
    "log_disable_list": [
      "444555666" // 示例：不记录此子频道的日志
    ]
  }
}
```

</details>

### `privates.json`

> [!IMPORTANT] 
> `好友` `频道私信` 触发事件相关的配置文件

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项                  | 类型       | 描述                                                                                                                 |
| ----------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `default`               | `object`   | 全局默认配置，自定义配置中缺少的会从全局配置结构合并                                                                 |
| `default.cd`            | `number`   | 好友消息冷却时间，单位秒，0 则无限制                                                                                 |
| `default.mode`          | `number`   | 机器人响应模式 <br> `0-所有` `2-仅回应管理员` `3-仅回应别名` <br> `5-管理员无限制，非管理员别名` `6-仅回应主人`      |
| `default.alias`         | `string[]` | 机器人别名，设置后别名+指令触发机器人                                                                                |
| `default.enable`        | `string[]` | 白名单插件、功能，只有在白名单中的插件、功能才会响应 <br> `<插件名称>` `<插件名称>:<插件文件后缀名称\|插件方法名称>` |
| `default.disable`       | `string[]` | 黑名单插件、功能，黑名单中的插件、功能不会响应 <br> `<插件名称>` `<插件名称>:<插件文件后缀名称\|插件方法名称>`       |
| `Bot:<selfId>`          | `object`   | 单个 Bot 的配置，结构同 `default`                                                                                    |
| `Bot:<selfId>:<userId>` | `object`   | 单个 Bot 中特定用户的配置，结构同 `default`                                                                          |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "default": {
    "cd": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": []
  },
  "Bot:selfId": {
    "cd": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": []
  },
  "Bot:selfId:userId": {
    "cd": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": []
  }
}
```

</details>

<!-- 点击展开示例配置 -->

<details>
<summary>点击展开示例配置</summary>

```json
{
  "default": {
    "cd": 1, // 全局消息冷却时间1秒
    "mode": 0, // 响应所有消息
    "alias": ["k"], // 设置全局别名为"k"
    "enable": [
      "karin-plugin-test", // 仅启用整个插件
      "karin-plugin-test:app.js", // 仅启用插件中的特定文件
      "karin-plugin-test:测试转发" // 仅启用插件中的特定功能
    ],
    "disable": [
      "karin-plugin-demo", // 禁用整个插件
      "karin-plugin-demo:app.js" // 禁用插件中的特定文件
    ]
  },
  "Bot:123456": {
    // 机器人123456的专属配置
    "cd": 0, // 无冷却时间限制
    "mode": 2, // 仅回应管理员
    "alias": ["bot"], // 设置此机器人的别名为"bot"
    "enable": [], // 不设置白名单
    "disable": [] // 不设置黑名单
  },
  "Bot:123456:789012": {
    // 机器人123456对用户789012的专属配置
    "cd": 5, // 该用户消息冷却时间5秒
    "mode": 3, // 仅回应别名
    "alias": ["小助手"], // 设置对该用户的别名为"小助手"
    "enable": [
      "karin-plugin-chat" // 仅启用聊天插件
    ],
    "disable": [] // 不设置黑名单
  }
}
```

</details>

### `groups.json`

> [!IMPORTANT] 
> `群、频道` 触发事件相关的配置文件

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项                               | 类型       | 描述                                                                                                                                                      |
| ------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`                            | `object`   | 全局默认配置，自定义配置中缺少的会从全局配置结构合并                                                                                                      |
| `default.cd`                         | `number`   | 群聊、频道中所有消息冷却时间，单位秒，0 则无限制                                                                                                          |
| `default.userCD`                     | `number`   | 群聊、频道中每个人的消息冷却时间，单位秒，0 则无限制。注意，开启后所有消息都会进 CD，无论是否触发插件                                                     |
| `default.mode`                       | `number`   | 机器人响应模式 <br> `0-所有` `1-仅@机器人` `2-仅回应管理员` <br> `3-仅回应别名` `4-别名或@机器人` <br> `5-管理员无限制，成员别名或@机器人` `6-仅回应主人` |
| `default.alias`                      | `string[]` | 机器人别名，设置后别名+指令触发机器人                                                                                                                     |
| `default.enable`                     | `string[]` | 白名单插件、功能，只有在白名单中的插件、功能才会响应 <br> `<插件名称>` `<插件名称>:<插件文件后缀名称\|插件方法名称>`                                      |
| `default.disable`                    | `string[]` | 黑名单插件、功能，黑名单中的插件、功能不会响应 <br> `<插件名称>` `<插件名称>:<插件文件后缀名称\|插件方法名称>`                                            |
| `default.memberEnable`               | `string[]` | 群、频道成员单独白名单                                                                                                                                    |
| `default.memberDisable`              | `string[]` | 群、频道成员单独黑名单                                                                                                                                    |
| `Bot:<selfId>`                       | `object`   | 单个 Bot 的配置，结构同 `default`                                                                                                                         |
| `Bot:<selfId>:<groupId>`             | `object`   | 单个 Bot 中特定群的配置，结构同 `default`                                                                                                                 |
| `Bot:<selfId>:<guildId>`             | `object`   | 单个 Bot 中特定频道的配置，结构同 `default`                                                                                                               |
| `Bot:<selfId>:<guildId>:<channelId>` | `object`   | 单个 Bot 中特定频道的子频道配置，结构同 `default`                                                                                                         |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "default": {
    "cd": 0,
    "userCD": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": [],
    "memberEnable": [],
    "memberDisable": []
  },
  "Bot:selfId": {
    "cd": 0,
    "userCD": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": [],
    "memberEnable": [],
    "memberDisable": []
  },
  "Bot:selfId:groupId": {
    "cd": 0,
    "userCD": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": [],
    "memberEnable": [],
    "memberDisable": []
  },
  "Bot:selfId:guildId": {
    "cd": 0,
    "userCD": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": [],
    "memberEnable": [],
    "memberDisable": []
  },
  "Bot:selfId:guildId:channelId": {
    "cd": 0,
    "userCD": 0,
    "mode": 0,
    "alias": [],
    "enable": [],
    "disable": [],
    "memberEnable": [],
    "memberDisable": []
  }
}
```

</details>

<!-- 点击展开示例配置 -->

<details>
<summary>点击展开示例配置</summary>

```json
{
  "default": {
    "cd": 1, // 全局消息冷却时间1秒
    "userCD": 5, // 每个用户消息冷却时间5秒
    "mode": 4, // 别名或@机器人时响应
    "alias": ["k"], // 设置全局别名为"k"
    "enable": [
      "karin-plugin-test", // 仅启用整个插件
      "karin-plugin-test:app.js", // 仅启用插件中的特定文件
      "karin-plugin-test:测试转发" // 仅启用插件中的特定功能
    ],
    "disable": [
      "karin-plugin-demo", // 禁用整个插件
      "karin-plugin-demo:app.js" // 禁用插件中的特定文件
    ],
    "memberEnable": [
      "123456789" // 允许此成员使用机器人
    ],
    "memberDisable": [
      "987654321" // 禁止此成员使用机器人
    ]
  },
  "Bot:123456": {
    // 机器人123456的专属配置
    "cd": 0, // 无全局冷却时间限制
    "userCD": 3, // 每个用户消息冷却时间3秒
    "mode": 1, // 仅@机器人时响应
    "alias": ["bot"], // 设置此机器人的别名为"bot"
    "enable": [], // 不设置白名单
    "disable": [], // 不设置黑名单
    "memberEnable": [], // 不设置成员白名单
    "memberDisable": [] // 不设置成员黑名单
  },
  "Bot:123456:789012": {
    // 机器人123456在群789012中的专属配置
    "cd": 2, // 群内消息冷却时间2秒
    "userCD": 10, // 群内每个用户消息冷却时间10秒
    "mode": 5, // 管理员无限制，成员需要别名或@
    "alias": ["群助手"], // 设置在此群的别名为"群助手"
    "enable": [
      "karin-plugin-chat" // 仅启用聊天插件
    ],
    "disable": [], // 不设置黑名单
    "memberEnable": [
      "111222333" // 允许此群成员使用机器人
    ],
    "memberDisable": [
      "444555666" // 禁止此群成员使用机器人
    ]
  }
}
```

</details>

### `pm2.json`

> [!IMPORTANT] 
> `pm2`配置项
> `pm2`配置不提供示例配置

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项                    | 类型       | 描述             |
| ------------------------- | ---------- | ---------------- |
| `lines`                   | `number`   | 日志最多显示行数 |
| `apps`                    | `object[]` | `pm2`配置数组    |
| `apps.name`               | `string`   | `pm2`应用名称    |
| `apps.script`             | `string`   | 入口文件         |
| `apps.autorestart`        | `boolean`  | 自动重启         |
| `apps.max_restarts`       | `number`   | 最大重启次数     |
| `apps.max_memory_restart` | `string`   | 最大重启内存     |
| `apps.restart_delay`      | `number`   | 重启延迟         |
| `apps.merge_logs`         | `boolean`  | 合并日志         |
| `apps.error_file`         | `string`   | 错误日志路径     |
| `apps.out_file`           | `string`   | 输出日志路径     |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "lines": 1000,
  "apps": [
    {
      "name": "karin",
      "script": "./node_modules/node-karin/dist/cli/pm2.js",
      "autorestart": true,
      "max_restarts": 60,
      "max_memory_restart": "1G",
      "restart_delay": 2000,
      "merge_logs": true,
      "error_file": "./@karinjs/logs/pm2_error.log",
      "out_file": "./@karinjs/logs/pm2_out.log"
    }
  ]
}
```

</details>

### `redis.json`

> [!IMPORTANT] 
> `redis`配置项  
> `redis`配置不提供示例配置

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项        | 类型     | 描述                                 |
| ------------- | -------- | ------------------------------------ |
| `url`         | `string` | Redis 连接 URL，优先级高于其他配置项 |
| `socket`      | `object` | 套接字连接属性                       |
| `socket.host` | `string` | Redis 服务器地址                     |
| `socket.port` | `number` | Redis 服务器端口                     |
| `username`    | `string` | Redis 用户名                         |
| `password`    | `string` | Redis 密码                           |
| `database`    | `number` | Redis 数据库索引 0-15                |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "url": "redis://127.0.0.1:6379",
  "socket": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "username": "",
  "password": "",
  "database": 0
}
```

</details>

### `render.json`

> [!IMPORTANT]
> 渲染服务配置文件

<!-- 点击展开配置详细说明 -->

<details>
<summary>点击展开配置详细说明</summary>

| 配置项                 | 类型       | 描述                          |
| ---------------------- | ---------- | ----------------------------- |
| `ws_server`            | `object`   | WebSocket 服务器配置(反向 ws) |
| `ws_server.enable`     | `boolean`  | 是否启用 WebSocket 服务器     |
| `ws_client`            | `object[]` | WebSocket 客户端配置(正向 ws) |
| `ws_client[].enable`   | `boolean`  | 是否启用此 WebSocket 客户端   |
| `ws_client[].url`      | `string`   | WebSocket 连接地址            |
| `ws_client[].token`    | `string`   | WebSocket 连接令牌            |
| `http_server`          | `object[]` | HTTP 服务器配置(反向 http)    |
| `http_server[].enable` | `boolean`  | 是否启用此 HTTP 服务器        |
| `http_server[].url`    | `string`   | HTTP 服务器地址               |
| `http_server[].token`  | `string`   | HTTP 服务器令牌               |

</details>

<!-- 点击展开默认配置 -->

<details>
<summary>点击展开默认配置</summary>

```json
{
  "ws_server": {
    "enable": true
  },
  "ws_client": [
    {
      "enable": false,
      "url": "ws://127.0.0.1:7005/ws",
      "token": "123456"
    }
  ],
  "http_server": [
    {
      "enable": false,
      "url": "http://127.0.0.1:7005",
      "token": "123456"
    }
  ]
}
```

</details>

<!-- 点击展开示例配置 -->

<details>
<summary>点击展开示例配置</summary>

```json
{
  "ws_server": {
    "enable": true // 启用WebSocket服务器(反向ws)
  },
  "ws_client": [
    {
      "enable": true, // 启用第一个WebSocket客户端
      "url": "ws://127.0.0.1:7005/ws", // 连接到本地7005端口
      "token": "abc123" // 设置连接令牌
    },
    {
      "enable": true, // 启用第二个WebSocket客户端
      "url": "ws://render.example.com/ws", // 连接到远程渲染服务
      "token": "def456" // 设置连接令牌
    }
  ],
  "http_server": [
    {
      "enable": true, // 启用第一个HTTP服务器
      "url": "http://127.0.0.1:7005", // 本地渲染服务地址
      "token": "xyz789" // 设置访问令牌
    },
    {
      "enable": true, // 启用第二个HTTP服务器
      "url": "http://render.example.com", // 远程渲染服务地址
      "token": "uvw321" // 设置访问令牌
    }
  ]
}
```

</details>

## `data` 目录

- 位置: `karin/@karinjs/data`
- 描述: `data`目录用于存放一些数据文件，如`sqlite`数据库文件等
- 结构:
  - `db/level`: 存放`level`数据库文件
  - `db/redis-level`: 存放伪造的`redis`持久化数据文件
  - 其余文件夹: 均属于插件数据文件夹

## `temp` 目录

- 位置: `karin/@karinjs/temp`
- 描述: `temp`目录用于存放一些临时文件，如`ffmpeg`临时文件等
- 结构:
  - html: 存放模板渲染后的`html`文件
  - 其余文件夹: 均属于插件临时文件夹
