import api from './api';

// Funciones en "estilo product service"
export const getCategories = () => api.get('/categorias');
export const createCategory = (data) => api.post('/categorias', data);
export const updateCategory = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categorias/${id}`);

// Alias en español (para mantener compatibilidad con tu código actual)
export const listarCategorias = () => getCategories();
export const crearCategoria = (data) => createCategory(data);
export const editarCategoria = (id, data) => updateCategory(id, data);
export const eliminarCategoria = (id) => deleteCategory(id);
