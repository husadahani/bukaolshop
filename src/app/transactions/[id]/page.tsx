'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { trpc } from '@/lib/trpc/client';
import { formatPrice, formatDate } from '@/lib/utils';
import { Loader2, ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: transaction, isLoading, error } = trpc.transactions.getById.useQuery({
    id: params.id as string,
  });

  const checkStatusMutation = trpc.transactions.checkStatus.useMutation({
    onSuccess: () => {
      // Refetch transaction data
      window.location.reload();
    },
  });

  if (status === 'loading' || isLoading) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    router.push('/auth/signin');
    return null;
  }

  if (error || !transaction) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Transaksi tidak ditemukan</p>
            <Link href="/transactions">
              <Button variant="outline">Kembali ke Riwayat</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'FAILED':
        return <XCircle className="w-8 h-8 text-red-400" />;
      case 'PENDING':
        return <Clock className="w-8 h-8 text-yellow-400" />;
      default:
        return <AlertCircle className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'FAILED':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Berhasil';
      case 'FAILED':
        return 'Gagal';
      case 'PENDING':
        return 'Menunggu';
      default:
        return 'Tidak Diketahui';
    }
  };

  const handleCheckStatus = () => {
    checkStatusMutation.mutate({ transactionId: transaction.id });
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/transactions" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Riwayat
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transaction Details */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">Detail Transaksi</CardTitle>
                    <CardDescription className="text-gray-400">
                      ID: {transaction.id}
                    </CardDescription>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="ml-2">{getStatusText(transaction.status)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Produk:</span>
                    <span className="text-white font-medium">{transaction.product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kategori:</span>
                    <span className="text-white">{transaction.product.category.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nomor Pelanggan:</span>
                    <span className="text-white font-mono">{transaction.customerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jumlah:</span>
                    <span className="text-white font-bold">{formatPrice(transaction.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tanggal:</span>
                    <span className="text-white">{formatDate(transaction.createdAt)}</span>
                  </div>
                  {transaction.digiflazzRef && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ref ID:</span>
                      <span className="text-white font-mono text-sm">{transaction.digiflazzRef}</span>
                    </div>
                  )}
                </div>

                {transaction.message && (
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Pesan:</h4>
                    <p className="text-gray-300">{transaction.message}</p>
                  </div>
                )}

                {transaction.status === 'PENDING' && (
                  <Button
                    onClick={handleCheckStatus}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={checkStatusMutation.isLoading}
                  >
                    {checkStatusMutation.isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memeriksa Status...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Periksa Status
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Status Information */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Status Transaksi</CardTitle>
                <CardDescription className="text-gray-400">
                  Informasi terkini tentang transaksi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  {getStatusIcon(transaction.status)}
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                    {getStatusText(transaction.status)}
                  </h3>
                  <p className="text-gray-400">
                    {transaction.status === 'SUCCESS' && 'Topup berhasil diproses dan diterima pelanggan'}
                    {transaction.status === 'FAILED' && 'Topup gagal diproses, silakan coba lagi'}
                    {transaction.status === 'PENDING' && 'Transaksi sedang diproses, mohon tunggu'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Pembayaran diterima</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === 'PENDING' || transaction.status === 'SUCCESS' 
                        ? 'bg-green-400' 
                        : 'bg-gray-600'
                    }`}></div>
                    <span className="text-gray-300">Pesanan diproses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.status === 'SUCCESS' 
                        ? 'bg-green-400' 
                        : 'bg-gray-600'
                    }`}></div>
                    <span className="text-gray-300">Topup selesai</span>
                  </div>
                </div>

                {transaction.status === 'SUCCESS' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">✅ Topup Berhasil!</h4>
                    <p className="text-green-300 text-sm">
                      Saldo telah ditambahkan ke nomor {transaction.customerId}
                    </p>
                  </div>
                )}

                {transaction.status === 'FAILED' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="font-medium text-red-400 mb-2">❌ Topup Gagal</h4>
                    <p className="text-red-300 text-sm">
                      {transaction.message || 'Terjadi kesalahan dalam pemrosesan'}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700">
                  <Link href="/products">
                    <Button variant="gradient" className="w-full">
                      TopUp Lagi
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}