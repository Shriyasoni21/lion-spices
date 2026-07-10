import React from 'react';

export default function WeightSelector({ options, selectedWeight, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {options.map((weight) => (
        <button
          key={weight}
          type="button"
          onClick={() => onSelect(weight)}
          className={`min-w-[72px] flex-shrink-0 h-10 rounded-full border px-4 text-sm font-semibold transition-all flex items-center justify-center ${
            selectedWeight === weight
              ? 'border-primary-red bg-primary-red text-white shadow-md'
              : 'border-gray-200 bg-white text-gray-700 hover:border-primary-red hover:text-primary-red'
          }`}
        >
          {weight}
        </button>
      ))}
    </div>
  );
}
