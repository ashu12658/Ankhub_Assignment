const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const axios = require ('axios')
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });

    admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' ,admin});
  } catch (error) {
    console.log("server error",error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin._id, username: admin.username }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchUsersFromService = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5001/user/get'); 
    const users = response.data.users;
    res.status(200).json({ message: "Users fetched from User Service", users });
  } catch (error) {
    console.error('Error fetching users from User Service:', error.message);
    res.status(500).json({ message: 'Could not fetch users', error: error.message });
  }
};

exports.getAllOrdersFromOrderService = async (req, res) => {
  try {
    const ordersRes = await axios.get('http://localhost:5001/user/get-orders'); 
    res.status(200).json({ orders: ordersRes.data.orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};