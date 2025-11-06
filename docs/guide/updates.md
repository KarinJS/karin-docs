---
title: 🎉 最近更新
createTime: 2025/11/06 03:26:00
---

# 最近更新

本页面记录 Karin 框架的重要更新和新功能。

## v1.12.x 系列 (2025年10月)

### v1.12.2 (2025-10-20)

**🐛 Bug Fixes:**

- **版本比较增强**：增强版本比较功能，支持严格语义化版本模式
  - 新增 `CompareMode` 类型，支持 'xyz' 和 'semver' 两种版本比较模式
  - 实现严格语义化版本解析和比较逻辑，遵循 SemVer 2.0.0 规范
  - 重构 `checkPkgUpdate` 方法，支持根据模式进行版本比较

### v1.12.1 (2025-10-17)

**🐛 Bug Fixes:**

- **Changelog 解析器**：支持所有语义化版本格式
  - 修复 changelog 解析器中的正则表达式，支持更多版本格式

### v1.12.0 (2025-10-16)

**✨ Features:**

- **Web UI 增强**：添加 Select 下拉选择组件到 web.config 系统
  - 新增 `SelectProps` 组件配置
  - 扩展 Select 组件属性和功能
  - 支持动态配置选项

## v1.11.x 系列 (2025年9-10月)

### v1.11.6 (2025-10-14)

**🐛 Bug Fixes:**

- **API 方法名修正**：修复 `setGgroupHighlights` 的拼写错误，正确命名为 `setGroupHighlights`
- **OneBot 适配器**：提升 OneBot 适配器对私聊消息 `sub_type=normal` 的兼容性
- **文档构建**：添加构建文档的脚本

### v1.11.5 (2025-10-08)

**🐛 Bug Fixes:**

- **Checkbox 组件**：支持为 checkbox 组件选项显示描述文本

### v1.11.4 (2025-10-08)

**🐛 Bug Fixes:**

- **ID 生成器**：使用 ID 生成器 API 为 input adapter 生成唯一递增 ID

### v1.11.3 (2025-10-07)

**🐛 Bug Fixes:**

- **Redis Mock**：修正 Redis mock SET 方法选项处理和类型检查
  - 修复 NX、XX、KEEPTTL 和 PXAT 选项的处理
  - 改进所有键类型的 NX 和 XX 选项处理
  - 将 setNX 返回类型从 boolean 改为 number 以匹配 Redis API

### v1.11.2 (2025-10-07)

**🐛 Bug Fixes:**

- **Redis Mock 方法补全**：修复 Redis Mock 客户端缺少常用方法的问题
  - 新增：`setEx`、`pSetEx`、`setNX`、`getEx`、`getDel`
  - 新增：`incrBy`、`decrBy`、`incrByFloat`
  - 修复重复的 `pExpire`/`pTTL`/`pExpireAt` 实现

### v1.11.1 (2025-10-02)

**🐛 Bug Fixes:**

- **消息表情回应**：将 setMsgReaction 中的 faceId 类型从 number 改为 `number | string`

### v1.11.0 (2025-10-02)

**✨ Features:**

- **群信息接口**：GroupInfo 接口新增 `avatar` 字段，用于获取群头像

**🐛 Bug Fixes:**

- **Console 适配器**：修复 console 适配器对视频和音频文件使用正确的文件扩展名
- **消息接口**：主动消息接口支持 `Array<string | Elements>`

## v1.10.x 系列 (2025年7-9月)

### 主要更新

- **环境变量加载**：修复环境变量加载时未覆盖现有值的问题
- **Lagrange 适配器**：修复 Lagrange 环境下调用 getHistoryMsg 的问题
- **文档路径更新**：更新文档链接至新主站点 karinjs.com

## 插件开发者注意事项

### 版本兼容性

从 v1.12.1 开始，插件可以使用 `ignoreEngines` 选项强制加载，即使版本不匹配：

```json
{
  "karin": {
    "engines": {
      "karin": ">=1.8.0"
    },
    "ignoreEngines": true
  }
}
```

设置 `ignoreEngines: true` 时：
- 插件将在版本不兼容的情况下继续加载
- 会输出警告日志（而不是错误）显示版本不匹配的详情
- 仅适用于 `karin.engines` 字段，不影响 `package.engines`

### Web UI 配置

v1.12.0 新增 Select 下拉选择组件：

```typescript
// 在插件的 web.config 中使用
{
  type: 'select',
  label: '选择模式',
  options: [
    { label: '模式1', value: 'mode1' },
    { label: '模式2', value: 'mode2' }
  ]
}
```

v1.11.5 Checkbox 组件增强，支持描述文本：

```typescript
{
  type: 'checkbox',
  label: '功能选项',
  options: [
    { 
      label: '选项1',
      value: 'opt1',
      description: '这是选项1的详细说明'
    }
  ]
}
```

## 完整更新日志

查看 [GitHub Releases](https://github.com/KarinJS/Karin/releases) 获取完整的更新历史。
