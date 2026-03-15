import axios from 'axios';
import { RegisterData, AuthResponse, LoginCredentials, User } from '../types';

const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:5001';
const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:5003';

const userServiceInstance = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authServiceInstance = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Shared interceptor setup
const setupInterceptors = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(userServiceInstance);
setupInterceptors(authServiceInstance);

// Auth service response types (different from frontend AuthResponse)
interface AuthServiceLoginResponse {
  accessToken: string;
  expiresIn: number;
}

// Decode JWT payload without a library (no signature verification needed client-side)
const parseJwtPayload = (token: string): Record<string, string> => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

const userFromToken = (token: string): User => {
  const claims = parseJwtPayload(token);
  const fullName = claims.fullName || claims.full_name || '';
  const [firstName = '', ...lastParts] = fullName.split(' ');
  const lastName = lastParts.join(' ');

  return {
    id: claims.sub || '',
    firstName,
    lastName,
    email: claims[EMAIL_CLAIM] || claims.email || '',
  };
};

export const userService = {
  // Register a new user
  registerUser: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await userServiceInstance.post<AuthResponse>('/api/v1/users/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Login user
  loginUser: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authServiceInstance.post<AuthServiceLoginResponse>('/api/v1/auth/login', credentials);
    const { accessToken } = response.data;

    // Store token
    localStorage.setItem('token', accessToken);

    // Extract user info from JWT claims
    const user = userFromToken(accessToken);

    return { user, token: accessToken };
  },

  // Get current user from stored token
  getCurrentUser: (): User | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return userFromToken(token);
    } catch {
      return null;
    }
  },
};

export default userServiceInstance;
