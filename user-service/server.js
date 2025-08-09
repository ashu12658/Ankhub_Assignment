require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/useRouter');
const orderRoutes = require('./routes/orderoute');

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



app.use('/user', userRoutes);        
app.use('/user/orders', orderRoutes);


const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, () => {
  console.log(`User Service Started At Port ${PORT}`);
});
