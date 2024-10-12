export const Footer_Data: FooterData = {
  // beian: { icp: '备案号', police: '公网安备号' },
  author: { name: 'KarinJS', link: 'https://github.com/KarinJS' },
  group: [
    {
      title: '解决方案',
      icon: 'fa-solid fa-lightbulb',
      links: [
        { name: '外置渲染器', href: 'https://github.com/KarinJS/karin-puppeteer' },
        { name: 'Karin 渲染器核心', href: 'https://github.com/KarinJS/puppeteer-core' },
      ]
    },
    {
      title: '适配器',
      icon: 'fa-solid fa-puzzle-piece',
      links: [
        { name: 'ICQQ 适配器', href: 'https://github.com/KarinJS/karin-plugin-adapter-icqq' },
        { name: 'QQBot 适配器', href: 'https://www.npmjs.com/package/axios' },
      ]
    },
    {
      title: '其他',
      icon: 'fa-solid fa-expand',
      links: [
        { name: 'JavaScript 插件开发模板', href: 'https://github.com/KarinJS/karin-plugin-template' },
        { name: 'TypeScript 插件开发模板', href: 'https://github.com/KarinJS/karin-plugin-template-ts' },
      ]
    }
  ]
}

/**
 * Footer 的数据对象。
 */
interface FooterData {
  /**
     * 分组数据，每个分组包含以下属性。
     */
  group: Array<{
    /**
     * 图标（可选）。
     */
    icon?: string

    /**
     * 图标样式（可选）。
     */
    style?: string

    /**
     * 分组标题。
     */
    title: string

    /**
     * 该组是否为内部链接，默认为 `false`（可选）。
     */
    internal?: boolean

    /**
     * 该分组下的链接列表。
     */
    links: Array<{
      /**
       * 链接图标（可选）。
       */
      icon?: string

      /**
       * 链接样式（可选）。
       */
      style?: string

      /**
       * 链接名称。
       */
      name: string

      /**
       * 链接地址。
       */
      href: string

      /**
       * 是否为内部链接，默认为 `false`（可选）。
       */
      internal?: boolean
    }>
  }>

  /**
   * 备案信息（可选）。
   */
  beian?: {
    /**
     * ICP 备案号（可选）。
     */
    icp?: string

    /**
     * 公安备案号（可选）。
     */
    police?: string
  }

  /**
   * 作者信息（可选）。
   */
  author?: {
    /**
     * 作者姓名（可选）。
     */
    name?: string

    /**
     * 作者链接（可选）。
     */
    link?: string
  }
}