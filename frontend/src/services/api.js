// API Service for Backend Communication
import axios from 'axios';

const getDefaultApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5000/api';
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000/api`;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || getDefaultApiBaseUrl();

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          
          // Retry original request
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// Authentication APIs
// ============================================

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = response.data.data;
    
    // Save tokens and user info
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { accessToken, refreshToken, user } = response.data.data;
    
    // Save tokens and user info
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  sendRegistrationOtp: async (email) => {
    const response = await api.post('/auth/send-registration-otp', { email });
    return response.data;
  },

  verifyRegistrationOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-registration-otp', { email, otp });
    return response.data;
  },

  sendLoginOtp: async (email, password) => {
    const response = await api.post('/auth/send-login-otp', { email, password });
    return response.data;
  },

  verifyLoginOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-login-otp', { email, otp });
    const { accessToken, refreshToken, user } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data.data.profile;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// ============================================
// Crop APIs
// ============================================

export const cropAPI = {
  // Get all crops with filters
  getAll: async (params = {}) => {
    const response = await api.get('/crops', { params });
    return response.data.data;
  },

  // Get single crop by ID
  getById: async (id) => {
    const response = await api.get(`/crops/${id}`);
    return response.data.data.crop;
  },

  // Create new crop (Admin/Content Manager only)
  create: async (cropData) => {
    const response = await api.post('/crops', cropData);
    return response.data.data.crop;
  },

  // Update crop (Admin/Content Manager only)
  update: async (id, cropData) => {
    const response = await api.put(`/crops/${id}`, cropData);
    return response.data.data.crop;
  },

  // Delete crop (Admin only)
  delete: async (id) => {
    const response = await api.delete(`/crops/${id}`);
    return response.data;
  },

  // Search crops
  search: async (searchTerm) => {
    const response = await api.get('/crops', { 
      params: { search: searchTerm, limit: 100 } 
    });
    return response.data.data.crops;
  },

  // Get crops by category
  getByCategory: async (category) => {
    const response = await api.get('/crops', { 
      params: { category, limit: 100 } 
    });
    return response.data.data.crops;
  }
};

// ============================================
// Agricultural Resource APIs
// ============================================

export const resourceAPI = {
  // Get all resources with filters
  getAll: async (params = {}) => {
    const response = await api.get('/resources', { params });
    return response.data.data;
  },

  // Get single resource by ID
  getById: async (id) => {
    const response = await api.get(`/resources/${id}`);
    return response.data.data.resource;
  },

  // Create new resource (Super Admin only)
  create: async (resourceData) => {
    const response = await api.post('/resources', resourceData);
    return response.data.data.resource;
  },

  // Update resource (Super Admin only)
  update: async (id, resourceData) => {
    const response = await api.put(`/resources/${id}`, resourceData);
    return response.data.data.resource;
  },

  // Delete resource (Super Admin only)
  delete: async (id) => {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  }
};

// Export default api instance
export default api;
