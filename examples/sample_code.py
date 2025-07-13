"""
示例Python代码 - 用于测试AI代码审查功能
"""

import os
import sys
from typing import List, Dict, Optional
import json
import requests
from datetime import datetime

class DataProcessor:
    """数据处理类，用于演示代码审查功能"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('API_KEY')
        self.base_url = "https://api.example.com"
        self.session = requests.Session()
    
    def fetch_data(self, endpoint: str) -> Dict:
        """
        从API获取数据
        
        Args:
            endpoint: API端点
            
        Returns:
            响应数据字典
        """
        try:
            response = self.session.get(f"{self.base_url}/{endpoint}")
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching data: {e}")
            return {}
    
    def process_items(self, items: List[Dict]) -> List[Dict]:
        """
        处理数据项列表
        
        Args:
            items: 要处理的数据项列表
            
        Returns:
            处理后的数据项列表
        """
        processed_items = []
        
        for item in items:
            if self._validate_item(item):
                processed_item = self._transform_item(item)
                processed_items.append(processed_item)
        
        return processed_items
    
    def _validate_item(self, item: Dict) -> bool:
        """验证数据项"""
        required_fields = ['id', 'name', 'value']
        return all(field in item for field in required_fields)
    
    def _transform_item(self, item: Dict) -> Dict:
        """转换数据项"""
        return {
            'id': item['id'],
            'name': item['name'].title(),
            'value': float(item['value']),
            'processed_at': datetime.now().isoformat()
        }
    
    def save_results(self, data: List[Dict], filename: str) -> bool:
        """
        保存结果到文件
        
        Args:
            data: 要保存的数据
            filename: 文件名
            
        Returns:
            保存是否成功
        """
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            return True
        except IOError as e:
            print(f"Error saving file: {e}")
            return False

def main():
    """主函数"""
    processor = DataProcessor()
    
    # 获取数据
    raw_data = processor.fetch_data('items')
    
    if raw_data:
        # 处理数据
        processed_data = processor.process_items(raw_data.get('items', []))
        
        # 保存结果
        if processor.save_results(processed_data, 'output.json'):
            print(f"Successfully processed {len(processed_data)} items")
        else:
            print("Failed to save results")
    else:
        print("No data to process")

if __name__ == "__main__":
    main() 