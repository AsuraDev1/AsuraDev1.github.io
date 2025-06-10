import api from '../config/api';
import { ENDPOINTS } from '../constants/apiEndpoints';

// Servicios de Usuarios
export const userService = {
  login: (credentials) => {
    // Asegurarnos de que las credenciales estén en el formato correcto
    const loginData = {
      email: credentials.email,
      password: credentials.password
    };
    return api.post(ENDPOINTS.USERS.LOGIN, loginData);
  },
  register: (userData) => {
    // Asegurarnos de que los datos de registro estén en el formato correcto
    const registerData = {
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      nombre: userData.nombre.trim(),
      pais: userData.pais.trim(),
      edad: parseInt(userData.edad),
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.nombre.trim())}&background=random`
    };
    return api.post(ENDPOINTS.USERS.REGISTER, registerData);
  },
  getProfile: () => api.get(ENDPOINTS.USERS.ME),
  updateProfile: (data) => api.put(ENDPOINTS.USERS.ME, data),
  logout: () => api.post(ENDPOINTS.USERS.LOGIN + 'logout/'),
};

// Servicios de Destinos
export const destinationService = {
  getAll: () => api.get(ENDPOINTS.DESTINATIONS.BASE),
  getById: (id) => api.get(ENDPOINTS.DESTINATIONS.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.DESTINATIONS.BASE, data),
  update: (id, data) => api.put(ENDPOINTS.DESTINATIONS.DETAIL(id), data),
  delete: (id) => api.delete(ENDPOINTS.DESTINATIONS.DETAIL(id)),
  getItineraries: (id) => api.get(ENDPOINTS.DESTINATIONS.ITINERARIES(id)),
  like: (id) => api.post(`${ENDPOINTS.DESTINATIONS.DETAIL(id)}/like/`),
  dislike: (id) => api.post(`${ENDPOINTS.DESTINATIONS.DETAIL(id)}/dislike/`),
};

// Servicios de Posts
export const postService = {
  getAll: () => api.get(ENDPOINTS.POSTS.BASE),
  getById: (id) => api.get(ENDPOINTS.POSTS.DETAIL(id)),
  create: (data) => api.post(ENDPOINTS.POSTS.BASE, data),
  update: (id, data) => api.put(ENDPOINTS.POSTS.DETAIL(id), data),
  delete: (id) => api.delete(ENDPOINTS.POSTS.DETAIL(id)),
  like: (id) => api.post(ENDPOINTS.POSTS.TOGGLE_LIKE(id)),
  dislike: (id) => api.post(ENDPOINTS.POSTS.TOGGLE_LIKE(id)),
};

// Servicios de Respuestas
export const responseService = {
  getAll: () => api.get(ENDPOINTS.RESPONSES.BASE),
  create: (data) => api.post(ENDPOINTS.RESPONSES.BASE, data),
  update: (id, data) => api.put(ENDPOINTS.RESPONSES.DETAIL(id), data),
  delete: (id) => api.delete(ENDPOINTS.RESPONSES.DETAIL(id)),
  like: (id) => api.post(`${ENDPOINTS.RESPONSES.DETAIL(id)}/like/`),
  dislike: (id) => api.post(`${ENDPOINTS.RESPONSES.DETAIL(id)}/dislike/`),
}; 