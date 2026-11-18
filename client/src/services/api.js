import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productService = {
  getAll: (category = null) => {
    const params = category ? { category } : {};
    return api.get('/products', { params });
  },
  
  getById: (id) => api.get(`/products/${id}`),
  
  getByCategory: (category) => api.get(`/products/category/${category}`),
  
  getCategories: () => api.get('/products/meta/categories'),
};

export default api;
