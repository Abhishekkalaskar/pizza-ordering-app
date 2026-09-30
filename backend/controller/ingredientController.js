const Ingredient = require('../models/ingredient');

// GET /api/ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find().sort({ name: 1 });
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ingredients', error: err.message });
  }
};

// POST /api/ingredients
exports.createIngredient = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'name and price are required' });
    }
    if (price < 0) return res.status(400).json({ message: 'price must be a positive number' });

    const ingredient = await Ingredient.create({ name, price, image });
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create ingredient', error: err.message });
  }
};

// PUT /api/ingredients/:id
exports.updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update ingredient', error: err.message });
  }
};

// DELETE /api/ingredients/:id
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete ingredient', error: err.message });
  }
};
