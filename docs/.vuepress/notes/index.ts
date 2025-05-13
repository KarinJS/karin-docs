import type { ThemeNoteListOptions } from 'vuepress-theme-plume'
import { defineNotesConfig } from 'vuepress-theme-plume'

import type { ThemeNote } from 'vuepress-theme-plume'
import { defineNoteConfig } from 'vuepress-theme-plume'

/**
 * 快速开始
 */
export const guide: ThemeNote = defineNoteConfig({
  dir: 'guide',
  link: '/guide',
  sidebar: [
    {
      text: '从这里开始',
      collapsed: false,
      icon: 'carbon:idea',
      prefix: 'install',
      items: [
        { text: '快速介绍', link: 'start', },
        { text: '环境安装', link: 'environment', },
        { text: '框架安装', link: 'framework', },
        { text: '接入平台', link: 'platform', },
      ]
    },
    {
      text: '进阶使用',
      collapsed: false,
      icon: 'fluent-mdl2:edit-create',
      prefix: 'advanced',
      items: [
        { text: '渲染器', link: 'render', },
        { text: '配置文件', link: 'file' },
        { text: '网页控制台', link: 'web' },
        { text: '疑难杂症', link: 'problems', items: [{ text: '常见问题解答', link: 'faq' }] }
      ]
    },
    {
      text: '插件开发',
      collapsed: false,
      icon: 'fluent-mdl2:edit-create',
      prefix: 'plugins',
      items: [
        { text: '开发规范', link: 'standard', },
        { text: '插件示例', link: 'demo' },
        { text: '网页配置组件', link: 'component' },
        { text: '插件商店', link: 'list', }
      ]
    },
  ],
})


export const notes: ThemeNoteListOptions = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    guide,
  ],
})
