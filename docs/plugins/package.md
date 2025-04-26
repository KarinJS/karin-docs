---
title: package
createTime: 2025/04/26 13:09:07
permalink: /docs/plugins/package/
---
# 插件包开发指南

本文档将指导您如何开发 karin 插件包。

::: tip 提示
**本篇主要以开发 JavaScript 插件包为例**<br />
karin 使用 `tsx` 运行 TypeScript ,要开发 TypeScript 插件包，请参考 [**TypeScript 插件包开发指南**](https://github.com/KarinJS/karin-plugin-template-ts)
:::

打开 [**模板仓库**](https://github.com/KarinJS/karin-plugin-template)

## 克隆模板仓库

点击 `Use this template` 或 `使用此模板` 按钮，创建自己的仓库。
![202404121412587](https://cdn.jsdelivr.net/gh/Zyy955/imgs/img/202404121412587.png)

填写仓库名称，描述，选择是否公开。
![202404121414580](https://cdn.jsdelivr.net/gh/Zyy955/imgs/img/202404121414580.png)

## 克隆仓库到本地

~~以下命令，在 karin 根目录执行~~<br />
相较于旧版本，目前不需要在 karin 目录中克隆到 plugins 了

```bash
git clone https://github.com/karinjs/karin-plugin-template.git
```

## 安装依赖

```bash
pnpm install
```

## 开发者模式启动

```bash
pnpm dev
```
