const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: String,
  unitPrice: String,
  quantity: Number,
  lineTotal: Number,
  customIngredients: [String]
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: { type: [orderItemSchema], required: true, validate: v => v.length > 0 },
  pizzaSubtotal: Number,
  ingredientsTotal: Number,
  total: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
