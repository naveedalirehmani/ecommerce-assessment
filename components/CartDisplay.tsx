// components/CartDisplay.tsx

'use client';

import React, { useState } from 'react';
import { useCartStore, useCartItemCount, useCartTotalPrice } from '../stores/use-cart.store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, X, Trash2, CreditCard, Plus, Minus } from 'lucide-react';

export default function CartDisplay() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCartStore();
  const cartItemCount = useCartItemCount();
  const totalPrice = useCartTotalPrice();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        className='relative'
      >
        <ShoppingCart className='w-4 h-4 mr-2' />
        Cart
        {cartItemCount > 0 && (
          <Badge variant="secondary" className="ml-2 min-w-[1.5rem] h-6">
            {cartItemCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className='absolute right-0 mt-2 w-96 max-w-sm z-50'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Shopping Cart</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className='w-4 h-4' />
            </Button>
          </CardHeader>
          <CardContent>

            {cartItems.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className='space-y-3 max-h-60 overflow-y-auto mb-4'>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between p-3 bg-muted/30 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className='w-12 h-12 object-cover rounded-md'
                        />
                        <div className="flex-1 min-w-0">
                          <p className='text-sm font-medium text-foreground truncate'>
                            {item.name}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className='w-3 h-3' />
                          </Button>
                          
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className='w-3 h-3' />
                          </Button>
                        </div>
                        
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        >
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t pt-4 space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold'>Total:</span>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      ${totalPrice.toFixed(2)}
                    </Badge>
                  </div>
                  <div className='space-y-2'>
                    <Button className='w-full' size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className='w-full'
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
