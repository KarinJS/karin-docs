<template>
  <el-card style="border-radius: 12px">
    <el-form label-position="top">
      <el-row :gutter="12">
        <el-col :span="6" :xs="24">
          <el-form-item label="关键词搜索">
            <el-input
              v-model="searchForm.searchKeyword"
              placeholder="名称/描述/作者"
              clearable
              @keyup.enter="handleSearch"
              @blur="handleSearch"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label="筛选作者">
            <el-select
              v-model="searchForm.selectedAuthor"
              placeholder="全部"
              filterable
              clearable
              no-data-text="暂无数据"
              @change="handleSearch"
            >
              <el-option v-for="item in authorOptions" :key="item" :value="item" :label="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label="插件类型">
            <el-select
              v-model="searchForm.selectedPluginType"
              placeholder="全部"
              clearable
              no-data-text="暂无数据"
              :options="pluginTypeOptions"
              @change="handleSearch"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-form-item label="仓库类型">
            <el-select
              v-model="searchForm.selectedRepoType"
              placeholder="全部"
              clearable
              no-data-text="暂无数据"
              :options="repoTypeOptions"
              @change="handleSearch"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Props {
  authorOptions: string[]
}
const props = withDefaults(defineProps<Props>(), {
  authorOptions: () => []
})
const emits = defineEmits(['search'])

/** 本地响应式引用，确保模板中正确追踪变化 */
const authorOptions = computed(() => props.authorOptions)
//搜索条件
const searchForm = ref({
  searchKeyword: '',
  selectedAuthor: '',
  selectedPluginType: '',
  selectedRepoType: ''
})
//插件类型
const pluginTypeOptions = [
  { value: '', label: '全部' },
  { value: 'npm', label: 'NPM 插件' },
  { value: 'git', label: 'Git 插件' },
  { value: 'app', label: 'App 插件' }
]
//插件来源
const repoTypeOptions = [
  { value: '', label: '全部' },
  { value: 'npm', label: 'NPM' },
  { value: 'github', label: 'GitHub' }
]
const handleSearch = () => {
  emits('search', {
    keyword: searchForm.value.searchKeyword.toLowerCase(),
    author: searchForm.value.selectedAuthor === '全部' ? '' : searchForm.value.selectedAuthor,
    pluginType: searchForm.value.selectedPluginType,
    repoType: searchForm.value.selectedRepoType
  })
}
</script>

<style lang="scss" scoped></style>
