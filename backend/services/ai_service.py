"""
AI Service for code review and analysis
"""

import os
import openai
from typing import Dict, List, Optional

class AIService:
    def __init__(self):
        """Initialize AI service with OpenAI API"""
        self.api_key = os.getenv('OPENAI_API_KEY')
        if self.api_key:
            openai.api_key = self.api_key
        else:
            print("⚠️  Warning: OPENAI_API_KEY not found. Using mock responses.")
    
    def review_code(self, code: str, language: str) -> Dict:
        """
        Review code using AI and return analysis results
        
        Args:
            code: Source code to review
            language: Programming language
            
        Returns:
            Dictionary containing review results
        """
        if not self.api_key:
            return self._get_mock_review(code, language)
        
        try:
            prompt = self._create_review_prompt(code, language)
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert code reviewer. Provide detailed, constructive feedback on code quality, best practices, and potential improvements."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            ai_response = response.choices[0].message.content
            
            return self._parse_ai_response(ai_response, code, language)
            
        except Exception as e:
            print(f"Error calling OpenAI API: {e}")
            return self._get_mock_review(code, language)
    
    def _create_review_prompt(self, code: str, language: str) -> str:
        """Create a prompt for code review"""
        return f"""
Please review the following {language} code and provide:

1. Overall quality score (1-10)
2. Code quality assessment
3. Potential issues and bugs
4. Performance considerations
5. Security concerns
6. Best practices recommendations
7. Specific improvement suggestions

Code to review:
```{language}
{code}
```

Please format your response as JSON with the following structure:
{{
    "score": <number>,
    "quality_assessment": "<text>",
    "issues": ["<issue1>", "<issue2>"],
    "performance": "<text>",
    "security": ["<concern1>", "<concern2>"],
    "best_practices": ["<practice1>", "<practice2>"],
    "improvements": ["<improvement1>", "<improvement2>"]
}}
"""
    
    def _parse_ai_response(self, response: str, code: str, language: str) -> Dict:
        """Parse AI response and extract structured data"""
        try:
            # Try to extract JSON from response
            import json
            import re
            
            # Find JSON in the response
            json_match = re.search(r'\{.*\}', response, re.DOTALL)
            if json_match:
                parsed = json.loads(json_match.group())
            else:
                # Fallback to mock response
                return self._get_mock_review(code, language)
            
            return {
                "score": parsed.get("score", 7),
                "quality_assessment": parsed.get("quality_assessment", "Code quality analysis"),
                "issues": parsed.get("issues", []),
                "performance": parsed.get("performance", "Performance analysis"),
                "security": parsed.get("security", []),
                "best_practices": parsed.get("best_practices", []),
                "improvements": parsed.get("improvements", []),
                "ai_response": response
            }
            
        except Exception as e:
            print(f"Error parsing AI response: {e}")
            return self._get_mock_review(code, language)
    
    def _get_mock_review(self, code: str, language: str) -> Dict:
        """Get mock review response when API is not available"""
        lines = len(code.split('\n'))
        complexity = min(10, max(1, lines // 10))
        
        return {
            "score": max(1, min(10, 10 - complexity)),
            "quality_assessment": f"Mock analysis for {language} code with {lines} lines",
            "issues": [
                "This is a mock response - add OPENAI_API_KEY for real analysis",
                f"Code has {lines} lines of {language} code"
            ],
            "performance": "Performance analysis would be available with API key",
            "security": [
                "Security analysis requires API key",
                "Consider input validation and error handling"
            ],
            "best_practices": [
                "Follow language-specific conventions",
                "Add proper documentation",
                "Use meaningful variable names"
            ],
            "improvements": [
                "Add comments and documentation",
                "Consider breaking large functions",
                "Add error handling"
            ],
            "ai_response": "Mock response - API key not configured"
        }
    
    def analyze_complexity(self, code: str, language: str) -> Dict:
        """Analyze code complexity metrics"""
        lines = code.split('\n')
        non_empty_lines = [line for line in lines if line.strip()]
        
        # Simple complexity analysis
        complexity_score = 0
        if len(non_empty_lines) > 50:
            complexity_score += 2
        if len(non_empty_lines) > 100:
            complexity_score += 2
        
        # Count functions/classes (simple heuristic)
        function_count = code.count('def ') + code.count('function ') + code.count('class ')
        complexity_score += min(3, function_count)
        
        return {
            "lines_of_code": len(lines),
            "non_empty_lines": len(non_empty_lines),
            "complexity_score": min(10, complexity_score),
            "function_count": function_count
        } 