# Handler 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

Handler模块提供了事件处理器的调用机制，允许插件注册和处理特定事件，并通过键值对的方式进行查找和调用。该模块是实现插件间通信和事件处理的核心组件。

## 模块概述

Handler模块主要用于处理注册到特定事件键上的处理函数。它提供了一种插件可以互相调用功能的机制，支持链式处理和中断处理流程。

## API 接口

### handler

调用事件处理器。支持直接调用、使用call方法调用以及使用has方法检查是否存在处理器。

```typescript
import { handler } from 'node-karin'

/**
 * 调用事件处理器
 * @param key 事件键
 * @param args 自定义参数，如果传递事件对象需要使用e字段
 * @returns 处理器返回的结果
 */

// 直接调用
const result1 = await handler('event.key', { param1: 'value1', e: eventObject })

// 使用call方法调用（可以指定返回类型）
const result2 = await handler.call<string>('event.key', { param1: 'value1' })

// 检查是否存在处理器
const hasHandler = handler.has('event.key')
```

### handler.call

与直接调用handler功能相同，但允许显式指定返回类型。

```typescript
import { handler } from 'node-karin'

/**
 * 调用事件处理器
 * @param key 事件键
 * @param args 自定义参数
 * @returns 处理器返回的结果
 */
const result = await handler.call<UserInfo>('user.get', { userId: '123456' })
// result的类型被指定为UserInfo
```

### handler.has

检查是否存在指定键的事件处理器。

```typescript
import { handler } from 'node-karin'

/**
 * 检查是否存在指定键的事件处理器
 * @param key 事件键
 * @returns 是否存在处理器
 */
if (handler.has('permission.check')) {
  // 存在权限检查处理器，可以调用
  const hasPermission = await handler('permission.check', { userId: '123456', action: 'edit' })
}
```

## 事件处理器机制

事件处理器使用了一种特殊的调用机制，允许多个处理器注册到同一个事件键上，并且可以决定是否继续执行链中的下一个处理器。

### 处理器注册

处理器通常通过插件系统注册到特定的事件键上。每个处理器函数接收两个参数：

1. `args`：调用处理器时传递的参数对象
2. `next`：一个函数，调用它表示当前处理器不处理此事件，允许继续执行链中的下一个处理器

```typescript
// 插件中注册处理器的示例
ctx.on('handler', {
  key: 'user.get',
  fn: async (args, next) => {
    const { userId } = args
    
    // 如果不是我们负责的用户ID范围，就跳过
    if (!userId.startsWith('user_')) {
      next()
      return
    }
    
    // 处理并返回结果
    return {
      id: userId,
      name: 'User Name',
      // ...其他用户信息
    }
  }
})
```

### 处理流程

当调用`handler`函数时，它会按照注册顺序遍历所有匹配指定键的处理器：

1. 如果处理器不调用`next()`并返回一个值，该值将作为整个`handler`调用的返回值，处理链终止
2. 如果处理器调用`next()`，则处理器的返回值会被忽略，继续执行链中的下一个处理器
3. 如果所有处理器都调用了`next()`或没有任何处理器注册，则返回`undefined`

处理器可以返回一个Promise，Handler模块会自动等待它完成。

## 使用示例

### 基本使用

```typescript
import { handler } from 'node-karin'

// 检查用户权限
async function checkUserPermission(userId, action) {
  if (!handler.has('permission.check')) {
    // 没有权限处理器，默认拒绝
    return false
  }
  
  return await handler('permission.check', { userId, action })
}

// 使用示例
async function editUserProfile(userId, newData) {
  // 检查是否有编辑权限
  const hasPermission = await checkUserPermission(userId, 'profile.edit')
  
  if (!hasPermission) {
    throw new Error('没有权限编辑个人资料')
  }
  
  // 有权限，执行编辑操作
  return await handler('user.edit', { userId, data: newData })
}
```

### 与事件系统结合

```typescript
import { handler } from 'node-karin'

// 在消息处理中使用
async function onMessageReceived(e) {
  // 解析消息内容，检查是否是命令
  if (e.message.startsWith('/translate ')) {
    const text = e.message.slice(11) // 去掉"/translate "前缀
    
    // 检查是否有翻译处理器
    if (handler.has('translate.text')) {
      // 调用翻译处理器
      const translated = await handler('translate.text', { 
        text, 
        from: 'auto', 
        to: 'zh-CN',
        e
      })
      
      // 将翻译结果发送回去
      if (translated) {
        await e.reply(`翻译结果: ${translated}`)
        return true // 表示消息已处理
      }
    }
  }
  
  return false // 消息未处理，继续传递给其他处理器
}
```

### 实现插件间服务调用

```typescript
import { handler } from 'node-karin'

// 插件A：提供天气查询服务
// 在插件初始化时注册处理器
function initWeatherPlugin(ctx) {
  ctx.on('handler', {
    key: 'weather.get',
    fn: async (args) => {
      const { city } = args
      // 实际实现会调用天气API获取数据
      return {
        city,
        temperature: '25°C',
        condition: '晴',
        humidity: '40%'
      }
    }
  })
}

// 插件B：使用天气服务实现功能
async function createWeatherReport(city) {
  if (!handler.has('weather.get')) {
    return '天气服务不可用，请确认天气插件已启用'
  }
  
  const weather = await handler.call('weather.get', { city })
  
  if (!weather) {
    return `无法获取${city}的天气信息`
  }
  
  return `${city}天气：${weather.temperature}，${weather.condition}，湿度${weather.humidity}`
}
```

## 注意事项

1. **处理器注册顺序**：处理器按注册顺序执行，先注册的处理器优先级更高
2. **错误处理**：如果处理器抛出异常，Handler模块会捕获它并继续执行链中的下一个处理器
3. **类型安全**：使用`handler.call<T>`可以指定返回类型，提高代码的类型安全性
4. **性能考虑**：在处理大量事件时，应确保处理器函数高效执行，避免阻塞事件循环 