import { Navigation } from '@/components/navigation';
import { ProductGrid } from '@/components/product-grid';

export default function ProductsPage() {
  return (
    <div>
      <Navigation />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Semua Produk TopUp
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pilih layanan topup digital yang Anda butuhkan
            </p>
          </div>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}