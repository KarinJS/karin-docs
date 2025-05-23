---
pageLayout: home
externalLinkIcon: false
config:
  - type: hero
    full: true
    background: tint-plate
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

:::code-tabs
@tab pnpm
```sh
pnpm create karin
```
:::