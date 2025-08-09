const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const protect = require('../middleware/authmiddleware');


router.post('/place', protect, orderController.placeOrder);
router.get('/get-orders', orderController.getAllOrders);

module.exports = router;
