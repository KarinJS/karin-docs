---
title: 🏗️ 框架安装
createTime: 2025/05/14 02:39:47
---

# 框架安装

## 安装步骤

::: steps
1. **准备环境**
   - 确保已安装 Node.js 20+ 和 pnpm 9+
   ```bash
   node -v
   pnpm -v
   ```
   - 创建一个干净的目录
   ```bash
   mkdir karin-project && cd karin-project
   ```

2. **执行创建命令**
   ```bash
   pnpm create karin
   ```
   - 自动检测环境并选择最佳镜像源
   - 检查PM2和PNPM安装状态

3. **交互式选择**
   - 使用方向键选择选项
   - 按回车确认选择
   - 可选项包括：
     - 项目类型（插件/完整项目）
     - 模板选择（TypeScript/JavaScript）
     - Puppeteer安装（图片生成功能）
     - 镜像源切换

4. **等待安装完成**
   - 自动下载所需依赖
   - 初始化项目结构
   - 配置基础环境
   ```bash
   # 安装过程示例输出
   ✔ 检查环境完成
   ✔ 下载依赖中...
   ✔ 初始化项目结构
   ```

5. **启动项目**
   ```bash
   cd 项目名称
   npx karin .  # 前台启动
   # 或
   npx karin pm2  # 后台运行
   ```
:::

- 用方向键选择，回车确认
- 不知道选什么？全部默认就对啦！
- puppeteer 是用来生成图片的，不需要的话可以跳过哦
- 如果以后项目运行出现异常，且重装依赖也无法修复，可以在 karin 目录下尝试执行魔法咒语并选择 `强制修复` ，可能有奇效呢~

## 常用指令

> [!NOTE]
> 文档可能会有点落后于版本，随时用 `npx karin` 查看最新指令哦！
>
> 前台启动时请保持窗口开启，想关闭用 `Ctrl+C` 就好啦~
>
> 后台运行的话随便关窗口，要停止就用 `npx karin stop`

> [!note]
> 1.8.0+ 版本新增
> `ki`缩写命令，使用`ki`代替`karin`，更简洁哦！
> 
> 当前最新版本：v1.12.x 系列

::: code-tabs
@创建项目

```bash
# 如果用了上面的 pnpm create karin 就不用这个啦！
npx karin init
```

@查看所有指令

```bash
npx karin  # 解锁更多操作！
```

:::

📝 日常会用到的指令：
::: code-tabs
@前台启动

```bash
npx karin .  # 开始冒险！
```

@后台运行

```bash
npx karin pm2  # 悄悄在后台运行
```

@停止运行

```bash
npx karin stop  # 暂时休息一下
```

@重启服务

```bash
npx karin rs  # 刷新一下！
```

@查看日志

```bash
npx karin log  # 看看发生了什么
```

@更新全部

```bash
npx karin up  # 升级打怪！
```

@查看版本

```bash
npx karin -v  # 看看当前版本
```

:::

### 懒人福利

觉得每次都要输入`npx`太麻烦？来试试全局安装：

```bash
npm install -g @karinjs/cli@latest  # 安装全局命令
```

这样就可以直接使用`karin`命令啦：

```bash
karin  # 更简单！
karin pm2  # 更快捷！
```

## 寻找插件

想要给你的 Karin 添加新功能？来这里找找：

- 去 Github 搜索 `karin-plugin`，有很多好玩的！
- 看看我们的 [插件商店](../plugins/index)

**<mark>更多精彩内容正在开发中...想要开发插件的小伙伴可以看看右上角的开发指南哦！</mark>**

## NPM 包名更新

> 🎉 **重要更新**：感谢 [valqelyan](https://github.com/valqelyan) 的慷慨转让，从 2.0 版本开始，Karin 正式使用 `karin` 作为 npm 包名！
> 
> - **旧包名**：`node-karin`（v1.x 系列）
> - **新包名**：`karin`（v2.0+ 系列）

## 特别感谢

- `Karin` 最初是从 [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai) 获得灵感，感谢所有 `Miao-Yunzai` 的贡献者们！

- 特别感谢 [喵喵大佬](https://github.com/yoimiya-kokomi) 对许可证相关事项的大力支持！

- 为了提供更好的开发体验，`Karin` 使用 `TypeScript` 完全重写，并采用更自由的 `MIT` 协议开源。

感谢这些可爱的开发者们对 `Karin` 的贡献：

[![贡献者](https://contributors-img.web.app/image?repo=KarinJS/Karin)](https://github.com/KarinJS/Karin/graphs/contributors)
