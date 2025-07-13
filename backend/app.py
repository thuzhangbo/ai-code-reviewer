"""
AI Code Reviewer - Backend Application
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from services.code_reviewer import CodeReviewer
from services.ai_service import AIService
from utils.validators import validate_code_input
from utils.response_helpers import create_response

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize services
ai_service = AIService()
code_reviewer = CodeReviewer(ai_service)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return create_response(True, "Service is running", {"status": "healthy"})

@app.route('/api/review', methods=['POST'])
def review_code():
    """Review code using AI"""
    try:
        data = request.get_json()
        
        # Validate input
        validation_result = validate_code_input(data)
        if not validation_result['valid']:
            return create_response(False, validation_result['message'], None), 400
        
        # Extract data
        code = data['code']
        language = data.get('language', 'python')
        
        # Perform code review
        review_result = code_reviewer.review_code(code, language)
        
        return create_response(True, "Code review completed", review_result)
        
    except Exception as e:
        return create_response(False, f"Error during code review: {str(e)}", None), 500

@app.route('/api/languages', methods=['GET'])
def get_supported_languages():
    """Get list of supported programming languages"""
    languages = [
        {"id": "python", "name": "Python", "extensions": [".py"]},
        {"id": "javascript", "name": "JavaScript", "extensions": [".js"]},
        {"id": "typescript", "name": "TypeScript", "extensions": [".ts"]},
        {"id": "java", "name": "Java", "extensions": [".java"]},
        {"id": "cpp", "name": "C++", "extensions": [".cpp", ".cc", ".cxx"]},
        {"id": "csharp", "name": "C#", "extensions": [".cs"]},
        {"id": "go", "name": "Go", "extensions": [".go"]},
        {"id": "rust", "name": "Rust", "extensions": [".rs"]},
        {"id": "php", "name": "PHP", "extensions": [".php"]},
        {"id": "ruby", "name": "Ruby", "extensions": [".rb"]}
    ]
    
    return create_response(True, "Supported languages retrieved", {"languages": languages})

@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    """Analyze code complexity and metrics"""
    try:
        data = request.get_json()
        
        if not data or 'code' not in data:
            return create_response(False, "Code is required", None), 400
        
        code = data['code']
        language = data.get('language', 'python')
        
        # Analyze code metrics
        analysis_result = code_reviewer.analyze_code_metrics(code, language)
        
        return create_response(True, "Code analysis completed", analysis_result)
        
    except Exception as e:
        return create_response(False, f"Error during code analysis: {str(e)}", None), 500

@app.errorhandler(404)
def not_found(error):
    return create_response(False, "Endpoint not found", None), 404

@app.errorhandler(500)
def internal_error(error):
    return create_response(False, "Internal server error", None), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting AI Code Reviewer backend on port {port}")
    print(f"📝 API Documentation: http://localhost:{port}/api/health")
    
    app.run(host='0.0.0.0', port=port, debug=debug) 