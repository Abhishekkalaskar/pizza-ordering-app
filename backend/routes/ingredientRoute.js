const express = require('express');
const router = express.Router();
const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient
} = require('../controller/ingredientController');

router.get('/', getAllIngredients);
router.post('/', createIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

module.exports = router;
