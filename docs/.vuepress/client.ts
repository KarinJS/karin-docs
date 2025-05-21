import { defineClientConfig } from 'vuepress/client'
/** Npm 徽章 */
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
/** Npm 徽章组 */
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
/** Repo 卡片 */
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance ({ app }) {
    // built-in components
    app.component('RepoCard', NpmBadge)
    app.component('RepoCard', NpmBadgeGroup)
    app.component('RepoCard', RepoCard)
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
})
