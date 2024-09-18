const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  manufacturer: String,
  reviews: String,
  reiting: Number,
  piecesInStock: Number,
});

const Product = mongoose.model('product', ProductsSchema);

module.exports = Product;
