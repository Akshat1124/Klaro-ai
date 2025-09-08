const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);

// ...other routes here

// Error handler should be last
app.use(errorHandler);

module.exports = app;
