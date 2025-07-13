# 🤖 AI Code Reviewer

一个智能的AI驱动代码审查助手，帮助开发者提高代码质量和开发效率。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Stars](https://img.shields.io/github/stars/thuzhangbo/ai-code-reviewer?style=social)](https://github.com/thuzhangbo/ai-code-reviewer)

## ✨ 特性

- 🤖 **AI智能审查**: 使用先进的AI模型分析代码质量和潜在问题
- 🌍 **多语言支持**: 支持Python、JavaScript、TypeScript、Java、C++等多种编程语言
- 📊 **质量评分**: 提供详细的代码质量评分和改进建议
- 🎨 **现代化UI**: 简洁美观的Web界面，支持深色/浅色主题
- ⚡ **实时分析**: 快速分析代码，提供即时反馈
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🔒 **隐私保护**: 本地处理，保护代码隐私

## 🚀 快速开始

### 环境要求

- Python 3.8+
- Node.js 16+
- npm 或 yarn

### 安装

1. 克隆项目
```bash
git clone https://github.com/thuzhangbo/ai-code-reviewer.git
cd ai-code-reviewer
```

2. 安装后端依赖
```bash
cd backend
pip install -r requirements.txt
```

3. 安装前端依赖
```bash
cd ../frontend
npm install
```

4. 启动服务
```bash
# 启动后端服务
cd backend
python app.py

# 启动前端服务（新终端）
cd frontend
npm start
```

5. 访问应用
打开浏览器访问 http://localhost:3000

## 📖 使用说明

1. **上传代码**: 将你的代码文件拖拽到上传区域或点击选择文件
2. **选择语言**: 选择代码的编程语言
3. **开始分析**: 点击"开始分析"按钮
4. **查看结果**: 查看AI提供的代码质量评分和改进建议
5. **应用建议**: 根据建议优化你的代码

## 🛠️ 技术栈

### 后端
- **Python**: 主要编程语言
- **Flask**: Web框架
- **OpenAI API**: AI模型接口
- **SQLite**: 数据存储
- **JWT**: 身份认证

### 前端
- **React**: 用户界面框架
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Axios**: HTTP客户端
- **React Router**: 路由管理

## 📁 项目结构

```
ai-code-reviewer/
├── backend/                 # 后端服务
│   ├── app.py              # 主应用文件
│   ├── models/             # 数据模型
│   ├── services/           # 业务逻辑
│   ├── utils/              # 工具函数
│   └── requirements.txt    # Python依赖
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── pages/          # 页面组件
│   │   ├── services/       # API服务
│   │   └── utils/          # 工具函数
│   ├── public/             # 静态资源
│   └── package.json        # Node.js依赖
├── docs/                   # 文档
├── tests/                  # 测试文件
└── README.md              # 项目说明
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 开发计划

- [ ] 支持更多编程语言
- [ ] 集成GitHub/GitLab
- [ ] 团队协作功能
- [ ] 代码历史追踪
- [ ] 自定义规则配置
- [ ] 移动端应用

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [OpenAI](https://openai.com/) - 提供AI模型
- [React](https://reactjs.org/) - 前端框架
- [Flask](https://flask.palletsprojects.com/) - 后端框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架

## 📞 联系我们

- 项目主页: https://github.com/thuzhangbo/ai-code-reviewer
- 问题反馈: https://github.com/thuzhangbo/ai-code-reviewer/issues
- 邮箱: your.email@example.com

---

如果这个项目对你有帮助，请给我们一个 ⭐️ 支持！ 