// Product Types
export interface Product {
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

// Category Types
export interface Category {
  id: string;
  nama_kategori: string;
  url_kategori: string;
  jumlah_produk?: number;
  gambar_kategori?: string;
}

// User Types
export interface User {
  id: string;
  nama_user: string;
  email: string;
  telepon?: string;
  alamat?: string;
  total_cart: number;
  total_favorit?: number;
}

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  nama_barang: string;
  harga_barang: number;
  jumlah: number;
  url_gambar_barang: string;
  stok: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  nomor_transaksi: string;
  tanggal_transaksi: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total_bayar: number;
  metode_pembayaran: string;
  alamat_pengiriman: string;
  items: TransactionItem[];
}

export interface TransactionItem {
  id: string;
  nama_barang: string;
  harga_barang: number;
  jumlah: number;
  url_gambar_barang: string;
}

// API Response Types
export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  status: 'ok' | 'error';
  data: T[];
  current_page: number;
  total_pages: number;
  total_items: number;
  next_page_url?: string;
  back_page_url?: string;
}

// Status Message Types
export interface StatusMessage {
  status: 'sukses' | 'info' | 'warning' | 'error';
  judul: string;
  pesan: string;
}

// Search Types
export interface SearchParams {
  q?: string;
  kategori?: string;
  min_harga?: number;
  max_harga?: number;
  sort?: 'nama' | 'harga' | 'terbaru' | 'terlama';
  order?: 'asc' | 'desc';
  page?: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  nama: string;
  email: string;
  password: string;
  konfirmasi_password: string;
  telepon?: string;
}

export interface AddressForm {
  nama_penerima: string;
  telepon: string;
  alamat: string;
  kota: string;
  kode_pos: string;
  is_default?: boolean;
}