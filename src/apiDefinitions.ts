/**
 * Unison Engine API 模块文档定义
 * 包含所有模块的函数、类、方法的详细文档
 */

export interface ApiItem {
    name: string;
    kind: 'module' | 'class' | 'function' | 'method' | 'property' | 'constant';
    signature?: string;
    description: string;
    params?: Array<{name: string; type: string; description: string; default?: string}>;
    returns?: {type: string; description: string};
    example?: string;
    module?: string;
    class?: string;
}

// 所有Unison模块的API文档
export const unisonModules: Record<string, ApiItem[]> = {
    'unison.excore': [
        {
            name: 'unison.excore',
            kind: 'module',
            description: '引擎核心功能模块，提供窗口管理、日志输出、消息框等基础功能。\n\n' +
                '这是引擎最基础的模块，必须在初始化脚本(init.py)中首先调用。\n' +
                '主要功能包括:\n' +
                '• 创建和管理游戏窗口\n' +
                '• 输出日志信息到控制台和日志文件\n' +
                '• 显示各种类型的消息框(信息、警告、错误、确认)\n' +
                '• 控制引擎的启动和关闭\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.excore\n' +
                '\n' +
                '# 创建窗口\n' +
                'unison.excore.create_window("My Game", 1280, 720)\n' +
                'unison.excore.hide_window()  # 先隐藏窗口，初始化子系统\n' +
                '# ... 初始化其他系统 ...\n' +
                'unison.excore.show_window()  # 显示窗口\n' +
                '```'
        },
        { 
            name: 'log_info', 
            kind: 'function', 
            signature: 'log_info(module: str, message: str)', 
            description: '输出INFO级别的日志信息。\n\n' +
                'INFO日志用于记录正常的程序运行信息，如初始化完成、场景加载成功等。\n' +
                '日志会输出到控制台和日志文件(如果启用了文件日志)。\n\n' +
                '参数:\n' +
                '• module: 模块名称，用于标识日志来源，建议使用简短的模块名如"Scene"、"Audio"\n' +
                '• message: 日志内容，描述性文字\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'unison.excore.log_info("Scene", "场景 main_menu 加载成功")\n' +
                'unison.excore.log_info("Game", f"玩家得分: {score}")\n' +
                '```',
            params: [{name: 'module', type: 'str', description: '模块名称，用于标识日志来源'}, {name: 'message', type: 'str', description: '日志内容'}] 
        },
        { 
            name: 'log_warning', 
            kind: 'function', 
            signature: 'log_warning(module: str, message: str)', 
            description: '输出WARNING级别的警告日志。\n\n' +
                '警告日志用于记录非致命但需要注意的问题，如配置缺失使用默认值、资源加载失败但有替代方案等。\n' +
                '警告日志通常以黄色或橙色显示。\n\n' +
                '参数:\n' +
                '• module: 模块名称\n' +
                '• message: 警告内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'unison.excore.log_warning("Config", "配置文件不存在，使用默认配置")\n' +
                'unison.excore.log_warning("Audio", f"音效文件 {sound_file} 加载失败")\n' +
                '```',
            params: [{name: 'module', type: 'str', description: '模块名称'}, {name: 'message', type: 'str', description: '警告内容'}] 
        },
        { 
            name: 'set_window_title', 
            kind: 'function', 
            signature: 'set_window_title(title: str)', 
            description: '设置游戏窗口的标题文字。\n\n' +
                '窗口标题显示在窗口顶部标题栏和任务栏中。\n' +
                '可以在游戏运行时动态修改标题，如显示当前关卡名称。\n\n' +
                '参数:\n' +
                '• title: 新的窗口标题文字\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 初始化时设置标题\n' +
                'unison.excore.set_window_title("My Game - v1.0")\n' +
                '\n' +
                '# 动态修改标题显示当前场景\n' +
                'unison.excore.set_window_title(f"My Game - {scene_name}")\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '窗口标题文字'}] 
        },
        { 
            name: 'get_window_title', 
            kind: 'function', 
            signature: 'get_window_title() -> str', 
            description: '获取当前窗口的标题文字。\n\n' +
                '返回窗口标题栏显示的文字内容。\n\n' +
                '返回值:\n' +
                '• str: 当前窗口标题\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'title = unison.excore.get_window_title()\n' +
                'print(f"当前窗口标题: {title}")\n' +
                '```',
            returns: {type: 'str', description: '当前窗口标题'} 
        },
        { 
            name: 'message_box_info', 
            kind: 'function', 
            signature: 'message_box_info(title: str, message: str)', 
            description: '显示一个信息类型的消息框。\n\n' +
                '信息消息框用于向用户显示普通信息，只有一个"确定"按钮。\n' +
                '消息框会阻塞游戏运行，直到用户点击确定按钮。\n\n' +
                '参数:\n' +
                '• title: 消息框标题\n' +
                '• message: 消息内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 显示游戏提示\n' +
                'unison.excore.message_box_info("提示", "欢迎来到游戏世界！")\n' +
                '\n' +
                '# 显示操作结果\n' +
                'unison.excore.message_box_info("保存成功", "游戏进度已保存")\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '消息框标题'}, {name: 'message', type: 'str', description: '消息内容'}] 
        },
        { 
            name: 'message_box_warning', 
            kind: 'function', 
            signature: 'message_box_warning(title: str, message: str)', 
            description: '显示一个警告类型的消息框。\n\n' +
                '警告消息框用于向用户显示需要注意的信息，通常带有警告图标。\n' +
                '只有一个"确定"按钮。\n\n' +
                '参数:\n' +
                '• title: 消息框标题\n' +
                '• message: 警告内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 显示低血量警告\n' +
                'unison.excore.message_box_warning("警告", "你的血量很低！")\n' +
                '\n' +
                '# 显示资源不足警告\n' +
                'unison.excore.message_box_warning("资源不足", "金币不足，无法购买此物品")\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '消息框标题'}, {name: 'message', type: 'str', description: '警告内容'}] 
        },
        { 
            name: 'message_box_error', 
            kind: 'function', 
            signature: 'message_box_error(title: str, message: str)', 
            description: '显示一个错误类型的消息框。\n\n' +
                '错误消息框用于向用户显示错误信息，通常带有红色错误图标。\n' +
                '适用于显示致命错误、加载失败等情况。\n\n' +
                '参数:\n' +
                '• title: 消息框标题\n' +
                '• message: 错误内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 显示加载失败\n' +
                'unison.excore.message_box_error("错误", "无法加载场景文件")\n' +
                '\n' +
                '# 显示致命错误\n' +
                'unison.excore.message_box_error("致命错误", "内存不足，游戏无法继续运行")\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '消息框标题'}, {name: 'message', type: 'str', description: '错误内容'}] 
        },
        { 
            name: 'message_box_yesno', 
            kind: 'function', 
            signature: 'message_box_yesno(title: str, message: str) -> int', 
            description: '显示一个带有"是/否"按钮的确认消息框。\n\n' +
                '用于需要用户确认的操作，如退出游戏、删除存档等。\n' +
                '返回用户的选择结果。\n\n' +
                '参数:\n' +
                '• title: 消息框标题\n' +
                '• message: 确认内容\n\n' +
                '返回值:\n' +
                '• int: 用户选择结果\n' +
                '  - 1: 用户点击了"是"(Yes/OK)\n' +
                '  - 0: 用户点击了"否"(No)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 退出确认\n' +
                'result = unison.excore.message_box_yesno("退出游戏", "确定要退出游戏吗？")\n' +
                'if result == 1:\n' +
                '    unison.excore.shutdown()\n' +
                '\n' +
                '# 删除存档确认\n' +
                'result = unison.excore.message_box_yesno("删除存档", "确定删除此存档？此操作不可撤销")\n' +
                'if result == 1:\n' +
                '    delete_save_file()\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '消息框标题'}, {name: 'message', type: 'str', description: '确认内容'}], 
            returns: {type: 'int', description: '1=是, 0=否'} 
        },
        { 
            name: 'message_box_okcancel', 
            kind: 'function', 
            signature: 'message_box_okcancel(title: str, message: str) -> int', 
            description: '显示一个带有"确定/取消"按钮的消息框。\n\n' +
                '用于需要用户确认或取消的操作，如保存更改、应用设置等。\n\n' +
                '参数:\n' +
                '• title: 消息框标题\n' +
                '• message: 消息内容\n\n' +
                '返回值:\n' +
                '• int: 用户选择结果\n' +
                '  - 1: 用户点击了"确定"(OK)\n' +
                '  - 0: 用户点击了"取消"(Cancel)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 保存更改确认\n' +
                'result = unison.excore.message_box_okcancel("保存更改", "是否保存当前更改？")\n' +
                'if result == 1:\n' +
                '    save_settings()\n' +
                'else:\n' +
                '    load_previous_settings()\n' +
                '```',
            params: [{name: 'title', type: 'str', description: '消息框标题'}, {name: 'message', type: 'str', description: '消息内容'}], 
            returns: {type: 'int', description: '1=确定, 0=取消'} 
        },
        { 
            name: 'shutdown', 
            kind: 'function', 
            signature: 'shutdown()', 
            description: '关闭游戏引擎。\n\n' +
                '调用此函数会立即停止引擎运行，触发on_shutdown生命周期函数。\n' +
                '通常在用户点击退出按钮后调用。\n\n' +
                '注意:\n' +
                '• 调用shutdown后引擎会立即开始关闭流程\n' +
                '• 确保在关闭前保存所有必要的数据\n' +
                '• on_shutdown函数会在关闭前被调用，用于清理资源\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 在键盘处理中响应ESC键退出\n' +
                'def on_key(key, state):\n' +
                '    if state and key == "escape":\n' +
                '        result = unison.excore.message_box_yesno("退出", "确定退出游戏？")\n' +
                '        if result == 1:\n' +
                '            unison.excore.shutdown()\n' +
                '```'
        },
        { 
            name: 'get_engine_running', 
            kind: 'function', 
            signature: 'get_engine_running() -> bool', 
            description: '检查引擎是否正在运行。\n\n' +
                '返回引擎当前的运行状态。在shutdown调用后返回False。\n\n' +
                '返回值:\n' +
                '• bool: True表示引擎正在运行，False表示引擎已停止或正在关闭\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 在循环中检查引擎状态\n' +
                'while unison.excore.get_engine_running():\n' +
                '    # 执行游戏逻辑\n' +
                '    process_game_logic()\n' +
                '```',
            returns: {type: 'bool', description: '运行状态'} 
        },
        { 
            name: 'create_window', 
            kind: 'function', 
            signature: 'create_window(title: str, width: int, height: int)', 
            description: '创建游戏窗口。\n\n' +
                '这是引擎初始化的第一步，必须在on_start函数中调用。\n' +
                '窗口创建后默认是可见的，建议先隐藏窗口，初始化完其他系统后再显示。\n\n' +
                '参数:\n' +
                '• title: 窗口标题文字\n' +
                '• width: 窗口宽度(像素)\n' +
                '• height: 窗口高度(像素)\n\n' +
                '推荐流程:\n' +
                '```python\n' +
                'def on_start():\n' +
                '    # 1. 创建窗口(但先隐藏)\n' +
                '    unison.excore.create_window("My Game", 1280, 720)\n' +
                '    unison.excore.hide_window()\n' +
                '    \n' +
                '    # 2. 初始化其他系统\n' +
                '    wwise.initialize("wwise")\n' +
                '    cocosui.initialize()\n' +
                '    \n' +
                '    # 3. 显示窗口\n' +
                '    unison.excore.show_window()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 窗口大小应与UI设计分辨率匹配\n' +
                '• 只能创建一个窗口，多次调用会失败',
            params: [{name: 'title', type: 'str', description: '窗口标题'}, {name: 'width', type: 'int', description: '窗口宽度'}, {name: 'height', type: 'int', description: '窗口高度'}], 
            example: 'unison.excore.create_window("My Game", 1280, 720)' 
        },
        { 
            name: 'show_window', 
            kind: 'function', 
            signature: 'show_window()', 
            description: '显示游戏窗口。\n\n' +
                '使隐藏的窗口变为可见。\n' +
                '通常在初始化完所有子系统后调用，让用户看到完整的游戏界面。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_start():\n' +
                '    unison.excore.create_window("My Game", 1280, 720)\n' +
                '    unison.excore.hide_window()\n' +
                '    # 初始化音频、UI等系统...\n' +
                '    unison.excore.show_window()  # 初始化完成后显示\n' +
                '```\n\n' +
                '注意:\n' +
                '• 如果窗口已经可见，调用此函数无效果\n' +
                '• 窗口显示时会触发窗口激活事件'
        },
        { 
            name: 'hide_window', 
            kind: 'function', 
            signature: 'hide_window()', 
            description: '隐藏游戏窗口。\n\n' +
                '使窗口不可见，但引擎仍在运行。\n' +
                '通常在窗口创建后立即调用，用于隐藏初始化过程。\n\n' +
                '使用场景:\n' +
                '• 初始化期间隐藏窗口，避免用户看到加载过程\n' +
                '• 切换场景时短暂隐藏，避免显示不完整的界面\n' +
                '• 后台运行时隐藏窗口\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建窗口后立即隐藏\n' +
                'unison.excore.create_window("My Game", 1280, 720)\n' +
                'unison.excore.hide_window()\n' +
                '```'
        },
        { 
            name: 'get_window_width', 
            kind: 'function', 
            signature: 'get_window_width() -> int', 
            description: '获取窗口的当前宽度。\n\n' +
                '返回窗口的像素宽度。\n\n' +
                '返回值:\n' +
                '• int: 窗口宽度(像素)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'width = unison.excore.get_window_width()\n' +
                'print(f"窗口宽度: {width}")\n' +
                '```',
            returns: {type: 'int', description: '窗口宽度'} 
        },
        { 
            name: 'get_window_height', 
            kind: 'function', 
            signature: 'get_window_height() -> int', 
            description: '获取窗口的当前高度。\n\n' +
                '返回窗口的像素高度。\n\n' +
                '返回值:\n' +
                '• int: 窗口高度(像素)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'height = unison.excore.get_window_height()\n' +
                'print(f"窗口高度: {height}")\n' +
                '```',
            returns: {type: 'int', description: '窗口高度'} 
        },
        { 
            name: 'enable_glass', 
            kind: 'function', 
            signature: 'enable_glass()', 
            description: '启用窗口玻璃透明效果。\n\n' +
                '启用后，窗口中纯黑色的像素会变为完全透明。\n' +
                '这样可以实现异形窗口、透明窗口等效果。\n\n' +
                '效果说明:\n' +
                '• RGB为(0,0,0)的像素会完全透明\n' +
                '• 其他颜色的像素保持正常显示\n' +
                '• 可以实现自定义形状的窗口\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建圆形窗口效果\n' +
                'unison.excore.create_window("Round Window", 400, 400)\n' +
                'unison.excore.enable_glass()\n' +
                '# 在渲染时，窗口边缘的黑色区域会透明\n' +
                '```\n\n' +
                '注意:\n' +
                '• 此功能依赖于操作系统的窗口透明支持\n' +
                '• Windows 10及以上版本支持较好'
        },
        { 
            name: 'disable_glass', 
            kind: 'function', 
            signature: 'disable_glass()', 
            description: '禁用窗口玻璃透明效果。\n\n' +
                '禁用后，所有像素(包括黑色)都会正常显示。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 切换回正常窗口模式\n' +
                'unison.excore.disable_glass()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 禁用后窗口会恢复为标准矩形窗口外观'
        }
    ],

    'unison.wwise': [
        {
            name: 'unison.wwise',
            kind: 'module',
            description: 'Wwise音频引擎集成模块，提供专业的游戏音频解决方案。\n\n' +
                'Wwise是Audiokinetic公司的专业音频中间件，支持:\n' +
                '• 音频库(Bank)加载和管理\n' +
                '• 音频事件(Event)触发和控制\n' +
                '• 3D空间音频定位\n' +
                '• 音量、状态、开关等实时控制\n' +
                '• 音频渲染和混音\n\n' +
                '初始化流程:\n' +
                '```python\n' +
                'import unison.wwise as wwise\n' +
                '\n' +
                'def on_start():\n' +
                '    # 初始化Wwise\n' +
                '    wwise.initialize("wwise")\n' +
                '    # 添加VFS搜索路径(音频文件可能打包在CPK中)\n' +
                '    wwise.add_vfs_search_path("wwise/")\n' +
                '    # 加载初始化音频库\n' +
                '    wwise.load_bank("Init.bnk")\n' +
                '    # 注册游戏对象用于3D音频\n' +
                '    wwise.register_game_object(1, "player")\n' +
                '```\n\n' +
                '每帧渲染:\n' +
                '```python\n' +
                'def on_update(dt):\n' +
                '    wwise.render_audio()  # 每帧必须调用\n' +
                '```\n\n' +
                '关闭流程:\n' +
                '```python\n' +
                'def on_shutdown():\n' +
                '    wwise.shutdown()\n' +
                '```'
        },
        { 
            name: 'initialize', 
            kind: 'function', 
            signature: 'initialize(base_path: str, vfs_paths: list = []) -> bool', 
            description: '初始化Wwise音频引擎。\n\n' +
                '必须在使用任何Wwise功能前调用此函数。\n' +
                '初始化时会加载Wwise运行时库并设置音频设备。\n\n' +
                '参数:\n' +
                '• base_path: Wwise工程的基础路径名，对应Wwise工程设置\n' +
                '• vfs_paths: VFS搜索路径列表，用于指定音频库文件的搜索路径\n\n' +
                '返回值:\n' +
                '• bool: 初始化是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 初始化Wwise\n' +
                'wwise.initialize("wwise")\n' +
                '\n' +
                '# 如果音频文件在VFS(CPK)中，添加搜索路径\n' +
                'wwise.add_vfs_search_path("wwise/")\n' +
                '\n' +
                '# 加载音频库\n' +
                'wwise.load_bank("Init.bnk")\n' +
                '```\n\n' +
                '注意:\n' +
                '• base_path应该与Wwise工程名称匹配\n' +
                '• 初始化失败通常是因为音频设备不可用',
            params: [{name: 'base_path', type: 'str', description: 'Wwise工程基础路径名'}, {name: 'vfs_paths', type: 'list', description: 'VFS搜索路径列表', default: '[]'}], 
            returns: {type: 'bool', description: '是否成功'} 
        },
        { 
            name: 'shutdown', 
            kind: 'function', 
            signature: 'shutdown()', 
            description: '关闭Wwise音频引擎。\n\n' +
                '在游戏关闭时调用，清理所有音频资源。\n' +
                '应该卸载所有音频库后再调用shutdown。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_shutdown():\n' +
                '    # 卸载所有音频库\n' +
                '    wwise.unload_all_banks()\n' +
                '    # 关闭Wwise\n' +
                '    wwise.shutdown()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 调用shutdown后所有音频停止\n' +
                '• 应在on_shutdown生命周期函数中调用'
        },
        { 
            name: 'is_initialized', 
            kind: 'function', 
            signature: 'is_initialized() -> bool', 
            description: '检查Wwise音频引擎是否已初始化。\n\n' +
                '用于在调用其他Wwise函数前检查初始化状态，避免错误。\n\n' +
                '返回值:\n' +
                '• bool: True表示已初始化，False表示未初始化\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'if wwise.is_initialized():\n' +
                '    wwise.load_bank("bgm.bnk")\n' +
                'else:\n' +
                '    print("Wwise未初始化")\n' +
                '```',
            returns: {type: 'bool', description: '初始化状态'} 
        },
        { 
            name: 'load_bank', 
            kind: 'function', 
            signature: 'load_bank(bank_name: str) -> bool', 
            description: '加载Wwise音频库(.bnk文件)。\n\n' +
                '音频库包含音频事件、音轨、效果器等定义。\n' +
                '必须先加载音频库才能触发其中的音频事件。\n\n' +
                '参数:\n' +
                '• bank_name: 音频库名称(不含.bnk后缀)或完整路径\n\n' +
                '返回值:\n' +
                '• bool: 加载是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 加载初始化库(必须首先加载)\n' +
                'wwise.load_bank("Init.bnk")\n' +
                '\n' +
                '# 加载背景音乐库\n' +
                'wwise.load_bank("bgm.bnk")\n' +
                '\n' +
                '# 加载音效库\n' +
                'wwise.load_bank("sfx.bnk")\n' +
                '```\n\n' +
                '注意:\n' +
                '• Init.bnk必须首先加载，包含全局音频设置\n' +
                '• 音频库文件可以在真实文件系统或VFS(CPK)中\n' +
                '• 加载失败的库可以尝试重新加载',
            params: [{name: 'bank_name', type: 'str', description: '音频库名称(.bnk文件)'}], 
            returns: {type: 'bool', description: '是否成功'}, 
            example: 'wwise.load_bank("bgm.bnk")' 
        },
        { 
            name: 'unload_bank', 
            kind: 'function', 
            signature: 'unload_bank(bank_name: str) -> bool', 
            description: '卸载指定的音频库。\n\n' +
                '卸载后库中的音频事件不再可用。\n' +
                '通常在切换场景或不再需要某些音频时调用。\n\n' +
                '参数:\n' +
                '• bank_name: 要卸载的音频库名称\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 离开场景时卸载场景专用音频库\n' +
                'def on_scene_leave():\n' +
                '    wwise.unload_bank("scene1_audio.bnk")\n' +
                '```\n\n' +
                '注意:\n' +
                '• 卸载库会停止该库中的所有播放音频\n' +
                '• 不要卸载Init.bnk除非关闭游戏',
            params: [{name: 'bank_name', type: 'str', description: '音频库名称'}] 
        },
        { 
            name: 'unload_all_banks', 
            kind: 'function', 
            signature: 'unload_all_banks() -> bool', 
            description: '卸载所有已加载的音频库。\n\n' +
                '在游戏关闭前调用，释放所有音频资源。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_shutdown():\n' +
                '    wwise.unload_all_banks()\n' +
                '    wwise.shutdown()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 卸载所有库后不会有任何音频播放\n' +
                '• 应在shutdown之前调用'
        },
        { 
            name: 'register_game_object', 
            kind: 'function', 
            signature: 'register_game_object(id: int, name: str = "") -> bool', 
            description: '注册游戏对象到Wwise系统。\n\n' +
                '游戏对象用于3D空间音频定位。\n' +
                '每个需要发出声音或接收声音的实体都应该注册。\n\n' +
                '参数:\n' +
                '• id: 游戏对象的唯一ID(整数)，建议使用有意义的ID如玩家=1\n' +
                '• name: 游戏对象名称(可选)，用于调试和日志\n\n' +
                '返回值:\n' +
                '• bool: 注册是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 注册玩家对象\n' +
                'wwise.register_game_object(1, "player")\n' +
                '\n' +
                '# 注册敌人对象\n' +
                'wwise.register_game_object(2, "enemy_1")\n' +
                '\n' +
                '# 设置玩家3D位置\n' +
                'wwise.set_position(1, player_x, player_y, player_z)\n' +
                '```\n\n' +
                '注意:\n' +
                '• ID必须唯一，重复注册相同ID会失败\n' +
                '• 注册后才能设置3D位置和触发3D音频\n' +
                '• 不再使用的对象应该注销',
            params: [{name: 'id', type: 'int', description: '对象唯一ID'}, {name: 'name', type: 'str', description: '对象名称', default: '""'}] 
        },
        { 
            name: 'unregister_game_object', 
            kind: 'function', 
            signature: 'unregister_game_object(id: int) -> bool', 
            description: '注销游戏对象。\n\n' +
                '当游戏对象不再需要(如敌人死亡)时调用。\n\n' +
                '参数:\n' +
                '• id: 要注销的游戏对象ID\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 敌人被消灭时注销\n' +
                'wwise.unregister_game_object(enemy_id)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 注销后该对象的3D音频停止\n' +
                '• 注销后该ID可以被重新注册',
            params: [{name: 'id', type: 'int', description: '对象ID'}] 
        },
        { 
            name: 'post_event', 
            kind: 'function', 
            signature: 'post_event(event_name: str, game_object_id: int) -> int', 
            description: '触发Wwise音频事件。\n\n' +
                '这是播放声音的主要方法。\n' +
                '事件在Wwise Authoring Application中定义。\n\n' +
                '参数:\n' +
                '• event_name: 事件名称(在Wwise中定义)\n' +
                '• game_object_id: 游戏对象ID，用于3D定位\n\n' +
                '返回值:\n' +
                '• int: 播放ID，可用于后续控制该声音\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 播放背景音乐(使用玩家对象)\n' +
                'wwise.post_event("bgm_main", 1)\n' +
                '\n' +
                '# 播放玩家跳跃音效\n' +
                'wwise.post_event("sfx_jump", 1)\n' +
                '\n' +
                '# 播放敌人攻击音效(使用敌人对象实现3D定位)\n' +
                'wwise.post_event("sfx_enemy_attack", enemy_id)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 事件必须先在音频库中定义\n' +
                '• game_object_id用于3D音频定位\n' +
                '• 返回的播放ID可用于停止特定声音',
            params: [{name: 'event_name', type: 'str', description: '事件名称'}, {name: 'game_object_id', type: 'int', description: '游戏对象ID'}], 
            returns: {type: 'int', description: '播放ID'}, 
            example: 'wwise.post_event("bgm_1", 1)' 
        },
        { 
            name: 'stop_event', 
            kind: 'function', 
            signature: 'stop_event(event_name: str, game_object_id: int, transition_time_ms: int = 0) -> bool', 
            description: '停止指定的音频事件。\n\n' +
                '可以指定过渡时间实现平滑停止。\n\n' +
                '参数:\n' +
                '• event_name: 要停止的事件名称\n' +
                '• game_object_id: 游戏对象ID\n' +
                '• transition_time_ms: 过渡时间(毫秒)，用于淡出效果\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 立即停止背景音乐\n' +
                'wwise.stop_event("bgm_main", 1, 0)\n' +
                '\n' +
                '# 淡出停止背景音乐(1秒过渡)\n' +
                'wwise.stop_event("bgm_main", 1, 1000)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 过渡时间可以根据需要设置\n' +
                '• 背景音乐建议使用淡出效果',
            params: [{name: 'event_name', type: 'str', description: '事件名称'}, {name: 'game_object_id', type: 'int', description: '游戏对象ID'}, {name: 'transition_time_ms', type: 'int', description: '过渡时间(毫秒)', default: '0'}] 
        },
        { 
            name: 'stop_all', 
            kind: 'function', 
            signature: 'stop_all(game_object_id: int = 0xFFFFFFFF) -> bool', 
            description: '停止所有正在播放的声音。\n\n' +
                '可以停止指定游戏对象的所有声音，或停止全部声音。\n\n' +
                '参数:\n' +
                '• game_object_id: 游戏对象ID，默认值表示停止所有对象的声音\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 停止所有声音\n' +
                'wwise.stop_all()\n' +
                '\n' +
                '# 只停止敌人的所有声音\n' +
                'wwise.stop_all(enemy_id)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 默认值0xFFFFFFFF表示停止所有对象\n' +
                '• 切换场景时可能需要停止所有声音',
            params: [{name: 'game_object_id', type: 'int', description: '游戏对象ID', default: '0xFFFFFFFF'}] 
        },
        { 
            name: 'set_position', 
            kind: 'function', 
            signature: 'set_position(game_object_id: int, x: float, y: float, z: float, orient_x=0, orient_y=0, orient_z=-1) -> bool', 
            description: '设置游戏对象的3D空间位置。\n\n' +
                '用于实现3D空间音频定位效果。\n' +
                '声音会根据对象与监听者的距离和方向进行衰减和定位。\n\n' +
                '参数:\n' +
                '• game_object_id: 游戏对象ID\n' +
                '• x, y, z: 3D空间坐标\n' +
                '• orient_x, orient_y, orient_z: 方向向量(可选)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 每帧更新玩家位置\n' +
                'def on_update(dt):\n' +
                '    wwise.set_position(1, player.x, player.y, player.z)\n' +
                '    wwise.set_position(enemy_id, enemy.x, enemy.y, enemy.z)\n' +
                '    wwise.render_audio()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 应每帧更新位置以实现实时3D音频\n' +
                '• 坐标单位应与游戏世界一致\n' +
                '• 方向向量用于定向声音发射',
            params: [{name: 'game_object_id', type: 'int', description: '游戏对象ID'}, {name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}, {name: 'z', type: 'float', description: 'Z坐标'}] 
        },
        { 
            name: 'set_listener_position', 
            kind: 'function', 
            signature: 'set_listener_position(x, y, z, front_x=0, front_y=0, front_z=-1, top_x=0, top_y=1, top_z=0) -> bool', 
            description: '设置音频监听者的位置。\n\n' +
                '监听者通常是玩家或摄像机。\n' +
                '所有3D声音相对于监听者进行定位。\n\n' +
                '参数:\n' +
                '• x, y, z: 监听者位置坐标\n' +
                '• front_x, front_y, front_z: 前方向向量\n' +
                '• top_x, top_y, top_z: 上方向向量\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 设置监听者位置(通常是摄像机或玩家)\n' +
                'wwise.set_listener_position(camera.x, camera.y, camera.z)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 监听者位置决定了用户"听到"声音的位置\n' +
                '• 方向向量影响声音的左右定位',
            params: [{name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}, {name: 'z', type: 'float', description: 'Z坐标'}] 
        },
        { 
            name: 'set_volume', 
            kind: 'function', 
            signature: 'set_volume(volume: float) -> bool', 
            description: '设置全局音量。\n\n' +
                '控制所有声音的总体音量。\n\n' +
                '参数:\n' +
                '• volume: 音量值，范围0.0(静音)到1.0(最大)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 设置音量为50%\n' +
                'wwise.set_volume(0.5)\n' +
                '\n' +
                '# 静音\n' +
                'wwise.set_volume(0.0)\n' +
                '\n' +
                '# 最大音量\n' +
                'wwise.set_volume(1.0)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 这是全局音量，影响所有声音\n' +
                '• 可以用于游戏设置中的音量控制',
            params: [{name: 'volume', type: 'float', description: '音量值(0.0~1.0)'}] 
        },
        { 
            name: 'get_volume', 
            kind: 'function', 
            signature: 'get_volume() -> float', 
            description: '获取当前全局音量。\n\n' +
                '返回值:\n' +
                '• float: 当前音量值(0.0~1.0)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'volume = wwise.get_volume()\n' +
                'print(f"当前音量: {volume * 100}%")\n' +
                '```',
            returns: {type: 'float', description: '音量值'} 
        },
        { 
            name: 'render_audio', 
            kind: 'function', 
            signature: 'render_audio()', 
            description: '渲染音频帧。\n\n' +
                '必须每帧调用，驱动Wwise音频引擎处理和输出声音。\n' +
                '不调用会导致声音卡顿或停止。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_update(dt):\n' +
                '    # 更新3D位置\n' +
                '    wwise.set_position(1, player.x, player.y, player.z)\n' +
                '    # 渲染音频(每帧必须调用)\n' +
                '    wwise.render_audio()\n' +
                '```\n\n' +
                '重要:\n' +
                '• 必须在on_update中每帧调用\n' +
                '• 不调用会导致音频停止\n' +
                '• 建议放在on_update末尾'
        },
        { 
            name: 'add_vfs_search_path', 
            kind: 'function', 
            signature: 'add_vfs_search_path(vfs_path: str) -> bool', 
            description: '添加VFS虚拟文件系统搜索路径。\n\n' +
                '当音频库文件打包在CPK等虚拟文件系统中时，需要添加搜索路径。\n' +
                'Wwise会在这些路径中查找.bnk文件。\n\n' +
                '参数:\n' +
                '• vfs_path: VFS中的路径，如"wwise/"或"audio/"\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 音频文件在CPK的wwise目录中\n' +
                'wwise.initialize("wwise")\n' +
                'wwise.add_vfs_search_path("wwise/")\n' +
                'wwise.load_bank("Init.bnk")\n' +
                '```\n\n' +
                '注意:\n' +
                '• 路径应与CPK中的实际目录结构匹配\n' +
                '• 可以添加多个搜索路径',
            params: [{name: 'vfs_path', type: 'str', description: 'VFS路径'}] 
        }
    ],

    'unison.render': [
        {
            name: 'unison.render',
            kind: 'module',
            description: '渲染系统模块，提供场景渲染控制。\n\n' +
                '控制每帧的渲染流程:\n' +
                '• begin_scene - 开始渲染，设置清屏颜色\n' +
                '• 渲染内容(CocosUI、自定义渲染等)\n' +
                '• end_scene - 结束渲染\n\n' +
                '基本渲染流程:\n' +
                '```python\n' +
                'import unison.render\n' +
                'import unison.cocosui as ccui\n' +
                '\n' +
                'def on_render():\n' +
                '    # 开始渲染(深蓝色背景)\n' +
                '    unison.render.begin_scene(0.05, 0.05, 0.15, 1.0)\n' +
                '    \n' +
                '    # 渲染UI\n' +
                '    ccui.update(1.0/60.0)\n' +
                '    \n' +
                '    # 结束渲染\n' +
                '    unison.render.end_scene()\n' +
                '```\n\n' +
                '帧率统计:\n' +
                '```python\n' +
                'def on_update(dt):\n' +
                '    unison.render.update_logic_fps(dt)\n' +
                '```\n\n' +
                '显示渲染信息:\n' +
                '```python\n' +
                'unison.render.show_render_info()  # 左上角显示FPS\n' +
                '```'
        },
        { 
            name: 'begin_scene', 
            kind: 'function', 
            signature: 'begin_scene(r: float = 0.0, g: float = 0.0, b: float = 0.0, a: float = 1.0)', 
            description: '开始场景渲染。\n\n' +
                '在每帧渲染的最开始调用。\n' +
                '设置清屏颜色，清除上一帧内容。\n\n' +
                '参数:\n' +
                '• r: 红色分量(0.0~1.0)\n' +
                '• g: 绿色分量(0.0~1.0)\n' +
                '• b: 蓝色分量(0.0~1.0)\n' +
                '• a: Alpha值(通常为1.0)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_render():\n' +
                '    # 黑色背景\n' +
                '    unison.render.begin_scene(0, 0, 0, 1)\n' +
                '    \n' +
                '    # 白色背景\n' +
                '    unison.render.begin_scene(1, 1, 1, 1)\n' +
                '    \n' +
                '    # 半透明背景\n' +
                '    unison.render.begin_scene(0.5, 0.5, 0.5, 0.5)\n' +
                '    \n' +
                '    # 渲染内容...\n' +
                '    unison.render.end_scene()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 必须与end_scene配对使用\n' +
                '• 颜色值范围0.0~1.0\n' +
                '• 清屏颜色应与游戏风格匹配',
            params: [{name: 'r', type: 'float', description: '红色分量', default: '0.0'}, {name: 'g', type: 'float', description: '绿色分量', default: '0.0'}, {name: 'b', type: 'float', description: '蓝色分量', default: '0.0'}, {name: 'a', type: 'float', description: '透明度', default: '1.0'}], 
            example: 'unison.render.begin_scene(0.0, 0.0, 0.0, 0.5)' 
        },
        { 
            name: 'end_scene', 
            kind: 'function', 
            signature: 'end_scene()', 
            description: '结束场景渲染。\n\n' +
                '在每帧渲染的最后调用。\n' +
                '提交渲染内容，呈现到屏幕。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_render():\n' +
                '    unison.render.begin_scene(0, 0, 0, 1)\n' +
                '    ccui.update(1.0/60.0)\n' +
                '    unison.render.end_scene()  # 呈现画面\n' +
                '```\n\n' +
                '注意:\n' +
                '• 必须在begin_scene之后调用\n' +
                '• 每帧只能调用一次end_scene\n' +
                '• 不调用会导致画面不更新'
        },
        { 
            name: 'show_render_info', 
            kind: 'function', 
            signature: 'show_render_info()', 
            description: '在屏幕左上角显示渲染信息。\n\n' +
                '显示内容包括:\n' +
                '• FPS(每秒帧数)\n' +
                '• 渲染统计信息\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 在开发阶段显示FPS\n' +
                'unison.render.show_render_info()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 通常在开发调试时启用\n' +
                '• 发布版本建议隐藏'
        },
        { 
            name: 'hide_render_info', 
            kind: 'function', 
            signature: 'hide_render_info()', 
            description: '隐藏渲染信息显示。\n\n' +
                '关闭左上角的FPS等信息显示。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 发布版本隐藏FPS\n' +
                'unison.render.hide_render_info()\n' +
                '```'
        },
        { 
            name: 'update_logic_fps', 
            kind: 'function', 
            signature: 'update_logic_fps(delta_time: float)', 
            description: '更新逻辑帧率统计。\n\n' +
                '在on_update中调用，用于计算FPS。\n\n' +
                '参数:\n' +
                '• delta_time: 帧时间(秒)，来自on_update的参数\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_update(dt):\n' +
                '    # 更新帧率统计\n' +
                '    unison.render.update_logic_fps(dt)\n' +
                '    # 更新游戏逻辑...\n' +
                '```\n\n' +
                '注意:\n' +
                '• 每帧在on_update中调用\n' +
                '• 用于FPS计算和性能监控',
            params: [{name: 'delta_time', type: 'float', description: '帧时间(秒)'}] 
        }
    ],

    'unison.scene': [
        {
            name: 'unison.scene',
            kind: 'module',
            description: '场景管理模块，提供场景加载、切换功能。\n\n' +
                '场景系统管理游戏的不同界面/关卡:\n' +
                '• 加载场景: 导入场景脚本模块并调用on_scene\n' +
                '• 切换场景: 先调用当前场景的on_scene_leave，再加载新场景\n' +
                '• 查询场景: 获取当前场景名称和路径\n\n' +
                '场景文件结构:\n' +
                '```\n' +
                'Scripts/\n' +
                '├── init.py          # 初始化脚本\n' +
                'scene/              # 场景脚本目录(与Scripts平级)\n' +
                '    ├── main_menu.py    # 主菜单场景\n' +
                '    ├── game.py         # 游戏场景\n' +
                '    └── settings.py     # 设置场景\n' +
                '```\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.scene\n' +
                '\n' +
                '# 加载初始场景\n' +
                'unison.scene.load_scene("splash")\n' +
                '\n' +
                '# 切换到主菜单\n' +
                'unison.scene.switch_scene("main_menu")\n' +
                '\n' +
                '# 获取当前场景名\n' +
                'current = unison.scene.get_current_scene()\n' +
                '```'
        },
        { 
            name: 'load_scene', 
            kind: 'function', 
            signature: 'load_scene(name: str) -> bool', 
            description: '加载指定场景。\n\n' +
                '导入场景脚本模块并调用其on_scene函数。\n' +
                '场景脚本位于 scene/{name}.py\n\n' +
                '参数:\n' +
                '• name: 场景名称(不含.py后缀)\n\n' +
                '返回值:\n' +
                '• bool: 加载是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 在初始化脚本中加载第一个场景\n' +
                'def on_start():\n' +
                '    unison.excore.create_window("Game", 1280, 720)\n' +
                '    unison.scene.load_scene("splash")\n' +
                '```\n\n' +
                '注意:\n' +
                '• load_scene不会调用当前场景的on_scene_leave\n' +
                '• 如需清理当前场景，请使用switch_scene\n' +
                '• 场景脚本必须包含on_scene函数',
            params: [{name: 'name', type: 'str', description: '场景名称'}], 
            returns: {type: 'bool', description: '是否成功'}, 
            example: 'unison.scene.load_scene("splash")' 
        },
        { 
            name: 'switch_scene', 
            kind: 'function', 
            signature: 'switch_scene(name: str) -> bool', 
            description: '切换到新场景。\n\n' +
                '先调用当前场景的on_scene_leave(清理资源)，然后加载新场景。\n' +
                '这是切换场景的标准方法。\n\n' +
                '参数:\n' +
                '• name: 目标场景名称\n\n' +
                '返回值:\n' +
                '• bool: 切换是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 在按钮点击回调中切换场景\n' +
                'def on_button_click():\n' +
                '    unison.scene.switch_scene("game")\n' +
                '\n' +
                '# 在键盘处理中切换场景\n' +
                'def on_key(key, state):\n' +
                '    if state and key == "escape":\n' +
                '        unison.scene.switch_scene("main_menu")\n' +
                '```\n\n' +
                '执行流程:\n' +
                '1. 调用当前场景的on_scene_leave\n' +
                '2. 清理当前场景的资源\n' +
                '3. 导入新场景模块\n' +
                '4. 调用新场景的on_scene\n\n' +
                '注意:\n' +
                '• 当前场景必须有on_scene_leave函数\n' +
                '• 确保在on_scene_leave中清理所有资源',
            params: [{name: 'name', type: 'str', description: '场景名称'}] 
        },
        { 
            name: 'get_current_scene', 
            kind: 'function', 
            signature: 'get_current_scene() -> str', 
            description: '获取当前场景的名称。\n\n' +
                '返回当前正在运行的场景脚本名称。\n\n' +
                '返回值:\n' +
                '• str: 当前场景名称\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'scene_name = unison.scene.get_current_scene()\n' +
                'print(f"当前场景: {scene_name}")\n' +
                '```',
            returns: {type: 'str', description: '场景名称'} 
        },
        { 
            name: 'get_scene_path', 
            kind: 'function', 
            signature: 'get_scene_path() -> str', 
            description: '获取场景脚本的搜索路径。\n\n' +
                '返回场景脚本文件的目录路径。\n\n' +
                '返回值:\n' +
                '• str: 场景脚本路径\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'path = unison.scene.get_scene_path()\n' +
                'print(f"场景脚本位于: {path}")\n' +
                '```',
            returns: {type: 'str', description: '路径'} 
        },
        { 
            name: 'is_initialized', 
            kind: 'function', 
            signature: 'is_initialized() -> bool', 
            description: '检查场景系统是否已初始化。\n\n' +
                '返回值:\n' +
                '• bool: True表示已初始化\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'if unison.scene.is_initialized():\n' +
                '    unison.scene.switch_scene("main_menu")\n' +
                '```',
            returns: {type: 'bool', description: '初始化状态'} 
        }
    ],

    'unison.cocosui': [
        {
            name: 'unison.cocosui',
            kind: 'module',
            description: 'CocosUI界面系统模块，提供UI组件创建和管理功能。\n\n' +
                'CocosUI基于Cocos2d-x UI框架，支持:\n' +
                '• 基础UI组件: Button、Text、Image、CheckBox、Slider等\n' +
                '• CSB文件加载: 加载Cocos Studio导出的UI布局\n' +
                '• 动画系统: 播放CSB动画\n' +
                '• 粒子效果: 加载和播放粒子\n' +
                '• 视频播放: 内嵌视频播放器\n\n' +
                '初始化流程:\n' +
                '```python\n' +
                'import unison.cocosui as ccui\n' +
                '\n' +
                'def on_start():\n' +
                '    ccui.initialize()  # 初始化UI系统\n' +
                '```\n\n' +
                '每帧更新:\n' +
                '```python\n' +
                'def on_render():\n' +
                '    unison.render.begin_scene(0, 0, 0, 1)\n' +
                '    ccui.update(1.0/60.0)  # 更新UI动画和交互\n' +
                '    unison.render.end_scene()\n' +
                '```\n\n' +
                '加载CSB UI:\n' +
                '```python\n' +
                'widget = ccui.load_csb("ui", 0, 0, "ui/main.csb")\n' +
                'ui = widget.getui()\n' +
                'btn = ui["start_button"]\n' +
                'btn.set_text("开始游戏")\n' +
                '```'
        },
        { 
            name: 'initialize', 
            kind: 'function', 
            signature: 'initialize() -> bool', 
            description: '初始化CocosUI管理器。\n\n' +
                '在使用任何UI功能前必须调用。\n' +
                '初始化UI渲染系统和事件处理。\n\n' +
                '返回值:\n' +
                '• bool: 初始化是否成功\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_start():\n' +
                '    ccui.initialize()\n' +
                '    ccui.set_design_resolution(1280, 720)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 必须在创建窗口后初始化\n' +
                '• 应在on_start中调用',
            returns: {type: 'bool', description: '是否成功'} 
        },
        { 
            name: 'shutdown', 
            kind: 'function', 
            signature: 'shutdown()', 
            description: '关闭CocosUI管理器。\n\n' +
                '清理所有UI资源。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_shutdown():\n' +
                '    ccui.shutdown()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 应在on_shutdown中调用\n' +
                '• 关闭后所有UI组件失效'
        },
        { 
            name: 'is_initialized', 
            kind: 'function', 
            signature: 'is_initialized() -> bool', 
            description: '检查CocosUI是否已初始化。\n\n' +
                '返回值:\n' +
                '• bool: 初始化状态\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'if ccui.is_initialized():\n' +
                '    ccui.load_csb("ui", 0, 0, "ui/main.csb")\n' +
                '```',
            returns: {type: 'bool', description: '初始化状态'} 
        },
        { 
            name: 'update', 
            kind: 'function', 
            signature: 'update(delta_time: float = 1.0/60.0)', 
            description: '更新CocosUI系统。\n\n' +
                '每帧调用，驱动UI动画、交互、渲染。\n\n' +
                '参数:\n' +
                '• delta_time: 帧时间，默认为1/60秒\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'def on_render():\n' +
                '    unison.render.begin_scene(0, 0, 0, 1)\n' +
                '    ccui.update(1.0/60.0)  # 每帧更新UI\n' +
                '    unison.render.end_scene()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 必须在begin_scene和end_scene之间调用\n' +
                '• 每帧必须调用一次',
            params: [{name: 'delta_time', type: 'float', description: '帧时间', default: '1.0/60.0'}] 
        },
        { 
            name: 'set_design_resolution', 
            kind: 'function', 
            signature: 'set_design_resolution(width: float, height: float)', 
            description: '设置UI设计分辨率。\n\n' +
                '定义UI的基准分辨率，用于适配不同屏幕尺寸。\n' +
                '应与窗口大小和CSB设计尺寸匹配。\n\n' +
                '参数:\n' +
                '• width: 设计宽度\n' +
                '• height: 设计高度\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 设置设计分辨率(与窗口大小匹配)\n' +
                'ccui.set_design_resolution(1280, 720)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 应在initialize后立即设置\n' +
                '• 应与CSB文件的设计分辨率一致',
            params: [{name: 'width', type: 'float', description: '宽度'}, {name: 'height', type: 'float', description: '高度'}] 
        },
        { 
            name: 'get_dpi_scale_x', 
            kind: 'function', 
            signature: 'get_dpi_scale_x() -> float', 
            description: '获取水平方向的DPI缩放因子。\n\n' +
                '用于计算实际渲染时的坐标缩放。\n\n' +
                '返回值:\n' +
                '• float: 水平缩放因子\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'scale_x = ccui.get_dpi_scale_x()\n' +
                'actual_x = design_x * scale_x\n' +
                '```',
            returns: {type: 'float', description: '缩放因子'} 
        },
        { 
            name: 'get_dpi_scale_y', 
            kind: 'function', 
            signature: 'get_dpi_scale_y() -> float', 
            description: '获取垂直方向的DPI缩放因子。\n\n' +
                '返回值:\n' +
                '• float: 垂直缩放因子\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'scale_y = ccui.get_dpi_scale_y()\n' +
                'actual_y = design_y * scale_y\n' +
                '```',
            returns: {type: 'float', description: '缩放因子'} 
        },
        { 
            name: 'create_button', 
            kind: 'function', 
            signature: 'create_button(name: str, x: float, y: float, width: float, height: float, text: str = "") -> Button', 
            description: '创建按钮组件。\n\n' +
                '创建一个可点击的按钮UI组件。\n\n' +
                '参数:\n' +
                '• name: 组件名称(用于查找)\n' +
                '• x, y: 位置坐标\n' +
                '• width, height: 尺寸\n' +
                '• text: 按钮文字\n\n' +
                '返回值:\n' +
                '• Button: 按钮对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建按钮\n' +
                'btn = ccui.create_button("start_btn", 100, 200, 200, 50, "开始游戏")\n' +
                'btn.set_click_callback(on_start_click)\n' +
                '```',
            params: [{name: 'name', type: 'str', description: '组件名'}, {name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}, {name: 'width', type: 'float', description: '宽度'}, {name: 'height', type: 'float', description: '高度'}, {name: 'text', type: 'str', description: '按钮文本', default: '""'}], 
            returns: {type: 'Button', description: '按钮对象'} 
        },
        { 
            name: 'create_text', 
            kind: 'function', 
            signature: 'create_text(name: str, x: float, y: float, font_size: float, text: str = "") -> Text', 
            description: '创建文本组件。\n\n' +
                '创建一个显示文字的UI组件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置坐标\n' +
                '• font_size: 字体大小\n' +
                '• text: 文本内容\n\n' +
                '返回值:\n' +
                '• Text: 文本对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建标题文本\n' +
                'title = ccui.create_text("title", 400, 50, 32, "游戏标题")\n' +
                '\n' +
                '# 创建分数显示\n' +
                'score_text = ccui.create_text("score", 100, 100, 24, "分数: 0")\n' +
                '```',
            params: [{name: 'name', type: 'str', description: '组件名'}, {name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}, {name: 'font_size', type: 'float', description: '字体大小'}, {name: 'text', type: 'str', description: '文本内容', default: '""'}], 
            returns: {type: 'Text', description: '文本对象'} 
        },
        { 
            name: 'create_text_with_font', 
            kind: 'function', 
            signature: 'create_text_with_font(name, x, y, font_size, text, font_path) -> Text', 
            description: '创建使用自定义字体的文本组件。\n\n' +
                '支持加载TTF等字体文件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• font_size: 字体大小\n' +
                '• text: 文本内容\n' +
                '• font_path: 字体文件路径\n\n' +
                '返回值:\n' +
                '• Text: 文本对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 使用引擎自带字体\n' +
                'text = ccui.create_text_with_font("title", 100, 50, 32, "标题", "fonts/arial.ttf")\n' +
                '```',
            returns: {type: 'Text', description: '文本对象'} 
        },
        { 
            name: 'create_image', 
            kind: 'function', 
            signature: 'create_image(name: str, x: float, y: float, width: float, height: float, texture_path: str = "") -> Image', 
            description: '创建图片组件。\n\n' +
                '显示纹理图片的UI组件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width, height: 尺寸\n' +
                '• texture_path: 图片文件路径(png/jpg)\n\n' +
                '返回值:\n' +
                '• Image: 图片对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建背景图片\n' +
                'bg = ccui.create_image("bg", 0, 0, 1280, 720, "images/bg.png")\n' +
                '```',
            returns: {type: 'Image', description: '图片对象'} 
        },
        { 
            name: 'create_checkbox', 
            kind: 'function', 
            signature: 'create_checkbox(name: str, x: float, y: float) -> CheckBox', 
            description: '创建复选框组件。\n\n' +
                '可选中/取消选中的UI组件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n\n' +
                '返回值:\n' +
                '• CheckBox: 复选框对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建音效开关复选框\n' +
                'sfx_checkbox = ccui.create_checkbox("sfx_enable", 100, 200)\n' +
                '```',
            returns: {type: 'CheckBox', description: '复选框对象'} 
        },
        { 
            name: 'create_slider', 
            kind: 'function', 
            signature: 'create_slider(name: str, x: float, y: float, width: float) -> Slider', 
            description: '创建滑动条组件。\n\n' +
                '用于调节数值(如音量)。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width: 滑动条宽度\n\n' +
                '返回值:\n' +
                '• Slider: 滑动条对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建音量滑动条\n' +
                'volume_slider = ccui.create_slider("volume", 100, 300, 200)\n' +
                '```',
            returns: {type: 'Slider', description: '滑动条对象'} 
        },
        { 
            name: 'create_text_field', 
            kind: 'function', 
            signature: 'create_text_field(name, x, y, width, height, placeholder="") -> TextField', 
            description: '创建文本输入框组件。\n\n' +
                '用于用户输入文字。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width, height: 尺寸\n' +
                '• placeholder: 占位提示文字\n\n' +
                '返回值:\n' +
                '• TextField: 输入框对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建用户名输入框\n' +
                'name_input = ccui.create_text_field("username", 100, 200, 200, 40, "输入用户名")\n' +
                '```',
            returns: {type: 'TextField', description: '文本框对象'} 
        },
        { 
            name: 'create_progress_bar', 
            kind: 'function', 
            signature: 'create_progress_bar(name, x, y, width, height) -> ProgressBar', 
            description: '创建进度条组件。\n\n' +
                '显示进度值(如加载进度、血量)。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width, height: 尺寸\n\n' +
                '返回值:\n' +
                '• ProgressBar: 进度条对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建血量进度条\n' +
                'hp_bar = ccui.create_progress_bar("hp", 100, 50, 200, 20)\n' +
                '```',
            returns: {type: 'ProgressBar', description: '进度条对象'} 
        },
        { 
            name: 'create_video_player', 
            kind: 'function', 
            signature: 'create_video_player(name, x, y, width, height) -> VideoPlayer', 
            description: '创建视频播放器组件。\n\n' +
                '在UI中播放视频文件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width, height: 尺寸\n\n' +
                '返回值:\n' +
                '• VideoPlayer: 视频播放器对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建视频播放器\n' +
                'video = ccui.create_video_player("intro", 0, 0, 1280, 720)\n' +
                '```',
            returns: {type: 'VideoPlayer', description: '视频播放器对象'} 
        },
        { 
            name: 'create_particle', 
            kind: 'function', 
            signature: 'create_particle(name: str, x: float, y: float, plist_path: str) -> Particle', 
            description: '创建粒子系统组件。\n\n' +
                '加载.plist粒子效果文件。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 粒子发射位置\n' +
                '• plist_path: 粒子plist文件路径\n\n' +
                '返回值:\n' +
                '• Particle: 粒子对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建火焰粒子效果\n' +
                'fire = ccui.create_particle("fire", 500, 300, "particles/fire.plist")\n' +
                '```',
            params: [{name: 'plist_path', type: 'str', description: '粒子plist文件路径'}], 
            returns: {type: 'Particle', description: '粒子对象'} 
        },
        { 
            name: 'load_csb', 
            kind: 'function', 
            signature: 'load_csb(name: str, x: float, y: float, csb_path: str) -> CSBWidget', 
            description: '加载Cocos Studio导出的CSB UI文件。\n\n' +
                '这是加载复杂UI布局的主要方式。\n' +
                'CSB文件包含UI布局、动画、资源引用。\n\n' +
                '参数:\n' +
                '• name: 组件名称(用于管理)\n' +
                '• x, y: 显示位置\n' +
                '• csb_path: CSB文件路径\n\n' +
                '返回值:\n' +
                '• CSBWidget: CSB组件对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 加载主菜单UI\n' +
                'widget = ccui.load_csb("main_menu", 0, 0, "ui/main_menu.csb")\n' +
                '\n' +
                '# 获取UI节点容器\n' +
                'ui = widget.getui()\n' +
                '\n' +
                '# 访问节点\n' +
                'btn = ui["start_button"]\n' +
                'btn.set_text("开始游戏")\n' +
                '\n' +
                '# 播放动画\n' +
                'widget.play_animation("appear", 1)\n' +
                '```\n\n' +
                '注意:\n' +
                '• CSB文件可以在真实文件系统或VFS中\n' +
                '• 使用getui()获取节点后可以修改UI内容',
            params: [{name: 'name', type: 'str', description: '组件名'}, {name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}, {name: 'csb_path', type: 'str', description: 'CSB文件路径'}], 
            returns: {type: 'CSBWidget', description: 'CSB组件对象'}, 
            example: 'widget = ccui.load_csb("ui", 0, 0, "ui/main.csb")' 
        },
        { 
            name: 'load_csb_with_size', 
            kind: 'function', 
            signature: 'load_csb_with_size(name, x, y, width, height, csb_path) -> CSBWidget', 
            description: '加载CSB文件并指定显示尺寸。\n\n' +
                '用于需要手动控制CSB显示大小的场景。\n\n' +
                '参数:\n' +
                '• name: 组件名称\n' +
                '• x, y: 位置\n' +
                '• width, height: 显示尺寸\n' +
                '• csb_path: CSB文件路径\n\n' +
                '返回值:\n' +
                '• CSBWidget: CSB组件对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'widget = ccui.load_csb_with_size("ui", 0, 0, 640, 360, "ui/hud.csb")\n' +
                '```',
            returns: {type: 'CSBWidget', description: 'CSB组件对象'} 
        },
        { 
            name: 'remove_widget', 
            kind: 'function', 
            signature: 'remove_widget(widget: Widget) -> bool', 
            description: '移除指定的UI组件。\n\n' +
                '从UI系统中移除并销毁组件。\n\n' +
                '参数:\n' +
                '• widget: 要移除的组件对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 移除单个组件\n' +
                'ccui.remove_widget(button)\n' +
                '```\n\n' +
                '注意:\n' +
                '• 移除后组件对象失效\n' +
                '• 不要再次使用已移除的组件',
            params: [{name: 'widget', type: 'Widget', description: '要移除的组件'}] 
        },
        { 
            name: 'remove_all_widgets', 
            kind: 'function', 
            signature: 'remove_all_widgets()', 
            description: '移除所有UI组件。\n\n' +
                '清空所有已创建的UI组件。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 离开场景时清空UI\n' +
                'def on_scene_leave():\n' +
                '    ccui.remove_all_widgets()\n' +
                '```\n\n' +
                '注意:\n' +
                '• 通常在切换场景时调用\n' +
                '• 所有组件都会被销毁'
        },
        // Widget类
        { 
            name: 'Widget', 
            kind: 'class', 
            module: 'unison.cocosui', 
            description: 'UI组件基类。\n\n' +
                '所有UI组件(Button、Text、Image等)都继承自Widget。\n' +
                '提供通用的位置、尺寸、可见性、颜色等属性和方法。\n\n' +
                '主要功能:\n' +
                '• 位置和尺寸控制\n' +
                '• 可见性控制\n' +
                '• 颜色设置\n' +
                '• 旋转变换\n' +
                '• 子组件管理\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'widget.set_position(100, 200)\n' +
                'widget.set_visible(True)\n' +
                'widget.set_color(1, 0, 0, 1)  # 红色\n' +
                '```'
        },
        { name: 'get_id', kind: 'method', class: 'Widget', signature: 'get_id() -> int', description: '获取组件的唯一ID。\n\n返回值:\n• int: 组件ID' },
        { name: 'get_name', kind: 'method', class: 'Widget', signature: 'get_name() -> str', description: '获取组件名称。\n\n返回值:\n• str: 创建时设置的组件名称' },
        { name: 'get_type', kind: 'method', class: 'Widget', signature: 'get_type() -> str', description: '获取组件类型字符串。\n\n返回值:\n• str: 类型名如"Button"、"Text"等' },
        { name: 'destroy', kind: 'method', class: 'Widget', signature: 'destroy()', description: '销毁组件。\n\n销毁后组件不再有效，不应再使用。\n\n使用示例:\n```python\nwidget.destroy()\n```' },
        { name: 'set_position', kind: 'method', class: 'Widget', signature: 'set_position(x: float, y: float)', description: '设置组件位置。\n\n参数:\n• x: X坐标\n• y: Y坐标\n\n使用示例:\n```python\nwidget.set_position(100, 200)\n```', params: [{name: 'x', type: 'float', description: 'X坐标'}, {name: 'y', type: 'float', description: 'Y坐标'}] },
        { name: 'get_position', kind: 'method', class: 'Widget', signature: 'get_position() -> tuple', description: '获取组件位置。\n\n返回值:\n• tuple: (x, y)坐标' },
        { name: 'set_size', kind: 'method', class: 'Widget', signature: 'set_size(width: float, height: float)', description: '设置组件尺寸。\n\n参数:\n• width: 宽度\n• height: 高度' },
        { name: 'get_size', kind: 'method', class: 'Widget', signature: 'get_size() -> tuple', description: '获取组件尺寸。\n\n返回值:\n• tuple: (width, height)' },
        { name: 'set_visible', kind: 'method', class: 'Widget', signature: 'set_visible(visible: bool)', description: '设置组件可见性。\n\n参数:\n• visible: True显示，False隐藏\n\n使用示例:\n```python\n# 隐藏组件\nwidget.set_visible(False)\n```' },
        { name: 'is_visible', kind: 'method', class: 'Widget', signature: 'is_visible() -> bool', description: '检查组件是否可见。\n\n返回值:\n• bool: 可见状态' },
        { name: 'set_color', kind: 'method', class: 'Widget', signature: 'set_color(r: float, g: float, b: float, a: float = 1.0)', description: '设置组件颜色。\n\n参数:\n• r, g, b: RGB颜色分量(0~1)\n• a: Alpha透明度(0~1)\n\n使用示例:\n```python\nwidget.set_color(1, 0, 0, 1)  # 红色不透明\nwidget.set_color(0.5, 0.5, 0.5, 0.5)  # 半透明灰色\n```' },
        { name: 'set_rotation', kind: 'method', class: 'Widget', signature: 'set_rotation(angle: float)', description: '设置组件旋转角度。\n\n参数:\n• angle: 旋转角度(度数)\n\n使用示例:\n```python\nwidget.set_rotation(45)  # 旋转45度\n```' },
        { name: 'get_rotation', kind: 'method', class: 'Widget', signature: 'get_rotation() -> float', description: '获取旋转角度。\n\n返回值:\n• float: 当前旋转角度' },
        { name: 'set_enabled', kind: 'method', class: 'Widget', signature: 'set_enabled(enabled: bool)', description: '设置组件启用状态。\n\n参数:\n• enabled: True启用可交互，False禁用\n\n使用示例:\n```python\nbtn.set_enabled(False)  # 禁用按钮\n```' },
        { name: 'is_enabled', kind: 'method', class: 'Widget', signature: 'is_enabled() -> bool', description: '检查组件是否启用。\n\n返回值:\n• bool: 启用状态' },
        { name: 'add_child', kind: 'method', class: 'Widget', signature: 'add_child(child: Widget)', description: '添加子组件。\n\n参数:\n• child: 子组件对象' },
        { name: 'remove_child', kind: 'method', class: 'Widget', signature: 'remove_child(child: Widget)', description: '移除子组件。\n\n参数:\n• child: 子组件对象' },
        { name: 'remove_all_children', kind: 'method', class: 'Widget', signature: 'remove_all_children()', description: '移除所有子组件。' },
        // CSBWidget类
        { 
            name: 'CSBWidget', 
            kind: 'class', 
            module: 'unison.cocosui', 
            description: 'CSB文件加载后的组件类。\n\n' +
                '继承自Widget，增加CSB特有功能:\n' +
                '• 动画播放控制\n' +
                '• 内部节点访问\n' +
                '• UI节点容器获取\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 加载CSB\n' +
                'widget = ccui.load_csb("ui", 0, 0, "ui/main.csb")\n' +
                '\n' +
                '# 获取UI节点容器\n' +
                'ui = widget.getui()\n' +
                'btn = ui["start_button"]\n' +
                '\n' +
                '# 播放动画\n' +
                'widget.play_animation("appear", 1)\n' +
                '```'
        },
        { 
            name: 'play_animation', 
            kind: 'method', 
            class: 'CSBWidget', 
            signature: 'play_animation(anim_name: str, loops: int = -1) -> CSBAnimation', 
            description: '播放CSB内定义的动画。\n\n' +
                '动画在Cocos Studio中编辑并导出到CSB文件。\n\n' +
                '参数:\n' +
                '• anim_name: 动画名称\n' +
                '• loops: 循环次数\n' +
                '  - -1: 无限循环\n' +
                '  - 0: 停止动画\n' +
                '  - N: 播放N次\n\n' +
                '返回值:\n' +
                '• CSBAnimation: 动画对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 播放出现动画(一次)\n' +
                'widget.play_animation("appear", 1)\n' +
                '\n' +
                '# 播放循环动画\n' +
                'widget.play_animation("idle", -1)\n' +
                '\n' +
                '# 停止动画\n' +
                'widget.play_animation("", 0)\n' +
                '```',
            returns: {type: 'CSBAnimation', description: '动画对象'} 
        },
        { name: 'stop_animation', kind: 'method', class: 'CSBWidget', signature: 'stop_animation()', description: '停止当前播放的动画。' },
        { name: 'pause_animation', kind: 'method', class: 'CSBWidget', signature: 'pause_animation()', description: '暂停动画播放。' },
        { name: 'resume_animation', kind: 'method', class: 'CSBWidget', signature: 'resume_animation()', description: '恢复暂停的动画。' },
        { name: 'is_animation_playing', kind: 'method', class: 'CSBWidget', signature: 'is_animation_playing() -> bool', description: '检查动画是否正在播放。\n\n返回值:\n• bool: 播放状态' },
        { 
            name: 'get_node', 
            kind: 'method', 
            class: 'CSBWidget', 
            signature: 'get_node(node_name: str) -> UINode', 
            description: '通过名称获取CSB内部的UI节点。\n\n' +
                '节点名在Cocos Studio中设置。\n\n' +
                '参数:\n' +
                '• node_name: 节点名称\n\n' +
                '返回值:\n' +
                '• UINode: 节点对象，可用于修改属性\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 获取按钮节点\n' +
                'btn_node = widget.get_node("start_button")\n' +
                'btn_node.set_text("开始")\n' +
                '```',
            params: [{name: 'node_name', type: 'str', description: '节点名称'}] 
        },
        { name: 'get_all_nodes', kind: 'method', class: 'CSBWidget', signature: 'get_all_nodes() -> list', description: '获取CSB内部所有节点。\n\n返回值:\n• list: UINode列表' },
        { name: 'get_all_node_names', kind: 'method', class: 'CSBWidget', signature: 'get_all_node_names() -> list', description: '获取所有节点名称列表。\n\n返回值:\n• list: 名称字符串列表' },
        { name: 'has_node', kind: 'method', class: 'CSBWidget', signature: 'has_node(node_name: str) -> bool', description: '检查节点是否存在。\n\n返回值:\n• bool: 存在返回True' },
        { name: 'get_node_count', kind: 'method', class: 'CSBWidget', signature: 'get_node_count() -> int', description: '获取节点总数。\n\n返回值:\n• int: 节点数量' },
        { 
            name: 'getui', 
            kind: 'method', 
            class: 'CSBWidget', 
            signature: 'getui() -> CSBUIResult', 
            description: '获取UI节点容器。\n\n' +
                '返回一个可通过名称访问节点的容器对象。\n' +
                '使用容器可以更方便地访问和修改CSB内部节点。\n\n' +
                '返回值:\n' +
                '• CSBUIResult: UI容器，支持ui["name"]访问\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'ui = widget.getui()\n' +
                '\n' +
                '# 通过名称获取节点\n' +
                'btn = ui["start_button"]\n' +
                'btn.set_text("开始游戏")\n' +
                '\n' +
                '# 获取文本节点\n' +
                'title = ui["title_label"]\n' +
                'title.set_text("游戏标题")\n' +
                '\n' +
                '# 获取图片节点\n' +
                'img = ui["avatar_image"]\n' +
                'img.set_texture("images/hero.png")\n' +
                '```',
            returns: {type: 'CSBUIResult', description: 'UI容器'} 
        },
        // UINode类
        { 
            name: 'UINode', 
            kind: 'class', 
            module: 'unison.cocosui', 
            description: 'CSB内部节点包装类。\n\n' +
                '通过get_node或getui获取的节点都是UINode类型。\n' +
                '提供修改节点属性的方法。\n\n' +
                '支持的操作:\n' +
                '• 文本设置(Label/Text类型)\n' +
                '• 可见性控制\n' +
                '• 位置调整\n' +
                '• 颜色修改\n' +
                '• 纹理更换(Image类型)\n' +
                '• 复选框状态(CheckBox类型)\n' +
                '• 滑动条值(Slider类型)\n' +
                '• 进度条值(ProgressBar类型)'
        },
        { name: 'get_name', kind: 'method', class: 'UINode', signature: 'get_name() -> str', description: '获取节点名称。\n\n返回值:\n• str: 节点名称' },
        { name: 'get_type', kind: 'method', class: 'UINode', signature: 'get_type() -> str', description: '获取节点类型。\n\n返回值:\n• str: 类型名如"Label"、"Button"、"Sprite"等' },
        { name: 'is_valid', kind: 'method', class: 'UINode', signature: 'is_valid() -> bool', description: '检查节点是否有效。\n\n返回值:\n• bool: 有效返回True' },
        { name: 'set_text', kind: 'method', class: 'UINode', signature: 'set_text(text: str)', description: '设置文本内容。\n\n适用于Label、Text、Button等文本类型节点。\n\n参数:\n• text: 新文本内容' },
        { name: 'get_text', kind: 'method', class: 'UINode', signature: 'get_text() -> str', description: '获取文本内容。\n\n返回值:\n• str: 当前文本' },
        { name: 'set_font_size', kind: 'method', class: 'UINode', signature: 'set_font_size(font_size: float)', description: '设置字体大小。\n\n适用于文本类型节点。\n\n参数:\n• font_size: 字体大小' },
        { name: 'set_visible', kind: 'method', class: 'UINode', signature: 'set_visible(visible: bool)', description: '设置节点可见性。\n\n参数:\n• visible: True显示，False隐藏' },
        { name: 'set_position', kind: 'method', class: 'UINode', signature: 'set_position(x: float, y: float)', description: '设置节点位置。\n\n参数:\n• x: X坐标\n• y: Y坐标' },
        { name: 'set_color', kind: 'method', class: 'UINode', signature: 'set_color(r, g, b, a=1.0)', description: '设置节点颜色。\n\n参数:\n• r, g, b: RGB分量\n• a: Alpha透明度' },
        { name: 'set_texture', kind: 'method', class: 'UINode', signature: 'set_texture(texture_path: str)', description: '设置纹理图片。\n\n适用于Image/Sprite类型节点。\n\n参数:\n• texture_path: 图片文件路径' },
        { name: 'set_selected', kind: 'method', class: 'UINode', signature: 'set_selected(selected: bool)', description: '设置选中状态。\n\n适用于CheckBox类型节点。\n\n参数:\n• selected: True选中，False取消' },
        { name: 'set_percent', kind: 'method', class: 'UINode', signature: 'set_percent(percent: float)', description: '设置百分比值。\n\n适用于Slider类型节点。\n\n参数:\n• percent: 值(0.0~1.0)' },
        { name: 'set_progress', kind: 'method', class: 'UINode', signature: 'set_progress(percent: float)', description: '设置进度值。\n\n适用于ProgressBar类型节点。\n\n参数:\n• percent: 进度(0.0~1.0)' },
        // Text类
        { 
            name: 'Text', 
            kind: 'class', 
            module: 'unison.cocosui', 
            description: '文本组件类。\n\n' +
                '用于显示文字内容。\n' +
                '支持字体大小、对齐方式等设置。'
        },
        { name: 'set_content', kind: 'method', class: 'Text', signature: 'set_content(text: str)', description: '设置文本内容。\n\n参数:\n• text: 文本字符串' },
        { name: 'get_content', kind: 'method', class: 'Text', signature: 'get_content() -> str', description: '获取文本内容。\n\n返回值:\n• str: 文本字符串' },
        { name: 'set_font_size', kind: 'method', class: 'Text', signature: 'set_font_size(size: float)', description: '设置字体大小。\n\n参数:\n• size: 字体大小' },
        { name: 'get_font_size', kind: 'method', class: 'Text', signature: 'get_font_size() -> float', description: '获取字体大小。\n\n返回值:\n• float: 字体大小' },
        { name: 'set_halign', kind: 'method', class: 'Text', signature: 'set_halign(align: int)', description: '设置水平对齐方式。\n\n参数:\n• align: 对齐方式\n  - 0: 左对齐\n  - 1: 居中\n  - 2: 右对齐' },
        { name: 'set_valign', kind: 'method', class: 'Text', signature: 'set_valign(align: int)', description: '设置垂直对齐方式。\n\n参数:\n• align: 对齐方式\n  - 0: 上对齐\n  - 1: 居中\n  - 2: 下对齐' },
        // Button类
        { 
            name: 'Button', 
            kind: 'class', 
            module: 'unison.cocosui', 
            description: '按钮组件类。\n\n' +
                '可点击交互的UI组件。\n' +
                '支持文本显示和点击回调。'
        },
        { name: 'set_text', kind: 'method', class: 'Button', signature: 'set_text(text: str)', description: '设置按钮文本。\n\n参数:\n• text: 文字内容' },
        { name: 'get_text', kind: 'method', class: 'Button', signature: 'get_text() -> str', description: '获取按钮文本。\n\n返回值:\n• str: 文字内容' },
        { name: 'set_click_callback', kind: 'method', class: 'Button', signature: 'set_click_callback(callback: callable)', description: '设置点击回调函数。\n\n参数:\n• callback: 回调函数，点击时调用\n\n使用示例:\n```python\ndef on_click():\n    print("按钮被点击")\n\nbtn.set_click_callback(on_click)\n```' }
    ],

    'unison.math3d': [
        {
            name: 'unison.math3d',
            kind: 'module',
            description: '3D数学库模块，提供向量、矩阵、四元数、颜色等数学类型和函数。\n\n' +
                '主要类型:\n' +
                '• Vector2/3/4: 二维/三维/四维向量\n' +
                '• Matrix: 4x4变换矩阵\n' +
                '• Quaternion: 四元数旋转表示\n' +
                '• Color: RGBA颜色\n' +
                '• Ray/Plane/Bounds: 几何工具类\n\n' +
                '数学函数:\n' +
                '• 三角函数: sin, cos, tan等\n' +
                '• 插值函数: lerp, smooth_step等\n' +
                '• 随机函数: random_range等\n' +
                '• 其他: clamp, sqrt, pow等\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.math3d as math3d\n' +
                '\n' +
                '# 创建向量\n' +
                'pos = math3d.Vector3(100, 50, 0)\n' +
                'dir = math3d.Vector3(1, 0, 0)\n' +
                '\n' +
                '# 向量运算\n' +
                'distance = math3d.Vector3.distance(pos, target)\n' +
                'normalized = dir.normalize()\n' +
                '\n' +
                '# 创建旋转\n' +
                'rot = math3d.Quaternion.from_euler(0, 90, 0)\n' +
                '\n' +
                '# 创建颜色\n' +
                'color = math3d.Color.from_hex(0xFF5500)\n' +
                '```'
        },
        // 常量
        { name: 'EPSILON', kind: 'constant', description: '最小浮点数差值(约1e-6)，用于浮点数比较。\n\n使用示例:\n```python\nif abs(a - b) < math3d.EPSILON:\n    print("a和b相等")\n```' },
        { name: 'PI', kind: 'constant', description: '圆周率π(约3.14159)。\n\n使用示例:\n```python\nangle = math3d.PI / 4  # 45度\n```' },
        { name: 'HALF_PI', kind: 'constant', description: 'π/2(约1.5708)，90度。' },
        { name: 'TWO_PI', kind: 'constant', description: '2π(约6.28318)，360度。' },
        { name: 'DEG_TO_RAD', kind: 'constant', description: '角度转弧度系数(π/180)。\n\n使用示例:\n```python\nrad = 90 * math3d.DEG_TO_RAD  # 90度转弧度\n```' },
        { name: 'RAD_TO_DEG', kind: 'constant', description: '弧度转角度系数(180/π)。\n\n使用示例:\n```python\ndeg = math3d.PI * math3d.RAD_TO_DEG  # π弧度转角度\n```' },
        // Vector2类
        { 
            name: 'Vector2', 
            kind: 'class', 
            module: 'unison.math3d', 
            description: '二维向量类。\n\n' +
                '表示2D空间中的点或方向。\n' +
                '支持向量运算: 加减、缩放、点积、叉积、归一化等。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'v1 = math3d.Vector2(3, 4)\n' +
                'v2 = math3d.Vector2(1, 2)\n' +
                '\n' +
                '# 向量加法\n' +
                'v3 = v1 + v2  # (4, 6)\n' +
                '\n' +
                '# 向量长度\n' +
                'length = v1.length()  # 5\n' +
                '\n' +
                '# 归一化\n' +
                'normalized = v1.normalize()  # (0.6, 0.8)\n' +
                '```'
        },
        { name: 'Vector2.__init__', kind: 'method', class: 'Vector2', signature: 'Vector2(x: float = 0, y: float = 0)', description: '创建二维向量。\n\n参数:\n• x: X分量\n• y: Y分量', params: [{name: 'x', type: 'float', description: 'X分量', default: '0'}, {name: 'y', type: 'float', description: 'Y分量', default: '0'}] },
        { name: 'x', kind: 'property', class: 'Vector2', description: 'X分量属性。' },
        { name: 'y', kind: 'property', class: 'Vector2', description: 'Y分量属性。' },
        { name: 'dot', kind: 'method', class: 'Vector2', signature: 'dot(other: Vector2) -> float', description: '计算点积。\n\n点积 = x1*x2 + y1*y2\n用于判断向量夹角关系。\n\n返回值:\n• float: 点积值\n• >0: 夹角<90度(同向)\n• =0: 垂直\n• <0: 夹角>90度(反向)' },
        { name: 'cross', kind: 'method', class: 'Vector2', signature: 'cross(other: Vector2) -> float', description: '计算叉积。\n\n二维叉积返回浮点数，表示向量相对方向。\n\n返回值:\n• float: 叉积值\n• >0: other在左侧\n• =0: 平行\n• <0: other在右侧' },
        { name: 'length', kind: 'method', class: 'Vector2', signature: 'length() -> float', description: '计算向量长度。\n\n长度 = sqrt(x² + y²)\n\n返回值:\n• float: 向量长度' },
        { name: 'length_squared', kind: 'method', class: 'Vector2', signature: 'length_squared() -> float', description: '计算长度平方。\n\n避免开方运算，用于距离比较。\n\n返回值:\n• float: 长度平方' },
        { name: 'normalize', kind: 'method', class: 'Vector2', signature: 'normalize() -> Vector2', description: '返回归一化向量。\n\n归一化后长度为1，保留方向。\n\n返回值:\n• Vector2: 单位向量' },
        { name: 'perpendicular', kind: 'method', class: 'Vector2', signature: 'perpendicular() -> Vector2', description: '返回垂直向量。\n\n逆时针旋转90度。\n\n返回值:\n• Vector2: 垂直向量' },
        { name: 'rotate', kind: 'method', class: 'Vector2', signature: 'rotate(angle: float) -> Vector2', description: '旋转向量。\n\n参数:\n• angle: 旋转角度(弧度)\n\n返回值:\n• Vector2: 旋转后的向量' },
        { name: 'Vector2.zero', kind: 'method', class: 'Vector2', signature: 'zero() -> Vector2', description: '零向量(0, 0)。 - static' },
        { name: 'Vector2.one', kind: 'method', class: 'Vector2', signature: 'one() -> Vector2', description: '单位向量(1, 1)。 - static' },
        { name: 'Vector2.up', kind: 'method', class: 'Vector2', signature: 'up() -> Vector2', description: '向上向量(0, 1)。 - static' },
        { name: 'Vector2.down', kind: 'method', class: 'Vector2', signature: 'down() -> Vector2', description: '向下向量(0, -1)。 - static' },
        { name: 'Vector2.left', kind: 'method', class: 'Vector2', signature: 'left() -> Vector2', description: '向左向量(-1, 0)。 - static' },
        { name: 'Vector2.right', kind: 'method', class: 'Vector2', signature: 'right() -> Vector2', description: '向右向量(1, 0)。 - static' },
        { name: 'Vector2.distance', kind: 'method', class: 'Vector2', signature: 'distance(a: Vector2, b: Vector2) -> float', description: '计算两点距离。 - static\n\n返回值:\n• float: 距离' },
        { name: 'Vector2.lerp', kind: 'method', class: 'Vector2', signature: 'lerp(a: Vector2, b: Vector2, t: float) -> Vector2', description: '向量线性插值。 - static\n\n参数:\n• a: 起始向量\n• b: 目标向量\n• t: 插值系数(0~1)\n\n返回值:\n• Vector2: 插值结果 = a + (b-a)*t' },
        // Vector3类
        { 
            name: 'Vector3', 
            kind: 'class', 
            module: 'unison.math3d', 
            description: '三维向量类。\n\n' +
                '表示3D空间中的点或方向。\n' +
                '支持完整的向量运算。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'pos = math3d.Vector3(10, 20, 30)\n' +
                'dir = math3d.Vector3.forward()\n' +
                '\n' +
                '# 向量运算\n' +
                'new_pos = pos + dir * 5\n' +
                'distance = math3d.Vector3.distance(pos, target)\n' +
                '```'
        },
        { name: 'Vector3.__init__', kind: 'method', class: 'Vector3', signature: 'Vector3(x=0, y=0, z=0)', description: '创建三维向量。\n\n参数:\n• x: X分量\n• y: Y分量\n• z: Z分量' },
        { name: 'x', kind: 'property', class: 'Vector3', description: 'X分量属性。' },
        { name: 'y', kind: 'property', class: 'Vector3', description: 'Y分量属性。' },
        { name: 'z', kind: 'property', class: 'Vector3', description: 'Z分量属性。' },
        { name: 'dot', kind: 'method', class: 'Vector3', signature: 'dot(other: Vector3) -> float', description: '计算点积。\n\n返回值:\n• float: 点积值' },
        { name: 'cross', kind: 'method', class: 'Vector3', signature: 'cross(other: Vector3) -> Vector3', description: '计算叉积。\n\n返回同时垂直于两个向量的新向量。\n\n返回值:\n• Vector3: 叉积向量' },
        { name: 'length', kind: 'method', class: 'Vector3', signature: 'length() -> float', description: '计算向量长度。\n\n返回值:\n• float: 长度' },
        { name: 'normalize', kind: 'method', class: 'Vector3', signature: 'normalize() -> Vector3', description: '返回归一化向量。\n\n返回值:\n• Vector3: 单位向量' },
        { name: 'reflect', kind: 'method', class: 'Vector3', signature: 'reflect(normal: Vector3) -> Vector3', description: '计算反射向量。\n\n参数:\n• normal: 反射面法线\n\n返回值:\n• Vector3: 反射后的向量' },
        { name: 'project', kind: 'method', class: 'Vector3', signature: 'project(onto: Vector3) -> Vector3', description: '计算投影向量。\n\n参数:\n• onto: 投影目标向量\n\n返回值:\n• Vector3: 投影结果' },
        { name: 'Vector3.zero', kind: 'method', class: 'Vector3', signature: 'zero() -> Vector3', description: '零向量(0, 0, 0)。 - static' },
        { name: 'Vector3.one', kind: 'method', class: 'Vector3', signature: 'one() -> Vector3', description: '单位向量(1, 1, 1)。 - static' },
        { name: 'Vector3.up', kind: 'method', class: 'Vector3', signature: 'up() -> Vector3', description: '向上向量(0, 1, 0)。 - static' },
        { name: 'Vector3.forward', kind: 'method', class: 'Vector3', signature: 'forward() -> Vector3', description: '向前向量(0, 0, 1)。 - static' },
        { name: 'Vector3.back', kind: 'method', class: 'Vector3', signature: 'back() -> Vector3', description: '向后向量(0, 0, -1)。 - static' },
        { name: 'Vector3.distance', kind: 'method', class: 'Vector3', signature: 'distance(a, b) -> float', description: '计算两点距离。 - static' },
        { name: 'Vector3.lerp', kind: 'method', class: 'Vector3', signature: 'lerp(a, b, t) -> Vector3', description: '向量线性插值。 - static' },
        { name: 'Vector3.slerp', kind: 'method', class: 'Vector3', signature: 'slerp(a, b, t) -> Vector3', description: '向量球面插值。 - static\n\n沿球面从a到b插值，保持长度。' },
        // Matrix类
        { 
            name: 'Matrix', 
            kind: 'class', 
            module: 'unison.math3d', 
            description: '4x4矩阵类。\n\n' +
                '用于变换运算: 平移、旋转、缩放。\n' +
                '支持矩阵乘法、求逆、变换点/向量等。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建变换矩阵\n' +
                'trans = math3d.Matrix.translation(math3d.Vector3(10, 0, 0))\n' +
                'rot = math3d.Matrix.rotationY(90 * math3d.DEG_TO_RAD)\n' +
                '\n' +
                '# 组合变换\n' +
                'combined = rot * trans\n' +
                '\n' +
                '# 变换点\n' +
                'new_pos = combined.transform_point(pos)\n' +
                '```'
        },
        { name: 'Matrix.identity', kind: 'method', class: 'Matrix', signature: 'identity() -> Matrix', description: '单位矩阵。 - static\n\n不产生任何变换。' },
        { name: 'Matrix.zero', kind: 'method', class: 'Matrix', signature: 'zero() -> Matrix', description: '零矩阵。 - static' },
        { name: 'Matrix.translation', kind: 'method', class: 'Matrix', signature: 'translation(translation: Vector3) -> Matrix', description: '创建平移矩阵。 - static\n\n参数:\n• translation: 平移向量' },
        { name: 'Matrix.scale', kind: 'method', class: 'Matrix', signature: 'scale(scale: Vector3) -> Matrix', description: '创建缩放矩阵。 - static\n\n参数:\n• scale: 缩放向量' },
        { name: 'Matrix.rotationX', kind: 'method', class: 'Matrix', signature: 'rotationX(angle: float) -> Matrix', description: '绕X轴旋转矩阵。 - static\n\n参数:\n• angle: 旋转角度(弧度)' },
        { name: 'Matrix.rotationY', kind: 'method', class: 'Matrix', signature: 'rotationY(angle: float) -> Matrix', description: '绕Y轴旋转矩阵。 - static\n\n参数:\n• angle: 旋转角度(弧度)' },
        { name: 'Matrix.rotationZ', kind: 'method', class: 'Matrix', signature: 'rotationZ(angle: float) -> Matrix', description: '绕Z轴旋转矩阵。 - static\n\n参数:\n• angle: 旋转角度(弧度)' },
        { name: 'Matrix.lookAt', kind: 'method', class: 'Matrix', signature: 'lookAt(eye, target, up) -> Matrix', description: '创建观察矩阵。 - static\n\n参数:\n• eye: 观察者位置\n• target: 目标位置\n• up: 上方向' },
        { name: 'Matrix.perspective', kind: 'method', class: 'Matrix', signature: 'perspective(fov, aspect, near, far) -> Matrix', description: '创建透视投影矩阵。 - static\n\n参数:\n• fov: 视野角度(弧度)\n• aspect: 宽高比\n• near: 近裁剪面\n• far: 远裁剪面' },
        { name: 'Matrix.ortho', kind: 'method', class: 'Matrix', signature: 'ortho(left, right, bottom, top, near, far) -> Matrix', description: '创建正交投影矩阵。 - static\n\n参数:\n• left/right/bottom/top: 边界\n• near/far: 裁剪面' },
        { name: 'transpose', kind: 'method', class: 'Matrix', signature: 'transpose() -> Matrix', description: '计算转置矩阵。\n\n返回值:\n• Matrix: 转置结果' },
        { name: 'determinant', kind: 'method', class: 'Matrix', signature: 'determinant() -> float', description: '计算行列式。\n\n返回值:\n• float: 行列式值' },
        { name: 'transform_point', kind: 'method', class: 'Matrix', signature: 'transform_point(point: Vector3) -> Vector3', description: '变换点(受平移影响)。\n\n参数:\n• point: 要变换的点\n\n返回值:\n• Vector3: 变换后的点' },
        { name: 'transform_vector', kind: 'method', class: 'Matrix', signature: 'transform_vector(vec: Vector3) -> Vector3', description: '变换向量(不受平移影响)。\n\n参数:\n• vec: 要变换的向量\n\n返回值:\n• Vector3: 变换后的向量' },
        // Quaternion类
        { 
            name: 'Quaternion', 
            kind: 'class', 
            module: 'unison.math3d', 
            description: '四元数类。\n\n' +
                '用于表示3D旋转，避免欧拉角的万向节锁问题。\n' +
                '支持平滑旋转插值(slerp)。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 从欧拉角创建\n' +
                'rot = math3d.Quaternion.from_euler(0, 90, 0)\n' +
                '\n' +
                '# 从轴角创建\n' +
                'rot = math3d.Quaternion.from_axis_angle(\n' +
                '    math3d.Vector3.up(), 45 * math3d.DEG_TO_RAD\n' +
                ')\n' +
                '\n' +
                '# 旋转插值\n' +
                'result = math3d.Quaternion.slerp(rot1, rot2, 0.5)\n' +
                '```'
        },
        { name: 'Quaternion.__init__', kind: 'method', class: 'Quaternion', signature: 'Quaternion(x=0, y=0, z=0, w=1)', description: '创建四元数。\n\n参数:\n• x, y, z: 向量部分\n• w: 标量部分' },
        { name: 'Quaternion.identity', kind: 'method', class: 'Quaternion', signature: 'identity() -> Quaternion', description: '单位四元数(无旋转)。 - static' },
        { name: 'Quaternion.from_euler', kind: 'method', class: 'Quaternion', signature: 'from_euler(x, y, z) -> Quaternion', description: '从欧拉角创建。 - static\n\n参数:\n• x, y, z: 欧拉角(弧度)\n\n返回值:\n• Quaternion: 四元数' },
        { name: 'Quaternion.from_axis_angle', kind: 'method', class: 'Quaternion', signature: 'from_axis_angle(axis: Vector3, angle: float) -> Quaternion', description: '从轴和角度创建。 - static\n\n参数:\n• axis: 旋转轴\n• angle: 旋转角度(弧度)\n\n返回值:\n• Quaternion: 四元数' },
        { name: 'to_euler', kind: 'method', class: 'Quaternion', signature: 'to_euler() -> Vector3', description: '转换为欧拉角。\n\n返回值:\n• Vector3: 欧拉角(弧度)' },
        { name: 'normalize', kind: 'method', class: 'Quaternion', signature: 'normalize() -> Quaternion', description: '归一化。\n\n返回值:\n• Quaternion: 归一化结果' },
        { name: 'conjugate', kind: 'method', class: 'Quaternion', signature: 'conjugate() -> Quaternion', description: '共轭。\n\n返回值:\n• Quaternion: 共轭四元数' },
        { name: 'inverse', kind: 'method', class: 'Quaternion', signature: 'inverse() -> Quaternion', description: '逆。\n\n返回值:\n• Quaternion: 逆四元数(反向旋转)' },
        { name: 'Quaternion.slerp', kind: 'method', class: 'Quaternion', signature: 'slerp(a, b, t) -> Quaternion', description: '球面插值。 - static\n\n参数:\n• a, b: 起始和目标四元数\n• t: 插值系数(0~1)\n\n返回值:\n• Quaternion: 插值结果' },
        // Color类
        { 
            name: 'Color', 
            kind: 'class', 
            module: 'unison.math3d', 
            description: 'RGBA颜色类。\n\n' +
                '表示颜色，分量范围0~1。\n' +
                '支持预定义颜色和十六进制创建。\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 创建颜色\n' +
                'color = math3d.Color(1, 0, 0, 1)  # 红色\n' +
                '\n' +
                '# 使用预定义颜色\n' +
                'white = math3d.Color.white()\n' +
                'red = math3d.Color.red()\n' +
                '\n' +
                '# 从十六进制创建\n' +
                'orange = math3d.Color.from_hex(0xFF5500)\n' +
                '```'
        },
        { name: 'Color.__init__', kind: 'method', class: 'Color', signature: 'Color(r=0, g=0, b=0, a=1)', description: '创建颜色。\n\n参数:\n• r: 红色(0~1)\n• g: 绿色(0~1)\n• b: 蓝色(0~1)\n• a: 透明度(0~1)' },
        { name: 'r', kind: 'property', class: 'Color', description: '红色分量。' },
        { name: 'g', kind: 'property', class: 'Color', description: '绿色分量。' },
        { name: 'b', kind: 'property', class: 'Color', description: '蓝色分量。' },
        { name: 'a', kind: 'property', class: 'Color', description: '透明度。' },
        { name: 'Color.white', kind: 'method', class: 'Color', signature: 'white() -> Color', description: '白色(1,1,1,1)。 - static' },
        { name: 'Color.black', kind: 'method', class: 'Color', signature: 'black() -> Color', description: '黑色(0,0,0,1)。 - static' },
        { name: 'Color.red', kind: 'method', class: 'Color', signature: 'red() -> Color', description: '红色(1,0,0,1)。 - static' },
        { name: 'Color.green', kind: 'method', class: 'Color', signature: 'green() -> Color', description: '绿色(0,1,0,1)。 - static' },
        { name: 'Color.blue', kind: 'method', class: 'Color', signature: 'blue() -> Color', description: '蓝色(0,0,1,1)。 - static' },
        { name: 'Color.yellow', kind: 'method', class: 'Color', signature: 'yellow() -> Color', description: '黄色(1,1,0,1)。 - static' },
        { name: 'Color.cyan', kind: 'method', class: 'Color', signature: 'cyan() -> Color', description: '青色(0,1,1,1)。 - static' },
        { name: 'Color.magenta', kind: 'method', class: 'Color', signature: 'magenta() -> Color', description: '紫色(1,0,1,1)。 - static' },
        { name: 'Color.gray', kind: 'method', class: 'Color', signature: 'gray() -> Color', description: '灰色(0.5,0.5,0.5,1)。 - static' },
        { name: 'Color.transparent', kind: 'method', class: 'Color', signature: 'transparent() -> Color', description: '透明(0,0,0,0)。 - static' },
        { name: 'Color.lerp', kind: 'method', class: 'Color', signature: 'lerp(a, b, t) -> Color', description: '颜色插值。 - static\n\n参数:\n• a, b: 起始和目标颜色\n• t: 插值系数' },
        { name: 'Color.from_hex', kind: 'method', class: 'Color', signature: 'from_hex(hex: int) -> Color', description: '从十六进制创建。 - static\n\n参数:\n• hex: 十六进制颜色值，如0xFF5500\n\n使用示例:\n```python\ncolor = math3d.Color.from_hex(0xFF5500)  # 橙色\n```' },
        // 数学函数
        { name: 'clamp', kind: 'function', signature: 'clamp(value: float, min: float, max: float) -> float', description: '将值限制在[min, max]范围内。\n\n参数:\n• value: 输入值\n• min: 最小值\n• max: 最大值\n\n返回值:\n• float: 限制后的值' },
        { name: 'lerp', kind: 'function', signature: 'lerp(a: float, b: float, t: float) -> float', description: '线性插值。\n\n返回 a + (b-a)*t\n\n参数:\n• a: 起始值\n• b: 目标值\n• t: 插值系数(0~1)\n\n返回值:\n• float: 插值结果' },
        { name: 'smooth_step', kind: 'function', signature: 'smooth_step(edge0, edge1, x) -> float', description: '平滑插值。\n\n在edge0和edge1之间平滑过渡。\n\n返回值:\n• float: 0~1之间的平滑值' },
        { name: 'degrees', kind: 'function', signature: 'degrees(radians: float) -> float', description: '弧度转角度。\n\n参数:\n• radians: 弧度值\n\n返回值:\n• float: 角度值' },
        { name: 'radians', kind: 'function', signature: 'radians(degrees: float) -> float', description: '角度转弧度。\n\n参数:\n• degrees: 角度值\n\n返回值:\n• float: 弧度值' },
        { name: 'sqrt', kind: 'function', signature: 'sqrt(value: float) -> float', description: '平方根。\n\n返回值:\n• float: sqrt(value)' },
        { name: 'pow', kind: 'function', signature: 'pow(base: float, exponent: float) -> float', description: '幂运算。\n\n返回 base^exponent' },
        { name: 'sin', kind: 'function', signature: 'sin(radians: float) -> float', description: '正弦函数。\n\n参数:\n• radians: 弧度\n\n返回值:\n• float: sin值(-1~1)' },
        { name: 'cos', kind: 'function', signature: 'cos(radians: float) -> float', description: '余弦函数。\n\n参数:\n• radians: 弧度\n\n返回值:\n• float: cos值(-1~1)' },
        { name: 'tan', kind: 'function', signature: 'tan(radians: float) -> float', description: '正切函数。\n\n参数:\n• radians: 弧度\n\n返回值:\n• float: tan值' },
        { name: 'asin', kind: 'function', signature: 'asin(value: float) -> float', description: '反正弦。\n\n参数:\n• value: sin值(-1~1)\n\n返回值:\n• float: 弧度(-π/2~π/2)' },
        { name: 'acos', kind: 'function', signature: 'acos(value: float) -> float', description: '反余弦。\n\n参数:\n• value: cos值(-1~1)\n\n返回值:\n• float: 弧度(0~π)' },
        { name: 'atan', kind: 'function', signature: 'atan(value: float) -> float', description: '反正切。\n\n返回值:\n• float: 弧度(-π/2~π/2)' },
        { name: 'atan2', kind: 'function', signature: 'atan2(y: float, x: float) -> float', description: '反正切(双参数)。\n\n考虑x,y符号，返回完整角度。\n\n返回值:\n• float: 弧度(-π~π)' },
        { name: 'abs', kind: 'function', signature: 'abs(value: float) -> float', description: '绝对值。\n\n返回 |value|' },
        { name: 'floor', kind: 'function', signature: 'floor(value: float) -> float', description: '向下取整。\n\n返回不大于value的最大整数' },
        { name: 'ceil', kind: 'function', signature: 'ceil(value: float) -> float', description: '向上取整。\n\n返回不小于value的最小整数' },
        { name: 'round', kind: 'function', signature: 'round(value: float) -> float', description: '四舍五入。\n\n返回最接近value的整数' },
        { name: 'min', kind: 'function', signature: 'min(a: float, b: float) -> float', description: '最小值。\n\n返回a和b中较小的' },
        { name: 'max', kind: 'function', signature: 'max(a: float, b: float) -> float', description: '最大值。\n\n返回a和b中较大的' },
        { name: 'random_range', kind: 'function', signature: 'random_range(min: float, max: float) -> float', description: '随机浮点数。\n\n返回[min, max]范围内的随机值' },
        { name: 'random_range_int', kind: 'function', signature: 'random_range_int(min: int, max: int) -> int', description: '随机整数。\n\n返回[min, max]范围内的随机整数' },
        // 工厂函数
        { name: 'vector', kind: 'function', signature: 'vector(x, y, z) -> Vector3', description: '快速创建Vector3。\n\n等同于 Vector3(x, y, z)' },
        { name: 'vector2', kind: 'function', signature: 'vector2(x, y) -> Vector2', description: '快速创建Vector2。\n\n等同于 Vector2(x, y)' },
        { name: 'vector4', kind: 'function', signature: 'vector4(x, y, z, w) -> Vector4', description: '快速创建Vector4。\n\n等同于 Vector4(x, y, z, w)' },
        { name: 'rotation', kind: 'function', signature: 'rotation(x, y, z, w) -> Quaternion', description: '快速创建四元数。\n\n等同于 Quaternion(x, y, z, w)' },
        { name: 'euler_rotation', kind: 'function', signature: 'euler_rotation(x, y, z) -> Quaternion', description: '从欧拉角快速创建四元数。\n\n等同于 Quaternion.from_euler(x, y, z)' },
        { name: 'color', kind: 'function', signature: 'color(r, g, b, a=1.0) -> Color', description: '快速创建颜色。\n\n等同于 Color(r, g, b, a)' },
        { name: 'color_hex', kind: 'function', signature: 'color_hex(hex: int) -> Color', description: '从十六进制快速创建颜色。\n\n等同于 Color.from_hex(hex)' }
    ],

    'unison.vfs': [
        {
            name: 'unison.vfs',
            kind: 'module',
            description: '虚拟文件系统模块，支持从VFS(CPK打包)和真实文件系统读取文件。\n\n' +
                'VFS系统特点:\n' +
                '• 自动从CPK和真实文件系统查找文件\n' +
                '• 优先从VFS(CPK)查找，再查找真实文件系统\n' +
                '• 统一的读取接口\n\n' +
                '使用场景:\n' +
                '• 加载脚本、配置、资源文件\n' +
                '• 支持打包发布和开发调试两种模式\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.vfs as vfs\n' +
                '\n' +
                '# 检查文件是否存在\n' +
                'if vfs.file_exists("config/game.xml"):\n' +
                '    # 读取文本文件\n' +
                '    content = vfs.read_file_text("config/game.xml")\n' +
                '    \n' +
                '    # 读取二进制文件\n' +
                '    data = vfs.read_file_bytes("images/hero.png")\n' +
                '```\n\n' +
                '注意:\n' +
                '• 路径使用相对路径\n' +
                '• VFS路径在unison.xml中配置'
        },
        { 
            name: 'file_exists', 
            kind: 'function', 
            signature: 'file_exists(path: str) -> bool', 
            description: '检查文件是否存在。\n\n' +
                '先检查VFS(CPK)，再检查真实文件系统。\n\n' +
                '参数:\n' +
                '• path: 文件相对路径\n\n' +
                '返回值:\n' +
                '• bool: 存在返回True\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'if vfs.file_exists("config/settings.xml"):\n' +
                '    settings = vfs.read_file_text("config/settings.xml")\n' +
                '```',
            params: [{name: 'path', type: 'str', description: '文件路径'}] 
        },
        { 
            name: 'read_file_bytes', 
            kind: 'function', 
            signature: 'read_file_bytes(path: str) -> bytes', 
            description: '读取文件为字节。\n\n' +
                '用于读取二进制文件(图片、音频等)。\n\n' +
                '参数:\n' +
                '• path: 文件路径\n\n' +
                '返回值:\n' +
                '• bytes: 文件内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 读取图片数据\n' +
                'image_data = vfs.read_file_bytes("images/hero.png")\n' +
                '```',
            params: [{name: 'path', type: 'str', description: '文件路径'}], 
            returns: {type: 'bytes', description: '文件内容'} 
        },
        { 
            name: 'read_file_text', 
            kind: 'function', 
            signature: 'read_file_text(path: str) -> str', 
            description: '读取文件为文本。\n\n' +
                '用于读取文本文件(脚本、配置等)。\n\n' +
                '参数:\n' +
                '• path: 文件路径\n\n' +
                '返回值:\n' +
                '• str: 文本内容\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 读取配置文件\n' +
                'config_text = vfs.read_file_text("config/game.xml")\n' +
                '```',
            params: [{name: 'path', type: 'str', description: '文件路径'}], 
            returns: {type: 'str', description: '文本内容'} 
        },
        { 
            name: 'list_files', 
            kind: 'function', 
            signature: 'list_files(directory: str) -> list', 
            description: '列出目录中的文件。\n\n' +
                '返回目录下所有文件的路径列表。\n\n' +
                '参数:\n' +
                '• directory: 目录路径\n\n' +
                '返回值:\n' +
                '• list: 文件路径列表\n\n' +
                '使用示例:\n' +
                '```python\n' +
                '# 列出所有配置文件\n' +
                'files = vfs.list_files("config")\n' +
                'for f in files:\n' +
                '    print(f)\n' +
                '```',
            params: [{name: 'directory', type: 'str', description: '目录路径'}], 
            returns: {type: 'list', description: '文件路径列表'} 
        }
    ],

    'unison.config': [
        {
            name: 'unison.config',
            kind: 'module',
            description: '配置管理模块，提供XML配置读写、加密解密功能。\n\n' +
                '主要功能:\n' +
                '• XML配置文件加载和解析\n' +
                '• 配置值读取(字符串、整数、浮点、布尔)\n' +
                '• 配置值设置和保存\n' +
                '• 加密配置文件支持\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.config as config\n' +
                'import unison.vfs as vfs\n' +
                '\n' +
                '# 加载XML配置\n' +
                'xml_content = vfs.read_file_text("config/game.xml")\n' +
                'cfg = config.ConfigNode.from_xml_string(xml_content)\n' +
                '\n' +
                '# 读取配置值\n' +
                'player_name = cfg.get("player_name", "Player")\n' +
                'volume = cfg.get_float("volume", 0.8)\n' +
                'fullscreen = cfg.get_bool("fullscreen", False)\n' +
                '\n' +
                '# 设置配置值\n' +
                'cfg.set("player_name", "Hero")\n' +
                'cfg.save_to_file("config/game.xml")\n' +
                '```'
        },
        { 
            name: 'ConfigNode', 
            kind: 'class', 
            module: 'unison.config', 
            description: '配置节点类。\n\n' +
                '表示一个配置数据的容器。\n' +
                '支持从XML加载、保存、加密等操作。'
        },
        { 
            name: 'ConfigNode.from_xml_file', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'from_xml_file(path: str) -> ConfigNode', 
            description: '从XML文件加载配置。 - static\n\n' +
                '参数:\n' +
                '• path: XML文件路径\n\n' +
                '返回值:\n' +
                '• ConfigNode: 配置对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'cfg = config.ConfigNode.from_xml_file("config/settings.xml")\n' +
                '```'
        },
        { 
            name: 'ConfigNode.from_xml_string', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'from_xml_string(xml: str) -> ConfigNode', 
            description: '从XML字符串加载配置。 - static\n\n' +
                '参数:\n' +
                '• xml: XML字符串内容\n\n' +
                '返回值:\n' +
                '• ConfigNode: 配置对象\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'xml_content = vfs.read_file_text("config/game.xml")\n' +
                'cfg = config.ConfigNode.from_xml_string(xml_content)\n' +
                '```'
        },
        { 
            name: 'ConfigNode.from_encrypted_file', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'from_encrypted_file(filepath, key=DEFAULT_KEY) -> ConfigNode', 
            description: '从加密文件加载配置。 - static\n\n用于读取加密保存的配置文件。\n\n参数:\n• filepath: 加密文件路径\n• key: 解密密钥(可选)\n\n返回值:\n• ConfigNode: 配置对象'
        },
        { 
            name: 'get', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'get(key: str, default_value: str = "") -> str', 
            description: '获取字符串配置值。\n\n参数:\n• key: 配置键名\n• default_value: 默认值(键不存在时返回)\n\n返回值:\n• str: 配置值',
            params: [{name: 'key', type: 'str', description: '配置键名'}, {name: 'default_value', type: 'str', description: '默认值', default: '""'}]
        },
        { 
            name: 'get_int', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'get_int(key: str, default_value: int = 0) -> int', 
            description: '获取整数配置值。\n\n参数:\n• key: 配置键名\n• default_value: 默认值\n\n返回值:\n• int: 整数配置值',
            params: [{name: 'key', type: 'str', description: '配置键名'}, {name: 'default_value', type: 'int', description: '默认值', default: '0'}]
        },
        { 
            name: 'get_float', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'get_float(key: str, default_value: float = 0.0) -> float', 
            description: '获取浮点数配置值。\n\n参数:\n• key: 配置键名\n• default_value: 默认值\n\n返回值:\n• float: 浮点配置值',
            params: [{name: 'key', type: 'str', description: '配置键名'}, {name: 'default_value', type: 'float', description: '默认值', default: '0.0'}]
        },
        { 
            name: 'get_bool', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'get_bool(key: str, default_value: bool = False) -> bool', 
            description: '获取布尔配置值。\n\n参数:\n• key: 配置键名\n• default_value: 默认值\n\n返回值:\n• bool: 布尔配置值',
            params: [{name: 'key', type: 'str', description: '配置键名'}, {name: 'default_value', type: 'bool', description: '默认值', default: 'False'}]
        },
        { 
            name: 'set', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'set(key: str, value: str)', 
            description: '设置配置值。\n\n参数:\n• key: 配置键名\n• value: 配置值',
            params: [{name: 'key', type: 'str', description: '配置键名'}, {name: 'value', type: 'str', description: '配置值'}]
        },
        { 
            name: 'has', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'has(key: str) -> bool', 
            description: '检查配置键是否存在。\n\n返回值:\n• bool: 存在返回True',
            params: [{name: 'key', type: 'str', description: '配置键名'}]
        },
        { 
            name: 'keys', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'keys() -> list', 
            description: '获取所有配置键。\n\n返回值:\n• list: 键名列表'
        },
        { 
            name: 'save_to_file', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'save_to_file(filepath: str) -> bool', 
            description: '保存配置到XML文件。\n\n参数:\n• filepath: 目标文件路径\n\n返回值:\n• bool: 是否成功',
            params: [{name: 'filepath', type: 'str', description: '目标文件路径'}]
        },
        { 
            name: 'save_to_encrypted_file', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'save_to_encrypted_file(filepath, key=DEFAULT_KEY) -> bool', 
            description: '加密保存配置文件。\n\n参数:\n• filepath: 目标文件路径\n• key: 加密密钥(可选)\n\n返回值:\n• bool: 是否成功'
        },
        { 
            name: 'to_xml_string', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'to_xml_string() -> str', 
            description: '转换为XML字符串。\n\n返回值:\n• str: XML格式字符串'
        },
        { 
            name: 'clear', 
            kind: 'method', 
            class: 'ConfigNode', 
            signature: 'clear()', 
            description: '清除所有配置。'
        },
        { 
            name: 'load_config', 
            kind: 'function', 
            signature: 'load_config(xml_path, binxml_path, key=DEFAULT_KEY)', 
            description: '加载配置文件(支持加密)。'
        },
        { 
            name: 'encrypt_xml', 
            kind: 'function', 
            signature: 'encrypt_xml(input_path, output_path, key=DEFAULT_KEY)', 
            description: '加密XML文件。\n\n参数:\n• input_path: 源XML文件\n• output_path: 输出加密文件\n• key: 加密密钥'
        },
        { 
            name: 'decrypt_xml', 
            kind: 'function', 
            signature: 'decrypt_xml(input_path, output_path, key=DEFAULT_KEY)', 
            description: '解密XML文件。\n\n参数:\n• input_path: 加密文件\n• output_path: 输出XML文件\n• key: 解密密钥'
        },
        { 
            name: 'xor_encrypt_string', 
            kind: 'function', 
            signature: 'xor_encrypt_string(plaintext, key=DEFAULT_KEY) -> str', 
            description: 'XOR加密字符串。\n\n参数:\n• plaintext: 明文\n• key: 加密密钥\n\n返回值:\n• str: 加密后字符串'
        },
        { 
            name: 'xor_decrypt_string', 
            kind: 'function', 
            signature: 'xor_decrypt_string(ciphertext, key=DEFAULT_KEY) -> str', 
            description: 'XOR解密字符串。\n\n参数:\n• ciphertext: 密文\n• key: 解密密钥\n\n返回值:\n• str: 解密后字符串'
        }
    ],

    'unison.log': [
        {
            name: 'unison.log',
            kind: 'module',
            description: '日志模块，提供分级日志输出功能。\n\n' +
                '支持四种日志级别:\n' +
                '• info: 普通信息日志\n' +
                '• warning: 警告日志\n' +
                '• error: 错误日志\n' +
                '• debug: 调试日志\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.log as log\n' +
                '\n' +
                'log.info("Game", "游戏启动")\n' +
                'log.warning("Config", "配置缺失，使用默认值")\n' +
                'log.error("Scene", "场景加载失败")\n' +
                '```'
        },
        { 
            name: 'info', 
            kind: 'function', 
            signature: 'info(module: str, message: str)', 
            description: '输出INFO级别日志。\n\n用于记录正常的程序运行信息。\n\n参数:\n• module: 模块名称\n• message: 日志内容',
            params: [{name: 'module', type: 'str', description: '模块名'}, {name: 'message', type: 'str', description: '日志内容'}]
        },
        { 
            name: 'warning', 
            kind: 'function', 
            signature: 'warning(module: str, message: str)', 
            description: '输出WARNING级别日志。\n\n用于记录需要注意的问题。\n\n参数:\n• module: 模块名称\n• message: 警告内容',
            params: [{name: 'module', type: 'str', description: '模块名'}, {name: 'message', type: 'str', description: '警告内容'}]
        },
        { 
            name: 'error', 
            kind: 'function', 
            signature: 'error(module: str, message: str)', 
            description: '输出ERROR级别日志。\n\n用于记录错误信息。\n\n参数:\n• module: 模块名称\n• message: 错误内容',
            params: [{name: 'module', type: 'str', description: '模块名'}, {name: 'message', type: 'str', description: '错误内容'}]
        },
        { 
            name: 'debug', 
            kind: 'function', 
            signature: 'debug(module: str, message: str)', 
            description: '输出DEBUG级别日志。\n\n用于开发调试。\n\n参数:\n• module: 模块名称\n• message: 调试信息',
            params: [{name: 'module', type: 'str', description: '模块名'}, {name: 'message', type: 'str', description: '调试内容'}]
        }
    ],

    'unison.gameobject': [
        {
            name: 'unison.gameobject',
            kind: 'module',
            description: '游戏对象系统模块。\n\n' +
                '提供GameObject和Transform类:\n' +
                '• GameObject: 游戏对象实体\n' +
                '• Transform: 变换组件(位置、旋转、缩放)\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'import unison.gameobject as gameobject\n' +
                '\n' +
                '# 创建游戏对象\n' +
                'obj = gameobject.GameObject("Enemy")\n' +
                '\n' +
                '# 获取变换组件\n' +
                'transform = obj.get_transform()\n' +
                'transform.position = math3d.Vector3(10, 0, 0)\n' +
                '```'
        },
        { 
            name: 'GameObject', 
            kind: 'class', 
            module: 'unison.gameobject', 
            description: '游戏对象类。\n\n表示游戏中的实体对象。'
        },
        { 
            name: 'GameObject.__init__', 
            kind: 'method', 
            class: 'GameObject', 
            signature: 'GameObject(name: str = "")', 
            description: '创建游戏对象。\n\n参数:\n• name: 对象名称',
            params: [{name: 'name', type: 'str', description: '对象名称', default: '""'}]
        },
        { name: 'name', kind: 'property', class: 'GameObject', description: '对象名称属性。' },
        { name: 'active', kind: 'property', class: 'GameObject', description: '是否激活属性。' },
        { 
            name: 'get_transform', 
            kind: 'method', 
            class: 'GameObject', 
            signature: 'get_transform() -> Transform', 
            description: '获取变换组件。\n\n返回值:\n• Transform: 变换组件对象',
            returns: {type: 'Transform', description: '变换组件'}
        },
        { 
            name: 'set_active', 
            kind: 'method', 
            class: 'GameObject', 
            signature: 'set_active(active: bool)', 
            description: '设置激活状态。\n\n参数:\n• active: True激活，False禁用',
            params: [{name: 'active', type: 'bool', description: '激活状态'}]
        },
        { name: 'update', kind: 'method', class: 'GameObject', signature: 'update()', description: '更新游戏对象。' },
        { 
            name: 'Transform', 
            kind: 'class', 
            module: 'unison.gameobject', 
            description: '变换组件类。\n\n控制对象的位置、旋转、缩放。'
        },
        { name: 'position', kind: 'property', class: 'Transform', description: '位置(Vector3)属性。' },
        { name: 'rotation', kind: 'property', class: 'Transform', description: '旋转(Quaternion)属性。' },
        { name: 'scale', kind: 'property', class: 'Transform', description: '缩放(Vector3)属性。' },
        { 
            name: 'get_world_position', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'get_world_position() -> Vector3', 
            description: '获取世界坐标位置。\n\n返回值:\n• Vector3: 世界坐标',
            returns: {type: 'Vector3', description: '世界坐标'}
        },
        { 
            name: 'get_world_rotation', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'get_world_rotation() -> Quaternion', 
            description: '获取世界旋转。\n\n返回值:\n• Quaternion: 世界旋转',
            returns: {type: 'Quaternion', description: '世界旋转'}
        },
        { 
            name: 'set_parent', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'set_parent(parent: Transform)', 
            description: '设置父变换。\n\n参数:\n• parent: 父变换对象',
            params: [{name: 'parent', type: 'Transform', description: '父变换'}]
        },
        { 
            name: 'get_children', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'get_children() -> list', 
            description: '获取子变换列表。\n\n返回值:\n• list: 子变换列表',
            returns: {type: 'list', description: '子变换列表'}
        },
        { 
            name: 'translate', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'translate(x, y, z)', 
            description: '平移。\n\n参数:\n• x, y, z: 平移量',
            params: [{name: 'x', type: 'float', description: 'X平移'}, {name: 'y', type: 'float', description: 'Y平移'}, {name: 'z', type: 'float', description: 'Z平移'}]
        },
        { 
            name: 'rotate', 
            kind: 'method', 
            class: 'Transform', 
            signature: 'rotate(x, y, z)', 
            description: '旋转。\n\n参数:\n• x, y, z: 旋转角度(弧度)',
            params: [{name: 'x', type: 'float', description: 'X旋转'}, {name: 'y', type: 'float', description: 'Y旋转'}, {name: 'z', type: 'float', description: 'Z旋转'}]
        }
    ],

    'unison.renderer_scene': [
        {
            name: 'unison.renderer_scene',
            kind: 'module',
            description: '渲染场景管理模块。\n\n' +
                '提供3D渲染场景管理:\n' +
                '• Mesh创建和管理\n' +
                '• Shader加载\n' +
                '• Material创建\n' +
                '• 环境设置\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'renderer = unison.renderer_scene.RENDERER.get()\n' +
                '\n' +
                '# 加载着色器\n' +
                'shader_rid = renderer.shader_load("shaders/my_shader")\n' +
                '\n' +
                '# 创建材质\n' +
                'material_rid = renderer.material_create()\n' +
                'renderer.material_set_albedo(material_rid, 1, 0, 0, 1)\n' +
                '```'
        },
        { 
            name: 'RENDERER', 
            kind: 'class', 
            module: 'unison.renderer_scene', 
            description: '渲染场景单例类。'
        },
        { 
            name: 'RENDERER.get', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'get() -> RENDERER', 
            description: '获取渲染场景单例。 - static\n\n返回值:\n• RENDERER: 渲染场景实例',
            returns: {type: 'RENDERER', description: '渲染场景单例'}
        },
        { name: 'initialize', kind: 'method', class: 'RENDERER', signature: 'initialize()', description: '初始化渲染场景。' },
        { 
            name: 'mesh_create', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'mesh_create(vertices: list, indices: list) -> RID', 
            description: '创建网格资源。\n\n参数:\n• vertices: 顶点数据列表\n• indices: 索引数据列表\n\n返回值:\n• RID: 网格资源ID',
            returns: {type: 'RID', description: '网格RID'}
        },
        { 
            name: 'mesh_free', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'mesh_free(rid: RID)', 
            description: '释放网格资源。\n\n参数:\n• rid: 网格资源ID',
            params: [{name: 'rid', type: 'RID', description: '网格RID'}]
        },
        { 
            name: 'shader_load', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'shader_load(path: str) -> RID', 
            description: '加载着色器文件。\n\n支持VFS，自动添加.vert/.frag后缀。\n\n参数:\n• path: 着色器路径(不含后缀)\n\n返回值:\n• RID: 着色器资源ID',
            params: [{name: 'path', type: 'str', description: '着色器路径'}],
            returns: {type: 'RID', description: '着色器RID'}
        },
        { 
            name: 'shader_load_from_source', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'shader_load_from_source(vertex_source, fragment_source) -> RID', 
            description: '从源码创建着色器。\n\n参数:\n• vertex_source: 顶点着色器源码\n• fragment_source: 片段着色器源码\n\n返回值:\n• RID: 着色器资源ID',
            returns: {type: 'RID', description: '着色器RID'}
        },
        { 
            name: 'shader_free', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'shader_free(rid: RID)', 
            description: '释放着色器资源。\n\n参数:\n• rid: 着色器资源ID',
            params: [{name: 'rid', type: 'RID', description: '着色器RID'}]
        },
        { 
            name: 'material_create', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'material_create() -> RID', 
            description: '创建材质。\n\n返回值:\n• RID: 材质资源ID',
            returns: {type: 'RID', description: '材质RID'}
        },
        { 
            name: 'material_set_albedo', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'material_set_albedo(material, r, g, b, a)', 
            description: '设置材质反照率颜色。\n\n参数:\n• material: 材质RID\n• r, g, b, a: RGBA颜色',
            params: [{name: 'material', type: 'RID', description: '材质RID'}, {name: 'r', type: 'float', description: '红'}, {name: 'g', type: 'float', description: '绿'}, {name: 'b', type: 'float', description: '蓝'}, {name: 'a', type: 'float', description: 'Alpha'}]
        },
        { 
            name: 'material_set_metallic', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'material_set_metallic(material, value)', 
            description: '设置材质金属度。\n\n参数:\n• material: 材质RID\n• value: 金属度(0~1)',
            params: [{name: 'material', type: 'RID', description: '材质RID'}, {name: 'value', type: 'float', description: '金属度'}]
        },
        { 
            name: 'material_set_roughness', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'material_set_roughness(material, value)', 
            description: '设置材质粗糙度。\n\n参数:\n• material: 材质RID\n• value: 粗糙度(0~1)',
            params: [{name: 'material', type: 'RID', description: '材质RID'}, {name: 'value', type: 'float', description: '粗糙度'}]
        },
        { 
            name: 'material_free', 
            kind: 'method', 
            class: 'RENDERER', 
            signature: 'material_free(rid: RID)', 
            description: '释放材质。\n\n参数:\n• rid: 材质资源ID',
            params: [{name: 'rid', type: 'RID', description: '材质RID'}]
        },
        { 
            name: 'EnvironmentSettings', 
            kind: 'class', 
            module: 'unison.renderer_scene', 
            description: '环境设置类。\n\n控制渲染环境效果。'
        },
        { name: 'tonemap_exposure', kind: 'property', class: 'EnvironmentSettings', description: '色调映射曝光值。' },
        { name: 'ssao_enabled', kind: 'property', class: 'EnvironmentSettings', description: 'SSAO是否启用。' },
        { name: 'glow_enabled', kind: 'property', class: 'EnvironmentSettings', description: '辉光是否启用。' },
        { name: 'glow_intensity', kind: 'property', class: 'EnvironmentSettings', description: '辉光强度。' }
    ],

    'unison.rendering_device': [
        {
            name: 'unison.rendering_device',
            kind: 'module',
            description: '渲染设备模块。\n\n' +
                '提供渲染设备管理:\n' +
                '• 设备初始化状态\n' +
                '• 帧大小获取\n' +
                '• RID资源标识\n\n' +
                '使用示例:\n' +
                '```python\n' +
                'device = unison.rendering_device.DEVICE.get()\n' +
                '\n' +
                '# 获取帧大小\n' +
                'width = device.get_frame_width()\n' +
                'height = device.get_frame_height()\n' +
                '```'
        },
        { 
            name: 'DEVICE', 
            kind: 'class', 
            module: 'unison.rendering_device', 
            description: '渲染设备单例类。'
        },
        { 
            name: 'DEVICE.get', 
            kind: 'method', 
            class: 'DEVICE', 
            signature: 'get() -> DEVICE', 
            description: '获取渲染设备单例。 - static\n\n返回值:\n• DEVICE: 渲染设备实例',
            returns: {type: 'DEVICE', description: '渲染设备单例'}
        },
        { 
            name: 'is_initialized', 
            kind: 'method', 
            class: 'DEVICE', 
            signature: 'is_initialized() -> bool', 
            description: '检查是否已初始化。\n\n返回值:\n• bool: 初始化状态',
            returns: {type: 'bool', description: '初始化状态'}
        },
        { 
            name: 'get_frame_width', 
            kind: 'method', 
            class: 'DEVICE', 
            signature: 'get_frame_width() -> int', 
            description: '获取帧宽度。\n\n返回值:\n• int: 帧宽度(像素)',
            returns: {type: 'int', description: '帧宽度'}
        },
        { 
            name: 'get_frame_height', 
            kind: 'method', 
            class: 'DEVICE', 
            signature: 'get_frame_height() -> int', 
            description: '获取帧高度。\n\n返回值:\n• int: 帧高度(像素)',
            returns: {type: 'int', description: '帧高度'}
        },
        { 
            name: 'resize', 
            kind: 'method', 
            class: 'DEVICE', 
            signature: 'resize(width: int, height: int)', 
            description: '调整帧大小。\n\n参数:\n• width: 新宽度\n• height: 新高度',
            params: [{name: 'width', type: 'int', description: '宽度'}, {name: 'height', type: 'int', description: '高度'}]
        },
        { 
            name: 'RID', 
            kind: 'class', 
            module: 'unison.rendering_device', 
            description: '资源ID类。\n\n用于标识渲染资源。'
        },
        { 
            name: 'is_valid', 
            kind: 'method', 
            class: 'RID', 
            signature: 'is_valid() -> bool', 
            description: '检查资源是否有效。\n\n返回值:\n• bool: 有效返回True',
            returns: {type: 'bool', description: '是否有效'}
        },
        { 
            name: 'is_null', 
            kind: 'method', 
            class: 'RID', 
            signature: 'is_null() -> bool', 
            description: '检查资源是否为空。\n\n返回值:\n• bool: 空返回True',
            returns: {type: 'bool', description: '是否为空'}
        },
        { 
            name: 'get_id', 
            kind: 'method', 
            class: 'RID', 
            signature: 'get_id() -> int', 
            description: '获取资源ID。\n\n返回值:\n• int: 资源ID',
            returns: {type: 'int', description: '资源ID'}
        }
    ]
};

// 生命周期函数
export const lifecycleFunctions: ApiItem[] = [
    { 
        name: 'on_start', 
        kind: 'function', 
        signature: 'def on_start():', 
        description: '引擎启动时调用。\n\n用于初始化游戏，创建窗口，初始化子系统。\n\n使用示例:\n```python\ndef on_start():\n    unison.excore.create_window("My Game", 1280, 720)\n    wwise.initialize("wwise")\n    cocosui.initialize()\n```',
        example: 'def on_start():\n    unison.excore.create_window("My Game", 1280, 720)' 
    },
    { 
        name: 'on_update', 
        kind: 'function', 
        signature: 'def on_update(dt: float):', 
        description: '每帧更新时调用。\n\n参数dt为帧时间(秒)，用于更新游戏逻辑。\n\n参数:\n• dt: 帧时间(秒)\n\n使用示例:\n```python\ndef on_update(dt):\n    unison.render.update_logic_fps(dt)\n    wwise.render_audio()\n```',
        params: [{name: 'dt', type: 'float', description: '帧时间(秒)'}],
        example: 'def on_update(dt):\n    unison.render.update_logic_fps(dt)' 
    },
    { 
        name: 'on_render', 
        kind: 'function', 
        signature: 'def on_render():', 
        description: '每帧渲染时调用。\n\n用于渲染游戏画面。\n\n使用示例:\n```python\ndef on_render():\n    unison.render.begin_scene(0, 0, 0, 1)\n    ccui.update(1.0/60.0)\n    unison.render.end_scene()\n```',
        example: 'def on_render():\n    unison.render.begin_scene(0, 0, 0, 1)\n    unison.render.end_scene()' 
    },
    { 
        name: 'on_key', 
        kind: 'function', 
        signature: 'def on_key(key: str, state: bool):', 
        description: '键盘输入时调用。\n\n参数:\n• key: 按键名称(如"a", "space", "left")\n• state: True=按下, False=释放\n\n使用示例:\n```python\ndef on_key(key, state):\n    if state and key == "space":\n        print("Space pressed")\n```',
        params: [{name: 'key', type: 'str', description: '按键名称'}, {name: 'state', type: 'bool', description: 'True=按下, False=释放'}],
        example: 'def on_key(key, state):\n    if state and key == "space":\n        print("Space pressed")' 
    },
    { 
        name: 'on_shutdown', 
        kind: 'function', 
        signature: 'def on_shutdown():', 
        description: '引擎关闭时调用。\n\n用于清理资源。\n\n使用示例:\n```python\ndef on_shutdown():\n    wwise.shutdown()\n    cocosui.shutdown()\n```',
        example: 'def on_shutdown():\n    wwise.shutdown()' 
    },
    { 
        name: 'on_scene', 
        kind: 'function', 
        signature: 'def on_scene():', 
        description: '场景加载时调用。\n\n用于初始化场景资源。\n\n使用示例:\n```python\ndef on_scene():\n    ccui.set_design_resolution(1280, 720)\n    widget = ccui.load_csb("ui", 0, 0, "ui/main.csb")\n```',
        example: 'def on_scene():\n    # 初始化场景资源' 
    },
    { 
        name: 'on_scene_leave', 
        kind: 'function', 
        signature: 'def on_scene_leave():', 
        description: '离开场景时调用。\n\n用于清理场景资源。\n\n使用示例:\n```python\ndef on_scene_leave():\n    ccui.remove_all_widgets()\n```',
        example: 'def on_scene_leave():\n    # 清理场景资源' 
    }
];

// 获取所有模块名称
export function getModuleNames(): string[] {
    return Object.keys(unisonModules);
}

// 搜索API项
export function searchApi(query: string): ApiItem[] {
    const results: ApiItem[] = [];
    const lowerQuery = query.toLowerCase();
    
    for (const [moduleName, items] of Object.entries(unisonModules)) {
        for (const item of items) {
            if (item.name.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)) {
                results.push({...item, module: moduleName});
            }
        }
    }
    
    return results;
}

// 根据模块名获取API项
export function getModuleApi(moduleName: string): ApiItem[] {
    return unisonModules[moduleName] || [];
}