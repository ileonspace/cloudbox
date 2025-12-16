# ☁️ CloudBox Classic (v3.1)

> 一个极简、优雅、无需信用卡的个人私有云盘。
>
> **设计理念**：iOS 26 概念设计 | 极光玻璃拟态 | 纯净无干扰

## ✨ 项目简介

**CloudBox Classic** 是一个基于 **Cloudflare Workers** 和 **KV (Key-Value) 存储** 构建的轻量级个人云存储系统。

它专为解决“想要一个免费、快速、临时的文件分享中转站”的需求而生。无需复杂的服务器配置，无需绑定信用卡开通 R2，仅需一个免费的 Cloudflare 账号，即可拥有一个全球加速的私人网盘。

### 核心亮点

* **无需信用卡**：基于 Cloudflare KV 免费额度构建，0 门槛部署。
* **双模式存储**：
  * **⏳ 临时模式**：文件存储 3 天后自动销毁，适合临时分享。
  * **💾 永久模式**：长期保存重要文件（受 1GB/25MB 限制）。
* **iOS 26 极光界面**：
  * 完美的玻璃拟态 (Glassmorphism) 设计。
  * 流畅的微交互动效与深色/浅色模式自适应。
  * 支持移动端完美适配。
* **极简操作**：
  * 支持批量上传、一键复制外链、重命名、删除。
  * 智能短链生成，保护隐私且美观。

## 🛠️ 技术栈 (Tech Stack)

本项目采用 **Serverless (无服务器)** 架构，前后端逻辑完全融合在单个 Worker 脚本中。

* **前端 (Frontend)**：
  * HTML5 + Vanilla JavaScript (ES6+)
  * [Tailwind CSS](https://tailwindcss.com/) (通过 CDN 引入)
  * Google Fonts (SF Pro Display, JetBrains Mono)
  * Font Awesome (图标库)
* **后端 (Backend)**：
  * [Cloudflare Workers](https://workers.cloudflare.com/) (V8 引擎边缘计算)
* **数据存储 (Database)**：
  * [Cloudflare KV](https://developers.cloudflare.com/kv/) (键值对存储)

## 🚀 部署指南 (Deployment)

只需 3 分钟，即可拥有你的专属云盘。

### 1. 准备工作

* 拥有一个 Cloudflare 账号。
* 登录 Cloudflare Dashboard。

### 2. 创建 KV 命名空间

1. 进入 **Workers & Pages** -> **KV**。
2. 点击 **Create a namespace**。
3. 输入名称：`cloudbox-kv`，点击 **Add**。

### 3. 创建 Worker

1. 进入 **Workers & Pages** -> **Overview** -> **Create Worker**。
2. 命名为 `cloudbox` (或任意名称)，点击 **Deploy**。
3. 点击 **Edit code**，进入代码编辑器。
4. **将本项目提供的 `worker.js` 代码全选复制，覆盖编辑器内的所有内容。**
5. 点击右上角 **Deploy** 保存代码。

### 4. 绑定 KV 数据库 (关键步骤)

1. 返回 Worker 的详情页，点击 **Settings** -> **Variables**。
2. 向下滚动到 **KV Namespace Bindings**。
3. 点击 **Add binding**：
   * **Variable name**: 必须填 `MY_KV` (全大写)。
   * **KV Namespace**: 选择第 2 步创建的 `cloudbox-kv`。
4. 点击 **Deploy** 保存。

### 5. 设置访问密码

1. 仍在 **Variables** 页面，找到上方的 **Environment Variables**。
2. 点击 **Add variable**：
   * **Variable name**: 必须填 `AUTH_SECRET`。
   * **Value**: 设置你的密码 (例如 `123456`)。
3. 点击 **Deploy** 保存。

### 🎉 大功告成！

访问你的 Worker URL (例如 `https://cloudbox.你的子域.workers.dev`)，即可看到极光界面。首次使用时，点击右上角的齿轮图标输入密码即可连接。

## 💡 使用说明

* **上传**：点击上传按钮或直接拖拽文件。支持批量选择。
* **列表刷新**：为了节省 KV 额度，列表默认有 20 秒缓存。如需强制刷新，可点击界面上的刷新图标。
* **外链**：点击列表中的“链接”图标即可复制直链。
  * *注意：文件名修改后，外链地址也会随之改变。*
* **限制**：
  * 单文件最大 25MB (KV 限制)。
  * 总容量 1GB (免费版 KV 限制)。

## 🤝 共同创造 (Co-Creation)

本项目遵循 **[2025.12.9 共创协议]**。

* **版本**：Classic v3.1
* **状态**：Stable (稳定版)

---
*Designed with ❤️ for a better cloud experience.*
👁️ 第二部分：渲染效果预览 (Rendered Preview)说明：以下内容是上述源码在浏览器中实际渲染出来的样子。☁️ CloudBox Classic (v3.1)一个极简、优雅、无需信用卡的个人私有云盘。设计理念：iOS 26 概念设计 | 极光玻璃拟态 | 纯净无干扰✨ 项目简介CloudBox Classic 是一个基于 Cloudflare Workers 和 KV (Key-Value) 存储 构建的轻量级个人云存储系统。它专为解决“想要一个免费、快速、临时的文件分享中转站”的需求而生。无需复杂的服务器配置，无需绑定信用卡开通 R2，仅需一个免费的 Cloudflare 账号，即可拥有一个全球加速的私人网盘。核心亮点无需信用卡：基于 Cloudflare KV 免费额度构建，0 门槛部署。双模式存储：⏳ 临时模式：文件存储 3 天后自动销毁，适合临时分享。💾 永久模式：长期保存重要文件（受 1GB/25MB 限制）。iOS 26 极光界面：完美的玻璃拟态 (Glassmorphism) 设计。流畅的微交互动效与深色/浅色模式自适应。支持移动端完美适配。极简操作：支持批量上传、一键复制外链、重命名、删除。智能短链生成，保护隐私且美观。🛠️ 技术栈 (Tech Stack)本项目采用 Serverless (无服务器) 架构，前后端逻辑完全融合在单个 Worker 脚本中。前端 (Frontend)：HTML5 + Vanilla JavaScript (ES6+)Tailwind CSS (通过 CDN 引入)Google Fonts (SF Pro Display, JetBrains Mono)Font Awesome (图标库)后端 (Backend)：Cloudflare Workers (V8 引擎边缘计算)数据存储 (Database)：Cloudflare KV (键值对存储)🚀 部署指南 (Deployment)只需 3 分钟，即可拥有你的专属云盘。1. 准备工作拥有一个 Cloudflare 账号。登录 Cloudflare Dashboard。2. 创建 KV 命名空间进入 Workers & Pages -> KV。点击 Create a namespace。输入名称：cloudbox-kv，点击 Add。3. 创建 Worker进入 Workers & Pages -> Overview -> Create Worker。命名为 cloudbox (或任意名称)，点击 Deploy。点击 Edit code，进入代码编辑器。将本项目提供的 worker.js 代码全选复制，覆盖编辑器内的所有内容。点击右上角 Deploy 保存代码。4. 绑定 KV 数据库 (关键步骤)返回 Worker 的详情页，点击 Settings -> Variables。向下滚动到 KV Namespace Bindings。点击 Add binding：Variable name: 必须填 MY_KV (全大写)。KV Namespace: 选择第 2 步创建的 cloudbox-kv。点击 Deploy 保存。5. 设置访问密码仍在 Variables 页面，找到上方的 Environment Variables。点击 Add variable：Variable name: 必须填 AUTH_SECRET。Value: 设置你的密码 (例如 123456)。点击 Deploy 保存。🎉 大功告成！访问你的 Worker URL (例如 https://cloudbox.你的子域.workers.dev)，即可看到极光界面。首次使用时，点击右上角的齿轮图标输入密码即可连接。💡 使用说明上传：点击上传按钮或直接拖拽文件。支持批量选择。列表刷新：为了节省 KV 额度，列表默认有 20 秒缓存。如需强制刷新，可点击界面上的刷新图标。外链：点击列表中的“链接”图标即可复制直链。注意：文件名修改后，外链地址也会随之改变。限制：单文件最大 25MB (KV 限制)。总容量 1GB (免费版 KV 限制)。🤝 共同创造 (Co-Creation)本项目遵循 [2025.12.9 共创协议]。版本：Classic v3.1状态：Stable (稳定版)Designed with ❤️ for a better cloud experience.
