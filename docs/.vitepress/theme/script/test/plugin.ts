import { Plugin, segment } from 'node-karin'

export class hello extends Plugin {
  constructor () {
    super({
      name: '插件名称',
      rule: [
        {
          /** 命令正则匹配 */
          reg: /^#你好$/,
          /** 正则对应的执行方法 */
          fnc: 'hello'
        }
      ]
    })
  }

  async hello () {
    /** 回复纯文本 */
    await this.reply(segment.text('你好'))
    /** 回复图片 */
    await this.reply(segment.image('https://www.example.com/example.png'))
    /** 回复语音 */
    await this.reply(segment.record('https://www.example.com/example.mp3'))
    /** 回复视频 */
    await this.reply(segment.video('https://www.example.com/example.mp4'))
    /** @某人 */
    await this.reply(segment.at('888888'))
    /** ...更多类型请查看segment 这里只展示常用的 */

    /** 这里return若为false karin会继续匹配下一个插件 */
    // return false
    /** 若为true 则此次用户触发的事件到此结束 */
    return true
  }
}