import { Navigation } from '@/components/navigation';
import { ProductGrid } from '@/components/product-grid';
import { Hero } from '@/components/hero';

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Hero />
      <ProductGrid />
    </div>
  );
}