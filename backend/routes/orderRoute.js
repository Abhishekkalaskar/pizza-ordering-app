const express = require('express');
const router = express.Router();
const { checkout, getAllOrders } = require('../controller/orderController');

router.post('/checkout', checkout);
router.get('/', getAllOrders);

module.exports = router;
