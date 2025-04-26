---
comment: false
---

# 开发文档

> [!WARNING] 温馨提示
> 本页较长，建议使用`Ctrl + F`搜索关键字查找内容、善用右边导航栏。

欢迎来到 karin 的开发文档，<mark>我们是一个开放、友好的社区，欢迎大家的加入~</mark>

## 框架开发

> 咕咕咕，框架开发文档正在路上，敬请期待~

## 插件开发

### 了解插件

有关插件的基本概念，可以查看<Pill name="维基百科" link="https://zh.wikipedia.org/wiki/%E6%8F%92%E4%BB%B6" />自行了解，这里不再赘述。  
在 karin 中，插件一共有 3 种基本类型，分别是: `Npm插件`、`Git插件`、`App插件`。

#### Npm 插件

> [!IMPORTANT] 温馨提示
> Npm 插件通常是已经发布到 npm 仓库的插件，所以此类插件不支持`热更新`。

特征:

- 通过`pnpm`安装
- `package.json`中包含`karin`字段
- `karin`字段中可能包含`ts-app`字段，这是用于在`TypeScript`环境下热开发的字段

#### Git 插件

> [!IMPORTANT] 温馨提示
> Git 插件通常托管在`Github`或`Gitee`上，在克隆插件时请注意自身网络环境。

特征:

- 处于`./plugins`目录下是文件夹并包含`package.json`文件
- 通过`git`克隆 `(非绝对)`
- 目录下存在`.git`文件夹 `(非绝对)`
- `package.json`中包含`karin`字段，不包含此字段仅会加载`main`入口文件
- 还有最特殊的一种，处于开发阶段，<mark>在根目录的`package.json`中包含`karin`字段</mark>

#### App 插件

> [!IMPORTANT] 温馨提示
> App 插件通常是指单个`js`、`ts`文件，通常处于`./plugins/karin-plugin-example`目录下

特征:

- 通常是一个单文件
- 处于`./plugins`目录下的不带`package.json`的文件夹中
- 默认支持`热更新`，无论是生产环境还是开发环境

#### 插件子类

> [!IMPORTANT] 温馨提示
> 插件子类是指插件的一种分类，通常是指插件的功能性质。

- `command`插件: 处理消息事件
- `accept`插件: 处理通知、请求事件
- `task`插件: 构建定时任务
- `handler`插件: 约定事件处理
- `button`插件: QQBot 专属，构建按钮
- `plugin`类插件: 消息插件类

### 插件规范

> [!IMPORTANT] 温馨提示
> 本节点内容较长，请点击下方链接查看详细内容。  
> 如若正在开发，并且是第一次接触，请务必查看！！！

- [插件规范](./standard.md)

## 插件示例

- [消息插件示例](./demo.md)
- [插件包示例](./package.md)

## 插件列表

- [插件列表](./list.md)

## 前端配置

- [前端配置](./component.md)
