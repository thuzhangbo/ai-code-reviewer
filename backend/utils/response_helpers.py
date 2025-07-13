"""
Response helper utilities
"""

from typing import Any, Dict, Optional
from flask import jsonify

def create_response(success: bool, message: str, data: Optional[Any] = None) -> Dict[str, Any]:
    """
    Create a standardized API response
    
    Args:
        success: Whether the operation was successful
        message: Response message
        data: Response data (optional)
        
    Returns:
        Standardized response dictionary
    """
    response = {
        "success": success,
        "message": message,
        "timestamp": get_current_timestamp()
    }
    
    if data is not None:
        response["data"] = data
    
    return response

def create_error_response(message: str, error_code: Optional[str] = None, status_code: int = 400) -> tuple:
    """
    Create a standardized error response
    
    Args:
        message: Error message
        error_code: Error code (optional)
        status_code: HTTP status code
        
    Returns:
        Tuple of (response_dict, status_code)
    """
    response = create_response(False, message)
    
    if error_code:
        response["error_code"] = error_code
    
    return response, status_code

def create_success_response(message: str, data: Optional[Any] = None) -> Dict[str, Any]:
    """
    Create a standardized success response
    
    Args:
        message: Success message
        data: Response data (optional)
        
    Returns:
        Standardized response dictionary
    """
    return create_response(True, message, data)

def get_current_timestamp() -> str:
    """
    Get current timestamp in ISO format
    
    Returns:
        Current timestamp string
    """
    from datetime import datetime
    return datetime.utcnow().isoformat() + "Z"

def format_code_metrics(metrics: Dict[str, Any]) -> Dict[str, Any]:
    """
    Format code metrics for response
    
    Args:
        metrics: Raw metrics dictionary
        
    Returns:
        Formatted metrics dictionary
    """
    return {
        "basic": {
            "total_lines": metrics.get("total_lines", 0),
            "code_lines": metrics.get("code_lines", 0),
            "comment_lines": metrics.get("comment_lines", 0),
            "blank_lines": metrics.get("blank_lines", 0),
            "characters": metrics.get("characters", 0),
            "words": metrics.get("words", 0)
        },
        "complexity": {
            "complexity_score": metrics.get("complexity_score", 0),
            "function_count": metrics.get("function_count", 0)
        },
        "language_specific": {
            "functions": metrics.get("functions", 0),
            "classes": metrics.get("classes", 0),
            "imports": metrics.get("imports", 0)
        }
    } 