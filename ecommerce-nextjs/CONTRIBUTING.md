# Contributing to E-Commerce Next.js

Terima kasih atas minat Anda untuk berkontribusi pada project ini! Berikut adalah panduan untuk berkontribusi.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Git

### Setup Development Environment

1. Fork repository ini
2. Clone fork Anda:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ecommerce-nextjs.git
   cd ecommerce-nextjs
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```

5. Jalankan development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style

- Gunakan TypeScript untuk semua file
- Ikuti ESLint rules yang sudah dikonfigurasi
- Gunakan Prettier untuk formatting
- Tulis komentar yang jelas untuk kode kompleks

### Component Structure

```typescript
// components/Example/Example.tsx
import { useState } from 'react';
import { ExampleProps } from './types';

export default function Example({ prop1, prop2 }: ExampleProps) {
  const [state, setState] = useState();
  
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

### Type Definitions

```typescript
// components/Example/types.ts
export interface ExampleProps {
  prop1: string;
  prop2?: number;
}
```

### File Naming Convention

- Components: PascalCase (e.g., `ProductCard.tsx`)
- Pages: kebab-case (e.g., `product-detail.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Types: camelCase (e.g., `productTypes.ts`)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Gunakan Jest dan React Testing Library
- Test komponen secara terpisah
- Test user interactions
- Test error states

## 📦 Building

### Development Build

```bash
npm run build
```

### Production Build

```bash
npm run build
npm start
```

## 🔍 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

## 📋 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Tulis kode yang bersih dan terstruktur
   - Tambahkan tests jika diperlukan
   - Update dokumentasi jika diperlukan

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push to Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Buka GitHub dan buat Pull Request
   - Isi template PR dengan lengkap
   - Tambahkan screenshots jika ada perubahan UI

### Commit Message Convention

Gunakan conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🐛 Bug Reports

Saat melaporkan bug, mohon sertakan:

1. **Environment**
   - OS dan versi
   - Node.js versi
   - Browser versi (jika relevan)

2. **Steps to Reproduce**
   - Langkah-langkah detail untuk reproduce bug
   - Expected vs actual behavior

3. **Additional Context**
   - Screenshots jika ada
   - Console errors
   - Network tab errors

## 💡 Feature Requests

Saat mengusulkan fitur baru:

1. **Describe the Problem**
   - Jelaskan masalah yang ingin diselesaikan
   - Berikan contoh use case

2. **Propose Solution**
   - Jelaskan solusi yang diusulkan
   - Berikan contoh implementasi jika memungkinkan

3. **Consider Alternatives**
   - Apakah ada alternatif lain?
   - Apakah fitur ini benar-benar diperlukan?

## 📚 Documentation

### Updating Documentation

- Update README.md jika ada perubahan setup
- Update komentar kode jika ada perubahan logic
- Tambahkan JSDoc untuk fungsi kompleks

### Code Comments

```typescript
/**
 * Format price to Indonesian Rupiah format
 * @param price - Price in number format
 * @returns Formatted price string
 * @example
 * formatPrice(1000000) // Returns "Rp 1.000.000"
 */
export function formatPrice(price: number): string {
  // Implementation
}
```

## 🤝 Community Guidelines

### Be Respectful

- Hormati pendapat orang lain
- Berikan feedback yang konstruktif
- Jangan spam atau off-topic

### Be Helpful

- Bantu developer lain
- Jawab pertanyaan dengan jelas
- Berikan contoh kode jika diperlukan

### Be Patient

- Tidak semua PR akan langsung di-approve
- Review process membutuhkan waktu
- Maintainer mungkin sibuk dengan hal lain

## 🏆 Recognition

Kontributor akan diakui dengan:

- Mention di README.md
- Badge contributor di GitHub
- Credit di release notes

## 📞 Getting Help

Jika Anda membutuhkan bantuan:

1. **Check Documentation**
   - README.md
   - Code comments
   - TypeScript types

2. **Search Issues**
   - Cari di GitHub Issues
   - Cari di GitHub Discussions

3. **Create Issue**
   - Buat issue baru jika belum ada
   - Jelaskan masalah dengan detail

## 🎯 Project Goals

- **Performance**: Fast loading dan smooth UX
- **Accessibility**: Accessible untuk semua user
- **Maintainability**: Code yang mudah dipahami dan maintain
- **Scalability**: Architecture yang bisa scale

---

Terima kasih telah berkontribusi! 🎉