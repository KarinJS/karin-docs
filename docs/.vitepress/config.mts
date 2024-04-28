import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  base: '/Karin',
  title: 'Karin',
  description: '基于 Kritor 和 noebots 进行开发的nodejs机器人框架',
  themeConfig: {
    siteTitle: '主页',
    nav: [
      {
        text: '快速开始',
        items: [
          { text: '目录', link: '/start/index' },
          { text: '框架', link: '/start/start' },
          { text: '渲染器', link: '/start/Renderer' },
          { text: '适配器', link: '/start/adapter' }
        ]
      },
      {
        text: '事件',
        items: [
          { text: '目录', link: '/event/index' },
          { text: '消息事件', link: '/event/message' },
          { text: '通知事件', link: '/event/notice' },
          { text: '请求事件', link: '/event/request' }
        ]
      },
      {
        text: '开发指南',
        items: [
          { text: '目录', link: '/develop/index' },
          { text: '插件规范', link: '/develop/standard' },
          { text: '开发插件', link: '/develop/plugin' },
          { text: '开发插件包', link: '/develop/plugins' }
        ]
      },
      {
        text: '开发工具',
        items: [
          { text: '目录', link: '/utils/index' },
          { text: 'karin', link: '/utils/karin' },
          { text: 'segment', link: '/utils/segment' },
          { text: 'redis', link: '/utils/redis' },
          { text: 'update', link: '/utils/update' },
          { text: 'YamlEditor', link: '/utils/YamlEditor' },
          { text: 'Renderer', link: '/utils/Renderer' }
        ]
      },
      {
        text: 'Api',
        items: [
          { text: '目录', link: '/api/index' },
          { text: 'kritor', link: '/api/kritor' },
          { text: 'OneBot11', link: '/api/OneBot11' }
        ]
      },
      { text: '插件索引', link: '/plugins/index' },
    ],
    sidebar: {
      '/start/': [
        {
          text: '快速开始',
          items: [
            { text: '目录', link: '/start/index' },
            { text: '框架', link: '/start/start' },
            { text: '渲染器', link: '/start/Renderer' },
            { text: '适配器', link: '/start/adapter' }
          ],
        }
      ],
      '/event/': [
        {
          text: '事件',
          items: [
            { text: '目录', link: '/event/index' },
            { text: '消息事件', link: '/event/message' }
          ],
        }
      ],
      '/develop/': [
        {
          text: '插件开发',
          items: [
            { text: '目录', link: '/develop/index' },
            { text: '插件规范', link: '/develop/standard' },
            { text: '开发插件', link: '/develop/plugin' },
            { text: '开发插件包', link: '/develop/plugins' }
          ]
        }
      ],
      '/utils/': [
        {
          text: '开发工具',
          items: [
            { text: 'karin', link: '/utils/karin' },
            { text: 'segment', link: '/utils/segment' },
            { text: 'logger', link: '/utils/logger' },
            { text: 'common', link: '/utils/common' },
            { text: 'redis', link: '/utils/redis' },
            { text: 'update', link: '/utils/update' },
            { text: 'YamlEditor', link: '/utils/YamlEditor' },
            { text: 'Renderer', link: '/utils/Renderer' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Api',
          items: [
            { text: '目录', link: '/api/index' },
            { text: 'kritor', link: '/api/kritor' },
            { text: 'OneBot11', link: '/api/OneBot11' }
          ],
        }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KarinJS/Karin' }
    ],
    outline: {
      label: '页面导航'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '...',
        apiKey: '...',
        indexName: '...',
        placeholder: '搜索文档',
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清除查询条件',
              resetButtonAriaLabel: '清除查询条件',
              cancelButtonText: '取消',
              cancelButtonAriaLabel: '取消'
            },
            startScreen: {
              recentSearchesTitle: '搜索历史',
              noRecentSearchesText: '没有搜索历史',
              saveRecentSearchButtonTitle: '保存至搜索历史',
              removeRecentSearchButtonTitle: '从搜索历史中移除',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '从收藏中移除'
            },
            errorScreen: {
              titleText: '无法获取结果',
              helpText: '你可能需要检查你的网络连接'
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索提供者'
            },
            noResultsScreen: {
              noResultsText: '无法找到相关结果',
              suggestedQueryText: '你可以尝试查询',
              reportMissingResultsText: '你认为该查询应该有结果？',
              reportMissingResultsLinkText: '点击反馈'
            }
          }
        }
      }
    }
  }
})
