---
pageLayout: home
externalLinkIcon: false
config:
  - type: hero
    full: true
    background: tint-plate
    tintPlate:
      r:
        value: 114
        offset: 103
      g:
        value: 158
        offset: 52
      b:
        value: 198
        offset: 19
    hero:
      name: Karin
      tagline: 简洁、高效的机器人开发框架
      text: A high-performance framework for building efficient instant messaging bots
      actions:
        - theme: brand
          text: 🚀 从这里开始
          link: /notes/guide/install/start
        - theme: alt
          text: 📦 Github →
          link: https://github.com/KarinJS/Karin
  
  - type: text-image
    title: 🤔 为什么选择 Karin？
    description: 🤖 Karin 是一款为现代即时通讯机器人设计的开发框架，专注于提供简洁的 API 和强大的扩展能力。
    image: /logo.png
    list:
      - title: 🚀 简单易用
        description: 几行代码即可创建机器人，让开发过程变得轻松愉快。
      - title: 🔧 高度可定制
        description: 通过强大的插件系统，轻松扩展和定制你的机器人功能。
      - title: 🌐 多平台支持
        description: 支持多种即时通讯平台，一次开发，多处运行。
      - title: ⚡ 性能优先
        description: 高效处理大量消息，保证机器人的稳定运行。
    link: /notes/guide/intro/why
    linkText: 了解更多 →

  - type: custom
---

### 使用脚手架创建

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