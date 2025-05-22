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
        { text: '快速介绍', link: 'start', icon: 'carbon:document' },
        { text: '环境安装', link: 'environment', icon: 'mdi:desktop-classic' },
        { text: '框架安装', link: 'framework', icon: 'mdi:package-variant' },
        { text: '接入平台', link: 'platform', icon: 'mdi:connection' },
      ]
    },
    {
      text: '进阶使用',
      collapsed: true,
      icon: 'mdi:rocket-launch',
      prefix: 'advanced',
      items: [
        { text: '渲染器', link: 'render', icon: 'mdi:monitor-eye' },
        { text: '配置文件', link: 'file', icon: 'mdi:file-cog-outline' },
        { text: '网页控制台', link: 'web', icon: 'mdi:web' },
        { text: '疑难杂症', link: 'problems', icon: 'mdi:help-circle', items: [{ text: '常见问题解答', link: 'faq', icon: 'mdi:frequently-asked-questions' }] }
      ]
    },
    {
      text: '插件开发',
      collapsed: true,
      icon: 'mdi:puzzle',
      prefix: 'plugins',
      items: [
        { text: '开发规范', link: 'standard', icon: 'mdi:ruler-square' },
        { text: '插件示例', link: 'demo', icon: 'mdi:code-braces' },
        { text: '网页配置组件', link: 'component', icon: 'mdi:view-dashboard-outline' },
        { text: '插件商店', link: 'list', icon: 'mdi:store' }
      ]
    },
    {
      text: '事件信息',
      collapsed: true,
      icon: 'mdi:webhook',
      prefix: 'event',
      items: [
        { text: '目录', link: 'index', icon: 'mdi:table-of-contents' },
        { text: '消息事件', link: 'message', icon: 'mdi:message-text-outline' },
        { text: '通知事件', link: 'notice', icon: 'mdi:bell-outline' },
        { text: '请求事件', link: 'request', icon: 'mdi:arrow-decision-outline' }
      ]
    },
    {
      text: 'API',
      collapsed: true,
      icon: 'fluent-mdl2:edit-create',
      prefix: 'api',
      items: [
        { text: 'Exports', link: 'exports', icon: 'carbon:export' },
        { text: 'Server', link: 'server', icon: 'mdi:server' },
        { text: 'Handler', link: 'handler', icon: 'material-symbols:router' },
        { text: 'Bot', link: 'bot', icon: 'ri:robot-fill' },
        {
          text: 'Utils', link: 'utils', prefix: 'utils', collapsed: true, icon: 'icon-park-outline:tool', items: [
            { text: 'Button', link: 'button', icon: 'mdi:button-cursor' },
            { text: 'Common', link: 'common', icon: 'mdi:function-variant' },
            { text: 'Config', link: 'config', icon: 'mdi:cog' },
            { text: 'Context', link: 'context', icon: 'mdi:code-brackets' },
            { text: 'Fs', link: 'fs', icon: 'mdi:folder' },
            { text: 'Git', link: 'git', icon: 'mdi:git' },
            { text: 'Ini', link: 'ini', icon: 'mdi:file-document-outline' },
            { text: 'Logger', link: 'logger', icon: 'mdi:console' },
            { text: 'Message', link: 'message', icon: 'mdi:message-text' },
            { text: 'Request', link: 'request', icon: 'mdi:api' },
            { text: 'System', link: 'system', icon: 'mdi:desktop-tower-monitor' },
            { text: 'Yaml', link: 'yaml', icon: 'mdi:file-code-outline' },
            { text: 'Changelog', link: 'changelog', icon: 'mdi:history' }
          ]
        }
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
