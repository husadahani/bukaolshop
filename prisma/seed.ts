import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@topupdigital.com' },
    update: {},
    create: {
      email: 'admin@topupdigital.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      balance: 1000000, // 1 juta saldo awal
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample products
  const products = [
    {
      name: 'XL 10K',
      description: 'Pulsa XL 10.000',
      category: 'PULSA',
      price: 10000,
      image: null,
    },
    {
      name: 'XL 25K',
      description: 'Pulsa XL 25.000',
      category: 'PULSA',
      price: 25000,
      image: null,
    },
    {
      name: 'XL 50K',
      description: 'Pulsa XL 50.000',
      category: 'PULSA',
      price: 50000,
      image: null,
    },
    {
      name: 'Telkomsel 10K',
      description: 'Pulsa Telkomsel 10.000',
      category: 'PULSA',
      price: 10000,
      image: null,
    },
    {
      name: 'Telkomsel 25K',
      description: 'Pulsa Telkomsel 25.000',
      category: 'PULSA',
      price: 25000,
      image: null,
    },
    {
      name: 'Indosat 10K',
      description: 'Pulsa Indosat 10.000',
      category: 'PULSA',
      price: 10000,
      image: null,
    },
    {
      name: 'XL 1GB 7 Hari',
      description: 'Paket Data XL 1GB berlaku 7 hari',
      category: 'PAKET_DATA',
      price: 15000,
      image: null,
    },
    {
      name: 'Telkomsel 1GB 7 Hari',
      description: 'Paket Data Telkomsel 1GB berlaku 7 hari',
      category: 'PAKET_DATA',
      price: 18000,
      image: null,
    },
    {
      name: 'Token PLN 10K',
      description: 'Token Listrik PLN 10.000',
      category: 'TOKEN_PLN',
      price: 10000,
      image: null,
    },
    {
      name: 'Token PLN 20K',
      description: 'Token Listrik PLN 20.000',
      category: 'TOKEN_PLN',
      price: 20000,
      image: null,
    },
    {
      name: 'Mobile Legends 100 Diamonds',
      description: 'Voucher Mobile Legends 100 Diamonds',
      category: 'VOUCHER_GAME',
      price: 10000,
      image: null,
    },
    {
      name: 'Free Fire 500 Diamonds',
      description: 'Voucher Free Fire 500 Diamonds',
      category: 'VOUCHER_GAME',
      price: 50000,
      image: null,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  console.log('✅ Products created:', products.length);

  // Create sample regular user
  const userPassword = await bcrypt.hash('user123', 12);
  
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
      balance: 100000, // 100 ribu saldo awal
    },
  });

  console.log('✅ Regular user created:', regularUser.email);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });