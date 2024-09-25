require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
const authenticateToken = require('./middlewares/authToken');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const { resetPassword, forgotPassword } = require('./controllers/authController');
const { productsFetch, productsFetchById } = require('./controllers/productsController');

// Public routes (no authentication required)
app.use('/account', publicRoutes);
app.post('/forgot-password', forgotPassword);
app.use('/reset-password/:token', resetPassword);
app.use('/products', productsFetch);
app.get('/products/:id', productsFetchById); // Use app.get and dynamic parameter

// Protected routes (authentication required)
app.use('/account', authenticateToken, protectedRoutes);

// Setup server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
