# neutralinojs-minimal

The default template for a Neutralinojs app. It's possible to use your favorite frontend framework by using [these steps](https://neutralino.js.org/docs/getting-started/using-frontend-libraries).

## 快速开始

### 首次使用

如果是新分支或首次使用项目，需要先下载 NeutralinoJS 二进制文件：

```bash
neu update
```

### 启动应用

运行以下命令启动应用：

```bash
neu run
```

### 其他常用命令

- 构建应用：`neu build`
- 查看版本信息：`neu version`
- 管理插件：`neu plugins`

## 新分支初始化

每次创建新分支后，运行以下脚本来初始化环境：

```bash
./init-branch.sh
```

这个脚本会自动：
- 检查并下载 NeutralinoJS 二进制文件
- 更新客户端库
- 验证环境配置
- 提供立即启动应用的选项

### 手动初始化

如果需要手动初始化，可以执行：

```bash
neu update
neu run
```

## Contributors

[![Contributors](https://contrib.rocks/image?repo=neutralinojs/neutralinojs-minimal)](https://github.com/neutralinojs/neutralinojs-minimal/graphs/contributors)

## License

[MIT](LICENSE)

## Icon credits

- `trayIcon.png` - Made by [Freepik](https://www.freepik.com) and downloaded from [Flaticon](https://www.flaticon.com)
