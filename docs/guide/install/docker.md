---
title: 🐳 Docker 部署
createTime: 2025/11/06 04:23:00
---

# Docker 部署指南

使用 Docker 部署 Karin 是最简单快捷的方式，无需手动配置 Node.js 环境。

## 快速开始

### 一键安装脚本

Karin 提供了自动化安装脚本，支持自动安装 Docker 并部署 Karin：

```bash
# 使用官方脚本（推荐）
curl -fsSL https://raw.githubusercontent.com/KarinJS/Karin/main/packages/docker/docker.sh | bash

# 指定端口（默认 7777）
curl -fsSL https://raw.githubusercontent.com/KarinJS/Karin/main/packages/docker/docker.sh | bash -s -- -p 8080
```

### 国内网络加速

如果您在国内无法访问 GitHub，可以使用以下镜像源：

#### 方式一：使用 GitMirror 镜像

```bash
# 使用 GitMirror 加速（推荐）
curl -fsSL https://raw.gitmirror.com/KarinJS/Karin/main/packages/docker/docker.sh | bash

# 指定端口
curl -fsSL https://raw.gitmirror.com/KarinJS/Karin/main/packages/docker/docker.sh | bash -s -- -p 8080
```

#### 方式二：使用 GhProxy 镜像

```bash
# 使用 ghproxy.com 加速
curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/KarinJS/Karin/main/packages/docker/docker.sh | bash
```

#### 方式三：使用 Moeyy 代理

```bash
# 使用 gh.ddlc.top 加速
curl -fsSL https://gh.ddlc.top/https://raw.githubusercontent.com/KarinJS/Karin/main/packages/docker/docker.sh | bash
```

#### 更多镜像源选择

如果上述镜像源无法使用，可以尝试以下替代方案：

| 镜像源 | 使用方式 | 说明 |
|--------|---------|------|
| hub.gitmirror.com | 在 URL 前添加 `https://hub.gitmirror.com/` | 支持 releases、raw 文件 |
| ghps.cc | 访问网站粘贴链接 | Web 界面操作 |
| gh-proxy.com | 直接替换域名 | 支持多种文件类型 |
| fastgit.org | 完整镜像站 | 可浏览和下载整个仓库 |
| gitclone.com | 完整镜像站 | 支持所有 GitHub 功能 |

:::tip 镜像源选择建议
- **推荐使用**：raw.gitmirror.com 或 ghproxy.com（速度快、稳定性好）
- 如果一个镜像源无法使用，立即尝试下一个
- 镜像源可用性可能随时变化，建议收藏多个备用
:::

## 脚本功能说明

安装脚本会自动完成以下操作：

1. ✅ 检测并安装 curl（如果未安装）
2. ✅ 检测并安装 Docker（如果未安装）
3. ✅ 拉取 Karin Docker 镜像（`karinjs/karin:latest`）
4. ✅ 创建并启动 Karin 容器
5. ✅ 配置容器自动重启
6. ✅ 挂载数据目录到 `/opt/karin`
7. ✅ 配置命令行别名（`karin` 和 `kr`）

### 默认配置

- **镜像名称**：`karinjs/karin:latest`
- **容器名称**：`karin`
- **默认端口**：`7777`
- **数据目录**：`/opt/karin`
- **时区**：`Asia/Shanghai`
- **重启策略**：`always`

## 手动部署

如果您希望手动部署或自定义配置，可以按照以下步骤操作：

### 1. 安装 Docker

如果您还没有安装 Docker，请执行：

```bash
# 官方安装脚本
curl -fsSL https://get.docker.com | bash

# 或使用国内镜像加速
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

### 2. 拉取 Karin 镜像

```bash
docker pull karinjs/karin:latest
```

### 3. 启动容器

```bash
docker run -d --name karin --restart=always \
  -e TZ=Asia/Shanghai \
  -e PORT=7777 \
  -p 7777:7777 \
  -v /opt/karin:/app \
  -v /opt/karin/puppteer:${HOME}/.cache/puppeteer \
  karinjs/karin:latest
```

### 4. 配置命令别名（可选）

为了方便使用，可以配置命令别名：

```bash
# 添加别名到 .bashrc
echo "alias karin='docker exec -it karin karin'" >> ~/.bashrc
echo "alias kr='docker exec -it karin karin'" >> ~/.bashrc

# 立即生效
source ~/.bashrc
```

## Docker Compose 部署

如果您熟悉 Docker Compose，可以使用以下配置文件：

```yaml title="docker-compose.yml"
version: '3.8'

services:
  karin:
    image: karinjs/karin:latest
    container_name: karin
    restart: always
    environment:
      - TZ=Asia/Shanghai
      - PORT=7777
    ports:
      - "7777:7777"
    volumes:
      - /opt/karin:/app
      - /opt/karin/puppteer:${HOME}/.cache/puppeteer
```

启动服务：

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

## 容器管理

### 常用命令

```bash
# 查看容器状态
docker ps -a | grep karin

# 查看容器日志
docker logs -f karin

# 进入容器
docker exec -it karin /bin/bash

# 重启容器
docker restart karin

# 停止容器
docker stop karin

# 启动容器
docker start karin

# 删除容器（会保留数据目录）
docker rm -f karin
```

### 使用 Karin CLI

配置别名后，可以直接使用 `karin` 或 `kr` 命令：

```bash
# 查看帮助
karin --help

# 查看版本
karin --version

# 重启应用（不重启容器）
kr restart

# 查看日志
kr log
```

## 数据持久化

### 数据目录结构

Docker 部署时，所有数据都存储在 `/opt/karin` 目录下：

```
/opt/karin/
├── @karinjs/          # Karin 配置和数据
│   ├── config/        # 配置文件
│   ├── data/          # 数据文件
│   ├── logs/          # 日志文件
│   └── temp/          # 临时文件
├── node_modules/      # 依赖包
├── plugins/           # 插件目录
└── package.json       # 项目配置
```

### 备份与恢复

```bash
# 备份数据
tar -czf karin-backup-$(date +%Y%m%d).tar.gz /opt/karin

# 恢复数据
tar -xzf karin-backup-20250106.tar.gz -C /
```

## 镜像说明

### 镜像构建

Karin Docker 镜像基于 `node:lts-slim`，已预装：

- ✅ Node.js LTS 版本
- ✅ pnpm 包管理器
- ✅ Karin CLI 工具
- ✅ FFmpeg（多媒体处理）
- ✅ Chromium 依赖（用于截图、渲染）
- ✅ Redis（数据缓存）
- ✅ @karinjs/plugin-puppeteer（渲染插件）

### 镜像大小

- **压缩大小**：约 500MB
- **解压大小**：约 1.5GB

:::warning 磁盘空间
请确保服务器有足够的磁盘空间（建议至少 5GB 可用空间）
:::

## 端口配置

### 修改端口

如果需要修改端口，有以下几种方式：

#### 方式一：使用安装脚本参数

```bash
curl -fsSL https://raw.gitmirror.com/KarinJS/Karin/main/packages/docker/docker.sh | bash -s -- -p 8080
```

#### 方式二：修改容器环境变量

```bash
# 删除旧容器
docker rm -f karin

# 使用新端口启动
docker run -d --name karin --restart=always \
  -e TZ=Asia/Shanghai \
  -e PORT=8080 \
  -p 8080:8080 \
  -v /opt/karin:/app \
  -v /opt/karin/puppteer:${HOME}/.cache/puppeteer \
  karinjs/karin:latest
```

#### 方式三：修改 .env 文件

```bash
# 编辑配置文件
nano /opt/karin/.env

# 修改 HTTP_PORT
HTTP_PORT=8080

# 重启容器
docker restart karin
```

## 更新升级

### 更新 Karin

```bash
# 拉取最新镜像
docker pull karinjs/karin:latest

# 停止并删除旧容器
docker stop karin
docker rm karin

# 启动新容器（数据目录保持不变）
docker run -d --name karin --restart=always \
  -e TZ=Asia/Shanghai \
  -e PORT=7777 \
  -p 7777:7777 \
  -v /opt/karin:/app \
  -v /opt/karin/puppteer:${HOME}/.cache/puppeteer \
  karinjs/karin:latest
```

:::tip 数据安全
更新前建议先备份 `/opt/karin` 目录
:::

## 故障排查

### 常见问题

#### 1. 容器无法启动

```bash
# 查看容器日志
docker logs karin

# 检查端口占用
netstat -tunlp | grep 7777

# 检查磁盘空间
df -h
```

#### 2. 无法访问 Web UI

```bash
# 检查容器是否运行
docker ps | grep karin

# 检查端口映射
docker port karin

# 检查防火墙
firewall-cmd --list-ports
```

#### 3. 权限问题

```bash
# 修改数据目录权限
chmod -R 755 /opt/karin
chown -R $USER:$USER /opt/karin
```

#### 4. 镜像拉取失败

如果您在国内无法拉取 Docker 镜像，可以配置 Docker 镜像加速：

```bash
# 编辑 Docker 配置
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
EOF

# 重启 Docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 性能优化

### 资源限制

```bash
# 限制容器资源使用
docker run -d --name karin --restart=always \
  --memory="1g" \
  --cpus="2" \
  -e TZ=Asia/Shanghai \
  -e PORT=7777 \
  -p 7777:7777 \
  -v /opt/karin:/app \
  karinjs/karin:latest
```

### 日志管理

```bash
# 限制日志大小
docker run -d --name karin --restart=always \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -e TZ=Asia/Shanghai \
  -e PORT=7777 \
  -p 7777:7777 \
  -v /opt/karin:/app \
  karinjs/karin:latest
```

## 安全建议

1. 🔒 定期备份数据目录
2. 🔒 使用强密码保护 Web UI
3. 🔒 配置防火墙规则，限制访问端口
4. 🔒 定期更新镜像到最新版本
5. 🔒 不要在生产环境使用 root 用户运行

## 相关链接

- [Docker 官方文档](https://docs.docker.com/)
- [Karin 源码仓库](https://github.com/KarinJS/Karin)
- [Docker Hub - Karin](https://hub.docker.com/r/karinjs/karin)
- [问题反馈](https://github.com/KarinJS/Karin/issues)
