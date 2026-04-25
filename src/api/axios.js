import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor : ajoute le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor : gère les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expiré ou invalide
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expirée. Veuillez vous reconnecter.');
        // Redirection vers login (à faire dans un hook ou directement)
        window.location.href = '/login';
      } else if (status === 500) {
        toast.error('Erreur serveur. Réessayez plus tard.');
      } else if (status === 403) {
        toast.error('Accès interdit.');
      }
    } else {
      // Erreur réseau (pas de réponse)
      toast.error('Problème de connexion.');
    }
    return Promise.reject(error);
  }
);

export default api;