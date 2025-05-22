# request 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

request模块提供了网络请求相关的工具函数，扩展了axios的基础功能。

## 竞速请求

### raceRequest

同时向多个URL发送请求，返回最先成功响应的数据。

```typescript
import { raceRequest } from 'node-karin'
import type { AxiosRequestConfig } from 'axios'

/**
 * 竞速请求 返回最先成功响应的数据
 * @param urls 请求地址数组
 * @param config 请求配置，默认为 { method: 'HEAD', timeout: 10000 }
 * @returns 返回最先成功响应的数据，如果全部失败则返回null
 */
// 基本用法 - HEAD请求
const urls = ['https://api.github.com', 'https://api.gitee.com']
const response = await raceRequest(urls)

// 自定义配置 - POST请求
const postUrls = ['https://api1.example.com/post', 'https://api2.example.com/post']
const postResponse = await raceRequest(postUrls, {
  method: 'post',
  data: { foo: 'bar' },
  timeout: 5000  // 超时时间5秒
})

// 处理响应
if (postResponse) {
  console.log('最快响应的URL:', postResponse.config.url)
  console.log('响应数据:', postResponse.data)
} else {
  console.log('所有请求都失败了')
}
```

**函数说明**

这个函数会同时向多个URL发送相同的请求，并返回最先成功响应的结果。这在以下场景特别有用：
- 当你有多个可用的API端点，想使用响应最快的那个
- 当你需要从多个镜像站点获取资源
- 实现简单的负载均衡或故障转移机制

**参数**

- `urls`: 字符串数组，包含多个要请求的URL
- `config`: Axios请求配置对象，默认值:
  ```typescript
  {
    method: 'HEAD',  // 默认使用HEAD请求 
    timeout: 10000   // 默认超时时间10秒
  }
  ```

**返回值**

- 成功时: 返回最先成功的AxiosResponse对象
- 失败时: 如果所有请求都失败，则返回null

**注意事项**

- 默认使用HEAD请求方法，这对于简单检测URL可达性很有用
- 如果需要获取实际内容，可以将方法改为GET、POST等
- 当所有请求都失败或超时时，函数将返回null 

### pingRequest

测试多个URL的网络可达性和响应速度，可用于选择最快的服务器或检测网络状态。

```typescript
import { pingRequest } from 'node-karin'
import type { ExtendedAxiosRequestConfig } from 'node-karin'

/**
 * 测试网络连接
 * @param urls 要测试的URL数组
 * @param config 扩展的请求配置
 * @returns 根据配置返回不同结果
 */
// 默认模式 - 返回所有成功URL的数组
const urls = ['https://api.github.com', 'https://api.gitee.com']
const successUrls = await pingRequest(urls)
console.log('成功连接的URL列表:', successUrls)
// 输出示例: 成功连接的URL列表: ['https://api.github.com', 'https://api.gitee.com']

// 基本用法 - 测试多个URL并获取详细结果
const detailedResults = await pingRequest(urls, { detailed: true })
console.log(detailedResults)
// 输出结果示例:
// [
//   {
//     url: 'https://api.github.com',
//     success: true,
//     error: null,
//     duration: 235 // 毫秒
//   },
//   {
//     url: 'https://api.gitee.com',
//     success: true,
//     error: null,
//     duration: 142 // 毫秒
//   }
// ]

// 竞速模式 - 只返回最快的URL
const fastestUrl = await pingRequest(urls, { isRace: true })
console.log('最快的URL:', fastestUrl)
// 输出: 最快的URL: https://api.gitee.com

// 竞速模式并获取详细信息
const fastestDetail = await pingRequest(urls, { isRace: true, detailed: true })
console.log('最快的URL详情:', fastestDetail)
// 输出示例:
// 最快的URL详情: {
//   url: 'https://api.gitee.com',
//   success: true,
//   error: null,
//   duration: 142
// }
```

**函数说明**

这个函数同时测试多个URL的连接情况，可选择获取详细的测试结果或采用竞速模式返回最快的URL。适用于:
- 测试多个服务器的响应速度
- 选择最快的API端点或镜像站点
- 诊断网络连接问题

**参数**

- `urls`: 字符串数组，包含多个要测试的URL
- `config`: 扩展的Axios请求配置对象，支持以下特殊选项:
  ```typescript
  {
    method: 'HEAD',     // 默认使用HEAD请求
    timeout: 10000,     // 默认超时时间10秒
    detailed: false,    // 是否返回详细信息
    isRace: false,      // 是否使用竞速模式
    successCodes: [200] // 成功状态码列表
  }
  ```

**返回值**

返回类型取决于配置参数:
- 普通模式 + 非详细信息 (默认): 返回所有成功URL的数组
- 普通模式 + 详细信息: 返回所有URL的测试详情数组
- 竞速模式 + 非详细信息: 返回最快成功响应的URL或null
- 竞速模式 + 详细信息: 返回最快成功响应的详细信息或null

**注意事项**

- 默认使用HEAD请求方法，减少数据传输
- 竞速模式下，只有成功响应的URL才会被考虑
- 如果所有请求都失败，竞速模式将返回null 