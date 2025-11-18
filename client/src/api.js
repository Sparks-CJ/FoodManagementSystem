import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function authHeaders(token){
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default {
  async register(data){ return axios.post(`${API}/auth/register`, data); },
  async login(data){ return axios.post(`${API}/auth/login`, data); },
  async list(token, params){ return axios.get(`${API}/food`, { ...authHeaders(token), params }); },
  async create(token, data){ return axios.post(`${API}/food`, data, authHeaders(token)); },
  async update(token, id, data){ return axios.put(`${API}/food/${id}`, data, authHeaders(token)); },
  async remove(token, id){ return axios.delete(`${API}/food/${id}`, authHeaders(token)); }
};
