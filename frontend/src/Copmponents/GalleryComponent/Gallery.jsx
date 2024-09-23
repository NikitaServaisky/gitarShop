import React, { useState } from 'react';
import classes from './Gallery.module.css'; // Import CSS
import ProductModal from '../ProductModal/Product'; // Import the modal component

const Gallery = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Open modal when product is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear selected product on close
  };

  return (
    <div className={classes.gallery_container}>
      {products.map((product, index) => (
        <div
          key={index}
          className={classes.gallery_item}
          onClick={() => handleClick(product)} // Open modal on click
        >
          <img src={product.image} alt={product.model} className={classes.gallery_image} />
          <div className={classes.gallery_info}>
            <h3 className={classes.product_model}>{product.model}</h3>
            <p className={classes.product_manufacturer}>{product.manufacturer}</p>
            <p className={classes.product_price}>${product.price}</p>
          </div>
        </div>
      ))}

      {/* Modal for product details */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onRequestClose={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
