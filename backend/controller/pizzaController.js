const Pizza = require('../models/pizza')

exports.getAllPizzas = async (req , res)=>{
   try {
    const pizzas = await Pizza.find({});
    res.status(200).json(pizzas)
   } catch (error) {
    res.status(500).json({message:'Filled to fetch pizzas',error:err.message});
   }
};


// GET /api/pizzas/:id
exports.getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pizza', error: err.message });
  }
};

// POST /api/pizzas
exports.createPizza = async (req, res) => {
  try {
    const { name, description, price, image, spiceLevel, ingredients, toppings } = req.body;
    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'name, description and price are required' });
    }
    if (price < 0) return res.status(400).json({ message: 'price must be a positive number' });

    const pizza = await Pizza.create({ name, description, price, image, spiceLevel, ingredients, toppings });
    res.status(201).json(pizza);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create pizza', error: err.message });
  }
};

// PUT /api/pizzas/:id
exports.updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update pizza', error: err.message });
  }
};

// DELETE /api/pizzas/:id
exports.deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.status(200).json({ message: 'Pizza deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete pizza', error: err.message });
  }
};


