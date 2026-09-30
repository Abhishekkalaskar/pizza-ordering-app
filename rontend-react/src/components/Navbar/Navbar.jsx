import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/pizza-logo.png';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand" aria-label="Pizzeria home">
        <span className="brand-name">pizzeria</span>
        <img src={logo} alt="Pizzeria logo" className="brand-logo" />
      </NavLink>

      <div className="nav-links">
        <NavLink to="/order-pizza" className={({ isActive }) => (isActive ? 'active' : '')}>
          order pizza
        </NavLink>
        <NavLink to="/build-pizza" className={({ isActive }) => (isActive ? 'active' : '')}>
          build Ur pizza
        </NavLink>
      </div>

      <NavLink to="/cart" className={({ isActive }) => 'cart-btn' + (isActive ? ' active' : '')}>
        <span>🛒 Shopping Cart</span>
        <span className="cart-badge">{itemCount || 0}</span>
      </NavLink>
    </nav>
  );
}
