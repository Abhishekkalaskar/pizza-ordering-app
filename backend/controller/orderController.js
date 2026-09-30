const Order = require('../models/order');

// POST /api/orders/checkout
// Body: { items: [{ name, unitPrice, quantity, customIngredients }] }
exports.checkout = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add at least one item before checkout.' });
    }

    let pizzaSubtotal = 0;
    let ingredientsTotal = 0;

    const processedItems = items.map((item) => {
      const { name, unitPrice, quantity, customIngredients = [] } = item;

      if (!name || unitPrice === undefined || !quantity) {
        throw new Error(`Invalid item payload for "${name || 'unknown'}"`);
      }
      if (quantity < 1) throw new Error(`Quantity for "${name}" must be at least 1`);
      if (unitPrice < 0) throw new Error(`Unit price for "${name}" must be positive`);

      const lineTotal = Number((unitPrice * quantity).toFixed(2));
      pizzaSubtotal += lineTotal;

      return { name, unitPrice, quantity, lineTotal, customIngredients };
    });

    const total = Number((pizzaSubtotal + ingredientsTotal).toFixed(2));

    const order = await Order.create({
      items: processedItems,
      pizzaSubtotal: Number(pizzaSubtotal.toFixed(2)),
      ingredientsTotal,
      total,
      status: 'paid'
    });

    res.status(201).json({ message: 'Payment successful', order });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Checkout failed' });
  }
};

// GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
