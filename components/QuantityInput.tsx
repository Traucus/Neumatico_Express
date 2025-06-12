
import React from 'react';
import { MinusIcon, PlusIcon } from './IconComponents';

interface QuantityInputProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange?: (newQuantity: number) => void; // For direct input
  min?: number;
  max?: number;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onDecrease, onIncrease, onChange, min = 1, max = 99 }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = min;
        if (value < min) value = min;
        if (value > max) value = max;
        onChange(value);
    }
  };
    
  return (
    <div className="flex items-center border border-gray-300 rounded">
      <button 
        onClick={onDecrease} 
        disabled={quantity <= min}
        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleInputChange}
        className="w-12 text-center border-l border-r border-gray-300 py-1 focus:outline-none"
        min={min}
        max={max}
        aria-label="Current quantity"
      />
      <button 
        onClick={onIncrease} 
        disabled={quantity >= max}
        className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantityInput;
