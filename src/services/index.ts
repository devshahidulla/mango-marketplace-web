import api from './api';
import { Product, ProductQueryParams, LoginCredentials, RegisterData, AuthResponse, User, CartItem, Category } from '../types';

export const productService = {
  // Get all products
  getAll: async (params: ProductQueryParams = {}): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products', { params });
    return response.data;
  },

  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/search', { params: { q: query } });
    return response.data;
  },

  // Get products by category
  getByCategory: async (categoryId: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${categoryId}`);
    return response.data;
  },
};

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export const cartService = {
  // Get cart items
  getCart: async (): Promise<CartItem[]> => {
    const response = await api.get<CartItem[]>('/cart');
    return response.data;
  },

  // Add item to cart
  addItem: async (productId: string, quantity: number = 1): Promise<CartItem> => {
    const response = await api.post<CartItem>('/cart', { productId, quantity });
    return response.data;
  },

  // Update cart item
  updateItem: async (itemId: string, quantity: number): Promise<CartItem> => {
    const response = await api.put<CartItem>(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeItem: async (itemId: string): Promise<void> => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async (): Promise<void> => {
    const response = await api.delete('/cart');
    return response.data;
  },
};

export const categoryService = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  // Get category by ID
  getById: async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },
};
