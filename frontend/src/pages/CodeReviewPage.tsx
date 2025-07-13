import React, { useState } from 'react';
import { Upload, Code, Play, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import ReviewResults from '../components/ReviewResults';
import { reviewCode } from '../services/api';

interface ReviewResult {
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
}

const CodeReviewPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ReviewResult | null>(null);
  const [error, setError] = useState('');

  const languages = [
    { id: 'python', name: 'Python', ext: '.py' },
    { id: 'javascript', name: 'JavaScript', ext: '.js' },
    { id: 'typescript', name: 'TypeScript', ext: '.ts' },
    { id: 'java', name: 'Java', ext: '.java' },
    { id: 'cpp', name: 'C++', ext: '.cpp' },
    { id: 'csharp', name: 'C#', ext: '.cs' },
    { id: 'go', name: 'Go', ext: '.go' },
    { id: 'rust', name: 'Rust', ext: '.rs' },
    { id: 'php', name: 'PHP', ext: '.php' },
    { id: 'ruby', name: 'Ruby', ext: '.rb' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        
        // Try to detect language from file extension
        const ext = file.name.split('.').pop()?.toLowerCase();
        const detectedLang = languages.find(lang => lang.ext === `.${ext}`);
        if (detectedLang) {
          setLanguage(detectedLang.id);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReview = async () => {
    if (!code.trim()) {
      setError('请输入代码');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      const result = await reviewCode(code, language);
      setResults(result);
    } catch (err) {
      setError('代码审查失败，请重试');
      console.error('Review error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!results) return;
    
    const report = `
# AI Code Review Report

## Summary
- Quality Level: ${results.summary.quality_level}
- Overall Score: ${results.summary.overall_score}/10
- Code Size: ${results.summary.code_size}
- Complexity: ${results.summary.complexity}/10
- Issues Found: ${results.summary.main_issues}
- Improvements Needed: ${results.summary.improvements_needed}

## Quality Assessment
${results.ai_review.quality_assessment}

## Issues
${results.ai_review.issues.map(issue => `- ${issue}`).join('\n')}

## Performance
${results.ai_review.performance}

## Security Concerns
${results.ai_review.security.map(concern => `- ${concern}`).join('\n')}

## Best Practices
${results.ai_review.best_practices.map(practice => `- ${practice}`).join('\n')}

## Improvements
${results.ai_review.improvements.map(improvement => `- ${improvement}`).join('\n')}
    `;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-review-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">AI代码审查</h1>
        <p className="text-gray-600 dark:text-gray-300">
          上传代码或直接输入，让AI为您提供专业的代码审查建议
        </p>
      </div>

      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Code Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">代码输入</h2>
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field w-auto"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              拖拽文件到此处或点击选择文件
            </p>
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".py,.js,.ts,.java,.cpp,.cc,.cxx,.cs,.go,.rs,.php,.rb,.html,.css"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-secondary cursor-pointer inline-flex items-center space-x-2"
            >
              <span>选择文件</span>
            </label>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">代码内容</label>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              placeholder="在此输入您的代码..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleReview}
              disabled={isLoading || !code.trim()}
              className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>分析中...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>开始审查</span>
                </>
              )}
            </button>
            {results && (
              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>下载报告</span>
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-error-600 dark:text-error-400">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">审查结果</h2>
          {isLoading ? (
            <div className="card text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary-600 animate-spin" />
              <p className="text-gray-600 dark:text-gray-300">
                AI正在分析您的代码，请稍候...
              </p>
            </div>
          ) : results ? (
            <ReviewResults results={results} />
          ) : (
            <div className="card text-center py-12">
              <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-300">
                输入代码并点击"开始审查"来获取AI分析结果
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewPage; 
 