<template>
  <div class="pluginList">
    <SearchBar style="margin-bottom: 12px" :author-options="authorOptions" @search="handleSearch" />
    <el-alert
      v-if="errorMsg"
      type="error"
      :title="errorMsg"
      show-icon
      closable
      @close="closeErrMsg()"
      style="margin-bottom: 12px"
    />
    <el-skeleton v-else style="display: flex; gap: 8px" :loading="loading" animated :count="3">
      <template #template>
        <div style="flex: 1">
          <el-skeleton-item variant="text" style="margin-bottom: 6px" />
          <el-skeleton-item variant="text" style="margin-bottom: 6px" />
          <el-skeleton-item variant="text" style="margin-bottom: 6px" />
          <el-skeleton-item variant="text" style="margin-bottom: 6px" />
        </div>
      </template>
      <el-row :gutter="24">
        <el-col :span="8" :xs="24" v-for="plugin in paginatedPlugins" :key="plugin.name" style="margin-bottom: 12px">
          <PluginCard :plugin="plugin" @open-detail="openDetail" />
        </el-col>
        <el-col :span="24">
          <el-empty v-if="paginatedPlugins.length === 0" description="暂无数据" />
        </el-col>
      </el-row>
      <el-pagination
        style="width: 100%"
        layout="prev, pager, next"
        :total="filteredPlugins.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </el-skeleton>
    <PluginDetailDrawer v-if="drawerVisible" v-model:drawer-visible="drawerVisible" :plugin="showPlugin!" />
  </div>
</template>

<script lang="ts" setup>
import SearchBar from './SearchBar.vue'
import PluginCard from './PluginCard.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { testGithub, Plugin } from '../utils/test-url'
import axios from 'axios'
import { useDark, useToggle } from '@vueuse/core'
import PluginDetailDrawer from './PluginDetailDrawer.vue'
//暗色模式相关
const isDark = useDark()
let observer: MutationObserver | null = null
const checkDark = () => {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
  if (isDark.value) {
    useToggle(isDark)
  }
}

//获取github代理
let githubProxy = null
//所有插件
const allPlugins = ref<Plugin[]>([])
/** 从 allPlugins 中提取作者列表 */
const authorOptions = computed<string[]>(() => {
  const authors = new Set<string>()
  for (const plugin of allPlugins.value) {
    if (plugin?.author && Array.isArray(plugin.author)) {
      for (const author of plugin.author) {
        if (author?.name) authors.add(author.name.trim())
      }
    }
  }
  return ['全部', ...authors].filter(Boolean)
})

//加载状态
const loading = ref(true)
//错误信息
const errorMsg = ref('')
const loadPlugins = async () => {
  try {
    githubProxy = await testGithub()
    const afterUrl = githubProxy(`https://raw.githubusercontent.com/KarinJS/plugins-list/main/plugins.json`)
    const { data } = await axios.get(afterUrl)
    allPlugins.value = data.plugins.map((plugin: Plugin) => {
      return {
        ...plugin,
        author: Array.isArray(plugin.author) ? plugin.author : [],
        // version: '加载中...',
        official: plugin.name.includes('@karinjs/')
      }
    })
  } catch (err: any) {
    errorMsg.value = err.message || '加载失败'
  } finally {
    loading.value = false
  }
}
const closeErrMsg = () => {
  errorMsg.value = ''
  loading.value = true
  setTimeout(() => {
    loadPlugins()
  }, 200)
}
type SearchParams = {
  author: string
  keyword: string
  pluginType: string
  repoType: string
}

/** 当前搜索条件 */
const searchParams = ref<SearchParams>({
  author: '全部',
  keyword: '',
  pluginType: '',
  repoType: ''
})

const handleSearch = (params: SearchParams) => {
  searchParams.value = { ...params }
  currentPage.value = 1
}
const currentPage = ref(1)
const pageSize = 9

/** 根据搜索条件过滤后的插件列表 */
const filteredPlugins = computed<Plugin[]>(() => {
  const { keyword, author, pluginType, repoType } = searchParams.value
  return allPlugins.value.filter((plugin) => {
    // 关键词：匹配名称或描述或作者
    if (keyword) {
      const kw = keyword.toLowerCase()
      const nameMatch = plugin.name.toLowerCase().includes(kw)
      const descMatch = plugin.description?.toLowerCase().includes(kw)
      const authorMatch = plugin.author?.some((a) => a.name?.toLowerCase().includes(kw))
      if (!nameMatch && !descMatch && !!authorMatch) return false
    }
    // 作者筛选
    if (author && author !== '全部') {
      const hasAuthor = plugin.author?.some((a) => a.name === author)
      if (!hasAuthor) return false
    }
    // 插件类型筛选
    if (pluginType) {
      if (plugin.type !== pluginType) return false
    }
    if (repoType) {
      const hasRepoType = plugin.repo?.some((r) => r.type === repoType)
      if (!hasRepoType) return false
    }
    return true
  })
})

/** 分页后的插件列表 */
const paginatedPlugins = computed<Plugin[]>(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPlugins.value.slice(start, start + pageSize)
})

/** 分页切换 */
const handlePageChange = (page: number) => {
  currentPage.value = page
}

//抽屉弹窗
const drawerVisible = ref(false)
const showPlugin = ref<Plugin>()
const openDetail = (plugin: Plugin) => {
  showPlugin.value = plugin
  drawerVisible.value = true
}
onMounted(() => {
  checkDark()
  loadPlugins()

  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'data-theme') {
        checkDark()
      }
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style lang="scss" scoped>
.el-pagination {
  :deep(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      margin: 0;
    }
  }
}
</style>
