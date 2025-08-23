import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatRupiah, hitungDiskon } from '@/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.harga_barang_asli > 0 && product.harga_barang_asli > product.harga_barang;
  const discountPercent = hasDiscount 
    ? hitungDiskon(product.harga_barang_asli, product.harga_barang)
    : 0;

  return (
    <div className="col-md-2 col-6 mb-4">
      <Link href={product.url_produk} className="text-decoration-none">
        <div className="card shadow-sm h-100 list_produk hover:shadow-lg transition-shadow duration-300">
          <div className="relative">
            <Image 
              src={product.url_gambar_barang} 
              alt={product.nama_barang}
              width={300}
              height={300}
              className="card-img-top object-cover"
              style={{ height: '200px' }}
            />
            {hasDiscount && (
              <div className="position-absolute top-0 start-0 m-2">
                <span className="badge bg-danger">
                  -{discountPercent}%
                </span>
              </div>
            )}
          </div>
          <div className="card-body p-2">
            <p className="judul-produk text-dark mb-2 line-clamp-2" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.nama_barang}
            </p>
            <p className="fw-bolder mb-1 text-success">
              {formatRupiah(product.harga_barang)}
            </p>
            {hasDiscount && (
              <div className="mb-2">
                <del className="small text-muted">
                  {formatRupiah(product.harga_barang_asli)}
                </del>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}