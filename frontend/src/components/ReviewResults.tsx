import React from 'react';
import { CheckCircle, AlertTriangle, Info, Star, TrendingUp, AlertCircle } from 'lucide-react';

interface ReviewResultsProps {
  results: {
    ai_review: {
      score: number;
      quality_assessment: string;
      issues: string[];
      performance: string;
      security: string[];
      best_practices: string[];
      improvements: string[];
    };
    metrics: any;
    summary: {
      quality_level: string;
      overall_score: number;
      code_size: string;
      complexity: number;
      main_issues: number;
      improvements_needed: number;
    };
  };
}

const ReviewResults: React.FC<ReviewResultsProps> = ({ results }) => {
  const { ai_review, metrics, summary } = results;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success-600';
    if (score >= 6) return 'text-warning-600';
    return 'text-error-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-5 h-5" />;
    if (score >= 6) return <AlertTriangle className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">总体评分</h3>
          <div className={`flex items-center space-x-2 ${getScoreColor(summary.overall_score)}`}>
            {getScoreIcon(summary.overall_score)}
            <span className="text-2xl font-bold">{summary.overall_score}/10</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {summary.quality_level}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">质量等级</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {summary.code_size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">代码大小</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {summary.complexity}/10
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">复杂度</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {summary.main_issues}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">问题数量</div>
          </div>
        </div>
      </div>

      {/* Quality Assessment */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">质量评估</h3>
        <p className="text-gray-700 dark:text-gray-300">{ai_review.quality_assessment}</p>
      </div>

      {/* Issues */}
      {ai_review.issues.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-error-600" />
            <span>发现的问题</span>
          </h3>
          <ul className="space-y-2">
            {ai_review.issues.map((issue, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-error-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <span>性能分析</span>
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{ai_review.performance}</p>
      </div>

      {/* Security */}
      {ai_review.security.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-warning-600" />
            <span>安全考虑</span>
          </h3>
          <ul className="space-y-2">
            {ai_review.security.map((concern, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-warning-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Best Practices */}
      {ai_review.best_practices.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <span>最佳实践</span>
          </h3>
          <ul className="space-y-2">
            {ai_review.best_practices.map((practice, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-success-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {ai_review.improvements.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-primary-600" />
            <span>改进建议</span>
          </h3>
          <ul className="space-y-2">
            {ai_review.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code Metrics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">代码指标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {metrics.total_lines}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">总行数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {metrics.code_lines}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">代码行数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {metrics.comment_lines}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">注释行数</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {metrics.functions || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">函数数量</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResults; 