import Image from 'next/image';
import ProductList from '@/components/products/ProductList';
import { Product, PaginatedResponse } from '@/types';

// Mock data untuk demo
const mockProducts: Product[] = [
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
    nama_barang: 'Laptop ASUS ROG Strix G15',
    harga_barang: 15000000,
    harga_barang_asli: 15000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Laptop',
    url_produk: '/produk/laptop-asus-rog-strix-g15'
  },
  {
    id: '3',
    nama_barang: 'Headphone Sony WH-1000XM4',
    harga_barang: 3500000,
    harga_barang_asli: 4000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Headphone',
    url_produk: '/produk/headphone-sony-wh-1000xm4',
    discount_percent: 12
  },
  {
    id: '4',
    nama_barang: 'Smartwatch Apple Watch Series 8',
    harga_barang: 8000000,
    harga_barang_asli: 8000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Smartwatch',
    url_produk: '/produk/smartwatch-apple-watch-series-8'
  },
  {
    id: '5',
    nama_barang: 'Camera Canon EOS R6',
    harga_barang: 25000000,
    harga_barang_asli: 28000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Camera',
    url_produk: '/produk/camera-canon-eos-r6',
    discount_percent: 11
  },
  {
    id: '6',
    nama_barang: 'Tablet iPad Pro 12.9',
    harga_barang: 18000000,
    harga_barang_asli: 18000000,
    url_gambar_barang: 'https://via.placeholder.com/300x300?text=Tablet',
    url_produk: '/produk/tablet-ipad-pro-12-9'
  }
];

const mockProductListData: PaginatedResponse<Product> = {
  status: 'ok',
  data: mockProducts,
  current_page: 1,
  total_pages: 3,
  total_items: 18,
  next_page_url: '/?page=2',
  back_page_url: undefined
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Selamat Datang di Toko Online
              </h1>
              <p className="lead mb-4">
                Temukan berbagai produk berkualitas dengan harga terbaik. 
                Belanja online aman, nyaman, dan terpercaya.
              </p>
              <a href="#produk" className="btn btn-light btn-lg">
                Mulai Belanja
              </a>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <Image 
                  src="https://via.placeholder.com/500x300?text=Hero+Image" 
                  alt="Hero" 
                  width={500}
                  height={300}
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Kategori Unggulan</h2>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-mobile-alt fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Smartphone</h5>
                  <p className="card-text text-muted">100+ Produk</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-laptop fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Laptop</h5>
                  <p className="card-text text-muted">50+ Produk</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-headphones fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Audio</h5>
                  <p className="card-text text-muted">75+ Produk</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card text-center h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-camera fa-3x text-success mb-3"></i>
                  <h5 className="card-title">Fotografi</h5>
                  <p className="card-text text-muted">30+ Produk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section id="produk" className="py-5">
        <ProductList data={mockProductListData} title="Produk Terbaru" />
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <i className="fa fa-shipping-fast fa-3x text-success mb-3"></i>
              <h5>Pengiriman Cepat</h5>
              <p className="text-muted">Gratis ongkir untuk pembelian di atas Rp 500.000</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fa fa-shield-alt fa-3x text-success mb-3"></i>
              <h5>Garansi 100%</h5>
              <p className="text-muted">Produk original dengan garansi resmi</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="fa fa-headset fa-3x text-success mb-3"></i>
              <h5>Layanan 24/7</h5>
              <p className="text-muted">Customer service siap membantu Anda</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
