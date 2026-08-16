<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="card-header-name" style="cursor: pointer" @click.stop="jumpTo(plugin.home)">
          <el-tooltip effect="dark" :content="replaceName(plugin.name)">
            {{ replaceName(plugin.name) }}
          </el-tooltip>
        </div>
        <div class="card-header-type">
          <el-tag v-if="plugin.official" type="success">官方</el-tag>
          <el-tag v-else-if="plugin.type == 'npm'" type="danger">NPM</el-tag>
          <el-tag v-else-if="plugin.type == 'git'" type="primary">Git</el-tag>
          <el-tag v-else-if="plugin.type == 'app'" type="warning">App</el-tag>
        </div>
      </div>
    </template>
    <div class="card-body" @click="emits('openDetail', plugin)">
      <div class="card-body-author" v-if="plugin.author?.length && plugin.author?.length > 0">
        <el-text tag="mark" style="cursor: pointer" @click="jumpTo(plugin.author[0].home)">
          {{ plugin.author[0].name }}
        </el-text>
      </div>
      <div class="card-body-desc">
        <el-scrollbar>
          {{ plugin.description }}
        </el-scrollbar>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Plugin } from '../utils/test-url'
interface Props {
  plugin: Plugin
}
const { plugin } = defineProps<Props>()
const emits = defineEmits(['openDetail'])

//插件卡片
const replaceName = (pluginName: string) => {
  if (pluginName.includes('karin-plugin-')) {
    return pluginName.replace('karin-plugin-', '')
  } else if (pluginName.includes('@karinjs/')) {
    return pluginName.replace('@karinjs/plugin-', '')
  } else return pluginName
}
const jumpTo = (url: string) => {
  window.open(url, '_blank')
}
</script>
<style lang="scss" scoped>
:deep(.el-card__footer) {
  padding: 6px;
}
.card {
  &-header {
    display: flex;
    &-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      font-size: 24px;
      width: 70%;
    }
  }
  &-body {
    height: 120px;
    cursor: pointer;
    &-author {
      text-align: right;
    }
    &-desc {
      height: calc(100% - 30px);
    }
  }
}
</style>
