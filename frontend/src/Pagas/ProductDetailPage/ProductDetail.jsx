import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backEndApi } from '../../api';

const ProductDetail = () => {
  const { productId } = useParams(); // Correctly extract productId
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(productId);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backEndApi}/products/${productId}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.data); // Access the product data correctly
        } else {
          setError('Failed to fetch product details');
        }
      } catch (err) {
        setError('An error occurred while fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-detail">
      {product && (
        <>
          <img src={product.image} alt={product.model} />
          <h1>{product.model}</h1>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
