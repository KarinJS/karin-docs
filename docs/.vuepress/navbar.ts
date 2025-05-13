import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '快速开始', link: '/notes/install/' },
  {
    text: '快速开始111',
    icon: 'icon-park-outline:guide-board',
    link: '/notes/guide/install/start',
  },

])
