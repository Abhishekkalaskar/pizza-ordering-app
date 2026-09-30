const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');
const mongoose = require('mongoose');
const pizzaSchema = require('./models/pizza');

const pizzaRoutes = require('./routes/pizzaRoutes');
const ingredientRoute = require('./routes/ingredientRoute');
const orderRoute = require('./routes/orderRoute');


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/pizzas', pizzaRoutes);
app.use('/api/ingredients', ingredientRoute);
app.use('/api/orders', orderRoute);

// 404 handler
app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
});

// centralized error handler
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong on the server' });
});




app.listen(7000, () => {
        console.log('server is running on port 7000')
})






