const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendationRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ...other routes here

// Error handler should be last
app.use(errorHandler);

module.exports = app;
