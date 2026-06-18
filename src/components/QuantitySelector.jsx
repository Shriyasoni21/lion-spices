import React from 'react';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 p-1">
      <button
        type="button"
        onClick={onDecrease}
        className="h-10 w-10 rounded-full bg-white text-xl font-semibold text-gray-700 shadow-sm transition hover:bg-primary-red hover:text-white"
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-base font-semibold text-gray-900">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        className="h-10 w-10 rounded-full bg-white text-xl font-semibold text-gray-700 shadow-sm transition hover:bg-primary-red hover:text-white"
      >
        +
      </button>
    </div>
  );
}
