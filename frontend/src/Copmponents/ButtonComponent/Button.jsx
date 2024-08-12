import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ type, onClick, to, children, ...props }) => {
  if (to) {
    return (
      <Link to={to}>
        <button type={type || 'button'} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button type={type || 'button'} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
