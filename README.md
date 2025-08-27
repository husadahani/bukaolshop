# 🚀 TopUp Digital - Platform Topup Terpercaya

Aplikasi web topup digital modern dengan Next.js 14, TypeScript, tRPC, dan Prisma. Platform ini menyediakan layanan topup untuk pulsa, paket data, token PLN, dan voucher game dengan integrasi mock API Digiflazz.

## ✨ Fitur Utama

### 🎯 Frontend
- **Landing Page Modern** - Hero section dengan animasi dan fitur highlights
- **Grid Produk Responsif** - Tampilan produk dengan filter kategori
- **Detail Produk & Checkout** - Form input nomor pelanggan dengan validasi
- **Riwayat Transaksi** - Tracking status transaksi real-time
- **Sistem Autentikasi** - Login/register dengan NextAuth.js
- **Dashboard Admin** - Panel admin untuk kelola transaksi dan produk
- **Mobile-First Design** - Responsif di semua device

### 🔧 Backend
- **tRPC API** - Type-safe API dengan React Query
- **Prisma ORM** - Database management dengan PostgreSQL
- **NextAuth.js** - Autentikasi dengan email/password
- **Mock Digiflazz API** - Simulasi integrasi payment gateway
- **Sistem Referral** - Kode referral untuk user baru

### 🎨 UI/UX
- **Dark Theme Modern** - Gaya crypto/e-commerce seperti G2A
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui Components** - Komponen UI yang konsisten
- **Gradient & Glassmorphism** - Efek visual modern
- **Loading States** - Feedback visual yang smooth

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **tRPC** - Type-safe API client
- **React Query** - Server state management
- **NextAuth.js** - Authentication
- **Lucide React** - Icons

### Backend
- **tRPC** - Type-safe API
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

### Development
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prisma Studio** - Database GUI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd topup-digital
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi database dan NextAuth:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/topup_digital"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Digiflazz API (Mock)
DIGIFLAZZ_API_KEY="your-digiflazz-api-key"
DIGIFLAZZ_USERNAME="your-digiflazz-username"
DIGIFLAZZ_URL="https://api.digiflazz.com/v1"
```

### 4. Setup Database
```bash
# Push schema ke database
npm run db:push

# Atau migrate (jika menggunakan migrations)
npm run db:migrate
```

### 5. Seed Data
```bash
npm run db:seed
```

### 6. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 👥 Default Users

Setelah seeding, tersedia user default:

### Admin User
- **Email:** admin@topupdigital.com
- **Password:** admin123
- **Role:** ADMIN
- **Saldo:** Rp 1.000.000

### Regular User
- **Email:** user@example.com
- **Password:** user123
- **Role:** USER
- **Saldo:** Rp 100.000

## 📱 Fitur Detail

### 🏠 Landing Page
- Hero section dengan animasi gradient
- Feature highlights (Instan, Aman, 24/7)
- Call-to-action untuk signup/login

### 🛍️ Produk & Checkout
- Grid produk dengan filter kategori
- Detail produk dengan informasi lengkap
- Form checkout dengan validasi
- Ringkasan pesanan

### 💳 Transaksi
- Riwayat transaksi user
- Detail transaksi dengan status tracking
- Check status real-time
- Notifikasi status

### 👨‍💼 Admin Dashboard
- Statistik transaksi dan pendapatan
- Kelola produk (CRUD)
- Monitor semua transaksi
- Quick actions

### 🔐 Autentikasi
- Register dengan sistem referral
- Login dengan email/password
- Protected routes
- Role-based access (USER/ADMIN)

## 🗄️ Database Schema

### User
- id, name, email, password, role
- referralCode, referredBy, balance
- createdAt, updatedAt

### Product
- id, name, description, category
- price, image, isActive
- createdAt, updatedAt

### Transaction
- id, userId, productId, customerId
- amount, status, digiflazzRef, message
- createdAt, updatedAt

## 🔌 API Endpoints

### Auth
- `POST /api/trpc/auth.register` - Register user
- `GET /api/trpc/auth.getProfile` - Get user profile

### Products
- `GET /api/trpc/products.getAll` - Get all products
- `GET /api/trpc/products.getByCategory` - Get products by category
- `GET /api/trpc/products.getById` - Get single product
- `POST /api/trpc/products.create` - Create product (Admin)
- `PUT /api/trpc/products.update` - Update product (Admin)
- `DELETE /api/trpc/products.delete` - Delete product (Admin)

### Transactions
- `POST /api/trpc/transactions.create` - Create transaction
- `GET /api/trpc/transactions.getUserTransactions` - Get user transactions
- `GET /api/trpc/transactions.getById` - Get transaction detail
- `POST /api/trpc/transactions.checkStatus` - Check transaction status
- `GET /api/trpc/transactions.getAll` - Get all transactions (Admin)
- `PUT /api/trpc/transactions.updateStatus` - Update status (Admin)

## 🎨 Customization

### Styling
- Edit `tailwind.config.js` untuk custom theme
- Modifikasi komponen di `src/components/ui/`
- Update warna dan gradient di CSS variables

### Mock API
- Edit `src/mocks/digiflazz.ts` untuk custom response
- Tambah produk baru di seeding script
- Modifikasi success rate dan delay

### Database
- Update schema di `prisma/schema.prisma`
- Jalankan `npm run db:push` untuk apply changes
- Update seeding script sesuai kebutuhan

## 🚀 Deployment

### Vercel + Neon PostgreSQL
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Setup environment variables di Vercel
4. Deploy otomatis

### Environment Variables untuk Production
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
DIGIFLAZZ_API_KEY="your-production-key"
DIGIFLAZZ_USERNAME="your-production-username"
```

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio

# Linting
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── products/          # Product pages
│   ├── transactions/      # Transaction pages
│   └── admin/             # Admin pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Navigation component
│   ├── hero.tsx          # Hero section
│   ├── product-grid.tsx  # Product grid
│   └── product-card.tsx  # Product card
├── lib/                  # Utilities
│   ├── trpc.ts          # tRPC configuration
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── server/              # tRPC server
│   └── api/             # tRPC routers
├── mocks/               # Mock API data
└── styles/              # Global styles
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [tRPC](https://trpc.io/) - Type-safe APIs
- [Prisma](https://prisma.io/) - Database toolkit
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication

---

**TopUp Digital** - Platform topup digital terpercaya dan modern! 🚀