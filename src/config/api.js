import axios from 'axios';
import { ENDPOINTS } from '../constants/apiEndpoints';

const api = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Error de conexión con el servidor');
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Interceptor para agregar token y CSRF
api.interceptors.request.use(
  async config => {
    // Lista de endpoints que requieren autenticación
    const requiresAuth = [
      '/user/',
      '/posts/',
      '/respuestas/'
    ];

    // Verificar si la URL actual requiere autenticación
    const needsAuth = requiresAuth.some(endpoint => config.url.includes(endpoint));
    
    // Configuración específica para la ruta de destinos
    if (config.url.includes('/destinos/')) {
      config.withCredentials = false;
      return config;
    }

    // Configuración específica para rutas de autenticación
    if (config.url.includes('/auth/')) {
      config.withCredentials = true;
      return config;
    }
    
    if (needsAuth) {
      config.withCredentials = true;
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      const csrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
      
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    } else {
      config.withCredentials = false;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

export default api; 