const BASE_URL = 'http://localhost:8000/turismo/API';

export const ENDPOINTS = {
  BASE_URL,
  
  // Endpoints de Usuarios
  USERS: {
    BASE: `${BASE_URL}/usuarios/`,
    ME: `${BASE_URL}/usuarios/me/`,
    LOGIN: `${BASE_URL}/usuarios/login/`,
    REGISTER: `${BASE_URL}/usuarios/registro/`,
    DETAIL: (id: number) => `${BASE_URL}/usuarios/${id}/`,
    UPDATE_PROFILE: `${BASE_URL}/usuarios/me/actualizar/`,
    CHANGE_PASSWORD: `${BASE_URL}/usuarios/me/cambiar-password/`,
  },

  // Endpoints de Destinos
  DESTINATIONS: {
    BASE: `${BASE_URL}/destinos/`,
    DETAIL: (id: number) => `${BASE_URL}/destinos/${id}/`,
    ITINERARIES: (id: number) => `${BASE_URL}/destinos/${id}/itinerarios/`,
    SEARCH: `${BASE_URL}/destinos/buscar/`,
    POPULAR: `${BASE_URL}/destinos/populares/`,
    RECENT: `${BASE_URL}/destinos/recientes/`,
  },

  // Endpoints de Posts
  POSTS: {
    BASE: `${BASE_URL}/posts/`,
    DETAIL: (id: number) => `${BASE_URL}/posts/${id}/`,
    TOGGLE_LIKE: (id: number) => `${BASE_URL}/posts/${id}/toggle_like/`,
    COMMENTS: (id: number) => `${BASE_URL}/posts/${id}/comentarios/`,
    USER_POSTS: (userId: number) => `${BASE_URL}/posts/usuario/${userId}/`,
  },

  // Endpoints de Respuestas
  RESPONSES: {
    BASE: `${BASE_URL}/respuestas/`,
    DETAIL: (id: number) => `${BASE_URL}/respuestas/${id}/`,
    POST_RESPONSES: (postId: number) => `${BASE_URL}/respuestas/post/${postId}/`,
    USER_RESPONSES: (userId: number) => `${BASE_URL}/respuestas/usuario/${userId}/`,
  },
} as const;

// Configuración por defecto para las peticiones
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

// Tipos para los parámetros de búsqueda
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
}

// Función helper para construir URLs con query params
export const buildUrl = (baseUrl: string, params: SearchParams = {}): string => {
  const url = new URL(baseUrl, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        url.searchParams.append(key, JSON.stringify(value));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });
  return url.toString();
}; 