import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import { Layout } from 'vuepress-theme-plume/client'
import './theme/styles/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
/** Repo 卡片 */
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
/** node下载地址 */
import NodeDownloads from './theme/components/NodeDownloads.vue'
/** 插件列表 */
import PluginList from './theme/components/PluginList.vue'
/** 侧边栏引导 */
import AsideNav from './theme/components/AsideNav.vue'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance ({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    app.component('NodeDownloads', NodeDownloads)
    app.component('PluginList', PluginList)
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
  layouts: {
    Layout: h(Layout, null, {
      'aside-outline-after': () => h(AsideNav),
    }),
  },
})
