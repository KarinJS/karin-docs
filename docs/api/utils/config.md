# config 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

config模块提供了配置文件的初始化、读取和缓存功能，用于管理框架和插件的配置。

## 导入方式

所有配置相关的功能均通过`config`命名空间导出，使用时需要先导入：

```typescript
import { config } from 'node-karin'

// 使用config的子模块
const groupConfig = config.getYaml('groups', 'user')
const packageInfo = config.pkg()
const formatData = config.formatObject({ numbers: [1, 2, 3] })
```

## 配置工具函数

### formatArray

将数组中的所有元素转换为字符串类型。

```typescript
import { config } from 'node-karin'

/**
 * 将数组中所有元素转换为字符串
 * @param data - 源数组，类型为 any[]
 * @returns 元素都为字符串的数组，类型为 string[]
 */
const numbers = [1, 2, 3]
const strings = config.formatArray(numbers) // ['1', '2', '3']
```

### formatObject

递归处理对象，将嵌套的数组中所有元素转换为字符串类型。

```typescript
import { config } from 'node-karin'

/**
 * 将对象中嵌套数组的所有元素转换为字符串
 * @param data - 源对象，类型为 Record<string, any>
 * @returns 处理后的对象，数组元素都为字符串
 */
const obj = {
  ids: [1, 2, 3],
  nested: {
    values: [4, 5, 6]
  }
}

const formatted = config.formatObject(obj)
// 结果:
// {
//   ids: ['1', '2', '3'],
//   nested: {
//     values: ['4', '5', '6']
//   }
// }
```

### mergeDegAndCfg

合并默认配置和用户配置，专用于处理privates和groups配置。

```typescript
import { config } from 'node-karin'

/**
 * 合并配置对象
 * @param def - 默认配置，类型为 Record<string, any>
 * @param cfg - 用户配置，类型为 Record<string, any>
 * @returns 合并后的配置，类型为 Record<string, any>
 */
const defaultConfig = {
  maxConnections: 10,
  timeout: 30000,
  allowedTypes: ['image', 'video']
}

const userConfig = {
  timeout: 60000,
  allowedTypes: ['image', 'audio']
}

const merged = config.mergeDegAndCfg(defaultConfig, userConfig)
// 结果:
// {
//   maxConnections: 10,
//   timeout: 60000,
//   allowedTypes: ['image', 'audio']
// }
```

## 管理员配置 (admin)

处理框架层面的管理员配置操作。

### getYaml

获取指定配置文件的内容。

```typescript
import { config } from 'node-karin'

/**
 * 获取配置YAML
 * @param name - 文件名称，如'groups'、'privates'等
 * @param type - 文件类型，'user'表示用户配置，'default'表示默认配置
 * @param isRefresh - 是否刷新缓存，默认false
 * @returns 配置对象
 * @throws 如果文件不存在，抛出TypeError
 */
const groups = config.getYaml('groups', 'user')
const defaultGroups = config.getYaml('groups', 'default')
const freshGroups = config.getYaml('groups', 'user', true) // 强制刷新缓存
```

### setYaml / setConfig

修改框架配置文件。

```typescript
import { config } from 'node-karin'

/**
 * 修改框架配置
 * @param name - 文件名称，如'groups'、'privates'等
 * @param data - 配置数据，必须是一个对象
 * @returns 是否修改成功，布尔值
 */
// 两个函数功能相同
const success = config.setYaml('groups', { 
  // 配置内容
  default: {
    cd: 0,
    userCD: 0,
    mode: 0,
    alias: [],
    enable: ['plugin1', 'plugin2'],
    disable: [],
    member_enable: [],
    member_disable: []
  }
})

const success2 = config.setConfig('privates', { 
  // 配置内容
  default: {
    cd: 0,
    mode: 0,
    alias: [],
    enable: ['plugin1', 'plugin2'],
    disable: []
  }
})
```

### clearFiles

清空指定目录下的所有文件，但不删除目录本身。

```typescript
import { config } from 'node-karin'

/**
 * 清空指定目录下的全部文件
 * @param dir - 目录路径，字符串
 * @returns void
 */
config.clearFiles('/path/to/directory')
```

### updateLevel

更新日志等级。

```typescript
import { config } from 'node-karin'

/**
 * 更新日志等级
 * @param level - 日志等级，可选值为'debug'|'info'|'warn'|'error'|'fatal'，如不提供则从环境变量读取
 * @returns 更新后的日志等级，字符串
 */
// 指定新的日志等级
const newLevel = config.updateLevel('debug')

// 从环境变量中读取日志等级
const currentLevel = config.updateLevel()
```

## 包信息配置 (pkg)

提供node-karin包的相关信息。

### pkg

获取node-karin的package.json信息。

```typescript
import { config } from 'node-karin'

/**
 * 获取node-karin的package.json
 * @returns package.json内容对象，包含version、name、dependencies等信息
 */
const packageInfo = config.pkg()
console.log(`当前版本: ${packageInfo.version}`)
console.log(`包名称: ${packageInfo.name}`)
console.log(`依赖列表: ${JSON.stringify(packageInfo.dependencies)}`)
```

## 配置文件操作子模块（file）

file子模块用于管理和操作各类配置文件，支持热更新、缓存、迁移等高级特性。所有API均可通过`config.file`命名空间访问。

### 1. adapter.json 适配器配置

```typescript
import { config } from 'node-karin'

/**
 * 获取适配器配置(adapter.json)
 * @returns 适配器配置对象，包含adapters数组等信息
 */
const adapterConfig = config.adapter()

/**
 * 获取OneBot ws_server超时时间
 * @returns 超时时间(秒)，数字类型
 */
const timeoutSeconds = config.timeout()

/**
 * 获取wsServer鉴权token
 * @returns token字符串
 */
const token = config.webSocketServerToken()
```

### 2. config.json 全局配置

```typescript
import { config } from 'node-karin'

/**
 * 获取全局配置(config.json)
 * @returns 配置对象，包含master、admin、user、friend、group等配置项
 */
const globalConfig = config.config()

/**
 * 获取Bot主人列表
 * @returns 主人ID数组，字符串数组
 */
const masterList = config.master()

/**
 * 获取Bot管理员列表
 * @returns 管理员ID数组，字符串数组
 */
const adminList = config.admin()
```

### 4. groups.json 群聊/频道配置

```typescript
import { config } from 'node-karin'

/**
 * 获取所有群聊/频道配置
 * @returns 配置对象，包含所有群聊和频道的配置信息
 */
const allGroupsConfig = config.groups()

/**
 * 获取指定群聊配置
 * @param groupId - 群号，字符串
 * @param selfId - 机器人ID，字符串
 * @returns 群聊配置对象，包含cd、userCD、mode、alias、enable、disable等信息
 */
const groupConfig = config.getGroupCfg('123456', '10001')

/**
 * 获取指定频道配置
 * @param guildId - 频道ID，字符串
 * @param channelId - 子频道ID，字符串
 * @param selfId - 机器人ID，字符串
 * @returns 频道配置对象，包含cd、userCD、mode、alias、enable、disable等信息
 */
const guildConfig = config.getGuildCfg('guild123', 'channel456', '10001')
```

### 5. privates.json 私聊/私信配置

```typescript
import { config } from 'node-karin'

/**
 * 获取所有私聊配置
 * @returns 配置对象，包含所有私聊配置信息
 */
const allPrivatesConfig = config.privates()

/**
 * 获取指定好友配置
 * @param userId - 用户ID，字符串
 * @param selfId - 机器人ID，字符串
 * @returns 好友配置对象，包含cd、mode、alias、enable、disable等信息
 */
const friendConfig = config.getFriendCfg('user123', '10001')

/**
 * 获取指定频道私信配置
 * @param userId - 用户ID，字符串
 * @param selfId - 机器人ID，字符串
 * @returns 私信配置对象，包含cd、mode、alias、enable、disable等信息
 */
const directConfig = config.getDirectCfg('user123', '10001')
```

### 6. render.json 渲染配置

```typescript
import { config } from 'node-karin'

/**
 * 获取渲染配置
 * @returns 渲染配置对象，包含渲染相关设置
 */
const renderConfig = config.getRenderCfg()
```

### 7. pm2.json 进程管理配置

```typescript
import { config } from 'node-karin'

/**
 * 获取pm2配置
 * @returns pm2配置对象，包含apps数组、lines等配置
 */
const pm2Config = config.pm2()
```

### 8. redis.json Redis配置

```typescript 
import { config } from 'node-karin'

/**
 * 获取redis配置
 * @returns redis配置对象，包含url、username、password、database等信息
 */
const redisConfig = config.redis()
```

### 路径帮助函数

配置模块还提供了一系列路径获取函数:

```typescript
import { config } from 'node-karin'

/**
 * 获取HTTP服务端口
 * @returns 端口号，数字类型，默认7777
 */
const httpPort = config.port()

/**
 * 获取HTTP服务主机
 * @returns 主机地址，字符串，默认127.0.0.1
 */
const httpHost = config.host()

/**
 * 获取鉴权密钥
 * @returns 鉴权密钥字符串，如果为默认值会生成随机密钥
 */
const authKeyValue = config.authKey()

/**
 * 获取FFmpeg相关路径
 * @returns 对应程序的路径字符串
 */
const ffmpeg = config.ffmpegPath()
const ffprobe = config.ffprobePath()
const ffplay = config.ffplayPath()
```

```typescript
import { 
  config
} from 'node-karin'
import { karinPathConfig } from 'node-karin/root'

// 初始化配置
await config.initConfig(karinPathConfig)

// 读取现有配置
const groupConfig = config.getYaml('groups', 'user')
const globalConfig = config.file.config()

// 创建配置缓存系统
const configCache = {}
const accessCount = config.createCount()

// 获取用户配置
function getUserConfig(userId) {
  return config.getCacheCfg(
    configCache, 
    accessCount, 
    [`user.${userId}`, 'default.user']
  )
}

// 设置用户配置
function setUserConfig(userId, configData) {
  configCache[`user.${userId}`] = config.formatObject(configData)
  
  // 如果需要持久化
  if (configData.shouldPersist) {
    config.setConfig('users', {
      ...config.getYaml('users', 'user'),
      [userId]: configData
    })
  }
}

// 定期清理缓存
config.clearCache(accessCount, configCache)
```

---

> 所有配置API均支持热更新和缓存，推荐通过命名空间`config`访问所有配置功能。详细类型定义请参考源码或类型声明文件。 