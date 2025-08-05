import React, { useState, useEffect } from 'react';
import '../styles/ProductList.css';

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/productos`);
      
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error al cargar productos</h3>
        <p>{error}</p>
        <button onClick={fetchProductos} className="retry-btn">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2>Nuestros Productos</h2>
      
      {productos.length === 0 ? (
        <div className="no-products">
          <p>No hay productos disponibles</p>
        </div>
      ) : (
        <div className="product-grid">
          {productos.map((producto) => (
            <div key={producto.producto_id} className="product-card">
              <div className="product-image">
                {producto.url_imagen ? (
                  <img 
                    src={`http://localhost:8000/storage/${producto.url_imagen}`}
                    alt={producto.nombre_producto}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                ) : (
                  <div className="placeholder-image">
                    <span>Sin imagen</span>
                  </div>
                )}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{producto.nombre_producto}</h3>
                <p className="product-description">{producto.descripcion}</p>
                <div className="product-price">
                  <span className="price">${producto.precio}</span>
                </div>
                
                
                <button className="add-to-cart-btn">
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 