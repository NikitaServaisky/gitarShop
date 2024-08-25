import React from 'react';
import { NavLink } from 'react-router-dom';
import Classes from './Style.module.css';

const Header = () => {
  const navList = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 4, name: 'Account', path: '/account' },
    { id: 5, name: 'Products', path: '/products' },
    { id: 6, name: 'Cart', path: '/cart' },
  ];
  return (
    <header className={Classes.header}>
      <nav>
        <ul className={Classes.list}>
          {navList.map((item) => (
            <li key={item.id} className={Classes.li}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
