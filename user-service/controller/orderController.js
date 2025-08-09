const order = require('../model/order');
const Order = require('../model/order');
const axios = require('axios')
const mongoose = require ('mongoose');
exports.placeOrder = async (req, res) => {
  try {
    const { products, userId } = req.body;
    if (!userId) return res.status(400).json({ message: "UserId required" });
    if (!products || !products.length) return res.status(400).json({ message: "Products are required" });

    let totalAmount = 0;
    for (const item of products) {
      const response = await axios.get(`http://localhost:5002/admin/get-product/${item.productId}`);
      if (!response.data) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }

      const price = Number(response.data.price);
      const quantity = Number(item.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        return res.status(400).json({ message: `Invalid price or quantity for product ${item.productId}` });
      }

      totalAmount += price * quantity;
    }

    const order = new Order({
      userId,
      products,
      totalAmount,
      status: 'pending',
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllOrders = async (req,res) =>{
  try{
  const orders = await Order.find()
  return res.status(201).json({message:"Orders Till Now",orders})
} catch (error){
  return res.status(400).json("internal server error")
}};


