export const APP_NAME = 'Mango Marketplace';
export const APP_DESCRIPTION = 'Your one-stop shop for quality products';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const COLORS = {
  primary: '#FF9F1C',
  secondary: '#2D3142',
  accent: '#4ECDC4',
};

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  CART: 'cart',
  USER: 'user',
};
