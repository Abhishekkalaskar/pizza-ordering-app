import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const STORAGE_KEY = 'pizzeria_cart';

const CartContext = createContext(null);

function loadFromStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(items) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable — cart still works in-memory for this session
  }
}

function round(value) {
  return Math.round(value * 100) / 100;
}

/**
 * CartProvider wraps the app once (in App.js) so every component can share
 * the same cart state — the React equivalent of Angular's
 * `@Injectable({ providedIn: 'root' })` singleton CartService.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadFromStorage);

  // Whenever items changes, save it — equivalent to calling persist()
  // at the end of every mutator method in the Angular service.
  useEffect(() => {
    persist(items);
  }, [items]);

  const addItem = useCallback((newItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const incrementQuantity = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decrementQuantity = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // itemCount excludes Build-Ur-Pizza items — matches CartService.itemCount$
  const itemCount = useMemo(
    () =>
      items
        .filter((i) => !(i.customIngredientDetails && i.customIngredientDetails.length))
        .reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => round(items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)),
    [items]
  );

  const value = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * useCart() is the React equivalent of injecting CartService into a
 * component's constructor in Angular.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
