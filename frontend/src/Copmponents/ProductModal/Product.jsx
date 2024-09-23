import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../controllers/CartContaxt';
import classes from './ProductModal.module.css';

const ProductModal = ({ product, isOpen, onRequestClose, isAuthenticated }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Use the cart context

  const handleBuyNow = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={classes.modalOverlay} onClick={onRequestClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onRequestClose} className={classes.closeButton}>
          X
        </button>
        <div className={classes.modalContent}>
          <img src={product.image} alt={product.model} className={classes.productImage} />
          <h1>{product.model}</h1>
          <p>
            <strong>Manufacturer:</strong> {product.manufacturer}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>{product.description}</p>

          {/* Add to Cart and Buy Now Buttons */}
          <div className={classes.actions}>
            <button onClick={() => addToCart(product)} className={classes.addToCartButton}>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={classes.buyNowButton}
              disabled={!isAuthenticated}
            >
              Buy Now
            </button>
          </div>

          {!isAuthenticated && (
            <p className={classes.authWarning}>Please log in to buy the product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
