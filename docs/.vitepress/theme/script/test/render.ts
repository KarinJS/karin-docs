import { render } from 'node-karin'

render.App('xxx')

const image = await render.render({
  /** 渲染文件路径或HTTP地址 与vue二选一 */
  file: './test.html',
  /** 模板名称 */
  name: 'test',
  /** art-template后的文件名 */
  fileID: 'test',
  /** 传递给模板的数据 template.render(data) */
  data: {},
  /** 截图类型 默认'webp' */
  type: 'jpeg',
  /** 截图质量 默认90 1-100 */
  quality: 100,
  /** 是否隐藏背景 默认false */
  omitBackground: false,
  /** 设置视窗大小和设备像素比 默认1920*1080、1 */
  setViewport: {
    /** 视窗宽度 */
    width: 1920,
    /** 视窗高度 */
    height: 1080,
    /** 设备像素比 */
    deviceScaleFactor: 1,
  },
  /** 分页截图 传递数字则视为视窗高度 返回数组 */
  multiPage: 9000,
  /** 页面goto时的参数 */
  pageGotoParams: {
    /** 页面加载超时时间 */
    timeout: 15000,
    /** 页面加载状态 */
    waitUntil: 'networkidle2',
  },
})

const image1 = await render.renderHtml('./test.html')

const image2 = render.renderMultiHtml('./test.html', true)