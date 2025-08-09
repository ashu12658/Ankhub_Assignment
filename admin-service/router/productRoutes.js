const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const admin = require('../Middleware/adminAuthMiddleware'); 

router.post('/create-product', admin, productController.addProduct);
router.get('/get-products', productController.getProducts);
router.put('/update/:id', admin, productController.updateProduct);
router.delete('/delete/:id', admin, productController.deleteProduct);
router.get('/get-product/:id',productController.getProductById);
module.exports = router;
