import React from 'react';

const filterOptions = ['All', 'Pure Veg Masalas', 'Chilli Powders'];

export default function FilterSidebar({ selectedCategory, onCategoryChange, sortBy, onSortChange }) {
  return (
    <aside className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      <div className="mt-4 space-y-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onCategoryChange(option)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              selectedCategory === option
                ? 'bg-primary-red text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-primary-red'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">Sort</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-primary-red focus:ring-2 focus:ring-red-100"
        >
          <option value="best">Best Selling</option>
          <option value="rating">Customer Rating</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>
      </div>
    </aside>
  );
}
