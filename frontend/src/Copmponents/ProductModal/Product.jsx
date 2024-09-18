import React from 'react';
import Modal from 'react-modal';
import classes from './ProductModal.module.css'; // Create CSS for the modal

const ProductModal = ({ product, isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className={classes.modal}
      overlayClassName={classes.overlay}
    >
      <button onClick={onRequestClose} className={classes.closeButton}>
        X
      </button>
      <div className={classes.modalContent}>
        <img src={product.image} alt={product.model} className={classes.product_image} />
        <h1>{product.model}</h1>
        <p>
          <strong>Manufacturer:</strong> {product.manufacturer}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Reviews:</strong> {product.reviews} / 5
        </p>
        <p>
          <strong>Colors:</strong> {product.colors.join(', ')}
        </p>
        <p>
          <strong>Pieces in Stock:</strong> {product.piecesInStock}
        </p>
        <p>{product.description}</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
