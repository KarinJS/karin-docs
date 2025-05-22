import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Karin',
  description: '让插件开发变得简单有趣',

  head: [
    // pwa
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Karin' }],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    // 1
    ['meta', { name: 'msvalidate.01', content: '8D5DDEA97F72740B73499AA520B67A1A' }],
    ['meta', { name: 'google-site-verification', content: '--V9ZVVBfakHdqwR54bgY6jnFPXz8XFBWhwsPEiBb5Q' }],
    ['meta', { property: 'og:title', content: 'Karin' }],
    ['meta', { property: 'og:description', content: 'An open source high-performance bot framework built with TypeScript. Supports functions such as multi-adapter, multi-platform access and custom renderer.' }],
    ['meta', { property: 'og:image', content: 'https://karin.fun/logo.png' }],
    ['meta', { property: 'og:image:width', content: '582' }],
    ['meta', { property: 'og:image:height', content: '648' }],
    ['meta', { property: 'og:url', content: 'https://karin.fun/' }],
    ['meta', { property: 'og:license', content: 'https://karin.fun/docs/license' }],
    ['meta', { name: 'author', content: 'KarinJS Team' }],
    ['meta', { name: 'description', content: 'An open source high-performance bot framework built with TypeScript. Supports functions such as multi-adapter, multi-platform access and custom renderer.' }],
    ['meta', { name: 'keywords', content: 'Bot frame, Robot frame, TypeScript' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
  ],
  plugins: [
    pwaPlugin(),
    pwaPopupPlugin({
      locales: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
        '/zh/': {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        tailwindcss(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
      ssr: {
        noExternal: process.env.NODE_ENV === 'production' ? [/element-plus/] : []
      },
    }
  }),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    plugins: {
      // 如果您在此处直接声明为 true，则表示开发环境和生产环境都启用该功能
      git: true,
      markdownPower: {
        imageSize: 'all', // 'local' | 'all'
      },
    },
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    hostname: 'https://karin.fun',

    /* 文档仓库配置，用于 editLink */
    docsRepo: 'KarinJS/Karin',
    docsDir: 'docs',
    // docsBranch: '',

    /* 页内信息 */
    editLink: true,
    // lastUpdated: true,
    contributors: {
      mode: 'block',
      avatar: true,
      avatarPattern: 'https://github.com/:username.png',
      info: [
        {
          username: 'ikenxuan', // github username
          alias: ['炫炫'], // 别名，本地 git 配置中的用户名
        }
      ]
    },
    changelog: false,

    /**
     * 博客
     * @see https://theme-plume.vuejs.press/config/basic/#blog
     */
    blog: false, // 禁用博客
    // blog: {
    //   postList: true, // 是否启用文章列表页
    //   tags: true, // 是否启用标签页
    //   archives: true, // 是否启用归档页
    //   categories: true, // 是否启用分类页
    //   postCover: 'right', // 文章封面位置
    //   pagination: 15, // 每页显示文章数量
    // },

    /* 博客文章页面链接前缀 */
    // article: '/article/',

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
    autoFrontmatter: {
      permalink: true,  // 是否生成永久链接
      createTime: true, // 是否生成创建时间
      title: true,      // 是否生成标题
    },
    // 完全禁用所有自动生成
    // autoFrontmatter: false,

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    /**
     * Algolia DocSearch
     * 启用此搜索需要将 本地搜索 search 设置为 false
     * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
     */
    // search: {
    //   provider: 'algolia',
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    // },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    codeHighlighter: {
      twoslash: {
        twoslashOptions: {
          compilerOptions: {
            paths: {
              'node-karin/root': [path.resolve(process.cwd(), './node_modules/node-karin/dist/root')],
            }
          }
        }
      },
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      },
      notationDiff: true, // 启用 diff 标记语法支持
      notationErrorLevel: true, // 启用错误级别标记语法支持
      notationFocus: true, // 启用焦点标记语法支持
      notationHighlight: true, // 启用高亮标记语法支持
      notationWordHighlight: true, // 启用单词高亮标记语法支持
      highlightLines: true, // 启用行高亮功能
      collapsedLines: false, // 禁用默认折叠代码块功能
      lineNumbers: true, // 启用行号显示
    },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    readingTime: {
      wordPerMinute: 300, // 每分钟阅读字数
    },

    /**
      * markdown
      * @see https://theme-plume.vuejs.press/config/markdown/
      */
    markdown: {
      //   abbr: true,         // 启用 abbr 语法  *[label]: content
      //   annotation: true,   // 启用 annotation 语法  [+label]: content
      //   pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      //   plot: true,         // 启用隐秘文本语法 !!xxxx!!
      //   bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      //   youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      //   icons: true,        // 启用内置图标语法  ::icon-name::
      //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      npmTo: {
        tabs: ['pnpm', 'npm', 'yarn'], // 代码块组默认显示顺序
      },
      // 启用 npm-to 容器  ::: npm-to
      //   demo: true,         // 启用 demo 容器  ::: demo
      //   repl: {             // 启用 代码演示容器
      //     go: true,         // ::: go-repl
      //     rust: true,       // ::: rust-repl
      //     kotlin: true,     // ::: kotlin-repl
      //   },
      //   math: {             // 启用数学公式
      //     type: 'katex',
      //   },
      //   chartjs: true,      // 启用 chart.js
      //   echarts: true,      // 启用 ECharts
      //   mermaid: true,      // 启用 mermaid
      //   flowchart: true,    // 启用 flowchart
      image: {
        figure: true,     // 启用 figure
        lazyload: true,   // 启用图片懒加载
        mark: true,       // 启用图片标记
        size: true,       // 启用图片大小
      },
      //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
      codeTree: true,      // 启用 代码树
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
      provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      comment: true,
      repo: 'KarinJS/Karin',
      repoId: 'R_kgDOLcebnw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOLcebn84CeJZH',
      mapping: 'pathname',
      reactionsEnabled: true,
      inputPosition: 'bottom',
    },

    /**
     * 资源链接替换
     * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
     */
    // replaceAssets: 'https://cdn.example.com',

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),
})
