import Link from 'next/link';

interface FooterProps {
  namaToko?: string;
  tahun?: number;
}

export default function Footer({ 
  namaToko = "Toko Online", 
  tahun = new Date().getFullYear() 
}: FooterProps) {
  return (
    <footer className="bg-dark text-white py-8 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>{namaToko}</h5>
            <p className="text-muted">
              Toko online terpercaya dengan berbagai produk berkualitas dan pelayanan terbaik.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Layanan</h5>
            <ul className="list-unstyled">
              <li><Link href="/kategori" className="text-muted text-decoration-none">Kategori Produk</Link></li>
              <li><Link href="/pages/promo" className="text-muted text-decoration-none">Promo & Voucher</Link></li>
              <li><Link href="/pages/informasi" className="text-muted text-decoration-none">Informasi</Link></li>
              <li><Link href="/pages/kontak" className="text-muted text-decoration-none">Kontak</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Akun</h5>
            <ul className="list-unstyled">
              <li><Link href="/akun/login" className="text-muted text-decoration-none">Login</Link></li>
              <li><Link href="/akun/daftar" className="text-muted text-decoration-none">Daftar</Link></li>
              <li><Link href="/akun/profil" className="text-muted text-decoration-none">Profil</Link></li>
              <li><Link href="/akun/cart" className="text-muted text-decoration-none">Keranjang</Link></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0 text-muted">
              © {tahun} {namaToko}. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}