# AI Code Reviewer API 文档

## 概述

AI Code Reviewer 提供 RESTful API 接口，支持代码审查和分析功能。

## 基础信息

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **认证**: 目前无需认证

## 响应格式

所有API响应都遵循以下格式：

```json
{
  "success": true,
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 端点

### 1. 健康检查

**GET** `/health`

检查服务是否正常运行。

**响应示例：**
```json
{
  "success": true,
  "message": "Service is running",
  "data": {
    "status": "healthy"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 2. 代码审查

**POST** `/review`

对代码进行AI驱动的审查分析。

**请求参数：**
```json
{
  "code": "def hello_world():\n    print('Hello, World!')",
  "language": "python"
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "Code review completed",
  "data": {
    "ai_review": {
      "score": 8,
      "quality_assessment": "代码质量良好，结构清晰",
      "issues": ["缺少文档字符串"],
      "performance": "性能表现良好",
      "security": ["无安全风险"],
      "best_practices": ["遵循PEP 8规范"],
      "improvements": ["添加函数文档"]
    },
    "metrics": {
      "total_lines": 2,
      "code_lines": 2,
      "comment_lines": 0,
      "blank_lines": 0,
      "characters": 45,
      "words": 6,
      "complexity_score": 1,
      "function_count": 1
    },
    "summary": {
      "quality_level": "Good",
      "overall_score": 8,
      "code_size": "2 lines",
      "complexity": 1,
      "main_issues": 1,
      "improvements_needed": 1
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 3. 获取支持的语言

**GET** `/languages`

获取支持的编程语言列表。

**响应示例：**
```json
{
  "success": true,
  "message": "Supported languages retrieved",
  "data": {
    "languages": [
      {
        "id": "python",
        "name": "Python",
        "extensions": [".py"]
      },
      {
        "id": "javascript",
        "name": "JavaScript",
        "extensions": [".js"]
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 4. 代码分析

**POST** `/analyze`

分析代码复杂度和指标。

**请求参数：**
```json
{
  "code": "def hello_world():\n    print('Hello, World!')",
  "language": "python"
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "Code analysis completed",
  "data": {
    "total_lines": 2,
    "code_lines": 2,
    "comment_lines": 0,
    "blank_lines": 0,
    "characters": 45,
    "words": 6,
    "complexity_score": 1,
    "function_count": 1
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 错误处理

当发生错误时，API会返回相应的HTTP状态码和错误信息：

**400 Bad Request**
```json
{
  "success": false,
  "message": "Code is required",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 支持的语言

- Python (.py)
- JavaScript (.js)
- TypeScript (.ts)
- Java (.java)
- C++ (.cpp, .cc, .cxx)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- PHP (.php)
- Ruby (.rb)

## 使用示例

### JavaScript/TypeScript

```javascript
const reviewCode = async (code, language) => {
  try {
    const response = await fetch('http://localhost:5000/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, language }),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

// 使用示例
const code = `def hello_world():
    print('Hello, World!')`;

reviewCode(code, 'python').then(result => {
  console.log(result);
});
```

### Python

```python
import requests
import json

def review_code(code, language):
    url = "http://localhost:5000/api/review"
    data = {
        "code": code,
        "language": language
    }
    
    try:
        response = requests.post(url, json=data)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# 使用示例
code = """def hello_world():
    print('Hello, World!')"""

result = review_code(code, 'python')
print(json.dumps(result, indent=2))
```

## 环境变量

- `OPENAI_API_KEY`: OpenAI API密钥（可选，用于真实AI分析）
- `FLASK_ENV`: Flask环境（development/production）
- `PORT`: 服务端口（默认5000）

## 限制

- 代码长度限制：10,000字符
- 文件大小限制：1MB
- 请求频率：无限制（但建议合理使用） 