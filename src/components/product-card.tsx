'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  price: number;
  image?: string | null;
  isActive: boolean;
}

interface ProductCardProps {
  product: Product;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'PULSA':
      return '📞';
    case 'PAKET_DATA':
      return '📶';
    case 'TOKEN_PLN':
      return '⚡';
    case 'VOUCHER_GAME':
      return '🎮';
    case 'PASCABAYAR':
      return '💳';
    default:
      return '📱';
  }
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10">
      <CardContent className="p-6">
        {/* Product Image/Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
            ) : (
              <span>{getCategoryIcon(product.category)}</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Category Badge */}
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 mb-4">
            <Zap className="w-3 h-3 mr-1" />
            {product.category.replace('_', ' ')}
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-white mb-4">
            {formatPrice(product.price)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/products/${product.id}`} className="w-full">
          <Button 
            variant="gradient" 
            className="w-full group-hover:scale-105 transition-transform"
          >
            TopUp Sekarang
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}