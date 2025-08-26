export interface DigiflazzProduct {
  buyer_sku_code: string;
  product_name: string;
  category: string;
  brand: string;
  type: string;
  seller_name: string;
  price: number;
  sale_price: number;
  status: string;
  uname: string;
  start_cut_off: string;
  stop_cut_off: string;
  desc: string;
}

export interface DigiflazzOrderRequest {
  username: string;
  buyer_sku_code: string;
  customer_no: string;
  ref_id: string;
  sign: string;
}

export interface DigiflazzOrderResponse {
  ref_id: string;
  customer_no: string;
  price: number;
  status: string;
  message: string;
  sn: string;
  buyer_sku_code: string;
  product_name: string;
}

export interface DigiflazzStatusRequest {
  username: string;
  ref_id: string;
  sign: string;
}

export interface DigiflazzStatusResponse {
  ref_id: string;
  customer_no: string;
  price: number;
  status: string;
  message: string;
  sn: string;
  buyer_sku_code: string;
  product_name: string;
}

// Mock data untuk produk
export const mockProducts: DigiflazzProduct[] = [
  {
    buyer_sku_code: 'xld10',
    product_name: 'XL 10K',
    category: 'Pulsa',
    brand: 'XL',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 10000,
    sale_price: 10000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa XL 10.000',
  },
  {
    buyer_sku_code: 'xld25',
    product_name: 'XL 25K',
    category: 'Pulsa',
    brand: 'XL',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 25000,
    sale_price: 25000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa XL 25.000',
  },
  {
    buyer_sku_code: 'xld50',
    product_name: 'XL 50K',
    category: 'Pulsa',
    brand: 'XL',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 50000,
    sale_price: 50000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa XL 50.000',
  },
  {
    buyer_sku_code: 'tsel10',
    product_name: 'Telkomsel 10K',
    category: 'Pulsa',
    brand: 'Telkomsel',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 10000,
    sale_price: 10000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa Telkomsel 10.000',
  },
  {
    buyer_sku_code: 'tsel25',
    product_name: 'Telkomsel 25K',
    category: 'Pulsa',
    brand: 'Telkomsel',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 25000,
    sale_price: 25000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa Telkomsel 25.000',
  },
  {
    buyer_sku_code: 'indosat10',
    product_name: 'Indosat 10K',
    category: 'Pulsa',
    brand: 'Indosat',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 10000,
    sale_price: 10000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Pulsa Indosat 10.000',
  },
  {
    buyer_sku_code: 'xl1gb',
    product_name: 'XL 1GB 7 Hari',
    category: 'Paket Data',
    brand: 'XL',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 15000,
    sale_price: 15000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Paket Data XL 1GB berlaku 7 hari',
  },
  {
    buyer_sku_code: 'tsel1gb',
    product_name: 'Telkomsel 1GB 7 Hari',
    category: 'Paket Data',
    brand: 'Telkomsel',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 18000,
    sale_price: 18000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Paket Data Telkomsel 1GB berlaku 7 hari',
  },
  {
    buyer_sku_code: 'pln10k',
    product_name: 'Token PLN 10K',
    category: 'Token PLN',
    brand: 'PLN',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 10000,
    sale_price: 10000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Token Listrik PLN 10.000',
  },
  {
    buyer_sku_code: 'pln20k',
    product_name: 'Token PLN 20K',
    category: 'Token PLN',
    brand: 'PLN',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 20000,
    sale_price: 20000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Token Listrik PLN 20.000',
  },
  {
    buyer_sku_code: 'ml10k',
    product_name: 'Mobile Legends 100 Diamonds',
    category: 'Voucher Game',
    brand: 'Mobile Legends',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 10000,
    sale_price: 10000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Voucher Mobile Legends 100 Diamonds',
  },
  {
    buyer_sku_code: 'ff50k',
    product_name: 'Free Fire 500 Diamonds',
    category: 'Voucher Game',
    brand: 'Free Fire',
    type: 'Prepaid',
    seller_name: 'Digiflazz',
    price: 50000,
    sale_price: 50000,
    status: 'active',
    uname: 'digiflazz',
    start_cut_off: '00:00',
    stop_cut_off: '23:59',
    desc: 'Voucher Free Fire 500 Diamonds',
  },
];

// Mock function untuk mendapatkan daftar produk
export const getMockProducts = (): DigiflazzProduct[] => {
  return mockProducts;
};

// Mock function untuk order
export const createMockOrder = (
  request: DigiflazzOrderRequest
): DigiflazzOrderResponse => {
  // Simulasi delay
  const delay = Math.random() * 2000 + 1000;
  
  // Simulasi success rate 95%
  const isSuccess = Math.random() > 0.05;
  
  if (isSuccess) {
    return {
      ref_id: request.ref_id,
      customer_no: request.customer_no,
      price: mockProducts.find(p => p.buyer_sku_code === request.buyer_sku_code)?.price || 0,
      status: 'success',
      message: 'Transaksi berhasil',
      sn: `SN${Date.now()}`,
      buyer_sku_code: request.buyer_sku_code,
      product_name: mockProducts.find(p => p.buyer_sku_code === request.buyer_sku_code)?.product_name || '',
    };
  } else {
    return {
      ref_id: request.ref_id,
      customer_no: request.customer_no,
      price: mockProducts.find(p => p.buyer_sku_code === request.buyer_sku_code)?.price || 0,
      status: 'failed',
      message: 'Transaksi gagal',
      sn: '',
      buyer_sku_code: request.buyer_sku_code,
      product_name: mockProducts.find(p => p.buyer_sku_code === request.buyer_sku_code)?.product_name || '',
    };
  }
};

// Mock function untuk cek status
export const getMockStatus = (
  request: DigiflazzStatusRequest
): DigiflazzStatusResponse => {
  // Simulasi status transaksi
  const statuses = ['pending', 'success', 'failed'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    ref_id: request.ref_id,
    customer_no: '081234567890',
    price: 10000,
    status: randomStatus,
    message: randomStatus === 'success' ? 'Transaksi berhasil' : 
             randomStatus === 'failed' ? 'Transaksi gagal' : 'Transaksi sedang diproses',
    sn: randomStatus === 'success' ? `SN${Date.now()}` : '',
    buyer_sku_code: 'xld10',
    product_name: 'XL 10K',
  };
};