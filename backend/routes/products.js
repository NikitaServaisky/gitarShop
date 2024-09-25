const express = require('express');
const { productsFetch, productsFetchById } = require('../controllers/productsController');
const router = express.Router();

// Fatching all products
router.get('/', productsFetch);

// Fetchitng products by id
router.get('/products/:id', productsFetchById);
