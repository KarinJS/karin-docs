<template>
  <div class="my-5">
    <div v-if="loading" class="flex items-center justify-center p-5 text-[var(--vp-c-text-2)]">
      <div
        class="w-5 h-5 mr-2.5 rounded-full border-2 border-[var(--vp-c-divider)] border-t-[var(--vp-c-brand)] animate-spin">
      </div>
      正在获取最新版本信息...
    </div>

    <div v-else>
      <!-- Windows 下载 -->
      <div class="mb-4 border border-[var(--vp-c-divider)] rounded-lg overflow-hidden bg-[var(--vp-c-bg-alt)]">
        <div @click="toggleSection('windows')"
          class="m-0 p-3 bg-[var(--vp-c-bg-soft)] cursor-pointer flex items-center select-none">
          <span class="mr-2 flex items-center">
            <iconify-icon icon="logos:microsoft-windows" width="20" />
          </span>
          <span class="font-bold">Windows</span>
          <span class="ml-auto text-xs">{{ sections.windows ? '▼' : '▶' }}</span>
        </div>
        <div v-show="sections.windows" class="p-4 bg-white dark:bg-[var(--vp-c-bg)]">
          <div v-for="file in windowsFiles" :key="file.name"
            class="py-2 border-b border-[var(--vp-c-divider)] last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <span class="font-mono text-[0.9em] mb-2 md:mb-0">{{ file.name }}</span>
              <div class="flex gap-4 items-center">
                <a :href="getDownloadUrl(file.filename)" target="_blank"
                  class="flex items-center gap-1 text-[var(--vp-c-brand)] no-underline">
                  下载
                  <iconify-icon icon="material-symbols:download" />
                </a>
                <span
                  class="flex items-center gap-1 font-mono text-[0.8em] text-[var(--vp-c-text-2)] cursor-pointer hover:text-[var(--vp-c-brand)]"
                  @click="copyHash(file.hash)">
                  SHA256: {{ file.hash.slice(0, 8) }}...
                  <iconify-icon icon="material-symbols:content-copy-outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Linux 下载 -->
      <div class="mb-4 border border-[var(--vp-c-divider)] rounded-lg overflow-hidden bg-[var(--vp-c-bg-alt)]">
        <div @click="toggleSection('linux')"
          class="m-0 p-3 bg-[var(--vp-c-bg-soft)] cursor-pointer flex items-center select-none">
          <span class="mr-2 flex items-center">
            <iconify-icon icon="logos:linux-tux" width="20" />
          </span>
          <span class="font-bold">Linux</span>
          <span class="ml-auto text-xs">{{ sections.linux ? '▼' : '▶' }}</span>
        </div>
        <div v-show="sections.linux" class="p-4 bg-white dark:bg-[var(--vp-c-bg)]">
          <div v-for="file in linuxFiles" :key="file.name"
            class="py-2 border-b border-[var(--vp-c-divider)] last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <span class="font-mono text-[0.9em] mb-2 md:mb-0">{{ file.name }}</span>
              <div class="flex gap-4 items-center">
                <a :href="getDownloadUrl(file.filename)" target="_blank"
                  class="flex items-center gap-1 text-[var(--vp-c-brand)] no-underline">
                  下载
                  <iconify-icon icon="material-symbols:download" />
                </a>
                <span
                  class="flex items-center gap-1 font-mono text-[0.8em] text-[var(--vp-c-text-2)] cursor-pointer hover:text-[var(--vp-c-brand)]"
                  @click="copyHash(file.hash)">
                  SHA256: {{ file.hash.slice(0, 8) }}...
                  <iconify-icon icon="material-symbols:content-copy-outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 源码下载 -->
      <div class="mb-4 border border-[var(--vp-c-divider)] rounded-lg overflow-hidden bg-[var(--vp-c-bg-alt)]">
        <div @click="toggleSection('source')"
          class="m-0 p-3 bg-[var(--vp-c-bg-soft)] cursor-pointer flex items-center select-none">
          <span class="mr-2 flex items-center">
            <iconify-icon icon="material-symbols:code" width="20" />
          </span>
          <span class="font-bold">Source Code</span>
          <span class="ml-auto text-xs">{{ sections.source ? '▼' : '▶' }}</span>
        </div>
        <div v-show="sections.source" class="p-4 bg-white dark:bg-[var(--vp-c-bg)]">
          <div v-for="file in sourceFiles" :key="file.name"
            class="py-2 border-b border-[var(--vp-c-divider)] last:border-b-0">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <span class="font-mono text-[0.9em] mb-2 md:mb-0">{{ file.name }}</span>
              <div class="flex gap-4 items-center">
                <a :href="getDownloadUrl(file.filename)" target="_blank"
                  class="flex items-center gap-1 text-[var(--vp-c-brand)] no-underline">
                  下载
                  <iconify-icon icon="material-symbols:download" />
                </a>
                <span
                  class="flex items-center gap-1 font-mono text-[0.8em] text-[var(--vp-c-text-2)] cursor-pointer hover:text-[var(--vp-c-brand)]"
                  @click="copyHash(file.hash)">
                  SHA256: {{ file.hash.slice(0, 8) }}...
                  <iconify-icon icon="material-symbols:content-copy-outline" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(true)
const sections = ref({
  windows: false,
  linux: false,
  source: false
})

const windowsFiles = ref([])
const linuxFiles = ref([])
const sourceFiles = ref([])

const toggleSection = (section) => {
  sections.value[section] = !sections.value[section]
}

const getDownloadUrl = (filename) => {
  return `https://cdn.npmmirror.com/binaries/node/latest-v22.x/${filename}`
}

const copyHash = async (hash) => {
  try {
    await navigator.clipboard.writeText(hash)
    // 可以添加一个复制成功的提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const parseFileInfo = (line) => {
  const [hash, filename] = line.split('  ')
  let name = filename.replace('node-v', '')

  return {
    hash,
    filename,
    name
  }
}

const categorizeFiles = (files) => {
  files.forEach(file => {
    if (file.filename.includes('win')) {
      windowsFiles.value.push(file)
    } else if (file.filename.includes('linux')) {
      linuxFiles.value.push(file)
    } else if (file.filename.includes('.tar')) {
      sourceFiles.value.push(file)
    }
  })
}

onMounted(async () => {
  try {
    const url = getDownloadUrl('SHASUMS256.txt')
    const response = await axios.get(url)
    const files = response.data
      .split('\n')
      .filter(line => line.trim())
      .map(parseFileInfo)

    categorizeFiles(files)
    loading.value = false
  } catch (error) {
    console.error('获取文件列表失败:', error)
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>