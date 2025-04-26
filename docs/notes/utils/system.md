---
title: system
createTime: 2025/04/26 13:09:08
permalink: /docs/utils/system/
---
# system 系统工具函数

以下是 system 文件夹中导出的系统级工具函数，用于处理系统操作、进程管理、版本控制等。

### isClass

判断一个函数是否为类。

```js twoslash
import { isClass } from 'node-karin'

/**
 * 传入一个函数 判断是否是类
 * @param fnc 函数
 */
class MyClass {}
function myFunction() {}

console.log(isClass(MyClass)) // 输出: true
console.log(isClass(myFunction)) // 输出: false
```

## 命令执行

### exec

执行 shell 命令。

```js twoslash
import { exec } from 'node-karin'

/**
 * 执行 shell 命令
 * @param cmd 命令
 * @param options 选项
 */
// 基本用法
const { status, error, stdout, stderr } = await exec('dir')
console.log(stdout) // 输出命令执行结果

// 使用布尔结果
const success = await exec('dir', { booleanResult: true })
console.log(success) // 输出: true 或 false

// 打印日志
await exec('dir', { log: true }) // 会打印执行命令和结果
```

## 多媒体处理

### ffmpeg

执行 ffmpeg 命令。

```js twoslash
import { ffmpeg } from 'node-karin'

/**
 * ffmpeg命令
 * @param cmd 命令
 * @param options 参数
 */
const result = await ffmpeg('-i input.mp4 -c:v libx264 output.mp4')
if (result.status) {
  console.log('视频转换成功')
} else {
  console.error('视频转换失败:', result.error)
}
```

### ffprobe

执行 ffprobe 命令。

```js twoslash
import { ffprobe } from 'node-karin'

/**
 * ffprobe命令
 * @param cmd 命令
 * @param options 参数
 */
const result = await ffprobe('-v error -show_format -show_streams input.mp4')
if (result.status) {
  console.log('媒体信息:', result.stdout)
} else {
  console.error('获取媒体信息失败:', result.error)
}
```

### ffplay

执行 ffplay 命令。

```js twoslash
import { ffplay } from 'node-karin'

/**
 * ffplay命令
 * @param cmd 命令
 * @param options 参数
 */
const result = await ffplay('-i input.mp3')
if (!result.status) {
  console.error('播放失败:', result.error)
}
```

## 文件处理

### fileToUrl

文件转换为 URL。

```js twoslash
import { fileToUrl } from 'node-karin'

/**
 * 文件转换为url
 * @param type 类型
 * @param file 文件
 * @param filename 文件名
 * @param args 额外参数
 */
try {
  const url = await fileToUrl('image', './images/test.jpg', 'test.jpg')
  console.log('文件URL:', url)
} catch (error) {
  console.error('转换失败:', error)
}
```

## 模块导入

### importModule

动态导入模块。

```js twoslash
import { importModule } from 'node-karin'

/**
 * 动态导入模块
 * @param url 模块地址 仅支持绝对路径
 * @param isRefresh 是否重新加载 不使用缓存
 */
const { status, data } = await importModule('/path/to/module.js')
if (status) {
  console.log('模块导入成功:', data)
} else {
  console.error('模块导入失败:', data)
}

// 强制刷新缓存
const refreshResult = await importModule('/path/to/module.js', true)
```

## IP 处理

### isLoopback

判断给定的 hostname 或 IP 是否为本机的回环地址。

```js twoslash
import { isLoopback } from 'node-karin'

/**
 * 判断给定的 hostname 或 IP 是否为本机的回环地址
 * @param hostnameOrIp 要检查的 hostname 或 IP 地址
 */
const result = await isLoopback('127.0.0.1')
console.log(result) // 输出: true

const result2 = await isLoopback('::1')
console.log(result2) // 输出: true

const result3 = await isLoopback('example.com')
console.log(result3) // 输出: false
```

### isIPv4Loop

判断一个 IPv4 地址是否在回环范围内。

```js twoslash
import { isIPv4Loop } from 'node-karin'

/**
 * 判断一个 v4 地址是否在回环范围内
 * @param ip IPv4 地址字符串
 */
console.log(isIPv4Loop('127.0.0.1')) // 输出: true
console.log(isIPv4Loop('127.0.1.1')) // 输出: true
console.log(isIPv4Loop('192.168.1.1')) // 输出: false
```

### isIPv6Loop

判断一个 IPv6 地址是否是回环地址。

```js twoslash
import { isIPv6Loop } from 'node-karin'

/**
 * 判断一个 IPv6 地址是否是回环地址
 * @param ip IPv6 地址字符串
 */
console.log(isIPv6Loop('::1')) // 输出: true
console.log(isIPv6Loop('::ffff:127.0.0.1')) // 输出: true
console.log(isIPv6Loop('2001:db8::1')) // 输出: false
```

<!-- ### getRequestIp

获取请求的 IP 地址。

```js twoslash
import { getRequestIp } from 'node-karin'
import { Request } from 'express'

/**
 * 获取请求的 IP 地址
 * @param req 请求对象
 */
// 假设 req 是 Express 请求对象
function handleRequest(req: Request) {
  const ipList = getRequestIp(req)
  console.log('请求IP列表:', ipList)
}
``` -->

<!-- ### isLocalRequest

判断请求是否来自本机。

```js twoslash
import { isLocalRequest } from 'node-karin'
import { Request } from 'express'

/**
 * 传入一个请求对象 判断是否为本机请求
 * @param req 请求对象
 */
// 假设 req 是 Express 请求对象
async function checkLocalRequest(req: Request) {
  const isLocal = await isLocalRequest(req)
  if (isLocal) {
    console.log('这是本机请求')
  } else {
    console.log('这是远程请求')
  }
}
``` -->

## 进程管理

### getPid

根据端口号获取对应的进程 ID。

```js twoslash
import { getPid } from 'node-karin'

/**
 * 传入端口号，返回对应的pid
 * @param port 端口号
 */
try {
  const pid = await getPid(3000)
  console.log(`端口 3000 对应的进程ID: ${pid}`)
} catch (error) {
  console.error('获取进程ID失败:', error)
}
```

## 版本管理

### satisfies

检查版本是否满足指定的版本范围。

```js twoslash
import { satisfies } from 'node-karin'

/**
 * 检查版本是否在范围内
 * @param range 版本范围
 * @param version 版本
 */
// 基本用法
console.log(satisfies('^1.0.0', '1.0.1')) // 输出: true
console.log(satisfies('^1.0.0', '2.0.0')) // 输出: false

// 通配符
console.log(satisfies('1.0.x', '1.0.1')) // 输出: true
console.log(satisfies('1.x.0', '1.2.0')) // 输出: true

// 复合条件
console.log(satisfies('>=1.0.0 <2.0.0', '1.5.0')) // 输出: true
```

## 重启管理

### restart

重启 Bot。

```js twoslash
import { restart } from 'node-karin'

/**
 * 重启Bot
 * @param selfId 机器人的id
 * @param contact 事件联系人信息
 * @param messageId 消息id
 * @param isFront 是否为前台重启 默认是
 */
// 假设这些参数已经从事件中获取
const result = await restart('123456', { user_id: '654321' }, 'msg_123', true)
if (result.status === 'success') {
  console.log('重启成功:', result.data)
} else {
  console.error('重启失败:', result.data)
}
```

### restartDirect

直接重启当前进程。

```js twoslash
import { restartDirect } from 'node-karin'

/**
 * 直接重启
 */
try {
  await restartDirect()
  // 如果成功重启，这里的代码不会执行
} catch (error) {
  console.error('重启失败:', error)
}
```

## 系统信息

### isWin

判断当前系统是否为 Windows。

```js twoslash
import { isWin } from 'node-karin'

/**
 * 是否为windows
 */
if (isWin) {
  console.log('当前系统是 Windows')
} else {
  console.log('当前系统不是 Windows')
}
```

### isLinux

判断当前系统是否为 Linux。

```js twoslash
import { isLinux } from 'node-karin'

/**
 * 是否为linux
 */
if (isLinux) {
  console.log('当前系统是 Linux')
} else {
  console.log('当前系统不是 Linux')
}
```

### isMac

判断当前系统是否为 macOS。

```js twoslash
import { isMac } from 'node-karin'

/**
 * 是否为mac
 */
if (isMac) {
  console.log('当前系统是 macOS')
} else {
  console.log('当前系统不是 macOS')
}
```

### isDocker

判断当前环境是否为 Docker。

```js twoslash
import { isDocker } from 'node-karin'

/**
 * 是否为docker
 */
if (isDocker) {
  console.log('当前运行在 Docker 环境中')
} else {
  console.log('当前不是 Docker 环境')
}
```

### isRoot

判断当前用户是否为 root（仅 Linux）。

```js twoslash
import { isRoot } from 'node-karin'

/**
 * 是否为root用户 仅linux
 */
if (isRoot) {
  console.log('当前以 root 用户运行')
} else {
  console.log('当前不是 root 用户')
}
```

## 时间处理

### uptime

获取 Karin 运行时间。

```js twoslash
import { uptime } from 'node-karin'

/**
 * 获取kairn运行时间
 */
const runningTime = uptime()
console.log(`Karin 已运行: ${runningTime}`) // 例如: "2天3小时45分钟"
```

### formatTime

格式化时间差。

```js twoslash
import { formatTime } from 'node-karin'

/**
 * 传入一个或两个时间戳
 * 传入一个返回当前时间 - 时间1
 * 传入两个返回时间2 - 时间1
 * @param time 时间戳
 * @param time2 时间戳2，默认为当前时间
 */
// 计算从指定时间戳到现在的时间差
const timeDiff = formatTime(1620000000)
console.log(timeDiff) // 例如: "18天5小时30分钟"

// 计算两个时间戳之间的差异
const timeBetween = formatTime(1620000000, 1620086400)
console.log(timeBetween) // 例如: "1天"
```

## Git 和包管理（更新）

### getPkgVersion

获取本地安装的指定包的版本号。

```js twoslash
import { getPkgVersion } from 'node-karin'

/**
 * 获取指定包的本地版本号
 * @param name 包名
 */
try {
  const version = await getPkgVersion('node-karin')
  console.log(`node-karin 本地版本: ${version}`) // 例如: "1.2.3"
} catch (error) {
  console.error('获取版本失败:', error)
}
```

### getRemotePkgVersion

获取远程仓库中指定包的版本号。

```js twoslash
import { getRemotePkgVersion } from 'node-karin'

/**
 * 获取指定包的远程版本号
 * @param name 包名
 * @param tag 标签，默认为 latest
 */
try {
  const version = await getRemotePkgVersion('node-karin')
  console.log(`node-karin 最新版本: ${version}`) // 例如: "1.2.4"

  // 获取特定标签的版本
  const betaVersion = await getRemotePkgVersion('node-karin', 'beta')
  console.log(`node-karin beta 版本: ${betaVersion}`)
} catch (error) {
  console.error('获取版本失败:', error)
}
```

### updatePkg

更新指定的 npm 包。

```js twoslash
import { updatePkg } from 'node-karin'

/**
 * 更新指定的npm插件
 * @param name 包名
 * @param tag 标签 默认 latest
 */
const result = await updatePkg('node-karin')
if (result.status === 'ok') {
  console.log(`更新成功: ${result.local} -> ${result.remote}`)
} else {
  console.error(`更新失败: ${result.data}`)
}
```

### updateAllPkg

更新所有 npm 插件。

```js twoslash
import { updateAllPkg } from 'node-karin'

/**
 * 更新全部npm插件
 */
try {
  const result = await updateAllPkg()
  console.log(result) // 输出更新结果信息
} catch (error) {
  console.error('更新失败:', error)
}
```

### checkGitPluginUpdate

检查 git 插件是否有更新。

```js twoslash
import { checkGitPluginUpdate } from 'node-karin'

/**
 * 检查git插件是否有更新
 * @param filePath 插件路径
 * @param time 任务执行超时时间 默认120s
 */
const result = await checkGitPluginUpdate('./plugins/my-plugin')
if (result.status === 'yes') {
  console.log(`发现更新: ${result.count} 次提交`)
  console.log(`更新内容: ${result.data}`)
} else if (result.status === 'no') {
  console.log(`无更新: ${result.data}`)
} else {
  console.error(`检查失败: ${result.data}`)
}
```

### getCommit

获取指定仓库的提交记录。

```js twoslash
import { getCommit } from 'node-karin'

/**
 * 获取指定仓库的提交记录
 * @param options 参数
 */
// 获取最近一次提交
const lastCommit = await getCommit({
  path: './plugins/my-plugin',
  count: 1
})
console.log(`最近提交: ${lastCommit}`)

// 获取指定分支的提交
const branchCommits = await getCommit({
  path: './plugins/my-plugin',
  count: 3,
  branch: 'main'
})
console.log(`分支提交: ${branchCommits}`)
```

### getHash

获取指定仓库的当前提交哈希值。

```js twoslash
import { getHash } from 'node-karin'

/**
 * 获取指定仓库最后一次提交哈希值
 * @param filePath 插件相对路径
 * @param short 是否获取短哈希 默认true
 */
// 获取短哈希
const shortHash = await getHash('./plugins/my-plugin')
console.log(`短哈希: ${shortHash}`) // 例如: "a1b2c3d"

// 获取完整哈希
const fullHash = await getHash('./plugins/my-plugin', false)
console.log(`完整哈希: ${fullHash}`) // 例如: "a1b2c3d4e5f6..."
```

### getTime

获取指定仓库最后一次提交时间。

```js twoslash
import { getTime } from 'node-karin'

/**
 * 获取指定仓库最后一次提交时间日期
 * @param filePath 插件相对路径
 */
const lastCommitTime = await getTime('./plugins/my-plugin')
console.log(`最后提交时间: ${lastCommitTime}`) // 例如: "2023-05-01 12:34:56"
```

### updateGitPlugin

更新指定的 git 插件。

```js twoslash
import { updateGitPlugin } from 'node-karin'

/**
 * 更新指定git插件
 * @param filePath 插件路径
 * @param cmd 执行命令 默认git pull
 * @param time 任务执行超时时间 默认120s
 */
const result = await updateGitPlugin('./plugins/my-plugin')
if (result.status === 'ok') {
  console.log(`更新成功: ${result.data}`)
  console.log(`提交信息: ${result.commit}`)
} else {
  console.error(`更新失败: ${result.data}`)
}
```

### updateAllGitPlugin

更新所有 git 插件。

```js twoslash
import { updateAllGitPlugin } from 'node-karin'

/**
 * 更新所有git插件
 * @param cmd 执行命令 默认git pull
 * @param time 任务执行超时时间 默认120s
 */
try {
  const result = await updateAllGitPlugin()
  console.log(result) // 输出所有插件的更新结果
} catch (error) {
  console.error('更新失败:', error)
}
```
