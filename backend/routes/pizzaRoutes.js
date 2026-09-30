const express = require('express');
const router = express.Router();
const {
    getAllPizzas
} = require('../controller/pizzaController')

router.get('/',getAllPizzas);

module.exports = router;


