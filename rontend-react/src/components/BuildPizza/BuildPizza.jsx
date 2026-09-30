import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ingredientsService } from '../../services/ingredientsService';
import { useCart } from '../../context/CartContext';
import './BuildPizza.css';

export default function BuildPizza() {
  const { addItem } = useCart();

  const [ingredients, setIngredients] = useState([]); // each: { ...ingredient, selected }
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadIngredients = useCallback(() => {
    setLoading(true);
    setErrorMessage('');
    ingredientsService
      .getAllIngredients()
      .then((data) => {
        setIngredients(data.map((i) => ({ ...i, selected: false })));
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage(
          'Could not load ingredients. Please check that the API server is running and try again.'
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  const toggle = (ingredientId) => {
    setIngredients((prev) =>
      prev.map((i) => (i._id === ingredientId ? { ...i, selected: !i.selected } : i))
    );
  };

  const selectedIngredients = useMemo(() => ingredients.filter((i) => i.selected), [ingredients]);

  const totalCost = useMemo(
    () => Math.round(selectedIngredients.reduce((sum, i) => sum + i.price, 0) * 100) / 100,
    [selectedIngredients]
  );

  const buildPizza = () => {
    setSuccessMessage('');
    if (selectedIngredients.length === 0) {
      setErrorMessage('Select at least one ingredient before building your pizza.');
      return;
    }
    setErrorMessage('');

    const names = selectedIngredients.map((i) => i.name);
    const customId =
      'custom-' + names.slice().sort().join('-').toLowerCase().replace(/\s+/g, '_') + '-' + Date.now();

    addItem({
      id: customId,
      name: 'Build Ur Pizza (' + names.join(', ') + ')',
      unitPrice: totalCost,
      quantity: 1,
      customIngredients: names,
      customIngredientDetails: selectedIngredients.map((i) => ({ name: i.name, price: i.price }))
    });

    setSuccessMessage('Your custom pizza was added to the cart!');
    setIngredients((prev) => prev.map((i) => ({ ...i, selected: false })));
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  return (
    <div className="container">
      <p className="intro">
        Pizzeria now gives you options to build your own pizza. Customize your pizza by
        choosing ingredients from the list given below.
      </p>

      {errorMessage && <div className="error-banner">{errorMessage}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}

      {loading && <div className="empty-state">Loading ingredients&hellip;</div>}

      {!loading && ingredients.length > 0 && (
        <table className="ingredient-table">
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient._id}>
                <td className="ing-img-cell">
                  {ingredient.image && <img src={ingredient.image} alt={ingredient.name} />}
                </td>
                <td className="ing-name-cell">
                  {ingredient.name} &#8377;{ingredient.price.toFixed(2)}
                </td>
                <td className="ing-check-cell">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={ingredient.selected}
                      onChange={() => toggle(ingredient._id)}
                      aria-label={'Add ' + ingredient.name}
                    />
                    Add
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && ingredients.length === 0 && !errorMessage && (
        <div className="empty-state">No ingredients available right now.</div>
      )}

      {!loading && (
        <div className="total-row">
          <strong>Total Cost: &#8377;{totalCost.toFixed(2)}</strong>
        </div>
      )}

      <button className="btn btn-dark build-btn" onClick={buildPizza} disabled={loading}>
        Build Ur Pizza
      </button>
    </div>
  );
}
