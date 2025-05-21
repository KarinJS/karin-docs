# 贡献指南

## 概览

Karin（卡琳）是一款灵活、现代、极易扩展的 Node.js 插件化应用框架。本项目仓库借助于 [pnpm 工作空间](https://pnpm.io/zh/workspaces) 来实现 [Monorepo](https://en.wikipedia.org/wiki/Monorepo)，存放了多个互相关联的独立 Package。

## 开发配置

开发要求：

- [Node.js](http://nodejs.org/) version 18.0.0+
- [pnpm](https://pnpm.io/zh/) version 9+（推荐）

克隆代码仓库，并安装依赖：

```sh
pnpm install
```

在首次启动开发服务前，先构建源代码生成类型包：

```sh
pnpm build:core
```

### 主要工具

- [TypeScript](https://www.typescriptlang.org/) 作为开发语言
- [ESLint](https://eslint.org/) 用于代码检查和格式化

### 脚本

#### `pnpm build:core`

`build:core` 命令用于构建核心框架和生成类型定义。你在克隆代码仓库后，需要先执行该命令来确保项目代码可以顺利运行。

#### `pnpm test`

`test` 命令用于运行测试套件，确保你的更改不会破坏现有功能。

```sh
pnpm test
```

#### `pnpm lint`

`lint` 命令用于检查代码风格和潜在问题。

```sh
pnpm lint
```

### 插件开发

如果你想要开发 Karin 插件，可以使用官方提供的插件模板：

```sh
# 交互式创建项目
pnpm create karin

# 或者直接使用npx（无需安装pnpm）
npx create-karin
```

按照提示选择插件类型，可选择：

- TypeScript 插件（推荐）：`karin-plugin-ts`
- JavaScript 插件：`karin-plugin-js`

### IDE 支持

推荐使用 `VS Code` 进行开发。本仓库配置了开发时推荐的 `VS Code` 扩展，当你导入本仓库时，`VS Code` 可能会推荐你安装一些扩展。

## 提问与支持

如果你在开发过程中遇到问题，可以通过以下方式获取帮助：

- 加入官方用户交流群：967068507
- 通过 [GitHub Issues](https://github.com/KarinJS/Karin/issues/new/choose) 提问

## 贡献流程

1. Fork 本仓库，创建你的分支
2. 提交你的更改，附上简要说明
3. 发起 Pull Request，耐心等待 Review
4. 你的名字将出现在贡献者列表，收获一份开源荣誉！

欢迎任何形式的贡献，无论是代码、文档、建议还是灵感！
