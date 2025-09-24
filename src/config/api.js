// API Configuration
const API_CONFIG = {
  // Base URL for the Django backend
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    ABOUT_SECTION: {
      PARTNERS_FRONTEND: '/api/about-section/partners/frontend/',
      ABOUT_WITH_PARTNERS: '/api/about-section/about-with-partners/',
      PARTNERS: '/api/about-section/partners/',
      ABOUT_SECTIONS: '/api/about-section/about-sections/',
    },
  },
  
  // Default request options
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
};

// Helper function to build full URL
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(API_CONFIG.BASE_URL + endpoint);
  
  // Add query parameters
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

// Helper function to make API requests with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = typeof endpoint === 'string' ? API_CONFIG.BASE_URL + endpoint : endpoint;
  
  const defaultOptions = {
    headers: API_CONFIG.DEFAULT_HEADERS,
    ...options,
  };
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

export default API_CONFIG;
