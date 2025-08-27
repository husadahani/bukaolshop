'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { trpc } from '@/lib/trpc/client';
import { formatPrice } from '@/lib/utils';
import { Loader2, ArrowLeft, Zap, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [customerId, setCustomerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: product, isLoading: isLoadingProduct, error } = trpc.products.getById.useQuery({
    id: params.id as string,
  });

  const createTransactionMutation = trpc.transactions.create.useMutation({
    onSuccess: (transaction) => {
      router.push(`/transactions/${transaction.id}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      router.push('/auth/signin');
      return;
    }

    if (!customerId.trim()) {
      alert('Masukkan nomor pelanggan');
      return;
    }

    setIsLoading(true);
    
    try {
      await createTransactionMutation.mutateAsync({
        productId: params.id as string,
        customerId: customerId.trim(),
      });
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Produk tidak ditemukan</p>
            <Link href="/products">
              <Button variant="outline">Kembali ke Produk</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Produk
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Info */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <span>📱</span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white">{product.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {product.category.replace('_', ' ')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.description && (
                  <p className="text-gray-300">{product.description}</p>
                )}

                <div className="text-3xl font-bold text-white">
                  {formatPrice(product.price)}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Proses instan dalam hitungan detik</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Transaksi aman dengan enkripsi SSL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Layanan 24/7 non-stop</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Form */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Form TopUp</CardTitle>
                <CardDescription className="text-gray-400">
                  Masukkan detail pelanggan untuk melanjutkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="customerId" className="block text-sm font-medium text-gray-300 mb-2">
                      Nomor HP / ID Pelanggan
                    </label>
                    <Input
                      id="customerId"
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      required
                      className="bg-white/5 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Pastikan nomor yang dimasukkan sudah benar
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-white">Ringkasan Pesanan</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Produk:</span>
                      <span className="text-white">{product.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Kategori:</span>
                      <span className="text-white">{product.category.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Harga:</span>
                      <span className="text-white">{formatPrice(product.price)}</span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total:</span>
                      <span className="text-white">{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={isLoading || !customerId.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'TopUp Sekarang'
                    )}
                  </Button>

                  {!session?.user && (
                    <p className="text-center text-sm text-gray-400">
                      <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">
                        Login
                      </Link>{' '}
                      terlebih dahulu untuk melakukan topup
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}