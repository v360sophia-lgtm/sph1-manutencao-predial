import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

const getHeaders = async () => {
  const token = await SecureStore.getItemAsync('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const api = {
  // Auth
  login: (email, password) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),

  register: (email, password, name) =>
    axios.post(`${API_URL}/auth/register`, { email, password, name }),

  // Categories
  getCategories: async () => {
    const headers = await getHeaders();
    return axios.get(`${API_URL}/categories`, { headers });
  },

  // Service Calls
  getServiceCalls: async (filters = {}) => {
    const headers = await getHeaders();
    return axios.get(`${API_URL}/service-calls`, {
      params: filters,
      headers,
    });
  },

  getServiceCallDetail: async (id) => {
    const headers = await getHeaders();
    return axios.get(`${API_URL}/service-calls/${id}`, { headers });
  },

  updateServiceCall: async (id, data) => {
    const headers = await getHeaders();
    return axios.put(`${API_URL}/service-calls/${id}`, data, { headers });
  },

  // Reports
  createCompletionReport: async (callId, data) => {
    const headers = await getHeaders();
    const formData = new FormData();

    if (data.observations) formData.append('observations', data.observations);
    if (data.materialsUsed) formData.append('materials_used', data.materialsUsed);
    if (data.signature) formData.append('signature', data.signature);

    if (data.photos && data.photos.length > 0) {
      data.photos.forEach((photo, index) => {
        formData.append(`photos`, {
          uri: photo,
          type: 'image/jpeg',
          name: `photo_${index}.jpg`,
        });
      });
    }

    headers['Content-Type'] = 'multipart/form-data';
    return axios.post(`${API_URL}/reports/${callId}/completion`, formData, { headers });
  },
};
