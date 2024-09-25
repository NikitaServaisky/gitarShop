import React, { useContext } from 'react';
import { CartContext } from '../../controllers/CartContaxt';
import CartItem from '../../Copmponents/CartItemComponent/CartItem';
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
              <CartItem key={item._id} item={item} onRemove={removeFromCart} />
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
