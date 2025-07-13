#!/usr/bin/env python3
"""
AI Code Reviewer 演示脚本
"""

import requests
import json
import time

def test_api():
    """测试API功能"""
    base_url = "http://localhost:5000/api"
    
    print("🚀 AI Code Reviewer 演示")
    print("=" * 50)
    
    # 测试健康检查
    print("1. 测试健康检查...")
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ 后端服务正常运行")
        else:
            print("❌ 后端服务异常")
            return
    except Exception as e:
        print(f"❌ 无法连接到后端服务: {e}")
        return
    
    # 测试获取支持的语言
    print("\n2. 获取支持的语言...")
    try:
        response = requests.get(f"{base_url}/languages")
        if response.status_code == 200:
            languages = response.json()["data"]["languages"]
            print(f"✅ 支持 {len(languages)} 种编程语言:")
            for lang in languages[:5]:  # 只显示前5种
                print(f"   - {lang['name']} ({lang['id']})")
        else:
            print("❌ 获取语言列表失败")
    except Exception as e:
        print(f"❌ 获取语言列表出错: {e}")
    
    # 测试代码审查
    print("\n3. 测试代码审查功能...")
    
    # Python示例代码
    python_code = '''def calculate_fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

def main():
    result = calculate_fibonacci(10)
    print(f"Fibonacci(10) = {result}")

if __name__ == "__main__":
    main()'''
    
    try:
        response = requests.post(
            f"{base_url}/review",
            json={
                "code": python_code,
                "language": "python"
            },
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            if result["success"]:
                data = result["data"]
                summary = data["summary"]
                ai_review = data["ai_review"]
                metrics = data["metrics"]
                
                print("✅ 代码审查完成!")
                print(f"   质量等级: {summary['quality_level']}")
                print(f"   总体评分: {summary['overall_score']}/10")
                print(f"   代码行数: {summary['code_size']}")
                print(f"   复杂度: {summary['complexity']}/10")
                print(f"   发现问题: {summary['main_issues']} 个")
                print(f"   改进建议: {summary['improvements_needed']} 个")
                
                print(f"\n   质量评估: {ai_review['quality_assessment']}")
                
                if ai_review['issues']:
                    print(f"\n   主要问题:")
                    for issue in ai_review['issues'][:3]:  # 只显示前3个
                        print(f"   - {issue}")
                
                if ai_review['improvements']:
                    print(f"\n   改进建议:")
                    for improvement in ai_review['improvements'][:3]:  # 只显示前3个
                        print(f"   - {improvement}")
                
                print(f"\n   代码指标:")
                print(f"   - 总行数: {metrics['total_lines']}")
                print(f"   - 代码行数: {metrics['code_lines']}")
                print(f"   - 注释行数: {metrics['comment_lines']}")
                print(f"   - 函数数量: {metrics['functions']}")
                print(f"   - 类数量: {metrics['classes']}")
                
            else:
                print(f"❌ 代码审查失败: {result['message']}")
        else:
            print(f"❌ API请求失败: {response.status_code}")
    except Exception as e:
        print(f"❌ 代码审查出错: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 演示完成!")
    print("\n📝 下一步:")
    print("1. 安装Node.js来运行前端界面")
    print("2. 设置OPENAI_API_KEY获得真实的AI分析")
    print("3. 访问 http://localhost:3000 使用Web界面")
    print("4. 查看 https://github.com/thuzhangbo/ai-code-reviewer 获取更多信息")

if __name__ == "__main__":
    test_api() 