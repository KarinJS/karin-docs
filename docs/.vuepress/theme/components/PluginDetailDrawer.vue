<template>
  <el-drawer
    v-model="visible"
    :direction="isMobile ? 'btt' : 'rtl'"
    resizable
    :title="plugin.name"
    header-class="drawer-header"
    body-class="drawer-body"
    :lock-scroll="false"
  >
    <el-divider style="margin: 12px 0" />
    <el-tooltip effect="dark" :content="`pnpm add ${plugin.name} -w`">
      <el-button v-if="plugin.type == 'npm'" round @click="copyInstallCommand(plugin.name)"> 安装命令 </el-button>
    </el-tooltip>
    <el-button round @click="jumpTo(plugin.home)"> 首页 </el-button>
    <el-divider style="margin: 12px 0" />
    <div v-if="readmeLoading" style="text-align: center; padding: 24px">加载 README 中...</div>
    <div v-else-if="readmeError" style="text-align: center; padding: 24px; color: #999">{{ readmeError }}</div>
    <div v-else class="readme-content" v-html="readmeHtml"></div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import { testGithub } from '../utils/test-url'
import axios from 'axios'
import { marked } from 'marked'
const visible = defineModel('drawerVisible', { required: true, default: false })
type Plugin = {
  author: { home: string; name: string }[]
  description: string
  home: string
  license: { name: string; url: string }[]
  name: string
  repo: { branch: string; type: string; url: string }[]
  time: string
  type: string
  official?: boolean
}
interface Props {
  plugin: Plugin
}
const { plugin } = defineProps<Props>()

//是否是手机端
const isMobile = useMediaQuery('(max-width: 768px)')

const copyInstallCommand = async (pluginName: string) => {
  try {
    await navigator.clipboard.writeText(`pnpm add ${pluginName} -w`)
    ElMessage({ message: '安装命令已复制到剪贴板！', type: 'success', showClose: true, duration: 4000 })
    console.log('安装命令已复制到剪贴板！')
  } catch (err) {
    console.error('无法复制安装命令: ', err)
    ElMessage({ message: '安装命令无法复制到剪贴板', type: 'error', showClose: true, duration: 4000 })
  }
}

/** 将 git 项目首页 URL 转换为 raw README.md 地址 */
const getRawReadmeUrl = (homeUrl: string, branch: string): string => {
  const url = homeUrl.replace(/\/$/, '')
  const defaultBranch = branch || 'main'

  // GitHub: https://github.com/user/repo -> https://raw.githubusercontent.com/user/repo/branch/README.md
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)/)
  if (match) {
    return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${defaultBranch}/README.md`
  }

  return homeUrl
}

/** 缓存的 github 代理函数 */
let githubProxy: ((url: string) => string) | null = null

/** README 渲染 HTML */
const readmeHtml = ref('')
/** 加载状态 */
const readmeLoading = ref(false)
/** 错误信息 */
const readmeError = ref('')

/** 从 repo 数组中获取匹配的分支名 */
const getRepoBranch = (repos: Plugin['repo']): string => {
  if (!repos?.length) return 'main'
  // 优先匹配 type 为 github 的仓库（github 类型）
  const gitRepo = repos.find((r) => r.type === 'github')
  return gitRepo?.branch || repos[0]?.branch || 'main'
}

/** 获取并渲染 README 内容 */
const fetchReadme = async () => {
  if (!githubProxy) {
    githubProxy = await testGithub()
  }
  readmeLoading.value = true
  readmeError.value = ''
  try {
    const branch = getRepoBranch(plugin.repo)
    const rawUrl = getRawReadmeUrl(plugin.home, branch)
    const proxiedUrl = githubProxy(rawUrl)
    const { data } = await axios.get(proxiedUrl)
    readmeHtml.value = marked.parse(data) as string
  } catch {
    readmeError.value = '无法加载 README'
  } finally {
    readmeLoading.value = false
  }
}

const jumpTo = (url: string) => {
  window.open(url, '_blank')
}
onMounted(() => {
  fetchReadme()
})
</script>

<style lang="scss" scoped>
.readme-content {
  :deep(img) {
    max-width: 100%;
  }
  :deep(pre) {
    overflow-x: auto;
  }
}
</style>

<style lang="scss">
/* el-drawer 通过 teleport 渲染到 body，scoped 无法生效，需用全局样式 */
.el-drawer {
  .drawer-header {
    margin-bottom: 0;
  }
  .drawer-body {
    padding-top: 0;
  }
}
</style>
<style lang="scss" scoped></style>
