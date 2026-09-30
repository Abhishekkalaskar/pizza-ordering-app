const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = ingredient
