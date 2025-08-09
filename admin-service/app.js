require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./router/productRoutes');
const adminRoute = require ('./router/adminRoutes');
const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });

app.use('/admin', productRoutes);
app.use('/admin',adminRoute);
app.get('/', (req, res) => res.send('Admin Service Running'));

app.listen(5002, () => {
  console.log('Admin Service Started On Port 5002');
});
