'use client';

import { trpc } from '@/lib/trpc/client';
import { ProductCard } from '@/components/product-card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Semua', icon: '📱' },
  { id: 'PULSA', name: 'Pulsa', icon: '📞' },
  { id: 'PAKET_DATA', name: 'Paket Data', icon: '📶' },
  { id: 'TOKEN_PLN', name: 'Token PLN', icon: '⚡' },
  { id: 'VOUCHER_GAME', name: 'Voucher Game', icon: '🎮' },
  { id: 'PASCABAYAR', name: 'Pascabayar', icon: '💳' },
];

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: products, isLoading, error } = trpc.products.getAll.useQuery();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(product => product.category === selectedCategory);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Memuat produk...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pilih Layanan TopUp
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Berbagai layanan topup digital tersedia untuk kebutuhan Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'gradient' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Tidak ada produk tersedia untuk kategori ini</p>
          </div>
        )}
      </div>
    </section>
  );
}