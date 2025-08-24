// components/ProductCard.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '../stores/use-product.store';
import { useCartStore, useIsInCart, useCartItemQuantity } from '../stores/use-cart.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Percent, Eye, Check } from 'lucide-react';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInCart = useIsInCart(product.id);
  const cartQuantity = useCartItemQuantity(product.id);

  // Optimized: Use useMemo to prevent expensive recalculation
  const discountPercentage = useMemo(() => {
    return Math.round(Math.random() * 20);
  }, [product.id]);

  // Optimized: Use useCallback for event handlers (if needed multiple times)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const hasDiscount = discountPercentage > 0;

  return (
    <>
      <Card 
        className='group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className='relative overflow-hidden rounded-t-lg'
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
          />
          
          {/* Overlay with view icon on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        <div className='absolute top-3 right-3 flex flex-col gap-2'>
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            ${product.price.toFixed(2)}
          </Badge>
          {hasDiscount && (
            <Badge variant="destructive" className="bg-destructive/90 backdrop-blur-sm">
              <Percent className="w-3 h-3 mr-1" />
              {discountPercentage}% off
            </Badge>
          )}
        </div>
        {product.inventory && product.inventory < 10 && (
          <div className='absolute top-3 left-3'>
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
              Only {product.inventory} left
            </Badge>
          </div>
        )}
              </div>

        <CardHeader className="flex-grow">
          <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2">
            {isInCart ? (
              <Button 
                variant="secondary"
                className="w-full"
                size="sm"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                In Cart ({cartQuantity})
              </Button>
            ) : (
              <Button 
                onClick={() => addToCart(product)}
                className="w-full"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProductModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
