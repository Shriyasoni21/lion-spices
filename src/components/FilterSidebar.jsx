import React from 'react';

const filterOptions = ['All'];

export default function FilterSidebar({ selectedCategory }) {
  return (
    <aside className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      <div className="mt-4 space-y-3">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={selectedCategory === option}
            className={`w-full rounded-full px-4 py-3 text-left text-sm font-semibold transition duration-300 ${
              selectedCategory === option
                ? 'bg-[#ef2d2d] text-white shadow-xl'
                : 'bg-[#f8f8f8] text-[#222] hover:bg-[#f1f1f1] hover:text-[#111]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </aside>
  );
}
