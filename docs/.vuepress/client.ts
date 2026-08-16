import { h } from 'vue'
import { defineClientConfig } from 'vuepress/client'
import { Layout } from 'vuepress-theme-plume/client'
import { useRoute } from 'vue-router'
import './theme/styles/index.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
/** 平滑滚动 */
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/** Repo 卡片 */
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
/** node下载地址 */
import NodeDownloads from './theme/components/NodeDownloads.vue'
/** 插件列表 */
import PluginList from './theme/components/PluginList.vue'
/** 侧边栏引导 */
import AsideNav from './theme/components/AsideNav.vue'
/** 检测web服务商 */
import SmartDeployBadge from './components/SmartDeployBadge.vue'
/** 页脚和徽章组合组件 */
import FooterWithBadge from './components/FooterWithBadge.vue'
/** 纸屑 */
import Confetti from './theme/components/Confetti.vue'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    app.component('NodeDownloads', NodeDownloads)
    app.component('PluginList', PluginList)
    app.component('SmartDeployBadge', SmartDeployBadge)
    app.component('FooterWithBadge', FooterWithBadge)
    app.component('Confetti', Confetti)
  },
  layouts: {
    Layout: h(Layout, null, {
      'aside-outline-after': () => h(AsideNav),
      'footer-content': () => {
        const route = useRoute()
        const isHomePage = route.path === '/' || route.path === '/index.html'
        return isHomePage ? h(FooterWithBadge) : null
      }
    }),
  },
  setup() {
    if (typeof window !== 'undefined') {
      // 有BUG，暂时注释掉
      // 平滑滚动
      // const lenis = new Lenis({
      //   autoRaf: true,
      //   smoothWheel: true,
      //   lerp: 0.1,
      //   duration: 1.2,
      //   easing: (x) => {
      //     return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
      //   },
      //   orientation: 'vertical',
      //   gestureOrientation: 'vertical',
      //   wheelMultiplier: 1,
      //   touchMultiplier: 1,
      //   infinite: false,
      //   autoResize: true,
      // })
    }
  },
})
