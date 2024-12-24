import axios from 'axios';

const API_URL = 'http://localhost:5000'; // URL вашего API

// Создаем экземпляр Axios
const api = axios.create({
    baseURL: API_URL,
});

// Middleware для добавления токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
    }
    return config;
});

export default api;
