import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { userService } from './userService';
import userServiceInstance from './userService';
import { RegisterData, AuthResponse } from '../types';

describe('userService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(userServiceInstance);
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    mock.restore();
  });

  describe('registerUser', () => {
    it('should successfully register a user and store the token', async () => {
      const userData: RegisterData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
        token: 'mock-jwt-token',
      };

      mock.onPost('/api/v1/users/registers', userData).reply(200, mockResponse);

      const response = await userService.registerUser(userData);

      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('mock-jwt-token');
    });

    it('should handle registration with all required fields', async () => {
      const userData: RegisterData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'securePassword456',
      };

      const mockResponse: AuthResponse = {
        user: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
        },
        token: 'another-mock-token',
      };

      mock.onPost('/api/v1/users/registers').reply(200, mockResponse);

      const response = await userService.registerUser(userData);

      expect(response.user.firstName).toBe('Jane');
      expect(response.user.lastName).toBe('Smith');
      expect(response.user.email).toBe('jane.smith@example.com');
      expect(response.token).toBe('another-mock-token');
    });

    it('should handle error when registration fails', async () => {
      const userData: RegisterData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
      };

      const errorMessage = 'Email already exists';
      mock.onPost('/api/v1/users/registers').reply(400, {
        message: errorMessage,
      });

      await expect(userService.registerUser(userData)).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      const userData: RegisterData = {
        firstName: 'Network',
        lastName: 'Error',
        email: 'network@example.com',
        password: 'password',
      };

      mock.onPost('/api/v1/users/registers').networkError();

      await expect(userService.registerUser(userData)).rejects.toThrow();
    });

    it('should handle validation errors from the API', async () => {
      const userData: RegisterData = {
        firstName: '',
        lastName: '',
        email: 'invalid-email',
        password: '123',
      };

      mock.onPost('/api/v1/users/registers').reply(422, {
        message: 'Validation failed',
        errors: {
          firstName: 'First name is required',
          lastName: 'Last name is required',
          email: 'Email is invalid',
          password: 'Password must be at least 8 characters',
        },
      });

      await expect(userService.registerUser(userData)).rejects.toThrow();
    });

    it('should not store token if it is not returned in response', async () => {
      const userData: RegisterData = {
        firstName: 'No',
        lastName: 'Token',
        email: 'notoken@example.com',
        password: 'password123',
      };

      const mockResponse = {
        user: {
          id: '3',
          firstName: 'No',
          lastName: 'Token',
          email: 'notoken@example.com',
        },
        token: '',
      };

      mock.onPost('/api/v1/users/registers').reply(200, mockResponse);

      await userService.registerUser(userData);

      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should use the correct endpoint path', async () => {
      const userData: RegisterData = {
        firstName: 'Endpoint',
        lastName: 'Test',
        email: 'endpoint@example.com',
        password: 'password123',
      };

      const mockResponse: AuthResponse = {
        user: {
          id: '4',
          firstName: 'Endpoint',
          lastName: 'Test',
          email: 'endpoint@example.com',
        },
        token: 'endpoint-token',
      };

      // Verify the exact endpoint is called
      mock.onPost('/api/v1/users/registers').reply((config) => {
        expect(config.url).toBe('/api/v1/users/registers');
        return [200, mockResponse];
      });

      await userService.registerUser(userData);
    });

    it('should send the correct payload structure', async () => {
      const userData: RegisterData = {
        firstName: 'Payload',
        lastName: 'Check',
        email: 'payload@example.com',
        password: 'password123',
      };

      const mockResponse: AuthResponse = {
        user: {
          id: '5',
          firstName: 'Payload',
          lastName: 'Check',
          email: 'payload@example.com',
        },
        token: 'payload-token',
      };

      mock.onPost('/api/v1/users/registers').reply((config) => {
        const data = JSON.parse(config.data);
        expect(data).toEqual(userData);
        return [200, mockResponse];
      });

      await userService.registerUser(userData);
    });
  });
});
