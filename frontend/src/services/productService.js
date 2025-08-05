import api from './api';

export const getProducts = () => api.get('/productos');
export const createProduct = (data) => api.post('/productos', data);
export const updateProduct = (id, data) => api.put(`/productos/${id}`, data);
export const deleteProduct = (id) => api.delete(`/productos/${id}`);
