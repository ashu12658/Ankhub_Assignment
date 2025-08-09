const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', createProxyMiddleware({target: 'http://localhost:5001',changeOrigin: true,}));

app.use('/admin', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
}));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Gateway Service Started on port ${PORT}`);
});
