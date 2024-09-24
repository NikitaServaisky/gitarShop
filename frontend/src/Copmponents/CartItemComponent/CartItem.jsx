import React from 'react';
import classes from './CartItem.module.css';
import Button from '../ButtonComponent/Button';

const CartItem = ({ item, onRemove }) => {
  return (
    <li className={classes.cartItem}>
      <img src={item.image} alt={item.model} className={classes.cartImage} />
      <div>
        <h3>{item.model}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <Button onClick={() => onRemove(item._id)} className={classes.removeButton}>
        Remove
      </Button>
    </li>
  );
};

export default CartItem;
