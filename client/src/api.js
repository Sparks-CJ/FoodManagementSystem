import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeaders(token){
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default {
  // Auth
  register(data){ return axios.post(`${API}/auth/register`, data); },
  login(data){ return axios.post(`${API}/auth/login`, data); },

  // Food
  list(token, params){ return axios.get(`${API}/food`, { ...authHeaders(token), params }); },
  create(token, data){ return axios.post(`${API}/food`, data, authHeaders(token)); },
  update(token, id, data){ return axios.put(`${API}/food/${id}`, data, authHeaders(token)); },
  remove(token, id){ return axios.delete(`${API}/food/${id}`, authHeaders(token)); },

  // Expiring & donation
  expiring(token, days = 7){ return axios.get(`${API}/food/expiring`, { ...authHeaders(token), params: { days } }); },
  toggleDonate(token, id, donate = true){ return axios.post(`${API}/food/${id}/donate`, { donate }, authHeaders(token)); }
};

