import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ReviewResponse {
  success: boolean;
  message: string;
  data: {
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
  };
}

export const reviewCode = async (code: string, language: string): Promise<ReviewResponse['data']> => {
  try {
    const response = await api.post<ReviewResponse>('/review', {
      code,
      language,
    });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '网络错误');
    }
    throw error;
  }
};

export const getSupportedLanguages = async () => {
  try {
    const response = await api.get('/languages');
    return response.data.data.languages;
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    return [];
  }
};

export const analyzeCode = async (code: string, language: string) => {
  try {
    const response = await api.post('/analyze', {
      code,
      language,
    });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || '网络错误');
    }
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data.success;
  } catch {
    return false;
  }
}; 