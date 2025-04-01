import axios from "axios";

const instance = axios.create({
  baseURL: 'https://userss.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})

// Добавляем перехватчик для логирования ошибок
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;