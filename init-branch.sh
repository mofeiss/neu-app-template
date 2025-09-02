#!/bin/bash

# NeutralinoJS 新分支初始化脚本
# 用途：在新创建的分支上初始化 NeutralinoJS 环境

echo "🚀 开始初始化 NeutralinoJS 环境..."

# 检查 neu 命令是否存在
if ! command -v neu &> /dev/null; then
    echo "❌ 错误：neu 命令未找到，请先安装 NeutralinoJS"
    exit 1
fi

# 检查是否存在 neutralino.config.json 文件
if [ ! -f "neutralino.config.json" ]; then
    echo "❌ 错误：找不到 neutralino.config.json 文件"
    exit 1
fi

# 显示当前分支信息
current_branch=$(git branch --show-current)
echo "📍 当前分支：$current_branch"

# 检查 bin 目录是否存在
if [ -d "bin" ]; then
    echo "✅ bin 目录已存在"
else
    echo "📦 正在下载 NeutralinoJS 二进制文件..."
    neu update
    if [ $? -eq 0 ]; then
        echo "✅ NeutralinoJS 二进制文件下载成功"
    else
        echo "❌ NeutralinoJS 二进制文件下载失败"
        exit 1
    fi
fi

# 检查 client 库是否存在
if [ -f "resources/js/neutralino.js" ]; then
    echo "✅ NeutralinoJS 客户端库已存在"
else
    echo "📦 正在更新 NeutralinoJS 客户端库..."
    neu update
    if [ $? -eq 0 ]; then
        echo "✅ NeutralinoJS 客户端库更新成功"
    else
        echo "❌ NeutralinoJS 客户端库更新失败"
        exit 1
    fi
fi

echo "🎉 NeutralinoJS 环境初始化完成！"
echo ""
echo "📋 可用命令："
echo "  neu run     - 启动应用"
echo "  neu build   - 构建应用"
echo "  neu version - 查看版本信息"
echo ""
echo "💡 运行 'neu run' 来启动应用"

# 询问是否立即启动应用
read -p "是否立即启动应用？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 启动应用..."
    neu run
fi