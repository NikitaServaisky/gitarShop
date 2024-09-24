import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../controllers/CartContaxt';
import classes from './ProductModal.module.css';
import Button from '../ButtonComponent/Button'; // Import the reusable Button component

const ProductModal = ({ product, isOpen, onRequestClose, isAuthenticated }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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
        <Button onClick={onRequestClose} className={classes.closeButton}>
          X
        </Button>
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

          {/* Use the reusable Button component */}
          <div className={classes.actions}>
            <Button onClick={() => addToCart(product)} className={classes.addToCartButton}>
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className={classes.buyNowButton}
              disabled={!isAuthenticated}
            >
              Buy Now
            </Button>
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
