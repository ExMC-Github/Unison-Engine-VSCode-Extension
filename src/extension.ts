import * as vscode from 'vscode';
import { unisonModules, lifecycleFunctions, getModuleNames, searchApi, ApiItem } from './apiDefinitions';

// 补全提供器
class UnisonCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.CompletionItem[] {
        const items: vscode.CompletionItem[] = [];
        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        
        // 检查是否在导入语句中
        if (textBeforeCursor.includes('import unison.') || textBeforeCursor.includes('from unison.')) {
            // 提供模块名称补全
            for (const moduleName of getModuleNames()) {
                const shortName = moduleName.replace('unison.', '');
                const item = new vscode.CompletionItem(shortName, vscode.CompletionItemKind.Module);
                item.detail = moduleName;
                item.documentation = new vscode.MarkdownString(
                    `**${moduleName}**\n\n${unisonModules[moduleName]?.[0]?.description || ''}`
                );
                items.push(item);
            }
            return items;
        }
        
        // 检查是否在访问模块属性（如 unison. 或模块别名.）
        const moduleAccessMatch = textBeforeCursor.match(/(\w+)\.\s*(\w*)$/);
        if (moduleAccessMatch) {
            const prefix = moduleAccessMatch[1];
            const partialName = moduleAccessMatch[2];
            
            // 确定 module 名称
            let moduleName = '';
            if (prefix === 'unison') {
                // 需要补全模块名
                for (const modName of getModuleNames()) {
                    const shortName = modName.replace('unison.', '');
                    if (!partialName || shortName.startsWith(partialName)) {
                        const item = new vscode.CompletionItem(shortName, vscode.CompletionItemKind.Module);
                        item.detail = modName;
                        item.documentation = new vscode.MarkdownString(
                            `**${modName}**\n\n${unisonModules[modName]?.[0]?.description || ''}`
                        );
                        item.insertText = shortName;
                        items.push(item);
                    }
                }
                return items;
            } else {
                // 尝试匹配模块别名
                for (const modName of getModuleNames()) {
                    const shortName = modName.replace('unison.', '');
                    if (prefix === shortName || prefix === 'ccui' && shortName === 'cocosui' || 
                        prefix === 'wwise' && shortName === 'wwise') {
                        moduleName = modName;
                        break;
                    }
                }
            }
            
            if (moduleName && unisonModules[moduleName]) {
                // 提供该模块的函数和类补全
                for (const apiItem of unisonModules[moduleName]) {
                    if (apiItem.kind === 'module') continue;
                    
                    if (!partialName || apiItem.name.startsWith(partialName)) {
                        const item = this.createCompletionItem(apiItem);
                        items.push(item);
                    }
                }
            }
            
            return items;
        }
        
        // 检查是否在访问类方法（如 widget. 或 Vector3.）
        const classAccessMatch = textBeforeCursor.match(/(\w+)\.\s*(\w*)$/);
        if (classAccessMatch) {
            const className = classAccessMatch[1];
            const partialName = classAccessMatch[2];
            
            // 查找该类的所有方法
            for (const [modName, apiItems] of Object.entries(unisonModules)) {
                for (const apiItem of apiItems) {
                    if (apiItem.class === className && 
                        (apiItem.kind === 'method' || apiItem.kind === 'property') &&
                        (!partialName || apiItem.name.startsWith(partialName))) {
                        const item = this.createCompletionItem(apiItem);
                        items.push(item);
                    }
                }
            }
            
            // 特殊类名处理
            const specialClasses = ['Widget', 'Button', 'Text', 'Image', 'CSBWidget', 'UINode', 
                                   'Vector2', 'Vector3', 'Matrix', 'Quaternion', 'Color',
                                   'ConfigNode', 'GameObject', 'Transform', 'RENDERER', 'DEVICE', 'RID'];
            if (specialClasses.includes(className)) {
                for (const [modName, apiItems] of Object.entries(unisonModules)) {
                    for (const apiItem of apiItems) {
                        if (apiItem.class === className && 
                            (apiItem.kind === 'method' || apiItem.kind === 'property') &&
                            (!partialName || apiItem.name.startsWith(partialName))) {
                            const item = this.createCompletionItem(apiItem);
                            items.push(item);
                        }
                    }
                }
            }
            
            if (items.length > 0) return items;
        }
        
        // 提供生命周期函数补全
        for (const lifecycle of lifecycleFunctions) {
            const wordMatch = textBeforeCursor.match(/\b(\w+)$/);
            const typedWord = wordMatch ? wordMatch[1] : '';
            if (!typedWord || lifecycle.name.startsWith(typedWord) || 
                textBeforeCursor.trim() === '' || textBeforeCursor.trim() === 'def') {
                const item = new vscode.CompletionItem(lifecycle.name, vscode.CompletionItemKind.Function);
                item.detail = lifecycle.signature;
                item.documentation = new vscode.MarkdownString(
                    `**${lifecycle.signature}**\n\n${lifecycle.description}\n\n` +
                    (lifecycle.example ? `**示例:**\n${lifecycle.example}` : '')
                );
                item.insertText = new vscode.SnippetString(lifecycle.signature + '\n    ${0}');
                items.push(item);
            }
        }
        
        // 提供模块级别的导入补全
        if (textBeforeCursor.trim() === 'import' || textBeforeCursor.includes('import ')) {
            const moduleImports = [
                { name: 'unison.excore', alias: 'excore', desc: '核心功能模块' },
                { name: 'unison.wwise', alias: 'wwise', desc: '音频系统' },
                { name: 'unison.render', alias: 'render', desc: '渲染系统' },
                { name: 'unison.scene', alias: 'scene', desc: '场景管理' },
                { name: 'unison.cocosui', alias: 'ccui', desc: 'UI系统' },
                { name: 'unison.math3d', alias: 'math3d', desc: '3D数学库' },
                { name: 'unison.vfs', alias: 'vfs', desc: '虚拟文件系统' },
                { name: 'unison.config', alias: 'config', desc: '配置管理' },
                { name: 'unison.log', alias: 'log', desc: '日志系统' }
            ];
            
            for (const mod of moduleImports) {
                const item = new vscode.CompletionItem(`${mod.name} as ${mod.alias}`, vscode.CompletionItemKind.Module);
                item.detail = mod.name;
                item.documentation = new vscode.MarkdownString(`**${mod.desc}**`);
                item.insertText = `${mod.name} as ${mod.alias}`;
                items.push(item);
            }
            return items;
        }
        
        // 提供常用代码片段
        if (textBeforeCursor.trim() === '') {
            const snippets = [
                { label: 'def on_start():', insert: 'def on_start():\n    ${0}', doc: '引擎启动时调用' },
                { label: 'def on_update(dt):', insert: 'def on_update(dt):\n    unison.render.update_logic_fps(dt)\n    ${0}', doc: '每帧更新' },
                { label: 'def on_render():', insert: 'def on_render():\n    unison.render.begin_scene(0, 0, 0, 1)\n    ${0}\n    unison.render.end_scene()', doc: '渲染帧' },
                { label: 'def on_key(key, state):', insert: 'def on_key(key, state):\n    if state:\n        ${0}', doc: '键盘输入' },
                { label: 'def on_shutdown():', insert: 'def on_shutdown():\n    ${0}', doc: '引擎关闭' }
            ];
            
            for (const snippet of snippets) {
                const item = new vscode.CompletionItem(snippet.label, vscode.CompletionItemKind.Snippet);
                item.documentation = new vscode.MarkdownString(snippet.doc);
                item.insertText = new vscode.SnippetString(snippet.insert);
                items.push(item);
            }
        }
        
        return items;
    }
    
    private createCompletionItem(apiItem: ApiItem): vscode.CompletionItem {
        const kind = this.getCompletionKind(apiItem.kind);
        const item = new vscode.CompletionItem(apiItem.name, kind);
        
        if (apiItem.signature) {
            item.detail = apiItem.signature;
        }
        
        let docString = `**${apiItem.name}**\n\n${apiItem.description}`;
        if (apiItem.params && apiItem.params.length > 0) {
            docString += '\n\n**参数:**\n';
            for (const param of apiItem.params) {
                docString += `- \`${param.name}\` (${param.type}): ${param.description}`;
                if (param.default) {
                    docString += ` [默认: ${param.default}]`;
                }
                docString += '\n';
            }
        }
        if (apiItem.returns) {
            docString += `\n\n**返回:** \`${apiItem.returns.type}\` - ${apiItem.returns.description}`;
        }
        if (apiItem.example) {
            docString += `\n\n**示例:**\n${apiItem.example}`;
        }
        
        item.documentation = new vscode.MarkdownString(docString);
        
        // 设置插入文本
        if (apiItem.kind === 'function' || apiItem.kind === 'method') {
            if (apiItem.params && apiItem.params.length > 0) {
                const params = apiItem.params.map((p, i) => `\${${i+1}:${p.name}}`).join(', ');
                item.insertText = new vscode.SnippetString(`${apiItem.name}(${params})`);
            } else {
                item.insertText = `${apiItem.name}()`;
            }
        }
        
        return item;
    }
    
    private getCompletionKind(kind: string): vscode.CompletionItemKind {
        switch (kind) {
            case 'module': return vscode.CompletionItemKind.Module;
            case 'class': return vscode.CompletionItemKind.Class;
            case 'function': return vscode.CompletionItemKind.Function;
            case 'method': return vscode.CompletionItemKind.Method;
            case 'property': return vscode.CompletionItemKind.Property;
            case 'constant': return vscode.CompletionItemKind.Constant;
            default: return vscode.CompletionItemKind.Variable;
        }
    }
}

// 悬停提示提供器
class UnisonHoverProvider implements vscode.HoverProvider {
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        if (!range) return undefined;
        
        const word = document.getText(range);
        const lineText = document.lineAt(position).text;
        
        // 检查是否是 import unison.xxx 模式
        const importMatch = lineText.match(/import\s+unison\.(\w+)(\s+as\s+\w+)?/);
        if (importMatch) {
            const moduleName = `unison.${importMatch[1]}`;
            if (unisonModules[moduleName]) {
                // 找到模块的第一个条目（模块描述）
                const moduleItem = unisonModules[moduleName].find(item => item.kind === 'module');
                if (moduleItem) {
                    return this.createHover(moduleItem);
                }
            }
        }
        
        // 检查是否是模块访问
        const beforeWord = lineText.substring(0, range.start.character);
        const moduleAccessMatch = beforeWord.match(/(\w+)\.\s*$/);
        
        if (moduleAccessMatch) {
            const moduleName = moduleAccessMatch[1];
            // 在对应模块中查找
            let fullModuleName = '';
            if (moduleName === 'unison') {
                fullModuleName = `unison.${word}`;
                // 悬停在 unison.scene 上，显示模块文档
                if (unisonModules[fullModuleName]) {
                    const moduleItem = unisonModules[fullModuleName].find(item => item.kind === 'module');
                    if (moduleItem) {
                        return this.createHover(moduleItem);
                    }
                }
            } else {
                // 查找别名对应的完整模块名
                for (const modName of getModuleNames()) {
                    const shortName = modName.replace('unison.', '');
                    if (moduleName === shortName || moduleName === 'ccui' && shortName === 'cocosui' || moduleName === 'wwise' && shortName === 'wwise' || moduleName === 'math3d' && shortName === 'math3d') {
                        fullModuleName = modName;
                        break;
                    }
                }
            }
            
            if (fullModuleName && unisonModules[fullModuleName]) {
                for (const apiItem of unisonModules[fullModuleName]) {
                    if (apiItem.name === word) {
                        return this.createHover(apiItem);
                    }
                }
            }
            
            // 查找类方法
            for (const [modName, apiItems] of Object.entries(unisonModules)) {
                for (const apiItem of apiItems) {
                    if (apiItem.class === moduleName && apiItem.name === word) {
                        return this.createHover(apiItem);
                    }
                }
            }
        }
        
        // 检查生命周期函数
        for (const lifecycle of lifecycleFunctions) {
            if (lifecycle.name === word) {
                return this.createHover(lifecycle);
            }
        }
        
        // 检查是否是模块名本身
        const fullModuleName = `unison.${word}`;
        if (unisonModules[fullModuleName]) {
            const moduleItem = unisonModules[fullModuleName].find(item => item.kind === 'module');
            if (moduleItem) {
                return this.createHover(moduleItem);
            }
        }
        
        // 只在模块名匹配时搜索，避免错误匹配
        // 搜索所有API时优先匹配名称完全相同的
        for (const [modName, apiItems] of Object.entries(unisonModules)) {
            for (const apiItem of apiItems) {
                if (apiItem.name === word && apiItem.kind !== 'module') {
                    return this.createHover(apiItem);
                }
            }
        }
        
        return undefined;
    }
    
    private createHover(apiItem: ApiItem): vscode.Hover {
        let content = `**${apiItem.name}** (${apiItem.kind})\n\n${apiItem.description}`;
        
        if (apiItem.signature) {
            content = `**${apiItem.signature}**\n\n${apiItem.description}`;
        }
        
        if (apiItem.params && apiItem.params.length > 0) {
            content += '\n\n**参数:**\n';
            for (const param of apiItem.params) {
                content += `- \`${param.name}\` (${param.type}): ${param.description}`;
                if (param.default) {
                    content += ` [默认: ${param.default}]`;
                }
                content += '\n';
            }
        }
        
        if (apiItem.returns) {
            content += `\n\n**返回:** \`${apiItem.returns.type}\` - ${apiItem.returns.description}`;
        }
        
        if (apiItem.example) {
            content += `\n\n**示例:**\n${apiItem.example}`;
        }
        
        return new vscode.Hover(new vscode.MarkdownString(content));
    }
}

// 签名帮助提供器
class UnisonSignatureHelpProvider implements vscode.SignatureHelpProvider {
    provideSignatureHelp(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.SignatureHelpContext
    ): vscode.SignatureHelp | undefined {
        const lineText = document.lineAt(position).text;
        const textBeforeCursor = lineText.substring(0, position.character);
        
        // 匹配函数调用
        const funcMatch = textBeforeCursor.match(/(\w+)\.(\w+)\s*\(([^)]*)$/);
        if (!funcMatch) return undefined;
        
        const moduleName = funcMatch[1];
        const funcName = funcMatch[2];
        const argsText = funcMatch[3];
        
        // 确定完整模块名
        let fullModuleName = '';
        for (const modName of getModuleNames()) {
            const shortName = modName.replace('unison.', '');
            if (moduleName === shortName || moduleName === 'ccui' && shortName === 'cocosui') {
                fullModuleName = modName;
                break;
            }
        }
        
        if (!fullModuleName) return undefined;
        
        // 查找函数定义
        const apiItem = unisonModules[fullModuleName]?.find(
            item => item.name === funcName && (item.kind === 'function' || item.kind === 'method')
        );
        
        if (!apiItem || !apiItem.params) return undefined;
        
        const sigHelp = new vscode.SignatureHelp();
        
        const sigInfo = new vscode.SignatureInformation(apiItem.signature || `${funcName}(...)`);
        sigInfo.documentation = apiItem.description;
        
        // 添加参数信息
        for (const param of apiItem.params) {
            const paramInfo = new vscode.ParameterInformation(param.name);
            paramInfo.documentation = `${param.type}: ${param.description}`;
            if (param.default) {
                paramInfo.documentation += ` [默认: ${param.default}]`;
            }
            sigInfo.parameters.push(paramInfo);
        }
        
        sigHelp.signatures.push(sigInfo);
        sigHelp.activeSignature = 0;
        
        // 计算当前参数索引
        const args = argsText.split(',').map(a => a.trim()).filter(a => a.length > 0);
        sigHelp.activeParameter = Math.min(args.length, apiItem.params.length - 1);
        
        return sigHelp;
    }
}

// 模块文档面板
class ModuleDocPanel {
    private panel: vscode.WebviewPanel | undefined;
    
    constructor(private extensionUri: vscode.Uri) {}
    
    show(moduleName?: string) {
        if (this.panel) {
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel(
                'unisonModuleDoc',
                'Unison API 文档',
                vscode.ViewColumn.Two,
                { enableScripts: true }
            );
            
            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
            
            this.panel.webview.onDidReceiveMessage(
                async (message) => {
                    if (message.command === 'search') {
                        const results = searchApi(message.query);
                        this.updateContent(results);
                    } else if (message.command === 'selectModule') {
                        const items = unisonModules[message.module] || [];
                        this.updateContent(items, message.module);
                    }
                }
            );
        }
        
        this.updateInitialContent(moduleName);
    }
    
    private updateInitialContent(moduleName?: string) {
        if (!this.panel) return;
        
        let html = this.getBaseHtml();
        
        if (moduleName && unisonModules[moduleName]) {
            html += `<script>selectModule('${moduleName}')</script>`;
        }
        
        this.panel.webview.html = html;
    }
    
    private updateContent(items: ApiItem[], moduleName?: string) {
        if (!this.panel) return;
        
        let itemsHtml = '';
        if (moduleName) {
            itemsHtml += `<h2>${moduleName}</h2>`;
        }
        
        for (const item of items) {
            if (item.kind === 'module') continue;
            
            itemsHtml += `<div class="api-item">
                <h3><span class="kind-${item.kind}">${item.kind}</span> ${item.name}</h3>
                <p class="signature">${item.signature || ''}</p>
                <p class="description">${item.description}</p>`;
            
            if (item.params && item.params.length > 0) {
                itemsHtml += '<div class="params"><strong>参数:</strong><ul>';
                for (const param of item.params) {
                    itemsHtml += `<li><code>${param.name}</code> (${param.type}): ${param.description}`;
                    if (param.default) {
                        itemsHtml += ` [<em>默认: ${param.default}</em>]`;
                    }
                    itemsHtml += '</li>';
                }
                itemsHtml += '</ul></div>';
            }
            
            if (item.returns) {
                itemsHtml += `<div class="returns"><strong>返回:</strong> <code>${item.returns.type}</code> - ${item.returns.description}</div>`;
            }
            
            if (item.example) {
                itemsHtml += `<div class="example"><strong>示例:</strong><pre><code>${item.example}</code></pre></div>`;
            }
            
            itemsHtml += '</div>';
        }
        
        this.panel.webview.postMessage({ command: 'updateContent', html: itemsHtml });
    }
    
    private getBaseHtml(): string {
        const moduleNames = getModuleNames();
        
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Unison API 文档</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: var(--vscode-editor-background); color: var(--vscode-editor-foreground); }
        h1 { color: var(--vscode-editor-foreground); border-bottom: 2px solid var(--vscode-panel-border); }
        h2 { color: var(--vscode-textLink-foreground); }
        h3 { margin: 10px 0 5px; }
        .search-box { margin-bottom: 20px; }
        .search-box input { width: 100%; padding: 8px; border: 1px solid var(--vscode-input-border); background: var(--vscode-input-background); color: var(--vscode-input-foreground); }
        .modules-list { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .module-btn { padding: 5px 10px; border: 1px solid var(--vscode-button-border); background: var(--vscode-button-background); color: var(--vscode-button-foreground); cursor: pointer; border-radius: 3px; }
        .module-btn:hover { background: var(--vscode-button-hoverBackground); }
        .api-item { background: var(--vscode-editor-inactiveSelectionBackground); padding: 15px; margin: 10px 0; border-radius: 5px; }
        .signature { color: var(--vscode-textLink-foreground); font-family: monospace; }
        .kind-function { color: #4EC9B0; }
        .kind-method { color: #4EC9B0; }
        .kind-class { color: #569CD6; }
        .kind-property { color: #9CDCFE; }
        .kind-constant { color: #4FC1FF; }
        .params ul { margin: 5px 0; padding-left: 20px; }
        .params li { margin: 3px 0; }
        .returns { margin: 5px 0; }
        .example { margin: 10px 0; }
        .example pre { background: var(--vscode-textCodeBlock-background); padding: 10px; border-radius: 3px; overflow-x: auto; }
        code { font-family: Consolas, 'Courier New', monospace; }
        #content { margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Unison Engine API 文档</h1>
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="搜索 API..." onkeyup="doSearch()">
    </div>
    <div class="modules-list">
        ${moduleNames.map(m => `<button class="module-btn" onclick="selectModule('${m}')">${m.replace('unison.', '')}</button>`).join('')}
    </div>
    <div id="content"></div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function doSearch() {
            const query = document.getElementById('searchInput').value;
            vscode.postMessage({ command: 'search', query: query });
        }
        
        function selectModule(moduleName) {
            vscode.postMessage({ command: 'selectModule', module: moduleName });
        }
        
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'updateContent') {
                document.getElementById('content').innerHTML = message.html;
            }
        });
    </script>
</body>
</html>`;
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Unison Engine extension is now active!');
    
    // 注册补全提供器
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        ['python', 'unison-python'],
        new UnisonCompletionProvider(),
        '.', ' ', '(', ','
    );
    
    // 注册悬停提示提供器
    const hoverProvider = vscode.languages.registerHoverProvider(
        ['python', 'unison-python'],
        new UnisonHoverProvider()
    );
    
    // 注册签名帮助提供器
    const signatureProvider = vscode.languages.registerSignatureHelpProvider(
        ['python', 'unison-python'],
        new UnisonSignatureHelpProvider(),
        ',', '('
    );
    
    // 创建模块文档面板
    const moduleDocPanel = new ModuleDocPanel(context.extensionUri);
    
    // 注册命令
    const showModuleDocCommand = vscode.commands.registerCommand(
        'unison-engine.showModuleDoc',
        () => {
            // 获取当前选中的文本
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selection = editor.selection;
                const selectedText = editor.document.getText(selection);
                if (selectedText) {
                    moduleDocPanel.show(selectedText);
                } else {
                    moduleDocPanel.show();
                }
            } else {
                moduleDocPanel.show();
            }
        }
    );
    
    const createSceneScriptCommand = vscode.commands.registerCommand(
        'unison-engine.createSceneScript',
        async () => {
            const sceneName = await vscode.window.showInputBox({
                prompt: '输入场景名称',
                placeHolder: 'scene_name'
            });
            
            if (!sceneName) return;
            
            const template = `# Unison Engine Scene Script
# Scene: ${sceneName}

import unison.render
import unison.cocosui as ccui
import unison.wwise as wwise
import unison.excore

def on_scene():
    """场景加载时调用"""
    # 初始化场景

def on_update(dt: float):
    """每帧更新"""
    unison.render.update_logic_fps(dt)
    wwise.render_audio()

def on_render():
    """渲染帧"""
    unison.render.begin_scene(0.0, 0.0, 0.0, 1.0)
    # 渲染逻辑
    unison.render.end_scene()

def on_key(key: str, state: bool):
    """键盘输入"""
    # 处理键盘输入

def on_scene_leave():
    """离开场景时调用"""
    # 清理资源
`;
            
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const scenePath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'scene', `${sceneName}.py`);
                await vscode.workspace.fs.writeFile(scenePath, Buffer.from(template, 'utf-8'));
                const doc = await vscode.workspace.openTextDocument(scenePath);
                vscode.window.showTextDocument(doc);
            }
        }
    );
    
    const createInitScriptCommand = vscode.commands.registerCommand(
        'unison-engine.createInitScript',
        async () => {
            const template = `# Unison Engine Init Script

import unison.excore
import unison.render
import unison.cocosui as cocosui
import unison.wwise as wwise
import builtins

w, h = 1280, 720
title = "Unison Engine"
builtins.game_width = w
builtins.game_height = h

def on_start():
    """引擎启动时调用"""
    unison.excore.create_window(title, w, h)
    unison.excore.hide_window()
    # 初始化子系统
    wwise.initialize('wwise')
    wwise.add_vfs_search_path("wwise/")
    wwise.load_bank('Init.bnk')
    cocosui.initialize()
    unison.excore.show_window()
`;
            
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const initPath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'Scripts', 'init.py');
                await vscode.workspace.fs.writeFile(initPath, Buffer.from(template, 'utf-8'));
                const doc = await vscode.workspace.openTextDocument(initPath);
                vscode.window.showTextDocument(doc);
            }
        }
    );
    
    context.subscriptions.push(
        completionProvider,
        hoverProvider,
        signatureProvider,
        showModuleDocCommand,
        createSceneScriptCommand,
        createInitScriptCommand
    );
}

export function deactivate() {
    console.log('Unison Engine extension deactivated');
}