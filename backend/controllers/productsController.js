const Product = require('../models/productsSchema'); // Ensure correct path

// Fetch all products
exports.productsFetch = async (req, res) => {
  try {
    const products = await Product.find(); // Use Product.find()
    res.status(200).json({ data: products, message: 'Successfully fetched products.' });
  } catch (err) {
    console.error('Error fetching products:', err); // Log the error
    res.status(500).json({
      message: 'Error fetching products. Please try again later.',
      error: err.message || 'Unknown error',
    });
  }
};

exports.productsFetchById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ data: product, message: 'Product fetched successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Fetching error. Please try again later.' });
  }
};
