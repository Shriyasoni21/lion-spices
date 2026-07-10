import React from 'react';

export default function WeightSelector({ options, selectedWeight, onSelect }) {
  return (
    <div className="flex gap-1 sm:gap-2">
      {options.map((weight) => (
        <button
          key={weight}
          type="button"
          onClick={() => onSelect(weight)}
          className={`flex-1 sm:flex-none min-h-9 sm:min-h-10 rounded-full border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
            selectedWeight === weight
              ? 'border-primary-red bg-primary-red text-white shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-primary-red hover:text-primary-red'
          }`}
        >
          {weight}
        </button>
      ))}
    </div>
  );
}
