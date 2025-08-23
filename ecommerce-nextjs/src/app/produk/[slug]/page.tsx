'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { Product } from '@/types';
import { formatRupiah, hitungDiskon } from '@/utils/formatters';

// Mock data untuk detail produk
const mockProduct: Product = {
  id: '1',
  nama_barang: 'Smartphone Samsung Galaxy A54 5G',
  harga_barang: 4500000,
  harga_barang_asli: 5000000,
  url_gambar_barang: 'https://via.placeholder.com/500x500?text=Smartphone+Detail',
  url_produk: '/produk/smartphone-samsung-galaxy-a54',
  discount_percent: 10,
  deskripsi: 'Smartphone Samsung Galaxy A54 5G dengan layar 6.4 inch, kamera 50MP, dan baterai 5000mAh. Dilengkapi dengan processor Exynos 1380 dan RAM 8GB untuk performa yang optimal.',
  stok: 25,
  kategori: 'Smartphone',
  berat: 202,
  dimensi: '158.2 x 76.7 x 8.2 mm'
};

interface DetailProdukPageProps {
  params: {
    slug: string;
  };
}

export default function DetailProdukPage({ params }: DetailProdukPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Log params untuk debugging (akan dihapus di production)
  console.log('Product slug:', params.slug);
  
  const product = mockProduct; // Dalam implementasi nyata, ambil dari API berdasarkan slug
  const hasDiscount = product.harga_barang_asli > 0 && product.harga_barang_asli > product.harga_barang;
  const discountPercent = hasDiscount 
    ? hitungDiskon(product.harga_barang_asli, product.harga_barang)
    : 0;

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Implementasi add to cart
    console.log('Menambahkan ke keranjang:', { product, quantity });
    alert(`Produk ${product.nama_barang} berhasil ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    // Implementasi buy now
    console.log('Membeli sekarang:', { product, quantity });
    alert('Mengarahkan ke halaman checkout...');
  };

  // Mock images untuk gallery
  const productImages = [
    product.url_gambar_barang,
    'https://via.placeholder.com/500x500?text=Image+2',
    'https://via.placeholder.com/500x500?text=Image+3',
    'https://via.placeholder.com/500x500?text=Image+4'
  ];

  return (
    <main className="min-h-screen py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/kategori" className="text-decoration-none">Kategori</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/kategori/${product.kategori?.toLowerCase()}`} className="text-decoration-none">
                {product.kategori}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.nama_barang}
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6 mb-4">
            <div className="product-gallery">
              <div className="main-image mb-3">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.nama_barang}
                  width={500}
                  height={500}
                  className="img-fluid rounded border"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="thumbnail-images d-flex gap-2">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={image}
                      alt={`${product.nama_barang} ${index + 1}`}
                      width={80}
                      height={80}
                      className={`img-fluid rounded border ${selectedImage === index ? 'border-success' : ''}`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <h1 className="h2 mb-3">{product.nama_barang}</h1>
              
              {/* Price */}
              <div className="price-section mb-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="h3 text-success fw-bold">
                    {formatRupiah(product.harga_barang)}
                  </span>
                  {hasDiscount && (
                    <span className="badge bg-danger fs-6">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <div className="mt-2">
                    <del className="text-muted fs-5">
                      {formatRupiah(product.harga_barang_asli)}
                    </del>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="stock-status mb-4">
                <span className={`badge ${product.stok && product.stok > 0 ? 'bg-success' : 'bg-danger'} fs-6`}>
                  {product.stok && product.stok > 0 ? `Stok: ${product.stok} unit` : 'Stok Habis'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-section mb-4">
                <QuantitySelector
                  initialQuantity={quantity}
                  maxQuantity={product.stok || 1}
                  onQuantityChange={handleQuantityChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mb-4">
                <div className="d-grid gap-2 d-md-flex">
                  <button
                    className="btn btn-success btn-lg flex-fill"
                    onClick={handleAddToCart}
                    disabled={!product.stok || product.stok <= 0}
                  >
                    <i className="fa fa-shopping-cart me-2"></i>
                    Tambah ke Keranjang
                  </button>
                  <button
                    className="btn btn-primary btn-lg flex-fill"
                    onClick={handleBuyNow}
                    disabled={!product.stok || product.stok <= 0}
                  >
                    <i className="fa fa-bolt me-2"></i>
                    Beli Sekarang
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="product-details">
                <h5 className="mb-3">Detail Produk</h5>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-2"><strong>Kategori:</strong> {product.kategori}</p>
                    <p className="mb-2"><strong>Berat:</strong> {product.berat}g</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-2"><strong>Dimensi:</strong> {product.dimensi}</p>
                    <p className="mb-2"><strong>SKU:</strong> {product.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Deskripsi Produk</h5>
              </div>
              <div className="card-body">
                <p className="mb-0">{product.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="mb-4">Produk Terkait</h3>
            <div className="row g-4">
              {/* Mock related products */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <Image 
                      src={`https://via.placeholder.com/300x300?text=Related+${item}`}
                      className="card-img-top"
                      alt={`Related Product ${item}`}
                      width={300}
                      height={200}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">Produk Terkait {item}</h6>
                      <p className="card-text text-success fw-bold">Rp 3.500.000</p>
                      <button className="btn btn-outline-success btn-sm w-100">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}