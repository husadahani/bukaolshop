'use client';

import ProductCard from './ProductCard';
import Pagination from '../ui/Pagination';
import { Product, PaginatedResponse } from '@/types';

interface ProductListProps {
  data: PaginatedResponse<Product>;
  title?: string;
}

export default function ProductList({ data, title = "Daftar Produk" }: ProductListProps) {
  const currentPage = data.current_page || 1;

  if (data.status !== "ok") {
    return (
      <section>
        <div className="container">
          <h2 className="mt-4">{title}</h2>
          <div className="row">
            <div className="col-12">
              <div className="alert alert-info text-center">
                <h4>Produk tidak ditemukan</h4>
                <p>Silakan coba kata kunci lain atau periksa kembali nanti.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h2 className="mt-4 mb-4">{title}</h2>
        
        {/* Product Grid */}
        <div className="row" id="list_home_produk">
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {(data.next_page_url || data.back_page_url) && (
          <div className="row mt-4">
            <div className="col-12">
              <Pagination
                currentPage={currentPage}
                totalPages={data.total_pages || 1}
                nextPageUrl={data.next_page_url}
                backPageUrl={data.back_page_url}
                showNextButton={data.data.length >= 18}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}