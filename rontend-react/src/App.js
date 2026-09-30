import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import OrderPizza from './components/OrderPizza/OrderPizza';
import BuildPizza from './components/BuildPizza/BuildPizza';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-pizza" element={<OrderPizza />} />
          <Route path="/build-pizza" element={<BuildPizza />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <div className="footer">Copyrights &#64; 2026 Pizzeria. All rights reserved.</div>
      </BrowserRouter>
    </CartProvider>
  );
}
