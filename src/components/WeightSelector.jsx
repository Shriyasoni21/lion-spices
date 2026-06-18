import React from 'react';

export default function WeightSelector({ options, selectedWeight, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((weight) => (
        <button
          key={weight}
          type="button"
          onClick={() => onSelect(weight)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
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
