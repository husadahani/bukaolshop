'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
}

export default function QuantitySelector({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 999,
  onQuantityChange,
  className = ""
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= minQuantity && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || minQuantity;
    handleQuantityChange(value);
  };

  return (
    <div className={`d-flex align-items-center ${className}`}>
      <label htmlFor="jumlah_produk" className="me-3 fw-bold">
        Jumlah:
      </label>
      <div className="input-group" style={{ width: '150px' }}>
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="button-minus"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= minQuantity}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <input
          type="number"
          className="form-control text-center"
          id="jumlah_produk"
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          max={maxQuantity}
          style={{ borderLeft: 'none', borderRight: 'none' }}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="button-plus"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= maxQuantity}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
}