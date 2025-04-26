import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  // { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  {
    text: '快速开始',
    items: [
      { text: '介绍', link: '/start/start' },
      { text: '环境安装', link: '/install/environment' },
      { text: '框架安装', link: '/install/framework' },
      { text: '接入平台', link: '/install/platform' },
      { text: '渲染器', link: '/start/render' },
      { text: '配置文件', link: '/start/file' },
      { text: '疑难杂症', link: '/start/problems' },
      { text: '常见问题', link: '/start/faq' }
    ]
  },
  {
    text: '插件',
    items: [
      {
        text: '插件开发', items: [
          { text: '开发简介', link: '/plugins/index' },
          { text: '前端配置', link: '/plugins/component' },
          { text: '开发规范', link: '/plugins/standard' },
          { text: '插件示例', link: '/plugins/demo' },
          { text: '插件包示例', link: '/plugins/package' }
        ]
      },
      { text: '插件商店', link: '/plugins/list' }
    ]
  },
  {
    text: '开发工具',
    items: [
      { text: '目录', link: '/utils' },
      { text: 'Api合集', link: '/utils/api' },
      { text: 'Karin类', link: '/utils/karin' },
      { text: '创建消息元素', link: '/utils/segment' },
      { text: '日志管理', link: '/utils/logger' },
      { text: '常用函数合集', link: '/utils/common' },
      { text: '键值存储', link: '/utils/redis' },
      { text: 'Yaml编辑器', link: '/utils/YamlEditor' },
      { text: '图片渲染', link: '/utils/Renderer' },
      { text: '端口共享', link: '/utils/server' },
      { text: '钩子系统', link: '/utils/hooks' },
      { text: '系统工具', link: '/utils/system' },
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
    text: '更新日志',
    link: '/other/changelog'
  }
])
