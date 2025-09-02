// 易语言风格桌面应用演示
// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

/*
    Function to display information about the Neutralino app.
    This function updates the content of the 'info' element in the HTML
    with details regarding the running Neutralino application, including
    its ID, port, operating system, and version information.
*/
function showInfo() {
    document.getElementById('info').innerHTML = `
        ${NL_APPID} is running on port ${NL_PORT} inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
        `;
}

/*
    Function to open the official Neutralino documentation in the default web browser.
*/
function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

/*
    Function to open a tutorial video on Neutralino's official YouTube channel in the default web browser.
*/
function openTutorial() {
    Neutralino.os.open("https://www.youtube.com/c/CodeZri");
}

/*
    Function to set up a system tray menu with options specific to the window mode.
    This function checks if the application is running in window mode, and if so,
    it defines the tray menu items and sets up the tray accordingly.
*/
function setTray() {
    // Tray menu is only available in window mode
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }

    // Define tray menu items
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };

    // Set the tray menu
    Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
    This function performs different actions based on the clicked item's ID,
    such as displaying version information or exiting the application.
*/
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "VERSION":
            // Display version information
            Neutralino.os.showMessageBox("Version information",
                `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "QUIT":
            // Exit the application
            Neutralino.app.exit();
            break;
    }
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
    Neutralino.app.exit();
}

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}

// Display app information
showInfo();

// ===== 易语言风格功能函数 =====

/*
    显示信息框 - 类似易语言的"信息框"命令
    弹出一个简单的提示框
*/
function showMessage() {
    try {
        Neutralino.os.showMessageBox(
            "信息提示", 
            "你好，欢迎使用易语言风格的桌面应用！\n\n这是一个使用Neutralino.js创建的原生桌面应用。"
        );
    } catch (error) {
        console.error('显示信息框失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">显示信息框失败: ' + error.message + '</span>';
    }
}

/*
    询问问题 - 类似易语言的"询问"命令
    弹出一个确认对话框
*/
function askQuestion() {
    try {
        const result = Neutralino.os.showMessageBox(
            "确认操作", 
            "你确定要继续这个操作吗？\n\n点击确定继续，点击取消退出。",
            'YES_NO', // 显示是/否按钮
            'QUESTION' // 询问图标
        );
        
        let message = result === 'YES' ? '你点击了确定按钮' : '你点击了取消按钮';
        document.getElementById('outputArea').innerHTML = `<span style="color: blue;">${message}</span>`;
    } catch (error) {
        console.error('询问问题失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">询问问题失败: ' + error.message + '</span>';
    }
}

/*
    打开记事本 - 类似易语言的"运行"命令
    调用系统默认程序打开记事本
*/
function openNotepad() {
    try {
        // 根据不同操作系统选择不同的记事本程序
        let command = '';
        if (NL_OS === 'Windows') {
            command = 'notepad.exe';
        } else if (NL_OS === 'Darwin') {
            command = 'TextEdit.app';
        } else {
            command = 'gedit';
        }
        
        if (NL_OS === 'Darwin') {
            // macOS使用open命令
            Neutralino.os.execCommand(`open -a TextEdit`);
        } else {
            // Windows和Linux
            Neutralino.os.execCommand(command);
        }
        
        document.getElementById('outputArea').innerHTML = '<span style="color: green;">正在打开记事本...</span>';
    } catch (error) {
        console.error('打开记事本失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">打开记事本失败: ' + error.message + '</span>';
    }
}

/*
    选择文件 - 类似易语言的"文件选择框"命令
    打开文件选择对话框
*/
async function selectFile() {
    try {
        const entry = await Neutralino.os.showOpenDialog(
            '选择文件', // 标题
            {
                filters: [
                    { name: '文本文件', extensions: ['txt', 'md'] },
                    { name: '所有文件', extensions: ['*'] }
                ]
            }
        );
        
        if (entry.length > 0) {
            const selectedFile = entry[0];
            document.getElementById('outputArea').innerHTML = `<span style="color: green;">选择的文件: ${selectedFile}</span>`;
        } else {
            document.getElementById('outputArea').innerHTML = '<span style="color: orange;">未选择任何文件</span>';
        }
    } catch (error) {
        console.error('选择文件失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">选择文件失败: ' + error.message + '</span>';
    }
}

/*
    选择文件夹 - 类似易语言的"目录选择框"命令
    打开文件夹选择对话框
*/
async function selectFolder() {
    try {
        const entry = await Neutralino.os.showFolderDialog('选择文件夹');
        
        if (entry.length > 0) {
            const selectedFolder = entry[0];
            document.getElementById('outputArea').innerHTML = `<span style="color: green;">选择的文件夹: ${selectedFolder}</span>`;
        } else {
            document.getElementById('outputArea').innerHTML = '<span style="color: orange;">未选择任何文件夹</span>';
        }
    } catch (error) {
        console.error('选择文件夹失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">选择文件夹失败: ' + error.message + '</span>';
    }
}

/*
    显示系统信息 - 类似易语言的"取系统信息"命令
    获取并显示系统基本信息
*/
function showSystemInfo() {
    try {
        const info = `
操作系统: ${NL_OS}
应用ID: ${NL_APPID}
运行端口: ${NL_PORT}
Neutralino版本: v${NL_VERSION}
客户端版本: v${NL_CVERSION}
运行模式: ${NL_MODE}
        `.trim();
        
        document.getElementById('outputArea').innerHTML = `<pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; font-size: 12px;">${info}</pre>`;
    } catch (error) {
        console.error('显示系统信息失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">显示系统信息失败: ' + error.message + '</span>';
    }
}

/*
    显示输入内容 - 类似易语言的"编辑框.内容"命令
    获取输入框的内容并显示
*/
function showInputText() {
    try {
        const inputElement = document.getElementById('textInput');
        const text = inputElement.value.trim();
        
        if (text === '') {
            document.getElementById('outputArea').innerHTML = '<span style="color: orange;">请先输入一些文本</span>';
            return;
        }
        
        const currentTime = new Date().toLocaleString();
        const result = `
输入时间: ${currentTime}
输入内容: "${text}"
字符数量: ${text.length}
        `.trim();
        
        document.getElementById('outputArea').innerHTML = `<pre style="background: #e8f4f8; padding: 10px; border-radius: 4px; font-size: 12px;">${result}</pre>`;
    } catch (error) {
        console.error('显示输入内容失败:', error);
        document.getElementById('outputArea').innerHTML = '<span style="color: red;">显示输入内容失败: ' + error.message + '</span>';
    }
}

/*
    为输入框添加回车键支持
    类似易语言的回车键事件处理
*/
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    
    // 监听回车键
    textInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            showInputText();
        }
    });
    
    console.log('易语言风格桌面应用已加载完成！');
});
