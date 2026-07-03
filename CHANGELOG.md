# Changelog

所有重要的更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵守 [Semantic Versioning](https://semver.org/lang/zh-CN/) 版本号规范。

## [0.1.1] - 2025-07-02

### 变更 (Changed)

- **移除语法高亮功能**: 为确保与 Pylance 完全兼容，移除了自定义语法高亮功能
  - 现在完全依赖 Pylance 提供 Python 语法高亮
  - 扩展专注于提供 API 补全、文档提示等功能增强

### 新增 (Added)

#### 核心功能

- **智能代码补全系统**: 提供多层次的智能补全功能
  - 模块导入补全：输入 `import unison.` 自动列出所有可用模块
  - 模块成员补全：输入模块别名后自动提示该模块的所有函数和类
  - 类方法补全：识别变量类型后自动提示可用的方法和属性
  - 生命周期函数补全：自动补全函数定义并生成函数体模板
  - 参数自动填充：函数调用时自动生成参数占位符，方便快速填写

- **悬停提示 (Hover Documentation)**: 鼠标悬停显示完整 API 文档
  - 函数签名和完整参数列表
  - 参数类型、描述、默认值
  - 返回值类型和说明
  - 实际使用示例代码

- **签名帮助 (Signature Help)**: 函数调用时的实时参数提示
  - 显示当前函数的所有参数
  - 高亮当前正在编辑的参数位置
  - 参数类型和说明实时显示

- **API 文档浏览器**: 集成式 API 文档查看面板
  - 快捷键 `Ctrl+Shift+U` (Windows/Linux) / `Cmd+Shift+U` (Mac) 打开
  - 支持全局搜索所有 API
  - 按模块分类浏览
  - 每个 API 显示完整文档、参数、返回值、示例

#### 代码片段 (Snippets)

新增以下常用代码模板，通过前缀快速插入：

| 前缀 | 描述 |
|------|------|
| `unison-scene` | 完整场景脚本模板，包含所有生命周期函数 |
| `unison-init` | 初始化脚本模板，包含窗口创建和系统初始化 |
| `unison-main` | 主脚本模板，包含音频和UI更新 |
| `import-unison` | 导入 Unison 模块 |
| `csb-widget` | 加载 CSB UI 文件并获取节点 |
| `create-button` | 创建按钮组件并设置回调 |
| `create-text` | 创建文本组件 |
| `wwise-bank` | 加载 Wwise 音频库 |
| `wwise-event` | 触发 Wwise 音频事件 |
| `vector3` | 创建 Vector3 向量 |
| `color` | 创建颜色对象 |
| `render-scene` | 渲染场景框架代码 |
| `message-box` | 显示消息框 |
| `config-load` | 加载配置文件 |
| `vfs-read` | 从 VFS 读取文件 |
| `scene-switch` | 切换场景 |
| `anim-play` | 播放 CSB 动画 |

#### 命令 (Commands)

新增以下 VSCode 命令：

- `unison-engine.showModuleDoc`: 打开 API 文档浏览器面板
- `unison-engine.createSceneScript`: 快速创建新的场景脚本文件
- `unison-engine.createInitScript`: 快速创建初始化脚本文件

#### 配置选项

新增以下用户可配置选项：

- `unisonEngine.enableAutoCompletion`: 启用/禁用 Unison API 自动补全 (默认: `true`)
- `unisonEngine.showSignatureHelp`: 启用/禁用函数签名帮助 (默认: `true`)
- `unisonEngine.moduleDocsLanguage`: 模块文档显示语言 (默认: `zh-CN`, 可选: `en-US`)

#### 支持的模块

完整支持以下 Unison Engine 模块的文档和补全：

| 模块 | 功能描述 |
|------|----------|
| `unison.excore` | 核心引擎功能：窗口管理、日志输出、消息框、引擎控制 |
| `unison.wwise` | Wwise 音频引擎：音频库加载、事件触发、3D音效、音量控制 |
| `unison.render` | 渲染系统：场景渲染、帧率统计、渲染信息显示 |
| `unison.scene` | 场景管理：场景加载、切换、当前场景查询 |
| `unison.cocosui` | UI 系统：按钮、文本、图片、CSB加载、动画、粒子系统 |
| `unison.math3d` | 3D 数学库：Vector2/3/4、Matrix、Quaternion、Color、数学函数 |
| `unison.vfs` | 虚拟文件系统：支持从 CPK 和真实文件系统读取文件 |
| `unison.config` | 配置管理：XML 配置读写、加密解密、节点操作 |
| `unison.log` | 日志系统：分级日志输出 |
| `unison.gameobject` | 游戏对象系统：GameObject、Transform、Component |
| `unison.rendering_device` | 渲染设备：设备管理、帧大小、RID 资源标识 |
| `unison.renderer_scene` | 渲染场景：Mesh、Shader、Material、环境设置 |
| `unison.signal` | 信号系统：Callable、信号绑定 |

### 技术细节

- 扩展基于 VSCode Extension API 开发
- 使用 TypeScript 编写，编译输出为 JavaScript
- 语言配置支持 Python 语法特性（括号匹配、自动闭合、缩进规则）
- TextMate 语法规则实现自定义高亮
- 补全提供器支持触发字符：`.`、` `、`(`、`,`
- 签名帮助触发字符：`,`、`(`

### 已知限制

- 当前版本不支持跨文件类型推断（变量类型基于手动匹配）
- 文档示例为静态内容，不支持动态加载

### 未来计划

- [ ] 支持更多模块 API（待引擎更新）
- [ ] 添加类型推断功能
- [ ] 支持项目级别的模块配置识别
- [ ] 添加调试配置模板

---

## 版本号说明

- **主版本号 (Major)**: 不兼容的 API 修改
- **次版本号 (Minor)**: 向下兼容的功能性新增
- **修订号 (Patch)**: 向下兼容的问题修正