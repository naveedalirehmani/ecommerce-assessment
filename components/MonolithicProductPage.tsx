'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/use-cart.store';
import { useProductStore, Product } from '../stores/use-product.store';

export default function MonolithicProductPage() {
  const { addToCart } = useCartStore();
  const { 
    products, 
    isLoading: storeLoading, 
    fetchProducts
  } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name');
  const [filterPrice, setFilterPrice] = useState(1000);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products
    .filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price <= filterPrice
    )
    .sort((a: Product, b: Product) => {
      if (sortOrder === 'name') return a.name.localeCompare(b.name);
      if (sortOrder === 'price') return a.price - b.price;
      return 0;
    });

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  };

  return (
    <div style={containerStyle} className='min-h-screen'>
      <div className='mb-8'>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          Product Catalog
        </h1>

        <div className='flex gap-4 mt-4'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search products...'
            style={{ border: '1px solid #ccc', padding: '8px' }}
            className='rounded'
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value='name'>Sort by Name</option>
            <option value='price'>Sort by Price</option>
          </select>

          <div>
            <label>Max Price: ${filterPrice}</label>
            <input
              type='range'
              min='0'
              max='500'
              value={filterPrice}
              onChange={(e) => setFilterPrice(Number(e.target.value))}
              style={{ width: '200px' }}
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        {storeLoading ? (
          <div className="col-span-3 text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          filteredProducts?.map((product: Product) => (
          <div
            key={product.id}
            style={{ backgroundColor: 'white', padding: '16px' }}
          >
            <img src={product.imageUrl} className='w-full h-48 object-cover' />

            <h3 style={{ fontSize: '18px', marginTop: '8px' }}>
              {product.name}
            </h3>
            <p className='text-gray-600 mt-2'>{product.description}</p>

            <div className='mt-4'>
              <span style={{ color: 'green', fontSize: '20px' }}>
                ${product.price.toFixed(2)}
              </span>

              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '8px 16px',
                  marginLeft: '16px',
                }}
                className='rounded'
              >
                Add to Cart
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
