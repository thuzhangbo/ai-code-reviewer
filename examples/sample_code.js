/**
 * 示例JavaScript代码 - 用于测试AI代码审查功能
 */

class DataProcessor {
    /**
     * 数据处理类，用于演示代码审查功能
     * @param {string} apiKey - API密钥
     */
    constructor(apiKey = null) {
        this.apiKey = apiKey || process.env.API_KEY;
        this.baseUrl = 'https://api.example.com';
        this.session = null;
    }

    /**
     * 从API获取数据
     * @param {string} endpoint - API端点
     * @returns {Promise<Object>} 响应数据
     */
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return {};
        }
    }

    /**
     * 处理数据项列表
     * @param {Array<Object>} items - 要处理的数据项列表
     * @returns {Array<Object>} 处理后的数据项列表
     */
    processItems(items) {
        const processedItems = [];

        for (const item of items) {
            if (this.validateItem(item)) {
                const processedItem = this.transformItem(item);
                processedItems.push(processedItem);
            }
        }

        return processedItems;
    }

    /**
     * 验证数据项
     * @param {Object} item - 数据项
     * @returns {boolean} 验证结果
     */
    validateItem(item) {
        const requiredFields = ['id', 'name', 'value'];
        return requiredFields.every(field => item.hasOwnProperty(field));
    }

    /**
     * 转换数据项
     * @param {Object} item - 原始数据项
     * @returns {Object} 转换后的数据项
     */
    transformItem(item) {
        return {
            id: item.id,
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            value: parseFloat(item.value),
            processedAt: new Date().toISOString()
        };
    }

    /**
     * 保存结果到文件
     * @param {Array<Object>} data - 要保存的数据
     * @param {string} filename - 文件名
     * @returns {Promise<boolean>} 保存是否成功
     */
    async saveResults(data, filename) {
        try {
            const fs = require('fs').promises;
            await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error saving file:', error);
            return false;
        }
    }
}

/**
 * 主函数
 */
async function main() {
    const processor = new DataProcessor();

    try {
        // 获取数据
        const rawData = await processor.fetchData('items');

        if (rawData && rawData.items) {
            // 处理数据
            const processedData = processor.processItems(rawData.items);

            // 保存结果
            const success = await processor.saveResults(processedData, 'output.json');

            if (success) {
                console.log(`Successfully processed ${processedData.length} items`);
            } else {
                console.log('Failed to save results');
            }
        } else {
            console.log('No data to process');
        }
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// 导出类供其他模块使用
module.exports = DataProcessor;

// 如果直接运行此文件，则执行主函数
if (require.main === module) {
    main();
} 