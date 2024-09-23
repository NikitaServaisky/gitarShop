import React, { useState, useEffect } from 'react';
import { backEndApi } from '../../api'; // Ensure this points to your API base URL
import Gallery from '../../Copmponents/GalleryComponent/Gallery';
import Search from '../../Copmponents/SearchComponent/Search';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backEndApi}/products`);
        const data = await response.json();
        console.log(data.data);

        if (response.ok && data.data) {
          setProducts(data.data); // Use `data.data` as your product list is inside `data`
          setFilteredProducts(data.data);
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

  // Function to handlesearch input from Search component
  const handleSearch = (query) => {
    if (query === '') {
      setFilteredProducts(products); // Reset to original products if search query is empty
    } else {
      const filtered = products.filter((product) =>
        product.model ? product.model.toLowerCase().includes(query.toLowerCase()) : false,
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product Gallery</h1>
      <Search onSearch={handleSearch} />{' '}
      {/* Integrate the searxh component and pass the handleSearch function */}
      <Gallery products={filteredProducts} /> {/* Passing products to Gallery */}
    </div>
  );
};

export default ProductList;
