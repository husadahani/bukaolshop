'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/products/ProductList';
import { Product, PaginatedResponse } from '@/types';

// Mock data untuk search results
const mockSearchResults: Product[] = [
  {
    id: '1',
    nama_barang: 'Smartphone Samsung Galaxy A54',
    harga_barang: 4500000,
    harga_barang_asli: 5000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Smartphone',
    url_produk: '/produk/smartphone-samsung-galaxy-a54',
    discount_percent: 10
  },
  {
    id: '2',
    nama_barang: 'Smartphone iPhone 15 Pro',
    harga_barang: 18000000,
    harga_barang_asli: 18000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=iPhone',
    url_produk: '/produk/smartphone-iphone-15-pro'
  },
  {
    id: '3',
    nama_barang: 'Smartphone Xiaomi Redmi Note 13',
    harga_barang: 2800000,
    harga_barang_asli: 3200000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Xiaomi',
    url_produk: '/produk/smartphone-xiaomi-redmi-note-13',
    discount_percent: 12
  }
];

const mockSearchData: PaginatedResponse<Product> = {
  status: 'ok',
  data: mockSearchResults,
  current_page: 1,
  total_pages: 1,
  total_items: 3,
  next_page_url: undefined,
  back_page_url: undefined
};

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<PaginatedResponse<Product>>(mockSearchData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSearchResults(mockSearchData);
        setIsLoading(false);
      }, 1000);
    }
  }, [query]);

  if (!query) {
    return (
      <main className="min-h-screen py-5">
        <div className="container">
          <div className="text-center py-5">
            <i className="fa fa-search fa-4x text-muted mb-4"></i>
            <h2>Silakan masukkan kata kunci pencarian</h2>
            <p className="text-muted">Gunakan kotak pencarian di atas untuk mencari produk</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-5">
      <div className="container">
        {/* Search Header */}
        <div className="mb-4">
          <h2 className="mb-2">
            Hasil Pencarian: <span className="text-success">&quot;{query}&quot;</span>
          </h2>
          <p className="text-muted">
            Ditemukan {searchResults.total_items} produk
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="loading mb-3"></div>
            <p>Mencari produk...</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && (
          <ProductList 
            data={searchResults} 
            title={`Hasil Pencarian: "${query}"`}
          />
        )}

        {/* No Results */}
        {!isLoading && searchResults.status !== 'ok' && (
          <div className="text-center py-5">
            <i className="fa fa-search fa-4x text-muted mb-4"></i>
            <h3>Tidak ada hasil ditemukan</h3>
            <p className="text-muted mb-4">
              Maaf, tidak ada produk yang cocok dengan pencarian &quot;{query}&quot;
            </p>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Saran Pencarian:</h5>
                    <ul className="list-unstyled">
                      <li>• Periksa ejaan kata kunci</li>
                      <li>• Coba kata kunci yang lebih umum</li>
                      <li>• Gunakan kata kunci yang lebih pendek</li>
                      <li>• Coba kategori produk yang berbeda</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen py-5">
        <div className="container">
          <div className="text-center py-5">
            <div className="loading mb-3"></div>
            <p>Loading...</p>
          </div>
        </div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}