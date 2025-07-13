import React from 'react';
import { Github, Mail, Heart, Code, Users, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      title: 'AI驱动',
      description: '使用先进的AI模型，提供专业的代码审查和建议。'
    },
    {
      title: '多语言支持',
      description: '支持Python、JavaScript、TypeScript、Java等多种编程语言。'
    },
    {
      title: '实时分析',
      description: '快速分析代码，提供即时反馈和改进建议。'
    },
    {
      title: '隐私保护',
      description: '本地处理，保护您的代码隐私和安全。'
    }
  ];

  const team = [
    {
      name: '开发团队',
      role: '核心开发者',
      description: '致力于为开发者提供最好的代码审查工具。'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-6">关于 AI Code Reviewer</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          我们致力于为开发者提供最先进的AI驱动代码审查工具，帮助您编写更好的代码。
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/yourusername/ai-code-reviewer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>查看源码</span>
          </a>
          <a
            href="mailto:your.email@example.com"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>联系我们</span>
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">我们的使命</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过AI技术，让代码审查变得更加智能、高效和准确，帮助开发者提升代码质量，减少bug，提高开发效率。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">技术栈</h2>
          <p className="text-gray-600 dark:text-gray-300">
            我们使用最新的技术来构建这个强大的代码审查工具
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">后端技术</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Python - 主要编程语言</li>
              <li>• Flask - Web框架</li>
              <li>• OpenAI API - AI模型接口</li>
              <li>• SQLite - 数据存储</li>
              <li>• JWT - 身份认证</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">前端技术</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• React - 用户界面框架</li>
              <li>• TypeScript - 类型安全</li>
              <li>• Tailwind CSS - 样式框架</li>
              <li>• Axios - HTTP客户端</li>
              <li>• React Router - 路由管理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">开发团队</h2>
          <p className="text-gray-600 dark:text-gray-300">
            我们是一群热爱技术的开发者，致力于为社区创造有价值的工具
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-8">
          {team.map((member, index) => (
            <div key={index} className="card text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-primary-600 mb-4">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">项目统计</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2 text-primary-600">
              <Star className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">GitHub Stars</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2 text-primary-600">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-600 dark:text-gray-300">活跃用户</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2 text-primary-600">
              <Code className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">10+</div>
            <div className="text-gray-600 dark:text-gray-300">支持语言</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2 text-primary-600">
              <Heart className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold">开源</div>
            <div className="text-gray-600 dark:text-gray-300">MIT许可证</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">联系我们</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          有任何问题或建议？我们很乐意听到您的声音！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/yourusername/ai-code-reviewer/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>提交问题</span>
          </a>
          <a
            href="mailto:your.email@example.com"
            className="btn-secondary inline-flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>发送邮件</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 