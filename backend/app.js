require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/mongo');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

connectMongo();

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));

module.exports = app;
