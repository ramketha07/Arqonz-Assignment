import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      baseURL: error.config?.baseURL,
      fullURL: `${error.config?.baseURL}${error.config?.url}`,
      data: error.response?.data,
      isNetworkError: !error.response,
      isTimeout: error.code === 'ECONNABORTED'
    });

    // Provide user-friendly error messages
    if (!error.response) {
      console.error('Network Error: Unable to connect to the server. Please check if the backend server is running.');
    } else if (error.response.status === 404) {
      console.error('API Endpoint Not Found: The requested resource does not exist.');
    } else if (error.response.status >= 500) {
      console.error('Server Error: The backend server encountered an error.');
    }

    return Promise.reject(error);
  }
);

// Dashboard API
export const dashboardAPI = {
  getDashboardData: async () => {
    try {
      console.log('Fetching dashboard data...');
      const response = await api.get('/dashboard');
      console.log('Dashboard data fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  updateDashboardData: async (data) => {
    try {
      console.log('Updating dashboard data:', data);
      const response = await api.put('/dashboard', data);
      console.log('Dashboard data updated successfully');
      return response;
    } catch (error) {
      console.error('Error updating dashboard data:', error);
      throw error;
    }
  },
};

// Mentors API
export const mentorsAPI = {
  getMentors: async (params = {}) => {
    try {
      console.log('Fetching mentors with params:', params);
      const response = await api.get('/mentors', { params });
      console.log('Mentors fetched successfully:', response.data.length, 'mentors');
      return response;
    } catch (error) {
      console.error('Error fetching mentors:', error);
      throw error;
    }
  },

  getRecentMentors: async () => {
    try {
      console.log('Fetching recent mentors...');
      const response = await api.get('/mentors/recent');
      console.log('Recent mentors fetched successfully:', response.data.length, 'mentors');
      return response;
    } catch (error) {
      console.error('Error fetching recent mentors:', error);
      throw error;
    }
  },

  getMentorById: async (id) => {
    try {
      console.log('Fetching mentor by ID:', id);
      const response = await api.get(`/mentors/${id}`);
      console.log('Mentor fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching mentor by ID:', error);
      throw error;
    }
  },

  createMentor: async (data) => {
    try {
      console.log('Creating new mentor:', data);
      const response = await api.post('/mentors', data);
      console.log('Mentor created successfully');
      return response;
    } catch (error) {
      console.error('Error creating mentor:', error);
      throw error;
    }
  },

  updateMentor: async (id, data) => {
    try {
      console.log('Updating mentor:', id, data);
      const response = await api.put(`/mentors/${id}`, data);
      console.log('Mentor updated successfully');
      return response;
    } catch (error) {
      console.error('Error updating mentor:', error);
      throw error;
    }
  },

  toggleFollow: async (id) => {
    try {
      console.log('Toggling follow status for mentor:', id);
      const response = await api.patch(`/mentors/${id}/follow`);
      console.log('Follow status toggled successfully');
      return response;
    } catch (error) {
      console.error('Error toggling follow status:', error);
      throw error;
    }
  },

  deleteMentor: async (id) => {
    try {
      console.log('Deleting mentor:', id);
      const response = await api.delete(`/mentors/${id}`);
      console.log('Mentor deleted successfully');
      return response;
    } catch (error) {
      console.error('Error deleting mentor:', error);
      throw error;
    }
  },

  seedMentors: async () => {
    try {
      console.log('Seeding mentors data...');
      const response = await api.post('/mentors/seed');
      console.log('Mentors seeded successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error seeding mentors:', error);
      throw error;
    }
  },
};

export default api;



