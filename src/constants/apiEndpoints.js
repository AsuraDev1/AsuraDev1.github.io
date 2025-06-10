const BASE_URL = 'http://127.0.0.1:8000/turismo';
const API_URL = 'http://127.0.0.1:8000/turismo/API';

export const ENDPOINTS = {
  BASE_URL,
  
  // Endpoints de Usuarios
  USERS: {
    BASE: `${BASE_URL}/user/`,
    ME: `${BASE_URL}/user/`,
    LOGIN: `${BASE_URL}/auth/login/`,
    REGISTER: `${BASE_URL}/auth/register/`,
    DETAIL: (id) => `${BASE_URL}/user/${id}/`,
  },

  // Endpoints de Destinos
  DESTINATIONS: {
    BASE: `${API_URL}/destinos/`,
    DETAIL: (id) => `${API_URL}/destinos/${id}/`,
    ITINERARIES: (id) => `${API_URL}/destinos/${id}/itinerarios/`,
  },

  // Endpoints de Posts
  POSTS: {
    BASE: `${API_URL}/posts/`,
    DETAIL: (id) => `${API_URL}/posts/${id}/`,
    TOGGLE_LIKE: (id) => `${API_URL}/posts/${id}/toggle_like/`,
  },

  // Endpoints de Respuestas
  RESPONSES: {
    BASE: `${API_URL}/respuestas/`,
    DETAIL: (id) => `${API_URL}/respuestas/${id}/`,
  },
};

// Configuración por defecto para las peticiones
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Función helper para agregar el token de autenticación
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Función helper para construir URLs con query params
export const buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}; 