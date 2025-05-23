---
title: ⚙️ 网页配置组件
createTime: 2025/05/14 03:50:59
permalink: /guide/wmhiz1s1/
---

网页配置组件是 Karin 插件系统的核心功能，通过简单的 `web.config` 文件配置，开发者可以：

- **无需前端开发**：快速构建机器人配置界面
- **组件化开发**：提供丰富预设组件（输入框、开关、手风琴等）
- **自动数据处理**：自动完成数据收集、验证和存储

为用户提供统一、直观的配置体验，降低使用门槛，提升开发效率。

破坏性提交记录:

- `1.3.21`: `checkbox-group`组件返回值的格式发生了变化

## 文件

- 文件名称: 必须是`web.config`
- 文件位置: 通过`package.json`定义
- value 编写: 以`package.json`为相对路径进行编写

```json
{
  "karin": {
    "web": "./lib/web.config.js", // 在ts环境下不会读取这个 只有在js环境下才会读取
    "ts-web": "./src/web.config.ts" // 在ts环境下会读取这个
  }
}
```

## 编写示例

- 需要默认导出一个`object`对象
- 对象中需要包含`components`函数 `save`函数
- 后续适配`info`配置

> ⚠️ **重要提示**
> 每个组件的`key`必须全局唯一，包括嵌套组件的 key 也不能重复
> key 重复会导致页面渲染错误，组件状态混乱，请务必确保 key 的唯一性
> 不要使用`.`来连接多个 key，`react-hook-form`会自动将`.`进行转换

## 配置组件

```ts twoslash
// @noErrorValidation
import { defineConfig } from 'node-karin'

export default defineConfig({
  /** 插件信息配置 */
  info: {
    id: 'karin-plugin-123',
    name: 'karin-plugin-123',
    author: {
      name: '开发者名称',
      home: 'https://github.com/开发者名称/karin-plugin-123',
      avatar: 'https://github.com/开发者名称.png'
    },
    icon: {
      /** @see https://fonts.google.com/icons */
      name: 'settings',
      size: 24,
      color: '#B2A8D3'
    },
    version: '1.0.0',
    description: '这是一个示例Karin插件，用于演示配置'
  },
  /** 动态渲染的组件 */
  components: () => [
    // 在这里面 添加各种子组件
  ],

  /** 前端点击保存之后调用的方法 */
  save: (config: any) => {
    console.log('保存的配置:', config)
    // 在这里处理保存逻辑
    return {
      success: true,
      message: '保存成功',
    }
  },
})
```

## 生成组件

- 每个组件都提供了丰富的配置选项
- ~~所有的组件调用方式都是`链式调用`~~
- 现在组件的调用方式是`函数调用`

### 1. 输入框组件 (Input)

**默认封装了以下这些基础类型**

- `string()`: 字符串输入
- `number()`: 数字输入
- `boolean()`: 布尔值输入
- `date()`: 日期输入
- `time()`: 时间输入
- `datetime()`: 日期时间输入
- `email()`: 邮箱输入
- `url()`: URL 输入
- `tel()`: 电话号码输入
- `password()`: 密码输入
- `color()`: 颜色输入
- `json()`: JSON 输入

**如果需要创建一个无任何配置的输入框，请使用`components.input.create()`方法**

::: code-tabs

```ts twoslash
// @noErrorValidation [基础用法]
import { components } from 'node-karin'
// ---cut-before---
// 创建全新无任何配置的输入框
components.input.create('input-key')
```

```ts twoslash
// @noErrorValidation [字符串]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个字符串输入框
components.input.string('input-key')
```

```ts twoslash
// @noErrorValidation [数字]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个数字输入框
components.input.number('input-key')
```

```ts twoslash
// @noErrorValidation [布尔值]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个布尔值输入框
components.input.boolean('input-key')
```

```ts twoslash
// @noErrorValidation [日期]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个日期输入框
components.input.date('input-key')
```

```ts twoslash
// @noErrorValidation [时间]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个时间输入框
components.input.time('input-key')
```

```ts twoslash
// @noErrorValidation [日期时间]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个日期时间输入框
components.input.datetime('input-key')
```

```ts twoslash
// @noErrorValidation [邮箱]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个邮箱输入框
components.input.email('input-key')
```

```ts twoslash
// @noErrorValidation [URL]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个URL输入框
components.input.url('input-key')
```

```ts twoslash
// @noErrorValidation [电话]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个电话输入框
components.input.tel('input-key')
```

```ts twoslash
// @noErrorValidation [密码]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个密码输入框
components.input.password('input-key')
```

```ts twoslash
// @noErrorValidation [JSON]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个JSON输入框
components.input.json('input-key')
```

```ts twoslash
// @noErrorValidation [单维数组]
import { components } from 'node-karin'
// ---cut-before---
// 创建一个单维数组容器
components.input.group('input-key')
```

:::

#### api 参数

在调用以上方法创建后 可以继续调用如下方法

| api           | 参数                                                                        | 描述                                           |
| ------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| `label`       | `string`                                                                    | 设置标签                                       |
| `placeholder` | `string`                                                                    | 设置占位符文本                                 |
| `description` | `string`                                                                    | 设置描述文本                                   |
| `isRequired`  | `boolean`                                                                   | 设置必填                                       |
| `isClearable` | `boolean`                                                                   | 设置可清除                                     |
| `size`        | `sm` \| `md` \| `lg`                                                        | 设置大小                                       |
| `color`       | `default` \| `primary` \| `secondary` \| `success` \| `warning` \| `danger` | 设置颜色                                       |
| `rules`       | `ValidationRule`                                                            | 设置验证规则                                   |
| `基础参数`    | `ComponentProps`                                                            | 每个组件都继承自这个 [**基础参数**](#基础参数) |

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
export interface ValidationRule {
  /** 正则表达式 */
  regex?: string | RegExp
  /** 最小长度 */
  minLength?: number
  /** 最大长度 */
  maxLength?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 自定义错误消息 */
  error?: string
}
```

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
// create函数可以随意换成其他 因为有时候我们不需要配置那么多参数 可以使用一些其他默认方法的参数
components.input.create('input-key', {
  label: '这是一个输入框', // 设置标签
  placeholder: '请输入内容', // 设置占位符文本
  description: '这是一个描述', // 设置描述文本
  isRequired: true, // 内容必填
  isClearable: true, // 可清除
  size: 'sm', // 大小
  color: 'primary', // 颜色
  rules: [
    {
      min: 0, // 最小值
      max: 100, // 最大值
      error: '数字应在0-100之间', // 自定义错误消息
    },
    {
      regex: /^\d+$/, // 正则表达式
      error: '只能输入数字', // 自定义错误消息
    },
  ],
})
```

### 2. 分隔线组件 (Divider)

#### API 参数说明

| API 方法       | 参数类型                     | 描述                                           |
| -------------- | ---------------------------- | ---------------------------------------------- |
| `descPosition` | `number`                     | 描述文本位置 0-100 的数字                      |
| `transparent`  | `boolean`                    | 是否透明                                       |
| `orientation`  | `'horizontal' \| 'vertical'` | 分割线的方向，可选水平或垂直                   |
| `基础参数`     | `ComponentProps`             | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
// 基础用法
components.divider.create('divider-key')

// 设置参数
components.divider.create('divider-key', {
  description: '此处填写分割线的描述', // 描述
  descPosition: 50, // 描述文本位置 0-100的数字
  orientation: 'horizontal', // 方向
  transparent: false, // 是否透明
})

// 创建水平分隔线
components.divider.horizontal('divider-key') // orientation 参数默认为 horizontal

// 创建垂直分隔线
components.divider.vertical('divider-key') // orientation 参数默认为 vertical
```

### 3. 开关组件 (Switch)

#### API 参数说明

请先调用`components.switch.create`方法创建组件

| API 方法           | 参数类型                                                                      | 描述                                           |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `startText`        | `string`                                                                      | 设置开关打开时显示的文本                       |
| `endText`          | `string`                                                                      | 设置开关关闭时显示的文本                       |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | 设置开关组件的大小                             |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | 设置开关的颜色主题                             |
| `thumbIcon`        | `string`                                                                      | 设置开关按钮上的图标                           |
| `startContent`     | `string`                                                                      | 设置开关打开时的内容图标                       |
| `endContent`       | `string`                                                                      | 设置开关关闭时的内容图标                       |
| `isSelected`       | `boolean`                                                                     | 设置开关的选中状态（只读）                     |
| `defaultSelected`  | `boolean`                                                                     | 设置开关的默认选中状态                         |
| `isReadOnly`       | `boolean`                                                                     | 设置开关为只读模式                             |
| `isDisabled`       | `boolean`                                                                     | 设置开关为禁用状态                             |
| `disableAnimation` | `boolean`                                                                     | 设置是否禁用开关的动画效果                     |
| `options`          | `SwitchProps`                                                                 | 一次性设置多个配置项                           |
| `基础参数`         | `ComponentProps`                                                              | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.switch.create('switch-key', {
  startText: '开启文本',
  endText: '关闭文本',
  size: 'sm',
  color: 'primary',
  thumbIcon: '图标名称',
  startContent: '开始图标',
  endContent: '结束图标',
  isSelected: true, // 选中状态
  defaultSelected: true, // 默认选中
  isReadOnly: true, // 只读
  isDisabled: true, // 禁用
  disableAnimation: true, // 禁用动画
})
```

### 4. 手风琴组件 (Accordion)

#### API 参数说明

请先调用 `components.accordion.create` 方法创建组件

| API 方法                    | 参数类型                                          | 描述                                           |
| --------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| `label`                     | `string`                                          | 设置标签文本                                   |
| `title`                     | `string`                                          | 设置标题                                       |
| `variant`                   | `'light' \| 'shadow' \| 'bordered' \| 'splitted'` | 设置样式变体                                   |
| `selectionMode`             | `'none' \| 'single' \| 'multiple'`                | 设置选择模式                                   |
| `selectionBehavior`         | `'toggle' \| 'replace'`                           | 设置选择行为                                   |
| `isCompact`                 | `boolean`                                         | 设置是否所有手风琴项目都应缩小                 |
| `isDisabled`                | `boolean`                                         | 设置是否禁用                                   |
| `showDivider`               | `boolean`                                         | 是否在每个手风琴项目的底部显示分隔线           |
| `hideIndicator`             | `boolean`                                         | 是否隐藏指示器                                 |
| `disableAnimation`          | `boolean`                                         | 是否禁用动画                                   |
| `disableIndicatorAnimation` | `boolean`                                         | 是否禁用指示器动画                             |
| `disallowEmptySelection`    | `boolean`                                         | 是否不允许空选择                               |
| `keepContentMounted`        | `boolean`                                         | 是否保持内容挂载                               |
| `fullWidth`                 | `boolean`                                         | 是否全宽                                       |
| `disabledKeys`              | `string[]`                                        | 禁用的键列表                                   |
| `selectedKeys`              | `string[]`                                        | 选中项的键列表                                 |
| `defaultSelectedKeys`       | `string[]`                                        | 默认选中项的键列表                             |
| `children`                  | `AccordionItem[]`                                 | 手风琴子项列表                                 |
| `基础参数`                  | `ComponentProps`                                  | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 手风琴子项 (AccordionItem) API

请先调用 `components.accordion.createItem` 方法创建子项

| API 方法                    | 参数类型         | 描述                                           |
| --------------------------- | ---------------- | ---------------------------------------------- |
| `title`                     | `string`         | 设置标题                                       |
| `subtitle`                  | `string`         | 设置副标题                                     |
| `indicator`                 | `boolean`        | 是否显示折叠项展开指示器                       |
| `isCompact`                 | `boolean`        | 是否使用紧凑模式                               |
| `isDisabled`                | `boolean`        | 是否禁用                                       |
| `keepContentMounted`        | `boolean`        | 关闭时是否保持挂载内容                         |
| `hideIndicator`             | `boolean`        | 是否隐藏指示器                                 |
| `disableAnimation`          | `boolean`        | 是否禁用动画                                   |
| `disableIndicatorAnimation` | `boolean`        | 是否禁用指示器动画                             |
| `children`                  | `Children[]`     | 设置子项内容                                   |
| `基础参数`                  | `ComponentProps` | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 调用示例

::: warning
手风琴的调用比较复杂 请仔细阅读此部分
:::

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
// 基本调用方法
components.accordion.create('accordion-key', {
  label: '这是一个手风琴',
  children: [
    components.accordion.createItem('accordion-item-key', {
      title: '子项标题',
      subtitle: '子项副标题',
      children: [components.input.string('accordion-input-key'), components.switch.create('accordion-switch-key')],
    }),
  ],
})
```

::: tip
完整调用示例
:::

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.accordion.create('accordion-key', {
  label: '这是一个手风琴', // 设置标签文本
  title: '手风琴标题', // 设置标题
  variant: 'light', // 设置样式变体
  selectionMode: 'single', // 设置选择模式
  selectionBehavior: 'toggle', // 设置选择行为
  isCompact: true, // 设置是否所有手风琴项目都应缩小
  isDisabled: false, // 设置是否禁用
  showDivider: true, // 是否在每个手风琴项目的底部显示分隔线
  hideIndicator: false, // 是否隐藏指示器
  disableAnimation: false, // 是否禁用动画
  disableIndicatorAnimation: false, // 是否禁用指示器动画
  disallowEmptySelection: false, // 是否不允许空选择
  keepContentMounted: true, // 是否保持内容挂载
  fullWidth: true, // 是否全宽
  disabledKeys: ['key1', 'key2'], // 禁用的键列表
  selectedKeys: ['key1'], // 选中项的键列表
  defaultSelectedKeys: ['key1'], // 默认选中项的键列表

  // 手风琴子项
  children: [
    components.accordion.createItem('accordion-item-key', {
      title: '子项标题',
      subtitle: '子项副标题',
      indicator: true, // 是否显示折叠项展开指示器
      isCompact: false, // 是否使用紧凑模式
      isDisabled: false, // 是否禁用
      keepContentMounted: true, // 关闭时是否保持挂载内容
      hideIndicator: false, // 是否隐藏指示器
      disableAnimation: false, // 是否禁用动画
      disableIndicatorAnimation: false, // 是否禁用指示器动画
      children: [
        // 自定义组件
        components.input.string('accordion-input-key'),
        components.switch.create('accordion-switch-key'),
      ],
    }),
  ],
})
```

### 5. 手风琴 Pro 组件 (AccordionPro)

::: tip
手风琴 Pro 其实就是给一个数据源进行动态渲染
可以删除、新增
:::

Pro 版本的调用方法与基础版本类似。仅有 2 个区别

#### 参数说明

来解释一下：

|        | 参数类型                                                       | 描述                                             |
| ------ | -------------------------------------------------------------- | ------------------------------------------------ |
| 参数一 | `string`                                                       | 全局唯一标识符                                   |
| 参数二 | `Record<string, any>[]`                                        | 数据源（是一个数组，数组的长度就是手风琴的数量） |
| 参数三 | `Omit<AccordionProProps, 'key' \| 'componentType' \| 'data'>)` | 手风琴组件本身                                   |

- 在调用时的 **参数二** 需要传入一个数据源，数据源的类型为 `Record<string, any>[]`，格式如下

::: details 点击打开卡片查看参数二说明

> [!IMPORTANT]
>
> 1. 如果数组中的对象拥有 `title` 这个属性，那么组件本身就会自动取出对应的值在前端进行渲染，如果没有，那么它的默认值是 `新卡片 ${参数二.length + 1}`<br />
> 2. 但是，还有但是，如果在参数三中 **给手风琴项配置了 `title` 属性** 的话，那么组件页面就会以手风琴项的配置为准。优先级：`手风琴项配置` > `数组对象配置`

数组中 **每个对象的键名** 就是参数三手风琴项的参数一 `key`，值会自动渲染到前端。<br />
Q: 键名是什么？<br />
A: 比如：`{ title: '标题', input: '数据项' }`，那么 `title` 就是键名

```js:line-numbers
[
    {
      title: '这是我自定义的标题', // 页面上会渲染这个值当成标题
      input: '数据项1',
      switch: true
    },
    {
      input: '数据项2',
      switch: false
    }
],
```

:::

> [!IMPORTANT]
> 在手风琴 Pro 的参数三中，`children` 属性不是数组，而是对象了噢。

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.accordionPro.create(
  'accordion-pro-key', // 参数一仍然是全局唯一标识符
  // 参数二说明见上方的折叠卡片
  [
    {
      title: '这是我自定义的标题',
      input: '数据项1',
      switch: true,
    },
    {
      input: '数据项2',
      switch: false,
    },
  ],
  // 手风琴 Pro 的参数三就是普通手风琴组件本身的参数二
  {
    label: '这是一个手风琴',
    // 特别注意这里不是数组了，在普通版本的手风琴中这里才是一个数组
    children: components.accordion.createItem('accordion-item', {
      title: '子项标题', // 这里配置了会强制覆盖数组对象里面的 title
      subtitle: '子项副标题',
      children: [
        // 这里的 key 就不需要唯一了，只需要和数组中对象的 键名 对应即可
        components.input.string('input'),
        components.switch.create('switch'),
      ],
    }),
  }
)
```

### 6. 单选框组 (RadioGroup)

#### API 参数说明

请先调用 `components.radio.group` 方法创建单选框组

| API 方法           | 参数类型                                                                    | 描述                                           |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------- |
| `label`            | `string`                                                                    | 设置标签文本                                   |
| `size`             | `sm` \| `md` \| `lg`                                                        | 设置单选框组的大小                             |
| `color`            | `default` \| `primary` \| `secondary` \| `success` \| `warning` \| `danger` | 设置单选框组的颜色主题                         |
| `orientation`      | `horizontal` \| `vertical`                                                  | 设置排列方向                                   |
| `name`             | `string`                                                                    | 设置表单提交时的字段名称                       |
| `value`            | `string`                                                                    | 设置当前选中的值                               |
| `defaultValue`     | `string`                                                                    | 设置默认选中的值                               |
| `errorMessage`     | `string`                                                                    | 设置错误提示信息                               |
| `isDisabled`       | `boolean`                                                                   | 设置是否禁用整个单选框组                       |
| `isRequired`       | `boolean`                                                                   | 设置是否必填                                   |
| `isReadOnly`       | `boolean`                                                                   | 设置是否只读                                   |
| `isInvalid`        | `boolean`                                                                   | 设置是否无效状态                               |
| `disableAnimation` | `boolean`                                                                   | 设置是否禁用动画效果                           |
| `radio`            | `Radio[]`                                                                   | 设置单选框选项列表                             |
| `基础参数`         | `ComponentProps`                                                            | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 单选框选项 (Radio) API

请使用 `components.radio.create` 方法创建单选框选项

| API 方法           | 参数类型                                                                      | 描述                                           |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `value`            | `string`                                                                      | 设置选项的值（必填）                           |
| `label`            | `string`                                                                      | 设置选项的标签文本                             |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | 设置选项的大小                                 |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | 设置选项的颜色主题                             |
| `description`      | `string`                                                                      | 设置选项的描述文本                             |
| `isDisabled`       | `boolean`                                                                     | 设置是否禁用此选项                             |
| `isRequired`       | `boolean`                                                                     | 设置是否必填                                   |
| `isReadOnly`       | `boolean`                                                                     | 设置是否只读                                   |
| `isInvalid`        | `boolean`                                                                     | 设置是否无效状态                               |
| `disableAnimation` | `boolean`                                                                     | 设置是否禁用动画效果                           |
| `基础参数`         | `ComponentProps`                                                              | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
// 基础用法
components.radio.group('radio-group', {
  label: '这是一个单选框组',
  orientation: 'horizontal',
  radio: [
    components.radio.create('radio-1', {
      label: '选项1',
      value: 'option1',
    }),
    components.radio.create('radio-2', {
      label: '选项2',
      value: 'option2',
    }),
  ],
})
```

完整配置示例：

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.radio.group('radio-group', {
  label: '这是一个单选框组',
  size: 'md',
  color: 'primary',
  orientation: 'horizontal',
  name: 'radio-group-name',
  value: 'option1',
  defaultValue: 'option1',
  errorMessage: '请选择一个选项',
  isDisabled: false,
  isRequired: true,
  isReadOnly: false,
  isInvalid: false,
  disableAnimation: false,
  radio: [
    components.radio.create('radio-1', {
      value: 'option1',
      label: '选项1',
      size: 'md',
      color: 'primary',
      description: '这是选项1的描述',
      isDisabled: false,
      isRequired: false,
      isReadOnly: false,
      isInvalid: false,
      disableAnimation: false,
    }),
    components.radio.create('radio-2', {
      value: 'option2',
      label: '选项2',
      description: '这是选项2的描述',
    }),
  ],
})
```

#### 返回值示例

```json
{
  "radio-group": "option1"
}
```

### 7. 复选框组 (CheckboxGroup)

#### API 参数说明

请先调用 `components.checkbox.group` 方法创建复选框组

| API 方法           | 参数类型                                                                      | 描述                                           |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `orientation`      | `'vertical' \| 'horizontal'`                                                  | 设置排列方向（默认水平）                       |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | 设置复选框组的颜色主题                         |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | 设置复选框组的大小                             |
| `radius`           | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                    | 设置复选框组的圆角大小                         |
| `name`             | `string`                                                                      | 设置表单提交时的字段名称                       |
| `label`            | `string`                                                                      | 设置标签文本                                   |
| `value`            | `string[]`                                                                    | 设置当前选中的值数组                           |
| `lineThrough`      | `boolean`                                                                     | 设置是否显示删除线                             |
| `defaultValue`     | `string[]`                                                                    | 设置默认选中的值数组                           |
| `isInvalid`        | `boolean`                                                                     | 设置是否无效状态                               |
| `isDisabled`       | `boolean`                                                                     | 设置是否禁用整个复选框组                       |
| `isRequired`       | `boolean`                                                                     | 设置是否必填                                   |
| `isReadOnly`       | `boolean`                                                                     | 设置是否只读                                   |
| `disableAnimation` | `boolean`                                                                     | 设置是否禁用动画效果                           |
| `checkbox`         | `CheckboxProps[]`                                                             | 设置复选框选项列表                             |
| `基础参数`         | `ComponentProps`                                                              | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 复选框选项 (Checkbox) API

请使用 `components.checkbox.create` 方法创建复选框选项

| API 方法           | 参数类型                                                                      | 描述                                           |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `value`            | `string`                                                                      | 设置选项的值                                   |
| `label`            | `string`                                                                      | 设置选项的标签文本                             |
| `name`             | `string`                                                                      | 设置表单提交时的字段名称                       |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | 设置选项的大小                                 |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | 设置选项的颜色主题                             |
| `radius`           | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                    | 设置选项的圆角大小                             |
| `lineThrough`      | `boolean`                                                                     | 设置是否显示删除线                             |
| `isRequired`       | `boolean`                                                                     | 设置是否必填                                   |
| `isReadOnly`       | `boolean`                                                                     | 设置是否只读                                   |
| `isDisabled`       | `boolean`                                                                     | 设置是否禁用                                   |
| `isIndeterminate`  | `boolean`                                                                     | 设置不确定状态（视觉呈现）                     |
| `isInvalid`        | `boolean`                                                                     | 设置是否无效状态                               |
| `disableAnimation` | `boolean`                                                                     | 设置是否禁用动画效果                           |
| `基础参数`         | `ComponentProps`                                                              | 每个组件都继承自这个 [**基础参数**](#基础参数) |

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
// 基础用法
components.checkbox.group('checkbox-group', {
  label: '这是一个复选框组',
  orientation: 'horizontal',
  checkbox: [
    components.checkbox.create('checkbox-1', {
      label: '选项1',
      value: 'option1',
    }),
    components.checkbox.create('checkbox-2', {
      label: '选项2',
      value: 'option2',
    }),
  ],
})
```

完整配置示例：

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.checkbox.group('checkbox-group', {
  label: '这是一个复选框组',
  orientation: 'horizontal',
  color: 'primary',
  size: 'md',
  radius: 'md',
  name: 'checkbox-group-name',
  value: ['option1'],
  lineThrough: false,
  defaultValue: ['option1'],
  isInvalid: false,
  isDisabled: false,
  isRequired: true,
  isReadOnly: false,
  disableAnimation: false,
  checkbox: [
    components.checkbox.create('checkbox-1', {
      value: 'option1',
      label: '选项1',
      name: 'checkbox-1',
      size: 'md',
      color: 'primary',
      radius: 'md',
      lineThrough: false,
      isSelected: true,
      defaultSelected: true,
      isRequired: false,
      isReadOnly: false,
      isDisabled: false,
      isIndeterminate: false,
      isInvalid: false,
      disableAnimation: false,
    }),
    components.checkbox.create('checkbox-2', {
      value: 'option2',
      label: '选项2',
    }),
  ],
})
```

#### 返回值示例

::: danger
在`1.3.21`版本中，返回值的格式发生了变化，请注意查看。
:::

```json
// 1.3.21 版本之前
{
  "checkbox-group": {
    "checkbox-1": true,
    "checkbox-2": false
  }
}

// 1.3.21 版本之后 选中的值将会出现在数组中
{
  "checkbox-group": [
    "checkbox-1",
    "checkbox-2"
  ]
}
```

### 8. 单维数组操作 (Input.Group)

::: details 什么是单维数组？
单维数组是指一个只有一层结构的数组，它的每个元素都是直接存储在数组中，而不是嵌套的数组或其他复杂结构。<br />
**单维数组的特点：**

1. 结构简单：单维数组的每个元素都是直接访问的，没有嵌套的层级。
2. 索引访问：通过索引可以直接访问数组中的元素，索引从 0 开始。
3. 类型一致：在 TypeScript 中，单维数组通常存储相同类型的元素

**示例：**

```ts twoslash
// @noErrorValidation
const numbers: number[] = [1, 2, 3, 4, 5]
const names: string[] = ['Alice', 'Bob', 'Charlie']
```

:::

#### API 参数说明

| API 方法      | 参数类型         | 描述                                                                                  |
| ------------- | ---------------- | ------------------------------------------------------------------------------------- |
| `label`       | `string`         | 输入框组的标签。                                                                      |
| `template`    | `InputProps`     | 输入框模板，定义输入框的样式或行为。 <Badge type="danger" text="必传参数" />          |
| `itemsPerRow` | `number`         | 输入框一行最多显示的数量，默认为 3 个。                                               |
| `maxRows`     | `number`         | 输入框最大显示的行数，超出后滚动，默认为 3 行。                                       |
| `maxInputs`   | `number`         | 输入框最大数量，默认为 100，设置为 0 表示不限制。                                     |
| `data`        | `string[]`       | 输入框组的数据，以字符串数组的形式存储，如果数据源类型是 `number` 请先转换成 `string` |
| `基础参数`    | `ComponentProps` | 每个组件都继承自这个 [**基础参数**](#基础参数)                                        |

#### 调用示例

```ts twoslash
// @noErrorValidation
import { components } from 'node-karin'
// ---cut-before---
components.input.group('group-key', {
  label: '这是一个单维数组框',
  maxRows: 3,
  itemsPerRow: 3,
  maxInputs: 100,
  data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  template: components.input.string('input-key', {
    color: 'success',
    // 更多参数。。。
  }),
})
```

#### 返回值示例

```json
["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
```

## 保存

需要注意 返回的值中，就算你是`number`类型 返回的也是`string`类型

```json
{
  "accordion-pro-key": [
    {
      "input": "数据项1",
      "switch": true
    },
    {
      "input": "数据项2",
      "switch": false
    }
  ]
}
```

## 基础参数

每个组件的 API 接口都在 `ComponentProps` 的基础上扩展出来，所以你用到的每个组件都会有以下基础参数。

| API 方法      | 参数类型        | 描述                                                                                                                                    |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| key           | `string`        | 唯一标识符，注意这个 key 是要全局唯一不是组件内唯一噢（意思是整个文件<mark>不能出现</mark>第二个<mark>相同</mark>的 key）               |
| componentType | `ComponentType` | 组件类型                                                                                                                                |
| description   | `string`        | 组件描述                                                                                                                                |
| className     | `string`        | 自定义包裹组件的 `div` 的 `className`，用于样式定制。<mark>样式命名遵循 [tailwindcss v3](https://v3.tailwindcss.com/) 的命名规范</mark> |

## 下面是一个我写的示例文件

```ts twoslash
// @noErrors
import { defineConfig, components } from 'node-karin'

export default defineConfig({
  info: {},
  /** 动态渲染的组件 */
  components: () => [
    // 邮件输入框
    components.input.email('email'),
    // 分隔线
    components.divider.create('divider1'),
    // 数字输入框
    components.input.number('number'),
    // 分隔线
    components.divider.create('divider2'),
    // 单选框组
    components.radio.group('radio-group', {
      label: '这是一个单选框',
      orientation: 'horizontal',
      // 单选框列表
      radio: [
        components.radio.create('radio-1', {
          label: '选项1',
          value: 'option1',
        }),
        components.radio.create('radio-2', {
          label: '选项2',
          value: 'option2',
        }),
      ],
    }),
    // 分隔线
    components.divider.create('divider3'),
    // 复选框组
    components.checkbox.group('checkbox-group', {
      label: '这是一个复选框',
      orientation: 'horizontal',
      // 复选框列表
      checkbox: [
        components.checkbox.create('checkbox-1', {
          name: '选项1',
          label: '选项1',
          value: 'option1',
        }),
        components.checkbox.create('checkbox-2', {
          label: '选项2',
          value: 'option2',
        }),
        components.checkbox.create('checkbox-3', {
          label: '选项3',
          value: 'option3',
        }),
      ],
    }),
    // 分隔线
    components.divider.create('divider4', { transparent: true }),

    // 手风琴
    components.accordion.create('accordion-key', {
      label: '这是一个手风琴',
      children: [
        components.accordion.createItem('accordion-item-key', {
          title: '子项标题',
          subtitle: '子项副标题',
          children: [components.input.string('accordion-input-key'), components.switch.create('accordion-switch-key')],
        }),
      ],
    }),
    // 手风琴pro
    components.accordionPro.create(
      // 唯一标识符
      'accordion-pro-key',
      // data
      [
        {
          title: '数据项1',
          input: '数据项1',
          switch: true,
        },
        {
          input: '数据项2',
          switch: false,
        },
      ],
      // 子项参数
      {
        label: '这是一个手风琴',
        children: components.accordion.createItem('accordion-item', {
          title: '子项标题',
          subtitle: '子项副标题',
          children: [
            components.input.string('accordion-input'), // 这里需要与data的key一致
            components.switch.create('accordion-switch'),
          ],
        }),
      }
    ),
  ],

  /** 前端点击保存之后调用的方法 */
  save: (config: any) => {
    console.log('config:', JSON.stringify(config, null, 2))
    // 必须要返回一个对象，success表示是否保存成功，message表示保存成功的提示信息
    return {
      success: true,
      message: '保存成功',
    }
  },
})
```

### 返回值

```json
{
  "radio-group": "",
  "checkbox-group": {
    "checkbox-1": false,
    "checkbox-2": false,
    "checkbox-3": false
  },
  "accordion-key": [
    {
      "accordion-input-key": "",
      "accordion-switch-key": false
    }
  ],
  "accordion-pro-key": [
    {
      "input": "数据项1",
      "switch": true
    },
    {
      "input": "数据项2",
      "switch": false
    }
  ]
}
```
