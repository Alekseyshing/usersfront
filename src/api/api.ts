import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../vite-env.d';

const api = axios.create({
  baseURL: 'https://userss.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


// Добавляем интерцептор для добавления токена к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  console.log('Attempting login with:', { email, password });
  try {
    const response = await api.post('/login', { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
  console.log('Attempting registration with:', { email, firstName, lastName });
  try {
    const response = await api.post('/register', { email, password, firstName, lastName });
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getUsers = async () => {
  console.log('Fetching users...');
  try {
    const response = await api.get('/users');
    console.log('Users response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  console.log('Fetching user:', id);
  try {
    const response = await api.get(`/users/${id}`);
    console.log('User response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export default api;