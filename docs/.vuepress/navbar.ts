import { defineNavbarConfig } from 'vuepress-theme-plume'
import { version } from '../../node_modules/node-karin/package.json'

export const navbar = defineNavbarConfig([
  { text: '首页', icon: 'mdi:home', link: '/' },
  {
    text: '快速开始',
    icon: 'icon-park-outline:guide-board',
    link: '/guide/install/start',
  },
  {
    text: '开发指南',
    icon: 'mdi:rocket-launch',
    items: [
      { text: '进阶使用', icon: 'mdi:speedometer', link: '/guide/advanced/render' },
      { text: '插件开发', icon: 'mdi:puzzle', link: '/guide/plugins/index' },
      { text: '事件信息', icon: 'mdi:webhook', link: '/guide/event/index' },
      { text: 'API 文档', icon: 'fluent-mdl2:edit-create', link: '/guide/api/types/globals' },
    ],
  },
  {
    text: '资源中心',
    icon: 'mdi:toolbox',
    items: [
      { text: '插件商店', icon: 'mdi:store', link: '/guide/plugins/list' },
      { text: '渲染器', icon: 'mdi:monitor-eye', link: '/guide/advanced/render' },
      { text: '开发工具', icon: 'mdi:tools', link: '/guide/resources/tools' },
      { text: '常见问题', icon: 'mdi:help-circle', link: '/guide/advanced/problems/faq' },
    ],
  },
  {
    text: `${version}`,
    icon: 'codicon:versions',
    badge: '新',
    items: [
      { text: 'NPM', icon: 'logos:npm-icon', link: 'https://www.npmjs.com/package/node-karin' },
      { text: '最近更新', icon: 'mdi:update', link: '/guide/updates' },
      { text: '更新日志', icon: 'octicon:log-16', link: '/changelog/' },
      { text: '参与贡献', icon: 'octicon:people-16', link: '/contributing/' },
    ],
  },
])