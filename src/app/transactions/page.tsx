'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { trpc } from '@/lib/trpc/client';
import { formatPrice, formatDate } from '@/lib/utils';
import { Loader2, ArrowRight, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function TransactionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: transactions, isLoading, error } = trpc.transactions.getUserTransactions.useQuery(
    undefined,
    {
      enabled: !!session?.user,
    }
  );

  if (status === 'loading') {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
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

  return (
    <div>
      <Navigation />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Riwayat Transaksi</h1>
            <p className="text-gray-400">Lihat semua transaksi topup Anda</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <Card className="bg-red-500/10 border border-red-500/20">
              <CardContent className="p-6">
                <p className="text-red-400">Error: {error.message}</p>
              </CardContent>
            </Card>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {transaction.product.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {transaction.product.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {transaction.customerId} • {formatDate(transaction.createdAt)}
                          </p>
                          <p className="text-gray-400 text-sm">
                            ID: {transaction.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            {formatPrice(transaction.amount)}
                          </div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{getStatusText(transaction.status)}</span>
                          </div>
                        </div>

                        <Link href={`/transactions/${transaction.id}`}>
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {transaction.message && (
                      <div className="mt-4 p-3 bg-gray-800/50 rounded-md">
                        <p className="text-sm text-gray-300">{transaction.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Belum Ada Transaksi</h3>
                <p className="text-gray-400 mb-6">
                  Anda belum memiliki riwayat transaksi. Mulai topup sekarang!
                </p>
                <Link href="/products">
                  <Button variant="gradient">
                    Mulai TopUp
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}