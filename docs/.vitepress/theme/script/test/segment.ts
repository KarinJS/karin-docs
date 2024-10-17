import { segment } from 'node-karin'

const markdown = segment.markdown('## 标题\n- 列表1\n- 列表2')

// 模板markdown参数 此为QQBot官方字段，其他平台不可用
const markdown1 = segment.markdown_tpl('模板ID',
  [
    { key: 'title', values: ['标题'] },
    { key: 'list', values: ['列表1'] }
  ])

console.log(markdown)
console.log(markdown1)


// 快速构建
segment.button({ text: '菜单', show: '菜单' })

// 完整构建
segment.button({
  text: '链接跳转', // 按钮默认显示的文本
  show: '链接跳转', // 按钮点击后显示的文本
  link: 'https://example.com',
  style: 0, // 按钮样式 0 灰色线框，1 蓝色线框 默认 0
  admin: false, // 设置为true时，只有群管理员可以点击
  list: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥
  role: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥 （仅频道可用）
  tips: '指令提示' // 客户端不支持本 action 的时候，弹出的 toast 文案
})

segment.button({ type: 1, text: '回调按钮' })

// 完整构建
segment.button({
  type: 1, // 按钮类型 1 回调按钮
  text: '回调按钮', // 按钮默认显示的文本
  show: '回调按钮', // 按钮点击后显示的文本
  data: '操作相关数据', // 回调数据
  style: 0, // 按钮样式 0 灰色线框，1 蓝色线框 默认 0
  admin: false, // 设置为true时，只有群管理员可以点击
  list: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥
  role: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥 （仅频道可用）
  tips: '指令提示' // 客户端不支持本 action 的时候，弹出的 toast 文案
})

segment.button({ text: '指令按钮' })

// 完整构建
segment.button({
  type: 2, // 按钮类型 2 指令按钮
  text: '指令按钮', // 按钮默认显示的文本
  show: '指令按钮', // 按钮点击后显示的文本
  data: '操作相关数据', // 指令数据
  style: 0, // 按钮样式 0 灰色线框，1 蓝色线框 默认 0
  enter: true, // 设置为true时，点击按钮后直接自动发送 data，默认 false
  reply: true, // 设置为true时，点击按钮后回复当前消息，默认 false
  admin: false, // 设置为true时，只有群管理员可以点击
  list: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥
  role: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥 （仅频道可用）
  tips: '指令提示' // 客户端不支持本 action 的时候，弹出的 toast 文案
})

// 快速构建
segment.keyboard(
  [
    [
      { text: '状态', show: '运行状态' },
      { text: '菜单', show: '菜单' }
    ],
    [
      { text: '状态', show: '运行状态' },
      { text: '扫雷', show: '扫雷' },
      { text: '小游戏帮助', show: '小游戏帮助', reply: true }
    ],
    [
      { text: '签到', show: '签到' },
      { text: '角色', show: '角色' }
    ]
  ]
)

// 完整构建
segment.keyboard([{
  type: 2, // 按钮类型 2 指令按钮
  text: '指令按钮', // 按钮默认显示的文本
  show: '指令按钮', // 按钮点击后显示的文本
  data: '操作相关数据', // 指令数据
  style: 0, // 按钮样式 0 灰色线框，1 蓝色线框 默认 0
  enter: true, // 设置为true时，点击按钮后直接自动发送 data，默认 false
  reply: true, // 设置为true时，点击按钮后回复当前消息，默认 false
  admin: false, // 设置为true时，只有群管理员可以点击
  list: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥
  role: ['用户ID1', '用户ID2'], // 设置后，只有这些用户可以点击，与admin互斥 （仅频道可用）
  tips: '指令提示' // 客户端不支持本 action 的时候，弹出的 toast 文案
}])