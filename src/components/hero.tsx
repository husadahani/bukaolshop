import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TopUp Digital
            </span>
            <br />
            <span className="text-white">Terpercaya & Instan</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Platform topup digital terpercaya untuk pulsa, paket data, token PLN, dan voucher game. 
            Transaksi aman, cepat, dan 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/products">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-4">
                Mulai TopUp
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800">
                Daftar Sekarang
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instan</h3>
              <p className="text-gray-400 text-center">
                Proses topup dalam hitungan detik
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aman</h3>
              <p className="text-gray-400 text-center">
                Transaksi aman dengan enkripsi SSL
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Clock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7</h3>
              <p className="text-gray-400 text-center">
                Layanan tersedia 24 jam non-stop
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}