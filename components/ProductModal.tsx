'use client';

import React from 'react';
import { Product } from '../stores/use-product.store';
import { useCartStore, useIsInCart, useCartItemQuantity } from '../stores/use-cart.store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Package, 
  Ruler, 
  Weight, 
  Factory, 
  Star,
  Percent,
  X,
  Check
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCartStore();
  const isInCart = useIsInCart(product?.id || '');
  const cartQuantity = useCartItemQuantity(product?.id || '');

  if (!product) return null;

  // Generate multiple images for carousel (using different crop variations)
  const productImages = [
    product.imageUrl,
    product.imageUrl.replace('crop=center', 'crop=top'),
    product.imageUrl.replace('crop=center', 'crop=bottom'),
    product.imageUrl.replace('crop=center', 'crop=left'),
    product.imageUrl.replace('crop=center', 'crop=right'),
  ];

  // Mock discount calculation (same as ProductCard)
  const discountPercentage = Math.round(Math.random() * 20);
  const hasDiscount = discountPercentage > 0;
  const originalPrice = hasDiscount ? product.price / (1 - discountPercentage / 100) : product.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription className="text-lg">
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {productImages.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square">
                      <img
                        src={imageUrl}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {productImages.slice(0, 4).map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md border-2 border-muted hover:border-primary cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      {discountPercentage}% off
                    </Badge>
                  </>
                )}
              </div>
              
              {product.inventory && product.inventory < 10 && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Only {product.inventory} left in stock
                </Badge>
              )}
            </div>

            <Separator />

            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {product.sku && (
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                )}
                
                {product.manufacturer && (
                  <div className="flex items-center gap-2 text-sm">
                    <Factory className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span className="font-medium">{product.manufacturer}</span>
                  </div>
                )}
                
                {product.weight && (
                  <div className="flex items-center gap-2 text-sm">
                    <Weight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{product.weight} kg</span>
                  </div>
                )}
                
                {product.dimensions && (
                  <div className="flex items-center gap-2 text-sm">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              {isInCart ? (
                <Button 
                  variant="secondary"
                  className="w-full"
                  size="lg"
                  disabled
                >
                  <Check className="w-5 h-5 mr-2" />
                  In Cart ({cartQuantity})
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    addToCart(product);
                    // Optional: show a toast notification here
                  }}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}
              
            </div>

            {/* Reviews Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.5</span>
                <span className="text-sm text-muted-foreground">(Based on similar products)</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
