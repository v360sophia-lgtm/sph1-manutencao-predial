import axios from 'axios'

const API_URL = '/api'

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
})

export const api = {
  // Auth
  register: (email, password, name) =>
    axios.post(`${API_URL}/auth/register`, { email, password, name }),
  login: (email, password) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),

  // Categories
  getCategories: () =>
    axios.get(`${API_URL}/categories`, { headers: getHeaders() }),

  // Condominiums
  getCondominiums: () =>
    axios.get(`${API_URL}/condominiums`, { headers: getHeaders() }),
  getCondominiumDetail: (id) =>
    axios.get(`${API_URL}/condominiums/${id}`, { headers: getHeaders() }),
  getApartments: (condominiumId, blockId) =>
    axios.get(`${API_URL}/condominiums/${condominiumId}/blocks/${blockId}/apartments`, {
      headers: getHeaders(),
    }),

  // Technicians
  assignTechnician: (technicianId, condominiumId) =>
    axios.post(
      `${API_URL}/technicians/${technicianId}/assign`,
      { condominium_id: condominiumId },
      { headers: getHeaders() },
    ),
  getTechnicianAssignments: (technicianId) =>
    axios.get(`${API_URL}/technicians/${technicianId}/assignments`, {
      headers: getHeaders(),
    }),

  // Service Calls
  getServiceCalls: (filters = {}) =>
    axios.get(`${API_URL}/service-calls`, {
      params: filters,
      headers: getHeaders(),
    }),
  getServiceCallDetail: (id) =>
    axios.get(`${API_URL}/service-calls/${id}`, { headers: getHeaders() }),
  createServiceCall: (data) =>
    axios.post(`${API_URL}/service-calls`, data, { headers: getHeaders() }),
  updateServiceCall: (id, data) =>
    axios.put(`${API_URL}/service-calls/${id}`, data, { headers: getHeaders() }),

  // Reports
  getCompletedCalls: (filters = {}) =>
    axios.get(`${API_URL}/reports/completed`, {
      params: filters,
      headers: getHeaders(),
    }),
  getStatistics: (condominiumId) =>
    axios.get(`${API_URL}/reports/statistics`, {
      params: { condominium_id: condominiumId },
      headers: getHeaders(),
    }),
  createCompletionReport: (callId, data) =>
    axios.post(`${API_URL}/reports/${callId}/completion`, data, {
      headers: getHeaders(),
    }),
}
