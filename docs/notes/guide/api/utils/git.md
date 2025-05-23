---
title: git
createTime: 2025/05/15 00:12:24
permalink: /guide/vwjw5294/
---

# git 模块

> [!note]
> 本文由 AI 辅助生成，可能存在不准确性。

git 模块提供了与 Git 仓库交互的实用函数，主要用于获取分支信息和执行拉取操作。

## 分支操作

### getLocalBranches

获取本地 Git 仓库的分支列表。

```ts twoslash
// @noErrorValidation
import { getLocalBranches } from 'node-karin'

/**
 * 获取本地分支列表
 * @param cwd 仓库路径，默认为当前目录
 * @returns 包含默认分支和分支列表的对象
 */
const branches = await getLocalBranches('/path/to/repo')
```

**返回值类型：**

```ts twoslash
// @noErrorValidation
interface GitLocalBranches {
  /** 默认分支 */
  defaultBranch: string
  /** 本地分支列表 */
  list: string[]
}
```

### getDefaultBranch

获取本地 Git 仓库的默认分支。

```ts twoslash
// @noErrorValidation
import { getDefaultBranch } from 'node-karin'

/**
 * 获取本地默认分支
 * @param cwd 仓库路径，默认为当前目录
 * @returns 默认分支名称
 */
const branch = await getDefaultBranch('/path/to/repo')
```

### getRemoteBranches

获取远程 Git 仓库的分支列表。

```ts twoslash
// @noErrorValidation
import { getRemoteBranches } from 'node-karin'

/**
 * 获取远程分支列表
 * @param cwd 仓库路径
 * @returns 远程分支列表，包含哈希和分支名称
 */
const remoteBranches = await getRemoteBranches('/path/to/repo')
```

**返回值类型：**

```ts twoslash
// @noErrorValidation
interface GitRemoteBranches {
  /** 分支名称 */
  branch: string
  /** 短哈希 */
  short: string
  /** 长哈希 */
  hash: string
}
```

### getLocalCommitHash

获取本地分支的最新提交哈希。

```ts twoslash
// @noErrorValidation
import { getLocalCommitHash } from 'node-karin'

/**
 * 获取本地最新提交哈希
 * @param cwd 仓库路径
 * @param options 选项对象
 * @returns 提交哈希
 */
const hash = await getLocalCommitHash('/path/to/repo', {
  branch: 'main', // 默认为'HEAD'
  short: true, // 默认为false，返回长哈希
})
```

### getRemoteCommitHash

获取远程分支的最新提交哈希。

```ts twoslash
// @noErrorValidation
import { getRemoteCommitHash } from 'node-karin'

/**
 * 获取远程最新提交哈希
 * @param cwd 仓库路径
 * @param options 选项对象
 * @returns 远程提交哈希
 */
const hash = await getRemoteCommitHash('/path/to/repo', {
  branch: 'main', // 默认为'origin/HEAD'
  short: true, // 默认为false，返回长哈希
})
```

## 仓库更新

### gitPull

拉取 Git 仓库更新，支持普通 pull 和强制更新。

```ts twoslash
// @noErrorValidation
import { gitPull } from 'node-karin'

/**
 * 拉取git仓库更新
 * @param cwd 仓库路径
 * @param options 拉取选项
 * @returns 拉取结果
 */
const result = await gitPull('/path/to/repo', {
  force: false, // 是否强制拉取
  remote: 'origin/main', // 强制拉取时同步的远程分支
  timeout: 30, // 超时时间(秒)
  customCmd: 'git pull --rebase', // 自定义拉取命令
})
```

**返回值类型：**

```ts twoslash
// @noErrorValidation
interface GitPullResult {
  /** 是否成功 */
  status: boolean
  /** 更新详情 */
  hash: {
    /** 更新前哈希 */
    before: string
    /** 更新后哈希 */
    after: string
  }
  /** 更新信息 */
  data: string
}
```

## 内部工具函数

### exec

执行命令行命令并返回结果。

```ts twoslash
// @noErrorValidation
import { exec } from 'node-karin'

/**
 * 执行命令
 * @param cmd 命令字符串
 * @param options 执行选项
 * @returns 执行结果
 */
const result = await exec('git status', {
  cwd: '/path/to/repo',
  timeout: 30,
})
```

**返回值类型：**

```ts
{
  status: boolean // 执行状态
  error: Error | null // 错误信息
  stdout: string // 标准输出
  stderr: string // 标准错误
}
```
