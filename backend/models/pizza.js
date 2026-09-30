const { model, default: mongoose } = require('mongoose');
// const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    spiceLevel: String, // green/red dot
    ingredients: [String],
    toppings: [String]
});

const Pizza = mongoose.model('Pizza',pizzaSchema);

module.exports = Pizza;