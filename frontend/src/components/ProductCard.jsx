import React from 'react';

const ProductCard = ({ producto, onAddToCart, isAuthenticated }) => {
  const handleClick = () => {
    if (isAuthenticated) {
      onAddToCart(producto);
    } else {
      alert("Debes iniciar sesión para agregar productos al carrito.");
    }
  };

  return (
    <div className="card">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="price">${producto.precio}</p>
      <button onClick={handleClick}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
