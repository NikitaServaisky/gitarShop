import React, { useState, useEffect } from 'react';
import { backEndApi } from '../../api'; // Ensure this points to your API base URL
import Gallery from '../../Copmponents/GalleryComponent/Gallery';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backEndApi}/products`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data.data); // Use `data.data` as your product list is inside `data`
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product Gallery</h1>
      <Gallery products={products} /> {/* Passing products to Gallery */}
    </div>
  );
};

export default ProductList;
