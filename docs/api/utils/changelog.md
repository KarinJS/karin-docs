# changelog 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

changelog模块提供了用于处理更新日志(CHANGELOG.md)的工具函数，可以提取和解析特定版本的更新说明。

## 提取单个版本

### log

提取指定版本号的更新日志内容。

```typescript
import { log } from 'node-karin'

/**
 * 提取指定版本号的更新日志
 * @param version 版本号，如 "1.0.0"
 * @param data CHANGELOG.md文件内容
 * @returns 更新日志内容，如果未找到则返回null
 */
// 读取文件内容
const changelogContent = fs.readFileSync('CHANGELOG.md', 'utf-8')

// 提取特定版本的日志
const version100Log = log('1.0.0', changelogContent)
console.log(version100Log)
```

## 提取多个版本

### logs

提取指定范围版本号的更新日志内容，可以选择向前或向后提取。

```typescript
import { logs } from 'node-karin'

/**
 * 提取指定范围版本号的更新日志
 * @param version 起始版本号
 * @param data CHANGELOG.md文件内容
 * @param length 提取长度，默认为1
 * @param reverse 是否反向提取，默认为false(向后提取)
 * @returns 合并后的更新日志内容
 */
// 读取文件内容
const changelogContent = fs.readFileSync('CHANGELOG.md', 'utf-8')

// 从1.0.0版本开始，向后提取2个版本的日志
const forwardLogs = logs('1.0.0', changelogContent, 2, false)

// 从1.0.0版本开始，向前提取2个版本的日志
const backwardLogs = logs('1.0.0', changelogContent, 2, true)
```

## 提取版本区间

### range

提取两个指定版本号之间的所有更新日志内容。

```typescript
import { range } from 'node-karin'

/**
 * 提取指定版本号之间的更新日志
 * @param data CHANGELOG.md文件内容
 * @param startVersion 起始版本号
 * @param endVersion 结束版本号
 * @returns 合并后的更新日志内容
 */
// 读取文件内容
const changelogContent = fs.readFileSync('CHANGELOG.md', 'utf-8')

// 提取1.0.0到2.0.0之间的所有版本更新日志
const versionRangeLogs = range(changelogContent, '1.0.0', '2.0.0')
```

## 解析更新日志

### parseChangelog

将更新日志解析为以版本号为键的对象结构。

```typescript
import { parseChangelog } from 'node-karin'

/**
 * 对更新日志进行解析并形成对象
 * @param data 更新日志内容
 * @returns 以版本号为键的更新日志对象
 */
// 读取文件内容
const changelogContent = fs.readFileSync('CHANGELOG.md', 'utf-8')

// 解析为对象
const changelogObj = parseChangelog(changelogContent)

// 输出所有版本号
console.log(Object.keys(changelogObj))

// 访问特定版本的更新内容
console.log(changelogObj['1.0.0'])
```

## 使用示例

```typescript
import { readFile } from 'fs/promises'
import { log, range, parseChangelog } from 'node-karin'

async function getRecentChanges(changelogPath, currentVersion) {
  try {
    // 读取CHANGELOG.md文件
    const content = await readFile(changelogPath, 'utf-8')
    
    // 获取当前版本的更新日志
    const currentChanges = log(currentVersion, content)
    
    // 解析整个更新日志
    const allChanges = parseChangelog(content)
    
    // 获取所有版本号
    const versions = Object.keys(allChanges)
    
    // 找出比当前版本更新的版本
    const newerVersions = versions.filter(v => {
      const [major1, minor1, patch1] = currentVersion.split('.').map(Number)
      const [major2, minor2, patch2] = v.split('.').map(Number)
      
      return major2 > major1 || 
             (major2 === major1 && minor2 > minor1) ||
             (major2 === major1 && minor2 === minor1 && patch2 > patch1)
    })
    
    if (newerVersions.length > 0) {
      const latestVersion = newerVersions[0]
      console.log(`发现新版本: ${latestVersion}`)
      console.log('更新内容:')
      console.log(allChanges[latestVersion])
    } else {
      console.log(`当前版本 ${currentVersion} 已是最新`)
    }
  } catch (error) {
    console.error('读取更新日志失败:', error)
  }
} 