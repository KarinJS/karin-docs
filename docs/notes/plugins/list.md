---
layout: home
nolebase:
  gitChangelog: false
  pageProperties: false
title: list
createTime: 2025/04/26 13:09:07
permalink: /docs/plugins/list/
---

# 📜 用户须知

**Karin 开发团队（以下简称“我们”）在此特别提醒用户注意：**

<details>

<summary>点击展开</summary>

1. 插件的责任和风险：
   - 本列表收录的所有的插件（以下简称“插件”）。
   - 我们对于插件的功能性、兼容性或安全性不提供任何明示或暗示的保证。
   - 用户在选择下载或使用插件时，应自行评估插件的适用性、稳定性及安全性。
   - 用户因使用插件而可能遭受的任何形式的数据丢失或损害，我们概不负责。
2. 知识产权和合规性：
   - 用户在使用插件时，应确保其遵守相关的知识产权法律法规。
   - 我们不承担用户因违反知识产权法律法规而产生的任何法律责任。
   - 用户应遵守各插件的开源协议，确保其合法使用插件并遵守相关规定。
3. 自主选择：
   - 我们强烈建议用户在下载或使用插件前，仔细阅读并理解插件的用户文档和开源协议。
   - 用户应确保所选插件的功能和性能符合其个人或业务的需求。

**用户使用插件所产生的一切后果由用户自行承担，我们不承担任何由此引发的任何问题或责任。**

## 🎉 插件收录规范

<details>

<summary>点击查看提交插件说明</summary>

- 欢迎提交插件，但请遵守插件收录规范。
- 如果您的插件存在违反插件收录规范的行为，我们会立即删除您的插件。
- 打开 [**plugins**][plugins] 页面，按照已有的格式新增插件信息
- 填写提交信息，使用 `feat: 插件名称` 、`feat: 添加测试插件` 等格式
- 拓展描述信息，请尽量提供，非必需
- 填写完成提交，等待审核

</details>

<details>

<summary>点击查看插件收录规范</summary>

- 对于本页面收录的所有插件，我们要求开发者遵守以下规定
- 必须包含开源协议，并在仓库中提供
- 禁止存在侵犯第三方知识产权的行为
- 禁止存在恶意破坏、恶意修改、恶意删除、恶意添加等恶意行为
- 禁止存在恶意推广、恶意宣传等恶意行为
- 禁止存在恶意破坏用户隐私、恶意收集用户信息等恶意行为
- 禁止存在恶意利用插件进行违法犯罪活动等恶意行为
- 禁止存在恶意收集、泄露用户数据、恶意泄露用户隐私等恶意行为
- 禁止存在恶意修改插件的源代码、恶意删除插件的源代码等恶意行为
- 禁止在插件中包含任何形式的**后门**、**木马**、**病毒**等恶意代码或程序
- 对于加密、混淆的插件，必须在仓库主页声明哪些文件是加密、混淆的，并注明代码混淆的目的

</details>

**禁止未经插件作者授权将插件制作成一键安装的脚本、容器等。**

</details>

::: danger
当前页面正在施工中 🚧
:::

<PluginList />

<br /><br /><br />

<details>

<summary>过时内容。。。</summary>

## 📖 官方仓库

> 请不要往这里提交插件~

| 名称                | 作者           | 仓库地址                     | 镜像仓库 | 开源协议                 | 简介                                    |
| ------------------- | -------------- | ---------------------------- | -------- | ------------------------ | --------------------------------------- |
| Karin               | [时瑾][shijin] | [Karin][Karin]               | -        | [MIT][Karin-tab]         | 高效、轻量的 Node.JS 框架               |
| 文档仓库            | [时瑾][shijin] | [文档仓库][docs]             | -        | [GPL-3.0][Karin-tab]     | Kritor 的文档仓库(也就是本页面)         |
| puppeteer           | [时瑾][shijin] | [karin-puppeteer][puppeteer] | -        | [GPL-3.0][puppeteer-tab] | Puppeteer 渲染器                        |
| JavaScript 开发模板 | [时瑾][shijin] | [template][template]         | -        | [GPL-3.0][template-tab]  | 插件模板仓库                            |
| 基本插件            | [时瑾][shijin] | [karin-plugin-basic][pbasic] | -        | [GPL-3.0][basic-tab]     | 基础插件，`#状态`、`#更新`、`#更新日志` |

## 🦄Npm 插件列表

::: tip

> 请将下方的 `name` 替换为插件的`包名`即可

```bash
pnpm add name -w
```

:::

| 名称         | 作者           | 仓库地址               | 包名                    | 开源协议                      | 简介         |
| ------------ | -------------- | ---------------------- | ----------------------- | ----------------------------- | ------------ |
| `icqq`适配器 | [时瑾][shijin] | [Github][adapter-icqq] | `@karinjs/adapter-icqq` | [GPL-3.0][server-watcher-tab] | `icqq适配器` |

## 🎨Git 插件列表

> 请省略前缀哦~

| 名称           | 作者                       | 仓库地址                         | 镜像仓库 | 开源协议                      | 简介                   |
| -------------- | -------------------------- | -------------------------------- | -------- | ----------------------------- | ---------------------- |
| server-watcher | [ikechan8370][ikechan8370] | [server-watcher][server-watcher] | -        | [GPL-3.0][server-watcher-tab] | 监控服务器状态的插件   |
| suno           | [Alcedo][HalcyonAlcedo]    | [suno][suno]                     | -        | [GPL-3.0][suno-tab]           | suno 歌曲生成插件      |
| MysTool        | [babanbang][babanbang]     | [MysTool][MysTool]               | -        | [GPL-3.0][MysTool-tab]        | 原神、星穹铁道信息查询 |
| manage         | [Alcedo][HalcyonAlcedo]    | [manage][manage]                 | -        | [GPL-3.0][manage-tab]         | karin 配置面板插件     |
| auto-command   | [Alcedo][HalcyonAlcedo]    | [auto-command][auto-command]     | -        | [GPL-3.0][auto-command-tab]   | 自动命令插件           |

## 📖App 插件列表

> 可提交一些单个 `js` 插件，请省略前缀哦~

| 名称          | 作者                    | 仓库地址             | 镜像仓库 | 开源协议            | 简介                              |
| ------------- | ----------------------- | -------------------- | -------- | ------------------- | --------------------------------- |
| wormhole      | [Alcedo][HalcyonAlcedo] | [wormhole][wormhole] | -        | [MIT][wormhole-tab] | 用于 Karin 的渲染代理插件         |
| bili-analysis | [Aliorpse][Aliorpse]    | [alijs][bili]        | -        | [MIT][alijs-tab]    | Bilibili 解析插件                 |
| fun.js        | [Aliorpse][Aliorpse]    | [alijs][fun_js]      | -        | [MIT][alijs-tab]    | 基础娱乐插件,赞我,今日运势等      |
| MCMotd        | [Aliorpse][Aliorpse]    | [alijs][MCMotd]      | -        | [MIT][alijs-tab]    | MC 服务器查询,返回图片,JE/BE 支持 |

## 🌐 其他

> 可以存放一些脚本类、工具类、资源类，但请不要制作一键安装插件~

| 名称 | 作者 | 仓库地址 | 镜像仓库 | 开源协议 | 简介 |
| ---- | ---- | -------- | -------- | -------- | ---- |

---

<!-- 作者 -->

[Karin]: https://github.com/KarinJS/Karin
[ikechan8370]: https://github.com/ikechan8370
[HalcyonAlcedo]: https://github.com/HalcyonAlcedo
[babanbang]: https://github.com/babanbang
[Aliorpse]: https://github.com/Aliorpse
[shijin]: https://github.com/sj817

<!-- 插件主页、仓库 -->

[docs]: https://github.com/KarinJS/Karin/tree/docs
[pbasic]: https://github.com/KarinJS/karin-plugin-basic
[template]: https://github.com/KarinJS/karin-plugin-template
[puppeteer]: https://github.com/KarinJS/karin-puppeteer
[server-watcher]: https://github.com/ikechan8370/karin-plugin-server-watcher
[suno]: https://github.com/HalcyonAlcedo/karin-plugin-suno
[wormhole]: https://github.com/HalcyonAlcedo/wormhole/blob/main/demo/karin-wormhole-client.js
[MysTool]: https://github.com/babanbang/karin-plugin-MysTool
[manage]: https://github.com/HalcyonAlcedo/karin-plugin-manage
[auto-command]: https://github.com/HalcyonAlcedo/karin-plugin-auto-command
[bili]: https://github.com/Aliorpse/karin-plugins-alijs/blob/main/js/bilibiliAnylasis.js
[fun_js]: https://github.com/Aliorpse/karin-plugins-alijs/blob/main/js/fun.js
[MCMotd]: https://github.com/Aliorpse/karin-plugins-alijs/blob/main/js/MCMotd.js
[adapter-icqq]: https://github.com/KarinJS/karin-plugin-adapter-icqq

<!-- 开源协议 -->

[Karin-tab]: https://github.com/KarinJS/Karin?tab=GPL-3.0-1-ov-file#readme
[basic-tab]: https://github.com/KarinJS/karin-plugin-basic?tab=GPL-3.0-1-ov-file#readme
[template-tab]: https://github.com/KarinJS/karin-plugin-template?tab=GPL-3.0-1-ov-file#readme
[puppeteer-tab]: https://github.com/KarinJS/karin-puppeteer?tab=GPL-3.0-1-ov-file#readme
[server-watcher-tab]: https://github.com/ikechan8370/karin-plugin-server-watcher?tab=GPL-3.0-1-ov-file#readme
[suno-tab]: https://github.com/HalcyonAlcedo/karin-plugin-suno?tab=GPL-3.0-1-ov-file#readme
[wormhole-tab]: https://github.com/HalcyonAlcedo/wormhole?tab=MIT-1-ov-file#readme
[MysTool-tab]: https://github.com/babanbang/karin-plugin-MysTool?tab=GPL-3.0-1-ov-file#readme
[manage-tab]: https://github.com/HalcyonAlcedo/karin-plugin-manage?tab=GPL-3.0-1-ov-file#readme
[auto-command-tab]: https://github.com/HalcyonAlcedo/karin-plugin-auto-command?tab=GPL-3.0-1-ov-file#readme
[alijs-tab]: https://github.com/Aliorpse/karin-plugins-alijs?tab=MIT-1-ov-file#readme

<!-- 其他链接 -->

[plugins]: https://github.com/KarinJS/plugins-list/edit/main/plugins.json

</details>
