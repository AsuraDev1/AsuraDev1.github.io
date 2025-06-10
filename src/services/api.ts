import { apiService } from '../config/api';
import { ENDPOINTS } from '../constants/apiEndpoints';

// Interfaces
interface User {
  id: number;
  email: string;
  nombre: string;
  pais: string;
  edad: number;
  avatar: string;
}

interface Destination {
  id: number;
  nombre: string;
  ubicacion: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  likes: number;
  dislikes: number;
}

interface Post {
  id: number;
  titulo: string;
  contenido: string;
  autor: User;
  fecha: string;
  likes: number;
  dislikes: number;
}

interface Response {
  id: number;
  contenido: string;
  autor: User;
  post: Post;
  fecha: string;
  likes: number;
  dislikes: number;
}

// Servicios de Usuarios
export const userService = {
  login: (credentials: { email: string; password: string }) => 
    apiService.post<{ token: string; user: User }>(ENDPOINTS.USERS.LOGIN, credentials),
  
  register: (userData: Partial<User> & { password: string }) => 
    apiService.post<{ token: string; user: User }>(ENDPOINTS.USERS.REGISTER, userData),
  
  getProfile: () => 
    apiService.get<User>(ENDPOINTS.USERS.ME),
  
  updateProfile: (data: Partial<User>) => 
    apiService.put<User>(ENDPOINTS.USERS.ME, data),
  
  
};

// Servicios de Destinos
export const destinationService = {
  getAll: () => 
    apiService.get<Destination[]>(ENDPOINTS.DESTINATIONS.BASE),
  
  getById: (id: number) => 
    apiService.get<Destination>(ENDPOINTS.DESTINATIONS.DETAIL(id)),
  
  create: (data: Partial<Destination>) => 
    apiService.post<Destination>(ENDPOINTS.DESTINATIONS.BASE, data),
  
  update: (id: number, data: Partial<Destination>) => 
    apiService.put<Destination>(ENDPOINTS.DESTINATIONS.DETAIL(id), data),
  
  delete: (id: number) => 
    apiService.delete(ENDPOINTS.DESTINATIONS.DETAIL(id)),
  
  getItineraries: (id: number) => 
    apiService.get(ENDPOINTS.DESTINATIONS.ITINERARIES(id)),
  
  like: (id: number) => 
    apiService.post(`${ENDPOINTS.DESTINATIONS.DETAIL(id)}/like/`),
  
  dislike: (id: number) => 
    apiService.post(`${ENDPOINTS.DESTINATIONS.DETAIL(id)}/dislike/`),
};

// Servicios de Posts
export const postService = {
  getAll: () => 
    apiService.get<Post[]>(ENDPOINTS.POSTS.BASE),
  
  getById: (id: number) => 
    apiService.get<Post>(ENDPOINTS.POSTS.DETAIL(id)),
  
  create: (data: Partial<Post>) => 
    apiService.post<Post>(ENDPOINTS.POSTS.BASE, data),
  
  update: (id: number, data: Partial<Post>) => 
    apiService.put<Post>(ENDPOINTS.POSTS.DETAIL(id), data),
  
  delete: (id: number) => 
    apiService.delete(ENDPOINTS.POSTS.DETAIL(id)),
  
  like: (id: number) => 
    apiService.post(ENDPOINTS.POSTS.TOGGLE_LIKE(id)),
  
  dislike: (id: number) => 
    apiService.post(ENDPOINTS.POSTS.TOGGLE_LIKE(id)),
};

// Servicios de Respuestas
export const responseService = {
  create: (data: Partial<Response>) => 
    apiService.post<Response>(ENDPOINTS.RESPONSES.BASE, data),
  
  update: (id: number, data: Partial<Response>) => 
    apiService.put<Response>(ENDPOINTS.RESPONSES.DETAIL(id), data),
  
  delete: (id: number) => 
    apiService.delete(ENDPOINTS.RESPONSES.DETAIL(id)),
  
  like: (id: number) => 
    apiService.post(`${ENDPOINTS.RESPONSES.DETAIL(id)}/like/`),
  
  dislike: (id: number) => 
    apiService.post(`${ENDPOINTS.RESPONSES.DETAIL(id)}/dislike/`),
}; 