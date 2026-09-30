import React, { useState, useEffect, useCallback } from 'react';
import { pizzaService } from '../../services/pizzaService';
import { useCart } from '../../context/CartContext';
import './OrderPizza.css';

export default function OrderPizza() {
  const { addItem } = useCart();

  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedFeedback, setAddedFeedback] = useState({});

  const loadMenu = useCallback(() => {
    setLoading(true);
    setErrorMessage('');
    pizzaService
      .getAllPizzas()
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(
          'Could not load the pizza menu. Please check that the API server is running and try again.'
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  const addToCart = (pizza) => {
    addItem({
      id: pizza._id,
      name: pizza.name,
      unitPrice: pizza.price,
      quantity: 1,
      image: pizza.image,
      spiceLevel: pizza.spiceLevel
    });

    setAddedFeedback((prev) => ({ ...prev, [pizza._id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [pizza._id]: false }));
    }, 1200);
  };

  return (
    <div className="container">
      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      {loading && <div className="empty-state">Loading menu&hellip;</div>}

      {!loading && !errorMessage && pizzas.length === 0 && (
        <div className="empty-state">No pizzas available right now. Please check back soon.</div>
      )}

      {!loading && pizzas.length > 0 && (
        <div className="menu-grid">
          {pizzas.map((pizza) => (
            <div className="pizza-card" key={pizza._id}>
              <div className="pizza-info">
                <div className="pizza-name-row">
                  <h3>{pizza.name}</h3>
                  <span
                    className={`status-dot ${pizza.spiceLevel}`}
                    title={pizza.spiceLevel === 'spicy' ? 'Spicy' : 'Mild'}
                  ></span>
                </div>
                <p className="pizza-desc">{pizza.description}</p>
                {pizza.ingredients?.length > 0 && (
                  <p className="pizza-meta">
                    <strong>Ingredients:</strong> {pizza.ingredients.join(', ')}
                  </p>
                )}
                {pizza.toppings?.length > 0 && (
                  <p className="pizza-meta">
                    <strong>Toppings:</strong> {pizza.toppings.join(', ')}
                  </p>
                )}
                <div className="pizza-footer">
                  <span className="pizza-price">&#8377;{pizza.price.toFixed(2)}</span>
                  <button className="btn btn-primary" onClick={() => addToCart(pizza)}>
                    {addedFeedback[pizza._id] ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
              {pizza.image && <img className="pizza-img" src={pizza.image} alt={pizza.name} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
