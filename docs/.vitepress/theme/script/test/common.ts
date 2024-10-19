import { common, segment } from 'node-karin'
import fs from 'node:fs'

/** 对axios进行简单封装 */
await common.axios('https://www.baidu.com', 'get', { headers: { 'Accept': 'application/json' } })

/** 休眠函数 延迟5秒 */
await common.sleep(5 * 1000)

/** 下载文件 参数1为下载地址，参数2为保存到本地的路径 */
await common.downFile('https://example.com/1.jpg', './temp/test/1.jpg')

/** 递归创建文件夹 */
common.mkdir('./temp/test')

/** 获取绝对路径，支持file://前缀 */
common.absPath('file://./temp/test')
// 输出：/home/karin/temp/test

/** 将文件转换为不带前缀的base64字符串 */
await common.base64('./temp/test/1.jpg')
// 输出：'/9j/4AAQSkZJRgABAQEAYABgAADg...'

/** 将数据流对象转换为Buffer对象 */
const Buffer = await common.stream(fs.createReadStream('./temp/test/1.jpg'))
// 输出：Buffer

/** 将文件转换为Buffer对象 支持file:// base64:// 可读流等... */
const base64 = 'base64://9j/4AAQSkZJRgABAQEAYABgAADg...'
const buffer = await common.buffer(base64)
// 输出 buffer

common.formatTime(1728855116)

common.exists('./temp/test/1.jpg')

common.getGitPlugins()

await common.getNpmPlugins(true)

common.getPlugins()

common.getRelPath('./temp/test/1.jpg')

common.isDir('./temp/test')

common.isPlugin('./plugins/karin-plugin-xxxxxx')

common.makeForward([segment.at('114514')], '1919810', 'hello world')

common.makeMessage('hello world')

common.makeMessageLog([segment.at('1919810'), segment.text('114514')])

common.pkgJson('karin-plugin-xxxxxx')

common.pkgroot('log4js')

common.readDir('./plugins', ['.js', '.ts'])

common.readYaml('./temp/test/1.yaml')

common.splitPath('../test/1.jpg')

common.updateYaml('./temp/test/1.yaml', [{ key: 'service', val: true, comment: '是否开启服务' }])

common.uptime()

// 在 plugins/karin-plugin-example/index.ts 中使用
common.urlToPath(import.meta.url)
// 返回 '../../'

common.writeJson('./temp/test/1.json', { a: 1 })

common.writeYaml('./temp/test/1.yaml', { a: 1 })