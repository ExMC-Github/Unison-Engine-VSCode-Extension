# Unison Engine VSCode Extension

[![VSCode](https://img.shields.io/badge/VSCode-1.125%2B-purple.svg)](https://code.visualstudio.com)

**Unison Engine 脚本开发扩展** - 为 Unison Engine 游戏引擎提供完整的 Python 脚本开发支持。

## 功能特性

### 智能代码补全

提供多层次、智能化的代码补全系统：

#### 模块导入补全
输入 `import unison.` 后自动列出所有可用模块，并显示模块描述：
```python
import unison.wwise as wwise    # Wwise 音频引擎
import unison.cocosui as ccui   # CocosUI 界面系统
import unison.math3d            # 3D 数学库
```

#### 模块成员补全
输入模块别名后（如 `wwise.` 或 `ccui.`），自动提示该模块的所有函数和类：
```python
wwise.load_bank()       # 加载音频库
wwise.post_event()      # 触发音频事件
wwise.set_volume()      # 设置音量
```

#### 类方法补全
根据变量类型自动提示可用的方法和属性：
```python
widget = ccui.load_csb(...)
widget.play_animation()   # 播放动画
widget.getui()            # 获取UI节点
widget.get_node()         # 按名称获取节点
```

#### 生命周期函数补全
输入 `on_` 自动提示所有生命周期函数，补全后自动生成函数体：
```python
def on_start():
    # 引擎启动时调用
    ${0}

def on_update(dt):
    # 每帧更新
    unison.render.update_logic_fps(dt)
```

#### 参数自动填充
调用函数时自动生成参数占位符，使用 Tab 键快速切换：
```python
ccui.create_button(${1:name}, ${2:x}, ${3:y}, ${4:width}, ${5:height}, ${6:text})
```

### 悬停提示 (Hover Documentation)

鼠标悬停在任何 API 上即可查看完整文档：

**显示内容：**
- 函数完整签名
- 参数列表（名称、类型、描述、默认值）
- 返回值类型和说明
- 实际使用示例代码

**示例：**
```python
# 悬停在 load_bank 上显示：
load_bank(bank_name: str) -> bool
描述: 加载音频库(.bnk文件)

参数:
- bank_name (str): 音频库名称

返回: bool - 是否成功

示例:
wwise.load_bank("bgm.bnk")
```

### 签名帮助 (Signature Help)

编写函数调用时实时显示参数帮助：

- 显示当前函数的所有参数信息
- 高亮当前正在编辑的参数
- 参数类型和说明实时更新
- 支持可选参数和默认值显示

### API 文档浏览器

集成的完整 API 文档查看系统：

**打开方式：**
- 快捷键: `Ctrl+Shift+U` (Windows/Linux) 或 `Cmd+Shift+U` (Mac)
- 命令面板: 输入 `Unison: 显示模块文档`
- 右键菜单: 在 Python 文件中右键选择

**功能：**
- **全局搜索**: 输入关键词搜索所有 API
- **模块浏览**: 点击模块按钮查看该模块所有 API
- **详细文档**: 每个函数显示完整文档、参数、返回值、示例
- **示例代码**: 可直接复制使用的代码示例

### 代码片段 (Snippets)

提供丰富的预定义代码模板：

| 前缀 | 描述 | 示例输出 |
|------|------|----------|
| `unison-scene` | 场景脚本模板 | 完整场景文件，包含 `on_scene`, `on_update`, `on_render`, `on_key`, `on_scene_leave` |
| `unison-init` | 初始化脚本 | 窗口创建、音频初始化、UI初始化 |
| `unison-main` | 主脚本模板 | 音频渲染、UI更新、键盘处理、关闭清理 |
| `import-unison` | 导入模块 | `import unison.${1:module} as ${2:alias}` |
| `csb-widget` | CSB UI加载 | 加载CSB并获取UI节点 |
| `create-button` | 创建按钮 | 按钮创建+回调设置 |
| `create-text` | 创建文本 | 文本组件创建 |
| `wwise-bank` | 加载音频库 | 加载.bnk并注册对象 |
| `wwise-event` | 触发音频事件 | `wwise.post_event(...)` |
| `vector3` | 创建向量 | `Vector3(x, y, z)` |
| `color` | 创建颜色 | `Color(r, g, b, a)` |
| `render-scene` | 渲染框架 | `begin_scene` + 渲染逻辑 + `end_scene` |
| `message-box` | 消息框 | `message_box_info/warning/error` |
| `config-load` | 加载配置 | XML配置加载+读取值 |
| `vfs-read` | VFS读取 | 从VFS或真实文件系统读取 |
| `scene-switch` | 切换场景 | `switch_scene(...)` |
| `anim-play` | 播放动画 | CSB动画播放 |

### 快捷命令

新增三个 VSCode 命令，可通过命令面板 (`Ctrl+Shift+P`) 执行：

| 命令 | 功能 |
|------|------|
| `Unison: 显示模块文档` | 打开 API 文档浏览器面板 |
| `Unison: 创建场景脚本` | 输入场景名，自动创建完整场景脚本文件 |
| `Unison: 创建初始化脚本` | 自动创建 `init.py` 初始化脚本 |

---

## 支持的模块

完整支持以下 **13 个** Unison Engine 模块的文档和智能补全：

### 核心系统

| 模块 | 推荐别名 | 功能描述 | 主要 API |
|------|----------|----------|----------|
| `unison.excore` | - | **核心引擎功能** | 窗口创建/显示/隐藏、日志输出、消息框、引擎关闭 |
| `unison.render` | render | **渲染系统** | 场景渲染开始/结束、帧率统计、渲染信息显示 |
| `unison.scene` | scene | **场景管理** | 场景加载、场景切换、当前场景查询 |

### 音频系统

| 模块 | 推荐别名 | 功能描述 | 主要 API |
|------|----------|----------|----------|
| `unison.wwise` | wwise | **Wwise 音频引擎** | 音频库加载、事件触发、3D定位、音量控制、音频渲染 |

### 界面系统

| 模块 | 推荐别名 | 功能描述 | 主要 API |
|------|----------|----------|----------|
| `unison.cocosui` | ccui | **CocosUI 界面** | 按钮、文本、图片、列表、滚动视图、CSB加载、动画、粒子 |

### 3D 数学库

| 模块 | 推荐别名 | 功能描述 | 主要类型 |
|------|----------|----------|----------|
| `unison.math3d` | math3d | **3D 数学库** | Vector2/3/4、Matrix、Quaternion、Color、Ray、Plane、Bounds |

### 数据系统

| 模块 | 推荐别名 | 功能描述 | 主要 API |
|------|----------|----------|----------|
| `unison.vfs` | vfs | **虚拟文件系统** | 文件存在检查、字节读取、文本读取、目录列表（支持CPK） |
| `unison.config` | config | **配置管理** | XML加载、加密文件、配置读写、节点操作 |

### 辅助系统

| 模块 | 推荐别名 | 功能描述 |
|------|----------|----------|
| `unison.log` | log | **日志系统** - 分级日志输出 (info/warning/error/debug) |
| `unison.gameobject` | gameobject | **游戏对象** - GameObject、Transform、Component 系统 |
| `unison.signal` | signal | **信号系统** - Callable、信号绑定与回调 |

### 渲染高级

| 模块 | 推荐别名 | 功能描述 |
|------|----------|----------|
| `unison.rendering_device` | - | **渲染设备** - 设备管理、帧大小、RID资源标识 |
| `unison.renderer_scene` | - | **渲染场景** - Mesh、Shader、Material、环境设置 |

---

## 生命周期函数

Unison Engine 脚本采用生命周期函数驱动模式，扩展提供完整的函数模板：

### 初始化脚本 (Scripts/init.py / Scripts/main.py)

```python
def on_start():
    """引擎启动时调用 - 在此创建窗口、初始化子系统"""
    # 创建窗口
    unison.excore.create_window("My Game", 1280, 720)
    # 初始化音频
    wwise.initialize('wwise')
    wwise.load_bank('Init.bnk')
    # 初始化UI
    cocosui.initialize()

def on_shutdown():
    """引擎关闭时调用 - 清理所有资源"""
    wwise.shutdown()
    cocosui.shutdown()
```

### 场景脚本 (scene/*.py)

```python
def on_scene():
    """场景加载时调用 - 初始化场景资源"""
    # 加载UI
    ccui.set_design_resolution(1280, 720)
    widget = ccui.load_csb('ui', 0, 0, 'ui/main.csb')

def on_update(dt):
    """每帧更新 - dt为帧时间(秒)"""
    unison.render.update_logic_fps(dt)
    wwise.render_audio()

def on_render():
    """每帧渲染"""
    unison.render.begin_scene(0, 0, 0, 1)
    ccui.update(1.0/60.0)
    unison.render.end_scene()

def on_key(key, state):
    """键盘输入 - key为按键名，state为True(按下)/False(释放)"""
    if state and key == "space":
        print("Space pressed")

def on_scene_leave():
    """离开场景时调用 - 清理场景特定资源"""
    ccui.remove_all_widgets()
```

---

## 安装指南

### 方式一：从 VSIX 文件安装

1. 下载 `unison-engine-0.1.0.vsix` 文件
2. 打开 VSCode
3. 按 `Ctrl+Shift+P` 打开命令面板
4. 输入 `Extensions: Install from VSIX`
5. 选择下载的 `.vsix` 文件
6. 重启 VSCode

---

## 详细使用示例

### 示例 1：完整的初始化脚本

```python
# Scripts/init.py - 引擎初始化脚本
import unison.excore
import unison.render
import unison.cocosui as cocosui
import unison.wwise as wwise
import builtins

# 窗口配置
w, h = 1280, 720
title = "My Unison Game"

# 存储到builtins供全局使用
builtins.game_width = w
builtins.game_height = h

def on_start():
    """引擎启动初始化"""
    # 创建并隐藏窗口（初始化子系统期间）
    unison.excore.create_window(title, w, h)
    unison.excore.hide_window()
    
    # 初始化音频系统
    wwise.initialize('wwise')
    wwise.add_vfs_search_path("wwise/")
    wwise.load_bank('Init.bnk')
    
    # 初始化UI系统
    cocosui.initialize()
    
    # 显示窗口
    unison.excore.show_window()
    print("Engine initialized successfully!")
```

### 示例 2：带UI交互的场景

```python
# scene/main_menu.py - 主菜单场景
import unison.render
import unison.cocosui as ccui
import unison.wwise as wwise
import unison.scene
import unison.excore

widget = None
ui = None

def on_scene():
    """场景加载"""
    global widget, ui
    
    # 设置设计分辨率
    ccui.set_design_resolution(1280, 720)
    
    # 加载CSB UI
    widget = ccui.load_csb('main_menu', 0, 0, 'ui/main_menu.csb')
    ui = widget.getui()
    
    # 播放背景音乐
    wwise.register_game_object(1, 'bgm_emitter')
    wwise.post_event('bgm_main', 1)
    
    # 设置按钮回调
    start_btn = ui['btn_start']
    start_btn.set_text('开始游戏')
    
    # 播放UI动画
    widget.play_animation('appear', 1)

def on_update(dt):
    """每帧更新"""
    unison.render.update_logic_fps(dt)
    wwise.render_audio()

def on_render():
    """渲染"""
    unison.render.begin_scene(0.05, 0.05, 0.1, 1.0)
    ccui.update(1.0/60.0)
    unison.render.end_scene()

def on_key(key, state):
    """键盘处理"""
    if state:
        if key == "escape":
            unison.excore.message_box_yesno("退出", "确定退出游戏？")
        elif key == "space":
            unison.scene.switch_scene('game')

def on_scene_leave():
    """离开场景"""
    global widget
    wwise.stop_event('bgm_main', 1)
    if widget:
        widget.destroy()
```

### 示例 3：3D数学运算

```python
# 使用 math3d 模块
import unison.math3d as math3d

def calculate_movement():
    # 创建向量
    position = math3d.Vector3(0, 10, 0)
    direction = math3d.Vector3(1, 0, 0)
    velocity = direction * 5.0
    
    # 向量运算
    distance = math3d.Vector3.distance(position, math3d.Vector3(10, 10, 0))
    normalized = velocity.normalize()
    
    # 创建旋转
    rotation = math3d.Quaternion.from_euler(0, math3d.PI/4, 0)
    rotated = rotation * direction
    
    # 创建颜色
    color = math3d.Color.from_hex(0xFF5500)  # 橙色
    
    # 数学函数
    angle = math3d.degrees(math3d.atan2(position.y, position.x))
    
    return position + velocity
```

### 示例 4：配置文件读取

```python
# 使用 config 和 vfs 模块
import unison.config as config
import unison.vfs as vfs

def load_game_settings():
    # 从VFS加载配置
    if vfs.file_exists('config/game.xml'):
        xml_content = vfs.read_file_text('config/game.xml')
        cfg = config.ConfigNode.from_xml_string(xml_content)
        
        # 读取配置值
        player_name = cfg.get('player_name', 'Player')
        volume = cfg.get_float('volume', 0.8)
        fullscreen = cfg.get_bool('fullscreen', False)
        
        return {
            'name': player_name,
            'volume': volume,
            'fullscreen': fullscreen
        }
    
    return None
```

---

## 配置选项

在 VSCode 设置 (`Ctrl+,`) 中可配置以下选项：

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `unisonEngine.enableAutoCompletion` | boolean | `true` | 启用 Unison API 自动补全 |
| `unisonEngine.showSignatureHelp` | boolean | `true` | 启用函数签名帮助提示 |
| `unisonEngine.moduleDocsLanguage` | string | `"zh-CN"` | 文档显示语言 (可选: `"en-US"`) |

---

## 开发者信息

- **开发者**: ExRFy
- **项目**: Unison Engine Extension
- **引擎**: Unison Engine

---

## 许可证

本项目采用 **BSD 3-Clause License** 许可证。
