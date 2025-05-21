<template>
  <div
    class="relative flex flex-col justify-between h-full bg-white dark:bg-opacity-5 rounded-lg shadow-xl transition-shadow duration-300 px-6 sm:px-4 pt-6 sm:pt4 pb-4 overflow-hidden select-none"
    @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mousedown="handleClick" @mouseup="handleMouseUp"
    :style="cardStyle">
    <!-- 遮罩层 -->
    <transition name="mask">
      <div v-if="showMask" class="absolute z-10 transition-opacity duration-100 opacity-0 overflow-hidden"
        :style="maskStyle"></div>
    </transition>

    <div class="flex flex-col h-full">
      <div class="flex justify-between items-center">
        <div class="lg:text-2xl text-xl font-bold text-gray-900 dark:text-white">
          {{ replaceName(plugin.name) }}
          <el-tooltip content="官方插件" placement="top" :effect="plugin.isDark ? 'dark' : 'light'">
            <span v-if="plugin.official"
              class="icon-[iconamoon--shield-yes-duotone] h-7 w-7 bg-[#9bd298] mb-[-7.5px]"></span>
          </el-tooltip>
          <el-tooltip content="NPM 插件" placement="top" :effect="plugin.isDark ? 'dark' : 'light'">
            <span v-if="plugin.type === 'npm'" class="icon-[devicon--npm] ml-[4px] mb-[-4px]"></span>
          </el-tooltip>
          <el-tooltip content="Git 插件" placement="top" :effect="plugin.isDark ? 'dark' : 'light'">
            <span v-if="plugin.type === 'git'" class="icon-[octicon--mark-github-16] mb-[-4px]"></span>
          </el-tooltip>
          <el-tooltip content="应用插件" placement="top" :effect="plugin.isDark ? 'dark' : 'light'">
            <span v-if="plugin.type === 'app'" class="icon-[icon-park-twotone--more-app] mb-[-4px] bg-[#7fe1fa]"></span>
          </el-tooltip>
        </div>
        <div v-if="plugin.type === 'npm'">
          <el-popover placement="top-start" title="点我复制安装命令" :width="200" trigger="hover" :content=installCommand>
            <template #reference>
              <button @click="copyInstallCommand"
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                <div class="relative overflow-visible ">
                  <span
                    class="mb-[-8px] relative icon-[iconamoon--copy-duotone] w-6 h-6 bg-[#9bd298] hover:bg-yellow-200 hover:scale-150 transform duration-500 custom-bezier"></span>
                </div>
              </button>
            </template>
          </el-popover>
        </div>
      </div>

      <!-- 修改插件介绍区域，设置固定高度并添加溢出处理 -->
      <div class="flex-grow mt-2 md:mt-3 lg:mt-4 flex flex-col">
        <div class="text-gray-600 dark:text-gray-300 select-none pr-8 relative h-[80px] overflow-y-auto">
          {{ plugin.description }}
        </div>
      </div>

      <!-- 将详情按钮放在底部固定位置 -->
      <div class="mt-auto flex justify-end">
        <button @click="$emit('show-details', plugin)"
          class="icon-[material-symbols--arrows-output-rounded] w-6 h-6 bg-[#9bd298] hover:bg-yellow-200 hover:scale-150 transform duration-500 custom-bezier focus:outline-none">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  props: {
    plugin: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tiltX: 0,
      tiltY: 0,
      showMask: false,
      maskStyle: {
        top: '0',
        left: '0',
        width: '0',
        height: '0',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        transition: 'all 1s ease',
        pointerEvents: 'none' // 防止遮罩层干扰点击事件
      },
      intervalId: null, // 用于存储定时器的 ID
      isAnimating: false // 用于标记是否正在动画
    }
  },
  computed: {
    installCommand () {
      return `pnpm add ${this.plugin.name} -w`
    },
    cardStyle () {
      return {
        transform: `perspective(1000px) rotateX(${this.tiltY}deg) rotateY(${this.tiltX}deg)`,
        transition: 'transform 0.05s ease'
      }
    },
    getIconClass () {
      return (type) => {
        switch (type) {
          case 'github':
            return 'icon-[octicon--mark-github-16] bg-black dark:bg-white'
          case 'gitee':
            return 'icon-[simple-icons--gitee] bg-red-500'
          case 'gitcode':
            return 'bg-custom w-full h-64 bg-center bg-no-repeat bg-contain'
          case 'gitlab':
            return 'icon-[devicon--gitlab]'
          case 'npm':
            return 'icon-[devicon--npm] bg-[#cb3837]'
        }
      }
    },
    transName () {
      return this.replaceName(this.plugin.name)
    }
  },
  methods: {
    replaceName (pluginName) {
      if (pluginName.includes('karin-plugin-')) {
        return pluginName.replace('karin-plugin-', '')
      } else if (pluginName.includes('@karinjs/')) {
        return pluginName.replace('@karinjs/plugin-', '')
      } else return pluginName
    },
    async copyInstallCommand () {
      try {
        await navigator.clipboard.writeText(`pnpm add ${this.plugin.name} -w`)
        ElMessage({ message: '安装命令已复制到剪贴板！', type: 'success', showClose: true, duration: 4000 })

        console.log('安装命令已复制到剪贴板！')
      } catch (err) {
        console.error('无法复制安装命令: ', err)
        ElMessage({ message: '安装命令已复制到剪贴板！', type: 'error', showClose: true, duration: 4000 })
      }
    },
    handleMouseMove (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 4
      const centerY = rect.height / 4
      const tiltX = (centerX - x) / 20
      const tiltY = (centerY - y) / 20
      this.tiltX = tiltX
      this.tiltY = tiltY
    },
    handleMouseLeave () {
      this.tiltX = 0
      this.tiltY = 0
    },
    handleClick (event) {
      if (this.isAnimating) return // 如果动画正在进行，直接返回，不处理点击事件
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // 设置遮罩的初始位置为鼠标点击位置
      this.maskStyle.top = `${y}px`
      this.maskStyle.left = `${x}px`
      this.showMask = true
      this.isAnimating = true // 标记动画开始

      // 延迟设置遮罩的扩散效果
      setTimeout(() => {
        const maxSize = Math.max(rect.width, rect.height) * 2 // 取宽高最大值的两倍
        this.maskStyle.width = `${maxSize}px`
        this.maskStyle.height = `${maxSize}px`
        // 保持圆形
        this.maskStyle.borderRadius = '50%'
      }, 10)
    },
    handleMouseUp () {
      // 鼠标松开时，慢慢淡出遮罩
      setTimeout(() => {
        this.maskStyle.opacity = '0'
        // 动画结束后重置遮罩
        setTimeout(() => {
          this.showMask = false
          this.maskStyle.width = '0'
          this.maskStyle.height = '0'
          this.maskStyle.borderRadius = '50%'
          this.maskStyle.opacity = '1'
          this.isAnimating = false // 标记动画结束
        }, 1)
      }, 1)
    },
  },
  mounted () {
    // 由于不再需要检查文本溢出，可以移除此定时器
    // this.intervalId = setInterval(this.checkTextOverflow, 10)
  },
  beforeDestroy () {
    // 在组件销毁前清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
}
</script>