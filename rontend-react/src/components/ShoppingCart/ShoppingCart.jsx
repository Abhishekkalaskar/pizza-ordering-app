import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import './ShoppingCart.css';

function round(value) {
  return Math.round(value * 100) / 100;
}

// "Pizza" = standard menu items, "Ingredients" = custom Build-Ur-Pizza items,
// matching the two-line breakdown shown on the totals panel.
function pizzaSubtotal(items) {
  return round(
    items
      .filter((i) => !(i.customIngredients && i.customIngredients.length))
      .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  );
}

// Only regular "Order Pizza" menu items — excludes Build Ur Pizza items
function regularCartItems(items) {
  return items.filter((i) => !(i.customIngredientDetails && i.customIngredientDetails.length));
}

function ingredientsSubtotal(items) {
  return round(
    items
      .filter((i) => i.customIngredients && i.customIngredients.length)
      .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  );
}

function grandTotal(items) {
  return round(pizzaSubtotal(items) + ingredientsSubtotal(items));
}

function ingredientBreakdown(items) {
  const rows = [];
  items
    .filter((i) => i.customIngredientDetails && i.customIngredientDetails.length)
    .forEach((item) => {
      item.customIngredientDetails.forEach((detail) => {
        rows.push({
          name: detail.name,
          price: round(detail.price * item.quantity)
        });
      });
    });
  return rows;
}

export default function ShoppingCart() {
  const { items, incrementQuantity, decrementQuantity, removeItem, clearCart } = useCart();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [showIngredientsDropdown, setShowIngredientsDropdown] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setSuccessMessage('');
    setErrorMessage('');
  };

  const toggleIngredientsDropdown = () => {
    setShowIngredientsDropdown((prev) => !prev);
  };

  const pay = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!items || items.length === 0) {
      setErrorMessage('Your cart is empty. Add a pizza before paying.');
      return;
    }

    setIsPaying(true);
    orderService
      .checkout(items)
      .then((res) => {
        setIsPaying(false);
        setSuccessMessage(`Payment successful! Order total: ₹${res.order.total.toFixed(2)}`);
        clearCart();
      })
      .catch((err) => {
        setIsPaying(false);
        setErrorMessage(err?.response?.data?.message || 'Payment failed. Please try again.');
      });
  };

  const breakdown = ingredientBreakdown(items);
  const visibleItems = regularCartItems(items);

  return (
    <div className="container">
      {errorMessage && <div className="error-banner">{errorMessage}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}

      {items.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-panel">
            <h2>My Cart</h2>

            {visibleItems.map((item) => (
              <div className="cart-row" key={item.id}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="cart-img" />
                ) : (
                  <div className="cart-img placeholder">🍕</div>
                )}

                {item.spiceLevel && <span className={`status-dot ${item.spiceLevel}`}></span>}

                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit">&#8377;{item.unitPrice.toFixed(2)}</div>
                </div>

                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => decrementQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => incrementQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="line-total">&#8377;{(item.unitPrice * item.quantity).toFixed(2)}</div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  🗑
                </button>
              </div>
            ))}

            <div className="cart-subtotal">
              Sub Total: &#8377;{pizzaSubtotal(items).toFixed(2)}
            </div>
          </div>

          <div className="totals-panel">
            <h2>The total amount of</h2>

            <div className="totals-row">
              <span>Pizza</span>
              <span>&#8377;{pizzaSubtotal(items).toFixed(2)}</span>
            </div>

            <div
              className={'totals-row ingredients-row' + (breakdown.length === 0 ? ' disabled' : '')}
              onClick={toggleIngredientsDropdown}
            >
              <span className="ingredients-label">
                Ingredients
                {breakdown.length > 0 && (
                  <span className={'chevron' + (showIngredientsDropdown ? ' open' : '')}>⌄</span>
                )}
              </span>
              <span>&#8377;{ingredientsSubtotal(items).toFixed(2)}</span>
            </div>

            {showIngredientsDropdown && breakdown.length > 0 && (
              <div className="ingredients-dropdown">
                {breakdown.map((ing, idx) => (
                  <div className="ingredient-line" key={idx}>
                    <span>{ing.name}</span>
                    <span>&#8377;{ing.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="totals-row grand">
              <span>Total :</span>
              <span>&#8377;{grandTotal(items).toFixed(2)}</span>
            </div>

            <div className="totals-actions">
              <button className="btn btn-primary" onClick={pay} disabled={isPaying}>
                {isPaying ? 'Processing…' : 'Pay'}
              </button>
              <button className="btn btn-dark" onClick={handleClearCart}>
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          Your cart is empty. Browse the <Link to="/order-pizza">menu</Link> or{' '}
          <Link to="/build-pizza">build your own pizza</Link> to get started.
        </div>
      )}
    </div>
  );
}
