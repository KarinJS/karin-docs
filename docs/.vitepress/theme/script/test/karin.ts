import karin from 'node-karin'

karin.accept('notice.group_member_increase', async (e) => {
  await e.reply('\n欢迎━(*｀∀´*)ノ亻!', { at: true })
  return true
})

karin.use('forwardMsg', async (bot, contact, element, next, exit) => {
  /** 方法实现 */
  console.log(contact.scene)
  console.log(element)

  return exit()
}, { adapter: ['ICQQ'] })

karin.command(/^#上下文$/, async (e) => {
  /** 方法实现 */
  e.reply('请回复一条消息')
  const context = await karin.ctx(e, { userId: '123456789', reply: true, time: 180, replyMsg: '超时了。。。' })
  e.reply('你的回复内容是：' + context.msg)
  return true
})

karin.handler('handler', async (e) => {
  /** 方法实现 */
}, { adapter: ['ICQQ', 'OneBot11'], priority: 500 })

karin.getBot('123456789')

export const hello = karin.command(/^#你好$/, async (e) => {
  await e.reply('hello')
  return true
})