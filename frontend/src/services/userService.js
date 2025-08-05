import api from './api';

export const getUsers = () => api.get('/usuarios');
export const createUser = (data) => api.post('/usuarios', data);
export const updateUser = (id, data) => api.put(`/usuarios/${id}`, data);
export const deleteUser = (id) => api.delete(`/usuarios/${id}`);
