/**
 * Format angka ke format rupiah Indonesia
 * @param angka - Angka yang akan diformat
 * @returns String format rupiah
 */
export const formatRupiah = (angka: number): string => {
  const number_string = angka.toString().replace(/[^,\d]/g, '').toString();
  const split = number_string.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return 'Rp' + rupiah;
};

/**
 * Hitung persentase diskon
 * @param hargaAsli - Harga asli produk
 * @param hargaDiskon - Harga setelah diskon
 * @returns Persentase diskon
 */
export const hitungDiskon = (hargaAsli: number, hargaDiskon: number): number => {
  if (hargaAsli <= 0 || hargaDiskon >= hargaAsli) return 0;
  return Math.round(((hargaAsli - hargaDiskon) / hargaAsli) * 100);
};

/**
 * Format tanggal ke format Indonesia
 * @param date - Tanggal yang akan diformat
 * @returns String format tanggal Indonesia
 */
export const formatTanggal = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('id-ID', options);
};

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan di-truncate
 * @param maxLength - Panjang maksimal
 * @returns Text yang sudah di-truncate
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate slug dari text
 * @param text - Text yang akan di-generate slug
 * @returns Slug string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};