import React, { useContext } from 'react';
import { CartContext } from '../../controllers/CartContaxt';
import classes from './Cart.module.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={classes.cart}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.model} className={classes.cartImage} />
                <div>
                  <h3>{item.model}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className={classes.total}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={clearCart} className={classes.clearCartButton}>
            Clear Cart
          </button>
          <button className={classes.checkoutButton}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
