#!/bin/bash

echo "🚀 启动 AI Code Reviewer 项目"
echo "================================"

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 Python3，请先安装 Python 3.8+"
    exit 1
fi

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js 16+"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 npm"
    exit 1
fi

echo "✅ 环境检查通过"

# 创建虚拟环境（如果不存在）
if [ ! -d "venv" ]; then
    echo "📦 创建Python虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
pip install -r requirements.txt
cd ..

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 依赖安装完成！"
echo ""
echo "📝 使用说明："
echo "1. 启动后端服务: cd backend && python app.py"
echo "2. 启动前端服务: cd frontend && npm start"
echo "3. 访问应用: http://localhost:3000"
echo ""
echo "🔧 可选配置："
echo "- 设置 OPENAI_API_KEY 环境变量以获得真实的AI分析"
echo "- 修改 backend/app.py 中的端口配置"
echo ""
echo "�� 更多信息请查看 README.md" 