import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, BarChart3, Star, Users, Github } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'AI智能审查',
      description: '使用先进的AI模型分析代码质量和潜在问题，提供专业的改进建议。'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '实时分析',
      description: '快速分析代码，提供即时反馈，帮助开发者快速发现和解决问题。'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '安全可靠',
      description: '本地处理，保护代码隐私，无需担心敏感信息泄露。'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: '详细报告',
      description: '提供详细的代码质量评分、复杂度分析和改进建议。'
    }
  ];

  const stats = [
    { icon: <Star className="w-5 h-5" />, value: '1000+', label: 'GitHub Stars' },
    { icon: <Users className="w-5 h-5" />, value: '500+', label: '活跃用户' },
    { icon: <Code className="w-5 h-5" />, value: '10+', label: '支持语言' },
    { icon: <Zap className="w-5 h-5" />, value: '99.9%', label: '可用性' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">AI驱动的</span>
            <br />
            智能代码审查
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            使用先进的AI技术，帮助开发者提高代码质量，发现潜在问题，学习最佳实践。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/review"
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <span>开始审查</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/yourusername/ai-code-reviewer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>查看源码</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">强大功能</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            我们的AI代码审查工具提供全面的代码分析功能，帮助您编写更好的代码。
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">项目数据</h2>
          <p className="text-gray-600 dark:text-gray-300">
            看看我们的项目有多受欢迎
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2 text-primary-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">准备开始了吗？</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            立即体验AI驱动的代码审查，提升您的代码质量。
          </p>
          <Link
            to="/review"
            className="btn-primary inline-flex items-center justify-center space-x-2"
          >
            <span>免费试用</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 