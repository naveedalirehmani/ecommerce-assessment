// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CartDisplay from '../components/CartDisplay';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StyleStore - Premium Fashion & Lifestyle',
  description: 'Discover our curated collection of premium products, carefully selected for style and quality.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
          <header className='bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50'>
            <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
              <div className='flex items-center space-x-3'>
                <div className='bg-primary text-primary-foreground p-2 rounded-lg'>
                  <Store className='w-6 h-6' />
                </div>
                <h1 className='text-2xl font-bold text-foreground'>StyleStore</h1>
              </div>

              <nav className='hidden md:flex items-center space-x-2'>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Home
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Products
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  About
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Button>
              </nav>

              <CartDisplay />
            </div>
          </header>

          <main>{children}</main>

          <footer className='bg-muted/30 py-12 mt-16'>
            <div className='container mx-auto px-4'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Store className="w-5 h-5 text-primary" />
                    <h3 className='text-lg font-semibold text-foreground'>StyleStore</h3>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Your destination for premium fashion and lifestyle products.
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-semibold mb-3 text-foreground'>
                    SHOP
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        All Products
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        New Arrivals
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Sale
                      </Button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='text-sm font-semibold mb-3 text-foreground'>
                    SUPPORT
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Contact Us
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Shipping Info
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Returns
                      </Button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='text-sm font-semibold mb-3 text-foreground'>
                    CONNECT
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Newsletter
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                        Social Media
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='border-t border-border mt-8 pt-6 text-center text-muted-foreground text-sm'>
                <p>&copy; 2024 StyleStore. All rights reserved.</p>
              </div>
            </div>
          </footer>
      </body>
    </html>
  );
}
