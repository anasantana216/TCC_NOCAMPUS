import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsAPI = {
  getAll: () => api.get('/events'),
  create: (eventData) => api.post('/events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
};

export const pollsAPI = {
  getAll: () => api.get('/polls'),
  create: (pollData) => api.post('/polls', pollData),
  update: (id, pollData) => api.put(`/polls/${id}`, pollData),
  delete: (id) => api.delete(`/polls/${id}`),
  vote: (pollId, optionId) => api.post(`/polls/${pollId}/vote`, { optionId }),
};

export const noticesAPI = {
  getAll: () => api.get('/notices'),
  create: (noticeData) => api.post('/notices', noticeData),
  update: (id, noticeData) => api.put(`/notices/${id}`, noticeData),
  delete: (id) => api.delete(`/notices/${id}`),
};

export const usersAPI = {
  getAll: () => api.get('/users'),
};

export const statsAPI = {
  get: () => api.get('/stats'),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;