import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENDPOINTS } from '../constants/apiEndpoints';

interface ApiError {
  message: string;
  status: number;
  data?: any;
  isNetworkError?: boolean;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;
  private retryCount: number = 0;
  private readonly maxRetries: number = 3;
  private readonly retryDelay: number = 1000; // 1 segundo

  private constructor() {
    this.api = axios.create({
      baseURL: ENDPOINTS.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      timeout: 10000, // 10 segundos de timeout
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async retryRequest(error: AxiosError): Promise<any> {
    const config = error.config;
    if (!config || this.retryCount >= this.maxRetries) {
      this.retryCount = 0;
      throw error;
    }

    this.retryCount++;
    await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.retryCount));
    
    return this.api(config);
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        // Obtener el token CSRF de las cookies
        const csrfToken = document.cookie.split('; ')
          .find(row => row.startsWith('csrftoken='))
          ?.split('=')[1];
        
        if (csrfToken) {
          config.headers['X-CSRFToken'] = csrfToken;
        }

        // Obtener el token de autenticación
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // No enviar token de autorización para login y registro
        if (config.url?.includes('/login/') || config.url?.includes('/registro/')) {
          delete config.headers.Authorization;
        }

        // Asegurar que withCredentials esté configurado
        config.withCredentials = true;
        
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        this.retryCount = 0;
        return response;
      },
      async (error) => {
        if (error.code === 'ERR_NETWORK') {
          try {
            return await this.retryRequest(error);
          } catch (retryError) {
            return Promise.reject(this.handleError(retryError));
          }
        }

        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        if (error.response?.status === 403) {
          console.error('Acceso denegado:', error.response.data);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError<ErrorResponse>): ApiError {
    if (error.code === 'ERR_NETWORK') {
      return {
        message: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o que el servidor esté funcionando.',
        status: 0,
        isNetworkError: true
      };
    }

    if (error.response) {
      const errorData = error.response.data;
      return {
        message: errorData?.message || 'Error en la petición',
        status: error.response.status,
        data: errorData,
      };
    }

    if (error.request) {
      return {
        message: 'No se recibió respuesta del servidor',
        status: 0,
        isNetworkError: true
      };
    }

    return {
      message: error.message || 'Error de conexión',
      status: 0,
      isNetworkError: true
    };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, {
        ...config,
        withCredentials: true
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data, {
        ...config,
        withCredentials: true
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<T>(url, data, {
        ...config,
        withCredentials: true
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<T>(url, {
        ...config,
        withCredentials: true
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error as AxiosError<ErrorResponse>);
    }
  }
}

export const apiService = ApiService.getInstance(); 