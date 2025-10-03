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
};

export const pollsAPI = {
  getAll: () => api.get('/polls'),
  create: (pollData) => api.post('/polls', pollData),
  vote: (pollId, optionId) => api.post(`/polls/${pollId}/vote`, { optionId }),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;