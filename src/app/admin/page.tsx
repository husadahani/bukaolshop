'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { trpc } from '@/lib/trpc/client';
import { formatPrice, formatDate } from '@/lib/utils';
import { Loader2, Users, CreditCard, TrendingUp, Package, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const { data: transactions, isLoading } = trpc.transactions.getAll.useQuery({
    limit: 20,
    status: selectedStatus === 'all' ? undefined : selectedStatus as any,
  });

  const { data: products, isLoading: isLoadingProducts } = trpc.products.getAll.useQuery();

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

  if (!session?.user || session.user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  // Calculate statistics
  const totalTransactions = transactions?.items.length || 0;
  const totalRevenue = transactions?.items.reduce((sum, t) => sum + t.amount, 0) || 0;
  const successTransactions = transactions?.items.filter(t => t.status === 'SUCCESS').length || 0;
  const totalProducts = products?.length || 0;

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Kelola transaksi dan produk platform</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Transaksi</p>
                    <p className="text-2xl font-bold text-white">{totalTransactions}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Pendapatan</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(totalRevenue)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Transaksi Sukses</p>
                    <p className="text-2xl font-bold text-white">{successTransactions}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Produk</p>
                    <p className="text-2xl font-bold text-white">{totalProducts}</p>
                  </div>
                  <Package className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">Transaksi Terbaru</CardTitle>
                      <CardDescription className="text-gray-400">
                        Daftar transaksi terbaru
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-1 text-sm"
                      >
                        <option value="all">Semua Status</option>
                        <option value="PENDING">Menunggu</option>
                        <option value="SUCCESS">Berhasil</option>
                        <option value="FAILED">Gagal</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : transactions && transactions.items.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.items.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {transaction.product.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{transaction.product.name}</h4>
                              <p className="text-gray-400 text-sm">
                                {transaction.user.name} • {transaction.customerId}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {formatDate(transaction.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">
                              {formatPrice(transaction.amount)}
                            </div>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                              {getStatusText(transaction.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Tidak ada transaksi</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/products">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Package className="w-4 h-4 mr-2" />
                      Kelola Produk
                    </Button>
                  </Link>
                  <Link href="/admin/transactions">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Lihat Semua Transaksi
                    </Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Users className="w-4 h-4 mr-2" />
                      Kelola User
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Products */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Produk Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingProducts ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : products && products.length > 0 ? (
                    <div className="space-y-3">
                      {products.slice(0, 5).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-white">{product.name}</h4>
                            <p className="text-gray-400 text-sm">{formatPrice(product.price)}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">Tidak ada produk</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}