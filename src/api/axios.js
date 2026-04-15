// src/api/axios.js
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});
// localStorage.setItem('token', 'TOKEN_DIALEK_LI_DERTI_BIH_LOGIN');
api.interceptors.request.use(config => {
  const access_token = localStorage.getItem('token');
  if (access_token){
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers.Accept = "application/json";
  } 
    
  return config; 
});
export default api;