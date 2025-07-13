"""
Code Reviewer Service
"""

from typing import Dict, List
from .ai_service import AIService

class CodeReviewer:
    def __init__(self, ai_service: AIService):
        """Initialize code reviewer with AI service"""
        self.ai_service = ai_service
    
    def review_code(self, code: str, language: str) -> Dict:
        """
        Perform comprehensive code review
        
        Args:
            code: Source code to review
            language: Programming language
            
        Returns:
            Dictionary containing review results
        """
        # Get AI review
        ai_review = self.ai_service.review_code(code, language)
        
        # Get code metrics
        metrics = self.analyze_code_metrics(code, language)
        
        # Combine results
        return {
            "ai_review": ai_review,
            "metrics": metrics,
            "summary": self._create_summary(ai_review, metrics)
        }
    
    def analyze_code_metrics(self, code: str, language: str) -> Dict:
        """
        Analyze code complexity and metrics
        
        Args:
            code: Source code to analyze
            language: Programming language
            
        Returns:
            Dictionary containing code metrics
        """
        lines = code.split('\n')
        non_empty_lines = [line for line in lines if line.strip()]
        
        # Basic metrics
        metrics = {
            "total_lines": len(lines),
            "code_lines": len(non_empty_lines),
            "comment_lines": len([line for line in lines if line.strip().startswith('#') or line.strip().startswith('//')]),
            "blank_lines": len([line for line in lines if not line.strip()]),
            "characters": len(code),
            "words": len(code.split())
        }
        
        # Language-specific analysis
        if language == 'python':
            metrics.update(self._analyze_python_code(code))
        elif language in ['javascript', 'typescript']:
            metrics.update(self._analyze_js_code(code))
        elif language == 'java':
            metrics.update(self._analyze_java_code(code))
        else:
            metrics.update(self._analyze_generic_code(code))
        
        # Complexity analysis
        complexity = self.ai_service.analyze_complexity(code, language)
        metrics.update(complexity)
        
        return metrics
    
    def _analyze_python_code(self, code: str) -> Dict:
        """Analyze Python-specific metrics"""
        return {
            "functions": code.count('def '),
            "classes": code.count('class '),
            "imports": code.count('import ') + code.count('from '),
            "docstrings": code.count('"""') // 2 + code.count("'''") // 2,
            "type_hints": code.count(': ') - code.count('def ') - code.count('class '),
            "exceptions": code.count('except ') + code.count('raise '),
            "async_functions": code.count('async def '),
            "list_comprehensions": code.count('[') - code.count(']') + code.count('for ') // 2
        }
    
    def _analyze_js_code(self, code: str) -> Dict:
        """Analyze JavaScript/TypeScript-specific metrics"""
        return {
            "functions": code.count('function ') + code.count('=>'),
            "classes": code.count('class '),
            "imports": code.count('import ') + code.count('require('),
            "exports": code.count('export '),
            "const_declarations": code.count('const '),
            "let_declarations": code.count('let '),
            "var_declarations": code.count('var '),
            "async_functions": code.count('async '),
            "arrow_functions": code.count('=>'),
            "template_literals": code.count('`')
        }
    
    def _analyze_java_code(self, code: str) -> Dict:
        """Analyze Java-specific metrics"""
        return {
            "methods": code.count('public ') + code.count('private ') + code.count('protected '),
            "classes": code.count('class '),
            "interfaces": code.count('interface '),
            "imports": code.count('import '),
            "packages": code.count('package '),
            "annotations": code.count('@'),
            "try_blocks": code.count('try {'),
            "catch_blocks": code.count('catch '),
            "finally_blocks": code.count('finally {'),
            "static_methods": code.count('static ')
        }
    
    def _analyze_generic_code(self, code: str) -> Dict:
        """Analyze generic code metrics"""
        return {
            "functions": code.count('function ') + code.count('def ') + code.count('func '),
            "classes": code.count('class '),
            "comments": code.count('//') + code.count('/*') + code.count('#'),
            "strings": code.count('"') // 2 + code.count("'") // 2,
            "numbers": len([word for word in code.split() if word.replace('.', '').replace('-', '').isdigit()]),
            "variables": code.count('var ') + code.count('let ') + code.count('const ') + code.count('int ') + code.count('string ')
        }
    
    def _create_summary(self, ai_review: Dict, metrics: Dict) -> Dict:
        """Create a summary of the review"""
        score = ai_review.get('score', 5)
        
        if score >= 8:
            quality_level = "Excellent"
        elif score >= 6:
            quality_level = "Good"
        elif score >= 4:
            quality_level = "Fair"
        else:
            quality_level = "Needs Improvement"
        
        return {
            "quality_level": quality_level,
            "overall_score": score,
            "code_size": f"{metrics.get('total_lines', 0)} lines",
            "complexity": metrics.get('complexity_score', 0),
            "main_issues": len(ai_review.get('issues', [])),
            "improvements_needed": len(ai_review.get('improvements', []))
        } 