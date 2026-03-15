import { userService } from './userService';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return await userService.loginUser(credentials);
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    return await userService.registerUser(userData);
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },

  getCurrentUser: (): User | null => {
    return userService.getCurrentUser();
  },
};

export { userService };
