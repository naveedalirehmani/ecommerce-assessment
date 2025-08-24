'use client';

import { useState, useEffect } from 'react';
import { useProductStore, Product } from '../stores/use-product.store';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Truck, Shield, Clock, Loader2 } from 'lucide-react';

export default function Home() {
  const { 
    products, 
    isLoading, 
    fetchProducts 
  } = useProductStore();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
            Welcome to StyleStore
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Discover our curated collection of premium products, carefully
            selected for style and quality.
          </p>
          <Badge variant="secondary" className="mt-4">
            New Collection Available
          </Badge>
        </div>

        {/* Products Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-foreground mb-6'>
            Featured Products
          </h2>
          <div className='relative mb-6'>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Loading products...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products found matching your search.</p>
              </div>
            ) : (
              sortedProducts.map((product: Product, index) => (
                <ProductCard key={product.id || index} product={product} />
              ))
            )}
          </div>
        </div>

        {/* Features Section */}
        <Card className='mt-16'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Why Choose StyleStore?</CardTitle>
            <CardDescription>
              We're committed to providing the best shopping experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Truck className='w-8 h-8 text-primary' />
                </div>
                <h4 className='text-lg font-semibold text-foreground mb-2'>
                  Free Shipping
                </h4>
                <p className='text-muted-foreground'>
                  Free shipping on all orders over $50
                </p>
              </div>
              <div className='text-center'>
                <div className='bg-secondary/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Shield className='w-8 h-8 text-primary' />
                </div>
                <h4 className='text-lg font-semibold text-foreground mb-2'>
                  Quality Guaranteed
                </h4>
                <p className='text-muted-foreground'>30-day money-back guarantee</p>
              </div>
              <div className='text-center'>
                <div className='bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-8 h-8 text-primary' />
                </div>
                <h4 className='text-lg font-semibold text-foreground mb-2'>
                  24/7 Support
                </h4>
                <p className='text-muted-foreground'>
                  Round-the-clock customer support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
