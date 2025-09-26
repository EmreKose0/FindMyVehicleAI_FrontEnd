// API Configuration
// Change this URL when you get real server IP
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  ENDPOINTS: {
    RECOMMEND: '/api/ai/recommend'
  }
};

// Full API endpoint
export const API_ENDPOINT = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECOMMEND}`;

// For production, just change BASE_URL to your real IP:
// BASE_URL: 'http://YOUR_REAL_IP:3001'
// or
// BASE_URL: 'https://your-domain.com'
