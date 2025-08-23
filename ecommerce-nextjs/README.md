# E-Commerce Next.js

Project e-commerce modern yang dibangun dengan Next.js, React, TypeScript, dan Tailwind CSS v3.4.0.

## 🚀 Fitur

- **Responsive Design** - Tampilan yang optimal di semua perangkat
- **Modular Architecture** - Komponen yang dapat digunakan kembali
- **TypeScript** - Type safety untuk development yang lebih aman
- **Tailwind CSS** - Styling yang modern dan konsisten
- **Bootstrap Integration** - Komponen UI yang sudah teruji
- **Product Management** - Manajemen produk dengan kategori
- **Search Functionality** - Pencarian produk yang cepat
- **Shopping Cart** - Keranjang belanja interaktif
- **User Authentication** - Sistem login dan registrasi
- **Payment Integration** - Integrasi pembayaran (dalam pengembangan)

## 📁 Struktur Project

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── kategori/          # Category pages
│   ├── produk/            # Product pages
│   ├── search/            # Search functionality
│   └── akun/              # User account pages
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── products/          # Product components
│   │   ├── ProductCard.tsx
│   │   └── ProductList.tsx
│   └── ui/                # UI components
│       ├── Pagination.tsx
│       └── QuantitySelector.tsx
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions
    └── formatters.ts
```

## 🛠️ Teknologi yang Digunakan

- **Next.js 15** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Bootstrap 5** - Component library
- **Font Awesome** - Icon library

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone <repository-url>
cd ecommerce-nextjs
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser dan kunjungi [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
npm run build
npm start
```

## 📱 Halaman yang Tersedia

### 🏠 Home Page (`/`)
- Hero section dengan call-to-action
- Kategori unggulan
- Daftar produk terbaru
- Fitur-fitur toko

### 📂 Kategori (`/kategori`)
- Grid layout kategori produk
- Kategori populer
- Navigasi ke detail kategori

### 🔍 Search (`/search?q=keyword`)
- Pencarian produk berdasarkan keyword
- Hasil pencarian dengan pagination
- Saran pencarian jika tidak ada hasil

### 📦 Detail Produk (`/produk/[slug]`)
- Gallery gambar produk
- Informasi detail produk
- Quantity selector
- Add to cart & Buy now
- Produk terkait

### 👤 User Account (dalam pengembangan)
- Login/Register
- Profile management
- Order history
- Shopping cart
- Address management

## 🎨 Komponen Utama

### Header Component
- Logo dan branding
- Search bar
- User authentication status
- Shopping cart indicator
- Navigation menu

### ProductCard Component
- Product image
- Product name
- Price with discount
- Add to cart button
- Hover effects

### ProductList Component
- Grid layout produk
- Pagination
- Loading states
- Empty states

### QuantitySelector Component
- Plus/minus buttons
- Input validation
- Min/max quantity limits

## 🔧 Konfigurasi

### Tailwind CSS
Project menggunakan Tailwind CSS v3.4.0 dengan konfigurasi custom untuk e-commerce.

### Bootstrap Integration
Bootstrap 5 digunakan untuk komponen UI yang kompleks dan responsive grid system.

### TypeScript
Type definitions lengkap untuk semua komponen dan data structures.

## 📊 Data Structure

### Product Interface
```typescript
interface Product {
  id: string;
  nama_barang: string;
  harga_barang: number;
  harga_barang_asli: number;
  url_gambar_barang: string;
  url_produk: string;
  discount_percent?: number;
  deskripsi?: string;
  stok?: number;
  kategori?: string;
  berat?: number;
  dimensi?: string;
}
```

### User Interface
```typescript
interface User {
  id: string;
  nama_user: string;
  email: string;
  telepon?: string;
  alamat?: string;
  total_cart: number;
  total_favorit?: number;
}
```

## 🎯 Fitur Responsive

- **Mobile First** - Design dimulai dari mobile
- **Breakpoints** - Tablet, desktop, dan large screens
- **Flexible Grid** - Bootstrap grid system
- **Touch Friendly** - Optimized untuk touch devices

## 🔒 Security Features

- **Type Safety** - TypeScript untuk mencegah runtime errors
- **Input Validation** - Validasi input user
- **XSS Protection** - Next.js built-in protection
- **CSRF Protection** - Form protection

## 🚀 Performance Optimization

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic code splitting
- **Lazy Loading** - Component lazy loading
- **Caching** - Static generation dan caching

## 📈 SEO Optimization

- **Meta Tags** - Dynamic meta tags
- **Structured Data** - Product schema markup
- **Sitemap** - Automatic sitemap generation
- **Open Graph** - Social media sharing

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan Next.js, React, TypeScript, dan Tailwind CSS**
