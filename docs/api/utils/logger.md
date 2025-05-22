# logger 模块

> [!note] 温馨提示
> 本文由AI辅助生成，可能存在不准确性。

logger模块提供了日志记录功能，基于log4js扩展，增加了彩色输出和便捷的日志分类方法。

## 全局logger对象

框架初始化时会创建全局logger对象，可以直接使用：

```typescript
import { logger } from 'node-karin'

// 输出不同级别的日志
logger.trace('跟踪信息')
logger.debug('调试信息')
logger.info('普通信息')
logger.warn('警告信息')
logger.error('错误信息')
logger.fatal('致命错误')
```

## 彩色输出

logger对象扩展了chalk，提供了多种颜色方法：

```typescript
logger.info(logger.red('这是红色文本'))
logger.info(logger.green('这是绿色文本'))
logger.info(logger.yellow('这是黄色文本'))
logger.info(logger.blue('这是蓝色文本'))
logger.info(logger.magenta('这是品红文本'))
logger.info(logger.cyan('这是青色文本'))
logger.info(logger.white('这是白色文本'))
logger.info(logger.gray('这是灰色文本'))
logger.info(logger.violet('这是紫罗兰色文本'))
logger.info(logger.fnc('这是函数高亮色文本'))
```

## 机器人日志

特别提供了bot方法用于输出机器人相关的日志，会自动添加机器人ID前缀：

```typescript
// 输出带有机器人ID前缀的日志
logger.bot('info', '123456789', '机器人已连接')
logger.bot('error', '123456789', '连接失败', error)
```

## 日志配置

通过 `.env` 文件可以控制日志行为：

- `LOG_LEVEL`: 日志级别，默认为'info'
- `LOG_DAYS_TO_KEEP`: 日志保留天数，默认为30天
- `LOG_MAX_LOG_SIZE`: 日志文件最大大小(MB)，默认为0(不限制)
- `LOG_FNC_COLOR`: 函数高亮颜色，默认为'#E1D919'

## 创建自定义日志器

可以创建自定义的日志记录器：

```typescript
// 这是内部接口，请勿使用
import { createInnerLogger } from 'node-karin'

// 创建一个新的日志记录器，指定日志存储目录
const customLogger = createInnerLogger('/path/to/logs')
```

## Logger接口

Logger对象的类型定义：

```typescript
interface Logger {
  trace(...args: any[]): void
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  fatal(...args: any[]): void
  mark(...args: any[]): void
  
  // 颜色方法
  chalk: typeof chalk
  red(text: string): string
  green(text: string): string
  yellow(text: string): string
  blue(text: string): string
  magenta(text: string): string
  cyan(text: string): string
  white(text: string): string
  gray(text: string): string
  violet(text: string): string
  fnc(text: string): string
  
  // 机器人日志
  bot(level: LoggerLevel, id: string, ...args: any[]): void
}

// 日志级别
type LoggerLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'mark'
``` 