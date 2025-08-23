import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

// Mock data untuk kategori
const mockCategories: Category[] = [
  {
    id: '1',
    nama_kategori: 'Smartphone',
    url_kategori: '/kategori/smartphone',
    jumlah_produk: 125,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Smartphone'
  },
  {
    id: '2',
    nama_kategori: 'Laptop',
    url_kategori: '/kategori/laptop',
    jumlah_produk: 89,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Laptop'
  },
  {
    id: '3',
    nama_kategori: 'Audio & Headphone',
    url_kategori: '/kategori/audio',
    jumlah_produk: 67,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Audio'
  },
  {
    id: '4',
    nama_kategori: 'Fotografi',
    url_kategori: '/kategori/fotografi',
    jumlah_produk: 45,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Fotografi'
  },
  {
    id: '5',
    nama_kategori: 'Smartwatch',
    url_kategori: '/kategori/smartwatch',
    jumlah_produk: 34,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Smartwatch'
  },
  {
    id: '6',
    nama_kategori: 'Tablet',
    url_kategori: '/kategori/tablet',
    jumlah_produk: 28,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Tablet'
  },
  {
    id: '7',
    nama_kategori: 'Gaming',
    url_kategori: '/kategori/gaming',
    jumlah_produk: 56,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Gaming'
  },
  {
    id: '8',
    nama_kategori: 'Aksesoris',
    url_kategori: '/kategori/aksesoris',
    jumlah_produk: 234,
    gambar_kategori: 'https://via.placeholder.com/300x200?text=Aksesoris'
  }
];

export default function KategoriPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">Kategori Produk</h1>
            <p className="lead">
              Temukan produk yang Anda cari berdasarkan kategori
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {mockCategories.map((category) => (
              <div key={category.id} className="col-lg-3 col-md-4 col-sm-6">
                <Link href={category.url_kategori} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm card-hover">
                    <Image 
                      src={category.gambar_kategori || 'https://via.placeholder.com/300x200?text=No+Image'} 
                      className="card-img-top" 
                      alt={category.nama_kategori}
                      width={300}
                      height={200}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark mb-2">{category.nama_kategori}</h5>
                      <p className="card-text text-muted">
                        {category.jumlah_produk} Produk
                      </p>
                      <div className="mt-3">
                        <span className="badge bg-success">
                          Lihat Produk
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Kategori Populer</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-mobile-alt fa-4x text-success mb-3"></i>
                  <h4 className="card-title">Smartphone</h4>
                  <p className="card-text text-muted">
                    Pilihan smartphone terbaru dengan teknologi terkini
                  </p>
                  <Link href="/kategori/smartphone" className="btn btn-success">
                    Lihat Semua
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-laptop fa-4x text-success mb-3"></i>
                  <h4 className="card-title">Laptop</h4>
                  <p className="card-text text-muted">
                    Laptop untuk kerja, gaming, dan kebutuhan sehari-hari
                  </p>
                  <Link href="/kategori/laptop" className="btn btn-success">
                    Lihat Semua
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fa fa-headphones fa-4x text-success mb-3"></i>
                  <h4 className="card-title">Audio</h4>
                  <p className="card-text text-muted">
                    Headphone, speaker, dan perangkat audio berkualitas
                  </p>
                  <Link href="/kategori/audio" className="btn btn-success">
                    Lihat Semua
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}