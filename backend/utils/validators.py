"""
Input validation utilities
"""

from typing import Dict, Any

def validate_code_input(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate code review input data
    
    Args:
        data: Input data dictionary
        
    Returns:
        Dictionary with validation result
    """
    if not data:
        return {"valid": False, "message": "No data provided"}
    
    if 'code' not in data:
        return {"valid": False, "message": "Code is required"}
    
    code = data['code']
    if not isinstance(code, str):
        return {"valid": False, "message": "Code must be a string"}
    
    if not code.strip():
        return {"valid": False, "message": "Code cannot be empty"}
    
    if len(code) > 10000:
        return {"valid": False, "message": "Code is too long (max 10,000 characters)"}
    
    # Validate language if provided
    if 'language' in data:
        language = data['language']
        if not isinstance(language, str):
            return {"valid": False, "message": "Language must be a string"}
        
        supported_languages = [
            'python', 'javascript', 'typescript', 'java', 'cpp', 
            'csharp', 'go', 'rust', 'php', 'ruby'
        ]
        
        if language.lower() not in supported_languages:
            return {"valid": False, "message": f"Unsupported language: {language}"}
    
    return {"valid": True, "message": "Input is valid"}

def validate_file_upload(file_data: bytes, filename: str) -> Dict[str, Any]:
    """
    Validate uploaded file
    
    Args:
        file_data: File content as bytes
        filename: Name of the file
        
    Returns:
        Dictionary with validation result
    """
    if not file_data:
        return {"valid": False, "message": "No file data provided"}
    
    if not filename:
        return {"valid": False, "message": "No filename provided"}
    
    # Check file size (max 1MB)
    if len(file_data) > 1024 * 1024:
        return {"valid": False, "message": "File too large (max 1MB)"}
    
    # Check file extension
    allowed_extensions = [
        '.py', '.js', '.ts', '.java', '.cpp', '.cc', '.cxx',
        '.cs', '.go', '.rs', '.php', '.rb', '.html', '.css'
    ]
    
    file_extension = filename.lower()
    if not any(file_extension.endswith(ext) for ext in allowed_extensions):
        return {"valid": False, "message": f"Unsupported file type: {filename}"}
    
    return {"valid": True, "message": "File is valid"} 