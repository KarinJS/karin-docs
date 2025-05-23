---
title: system
createTime: 2025/05/15 00:12:24
permalink: /guide/ulw3vz9u/
---

# system 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

system 模块提供了系统级工具函数，包括执行命令、时间处理、IP 检测、多媒体处理等功能。

## 命名空间使用

system 模块可以作为命名空间整体导入，也可以直接导入其中的函数：

```ts twoslash
// @noErrorValidation
// 作为命名空间使用
import { system } from 'node-karin'
system.exec('ls -la', { log: true })

// 直接导入函数
import { exec, formatTime, ffmpeg } from 'node-karin'
exec('ls -la', { log: true })
```

## 命令执行 (exec)

exec 模块提供了执行系统命令的功能。

```ts twoslash
// @noErrorValidation
import { exec } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 执行shell命令
 * @param cmd 命令
 * @param options 选项
 * @returns 执行结果
 */
// 获取完整结果
const { status, stdout, stderr, error } = await exec('ls -al')
if (status) {
  console.log('命令执行成功:', stdout)
} else {
  console.error('命令执行失败:', stderr, error)
}

// 使用命名空间
const result = await system.exec('ls -al')

// 只关心是否成功执行
const success = await exec('npm install', { booleanResult: true })

// 记录日志
await exec('git clone https://github.com/example/repo.git', { log: true })
```

## 时间处理 (time)

time 模块提供了格式化时间和获取运行时间的功能。

```ts twoslash
// @noErrorValidation
import { uptime, formatTime } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 获取框架运行时间
 * @returns 格式化的运行时间字符串
 */
const runningTime = uptime() // "2天3小时45分钟"
// 使用命名空间
const runningTime2 = system.uptime()

/**
 * 格式化时间差
 * @param time 开始时间戳
 * @param time2 结束时间戳，默认为当前时间
 * @returns 格式化的时间差字符串
 */
// 计算给定时间戳到现在的时间差
const diff = formatTime(1620000000) // "18天"
// 使用命名空间
const diff2 = system.formatTime(1620000000)

// 计算两个时间戳之间的差值
const diff3 = formatTime(1620000000, 1624000000) // "46天"
```

## FFmpeg 工具 (ffmpeg)

ffmpeg 模块提供了 FFmpeg、FFprobe 和 FFplay 命令的封装。

```ts twoslash
// @noErrorValidation
import { ffmpeg, ffprobe, ffplay } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 执行FFmpeg命令
 * @param cmd FFmpeg命令参数
 * @param options 执行选项
 * @returns 执行结果
 */
// 转换视频格式
const result = await ffmpeg('-i input.mp4 -c:v libx264 output.mp4')
// 使用命名空间
const result2 = await system.ffmpeg('-i input.mp4 -c:v libx264 output.mp4')

// 获取视频信息
const info = await ffprobe('-v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 video.mp4')
console.log(`视频尺寸: ${info.stdout}`)

// 播放视频
await ffplay('-autoexit video.mp4')
```

## IP 处理 (ip)

ip 模块提供了 IP 地址检测和处理的功能。

```ts twoslash
// @noErrorValidation
import { isLoopback, isIPv4Loop, isIPv6Loop, getRequestIp, isLocalRequest } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 判断是否为回环地址
 * @param hostnameOrIp 主机名或IP地址
 * @returns 布尔值
 */
const isLocal = await isLoopback('localhost') // true
const isLocal2 = await isLoopback('127.0.0.1') // true
// 使用命名空间
const isLocal3 = await system.isLoopback('::1') // true

/**
 * 判断IPv4地址是否为回环地址
 * @param ip IPv4地址
 * @returns 布尔值
 */
const isLoop = isIPv4Loop('127.0.0.1') // true

/**
 * 判断IPv6地址是否为回环地址
 * @param ip IPv6地址
 * @returns 布尔值
 */
const isLoopV6 = isIPv6Loop('::1') // true

/**
 * 获取HTTP请求的IP地址
 * @param req 请求对象
 * @returns IP地址数组
 */
// 在Express路由中使用
app.get('/api', (req, res) => {
  const ips = getRequestIp(req)
  console.log('请求来源IP:', ips)
})

/**
 * 判断请求是否来自本地
 * @param req 请求对象
 * @returns 布尔值
 */
app.get('/admin', async (req, res) => {
  if (await isLocalRequest(req)) {
    // 允许本地访问
    res.send('管理员界面')
  } else {
    // 拒绝远程访问
    res.status(403).send('禁止访问')
  }
})
```

## 端口工具 (port)

port 模块提供了端口检测和获取空闲端口的功能。

```ts twoslash
// @noErrorValidation
import { isPortAvailable, getAvailablePort } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 检查端口是否可用
 * @param port 端口号
 * @returns 布尔值
 */
const available = await isPortAvailable(3000)
if (available) {
  console.log('端口3000可用')
} else {
  console.log('端口3000已被占用')
}
// 使用命名空间
const available2 = await system.isPortAvailable(3000)

/**
 * 获取可用端口
 * @param startPort 起始端口号
 * @returns 可用的端口号
 */
const port = await getAvailablePort(8000)
console.log(`找到可用端口: ${port}`)
```

## 进程管理 (pid/restart)

提供进程 ID 管理和重启进程的功能。

```ts twoslash
// @noErrorValidation
import { killByPort, getPidsByPort, restart } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 根据端口号终止进程
 * @param port 端口号
 * @returns 布尔值表示是否成功
 */
const killed = await killByPort(3000)
if (killed) {
  console.log('成功终止占用端口3000的进程')
}
// 使用命名空间
await system.killByPort(3000)

/**
 * 获取占用指定端口的进程ID
 * @param port 端口号
 * @returns 进程ID数组
 */
const pids = await getPidsByPort(3000)
console.log(`占用端口3000的进程ID: ${pids.join(', ')}`)

/**
 * 重启应用程序
 * @param delay 延迟毫秒数
 */
// 延迟1秒后重启
restart(1000)
```

## 错误处理 (error)

error 模块提供了错误信息格式化功能。

```ts twoslash
// @noErrorValidation
import { stringifyError, errorToString } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 将错误对象转换为可序列化对象
 * @param error 错误对象
 * @returns 格式化的错误信息对象
 */
try {
  throw new Error('测试错误')
} catch (error) {
  const errorInfo = stringifyError(error)
  console.log(errorInfo)
  // 使用命名空间
  console.log(system.stringifyError(error))
  // 结果：{ name: 'Error', message: '测试错误', stack: '...' }
}

/**
 * 将错误对象转换为字符串
 * @param error 错误对象
 * @returns 错误字符串
 */
try {
  throw new Error('测试错误')
} catch (error) {
  const errorStr = errorToString(error)
  console.log(errorStr)
  // 结果：'name: Error\nmessage: 测试错误\nstack: Error: 测试错误\n    at ...'
}
```

## 系统信息 (system)

提供获取系统信息的功能。

```ts twoslash
// @noErrorValidation
import { isWin, isLinux, isMac, isDocker, isRoot } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 判断当前操作系统类型和环境
 */
if (isWin) {
  console.log('当前是Windows系统')
} else if (isLinux) {
  console.log('当前是Linux系统')
} else if (isMac) {
  console.log('当前是MacOS系统')
}

// 判断是否在Docker环境中运行
if (isDocker) {
  console.log('当前在Docker容器中运行')
}

// 判断是否是root用户(仅Linux)
if (isRoot) {
  console.log('当前以root用户运行')
}
```

## 范围限制 (range)

range 模块提供了数值范围限制功能。

```ts twoslash
// @noErrorValidation
import { inRange, clamp } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 检查值是否在指定范围内
 * @param value 要检查的值
 * @param min 最小值
 * @param max 最大值
 * @returns 布尔值
 */
const isInRange = inRange(5, 1, 10) // true
const isInRange2 = inRange(15, 1, 10) // false
// 使用命名空间
const isInRange3 = system.inRange(5, 1, 10)

/**
 * 将值限制在指定范围内
 * @param value 要限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的值
 */
const limited = clamp(5, 1, 10) // 5
const limited2 = clamp(15, 1, 10) // 10
const limited3 = clamp(-5, 1, 10) // 1
```

## URL 转换为网络 URL (fileToUrl)

提供文件路径转 URL 的功能。

```ts twoslash
// @noErrorValidation
import { fileToUrl } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 将文件路径转换为URL
 * @param filePath 文件路径
 * @returns URL
 */
const url = fileToUrl('/path/to/file.txt')
console.log(url.href) // "file:///path/to/file.txt"
// 使用命名空间
const url2 = system.fileToUrl('/path/to/file.txt')
```

## 更新管理 (update)

update 模块提供了检查和更新 NPM 包和 Git 插件的功能。

```ts twoslash
// @noErrorValidation
import { checkPkgUpdate, getPkgVersion, getRemotePkgVersion, updatePkg, updateAllPkg } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 检查NPM包是否有更新
 * @param name 包名称
 * @returns 更新状态对象
 */
const updateStatus = await checkPkgUpdate('node-karin')
if (updateStatus.status === 'yes') {
  console.log(`发现更新: ${updateStatus.local} -> ${updateStatus.remote}`)
}

/**
 * 获取NPM包本地版本
 * @param name 包名称
 * @returns 版本号字符串
 */
const localVersion = await getPkgVersion('node-karin')

/**
 * 获取NPM包远程版本
 * @param name 包名称
 * @param tag 标签名, 默认为latest
 * @returns 版本号字符串
 */
const remoteVersion = await getRemotePkgVersion('node-karin', 'beta')

/**
 * 更新指定的NPM包
 * @param name 包名称
 * @param tag 标签名, 默认为latest
 * @returns 更新结果
 */
const result = await updatePkg('node-karin')
if (result.status === 'ok') {
  console.log(`更新成功: ${result.local} -> ${result.remote}`)
}

/**
 * 更新所有NPM插件
 * @returns 更新结果字符串
 */
const updateResult = await updateAllPkg()
console.log(updateResult)

/**
 * Git插件相关功能
 */
import { checkGitPluginUpdate, getCommit, getHash, getTime, updateGitPlugin, updateAllGitPlugin } from 'node-karin'

// 检查Git插件更新
const gitStatus = await checkGitPluginUpdate('/path/to/git/plugin')
if (gitStatus.status === 'yes') {
  console.log(`发现${gitStatus.count}个更新`)
}

// 获取Git提交信息
const commit = await getCommit({ path: '/path/to/git/plugin', count: 5 })

// 获取Git哈希值
const hash = await getHash('/path/to/git/plugin')

// 获取最后更新时间
const time = await getTime('/path/to/git/plugin')

// 更新Git插件
const gitResult = await updateGitPlugin('/path/to/git/plugin')
if (gitResult.status === 'ok') {
  console.log(`更新成功: ${gitResult.commit}`)
}

// 更新所有Git插件
const allGitResult = await updateAllGitPlugin()
console.log(allGitResult)
```

## 对象锁定 (lock)

lock 模块提供了锁定对象方法和属性的功能，防止意外修改。

```ts twoslash
// @noErrorValidation
import { lockMethod, lockProp, lock } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 锁定对象的方法
 * @param obj 目标对象
 * @param key 方法名
 * @param msg 错误消息
 * @returns 解锁函数
 */
// 创建测试对象
const testObj = {
  value: 42,
  setValue(newValue: number) {
    this.value = newValue
  },
}

// 锁定方法
const unlock = lockMethod(testObj, 'setValue', '此方法已被锁定')

// 尝试调用被锁定的方法会抛出错误
try {
  testObj.setValue(100) // 抛出错误: 此方法已被锁定
} catch (error) {
  console.error(error.message)
}

// 解锁方法
unlock()

// 解锁后可以正常调用
testObj.setValue(100)
console.log(testObj.value) // 100

/**
 * 锁定对象的属性
 * @param obj 目标对象
 * @param key 属性名
 */
lockProp(testObj, 'value')

// 尝试修改被锁定的属性会失败(严格模式下抛出错误)
testObj.value = 200
console.log(testObj.value) // 仍然是100

// 使用命名空间简写形式
// lock.method - 锁定方法
// lock.prop - 锁定属性
const unlock2 = lock.method(testObj, 'setValue')
lock.prop(testObj, 'value')
```

## 动态导入 (import)

import 模块提供了动态导入模块的功能。

```ts twoslash
// @noErrorValidation
import { importModule } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 动态导入模块
 * @param url 模块路径(绝对路径)
 * @param isRefresh 是否刷新缓存
 * @returns 导入结果
 */
// 动态导入模块
const result = await importModule('/path/to/module.js')
if (result.status) {
  // 导入成功，使用模块
  const module = result.data
  module.someFunction()
} else {
  // 导入失败，处理错误
  console.error(result.data)
}

// 强制刷新缓存导入
const freshResult = await importModule('/path/to/module.js', true)
```

## 类工具 (class)

class 模块提供了操作和检查类的工具。

```ts twoslash
// @noErrorValidation
import { isClass } from 'node-karin'
// 或使用命名空间
import { system } from 'node-karin'

/**
 * 判断函数是否为类
 * @param fnc 要检查的函数
 * @returns 布尔值
 */
// 定义普通函数
function normalFunction() {}

// 定义类
class TestClass {}

// 检查是否为类
console.log(isClass(normalFunction)) // false
console.log(isClass(TestClass)) // true
```

## 使用示例

综合使用 system 模块中的多个函数：

```ts twoslash
// @noErrorValidation
// @noErrorValidation
import { exec, isPortAvailable, getAvailablePort, formatTime, restart, checkPkgUpdate, updatePkg, isWin, stringifyError } from 'node-karin'

async function startService() {
  try {
    // 检查更新
    const updateStatus = await checkPkgUpdate('node-karin')
    if (updateStatus.status === 'yes') {
      console.log(`发现更新: ${updateStatus.local} -> ${updateStatus.remote}`)
      const updateResult = await updatePkg('node-karin')
      if (updateResult.status === 'ok') {
        console.log('更新成功，需要重启...')
        return restart(1000)
      }
    }

    // 检查默认端口
    const defaultPort = 3000
    const isAvailable = await isPortAvailable(defaultPort)

    // 如果默认端口不可用，寻找可用端口
    const port = isAvailable ? defaultPort : await getAvailablePort(defaultPort + 1)
    console.log(`使用端口: ${port}`)

    // 根据系统类型选择启动命令
    const startCmd = isWin ? `node server.js --port=${port}` : `NODE_ENV=production node server.js --port=${port}`

    // 启动服务
    const startTime = Date.now()
    const { status, stdout, stderr } = await exec(startCmd)

    if (status) {
      console.log('服务启动成功')
      console.log(`服务运行时间: ${formatTime(startTime)}`)
    } else {
      console.error('服务启动失败:', stderr)
      // 尝试重启
      console.log('5秒后尝试重启...')
      restart(5000)
    }
  } catch (error) {
    console.error('启动过程出错:', stringifyError(error))
  }
}
```
